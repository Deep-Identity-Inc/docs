"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Search, Share2, Sparkles } from "lucide-react";

/**
 * OnePlatformSection — the dark, sweep-curved "why deepidv" bento the white
 * hero flows into. One-stop shop: one Verification API + every check, drop-in
 * SDKs + a native MCP server, and an agentic fraud suite. One-liners only; the
 * life is in the graphics. Deduped vs EnterpriseReady / API / ProductsShowcase
 * / WhyUs.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const GLASS =
  "relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md";

const CHECKS = ["KYC", "KYB", "AML / PEP", "Sanctions", "Deepfake", "Background", "Credit", "Age", "Address", "NFC"];
const PLATFORMS = ["Web", "iOS", "Android", "React Native", "Flutter", "MCP"];
const TRUST = ["211+ countries", "GDPR", "SOC 2", "ISO 27001", "Cryptographic proof", "<150ms"];
const STATS: [string, string][] = [
  ["30+", "check types behind one API"],
  ["6", "SDK targets plus a native MCP server"],
  ["211+", "countries covered on day one"],
  ["100%", "of checks signed with verifiable proof"],
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[12px] font-medium text-white/80">
      {children}
    </span>
  );
}

function CardHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`text-[22px] font-semibold leading-[1.12] tracking-tight text-white lg:text-[27px] ${className}`}>
      {children}
    </h3>
  );
}

function DotGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle,_rgba(255,255,255,1)_1px,_transparent_1px)] [background-size:26px_26px]"
    />
  );
}

/* Auto-scrolling pill carousel (reference's chip strip). */
function PillCarousel({ items, on }: { items: string[]; on: boolean }) {
  const row = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, #000 0%, #000 76%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(90deg, #000 0%, #000 76%, transparent 100%)",
      }}
    >
      <motion.div
        className="flex w-max gap-2"
        {...(on
          ? { animate: { x: ["0%", "-50%"] }, transition: { duration: 22, repeat: Infinity, ease: "linear" as const } }
          : {})}
      >
        {row.map((c, i) => (
          <Chip key={i}>{c}</Chip>
        ))}
      </motion.div>
    </div>
  );
}

