import { Project } from '../models/project.model';

/**
 * Canonical project list — shared by the Invite Meeting form, Memory's
 * Project-kind threads, and Commitments' project pill. `auth-migration`'s id
 * matches the existing 'Auth migration' thread in threads.mock-data.ts so
 * that thread doubles as its real project detail view.
 */
export const PROJECTS: readonly Project[] = [
  { id: 'auth-migration', name: 'Auth migration' },
  { id: 'website-redesign', name: 'Website Redesign' },
  { id: 'q4-planning', name: 'Q4 Planning' },
  { id: 'customer-onboarding', name: 'Customer Onboarding' }
];
