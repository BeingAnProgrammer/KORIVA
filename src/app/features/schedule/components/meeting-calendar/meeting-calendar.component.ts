import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

import { toIsoDate } from '../../../../core/utils/date';
import { getPlatformOption } from '../../../../data/mock/schedule.mock-data';
import { MeetingPlatform, MeetingSchedule } from '../../../../data/models/meeting-schedule.model';
import { IconButtonComponent } from '../../../../shared/ui/icon-button/icon-button.component';
import { SegmentedControlComponent } from '../../../../shared/ui/segmented-control/segmented-control.component';
import { SegmentedOption } from '../../../../shared/ui/segmented-control/segmented-option.model';

type CalendarView = 'month' | 'agenda';

interface CalendarDay {
  iso: string;
  dayNumber: number;
  inCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isPast: boolean;
  meetings: readonly MeetingSchedule[];
}

const ARROW_KEY_OFFSETS: Record<string, number> = {
  ArrowLeft: -1,
  ArrowRight: 1,
  ArrowUp: -7,
  ArrowDown: 7
};

interface AgendaGroup {
  iso: string;
  label: string;
  meetings: readonly MeetingSchedule[];
}

const WEEKDAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const VIEW_OPTIONS: readonly SegmentedOption<CalendarView>[] = [
  { value: 'month', label: 'Month', icon: 'layout-grid' },
  { value: 'agenda', label: 'Agenda', icon: 'layout-list' }
];

/**
 * Monthly calendar of Koriva's scheduled meetings — adapted from a 21st.dev
 * reference (originally React/framer-motion/a fixed dark palette) into
 * Koriva's own signal + CSS-transition + design-token idiom so it keeps
 * working in both themes.
 */
@Component({
  selector: 'app-meeting-calendar',
  imports: [IconButtonComponent, SegmentedControlComponent],
  templateUrl: './meeting-calendar.component.html',
  styleUrl: './meeting-calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingCalendarComponent {
  readonly meetings = input<readonly MeetingSchedule[]>([]);
  readonly selectedDate = input<string | null>(null);
  readonly dateSelected = output<string>();

  protected readonly view = signal<CalendarView>('month');
  protected readonly viewOptions = VIEW_OPTIONS;
  protected readonly weekdayLabels = WEEKDAY_LABELS;

  private readonly today = toIsoDate(new Date());
  private readonly cursor = signal({ year: new Date().getFullYear(), month: new Date().getMonth() });

  protected readonly monthLabel = computed(() =>
    new Date(this.cursor().year, this.cursor().month, 1).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
  );

  private readonly meetingsByDate = computed(() => {
    const map = new Map<string, MeetingSchedule[]>();
    for (const meeting of this.meetings()) {
      if (!meeting.scheduledDate) {
        continue;
      }
      const bucket = map.get(meeting.scheduledDate);
      if (bucket) {
        bucket.push(meeting);
      } else {
        map.set(meeting.scheduledDate, [meeting]);
      }
    }
    for (const bucket of map.values()) {
      bucket.sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
    return map;
  });

  protected readonly days = computed<readonly CalendarDay[]>(() => {
    const { year, month } = this.cursor();
    const selected = this.selectedDate();
    const firstOfMonth = new Date(year, month, 1);
    const gridStart = new Date(year, month, 1 - firstOfMonth.getDay());

    return Array.from({ length: 42 }, (_, i) => {
      const cellDate = new Date(gridStart);
      cellDate.setDate(gridStart.getDate() + i);
      const iso = toIsoDate(cellDate);

      return {
        iso,
        dayNumber: cellDate.getDate(),
        inCurrentMonth: cellDate.getMonth() === month,
        isToday: iso === this.today,
        isSelected: iso === selected,
        isPast: iso < this.today,
        meetings: this.meetingsByDate().get(iso) ?? []
      };
    });
  });

  protected readonly agendaGroups = computed<readonly AgendaGroup[]>(() => {
    const { year, month } = this.cursor();
    return [...this.meetingsByDate().entries()]
      .filter(([iso]) => {
        const date = new Date(`${iso}T00:00:00`);
        return date.getFullYear() === year && date.getMonth() === month;
      })
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([iso, meetings]) => ({
        iso,
        label: new Date(`${iso}T00:00:00`).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
        meetings
      }));
  });

  protected prevMonth(): void {
    this.cursor.update(({ year, month }) => (month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 }));
  }

  protected nextMonth(): void {
    this.cursor.update(({ year, month }) => (month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 }));
  }

  protected selectDay(day: CalendarDay): void {
    if (day.inCurrentMonth && !day.isPast) {
      this.dateSelected.emit(day.iso);
    }
  }

  protected platformLabel(platform: MeetingPlatform): string {
    return getPlatformOption(platform).label;
  }

  protected dayAriaLabel(day: CalendarDay): string {
    const label = new Date(`${day.iso}T00:00:00`).toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
    const meetingCount = day.meetings.length ? `, ${day.meetings.length} meeting${day.meetings.length === 1 ? '' : 's'} scheduled` : '';
    return `${label}${day.isToday ? ', today' : ''}${meetingCount}`;
  }

  /** Roving arrow-key navigation across the visible (non-disabled) day cells — Home/End jump to the first/last. */
  protected onGridKeydown(event: KeyboardEvent): void {
    const grid = event.currentTarget as HTMLElement;
    const cells = Array.from(grid.querySelectorAll<HTMLButtonElement>('.meeting-calendar__day:not(:disabled)'));
    const currentIndex = cells.indexOf(document.activeElement as HTMLButtonElement);
    if (currentIndex === -1) {
      return;
    }

    let nextIndex: number | null = null;
    if (event.key in ARROW_KEY_OFFSETS) {
      nextIndex = currentIndex + ARROW_KEY_OFFSETS[event.key];
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = cells.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    cells[Math.min(Math.max(nextIndex, 0), cells.length - 1)]?.focus();
  }
}
