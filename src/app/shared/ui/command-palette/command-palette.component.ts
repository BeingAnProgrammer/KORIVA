import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, viewChild, ElementRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { CommandPaletteService } from '../../../core/services/command-palette.service';
import { ToastService } from '../../../core/services/toast.service';
import { ActionItemsDataService } from '../../../data/services/action-items-data.service';
import { MeetingsDataService } from '../../../data/services/meetings-data.service';
import { MemoryDataService } from '../../../data/services/memory-data.service';
import { IconComponent } from '../icon/icon.component';

interface PaletteItem {
  icon: string;
  label: string;
  meta: string;
  action: () => void;
}

interface PaletteGroup {
  name: string;
  items: readonly PaletteItem[];
}

const GO_TO_PAGES: readonly { label: string; route: string }[] = [
  { label: 'Home', route: '/app/home' },
  { label: 'Meetings', route: '/app/meetings' },
  { label: 'Memory', route: '/app/memory' },
  { label: 'Commitments', route: '/app/commitments' },
  { label: 'Patterns', route: '/app/patterns' },
  { label: 'Analytics', route: '/app/analytics' },
  { label: 'Settings', route: '/app/settings' }
];

/**
 * ⌘K command palette — search meetings, promises, people, or ask a question.
 * New component; nothing like it existed before this pass.
 */
@Component({
  selector: 'app-command-palette',
  imports: [IconComponent],
  templateUrl: './command-palette.component.html',
  styleUrl: './command-palette.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandPaletteComponent {
  protected readonly palette = inject(CommandPaletteService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);
  private readonly meetingsData = inject(MeetingsDataService);
  private readonly commitmentsData = inject(ActionItemsDataService);
  private readonly memoryData = inject(MemoryDataService);

  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('paletteInput');

  private readonly meetings = toSignal(this.meetingsData.getMeetings(), { initialValue: [] });
  private readonly commitments = toSignal(this.commitmentsData.getCommitments(), { initialValue: [] });
  private readonly threads = toSignal(this.memoryData.getThreads(), { initialValue: [] });

  protected readonly selectedIndex = signal(0);

  protected readonly groups = computed<readonly PaletteGroup[]>(() => {
    const query = this.palette.query().trim();
    const q = query.toLowerCase();
    const groups: PaletteGroup[] = [];

    if (query) {
      groups.push({
        name: 'Ask Koriva',
        items: [
          {
            icon: 'sparkles',
            label: query,
            meta: '↵',
            action: () => {
              this.palette.close();
              this.toast.show('Koriva is reading 312 meetings to answer that…');
            }
          }
        ]
      });
    }

    const meetings = this.meetings()
      .filter((m) => !q || `${m.title} ${m.summary} ${m.cat}`.toLowerCase().includes(q))
      .slice(0, 4);
    if (meetings.length) {
      groups.push({
        name: 'Meetings',
        items: meetings.map((m) => ({
          icon: 'calendar-days',
          label: m.title,
          meta: m.date,
          action: () => {
            this.palette.close();
            void this.router.navigate(['/app/meetings']);
          }
        }))
      });
    }

    const commitments = this.commitments()
      .filter((c) => !q || `${c.task} ${c.owner}`.toLowerCase().includes(q))
      .slice(0, 3);
    if (commitments.length) {
      groups.push({
        name: 'Commitments',
        items: commitments.map((c) => ({
          icon: 'square-check-big',
          label: c.task,
          meta: c.due,
          action: () => {
            this.palette.close();
            void this.router.navigate(['/app/commitments']);
          }
        }))
      });
    }

    const threads = this.threads()
      .filter((t) => !q || t.name.toLowerCase().includes(q))
      .slice(0, 3);
    if (threads.length) {
      groups.push({
        name: 'Memory',
        items: threads.map((t) => ({
          icon: 'library',
          label: `${t.name} · ${t.kind}`,
          meta: `${t.count} meetings`,
          action: () => {
            this.palette.close();
            void this.router.navigate(['/app/memory']);
          }
        }))
      });
    }

    const pages = GO_TO_PAGES.filter((p) => !q || p.label.toLowerCase().includes(q)).slice(0, 4);
    if (pages.length) {
      groups.push({
        name: 'Go to',
        items: pages.map((p) => ({
          icon: 'arrow-right',
          label: p.label,
          meta: '',
          action: () => {
            this.palette.close();
            void this.router.navigate([p.route]);
          }
        }))
      });
    }

    return groups;
  });

  protected readonly flatItems = computed(() => this.groups().flatMap((g) => g.items));

  constructor() {
    effect(() => {
      if (this.palette.isOpen()) {
        this.selectedIndex.set(0);
        queueMicrotask(() => this.inputRef()?.nativeElement.focus());
      }
    });
  }

  protected onQueryInput(value: string): void {
    this.palette.query.set(value);
    this.selectedIndex.set(0);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const items = this.flatItems();

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex.update((i) => Math.min(i + 1, items.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex.update((i) => Math.max(i - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      items[this.selectedIndex()]?.action();
    }
  }

  protected indexOf(group: PaletteGroup, item: PaletteItem): number {
    return this.flatItems().indexOf(item);
  }
}
