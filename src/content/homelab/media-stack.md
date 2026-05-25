---
title: Building a Self-Hosted Media Stack
description: How I run a Docker Compose media stack at home, including the *arr apps, Jellyfin, Cloudflare Tunnel, and the mistakes the official docs skip.
updated: 2026-05-24
---

This is how I run a self-hosted media setup on one Linux box with Docker Compose: automated grabs, streaming, requests, subtitles, basic analytics, and a public URL without punching holes in the router.

**Use only media you have the legal right to access.** The legal notice at the top of this page applies; this guide is documentation, not permission to infringe copyright.

I'm assuming you already know Linux and Docker. I won't re-teach containers or compose syntax. I will go deep on the parts that actually burned me: keeping downloads and the library on one filesystem (hardlinks), qBittorrent's WebUI whitelist, Jellyfin trickplay OOMs, whether you want a recycle bin, and handing quality profiles to Recyclarr once it's in charge.


## What You'll End Up With

A single Linux box running a Docker Compose stack that:

- Watches RSS feeds across multiple Usenet and torrent indexers (Prowlarr)
- Automatically grabs new TV episodes and movies as they release (Sonarr, Radarr)
- Downloads via Usenet (SABnzbd) or BitTorrent (qBittorrent)
- Hardlinks completed downloads into your library, no duplicate disk usage (the *arrs handle this)
- Fetches subtitles automatically (Bazarr)
- Extracts compressed downloads (Unpackerr)
- Streams to any device with hardware-accelerated transcoding (Jellyfin)
- Accepts requests from users (Jellyseerr) and tracks playback analytics (Jellystat)
- Is reachable from the public internet via Cloudflare Tunnel, no port forwards, no exposed home IP
- Has a LAN-only dashboard (Glance) that surfaces queue status, disk usage, and quick links
- Backs its own configs up nightly to the NAS

