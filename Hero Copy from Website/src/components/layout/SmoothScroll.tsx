"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery-smooth, lerp-based scrolling (the "Kastle.ai feel").
 *
 * Lenis hijacks wheel/keyboard input and eases the real document scroll
 * position via requestAnimationFrame. Because it drives the *native* scroll
 * position (not a translated container), everything that reads `window.scrollY`
 * keeps working untouched — the sticky Header, framer-motion `useScroll`
 * sections, anchor links, the browser scrollbar, etc.
 *
 * Renders nothing. Mount it once inside a page/layout tree. On unmount it
 * fully tears Lenis down and returns the page to native scrolling, so it's
 * safe to scope to a single route.
 *
 * Accessibility: respects `prefers-reduced-motion` — when the user has asked
 * for reduced motion we never initialise Lenis and leave native scroll alone.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    if (reduceMotion.matches) return;

    const lenis = new Lenis({
      // lerp drives the glide — lower = longer, heavier coast. 0.1 is the
      // sweet spot that reads as "premium" without feeling sluggish.
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      // Native momentum scrolling on touch feels better than smoothed touch
      // (which adds perceptible lag on phones), so leave touch alone.
      syncTouch: false,
      // Smooth-scroll same-page `#anchor` links instead of native jumps.
      anchors: true,
      // Let Lenis own its own rAF loop.
      autoRaf: true,
    });

    // Expose for debugging / programmatic `lenis.scrollTo(...)` elsewhere.
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    return () => {
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return null;
}
