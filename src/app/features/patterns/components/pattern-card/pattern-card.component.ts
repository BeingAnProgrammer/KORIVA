import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Pattern } from '../../../../data/models/pattern.model';
import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

/**
 * A collapsible trend card — title + tinted trend stat, expanding to reveal
 * detail copy and the evidence it was drawn from. New component; the old
 * Intelligence page had no concept of a "pattern" at all.
 */
@Component({
  selector: 'app-pattern-card',
  imports: [IconComponent, ButtonDirective, RouterLink, UpperCasePipe],
  templateUrl: './pattern-card.component.html',
  styleUrl: './pattern-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatternCardComponent {
  readonly pattern = input.required<Pattern>();
  readonly expanded = input(false);
  readonly toggled = output<void>();
  readonly askClicked = output<void>();

  protected readonly dirIcon = computed(() => {
    switch (this.pattern().dir) {
      case 'up':
        return 'chevron-up';
      case 'down':
        return 'chevron-down';
      default:
        return 'minus';
    }
  });
}
