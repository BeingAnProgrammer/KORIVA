import { Feature } from '../models/feature.model';
import { MeetingType } from '../models/meeting-type.model';
import { PipelineStep } from '../models/pipeline-step.model';
import { Stat } from '../models/stat.model';

/** The 3-beat "how it works" pipeline — capture, structure, recall. */
export const PIPELINE_STEPS: readonly PipelineStep[] = [
  {
    icon: 'video',
    title: 'Bot joins & records',
    desc: 'Schedule once. KORIVA joins the call, records it, and transcribes every word.'
  },
  {
    icon: 'file-text',
    title: 'Structured into a MOM',
    desc: 'Decisions, owners, and deadlines extracted automatically — not a wall of text.'
  },
  {
    icon: 'sparkles',
    title: 'Ask anything, anytime',
    desc: 'Query a year of meetings in plain language. Every answer cites its source.'
  }
];

/**
 * The platform capabilities not already given their own deep-dive section
 * (MOM has `mom-spotlight`). "AI knowledge search" and "Multi-meeting
 * templates" are marked `featured` — they render as larger bento tiles here
 * since they also get their own dedicated section further down the page
 * (`ai-showcase`, `meeting-types-grid`) — a preview, not the full depth.
 */
export const SHOWCASE_FEATURES: readonly Feature[] = [
  {
    icon: 'layout-template',
    title: 'Multi-meeting templates',
    desc: 'Purpose-built formats for sales, product, HR, and a dozen more.',
    featured: true
  },
  {
    icon: 'video',
    title: 'Meeting recording',
    desc: 'Video and audio captured, indexed, and searchable down to the sentence.'
  },
  {
    icon: 'sparkles',
    title: 'AI knowledge search',
    desc: 'Ask across every meeting you have ever held. Answers cite their source.',
    featured: true
  },
  {
    icon: 'calendar-days',
    title: 'Meeting scheduling',
    desc: 'Schedule once. A bot joins, records, and files the outcome automatically.'
  },
  {
    icon: 'bar-chart-3',
    title: 'Meeting analytics',
    desc: 'Hours, cadence, participation, and follow-through — measured, not guessed.'
  },
  {
    icon: 'square-check-big',
    title: 'Action item tracking',
    desc: 'Every commitment extracted, assigned, and chased to done.'
  },
  {
    icon: 'bot',
    title: 'AI agents',
    desc: 'Autonomous agents that join, summarize, and route follow-ups on your behalf.'
  },
  {
    icon: 'download',
    title: 'Export to PDF and DOCX',
    desc: 'Board-ready documents in one click, formatted to your brand.'
  },
  {
    icon: 'library',
    title: 'Organizational knowledge base',
    desc: 'Every meeting becomes durable, searchable institutional memory.'
  }
];

export const MEETING_TYPES: readonly MeetingType[] = [
  { icon: 'trending-up', name: 'Sales', fields: ['Opportunities', 'Budget', 'Client requirements', 'Follow-ups'] },
  { icon: 'megaphone', name: 'Marketing', fields: ['Campaigns', 'Channels', 'Metrics', 'Next steps'] },
  { icon: 'code-2', name: 'Development', fields: ['Technical discussions', 'Risks', 'Dependencies', 'Architecture decisions'] },
  { icon: 'compass', name: 'Product', fields: ['Roadmaps', 'Requirements', 'Decisions', 'Milestones'] },
  { icon: 'handshake', name: 'Client', fields: ['Objectives', 'Concerns', 'Commitments', 'Follow-ups'] },
  { icon: 'user-round', name: 'HR', fields: ['Topics', 'Sentiment', 'Actions', 'Confidential notes'] },
  { icon: 'sun', name: 'Daily standup', fields: ['Yesterday', 'Today', 'Blockers', 'Owners'] },
  { icon: 'clipboard-list', name: 'Interview', fields: ['Signals', 'Strengths', 'Concerns', 'Recommendation'] },
  { icon: 'crown', name: 'Leadership', fields: ['Priorities', 'Decisions', 'Risks', 'Accountability'] },
  { icon: 'settings-2', name: 'Custom template', fields: ['Your sections', 'Your prompts', 'Your format', 'Your owners'] }
];

export const AI_QUERIES: readonly string[] = [
  'Show me all meetings where Azure OpenAI was discussed.',
  'Who was assigned the API integration task?',
  'Show all pending action items from the last 30 days.',
  'Which meetings discussed AI agents last quarter?'
];

/** First stat is the deliberate "hero" figure (accent-colored); the rest stay neutral. */
export const STATS: readonly Stat[] = [
  { value: '128', label: 'Hours saved this quarter', color: 'var(--accent)' },
  { value: '342', label: 'MOMs generated', color: 'var(--ink)' },
  { value: '96%', label: 'Action items completed', color: 'var(--ink)' },
  { value: '12k', label: 'Meetings searchable', color: 'var(--ink)' }
];
