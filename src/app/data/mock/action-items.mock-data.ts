import { ActionItem } from '../models/action-item.model';

export const ACTION_ITEMS: readonly ActionItem[] = [
  { task: 'Ship API integration to staging', owner: 'Priya Nair', ownerInitials: 'PN', due: 'Fri, Oct 18', meeting: 'Dev standup', status: 'In progress', statusVariant: 'ochre' },
  { task: 'Send Northwind SSO + audit log scope', owner: 'Marcus Kane', ownerInitials: 'MK', due: 'Oct 10', meeting: 'Client — Northwind', status: 'Overdue', statusVariant: 'rust' },
  { task: 'Finalize Q4 roadmap deck', owner: 'Sofia Lund', ownerInitials: 'SL', due: 'Mon, Oct 21', meeting: 'Product roadmap Q4', status: 'Open', statusVariant: 'neutral' },
  { task: 'Update pricing model for mid-market', owner: 'Ava Reyes', ownerInitials: 'AR', due: 'Oct 12', meeting: 'Q3 sales review', status: 'Done', statusVariant: 'accent' },
  { task: 'Draft candidate scorecard', owner: 'Devon Tran', ownerInitials: 'DT', due: 'Wed, Oct 16', meeting: 'Interview — Staff Eng', status: 'Open', statusVariant: 'neutral' }
];
