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
import { JourneyStageDirective } from '../../../../shared/directives/journey-stage.directive';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { TiltHoverDirective } from '../../../../shared/directives/tilt-hover.directive';
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

/** Ambient, low-contrast fragments drifting behind the capture card — a glimpse of what's being captured, not a transcript to read. */
const TRANSCRIPT_SNIPPETS: readonly string[] = [
  '"...let\'s move forward with the renewal..."',
  '"I can own the API integration"',
  '"what\'s the Q1 timeline look like?"',
  '"send the redline over by Friday"',
  '"agreed — let\'s flag that as a risk"'
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
    JourneyStageDirective,
    TiltHoverDirective,
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

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly transformPinRef = viewChild<ElementRef<HTMLElement>>('transformPin');
  private readonly recallChapterRef = viewChild.required('recallChapter', { read: ElementRef });
  private readonly queryBubbleRef = viewChild.required('queryBubble', { read: ElementRef });
  private readonly typingBubbleRef = viewChild.required('typingBubble', { read: ElementRef });
  private readonly answerBubbleRef = viewChild.required('answerBubble', { read: ElementRef });

  protected readonly steps = toSignal(this.content.getPipelineSteps(), { initialValue: [] });
  protected readonly recallCapabilities = RECALL_CAPABILITIES;
  protected readonly transcriptSnippets = TRANSCRIPT_SNIPPETS;

  protected readonly chatExchanges = toSignal(this.content.getChatExchanges(), { initialValue: [] });
  protected readonly activeIndex = signal(0);
  protected readonly activeExchange = computed(() => this.chatExchanges()[this.activeIndex()]);

  private timeline?: gsap.core.Timeline;
  private scrollTrigger?: ScrollTrigger;
  private waveformTrigger?: ScrollTrigger;
  private transformTrigger?: ScrollTrigger;
  private userInteracted = false;

  constructor() {
    afterNextRender(() => this.bind());
  }

  ngOnDestroy(): void {
    this.timeline?.kill();
    this.scrollTrigger?.kill();
    this.waveformTrigger?.kill();
    this.transformTrigger?.kill();
  }

  protected selectExchange(index: number): void {
    this.userInteracted = true;
    this.play(index);
  }

  private bind(): void {
    if (prefersReducedMotion()) {
      return;
    }

    registerScrollTrigger();
    this.bindCaptureWaveform();
    this.bindStructureTransform();

    // Pinned sections are sensitive to layout height at the moment
    // ScrollTrigger first measures it — a late-loading font nudging text
    // reflow after that point would throw off the pin's scroll math.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    gsap.set(
      [this.queryBubbleRef().nativeElement, this.typingBubbleRef().nativeElement, this.answerBubbleRef().nativeElement],
      { autoAlpha: 0, y: 8 }
    );

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

  /**
   * Ties the capture card's waveform to scroll position instead of a
   * looping CSS animation — the bars visibly react as you scroll past the
   * chapter, reading as "listening in real time" rather than a static decal.
   * Deterministic per-bar sine offsets (not random) so it's the same on
   * every load and never needs a running rAF loop when the page is idle.
   */
  private bindCaptureWaveform(): void {
    const chapter = this.elementRef.nativeElement.querySelector('.product-story__chapter--capture');
    const bars = Array.from(this.elementRef.nativeElement.querySelectorAll('.product-story__waveform span')) as HTMLElement[];

    if (!chapter || !bars.length) {
      return;
    }

    this.waveformTrigger = ScrollTrigger.create({
      trigger: chapter,
      start: 'top 90%',
      end: 'bottom 10%',
      scrub: 0.5,
      onUpdate: (self) => {
        bars.forEach((bar, i) => {
          const scale = 0.35 + 0.65 * Math.abs(Math.sin(self.progress * Math.PI * 4 + i * 1.1));
          gsap.set(bar, { scaleY: scale });
        });
      }
    });
  }

  /**
   * The structure chapter's centerpiece: pins briefly while a scrub-driven
   * timeline dims the raw transcript lines one by one as the matching MOM
   * doc row fades/slides in — a demonstration of "the AI is making sense of
   * this," not just a before/after pair of static cards. One of only two
   * pinned moments on the page (the other is the CTA band), by design —
   * pinning more than that starts fighting the visitor's own scroll intent.
   */
  private bindStructureTransform(): void {
    const transformEl = this.transformPinRef()?.nativeElement;

    if (!transformEl) {
      return;
    }

    const rawLines = Array.from(transformEl.querySelectorAll('.product-story__transform-raw-line')) as HTMLElement[];
    const docRows = Array.from(transformEl.querySelectorAll('.product-story__doc-row')) as HTMLElement[];
    const riskBanner = transformEl.querySelector<HTMLElement>('.product-story__doc-risk');

    if (!rawLines.length || !docRows.length) {
      return;
    }

    gsap.set(docRows, { autoAlpha: 0, y: 12 });
    if (riskBanner) {
      gsap.set(riskBanner, { autoAlpha: 0, y: 12 });
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: transformEl,
        start: 'top top+=80',
        // A fixed multiple of viewport height, not a "%" of the trigger's
        // own size — GSAP resolves "+=N%" against the scroller, which on a
        // short trigger like this produces a far longer pin than intended.
        end: () => '+=' + window.innerHeight * 1.3,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    rawLines.forEach((line, i) => {
      timeline.to(line, { opacity: 0.25, duration: 1 }, i * 0.8);
    });

    docRows.forEach((row, i) => {
      timeline.to(row, { autoAlpha: 1, y: 0, duration: 1 }, 1 + i * 1.1);
    });

    if (riskBanner) {
      timeline.to(riskBanner, { autoAlpha: 1, y: 0, duration: 1 }, 1 + docRows.length * 1.1);
    }

    this.transformTrigger = timeline.scrollTrigger;
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