Everything below uses two placeholders: `MEDIA_HOST` (the Linux box running Docker) and `NAS_HOST` (where the big disks live). If your media sits on the same machine, you can fold those into one host; the hardlink rules still apply. See [Storage](#storage-nfs-and-the-hardlink-invariant).


## Architecture at a Glance

The diagram above is the whole picture: Internet → Cloudflare Tunnel → `MEDIA_HOST` (everything on `arr-net`) → NFS → `NAS_HOST`.

Two details matter more than the rest:

1. Put every container on one Docker bridge (`arr-net`). Services talk by container name (`http://qbittorrent:8083`), not by host IP. That keeps working across restarts when DHCP shuffles addresses.
2. Mount storage once on the host (`/mnt/nas`), expose it inside containers as `/data`. Downloads and the library have to see the same underlying filesystem or hardlinks fail. More in [Storage](#storage-nfs-and-the-hardlink-invariant).


## Hardware and Host Prep

### Minimum

- 4 cores, 8GB RAM, a small SSD for the OS and configs (~64GB is plenty)
- A network link to wherever your media lives (1 Gb wired is the floor)

### Recommended

- 6+ cores, 16GB RAM
- A NVIDIA GPU with NVENC/NVDEC for hardware transcoding, anything Turing-era or newer (RTX 20-series, 30-series, 40-series). Consumer cards work fine; you do not need a workstation card.
- Wired ethernet, not WiFi. WiFi tolerable for one or two clients; falls over at scale.

### GPU notes

Hardware transcoding is the difference between Jellyfin calmly serving 4K HDR to a phone on cellular and Jellyfin chewing through every CPU core in software. If you can stick a GPU in the box, do it.

NVIDIA on Linux for transcoding means:

```bash
# Install proprietary driver (Ubuntu)
sudo ubuntu-drivers install
nvidia-smi   # confirms driver + GPU visible

# Install the NVIDIA Container Toolkit so Docker can pass the GPU to containers
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | \
  sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
curl -fsSL https://nvidia.github.io/libnvidia-container/$distribution/libnvidia-container.list | \
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
  sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
sudo apt update && sudo apt install -y nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker

# Verify Docker can see the GPU
docker run --rm --runtime=nvidia --gpus all nvidia/cuda:12.3.1-base-ubuntu22.04 nvidia-smi
```

If `nvidia-smi` inside the container shows your card, you're done. Jellyfin's compose entry adds `runtime: nvidia` and a few environment variables, see [Jellyfin](#media-server-jellyfin).

Intel iGPUs (UHD 630 and friends) can transcode over VAAPI too. If you have both an NVIDIA card and an iGPU, pick one for Jellyfin. Running both does not help; they just fight. I still reach for NVENC first for H.265 at similar bitrates.

### OS prep

Ubuntu 22.04 or 24.04 LTS Server is the path of least resistance. Any modern systemd Linux works. The rest of the guide assumes Ubuntu.

```bash
# Basic prep
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nfs-common docker.io docker-compose-plugin

# Let your user run docker without sudo
sudo usermod -aG docker $USER
newgrp docker

# Time zone (avoid silent off-by-one-hour bugs in cron schedules and logs)
sudo timedatectl set-timezone America/Los_Angeles   # or your zone
```


## Storage: NFS and the Hardlink Invariant

### The single-most-important rule

> Downloads, the staging area, and the final library must all live on the same filesystem.

When Sonarr or Radarr imports a finished download, you want a hardlink: a second directory entry pointing at the same bytes on disk. The torrent can keep seeding from its path, the file shows up in the library, and you only pay for the space once.

Hardlinks only work inside one filesystem. Put downloads on one share and the library on another, even on the same NAS, and the *arrs fall back to copying. Imports get slow and you double disk usage. There is no warning banner. You just notice "copy" in Activity one day.

### How to satisfy the rule

Pick one storage root and put everything under it.

I use:

```
NAS_HOST:/volume/Media     (single share, contains Movies/, TV/, Music/, downloads/)
```

mounted on `MEDIA_HOST` at:

```
/mnt/nas/Media
```

and mounted into every container at:

```
/data
```

So inside Sonarr, the root folder is `/data/TV`. Inside qBittorrent, the incomplete path is `/data/downloads/incomplete` and complete is `/data/downloads/complete`. Same filesystem inside every container. Hardlinks work.

You can have additional shares (e.g. `/mnt/nas/Backup` for config backups) but the **media** and **downloads** must share one mount.

### Mounting NFS on the host

In `/etc/fstab`:

```shellscript
NAS_HOST:/volume/Media    /mnt/nas/Media    nfs    rw,hard,bg,timeo=600,retrans=2,noatime    0   0
NAS_HOST:/volume/Backup   /mnt/nas/Backup   nfs    rw,hard,bg,timeo=600,retrans=2,noatime    0   0
```

Then:

```bash
sudo mkdir -p /mnt/nas/Media /mnt/nas/Backup
sudo mount -a
df -h /mnt/nas/Media   # confirm mount; non-empty Used column = success
```

Use `hard`, not `soft`. Soft mounts can fail writes quietly when the NAS blips, which leaves half-imported files sitting around. Hard mounts block until the share is back. Annoying during an outage, but easier to trust.

**`bg`** lets the mount retry in the background at boot, so the host boots even if the NAS is slow to come up.

### Permissions: PUID/PGID

linuxserver.io images honor `PUID` and `PGID` and run as that uid/gid inside the container. Match whatever owns files on your NAS. Get it wrong and Sonarr writes a file your NAS user cannot touch, or the other way around.

A common pattern on Synology/ASUSTOR NAS units is uid `1024` or `999`. Check with:

```bash
ls -lan /mnt/nas/Media
```

The numeric uid in the third column is what you want. If it's `999`, set `PUID=999 PGID=999` everywhere.

If you want a local host user that matches:

```bash
sudo groupadd -g 999 media
sudo useradd -u 999 -g 999 -s /usr/sbin/nologin -d /nonexistent media
```

Optional: Docker does not require that uid to exist on the host. I still create the user because permissions are easier to reason about at 2 a.m.


## Docker Baseline

### One external network for the whole stack

```bash
docker network create arr-net
```

Created once, marked `external` in compose so it survives `docker compose down`. Every container in this guide attaches to it.

### Directory layout on the host

```
/opt/media/
├── docker-compose.yml
├── .env
├── prowlarr/     ← per-service config volumes
├── sonarr/
├── radarr/
├── ...
└── postgres/
    ├── data/
    └── init/
```

`/opt/media/<service>/` is where each container writes its persistent state. This whole tree gets backed up to the NAS nightly, see [Backups](#backups-and-maintenance-crons).

```bash
sudo mkdir -p /opt/media
sudo chown $USER:$USER /opt/media
cd /opt/media
```


## Compose Conventions

Every service block in this guide repeats the same skeleton. Learn it once and the rest is copy-paste with tweaks.

### `.env` file (never committed)

```dotenv
# /opt/media/.env

PUID=999
PGID=999
TZ=America/Los_Angeles

NAS_PATH=/mnt/nas
CONFIG_PATH=/opt/media

# API keys (populated after each service's first run — see per-service sections)
SONARR_API_KEY=
RADARR_API_KEY=
PROWLARR_KEY=
SABNZBD_NZB_KEY=

# Postgres (shared)
POSTGRES_USER=admin
POSTGRES_PASSWORD=<generate with: openssl rand -hex 32>

# Cloudflare tunnel
CF_TUNNEL_TOKEN=<from Cloudflare Zero Trust dashboard>
```

### Compose service template

Every linuxserver.io service follows this shape:

```yaml
  <service>:
    image: lscr.io/linuxserver/<service>:latest
    container_name: <service>
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
    volumes:
      - ${CONFIG_PATH}/<service>:/config
      - /mnt/nas/Media:/data    # only if it touches media
    ports:
      - <port>:<port>
    networks:
      - arr-net
    mem_limit: 512m
    restart: unless-stopped
```

A few non-obvious things:

- `mem_limit` keeps one hungry container (usually Jellyfin) from OOM-killing the host. Give headroom, but do not leave it unlimited.
- `restart: unless-stopped` brings containers back after a crash or reboot, but respects a deliberate `docker stop`.
- `container_name` is explicit so other services can hit `http://sonarr:8989` by name on `arr-net`.

### File header

At the top of `docker-compose.yml`:

```yaml
---
networks:
  arr-net:
    external: true

services:
  # ...services go here...
```

Marking `arr-net` external tells compose not to delete the network on `docker compose down`. You created it once with `docker network create arr-net` and it sticks around.


## Prowlarr and FlareSolverr

**Prowlarr** is your indexer aggregator. You add Usenet and torrent indexers to it once, and it syncs them to Sonarr, Radarr, and any other *arr. You never touch indexer config in Sonarr or Radarr directly.

**FlareSolverr** is a headless-browser proxy that solves Cloudflare challenges. Some indexers (1337x, RARBG mirrors, etc.) put their site behind Cloudflare; without FlareSolverr, Prowlarr can't reach them.

```yaml
  prowlarr:
    image: lscr.io/linuxserver/prowlarr:latest
    container_name: prowlarr
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
    volumes:
      - ${CONFIG_PATH}/prowlarr:/config
    ports:
      - 9696:9696
    networks:
      - arr-net
    mem_limit: 512m
    restart: unless-stopped

  flaresolverr:
    image: ghcr.io/flaresolverr/flaresolverr:latest
    container_name: flaresolverr
    environment:
      - LOG_LEVEL=info
      - TZ=${TZ}
    ports:
      - 8191:8191
    networks:
      - arr-net
    mem_limit: 512m
    restart: unless-stopped
```

### First run

1. `docker compose up -d prowlarr flaresolverr`
2. Browse `http://MEDIA_HOST_IP:9696`, set admin auth method to **Forms (Login Page)**, set username/password.
3. **Settings → Apps → Add FlareSolverr**: Host `http://flaresolverr:8191`. Save.
4. **Indexers → Add Indexer**: pick the indexers you have accounts for. For any indexer that lists "Cloudflare" or "DDoS Guard" as a requirement, select FlareSolverr in the Tags field of that indexer.
5. **Settings → General**, copy your API key into `.env` as `PROWLARR_KEY`. (Used later by Jellyseerr and the dashboard.)

You'll come back to Prowlarr after Sonarr and Radarr are up to wire them in.

### Trap: indexer tag scope

Prowlarr indexers without tags sync to **all** apps. Indexers *with* a tag sync **only** to apps that share that tag. Forget to tag an indexer correctly and it silently disappears from Sonarr or Radarr. If a search comes back empty in Sonarr but the indexer is up in Prowlarr, check tags first.


## Download Clients: qBittorrent and SABnzbd

You do not need both clients. qBittorrent if you torrent, SABnzbd if you use Usenet. I run both because some releases only show up on one side.

```yaml
  qbittorrent:
    image: lscr.io/linuxserver/qbittorrent:latest
    container_name: qbittorrent
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
      - WEBUI_PORT=8083
    volumes:
      - ${CONFIG_PATH}/qbittorrent:/config
      - /mnt/nas/Media:/data
    ports:
      - 8083:8083      # Web UI
      - 6881:6881      # Peer port TCP
      - 6881:6881/udp  # Peer port UDP
    networks:
      - arr-net
    mem_limit: 2g
    restart: unless-stopped

  sabnzbd:
    image: lscr.io/linuxserver/sabnzbd:latest
    container_name: sabnzbd
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
    volumes:
      - ${CONFIG_PATH}/sabnzbd:/config
      - /mnt/nas/Media:/data
    ports:
      - 8081:8080
    networks:
      - arr-net
    mem_limit: 1g
    restart: unless-stopped
```

### qBittorrent first run

1. `docker compose up -d qbittorrent`
2. Get the temporary admin password from logs: `docker logs qbittorrent 2>&1 | grep -i password`
3. Browse `http://MEDIA_HOST_IP:8083`, log in, **Tools → Options → Web UI**, set a real password.
4. **Downloads → Default Save Path**: `/data/downloads/complete`
5. **Downloads → Keep incomplete torrents in**: `/data/downloads/incomplete`
6. **BitTorrent → Encryption mode**: Prefer encryption (or Require, depending on your trackers)
7. **Connection → Peer connections**: confirm port `6881` matches both the compose port mappings and any router forward you've set up.

### qBittorrent WebUI whitelist trap

Sonarr and Radarr talk to qBittorrent over its API from whatever IP Docker hands the container on `arr-net` (172.x space). qBittorrent's WebUI has opinions about "local" clients. Cross-container traffic does not always count the way you expect, so the bypass-LAN-auth shortcut may not apply.

In qBittorrent → **Web UI → Authentication** → enable **Bypass authentication for clients in whitelisted IP subnets** and add:

```
172.16.0.0/12
192.168.0.0/16
```

Without this, you'll see 403s in Sonarr's "Activity → Queue" with no obvious cause.

### Router port forward (torrent peers)

If you're behind NAT, forward TCP+UDP `6881` from your router to `MEDIA_HOST_IP:6881`. Without this, your peer connectivity is limited to what UPnP and hole-punching can do for you, usually slower swarms.

### SABnzbd first run

1. `docker compose up -d sabnzbd`
2. Browse `http://MEDIA_HOST_IP:8081`, walk through setup wizard.
3. **Config → Folders**:
   - Temporary download folder: `/data/downloads/incomplete/usenet`
   - Completed download folder: `/data/downloads/complete/usenet`
4. **Config → Servers**: add your Usenet provider's NNTP server. SSL on port 563 is the norm.
5. **Config → Categories**: add `tv` (folder `tv`) and `movies` (folder `movies`). Sonarr/Radarr will assign downloads to these so they land in predictable subdirs.
6. **Config → General**, copy the NZB Key into `.env` as `SABNZBD_NZB_KEY`.

### SABnzbd memory note

SAB defaults to a low memory ceiling that triggers stalls during decompression on faster connections. The `mem_limit: 1g` above is safe; bump higher if you're on gigabit Usenet.


## The *arr Stack: Sonarr and Radarr

Same pattern for both. Sonarr for TV, Radarr for movies. They watch RSS feeds via Prowlarr, decide what to grab, hand it to qBittorrent or SABnzbd, and import the finished file into your library via hardlink.

```yaml
  sonarr:
    image: lscr.io/linuxserver/sonarr:latest
    container_name: sonarr
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
    volumes:
      - ${CONFIG_PATH}/sonarr:/config
      - /mnt/nas/Media:/data
    ports:
      - 8989:8989
    networks:
      - arr-net
    mem_limit: 768m
    restart: unless-stopped

  radarr:
    image: lscr.io/linuxserver/radarr:latest
    container_name: radarr
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
    volumes:
      - ${CONFIG_PATH}/radarr:/config
      - /mnt/nas/Media:/data
    ports:
      - 7878:7878
    networks:
      - arr-net
    mem_limit: 768m
    restart: unless-stopped
```

### First run

1. `docker compose up -d sonarr radarr`
2. Browse `http://MEDIA_HOST_IP:8989` and `:7878`. Set authentication (Forms, with a real password).
3. **Settings → Media Management → Root Folders → Add**:
   - Sonarr: `/data/TV`
   - Radarr: `/data/Movies`
4. **Settings → Download Clients → Add**:
   - qBittorrent: Host `qbittorrent`, port `8083`, username/password from earlier.
   - SABnzbd: Host `sabnzbd`, port `8080`, API key `${SABNZBD_NZB_KEY}`.

   Use the container *names*, not IPs. Test the connection, must say "Test was successful."

5. **Settings → General**, copy each API key into `.env` (`SONARR_API_KEY`, `RADARR_API_KEY`).

### Wire Prowlarr → Sonarr/Radarr

Back to Prowlarr:

1. **Settings → Apps → Add**:
   - Sonarr: Prowlarr Server `http://prowlarr:9696`, Sonarr Server `http://sonarr:8989`, API key from Sonarr.
   - Radarr: same pattern.
2. **Save**. Prowlarr immediately pushes all your indexers (plus their categories and tags) to Sonarr/Radarr. From now on, **never add or edit indexers in Sonarr/Radarr directly**, Prowlarr will overwrite them on the next sync.

### Sonarr "Unmonitor Deleted Episodes", read this before deleting anything

In **Sonarr → Settings → Media Management** there's a setting called **Unmonitor Deleted Episodes**. If it's ON and you delete an episode file from disk, Sonarr will quietly unmonitor that episode and stop searching for it.

This is sometimes what you want (e.g. weekly cleanup of daily shows you've already watched) and sometimes a trap (delete the wrong file, Sonarr never re-downloads it). Decide which behavior you want before you delete anything from your library. The Radarr equivalent is **Unmonitor Deleted Movies**.

### Recycle bin

Sonarr and Radarr both have a **Recycle Bin** setting (Settings → Media Management → File Management → Recycling Bin Path). If set, deleted files go there instead of being immediately removed. The trade-off is disk space.

If you skip this, *every delete from the *arr UI is permanent*. The mitigation isn't a recycle bin, it's the pre-flight ritual below, read [The Pre-Flight Ritual](#the-pre-flight-ritual) before deleting at scale.


## Quality Profiles as Code: Recyclarr

[Recyclarr](https://github.com/recyclarr/recyclarr) syncs quality profiles and custom formats from the [TRaSH Guides](https://trash-guides.info/) into Sonarr and Radarr. Instead of clicking through dozens of custom formats in the UI, you describe what you want in a YAML file and let Recyclarr maintain it.

```yaml
  recyclarr:
    image: ghcr.io/recyclarr/recyclarr:latest
    container_name: recyclarr
    user: "${PUID}:${PGID}"
    environment:
      - SONARR_API_KEY=${SONARR_API_KEY}
      - RADARR_API_KEY=${RADARR_API_KEY}
      - TZ=${TZ}
    volumes:
      - ${CONFIG_PATH}/recyclarr:/config
    networks:
      - arr-net
    mem_limit: 128m
    restart: unless-stopped
```

The container runs Recyclarr's built-in cron, by default it syncs daily.

### `/opt/media/recyclarr/recyclarr.yml`

```yaml
# v8 schema — assign_scores_to is the correct key, NOT quality_profiles
sonarr:
  series:
    base_url: http://sonarr:8989
    api_key: !env_var SONARR_API_KEY
    quality_definition:
      type: series
    quality_profiles:
      - name: WEB-1080p
        reset_unmatched_scores:
          enabled: true
    custom_formats:
      - trash_ids:
          # WEB tier scoring (paste IDs from TRaSH Guides)
          - 1b3994c11eb-...
        assign_scores_to:
          - name: WEB-1080p

radarr:
  movies:
    base_url: http://radarr:7878
    api_key: !env_var RADARR_API_KEY
    quality_definition:
      type: movie
    quality_profiles:
      - name: HD Bluray + WEB
    custom_formats:
      - trash_ids:
          - <ids from trash-guides.info/Radarr/Radarr-collection-of-custom-formats/>
        assign_scores_to:
          - name: HD Bluray + WEB
```

### Trap: schema version

Recyclarr v7 used `quality_profiles:` to associate scores with profiles. Recyclarr v8 changed this to `assign_scores_to:`. If you copy a guide from before the change, it'll appear to run successfully but apply no scores. Always check the [Recyclarr docs](https://recyclarr.dev/) for the current schema.

### Trap: UI edits revert

Once Recyclarr owns a profile, Sonarr/Radarr UI edits vanish on the next sync. Change `recyclarr.yml` instead. That is intentional: the file is the source of truth, not the GUI.

To trigger a manual sync:

```bash
docker exec recyclarr recyclarr sync
```


## Subtitles: Bazarr

Bazarr watches Sonarr and Radarr. When a new episode or movie imports, Bazarr searches OpenSubtitles, Subscene, Subdivx, etc. for a matching subtitle, downloads it, and saves it alongside the media file.

```yaml
  bazarr:
    image: lscr.io/linuxserver/bazarr:latest
    container_name: bazarr
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
    volumes:
      - ${CONFIG_PATH}/bazarr:/config
      - /mnt/nas/Media:/data
    ports:
      - 6767:6767
    networks:
      - arr-net
    mem_limit: 512m
    restart: unless-stopped
```

### First run

1. `docker compose up -d bazarr`
2. Browse `http://MEDIA_HOST_IP:6767`. Set authentication.
3. **Settings → Sonarr**: enable, host `sonarr`, port `8989`, API key `${SONARR_API_KEY}`. Test → save.
4. **Settings → Radarr**: same pattern.
5. **Settings → Languages**: set your wanted languages (e.g. English with a fallback to undefined). Set a profile and tag it as **default** for both shows and movies.
6. **Settings → Providers**: enable a few subtitle providers. OpenSubtitles is the baseline; Subscene and others fill gaps.

### Trap: Bazarr only catches *new* imports

When Bazarr is first installed it does not retroactively fetch subtitles for your existing library. Trigger a manual scan: **System → Tasks → Search Missing Subtitles** for each library.


## Post-Download Extraction: Unpackerr

Some Usenet posts arrive as RAR archives. SABnzbd unpacks most of these natively, but edge cases (split archives, password-protected, oddly-named) slip through. Unpackerr watches the *arrs and extracts anything that's still compressed after import.

```yaml
  unpackerr:
    image: ghcr.io/unpackerr/unpackerr:latest
    container_name: unpackerr
    user: "${PUID}:${PGID}"
    environment:
      - TZ=${TZ}
      - UN_SONARR_0_URL=http://sonarr:8989
      - UN_SONARR_0_API_KEY=${SONARR_API_KEY}
      - UN_RADARR_0_URL=http://radarr:7878
      - UN_RADARR_0_API_KEY=${RADARR_API_KEY}
    volumes:
      - /mnt/nas/Media:/data
    networks:
      - arr-net
    mem_limit: 256m
    restart: unless-stopped
```

No web UI. It polls the *arrs and just works.


## Requests: Jellyseerr

[Jellyseerr](https://github.com/Fallenbagel/jellyseerr) is a fork of Overseerr that supports Jellyfin (Overseerr only supports Plex). Users browse a movie/TV catalog, click "Request," and Jellyseerr hands the request to Sonarr or Radarr.

```yaml
  jellyseerr:
    image: fallenbagel/jellyseerr:latest
    container_name: jellyseerr
    environment:
      - LOG_LEVEL=info
      - TZ=${TZ}
    volumes:
      - ${CONFIG_PATH}/jellyseerr:/app/config
    ports:
      - 5055:5055
    networks:
      - arr-net
    mem_limit: 512m
    restart: unless-stopped
```

**Permissions:** the Jellyseerr image runs as `node:node` (uid 1000), not `PUID`. Make sure the config dir is owned correctly before first start:

```bash
sudo mkdir -p /opt/media/jellyseerr
sudo chown -R 1000:1000 /opt/media/jellyseerr
```

### First run

1. `docker compose up -d jellyseerr`
2. Browse `http://MEDIA_HOST_IP:5055`. Pick Jellyfin as the media server.
3. **Sign in to Jellyfin**, Jellyseerr proxies its auth.
4. **Add Sonarr/Radarr servers**: host `sonarr` / `radarr`, the API key from each, quality profile to use for requested content, root folder.
5. **Notifications**: optional, Discord/Slack webhooks for request and approval events.

### Behind Cloudflare? Enable trustProxy

If you're putting Jellyseerr behind the Cloudflare Tunnel (which you probably are), edit `/opt/media/jellyseerr/settings.json` after first run:

```json
"trustProxy": true,
"applicationUrl": "https://request.example.com"
```

Restart the container. Without `trustProxy`, every client IP looks like Cloudflare's CDN, rate limiting and logging both break.


## Media Server: Jellyfin

The whole reason the rest of the stack exists.

```yaml
  jellyfin:
    image: lscr.io/linuxserver/jellyfin:latest
    container_name: jellyfin
    runtime: nvidia     # only if you have NVIDIA + Container Toolkit
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
      - JELLYFIN_PublishedServerUrl=https://watch.example.com
      - NVIDIA_VISIBLE_DEVICES=all
      - NVIDIA_DRIVER_CAPABILITIES=compute,video,utility
    volumes:
      - ${CONFIG_PATH}/jellyfin:/config
      - /mnt/nas/Media:/data
    ports:
      - 8096:8096
    networks:
      - arr-net
    mem_limit: 6g
    restart: unless-stopped
```

Drop the `runtime: nvidia` and the NVIDIA env vars if you don't have a GPU.

### First run

1. `docker compose up -d jellyfin`
2. Browse `http://MEDIA_HOST_IP:8096`. Walk through setup wizard.
3. **Libraries**:
   - Movies → `/data/Movies`
   - TV → `/data/TV`
   - (etc.)
   For each: leave the metadata defaults, enable "Real-time monitoring" so new imports show up without waiting for a scan.

### Hardware transcoding

After setup wizard:

**Dashboard → Playback → Transcoding**:
- Hardware acceleration: `NVIDIA NVENC` (or `Intel QuickSync` for iGPU)
- Enable hardware decoding for: H.264, HEVC, VP9, HEVC 10-bit, VP9 10-bit
- Enable: Tone mapping, NVDEC, NVENC

### Trap: 10-bit H.264 (Hi10P)

Anime and some other content is encoded in **10-bit H.264 (Hi10P)**, which is a niche profile that the *NVIDIA decoder supports natively* but many software paths don't. If a Hi10P stream stalls or shows green frames, it's almost always Jellyfin trying to decode it on CPU rather than NVDEC.

The fix is in Jellyfin's `encoding.xml` (lives in `/opt/media/jellyfin/`): make sure `EnableDecodingColorDepth10Hevc` and the H.264 equivalent are enabled. NVENC on Turing-class cards (RTX 20-series) and newer decodes Hi10P fine, you should *not* be re-encoding it to "fix" playback.

### Trap: trickplay OOMs

Jellyfin builds "trickplay" thumbnails for the scrub bar. Each one spawns ffmpeg. Out of the box it fans out to one job per CPU core, so a 12-core box during the first library scan can launch a dozen ffmpeg processes and OOM itself. I have done this twice.

Cap it in `/opt/media/jellyfin/system.xml`:

```xml
<LibraryScanFanoutConcurrency>2</LibraryScanFanoutConcurrency>
<LibraryMetadataRefreshConcurrency>2</LibraryMetadataRefreshConcurrency>
```

Restart Jellyfin. The library scan takes longer but won't crash the host.

### Trap: Jellyfin reset to setup wizard

If Jellyfin gets OOM-killed while writing `system.xml`, the file can corrupt and `IsStartupWizardCompleted` flips to `false`. Next boot looks like a fresh install. It is not. Your libraries are still there.

Fix without redoing setup:

```bash
sudo sed -i 's/<IsStartupWizardCompleted>false/<IsStartupWizardCompleted>true/' \
  /opt/media/jellyfin/system.xml
docker restart jellyfin
```


## Shared Postgres and Analytics: Jellystat

[Jellystat](https://github.com/CyferShepard/Jellystat) reads Jellyfin's playback data and renders dashboards (most-watched, watch hours, user activity). It needs a Postgres database.

Rather than spin up Postgres-per-app, use one Postgres container and create one database per service. This pattern scales nicely, add the next DB-needing service by adding a name to the init script.

```yaml
  postgres:
    image: postgres:15
    container_name: postgres
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - ${CONFIG_PATH}/postgres/data:/var/lib/postgresql/data
      - ${CONFIG_PATH}/postgres/init:/docker-entrypoint-initdb.d
    networks:
      - arr-net
    mem_limit: 512m
    restart: unless-stopped

  jellystat:
    image: cyfershepard/jellystat:latest
    container_name: jellystat
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_IP=postgres
      - POSTGRES_PORT=5432
      - POSTGRES_DB=jellystat
      - JWT_SECRET=${JWT_SECRET}
      - TZ=${TZ}
    volumes:
      - ${CONFIG_PATH}/jellystat/backup-data:/app/backend/backup-data
    ports:
      - 3000:3000
    networks:
      - arr-net
    depends_on:
      - postgres
    mem_limit: 256m
    restart: unless-stopped
```

### `/opt/media/postgres/init/create-databases.sh`

```bash
#!/bin/bash
set -e

for db in jellystat; do
  echo "Creating database: $db"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE $db;
    GRANT ALL PRIVILEGES ON DATABASE $db TO $POSTGRES_USER;
EOSQL
done
```

Make executable: `chmod +x /opt/media/postgres/init/create-databases.sh`

This script runs **only on a fresh data volume**, Postgres ignores `/docker-entrypoint-initdb.d` after first init. If you need to add a database later, add the name to the loop, then either:

- Run the equivalent `psql` command manually: `docker exec -it postgres psql -U admin -c "CREATE DATABASE newdb;"`
- Or wipe `/opt/media/postgres/data` and start fresh (destroys everything, only if there's nothing to lose).

### First run

```bash
echo "JWT_SECRET=$(openssl rand -hex 32)" >> /opt/media/.env
docker compose up -d postgres jellystat
```

Browse `http://MEDIA_HOST_IP:3000`, create admin user, point it at your Jellyfin instance.


## Notifications: Notifiarr

Wires Sonarr/Radarr/qBittorrent events to Discord, Slack, or pushover/etc. via webhooks. Optional but nice when you want a feed of what just finished downloading.

```yaml
  notifiarr:
    image: golift/notifiarr:latest
    container_name: notifiarr
    hostname: MEDIA_HOST
    volumes:
      - ${CONFIG_PATH}/notifiarr:/config
      - /var/run/utmp:/var/run/utmp
      - /etc/machine-id:/etc/machine-id
    ports:
      - 5454:5454
    networks:
      - arr-net
    mem_limit: 128m
    restart: unless-stopped
```

Sign up for free at [notifiarr.com](https://notifiarr.com/), get an API key, drop it in the Notifiarr UI on first run. Then wire each *arr's webhook to `http://notifiarr:5454/api/v1/notification/...`.


## Public Access: Cloudflare Tunnel

Skip the port-forwarding-on-your-router approach. **Cloudflare Tunnel** opens an outbound persistent connection from your `MEDIA_HOST` to Cloudflare's edge. Cloudflare receives requests for `watch.example.com` at the edge and forwards them down the tunnel to your container, no exposed home IP, no router port forwards, free for personal use.

### Set up the tunnel

1. Get a domain into Cloudflare (free plan is fine).
2. Cloudflare Dashboard → **Zero Trust** → **Networks → Tunnels → Create a tunnel**.
3. Connector type: **Cloudflared**. Name it.
4. Copy the long token Cloudflare gives you, paste it into `.env` as `CF_TUNNEL_TOKEN`.
5. **Public Hostnames** tab → add hostnames:

| Subdomain | Domain | Service Type | URL |
|---|---|---|---|
| watch | example.com | HTTP | `http://jellyfin:8096` |
| request | example.com | HTTP | `http://jellyseerr:5055` |

The "URL" field is what cloudflared resolves *from inside the tunnel container*, so it uses container DNS on `arr-net`. That's why Jellyfin is reachable as `http://jellyfin:8096`, not `http://MEDIA_HOST_IP:8096`.

### Compose service

```yaml
  cloudflared:
    image: cloudflare/cloudflared:latest
    container_name: cloudflared
    command: tunnel --no-autoupdate run --token ${CF_TUNNEL_TOKEN}
    environment:
      - TUNNEL_TOKEN=${CF_TUNNEL_TOKEN}
    networks:
      - arr-net
    mem_limit: 128m
    restart: unless-stopped
```

`docker compose up -d cloudflared`. Within a few seconds the Cloudflare dashboard shows the tunnel as **Healthy**, and `https://watch.example.com` resolves to Jellyfin.

### Cloudflare Access (optional auth wall)

For Jellyseerr (where you don't want randoms creating accounts), Zero Trust can put an email-OTP wall in front:

**Zero Trust → Access → Applications → Add a self-hosted application**:
- Application domain: `request.example.com`
- Policy: Include → Email → list of allowed addresses.

Anyone hitting `request.example.com` now has to enter an email Cloudflare sends a code to, before they reach Jellyseerr. Do NOT do this for `watch.example.com` if you want Jellyfin's native apps to work, the apps can't navigate an OTP page.


## LAN Dashboard: Glance

[Glance](https://github.com/glanceapp/glance) is a self-hosted single-page dashboard. It pulls live data from Sonarr, Radarr, Jellyfin, etc. via API and renders a clean grid of widgets. Useful as your browser homepage.

```yaml
  glance:
    image: glanceapp/glance:latest
    container_name: glance
    volumes:
      - ${CONFIG_PATH}/glance/glance.yml:/app/glance.yml
      - ${CONFIG_PATH}/glance/secrets.env:/app/secrets.env
    ports:
      - 8080:8080
    networks:
      - arr-net
    mem_limit: 128m
    restart: unless-stopped
```

(Or run it as a systemd user unit outside Docker, the binary is small.)

### `/opt/media/glance/glance.yml`, minimal example

```yaml
pages:
  - name: Media
    columns:
      - size: small
        widgets:
          - type: monitor
            cache: 1m
            sites:
              - title: Jellyfin
                url: http://jellyfin:8096
                icon: https://jellyfin.org/favicon.ico
              - title: Sonarr
                url: http://sonarr:8989
              - title: Radarr
                url: http://radarr:7878
              - title: Jellyseerr
                url: http://jellyseerr:5055

      - size: full
        widgets:
          - type: custom-api
            title: Sonarr Queue
            url: http://sonarr:8989/api/v3/queue?pageSize=20
            headers:
              X-Api-Key: ${SONARR_API_KEY}
            template: |
              {{ range .JSON.Array "records" }}
                <p>{{ .String "title" }} — {{ .String "status" }}</p>
              {{ end }}
```

Reload with `docker restart glance` after editing. Glance also hot-reloads on file save if you launch it without Docker.

### Secrets

Glance reads environment variables from a `secrets.env` file. Keep `chmod 600` and never commit:

```bash
SONARR_API_KEY=...
RADARR_API_KEY=...
PROWLARR_KEY=...
SABNZBD_KEY=...
JELLYFIN_KEY=...
```


## Container Management: Portainer and WUD

### Portainer

GUI for managing Docker, view container logs, restart, inspect, see resource usage. Not strictly necessary (the CLI does it all) but handy for visual debugging.

```yaml
  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ${CONFIG_PATH}/portainer:/data
    ports:
      - 9443:9443
    mem_limit: 128m
    restart: unless-stopped
```

Browse `https://MEDIA_HOST_IP:9443` (note HTTPS, self-signed cert), create admin user on first launch.

### WUD, What's Up Docker

[WUD](https://github.com/fmartinou/whats-up-docker) polls Docker registries hourly and tells you when a new version of any of your container images is available. Better than just `docker compose pull` blindly, you can read the changelog before pulling.

```yaml
  wud:
    image: fmartinou/whats-up-docker:latest
    container_name: wud
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ${CONFIG_PATH}/wud:/store
    ports:
      - 3001:3000
    environment:
      - WUD_WATCHER_LOCAL_CRON=0 * * * *   # every hour
    networks:
      - arr-net
    mem_limit: 128m
    restart: unless-stopped
```

Browse `http://MEDIA_HOST_IP:3001`. WUD discovers your containers automatically and lists pending updates. Hook up Discord/email webhooks if you want notifications instead of pulling the dashboard.


## Backups and Maintenance Crons

### Config backup cron

`/opt/media/` (the entire config tree) is small, usually under 5GB, and easily backed up nightly to the NAS as a tarball.

`/etc/cron.d/media-backup`:

```shellscript
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# Backup /opt/media nightly to NAS at 3am
0 3 * * * root tar czf /mnt/nas/Backup/media-$(date +\%Y\%m\%d).tar.gz /opt/media 2>>/var/log/media-backup.log && find /mnt/nas/Backup/media-*.tar.gz -mtime +14 -delete
```

That command:

1. Tars `/opt/media` into a dated `.tar.gz` on the NAS
2. Deletes backups older than 14 days

### Trap: backup cron fails silently when NAS is unmounted

If the NFS mount has dropped (NAS down, network blip), the cron writes to an empty mountpoint, which means the backup ends up on the *root filesystem*, eats local disk, and you don't notice until you do a restore.

Fix: prepend a mount check:

```shellscript
0 3 * * * root mountpoint -q /mnt/nas/Backup && tar czf /mnt/nas/Backup/media-$(date +\%Y\%m\%d).tar.gz /opt/media 2>>/var/log/media-backup.log
```

`mountpoint -q` exits non-zero if `/mnt/nas/Backup` isn't a real mount, short-circuiting the rest.

### "Current" cleanup cron (optional)

If you maintain a separate library of daily shows you only want to keep for a week (late night, sports, news), pair a separate Sonarr root folder with a cleanup cron.

`/etc/cron.d/current-cleanup`:

```shellscript
0 2 * * * root find /mnt/nas/Media/Current -type f \( -name "*.mkv" -o -name "*.mp4" \) -mtime +7 -delete >>/var/log/current-cleanup.log 2>&1
```

Combined with Sonarr's **Unmonitor Deleted Episodes** = ON, this gives you a self-pruning current-shows library: import, watch within a week, file gets deleted, Sonarr unmonitors it. Set and forget.


## The Pre-Flight Ritual

Before I change anything in this stack (compose edits, *arr settings, NFS mounts, quality profiles, bulk deletes), I stop for half a minute and run through:

1. What does this touch? Which containers, which paths on disk.
2. What else assumes that stays the same? Sonarr drags in qBit, Bazarr, Recyclarr, cleanup crons, and the hardlink layout.
3. How do I roll back? Compose: revert YAML and `docker compose up -d`. Deletes: no undo unless you kept a recycle bin or backup.
4. How will I know it worked? Which container log, which UI screen, which `df` line.

It feels fussy for a homelab. It is cheaper than restore-from-backup at midnight. Classic failure mode: delete an episode from disk with **Unmonitor Deleted Episodes** enabled, then wonder why Sonarr never re-grabs it.


## Traps and Troubleshooting

Symptoms I have actually hit, and what fixed them.

| Symptom | Cause | Fix |
|---|---|---|
| Sonarr/Radarr show "copy" instead of "hardlink" in Activity | Downloads and library are on different filesystems | Move both under the same mount (`/data` inside containers) |
| qBittorrent returns 403 to Sonarr/Radarr API calls | WebUI whitelist doesn't include the Docker bridge subnet | Add `172.16.0.0/12` to **WebUI → Authentication → Bypass authentication for clients in whitelisted IP subnets** |
| New indexer added in Prowlarr doesn't appear in Sonarr | Indexer has a tag that doesn't match the Sonarr app tag | Either remove the tag, or add a matching tag in the Sonarr app entry in Prowlarr |
| Sonarr stops searching for an episode after I deleted the file | "Unmonitor Deleted Episodes" = ON | Decide if this is what you want; re-monitor the episode in the series view to resume |
| Jellyfin transcoding spikes CPU to 100%; GPU idle | Hardware acceleration not enabled, or wrong codec/profile | Dashboard → Playback → Transcoding → enable NVENC/QSV; enable hardware decoding for relevant codecs |
| Hi10P anime stutters or shows green frames | Software decode of 10-bit H.264 | Enable Hi10P decode in Jellyfin encoding settings; do NOT re-encode the source |
| Jellyfin shows the setup wizard after a restart | OOMKill corrupted `system.xml` mid-write | `sudo sed -i 's/<IsStartupWizardCompleted>false/<IsStartupWizardCompleted>true/' /opt/media/jellyfin/system.xml` |
| Library scan kills the host with OOM | Too many parallel `ffmpeg` trickplay jobs | Cap `LibraryScanFanoutConcurrency` and `LibraryMetadataRefreshConcurrency` to 2 in `system.xml` |
| Quality profile changes in Sonarr/Radarr UI disappear overnight | Recyclarr is managing that profile | Edit `recyclarr.yml` instead; UI is not the source of truth |
| Recyclarr appears to sync but no custom format scores apply | Using old `quality_profiles:` syntax instead of v8's `assign_scores_to:` | Update to v8 schema |
| Jellyseerr shows every request as coming from the same IP | `trustProxy: false` and you're behind Cloudflare | Set `trustProxy: true` in `settings.json` and restart |
| `cloudflared` healthy but `watch.example.com` returns 502 | Public Hostname URL is wrong (using host IP instead of container DNS) | Set Public Hostname URL to `http://jellyfin:8096` (container name) |
| Backup cron silently produces no backups | NFS mount dropped; cron wrote to empty mountpoint or wrote to local disk | Add `mountpoint -q /mnt/nas/Backup &&` to the front of the cron command |
| Container can't reach another container by name (`Cannot resolve host`) | Both containers aren't on `arr-net` | Add the missing container to `networks: [arr-net]` and recreate |
| `df /mnt/nas/Media` hangs forever | NAS is unreachable, NFS hard mount is blocking | Restore the NAS; consider whether your other tasks check `mountpoint -q` first |


## Resources

### Documentation

- [TRaSH Guides](https://trash-guides.info/), read this before you touch quality profiles or custom formats in Sonarr/Radarr.
- [Servarr Wiki](https://wiki.servarr.com/), official docs for Sonarr, Radarr, Prowlarr, Readarr, Lidarr.
- [Jellyfin Documentation](https://jellyfin.org/docs/)
- [linuxserver.io image docs](https://docs.linuxserver.io/), most of the containers in this guide.
- [Recyclarr docs](https://recyclarr.dev/)
- [Cloudflare Tunnel docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)

### Community

- r/selfhosted, r/jellyfin, r/sonarr, r/PleX (cross-references)
- Jellyfin Matrix/Discord
- TRaSH Guides Discord (linked from trash-guides.info)

### Companion repos worth knowing

- [glanceapp/glance](https://github.com/glanceapp/glance), the dashboard.
- [unpackerr/unpackerr](https://github.com/unpackerr/unpackerr), extraction watcher.
- [fmartinou/whats-up-docker](https://github.com/fmartinou/whats-up-docker), container update tracker.
- [Fallenbagel/jellyseerr](https://github.com/Fallenbagel/jellyseerr), request system.
- [CyferShepard/Jellystat](https://github.com/CyferShepard/Jellystat), playback analytics.


*This is one working layout on my hardware. Your NAS, GPU, and DNS will differ. The pieces I would port to another house: one Docker network, one filesystem for downloads and library, Recyclarr owning profiles, and pausing before big deletes. Swap hostnames and paths in the YAML and call it yours.*
