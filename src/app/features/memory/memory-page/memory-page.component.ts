import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { CommandPaletteService } from '../../../core/services/command-palette.service';
import { SeoService } from '../../../core/services/seo.service';
import { MemoryDataService } from '../../../data/services/memory-data.service';
import { ButtonDirective } from '../../../shared/directives/button.directive';
import { ThreadTimelineComponent } from '../components/thread-timeline/thread-timeline.component';

@Component({
  selector: 'app-memory-page',
  imports: [ButtonDirective, ThreadTimelineComponent, UpperCasePipe],
  templateUrl: './memory-page.component.html',
  styleUrl: './memory-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemoryPageComponent {
  private readonly seo = inject(SeoService);
  private readonly data = inject(MemoryDataService);
  private readonly palette = inject(CommandPaletteService);
  private readonly router = inject(Router);

  protected readonly threads = toSignal(this.data.getThreads(), { initialValue: [] });
  protected readonly selectedThreadId = signal<string | null>(null);

  protected readonly selectedThread = computed(() => {
    const id = this.selectedThreadId() ?? this.threads()[0]?.id;
    return this.threads().find((t) => t.id === id) ?? null;
  });

  constructor() {
    this.seo.setPage({
      title: 'Memory',
      description: 'What Koriva knows about Acme — people, companies and projects across every meeting.',
      path: '/app/memory'
    });
  }

  protected selectThread(id: string): void {
    this.selectedThreadId.set(id);
  }

  protected askAboutThread(name: string): void {
    this.palette.open(`Everything about ${name}`);
  }

  protected seeTheCommitments(): void {
    void this.router.navigate(['/app/commitments']);
  }
}
