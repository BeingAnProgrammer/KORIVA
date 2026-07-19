/** A single line of a meeting transcript. */
export interface TranscriptLine {
  speaker: string;
  initials: string;
  timestamp: string;
  line: string;
}
