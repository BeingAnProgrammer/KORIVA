import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, afterNextRender, viewChild } from '@angular/core';
import gsap from 'gsap';

import { prefersReducedMotion, registerScrollTrigger } from '../../../../core/utils/gsap';

interface GalleryFrame {
  readonly src: string;
  readonly alt: string;
  readonly time: string;
  readonly title: string;
  readonly desc: string;
}

/** Real product screenshots (not illustration), ported verbatim from `public/icons/home page images/`. */
const GALLERY_FRAMES: readonly GalleryFrame[] = [
  {
    src: 'icons/home page images/Main Content.png',
    alt: 'The full Koriva meeting room with the member list and chat panel open',
    time: '00:00',
    title: 'Joins the room',
    desc: 'KORIVA slips into the call as just another tile — no bot banner, no interruption.'
  },
  {
    src: 'icons/home page images/Video Conference Container.png',
    alt: 'A single participant speaking on a Koriva video call, the member list open alongside',
    time: '00:06',
    title: 'Tracks every speaker',
    desc: 'Every tile, every voice — KORIVA keeps a running thread of who said what, in order.'
  },
  {
    src: 'icons/home page images/Video conference container (1).png',
    alt: 'Four participant tiles on a Koriva call, one person speaking',
    time: '00:14',
    title: 'Stays for the whole call',
    desc: "Twelve minutes in or two hours in — it doesn't drop, lag, or miss a beat."
  },
  {
    src: 'icons/home page images/Image Wrapper (1).png',
    alt: 'A Koriva call with a screen-share settings menu open',
    time: '00:24',
    title: 'Reads the screen share too',
    desc: 'Decks, redlines, roadmaps — anything shared on screen gets captured with the conversation.'
  }
];

/**
 * A horizontal filmstrip through one live call, tied to the page's own
 * vertical scroll (desktop only) so moving down the page reads as moving
 * through the call itself — pin the strip, translate it sideways by the
 * same distance the visitor scrolls. Below `lg`, or with reduced motion,
 * it's a plain swipeable row instead (see `.capture-gallery__track`'s own
 * `overflow-x`) — there isn't enough vertical runway on a phone to justify
 * pinning the page for it.
 */
@Component({
  selector: 'app-capture-gallery',
  templateUrl: './capture-gallery.component.html',
  styleUrl: './capture-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaptureGalleryComponent implements OnDestroy {
  protected readonly frames = GALLERY_FRAMES;

  private readonly sectionRef = viewChild.required<ElementRef<HTMLElement>>('gallerySection');
  private readonly trackRef = viewChild.required<ElementRef<HTMLElement>>('galleryTrack');

  private tween?: gsap.core.Tween;

  constructor() {
    afterNextRender(() => this.bind());
  }

  ngOnDestroy(): void {
    this.tween?.scrollTrigger?.kill();
    this.tween?.kill();
  }

  private bind(): void {
    if (prefersReducedMotion() || window.innerWidth < 1024) {
      return;
    }

    registerScrollTrigger();

    const section = this.sectionRef().nativeElement;
    const track = this.trackRef().nativeElement;
    const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);

    this.tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top+=80',
        end: () => '+=' + distance(),
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
  }
}
