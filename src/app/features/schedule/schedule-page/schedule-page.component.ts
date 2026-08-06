import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { formatRelativeDay, toIsoDate } from '../../../core/utils/date';
import { SeoService } from '../../../core/services/seo.service';
import { ToastService } from '../../../core/services/toast.service';
import {
  DEFAULT_ENTRY_MESSAGE,
  DEFAULT_KORIVA_DISPLAY_NAME,
  getPlatformOption,
  MEETING_KIND_OPTIONS,
  MEETING_PLATFORM_OPTIONS
} from '../../../data/mock/schedule.mock-data';
import { MeetingKind, MeetingPlatform, MeetingScheduleDraft } from '../../../data/models/meeting-schedule.model';
import { ScheduleDataService } from '../../../data/services/schedule-data.service';
import { ButtonDirective } from '../../../shared/directives/button.directive';
import { SegmentedControlComponent } from '../../../shared/ui/segmented-control/segmented-control.component';
import { AvatarPickerComponent } from '../components/avatar-picker/avatar-picker.component';
import { MeetingCalendarComponent } from '../components/meeting-calendar/meeting-calendar.component';
import { MeetingSummaryComponent, MeetingSummaryView } from '../components/meeting-summary/meeting-summary.component';

const URL_PLACEHOLDERS: Record<MeetingPlatform, string> = {
  'google-meet': 'https://meet.google.com/abc-defg-hij',
  zoom: 'https://zoom.us/j/1234567890',
  teams: 'https://teams.microsoft.com/l/meetup-join/…'
};

@Component({
  selector: 'app-schedule-page',
  imports: [ButtonDirective, SegmentedControlComponent, MeetingCalendarComponent, AvatarPickerComponent, MeetingSummaryComponent],
  templateUrl: './schedule-page.component.html',
  styleUrl: './schedule-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulePageComponent {
  private readonly seo = inject(SeoService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly scheduleData = inject(ScheduleDataService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly platformOptions = MEETING_PLATFORM_OPTIONS;
  protected readonly meetingTypeOptions = MEETING_KIND_OPTIONS;
  protected readonly meetings = this.scheduleData.meetings;
  protected readonly today = toIsoDate(new Date());

  protected readonly title = signal('Weekly Engineering Standup');
  protected readonly platform = signal<MeetingPlatform>('google-meet');
  protected readonly url = signal('');
  protected readonly urlTouched = signal(false);
  protected readonly meetingType = signal<MeetingKind>('scheduled');
  protected readonly scheduledDate = signal(this.today);
  protected readonly startTime = signal('10:00');
  protected readonly endTime = signal('11:00');
  protected readonly entryMessage = signal(DEFAULT_ENTRY_MESSAGE);
  protected readonly displayName = signal(DEFAULT_KORIVA_DISPLAY_NAME);
  protected readonly avatar = signal<string | null>(null);
  protected readonly submitting = signal(false);

  protected readonly urlError = computed(() => {
    const value = this.url().trim();
    if (!value) {
      return null;
    }
    try {
      new URL(value);
      return null;
    } catch {
      return 'Enter a valid meeting URL';
    }
  });

  protected readonly urlPlaceholder = computed(() => URL_PLACEHOLDERS[this.platform()]);

  protected readonly timeRangeError = computed(() => {
    if (this.meetingType() === 'instant') {
      return null;
    }
    if (this.scheduledDate() < this.today) {
      return "That date has already passed — pick a date from today onward.";
    }
    if (this.startTime() && this.endTime() && this.endTime() <= this.startTime()) {
      return 'End time must be after the start time.';
    }
    return null;
  });

  protected readonly canSubmit = computed(() => {
    const hasTitle = this.title().trim().length > 0;
    const hasUrl = this.url().trim().length > 0 && !this.urlError();
    const hasSchedule = this.meetingType() === 'instant' || (!!this.scheduledDate() && !!this.startTime() && !!this.endTime());
    return hasTitle && hasUrl && hasSchedule && !this.timeRangeError();
  });

  protected readonly submitLabel = computed(() => {
    const instant = this.meetingType() === 'instant';
    if (this.submitting()) {
      return instant ? 'Inviting Koriva…' : 'Scheduling…';
    }
    return instant ? 'Invite Koriva' : 'Schedule Meeting';
  });

  private readonly timeLabel = computed(() =>
    this.meetingType() === 'instant' ? 'Starts instantly' : `${formatRelativeDay(this.scheduledDate())} · ${this.startTime()}–${this.endTime()}`
  );

  protected readonly summary = computed<MeetingSummaryView>(() => {
    const platformOption = getPlatformOption(this.platform());
    return {
      title: this.title().trim(),
      platformLabel: platformOption.label,
      platformIconSrc: platformOption.iconSrc,
      timeLabel: this.timeLabel(),
      displayName: this.displayName().trim() || DEFAULT_KORIVA_DISPLAY_NAME,
      entryMessageConfigured: this.entryMessage().trim() !== DEFAULT_ENTRY_MESSAGE.trim()
    };
  });

  constructor() {
    this.seo.setPage({
      title: 'Invite Koriva',
      description: 'Configure how Koriva shows up, what it says, and when it joins — then send the invite.',
      path: '/app/schedule'
    });
  }

  protected onDateSelected(date: string): void {
    this.scheduledDate.set(date);
  }

  protected cancel(): void {
    this.location.back();
  }

  protected submit(): void {
    if (this.submitting()) {
      return;
    }
    if (!this.canSubmit()) {
      this.urlTouched.set(true);
      return;
    }

    this.submitting.set(true);

    const instant = this.meetingType() === 'instant';
    const draft: MeetingScheduleDraft = {
      title: this.title().trim(),
      platform: this.platform(),
      url: this.url().trim(),
      meetingType: this.meetingType(),
      scheduledDate: instant ? '' : this.scheduledDate(),
      startTime: instant ? '' : this.startTime(),
      endTime: instant ? '' : this.endTime(),
      entryMessage: this.entryMessage().trim() || DEFAULT_ENTRY_MESSAGE,
      identity: { displayName: this.displayName().trim() || DEFAULT_KORIVA_DISPLAY_NAME, avatar: this.avatar() }
    };

    // ponytail: fake latency to demo the loading/disabled state; drop once a real API call replaces it
    const timeoutId = setTimeout(() => {
      this.scheduleData.scheduleMeeting(draft);
      this.submitting.set(false);
      this.toast.show(instant ? 'Koriva is joining your meeting now' : 'Meeting scheduled — Koriva will join automatically');
      void this.router.navigate(['/app/home']);
    }, 500);
    this.destroyRef.onDestroy(() => clearTimeout(timeoutId));
  }
}
