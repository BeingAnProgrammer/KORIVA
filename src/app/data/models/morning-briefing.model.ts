import { Tone } from './tone.model';

/** One narrative paragraph with a single inline-highlighted term. */
export interface BriefingParagraph {
  before: string;
  term: string;
  tone: Tone;
  after: string;
}

/** The "decision that mattered" highlight card. */
export interface BriefingDecision {
  quote: string;
  meetingLabel: string;
  agreedLabel: string;
}

/** Home page's "morning briefing" narrative section. */
export interface MorningBriefing {
  writtenAgo: string;
  headline: string;
  paragraphs: readonly BriefingParagraph[];
  decision: BriefingDecision;
  footerNote: string;
}
