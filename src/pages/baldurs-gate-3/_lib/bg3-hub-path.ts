import { getHubBySlug } from '../../../data/hubs';

const hub = getHubBySlug('baldurs-gate-3');

/** Hub index path, e.g. `/baldurs-gate-3`. */
export const baldursGate3HubPath = `/${hub.slug}`;

export function baldursGate3GuidePath(entryId: string): string {
  return `${baldursGate3HubPath}/${entryId}`;
}
