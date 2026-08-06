import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';

import { Hsb, hexToHsb, hsbToHex, normalizeHex } from '../../../core/utils/color';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Draggable HSB colour picker — a gradient area + hue slider + hex field, controlled via `value`/`valueChange`. */
@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerComponent {
  readonly value = input.required<string>();
  readonly valueChange = output<string>();

  protected readonly hsb = signal<Hsb>({ h: 0, s: 0, b: 0 });
  protected readonly hexInputValue = signal('');

  protected readonly hexValue = computed(() => hsbToHex(this.hsb()));
  protected readonly areaBackground = computed(
    () => `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent), hsl(${this.hsb().h}, 100%, 50%)`
  );

  private lastEmittedHex = '';

  constructor() {
    effect(() => {
      const external = normalizeHex(this.value());
      if (external && external.toLowerCase() !== this.lastEmittedHex.toLowerCase()) {
        this.hsb.set(hexToHsb(external));
        this.hexInputValue.set(external);
        this.lastEmittedHex = external;
      }
    });
  }

  protected onAreaPointerDown(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }
    const el = event.currentTarget as HTMLElement;
    el.setPointerCapture(event.pointerId);
    el.focus();
    this.updateFromArea(el, event);
  }

  protected onAreaPointerMove(event: PointerEvent): void {
    const el = event.currentTarget as HTMLElement;
    if (el.hasPointerCapture(event.pointerId)) {
      this.updateFromArea(el, event);
    }
  }

  protected onAreaPointerUp(event: PointerEvent): void {
    const el = event.currentTarget as HTMLElement;
    if (el.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }
  }

  protected onAreaKeydown(event: KeyboardEvent): void {
    const step = event.shiftKey ? 10 : 1;
    const current = this.hsb();
    switch (event.key) {
      case 'ArrowRight':
        this.commit({ s: clamp(current.s + step, 0, 100) });
        break;
      case 'ArrowLeft':
        this.commit({ s: clamp(current.s - step, 0, 100) });
        break;
      case 'ArrowUp':
        this.commit({ b: clamp(current.b + step, 0, 100) });
        break;
      case 'ArrowDown':
        this.commit({ b: clamp(current.b - step, 0, 100) });
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  protected onHuePointerDown(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }
    const el = event.currentTarget as HTMLElement;
    el.setPointerCapture(event.pointerId);
    el.focus();
    this.updateFromHue(el, event);
  }

  protected onHuePointerMove(event: PointerEvent): void {
    const el = event.currentTarget as HTMLElement;
    if (el.hasPointerCapture(event.pointerId)) {
      this.updateFromHue(el, event);
    }
  }

  protected onHuePointerUp(event: PointerEvent): void {
    const el = event.currentTarget as HTMLElement;
    if (el.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }
  }

  protected onHueKeydown(event: KeyboardEvent): void {
    const step = event.shiftKey ? 10 : 1;
    const current = this.hsb().h;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      this.commit({ h: clamp(current + step, 0, 360) });
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      this.commit({ h: clamp(current - step, 0, 360) });
    } else {
      return;
    }
    event.preventDefault();
  }

  protected onHexInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    this.hexInputValue.set(raw);
    const normalized = normalizeHex(raw);
    if (normalized) {
      this.hsb.set(hexToHsb(normalized));
      this.lastEmittedHex = normalized;
      this.valueChange.emit(normalized);
    }
  }

  protected onHexBlur(): void {
    this.hexInputValue.set(this.hexValue());
  }

  private updateFromArea(el: HTMLElement, event: PointerEvent): void {
    const rect = el.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    this.commit({ s: Math.round(x * 100), b: Math.round((1 - y) * 100) });
  }

  private updateFromHue(el: HTMLElement, event: PointerEvent): void {
    const rect = el.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    this.commit({ h: Math.round(x * 360) });
  }

  private commit(partial: Partial<Hsb>): void {
    const merged = { ...this.hsb(), ...partial };
    this.hsb.set(merged);
    const hex = hsbToHex(merged);
    this.hexInputValue.set(hex);
    this.lastEmittedHex = hex;
    this.valueChange.emit(hex);
  }
}