/* Claude-style chat invoking the deepidv MCP. */
function ClaudeChat() {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1322]">
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-2.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logos/brand/claude.svg" alt="Claude" className="h-4 w-4" />
        <span className="text-[12px] font-medium text-white/70">Claude</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2 py-0.5 text-[10.5px] font-medium text-[#6FB7F0]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
          deepidv MCP
        </span>
      </div>
      <div className="space-y-3 p-4">
        <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-white/[0.07] px-3.5 py-2 text-[13px] leading-snug text-white/85">
          Verify this customer before I release the payout.
        </div>
        <div className="max-w-[92%]">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[11px] text-white/55">
            <Sparkles size={11} className="text-[#6FB7F0]" />
            deepidv.verify_identity()
          </span>
          <p className="mt-2 flex items-center gap-1.5 text-[13px] font-medium leading-snug text-white/90">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#16A34A]/25">
              <Check size={11} strokeWidth={3} className="text-[#22C55E]" />
            </span>
            Verified — passport · liveness · AML clear.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OnePlatformSection() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const on = mounted && !reduced;

  const reveal = (delay = 0) =>
    !on
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.55, ease: EASE, delay },
        };

  const stagger = (delay: number) =>
    !on
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.6, ease: EASE, delay },
        };

  const float = on
    ? { animate: { y: [0, -10, 0] }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const } }
    : {};

  return (
    <section className="relative w-full bg-white" style={{ fontFamily: "var(--font-geist), system-ui, sans-serif" }}>
      {/* Navy surface: straight top-left, large sweep-down curve on the right */}
      <div
        className="relative -mt-8 overflow-hidden rounded-tl-[20px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] lg:-mt-12"
        style={{
          background: "linear-gradient(180deg, #0A1428 0%, #0A1220 100%)",
          borderTopRightRadius: "clamp(180px, 62vw, 1000px) clamp(90px, 22vw, 360px)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[55%]"
          style={{ background: "radial-gradient(60% 46% at 50% 0%, rgba(6,144,242,0.12), transparent 68%)" }}
        />

        <div className="relative z-10 mx-auto max-w-[1200px] px-5 py-20 sm:px-6 md:py-24 lg:py-28">
          {/* Header */}
          <motion.div className="grid grid-cols-1 gap-4 lg:grid-cols-12" {...reveal(0)}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6FB7F0] lg:col-span-3">
              One platform for identity &amp; fraud
            </p>
            <div className="lg:col-span-9">
              <h2 className="max-w-[620px] text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-[44px] lg:text-[52px]">
                Verify{" "}
                <em style={{ fontFamily: "var(--font-instrument-serif), serif", fontStyle: "italic", color: "#6FB7F0" }}>
                  anyone
                </em>
                .<br className="hidden lg:block" /> Stop every fraud.
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/55">
                One Verification API, drop-in SDKs, and a native MCP server — every
                KYC, KYB, AML, and deepfake check in one place.
              </p>
            </div>
          </motion.div>

          {/* Bento grid */}
          <div className="mt-12 grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-12">
            {/* Row 1 — "Every check. One API." split container (full width) */}
            <motion.div
              className="relative overflow-hidden rounded-[26px] border border-white/10 md:col-span-2 lg:col-span-12 lg:row-start-1"
              {...reveal(0.04)}
            >
              <div className="flex flex-col lg:flex-row">
                {/* LEFT — blue gradient panel with the verification graphic */}
                <div
                  className="relative flex flex-col gap-6 p-7 lg:w-[52%] lg:p-9"
                  style={{ background: "linear-gradient(158deg, #0B3AA0 0%, #1E62C9 50%, #4E92E6 100%)" }}
                >
                  <h3 className="text-[26px] font-medium leading-[1.1] tracking-tight text-white lg:text-[32px]">
                    Every check. One API.
                  </h3>
                  {/* Floating white verification result card (pops on blue) */}
                  <div className="relative mt-1">
                    <div className="w-full max-w-[400px] rounded-2xl bg-white p-4 shadow-[0_30px_60px_-24px_rgba(8,20,60,0.6)]">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F7EE] px-2.5 py-1 text-[11px] font-semibold text-[#16A34A]">
                          <Check size={11} strokeWidth={3} />
                          Verified
                        </span>
                        <span className="flex items-center gap-2 text-[11px] font-medium text-[#93A1B5]">
                          138ms
                          <Share2 size={13} className="text-[#93A1B5]" />
                        </span>
                      </div>
                      <div className="mt-3.5 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4FE] text-[12px] font-semibold text-[#0690F2]">
                          MA
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[14px] font-semibold text-[#0A1628]">Maria Andersson</span>
                          <span className="block text-[12px] text-[#5B6B82]">Passport · Sweden</span>
                        </span>
                      </div>
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {["Document ✓", "Liveness ✓", "Face 99.5%", "AML clear"].map((c) => (
                          <span key={c} className="rounded-full bg-[#F1F4F8] px-2.5 py-1 text-[11px] font-medium text-[#0A1628]">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* search bar */}
                    <div className="mt-3 flex items-center gap-2.5 rounded-2xl border border-white/30 bg-white/15 px-4 py-3 backdrop-blur-md">
                      <Search size={16} className="text-white/80" />
                      <span className="flex-1 text-[14px] text-white/80">Run any check…</span>
                      <kbd className="rounded-md border border-white/30 bg-white/20 px-1.5 py-0.5 font-mono text-[10px] text-white/80">⌘K</kbd>
                    </div>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {CHECKS.slice(0, 6).map((c) => (
                      <span key={c} className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[12px] font-medium text-white/90">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* RIGHT — "The most complete system": dots fill the top; heading +
                    subtext sit low and right-aligned; bottom is ONE row — pills
                    carousel bleeding off the left, CTA on the right (1:1 ref). */}
                <div className="relative flex flex-col justify-end overflow-hidden p-7 lg:w-[48%] lg:p-9" style={{ background: "#0A1428" }}>
                  <DotGrid />
                  <div className="relative z-10 text-right">
                    <CardHeading>The most complete system.</CardHeading>
                    <p className="ml-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/55">
                      Match every person and business against the exact checks they
                      need — from one proven platform with a verifiable record.
                    </p>
                  </div>
                  <div className="relative z-10 mt-8 flex items-center gap-4">
                    <div className="-ml-7 min-w-0 flex-1 lg:-ml-9">
                      <PillCarousel items={CHECKS} on={on} />
                    </div>
                    <Link
                      href="#customer-journey"
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0A1628] transition-transform hover:-translate-y-0.5"
                    >
                      The Journey
                      <ArrowUpRight size={15} strokeWidth={2.2} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SDK + MCP (Claude chat) */}
            <motion.div
              className={`${GLASS} flex min-h-[300px] flex-col p-6 md:col-span-2 lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:p-7`}
              {...reveal(0.08)}
            >
              <CardHeading>SDKs for apps. MCP for agents.</CardHeading>
              <ClaudeChat />
              <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                {PLATFORMS.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            </motion.div>

            {/* Agentic fraud suite — tall, spans SDK + Audit rows (white card) */}
            <motion.div
              className="relative flex min-h-[360px] flex-col overflow-hidden rounded-[26px] border border-black/[0.08] bg-white shadow-[0_10px_40px_-12px_rgba(10,22,45,0.14)] md:col-span-2 lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:row-span-2"
              {...reveal(0.12)}
            >
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-48"
                style={{ background: "radial-gradient(60% 90% at 50% 0%, rgba(6,144,242,0.10), transparent 70%)" }}
                {...(on
                  ? { animate: { opacity: [0.6, 1, 0.6] }, transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const } }
                  : {})}
              />
              <motion.div className="relative min-h-[210px] flex-1" {...stagger(0.16)}>
                <motion.div className="absolute inset-0" {...float}>
                  <Image
                    src="/images/agents/agents.webp"
                    alt="The deepidv agent fleet, Luna, Arc, deepeye and Arbiter"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-contain p-6"
                    unoptimized
                  />
                </motion.div>
              </motion.div>
              <div className="relative z-10 p-6 lg:p-7">
                <motion.div {...stagger(0.22)}>
                  <h3 className="text-[22px] font-semibold leading-[1.12] tracking-tight text-[#0A1628] lg:text-[27px]">
                    An agentic fraud suite.
                  </h3>
                </motion.div>
                <motion.div className="mt-5 flex flex-wrap items-center gap-2" {...stagger(0.3)}>
                  <Link
                    href="#meet-your-team"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#0690F2] px-4 py-2 text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    Meet the agents
                    <ArrowUpRight size={15} strokeWidth={2.2} />
                  </Link>
                  {["Luna", "Arc", "deepeye", "Arbiter", "Know Your Agent"].map((c) => (
                    <span
                      key={c}
                      className="whitespace-nowrap rounded-full border border-black/10 bg-[#F5F7FA] px-2.5 py-1 text-[12px] font-medium text-[#5B6B82]"
                    >
                      {c}
                    </span>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Audit-ready — same width as the SDK card */}
            <motion.div
              className={`${GLASS} min-h-[200px] md:col-span-2 lg:col-span-7 lg:col-start-1 lg:row-start-3`}
              {...reveal(0.1)}
            >
              <Image
                src="/images/every-identity-globe.webp"
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-right opacity-40"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "linear-gradient(to right, rgba(8,16,30,0.96) 26%, rgba(8,16,30,0.5) 64%, rgba(8,16,30,0.1) 100%)" }}
              />
              <div className="relative z-10 flex h-full flex-col justify-between gap-5 p-6 lg:p-7">
                <CardHeading>Audit-ready in 211+ countries.</CardHeading>
                <div className="flex flex-wrap gap-2">
                  {TRUST.map((c) => (
                    <Chip key={c}>{c}</Chip>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats band */}
          <motion.div
            className="mt-3.5 grid grid-cols-2 gap-y-8 rounded-[26px] border border-white/10 bg-white/[0.03] py-8 backdrop-blur-md lg:grid-cols-4 lg:divide-x lg:divide-white/10"
            {...reveal(0.06)}
          >
            {STATS.map(([value, label]) => (
              <div key={label} className="px-6 text-center lg:text-left">
                <div className="text-[40px] font-semibold tabular-nums text-white lg:text-[52px]">{value}</div>
                <div className="mt-2 text-[12px] uppercase tracking-wide text-white/45">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
