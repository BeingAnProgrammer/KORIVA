import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { SeoService } from '../../../core/services/seo.service';
import { TemplatesDataService } from '../../../data/services/templates-data.service';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { TemplateCardComponent } from '../components/template-card/template-card.component';

@Component({
  selector: 'app-templates-page',
  imports: [IconComponent, TemplateCardComponent],
  templateUrl: './templates-page.component.html',
  styleUrl: './templates-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplatesPageComponent {
  private readonly seo = inject(SeoService);
  private readonly data = inject(TemplatesDataService);

  protected readonly templates = toSignal(this.data.getTemplates(), { initialValue: [] });

  constructor() {
    this.seo.setPage({
      title: 'Templates',
      description: 'Purpose-built meeting formats for sales, product, HR, and more.',
      path: '/app/templates'
    });
  }
}
