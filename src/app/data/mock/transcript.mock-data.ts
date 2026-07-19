import { TranscriptLine } from '../models/transcript-line.model';

export const TRANSCRIPT_LINES: readonly TranscriptLine[] = [
  { speaker: 'Marcus Kane', initials: 'MK', timestamp: '00:02', line: 'Let’s start with pipeline. We closed the quarter at $14.2M, up 8.1% year over year.' },
  { speaker: 'Ava Reyes', initials: 'AR', timestamp: '00:31', line: 'Strong. Enterprise carried it — mid-market renewals are where I’m worried.' },
  { speaker: 'Priya Nair', initials: 'PN', timestamp: '01:12', line: 'Agreed. Two of the mid-market accounts flagged the SSO gap again. That’s a blocker.' },
  { speaker: 'Marcus Kane', initials: 'MK', timestamp: '01:45', line: 'Then SSO moves up. Priya, can you own scoping it with Northwind by Friday?' },
  { speaker: 'Priya Nair', initials: 'PN', timestamp: '01:58', line: 'I’ll take it. I’ll also pull the Azure OpenAI usage so we size the rate limits.' }
];
