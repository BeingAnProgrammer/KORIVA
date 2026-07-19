import { Feature, FeatureCard } from '../models/feature.model';
import { MeetingType } from '../models/meeting-type.model';
import { Stat } from '../models/stat.model';

/** All 10 platform capabilities; index 0 is the features-grid lead card. */
export const FEATURES: readonly Feature[] = [
  {
    icon: 'file-text',
    title: 'AI-generated MOM',
    desc: 'Structured minutes tailored to each meeting type — decisions, owners, and deadlines, not a wall of text.'
  },
  {
    icon: 'clapperboard',
    title: 'Meeting recording',
    desc: 'Video and audio captured, indexed, and searchable down to the sentence.'
  },
  {
    icon: 'calendar-days',
    title: 'Meeting scheduling',
    desc: 'Schedule once. A bot joins, records, and files the outcome automatically.'
  },
  {
    icon: 'sparkles',
    title: 'AI knowledge search',
    desc: 'Ask across every meeting you have ever held. Answers cite their source.'
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
    icon: 'layout-template',
    title: 'Multi-meeting templates',
    desc: 'Purpose-built formats for sales, product, HR, and a dozen more.'
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

/** The features-grid lead card (span-6 tile) — always FEATURES[0]. */
export const FEATURE_LEAD: Feature = FEATURES[0];

/**
 * The remaining 9 features enriched with the accent colour + chip content
 * the design assigns each card (a 6-colour palette cycle plus a per-card
 * badge/meta/tag set), ported verbatim from the handoff's derivation logic.
 */
export const FEATURE_CARDS: readonly FeatureCard[] = [
  {
    ...FEATURES[1],
    color: '#8B5CF6',
    softColor: 'color-mix(in srgb, #8B5CF6 16%, transparent)',
    badge: 'Active',
    meta: 'HD',
    tags: ['#Video', '#Audio']
  },
  {
    ...FEATURES[2],
    color: 'var(--ochre)',
    softColor: 'var(--ochre-soft)',
    badge: 'Auto',
    meta: 'Calendars',
    tags: ['#Bots', '#Calendar']
  },
  {
    ...FEATURES[3],
    color: 'var(--rust)',
    softColor: 'var(--rust-soft)',
    badge: 'Live',
    meta: 'RAG',
    tags: ['#Search', '#AI']
  },
  {
    ...FEATURES[4],
    color: 'var(--ink-blue)',
    softColor: 'var(--ink-blue-soft)',
    badge: 'Updated',
    meta: 'Real-time',
    tags: ['#Metrics', '#Reports']
  },
  {
    ...FEATURES[5],
    color: '#34D399',
    softColor: 'color-mix(in srgb, #34D399 15%, transparent)',
    badge: 'Live',
    meta: '84 open',
    tags: ['#Tasks', '#Owners']
  },
  {
    ...FEATURES[6],
    color: 'var(--accent)',
    softColor: 'var(--accent-soft)',
    badge: 'Beta',
    meta: 'Autonomous',
    tags: ['#Agents', '#Automation']
  },
  {
    ...FEATURES[7],
    color: '#8B5CF6',
    softColor: 'color-mix(in srgb, #8B5CF6 16%, transparent)',
    badge: 'New',
    meta: '12 types',
    tags: ['#Templates', '#Formats']
  },
  {
    ...FEATURES[8],
    color: 'var(--ochre)',
    softColor: 'var(--ochre-soft)',
    badge: 'Ready',
    meta: '1-click',
    tags: ['#Export', '#Docs']
  },
  {
    ...FEATURES[9],
    color: 'var(--rust)',
    softColor: 'var(--rust-soft)',
    badge: 'Live',
    meta: 'Searchable',
    tags: ['#Knowledge', '#Memory']
  }
];

export const MEETING_TYPES: readonly MeetingType[] = [
  { icon: 'trending-up', name: 'Sales', tint: 'var(--accent)', fields: ['Opportunities', 'Budget', 'Client requirements', 'Follow-ups'] },
  { icon: 'megaphone', name: 'Marketing', tint: '#8B5CF6', fields: ['Campaigns', 'Channels', 'Metrics', 'Next steps'] },
  { icon: 'code-2', name: 'Development', tint: 'var(--ink-blue)', fields: ['Technical discussions', 'Risks', 'Dependencies', 'Architecture decisions'] },
  { icon: 'compass', name: 'Product', tint: 'var(--rust)', fields: ['Roadmaps', 'Requirements', 'Decisions', 'Milestones'] },
  { icon: 'handshake', name: 'Client', tint: '#34D399', fields: ['Objectives', 'Concerns', 'Commitments', 'Follow-ups'] },
  { icon: 'user-round', name: 'HR', tint: 'var(--ochre)', fields: ['Topics', 'Sentiment', 'Actions', 'Confidential notes'] },
  { icon: 'sun', name: 'Daily standup', tint: '#8B5CF6', fields: ['Yesterday', 'Today', 'Blockers', 'Owners'] },
  { icon: 'clipboard-list', name: 'Interview', tint: 'var(--rust)', fields: ['Signals', 'Strengths', 'Concerns', 'Recommendation'] },
  { icon: 'crown', name: 'Leadership', tint: 'var(--ochre)', fields: ['Priorities', 'Decisions', 'Risks', 'Accountability'] },
  { icon: 'settings-2', name: 'Custom template', tint: 'var(--ink-3)', fields: ['Your sections', 'Your prompts', 'Your format', 'Your owners'] }
];

export const AI_QUERIES: readonly string[] = [
  'Show me all meetings where Azure OpenAI was discussed.',
  'Who was assigned the API integration task?',
  'Show all pending action items from the last 30 days.',
  'Which meetings discussed AI agents last quarter?'
];

export const STATS: readonly Stat[] = [
  { value: '128', label: 'Hours saved this quarter', color: 'var(--accent)' },
  { value: '342', label: 'MOMs generated', color: '#8B5CF6' },
  { value: '96%', label: 'Action items completed', color: 'var(--ochre)' },
  { value: '12k', label: 'Meetings searchable', color: '#34D399' }
];
