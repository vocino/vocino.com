/**
 * BG3 hub cover — thin wrapper over the shared box art registry.
 * Do not fetch from Twitch here; see CLAUDE.md → "Twitch integrations".
 */
import {
  getTwitchBoxArtPublicPath,
  TWITCH_BOX_ART_DISPLAY_SIZE,
} from '../../../data/twitch-game-boxart';

export const BG3_BOX_ART_SIZE = TWITCH_BOX_ART_DISPLAY_SIZE;

export function getBg3BoxArtUrl(): string {
  return getTwitchBoxArtPublicPath('bg3');
}
