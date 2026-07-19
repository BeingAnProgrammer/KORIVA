import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TemplateCard } from '../models/template-card.model';
import { TEMPLATE_CARDS } from '../mock/templates.mock-data';

@Injectable({ providedIn: 'root' })
export class TemplatesDataService {
  getTemplates(): Observable<readonly TemplateCard[]> {
    return of(TEMPLATE_CARDS);
  }
}
