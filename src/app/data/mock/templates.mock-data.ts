import { TemplateCard } from '../models/template-card.model';

export const TEMPLATE_CARDS: readonly TemplateCard[] = [
  { icon: 'layout-template', name: 'Sales meeting', description: 'Opportunities, budget, client requirements, and follow-ups.', usageLabel: 'Used 42 times' },
  { icon: 'code-2', name: 'Development review', description: 'Technical discussions, risks, dependencies, and decisions.', usageLabel: 'Used 38 times' },
  { icon: 'scroll-text', name: 'Executive MOM', description: 'Board-ready minutes with decisions and accountability.', usageLabel: 'Used 27 times' },
  { icon: 'sparkles', name: 'Weekly digest prompt', description: 'AI prompt that summarizes the week across all meetings.', usageLabel: 'AI prompt' },
  { icon: 'user-round', name: 'HR — confidential', description: 'Sensitive notes with restricted access and redaction.', usageLabel: 'Department' }
];
