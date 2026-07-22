import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

/** Real, plausible integration partners for a meeting bot — video platforms it joins, chat/doc tools it exports to, calendars it schedules from. */
const INTEGRATIONS: readonly string[] = ['Zoom', 'Google Meet', 'Microsoft Teams', 'Slack', 'Notion', 'Calendly'];

/** Quiet "works with the tools you already use" strip directly under the hero. */
@Component({
  selector: 'app-integrations-strip',
  imports: [ScrollRevealDirective],
  templateUrl: './integrations-strip.component.html',
  styleUrl: './integrations-strip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntegrationsStripComponent {
  protected readonly integrations = INTEGRATIONS;
}
