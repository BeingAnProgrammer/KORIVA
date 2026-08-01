import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';

import { ACCENT_OPTIONS, ThemeMode } from '../models/theme.model';

const STORAGE_KEY = 'koriva-theme';
const ACCENT_STORAGE_KEY = 'koriva-accent';
const THEME_CYCLE: readonly ThemeMode[] = ['system', 'light', 'dark'];

/**
 * Owns the app-wide light/dark/system theme, mirroring the prototype's
 * `theme` state: applies `data-theme` on <html> and persists the choice.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly theme = signal<ThemeMode>(this.readInitialTheme());
  readonly accent = signal<string>(this.readInitialAccent());

  readonly themeIcon = computed(() => {
    switch (this.theme()) {
      case 'light':
        return 'sun';
      case 'dark':
        return 'moon';
      default:
        return 'monitor';
    }
  });

  constructor() {
    effect(() => {
      const mode = this.theme();
      this.document.documentElement.setAttribute('data-theme', mode);

      if (this.isBrowser) {
        localStorage.setItem(STORAGE_KEY, mode);
      }
    });

    // Accent overrides --accent/--accent-ink inline, independent of theme
    // mode — matches the reference's setAccent(), which flattens both tokens
    // to the same swatch hex rather than deriving a separate hover ink.
    effect(() => {
      const hex = this.accent();
      this.document.documentElement.style.setProperty('--accent', hex);
      this.document.documentElement.style.setProperty('--accent-ink', hex);

      if (this.isBrowser) {
        localStorage.setItem(ACCENT_STORAGE_KEY, hex);
      }
    });
  }

  setTheme(mode: ThemeMode): void {
    this.theme.set(mode);
  }

  cycleTheme(): void {
    const next = (THEME_CYCLE.indexOf(this.theme()) + 1) % THEME_CYCLE.length;
    this.theme.set(THEME_CYCLE[next]);
  }

  setAccent(hex: string): void {
    this.accent.set(hex);
  }

  private readInitialTheme(): ThemeMode {
    if (!this.isBrowser) {
      return 'dark';
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'system' || stored === 'light' || stored === 'dark' ? stored : 'dark';
  }

  private readInitialAccent(): string {
    if (!this.isBrowser) {
      return ACCENT_OPTIONS[0].hex;
    }

    return localStorage.getItem(ACCENT_STORAGE_KEY) ?? ACCENT_OPTIONS[0].hex;
  }
}
