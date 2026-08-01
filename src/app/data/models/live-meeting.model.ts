import { Tone } from './tone.model';

/** One participant row in the live-meeting panel's "Who is talking" section. */
export interface LiveSpeaker {
  initials: string;
  name: string;
  speaking: boolean;
  levelPercent: number;
  elapsed: string;
}

/** One line in the live transcript ticker — opacity fades older lines, `final` is the newest/active line. */
export interface LiveTranscriptLine {
  time: string;
  speaker: string;
  text: string;
  opacity: number;
  final: boolean;
}

/** One "Koriva is noticing" insight in the live-meeting panel's sidebar. */
export interface LiveNoticing {
  icon: string;
  tone: Tone;
  text: string;
  meta: string;
}

/** The Home page's live-meeting hero card — Koriva mid-call. */
export interface LiveMeeting {
  title: string;
  platform: string;
  since: string;
  startSeconds: number;
  speakers: readonly LiveSpeaker[];
  transcript: readonly LiveTranscriptLine[];
  noticings: readonly LiveNoticing[];
  liveInsightText: string;
  liveInsightLinkLabel: string;
}
