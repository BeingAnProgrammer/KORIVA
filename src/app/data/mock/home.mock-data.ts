import { AskSuggestion } from '../models/ask-suggestion.model';
import { LiveMeeting } from '../models/live-meeting.model';
import { MorningBriefing } from '../models/morning-briefing.model';
import { TodayFocusItem } from '../models/today-focus-item.model';

export const HOME_ASK_EYEBROW = "Koriva has read every meeting you've had · 342 sets of minutes";

export const HOME_ASK_SUGGESTIONS: readonly AskSuggestion[] = [
  { label: 'What did we decide?', tone: 'green' },
  { label: 'What keeps going wrong?', tone: 'orange' },
  { label: 'Who owes me something?', tone: 'amber' },
  { label: 'Everything about Northwind', tone: 'blue' }
];

/** Ported verbatim from the reference design's live-meeting hero card. */
export const LIVE_MEETING: LiveMeeting = {
  title: 'Mobile app architecture',
  platform: 'Google Meet',
  since: '16:30',
  startSeconds: 12 * 60 + 4,
  speakers: [
    { initials: 'PN', name: 'Priya', speaking: true, levelPercent: 64, elapsed: '6m 21s · speaking' },
    { initials: 'DT', name: 'Devon', speaking: false, levelPercent: 31, elapsed: '3m 02s' },
    { initials: 'MK', name: 'Marcus +2', speaking: false, levelPercent: 14, elapsed: '1m 18s' }
  ],
  transcript: [
    { time: '16:40', speaker: 'Devon', text: "If we cut over the write path first we're blind for a day.", opacity: 0.42, final: false },
    { time: '16:41', speaker: 'Marcus', text: 'Legal will want the audit trail intact through the whole window.', opacity: 0.7, final: false },
    {
      time: '16:42',
      speaker: 'Priya',
      text: 'So we ship the read path first and backfill embeddings overnight — search stays warm through the migration',
      opacity: 1,
      final: true
    }
  ],
  noticings: [
    { icon: 'check', tone: 'green', text: 'They just decided: read path ships before the backfill.', meta: 'DECISION · JUST NOW' },
    { icon: 'triangle-alert', tone: 'orange', text: 'Marcus raised the audit trail — same concern legal had in June.', meta: 'RISK · 1 MIN AGO' },
    { icon: 'square-check-big', tone: 'amber', text: 'Priya took the overnight embedding spike.', meta: 'COMMITMENT · 4 MIN AGO' }
  ],
  liveInsightText: 'Rate limits have blocked a launch three times this quarter. This is the third.',
  liveInsightLinkLabel: 'Show the other two →'
};

export const MORNING_BRIEFING: MorningBriefing = {
  writtenAgo: 'WRITTEN 8 MIN AGO',
  headline: 'Three things moved while you were away.',
  paragraphs: [
    {
      before: '',
      term: 'Pricing',
      tone: 'rose',
      after:
        " stopped being one segment's objection. It came up in eight meetings this month, and two enterprise deals are now waiting on the same tiering question — which still has no owner."
    },
    {
      before: 'Engineering went quiet in the good way. The ',
      term: 'auth migration',
      tone: 'blue',
      after:
        " has gone eleven days without a new blocker and Monday's rate-limit increase landed. Priya's staging deploy is the last loose thread."
    },
    {
      before: '',
      term: 'Northwind',
      tone: 'amber',
      after:
        ' is being tracked in four rooms at once — sales, legal and engineering each keeping their own version of the truth. The scope Marcus promised is three weeks late.'
    }
  ],
  decision: {
    quote: 'Knowledge search moves to the top of the Q4 roadmap.',
    meetingLabel: 'Product roadmap Q4',
    agreedLabel: 'agreed by 6 of 7'
  },
  footerNote: 'Koriva read 6 meetings, 41 pages of transcript and 12 attached documents to write this.'
};

export const TODAY_FOCUS_ITEMS: readonly TodayFocusItem[] = [
  {
    tone: 'rose',
    title: "Marcus still hasn't sent Northwind the SSO scope",
    description: "Promised three weeks ago, and it came up again in this morning's check-in. Koriva has the draft ready from your June answer.",
    ctaLabel: 'Draft it'
  },
  {
    tone: 'amber',
    title: 'The mid-market tiering question has no owner',
    description: 'Raised in four meetings, assigned in none. Two deals are waiting on it.',
    ctaLabel: 'Assign'
  },
  {
    tone: 'accent',
    title: "You're interviewing at 17:30 and haven't read the rounds",
    description: 'Two previous conversations, both recorded. Koriva can compress them to a page.',
    ctaLabel: 'Brief me'
  }
];

/** The reference hardcodes this "already filed" summary row rather than deriving it from meeting data. */
export const REST_OF_TODAY_FILED_NOTE = '2 meetings already filed';
export const REST_OF_TODAY_FILED_TITLES = 'Q3 sales review · Northwind check-in';
