import { Injectable, signal } from '@angular/core';

const AUTO_HIDE_MS = 2600;

/** Bottom-center toast notification — matches the reference's global `toast(msg)`. */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _message = signal<string | null>(null);
  readonly message = this._message.asReadonly();

  private timeoutId?: ReturnType<typeof setTimeout>;

  show(message: string): void {
    clearTimeout(this.timeoutId);
    this._message.set(message);
    this.timeoutId = setTimeout(() => this._message.set(null), AUTO_HIDE_MS);
  }
}
