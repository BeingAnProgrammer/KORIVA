import { ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';

import { prefersReducedMotion, registerScrollTrigger } from '../../../../core/utils/gsap';
import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { JourneyStageDirective } from '../../../../shared/directives/journey-stage.directive';
import { TiltHoverDirective } from '../../../../shared/directives/tilt-hover.directive';
import { AvatarComponent } from '../../../../shared/ui/avatar/avatar.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

const CAPTION_INTERVAL_MS = 2800;

/**
 * The landing page's "lamp" hero. Beyond the original beam/glow staging,
 * this owns three deliberate moments: a small "live call" badge above the
 * headline (an actual object to look at, not just gradient text on empty
 * glow — its avatars/caption preview the product-story chapters that
 * follow), a word-by-word headline reveal, and a scroll parallax that
 * separates the decorative glow from the readable content as the visitor
 * scrolls past.
 */
@Component({
  selector: 'app-hero-lamp',
  imports: [RouterLink, ButtonDirective, IconComponent, AvatarComponent, TiltHoverDirective, JourneyStageDirective],
  templateUrl: './hero-lamp.component.html',
  styleUrl: './hero-lamp.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroLampComponent implements OnDestroy {
  protected readonly titleLine1 = ['Meetings,', 'turned', 'into'];
  protected readonly titleLine2 = ['organizational', 'intelligence'];

  protected readonly captions = ['KORIVA joined the call', 'Recording started', 'Transcribing live…'];
  protected readonly captionIndex = signal(0);

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly ngZone = inject(NgZone);
  private readonly liveCaptionRef = viewChild<ElementRef<HTMLElement>>('liveCaption');

  private matchMedia?: ReturnType<typeof gsap.matchMedia>;
  private captionTimer?: ReturnType<typeof setInterval>;

  constructor() {
    afterNextRender(() => this.bind());
  }

  ngOnDestroy(): void {
    this.matchMedia?.revert();
    if (this.captionTimer) {
      clearInterval(this.captionTimer);
    }
  }

  private bind(): void {
    registerScrollTrigger();
    this.matchMedia = gsap.matchMedia();

    this.matchMedia.add('(prefers-reduced-motion: no-preference)', () => {
      const liveBadge = this.elementRef.nativeElement.querySelector('.hero-lamp__live');
      const words = this.elementRef.nativeElement.querySelectorAll('.hero-lamp__word');

      const entrance = gsap.timeline();
      if (liveBadge) {
        entrance.from(liveBadge, { autoAlpha: 0, y: 16, duration: 0.6, ease: 'power2.out' });
      }
      entrance.from(
        words,
        { autoAlpha: 0, y: 22, duration: 0.7, stagger: 0.045, ease: 'power2.out' },
        liveBadge ? '-=0.3' : 0
      );

      const section = this.elementRef.nativeElement.querySelector('.hero-lamp');
      const stage = this.elementRef.nativeElement.querySelector('.hero-lamp__stage');
      const content = this.elementRef.nativeElement.querySelector('.hero-lamp__content');

      const stageTween =
        section && stage
          ? gsap.to(stage, {
              yPercent: -18,
              ease: 'none',
              scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true }
            })
          : undefined;

      const contentTween =
        section && content
          ? gsap.to(content, {
              yPercent: 8,
              autoAlpha: 0.35,
              ease: 'none',
              scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true }
            })
          : undefined;

      return () => {
        entrance.kill();
        stageTween?.scrollTrigger?.kill();
        contentTween?.scrollTrigger?.kill();
      };
    });

    this.bindCaptionCycle();
  }

  private bindCaptionCycle(): void {
    if (prefersReducedMotion()) {
      return;
    }

    // Registered outside the Angular zone — a recurring `setInterval` left
    // inside it counts as a perpetually-outstanding task to zone.js, which
    // stops `ApplicationRef.isStable()` from ever resolving (NG0506) and,
    // in turn, can leave hydration referencing DOM nodes that later get
    // discarded. Signal updates below still notify rendering correctly;
    // that scheduling doesn't depend on zone stability.
    this.ngZone.runOutsideAngular(() => {
      this.captionTimer = setInterval(() => {
        const el = this.liveCaptionRef()?.nativeElement;

        if (!el) {
          this.captionIndex.update((i) => (i + 1) % this.captions.length);
          return;
        }

        gsap.to(el, {
          autoAlpha: 0,
          duration: 0.25,
          onComplete: () => {
            this.captionIndex.update((i) => (i + 1) % this.captions.length);
            gsap.to(el, { autoAlpha: 1, duration: 0.25 });
          }
        });
      }, CAPTION_INTERVAL_MS);
    });
  }
}
