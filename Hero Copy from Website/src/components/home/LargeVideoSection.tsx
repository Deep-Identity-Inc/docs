"use client";

import { useState } from "react";

/** Flagship brand film. Kept in sync with BRAND_VIDEO in src/lib/videos.ts
 *  (VideoObject schema + video sitemap). */
const VIDEO_ID = "kxCRwBm9lBw";

export default function LargeVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="overflow-hidden">
      <div className="container py-16 lg:py-24">
        <div className="rounded-[28px] border border-gray-200/70 bg-[#f6f7f9] p-5 sm:p-8 lg:p-14">
          {/* Header — muted line + bold line on the left, body copy on the right */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <h2 className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[40px]">
              <span className="block text-gray-400">AI that knows how to verify</span>
              <span className="block text-gray-900">AI trained to verify in seconds</span>
            </h2>
            <p className="text-base leading-relaxed text-gray-500 lg:max-w-sm lg:pt-1">
              Verify anyone, anywhere in seconds. Instant face matching, deepfake
              detection, document verification and more through a single API.
            </p>
          </div>

          {/* Media */}
          <div className="relative mt-10 lg:mt-14">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-900 lg:rounded-3xl">
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                  title="Verify Humans and AI. We Got It All With deepidv."
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  aria-label="Play video"
                  className="group absolute inset-0 z-10 flex items-center justify-center"
                >
                  {/* YouTube thumbnail poster — facade keeps the iframe out of
                      the critical path until the user opts in. */}
                  <img
                    src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                    alt="Verify Humans and AI. We Got It All With deepidv."
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute inset-0 bg-black/15 transition-colors duration-200 group-hover:bg-black/25" />
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-transform duration-200 group-hover:scale-105 lg:h-[72px] lg:w-[72px]">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="ml-0.5 h-6 w-6 fill-gray-900 lg:h-7 lg:w-7"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
