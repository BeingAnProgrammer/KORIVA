import { Tone } from './tone.model';

/**
 * Status-pill colour treatments. `Tone` (accent/green/amber/orange/rose/blue)
 * is the reference design's reused hue system; rust/ochre/neutral are legacy
 * variants still used by pages not yet through the redesign.
 */
export type PillVariant = Tone | 'rust' | 'ochre' | 'neutral';
