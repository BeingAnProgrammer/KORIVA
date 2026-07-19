import { PillVariant } from './pill-variant.model';

/** A tracked action item / commitment row. */
export interface ActionItem {
  task: string;
  owner: string;
  ownerInitials: string;
  due: string;
  meeting: string;
  status: string;
  statusVariant: PillVariant;
}
