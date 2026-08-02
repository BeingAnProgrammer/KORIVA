import { PillVariant } from './pill-variant.model';

/** A commitment row — the sentence someone said, who owes it, and its staleness. */
export interface Commitment {
  id?: number;
  task: string;
  owner: string;
  due: string;
  meeting: string;
  meetingId?: string;
  statusVariant: PillVariant;
  quote?: string;
  late?: boolean;
  done?: boolean;
}
