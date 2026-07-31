/** A meeting-type template card, shown on the landing page templates grid. */
export interface MeetingType {
  icon: string;
  name: string;
  fields: string[];
  /** CSS color value tinting this card's icon/border on hover — purely rhythmic, not semantic. */
  color?: string;
}
