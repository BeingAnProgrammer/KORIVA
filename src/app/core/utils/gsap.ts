import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/** Idempotent, browser-only ScrollTrigger registration — call before creating any scroll-triggered tween. */
export function registerScrollTrigger(): void {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    // Mobile browsers fire a `resize` event when the address bar auto-hides/shows
    // during scroll, which ScrollTrigger otherwise treats as a real viewport
    // resize and answers with a mid-scroll refresh() — re-measuring every
    // trigger's start/end while the user is still inside a pinned section.
    // For a pin whose trigger is the pinned element itself (product-story's
    // structure chapter), that mid-scroll remeasure can desync the pin's
    // release point from the actual scroll position, leaving it stuck fixed
    // over content that has already scrolled into view behind it.
    ScrollTrigger.config({ ignoreMobileResize: true });
    registered = true;
  }
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
