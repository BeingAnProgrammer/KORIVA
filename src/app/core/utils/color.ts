/** HSB triple used internally by the color picker — h in [0,360), s/b in [0,100]. */
export interface Hsb {
  h: number;
  s: number;
  b: number;
}

const HEX_MATCH = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

/** Normalizes a user-typed hex string ('abc', '#abc', 'aabbcc', '#aabbcc') to '#rrggbb', or null if invalid. */
export function normalizeHex(value: string): string | null {
  const match = HEX_MATCH.exec(value.trim());
  if (!match) {
    return null;
  }
  const digits = match[1];
  const expanded = digits.length === 3 ? digits.split('').map((d) => d + d).join('') : digits;
  return `#${expanded.toLowerCase()}`;
}

export function hexToHsb(hex: string): Hsb {
  const normalized = normalizeHex(hex) ?? '#000000';
  const r = parseInt(normalized.slice(1, 3), 16) / 255;
  const g = parseInt(normalized.slice(3, 5), 16) / 255;
  const b = parseInt(normalized.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let hue = 0;
  if (delta !== 0) {
    if (max === r) {
      hue = ((g - b) / delta) % 6;
    } else if (max === g) {
      hue = (b - r) / delta + 2;
    } else {
      hue = (r - g) / delta + 4;
    }
    hue *= 60;
    if (hue < 0) {
      hue += 360;
    }
  }

  return {
    h: Math.round(hue),
    s: Math.round(max === 0 ? 0 : (delta / max) * 100),
    b: Math.round(max * 100)
  };
}

export function hsbToHex(hsb: Hsb): string {
  const s = hsb.s / 100;
  const v = hsb.b / 100;
  const c = v * s;
  const hh = hsb.h / 60;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  const m = v - c;

  let [r, g, b] = [0, 0, 0];
  if (hh >= 0 && hh < 1) [r, g, b] = [c, x, 0];
  else if (hh < 2) [r, g, b] = [x, c, 0];
  else if (hh < 3) [r, g, b] = [0, c, x];
  else if (hh < 4) [r, g, b] = [0, x, c];
  else if (hh < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (channel: number) => Math.round((channel + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
