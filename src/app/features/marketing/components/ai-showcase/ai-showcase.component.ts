import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { prefersReducedMotion, registerScrollTrigger } from '../../../../core/utils/gsap';
import { MarketingContentService } from '../../../../data/services/marketing-content.service';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { ChatBubbleComponent } from '../../../../shared/ui/chat-bubble/chat-bubble.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { SectionEyebrowComponent } from '../../../../shared/ui/section-eyebrow/section-eyebrow.component';

interface CapabilityRow {
  icon: string;
  text: string;
  color: string;
}

const CAPABILITY_ROWS: readonly CapabilityRow[] = [
  { icon: 'search', text: 'Search organizational knowledge instantly', color: 'var(--accent)' },
  { icon: 'git-compare', text: 'Compare meetings and track decisions over time', color: '#8B5CF6' },
  { icon: 'quote', text: 'Every answer cites its source meeting', color: 'var(--ochre)' }
];

/**
 * Landing page AI-assistant showcase. Clicking a suggested query — or simply
 * scrolling the section into view for the first time — plays a GSAP
 * timeline that fades in the question, holds on a typing indicator, then
 * reveals the answer and its citations, so the demo reads as a live
 * exchange rather than a static screenshot.
 */
@Component({
  selector: 'app-ai-showcase',
  imports: [ScrollRevealDirective, ChatBubbleComponent, IconComponent, SectionEyebrowComponent],
  templateUrl: './ai-showcase.component.html',
  styleUrl: './ai-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiShowcaseComponent implements OnDestroy {
  private readonly content = inject(MarketingContentService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  private readonly queryBubbleRef = viewChild.required('queryBubble', { read: ElementRef });
  private readonly typingBubbleRef = viewChild.required('typingBubble', { read: ElementRef });
  private readonly answerBubbleRef = viewChild.required('answerBubble', { read: ElementRef });

  protected readonly capabilityRows = CAPABILITY_ROWS;
  protected readonly chatExchanges = toSignal(this.content.getChatExchanges(), { initialValue: [] });
  protected readonly activeIndex = signal(0);
  protected readonly activeExchange = computed(() => this.chatExchanges()[this.activeIndex()]);

  private timeline?: gsap.core.Timeline;
  private scrollTrigger?: ScrollTrigger;
  private userInteracted = false;

  constructor() {
    afterNextRender(() => this.bind());
  }

  ngOnDestroy(): void {
    this.timeline?.kill();
    this.scrollTrigger?.kill();
  }

  protected selectExchange(index: number): void {
    this.userInteracted = true;
    this.play(index);
  }

  private bind(): void {
    if (prefersReducedMotion()) {
      return;
    }

    gsap.set(
      [this.queryBubbleRef().nativeElement, this.typingBubbleRef().nativeElement, this.answerBubbleRef().nativeElement],
      { autoAlpha: 0, y: 8 }
    );

    registerScrollTrigger();

    this.scrollTrigger = ScrollTrigger.create({
      trigger: this.elementRef.nativeElement,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        if (!this.userInteracted) {
          this.play(0);
        }
      }
    });
  }

  private play(index: number): void {
    if (prefersReducedMotion()) {
      this.activeIndex.set(index);
      return;
    }

    this.timeline?.kill();

    const query = this.queryBubbleRef().nativeElement;
    const typing = this.typingBubbleRef().nativeElement;
    const answer = this.answerBubbleRef().nativeElement;

    // The typing bubble is `display: none` at rest (see .ai-chat-card__typing-slot)
    // so it doesn't reserve empty flex space between the query and answer —
    // `display: contents` restores it to matching ChatBubbleComponent's own
    // host so its inner bubble becomes the real flex item again.
    this.timeline = gsap
      .timeline({ defaults: { ease: 'power2.out' } })
      .to([query, answer], { autoAlpha: 0, y: 8, duration: 0.2 })
      .call(() => this.activeIndex.set(index))
      .to(query, { autoAlpha: 1, y: 0, duration: 0.35 })
      .set(typing, { display: 'contents', autoAlpha: 1, y: 0 }, '+=0.1')
      .to(typing, { autoAlpha: 0, duration: 0.2 }, '+=0.6')
      .set(typing, { display: 'none' })
      .to(answer, { autoAlpha: 1, y: 0, duration: 0.4 })
      .call(() => {
        const citations = Array.from(answer.querySelectorAll('.ai-chat-card__citation'));
        gsap.from(citations, { autoAlpha: 0, y: 6, duration: 0.3, stagger: 0.06 });
      });
  }
}
