import { ChatExchange } from '../models/chat-exchange.model';

/** Canned exchanges for the landing page's "ask a year of meetings anything" demo. */
export const CHAT_EXCHANGES: readonly ChatExchange[] = [
  {
    query: 'Show me all meetings where Azure OpenAI was discussed.',
    answer:
      'Azure OpenAI came up in 6 meetings this quarter. The API integration is owned by <strong>Priya Nair</strong>, due Friday — flagged in the Oct 14 development review.',
    citations: ['Dev review · Oct 14', 'Sales sync · Oct 9']
  },
  {
    query: 'Who was assigned the API integration task?',
    answer:
      '<strong>Priya Nair</strong> owns the Azure OpenAI API integration, due Friday. It was reassigned from Marcus Chen after the Oct 7 planning sync.',
    citations: ['Dev review · Oct 14', 'Sprint planning · Oct 7']
  },
  {
    query: 'Show all pending action items from the last 30 days.',
    answer:
      'There are <strong>14 open action items</strong> across 6 meetings. Sales has the most at 5, followed by Product at 4 — 3 are already overdue.',
    citations: ['Sales sync · Oct 9', 'Product review · Oct 16']
  },
  {
    query: 'Which meetings discussed AI agents last quarter?',
    answer:
      'AI agents came up in 3 meetings last quarter — most recently in the <strong>Nov 4 leadership sync</strong>, where autonomous follow-up routing was scoped for Q1.',
    citations: ['Leadership sync · Nov 4', 'Product review · Oct 16']
  }
];
