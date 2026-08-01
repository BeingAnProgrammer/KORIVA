import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

/** Global ⌘K / Ctrl+K command palette state, matching the reference's openPalette()/closePalette(). */
@Injectable({ providedIn: 'root' })
export class CommandPaletteService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly isOpen = signal(false);
  readonly query = signal('');

  constructor() {
    if (this.isBrowser) {
      document.addEventListener('keydown', this.onKeydown);
    }
  }

  open(prefillQuery = ''): void {
    this.query.set(prefillQuery);
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  private readonly onKeydown = (event: KeyboardEvent): void => {
    const key = event.key.toLowerCase();

    if ((event.metaKey || event.ctrlKey) && key === 'k') {
      event.preventDefault();
      this.isOpen() ? this.close() : this.open();
    } else if (key === 'escape' && this.isOpen()) {
      this.close();
    }
  };
}
