import { Injectable, signal } from '@angular/core';

/**
 * The 6-beat arc the landing page tells: a meeting happens, KORIVA records
 * it, makes sense of it, remembers it, reasons over it, and turns it into
 * action. Every major marketing section owns one stage via
 * `[appJourneyStage]`; the journey rail renders this list once as the
 * page's persistent thread.
 */
export const JOURNEY_STAGES: readonly string[] = ['Meeting', 'Recording', 'Understanding', 'Knowledge', 'Intelligence', 'Action'];

/**
 * Tracks where the visitor is in the landing page's journey arc so the
 * fixed journey rail (desktop) / top progress bar (mobile) can reflect it.
 * `activeStageIndex` is set by whichever section's `[appJourneyStage]`
 * directive last crossed the viewport center — a discrete step rather than
 * a continuous scroll fraction, since the page is framed as 6 chapters, not
 * a smooth progress meter. CSS transitions on the rail's fill smooth the
 * jump between steps so it still reads as fluid.
 */
@Injectable({ providedIn: 'root' })
export class JourneyService {
  readonly activeStageIndex = signal(0);

  setActiveStage(index: number): void {
    this.activeStageIndex.set(index);
  }
}
