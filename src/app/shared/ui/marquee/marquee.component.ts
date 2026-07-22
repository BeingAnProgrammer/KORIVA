import { ChangeDetectionStrategy, Component, TemplateRef, contentChild, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export type MarqueeDirection = 'left' | 'right';

export interface MarqueeItemContext<T> {
  $implicit: T;
  index: number;
}

/**
 * Generic infinite horizontal marquee — duplicates `items` (rendered via the
 * projected `<ng-template let-item>`) to loop seamlessly. Used for the
 * meeting-types row and the CTA band's phrase strip.
 *
 * Angular can only project a given `<ng-content>` once, so duplication for
 * the seamless loop is done by looping the *data* twice internally via
 * `contentChild(TemplateRef)` + `NgTemplateOutlet`, not by projecting twice.
 */
@Component({
  selector: 'app-marquee',
  imports: [NgTemplateOutlet],
  templateUrl: './marquee.component.html',
  styleUrl: './marquee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarqueeComponent<T> {
  readonly items = input.required<readonly T[]>();
  /** Seconds for one full loop. */
  readonly speed = input<number>(30);
  readonly direction = input<MarqueeDirection>('left');
  readonly pauseOnHover = input<boolean>(false);
  /** Fades items out at the left/right edges instead of a hard clip. */
  readonly edgeFade = input<boolean>(false);

  readonly itemTemplate = contentChild.required(TemplateRef<MarqueeItemContext<T>>);

  protected readonly repeats = [0, 1] as const;
}
