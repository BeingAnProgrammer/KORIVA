/** A project meetings and commitments can belong to. Meetings/commitments hold the `projectId`; this is the one place the name lives. */
export interface Project {
  id: string;
  name: string;
}
