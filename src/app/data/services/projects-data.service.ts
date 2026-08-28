import { Injectable, signal } from '@angular/core';

import { slugify } from '../../core/utils/slugify';
import { Project } from '../models/project.model';
import { PROJECTS } from '../mock/projects.mock-data';

/**
 * Exposes a signal (not an Observable) — typing a new project name into the
 * Invite Meeting form creates it here, so every consumer (Memory's project
 * threads, Commitments' pill) needs to see that update immediately, the same
 * reason ScheduleDataService does this instead of a one-shot `of()`.
 */
@Injectable({ providedIn: 'root' })
export class ProjectsDataService {
  private readonly _projects = signal<readonly Project[]>(PROJECTS);
  readonly projects = this._projects.asReadonly();

  /** Looks up a project's name by id — null for no project or an id that no longer resolves. */
  getProjectName(projectId: string | null): string | null {
    if (!projectId) {
      return null;
    }
    return this._projects().find((project) => project.id === projectId)?.name ?? null;
  }

  findByName(name: string): Project | null {
    const trimmed = name.trim().toLowerCase();
    if (!trimmed) {
      return null;
    }
    return this._projects().find((project) => project.name.toLowerCase() === trimmed) ?? null;
  }

  /** Finds a project by name (case-insensitive, trimmed), or creates one on the spot if none exists yet. */
  findOrCreateByName(name: string): Project {
    const trimmed = name.trim();
    const existing = this.findByName(trimmed);
    if (existing) {
      return existing;
    }

    const project: Project = { id: slugify(trimmed) || `project-${Math.round(Math.random() * 1e9)}`, name: trimmed };
    this._projects.update((all) => [...all, project]);
    return project;
  }
}
