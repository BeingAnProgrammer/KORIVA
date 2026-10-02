import { AskSuggestion } from '../models/ask-suggestion.model';
import { LiveMeeting } from '../models/live-meeting.model';

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
