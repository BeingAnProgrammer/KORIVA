import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { prefersReducedMotion, registerScrollTrigger } from '../../../../core/utils/gsap';
import { MarketingContentService } from '../../../../data/services/marketing-content.service';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { StaggerRevealDirective } from '../../../../shared/directives/stagger-reveal.directive';
import { AvatarComponent } from '../../../../shared/ui/avatar/avatar.component';
import { ChatBubbleComponent } from '../../../../shared/ui/chat-bubble/chat-bubble.component';
import { ChipComponent } from '../../../../shared/ui/chip/chip.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { SectionEyebrowComponent } from '../../../../shared/ui/section-eyebrow/section-eyebrow.component';
import { StatusPillComponent } from '../../../../shared/ui/status-pill/status-pill.component';

interface CapabilityRow {
  icon: string;
  text: string;
}

const RECALL_CAPABILITIES: readonly CapabilityRow[] = [
  { icon: 'search', text: 'Search organizational knowledge instantly' },
  { icon: 'git-compare', text: 'Compare meetings and track decisions over time' },
  { icon: 'quote', text: 'Every answer cites its source meeting' }
];

/**
 * The landing page's core product narrative — one continuous 3-chapter
 * story (capture → structure → recall) replacing what used to be three
 * separate sections (how-it-works, mom-spotlight, ai-showcase). Merged so
 * the page tells one flowing story instead of three disconnected stops
 * that each re-introduced the same pipeline from scratch.
 *
 * Chapter 3 keeps the original ai-showcase interaction model verbatim:
 * clicking a suggested query — or simply scrolling the chapter into view
 * for the first time — plays a GSAP timeline that fades in the question,
 * holds on a typing indicator, then reveals the answer and its citations.
 */
@Component({
  selector: 'app-product-story',
  imports: [
    ScrollRevealDirective,
    StaggerRevealDirective,
    AvatarComponent,
    ChatBubbleComponent,
    ChipComponent,
    IconComponent,
    SectionEyebrowComponent,
    StatusPillComponent
  ],
  templateUrl: './product-story.component.html',
  styleUrl: './product-story.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductStoryComponent implements OnDestroy {
  private readonly content = inject(MarketingContentService);

  private readonly recallChapterRef = viewChild.required('recallChapter', { read: ElementRef });
  private readonly queryBubbleRef = viewChild.required('queryBubble', { read: ElementRef });
  private readonly typingBubbleRef = viewChild.required('typingBubble', { read: ElementRef });
  private readonly answerBubbleRef = viewChild.required('answerBubble', { read: ElementRef });

  protected readonly steps = toSignal(this.content.getPipelineSteps(), { initialValue: [] });
  protected readonly recallCapabilities = RECALL_CAPABILITIES;

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
      trigger: this.recallChapterRef().nativeElement,
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

    // The typing bubble is `display: none` at rest (see .product-story__chat-typing-slot)
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
        const citations = Array.from(answer.querySelectorAll('.product-story__citation'));
        gsap.from(citations, { autoAlpha: 0, y: 6, duration: 0.3, stagger: 0.06 });
      });
  }
}
