import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Section eyebrow label — ported verbatim from the handoff's `sectionEyebrow` style. */
@Component({
  selector: 'app-section-eyebrow',
  template: `
    <div class="section-eyebrow" [style.color]="color()">
      <span class="section-eyebrow__dot" [style.background]="color()"></span>
      <ng-content />
    </div>
  `,
  styles: `
    .section-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      text-transform: uppercase;
      letter-spacing: var(--tracking-caps);
      padding: 6px 12px;
      border-radius: var(--radius-pill);
      border: 1px solid var(--hairline);
      background: var(--surface);
      margin-bottom: var(--space-5);
    }

    .section-eyebrow__dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionEyebrowComponent {
  readonly color = input<string>('var(--accent)');
}
