import { Injectable, computed, signal } from '@angular/core';

/**
 * Owns the app-shell sidebar's state:
 * - `collapsed` — desktop icon-rail toggle (from the original design).
 * - `mobileOpen` — small-screen off-canvas drawer toggle (additive, since
 *   the source design was authored at a fixed desktop width and never
 *   specified mobile behavior for a persistent 264px sidebar).
 */
@Injectable({ providedIn: 'root' })
export class SidebarService {
  readonly collapsed = signal(false);
  readonly mobileOpen = signal(false);

  readonly showLabels = computed(() => !this.collapsed() || this.mobileOpen());

  readonly sidebarWidth = computed(() =>
    this.collapsed() ? 'var(--sidebar-w-collapsed)' : 'var(--sidebar-w)'
  );

  toggle(): void {
    this.collapsed.update((value) => !value);
  }

  collapse(): void {
    this.collapsed.set(true);
  }

  expand(): void {
    this.collapsed.set(false);
  }

  toggleMobile(): void {
    this.mobileOpen.update((value) => !value);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }
}
