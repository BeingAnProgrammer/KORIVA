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
 * (MOM and AI search get the merged `product-story` narrative; templates
 * get `meeting-types-grid`). Each gets a `color` tying it back to whichever
 * product-story chapter it belongs to — capture (live/recording), structure
 * (documents/organization), recall (AI/analysis) — or the brand indigo for
 * the two flagship AI capabilities. Turns a long, otherwise-flat list into
 * one with real rhythm and cross-references back to the page's own story.
 */
export const SHOWCASE_FEATURES: readonly Feature[] = [
  {
    icon: 'layout-template',
    title: 'Multi-meeting templates',
    desc: 'Purpose-built formats for sales, product, HR, and a dozen more.',
    color: 'var(--story-structure)'
  },
  {
    icon: 'video',
    title: 'Meeting recording',
    desc: 'Video and audio captured, indexed, and searchable down to the sentence.',
    color: 'var(--story-capture)'
  },
  {
    icon: 'sparkles',
    title: 'AI knowledge search',
    desc: 'Ask across every meeting you have ever held. Answers cite their source.',
    color: 'var(--accent)'
  },
  {
    icon: 'calendar-days',
    title: 'Meeting scheduling',
    desc: 'Schedule once. A bot joins, records, and files the outcome automatically.',
    color: 'var(--story-structure)'
  },
  {
    icon: 'bar-chart-3',
    title: 'Meeting analytics',
    desc: 'Hours, cadence, participation, and follow-through — measured, not guessed.',
    color: 'var(--story-recall)'
  },
  {
    icon: 'square-check-big',
    title: 'Action item tracking',
    desc: 'Every commitment extracted, assigned, and chased to done.',
    color: 'var(--story-capture)'
  },
  {
    icon: 'bot',
    title: 'AI agents',
    desc: 'Autonomous agents that join, summarize, and route follow-ups on your behalf.',
    color: 'var(--accent)'
  },
  {
    icon: 'download',
    title: 'Export to PDF and DOCX',
    desc: 'Board-ready documents in one click, formatted to your brand.',
    color: 'var(--story-structure)'
  },
  {
    icon: 'library',
    title: 'Organizational knowledge base',
    desc: 'Every meeting becomes durable, searchable institutional memory.',
    color: 'var(--story-recall)'
  }
];

// `color` cycles through the four story hues purely for rhythm as the
// marquee scrolls by — there's no semantic tie between e.g. "HR" and blue,
// it just keeps ten consecutive neutral cards from reading as one grey blur.
const TYPE_COLOR_CYCLE = ['var(--accent)', 'var(--story-structure)', 'var(--story-capture)', 'var(--story-recall)'] as const;

export const MEETING_TYPES: readonly MeetingType[] = [
  { icon: 'trending-up', name: 'Sales', fields: ['Opportunities', 'Budget', 'Client requirements', 'Follow-ups'], color: TYPE_COLOR_CYCLE[0] },
  { icon: 'megaphone', name: 'Marketing', fields: ['Campaigns', 'Channels', 'Metrics', 'Next steps'], color: TYPE_COLOR_CYCLE[1] },
  {
    icon: 'code-2',
    name: 'Development',
    fields: ['Technical discussions', 'Risks', 'Dependencies', 'Architecture decisions'],
    color: TYPE_COLOR_CYCLE[2]
  },
  { icon: 'compass', name: 'Product', fields: ['Roadmaps', 'Requirements', 'Decisions', 'Milestones'], color: TYPE_COLOR_CYCLE[3] },
  { icon: 'handshake', name: 'Client', fields: ['Objectives', 'Concerns', 'Commitments', 'Follow-ups'], color: TYPE_COLOR_CYCLE[0] },
  { icon: 'user-round', name: 'HR', fields: ['Topics', 'Sentiment', 'Actions', 'Confidential notes'], color: TYPE_COLOR_CYCLE[1] },
  { icon: 'sun', name: 'Daily standup', fields: ['Yesterday', 'Today', 'Blockers', 'Owners'], color: TYPE_COLOR_CYCLE[2] },
  {
    icon: 'clipboard-list',
    name: 'Interview',
    fields: ['Signals', 'Strengths', 'Concerns', 'Recommendation'],
    color: TYPE_COLOR_CYCLE[3]
  },
  { icon: 'crown', name: 'Leadership', fields: ['Priorities', 'Decisions', 'Risks', 'Accountability'], color: TYPE_COLOR_CYCLE[0] },
  {
    icon: 'settings-2',
    name: 'Custom template',
    fields: ['Your sections', 'Your prompts', 'Your format', 'Your owners'],
    color: TYPE_COLOR_CYCLE[1]
  }
];

/**
 * What the product itself guarantees on every meeting — true by design, not
 * a usage claim about customers KORIVA doesn't have yet. Colors deliberately
 * recap the product-story chapters in order (capture → structure → recall),
 * then close on the brand indigo for the flagship always-on stat — the same
 * color the hero opened on, bookending the page.
 */
export const STATS: readonly Stat[] = [
  { value: '3', label: 'Things captured every time — decisions, owners, deadlines', color: 'var(--story-capture)' },
  { value: '10+', label: 'Meeting types with their own MOM structure', color: 'var(--story-structure)' },
  { value: '1', label: 'Searchable knowledge base for every meeting you hold', color: 'var(--story-recall)' },
  { value: '24/7', label: 'AI assistant ready to answer, with citations', color: 'var(--accent)' }
];
