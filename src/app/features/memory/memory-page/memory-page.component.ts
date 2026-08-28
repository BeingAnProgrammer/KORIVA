import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { CommandPaletteService } from '../../../core/services/command-palette.service';
import { SeoService } from '../../../core/services/seo.service';
import { formatRelativeDay } from '../../../core/utils/date';
import { getPlatformOption } from '../../../data/mock/schedule.mock-data';
import { Commitment } from '../../../data/models/commitment.model';
import { MeetingPlatform, MeetingSchedule } from '../../../data/models/meeting-schedule.model';
import { Thread } from '../../../data/models/thread.model';
import { CommitmentsDataService } from '../../../data/services/commitments-data.service';
import { MemoryDataService } from '../../../data/services/memory-data.service';
import { ProjectsDataService } from '../../../data/services/projects-data.service';
import { ScheduleDataService } from '../../../data/services/schedule-data.service';
import { ButtonDirective } from '../../../shared/directives/button.directive';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { StatusPillComponent } from '../../../shared/ui/status-pill/status-pill.component';
import { ThreadTimelineComponent } from '../components/thread-timeline/thread-timeline.component';

type MeetingSource = 'commitment' | 'schedule';

interface MeetingRef {
  source: MeetingSource;
  id: string;
}

interface ProjectMeetingRow extends MeetingRef {
  title: string;
  dateLabel: string;
}

@Component({
  selector: 'app-memory-page',
  imports: [ButtonDirective, ThreadTimelineComponent, IconComponent, StatusPillComponent, UpperCasePipe],
  templateUrl: './memory-page.component.html',
  styleUrl: './memory-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemoryPageComponent {
  private readonly seo = inject(SeoService);
  private readonly data = inject(MemoryDataService);
  private readonly commitmentsData = inject(CommitmentsDataService);
  private readonly scheduleData = inject(ScheduleDataService);
  private readonly projectsData = inject(ProjectsDataService);
  private readonly palette = inject(CommandPaletteService);
  private readonly router = inject(Router);

  protected readonly curatedThreads = toSignal(this.data.getThreads(), { initialValue: [] });
  protected readonly commitments = toSignal(this.commitmentsData.getCommitments(), { initialValue: [] });
  protected readonly scheduledMeetings = this.scheduleData.meetings;
  protected readonly selectedThreadId = signal<string | null>(null);
  protected readonly expandedProjectId = signal<string | null>(null);
  protected readonly selectedMeetingRef = signal<MeetingRef | null>(null);

  /**
   * Every real Project (including ones created on the fly from the Invite
   * Meeting form) gets a thread here, so it's clickable the moment it
   * exists — not just the handful with curated note/facts/items. Threads of
   * every other kind (Customer, Person, Open question) pass through as-is.
   */
  protected readonly threads = computed<readonly Thread[]>(() => {
    const nonProjectThreads = this.curatedThreads().filter((t) => t.kind !== 'Project');
    const projectThreads = this.projectsData.projects().map((project): Thread => {
      const curated = this.curatedThreads().find((t) => t.id === project.id);
      return {
        id: project.id,
        name: project.name,
        kind: 'Project',
        count: 0,
        note: curated?.note ?? '',
        items: curated?.items ?? [],
        facts: curated?.facts ?? []
      };
    });
    return [...nonProjectThreads, ...projectThreads];
  });

  protected readonly selectedThread = computed(() => {
    const id = this.selectedThreadId() ?? this.threads()[0]?.id;
    return this.threads().find((t) => t.id === id) ?? null;
  });

  protected readonly selectedCommitmentDetail = computed<Commitment | null>(() => {
    const ref = this.selectedMeetingRef();
    if (ref?.source !== 'commitment') {
      return null;
    }
    return this.commitments().find((c) => c.id === ref.id) ?? null;
  });

  protected readonly selectedScheduledMeetingDetail = computed<MeetingSchedule | null>(() => {
    const ref = this.selectedMeetingRef();
    if (ref?.source !== 'schedule') {
      return null;
    }
    return this.scheduledMeetings().find((m) => m.id === ref.id) ?? null;
  });

  /** Live meeting count for Project-kind threads (list badge + detail header); the curated static count for every other kind. */
  protected countFor(thread: Thread): number {
    if (thread.kind !== 'Project') {
      return thread.count;
    }
    const scheduledCount = this.scheduledMeetings().filter((m) => m.projectId === thread.id).length;
    const commitmentCount = this.commitments().filter((c) => c.projectId === thread.id).length;
    return scheduledCount + commitmentCount;
  }

  /** The individual meetings shown when a project is expanded in the left list — newest scheduled meetings first, then past commitments. */
  protected projectMeetings(thread: Thread): readonly ProjectMeetingRow[] {
    const fromScheduledMeetings = this.scheduledMeetings()
      .filter((m) => m.projectId === thread.id)
      .map(
        (m): ProjectMeetingRow => ({
          source: 'schedule',
          id: m.id,
          title: m.title,
          dateLabel: m.meetingType === 'instant' ? 'Instant meeting' : formatRelativeDay(m.scheduledDate)
        })
      );
    const fromCommitments = this.commitments()
      .filter((c) => c.projectId === thread.id)
      .map((c): ProjectMeetingRow => ({ source: 'commitment', id: c.id, title: c.title, dateLabel: c.date }));
    return [...fromScheduledMeetings, ...fromCommitments];
  }

  protected isMeetingSelected(ref: MeetingRef): boolean {
    const current = this.selectedMeetingRef();
    return current?.source === ref.source && current?.id === ref.id;
  }

  protected scheduledMeetingTimeLabel(meeting: MeetingSchedule): string {
    if (meeting.meetingType === 'instant') {
      return 'Instant meeting';
    }
    return `${formatRelativeDay(meeting.scheduledDate)} · ${meeting.startTime}–${meeting.endTime}`;
  }

  protected platformLabel(platform: MeetingPlatform): string {
    return getPlatformOption(platform).label;
  }

  constructor() {
    this.seo.setPage({
      title: 'Memory',
      description: 'What Koriva knows about Acme — people, companies and projects across every meeting.',
      path: '/app/memory'
    });
  }

  protected selectThread(thread: Thread): void {
    this.selectedThreadId.set(thread.id);
    this.selectedMeetingRef.set(null);
    this.expandedProjectId.set(thread.kind === 'Project' ? (this.expandedProjectId() === thread.id ? null : thread.id) : null);
  }

  protected selectMeeting(ref: MeetingRef): void {
    this.selectedMeetingRef.set(ref);
  }

  protected askAboutThread(name: string): void {
    this.palette.open(`Everything about ${name}`);
  }

  protected seeTheCommitments(): void {
    void this.router.navigate(['/app/commitments']);
  }
}
