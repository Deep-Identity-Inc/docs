"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import HeroDemoButton from "../HeroDemoButton";

/**
 * HeroScrollMorph — the light, Dribbble-style "console to phone" hero.
 *
 * Intro reads as a calm centered hero (headline + CTAs over the real
 * Sessions-console screenshot in a glass browser frame, sat low on the
 * stage). On scroll ONE device frame morphs landscape -> portrait IN PLACE,
 * staying centred; the screenshot cross-fades out and a phone takes over.
 * Once landed it becomes a CoTrain-style three-column board — copy left,
 * phone (playing a product video) centre, a quote card right — that steps
 * through two features:
 *
 *   p 0.00-0.06  intro hold — LCP screenshot paints sharp, nothing moves
 *   p 0.06-0.18  headline lifts + fades, clearing the stage
 *   p 0.14-0.46  THE MORPH — browser+dashboard -> centred phone
 *   p 0.46-0.71  step 1 · The Fastest Verification API   (verify-flow.webm)
 *   p 0.71-1.00  step 2 · Deepfake Detection SDK          (deepfake video)
 *
 * Scrolling up reverses everything. Desktop (lg+) + motion-allowed only;
 * reduced-motion and < lg get a clean static light hero with the same copy,
 * screenshot, and the two feature steps in normal document flow.
 */

const FONT = "var(--font-geist), system-ui, sans-serif";
const SERIF = "var(--font-instrument-serif), serif";
const DASHBOARD_SRC = "/images/heros/hero-console-dashboard.webp";

type Step = {
  num: string;
  title: string[];
  sub: string;
  video: string;
  pill: string;
  quoteBold: string;
  quoteRest: string;
};

const STEPS: Step[] = [
  {
    num: "1",
    title: ["The Fastest", "Verification API"],
    sub: "Document, liveness, and face match in one call — a decision in under 150ms.",
    video: "/videos/verify-flow.webm",
    pill: "142ms · verified",
    quoteBold: "Speed is the whole point.",
    quoteRest:
      "That's exactly why teams ship verification in an afternoon, not a quarter.",
  },
  {
    num: "2",
    title: ["North America's", "Best Deepfake", "Detection SDK"],
    sub: "Five forensic layers catch synthetic media and AI fakes before they get in.",
    video: "/videos/deepfake-detection-workflow-step.webm",
    pill: "synthetic media blocked",
    quoteBold: "Fakes don't get through.",
    quoteRest:
      "That's exactly why the hardest synthetic media stops here, not in production.",
  },
];

/* ── Light Dribbble-style backdrop (shared) ────────────────────────────── */
function LightBackdrop() {
  return (
    <>
      {/* Top brand-blue wash settling to white by mid-viewport */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[72vh]"
        style={{
          background:
            "radial-gradient(120% 75% at 50% -8%, rgba(6,144,242,0.16) 0%, rgba(10,143,220,0.07) 30%, rgba(255,255,255,0) 62%)",
        }}
      />
      {/* Soft accent bloom behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 6%, rgba(6,144,242,0.10) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      {/* Faint dot grid, top band only — dissolves before mid-page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] bg-[radial-gradient(circle_at_center,_rgba(10,22,45,0.05)_1px,_transparent_2px)] [background-size:28px_28px]"
        style={{
          maskImage: "linear-gradient(180deg, #000 0%, transparent 45%)",
          WebkitMaskImage: "linear-gradient(180deg, #000 0%, transparent 45%)",
        }}
      />
    </>
  );
}

/* ── Hero copy (dark-on-light) ─────────────────────────────────────────── */
function FingerprintIcon() {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/images/fingerprint.svg"
      alt=""
      width={40}
      height={40}
      className="inline-block align-middle w-[38px] h-[38px] md:w-[46px] md:h-[46px] lg:w-[54px] lg:h-[54px]"
      style={{ filter: "drop-shadow(0 0 14px rgba(6,144,242,0.35))", marginBottom: 6 }}
    />
  );
}
function SparkleIcon() {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/images/sparkle.svg"
      alt=""
      width={40}
      height={40}
      className="inline-block align-middle w-[42px] h-[42px] md:w-[50px] md:h-[50px] object-cover lg:w-[58px] lg:h-[58px]"
      style={{ filter: "drop-shadow(0 0 16px rgba(6,144,242,0.35))", marginBottom: 6 }}
    />
  );
}

function HeroCopy() {
  return (
    <div
      className="relative z-10 mx-auto max-w-[820px] translate-y-6 px-6 text-center md:translate-y-8"
      style={{ fontFamily: FONT }}
    >
      <h1 className="font-[600] leading-[1.05]" style={{ letterSpacing: "-0.04em" }}>
        <span
          className="block bg-clip-text text-transparent text-[36px] md:text-[46px] lg:text-[56px]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #0A1628 0%, rgba(10,22,45,0.55) 100%)",
            fontWeight: 600,
            letterSpacing: "-0.05em",
          }}
        >
          The new standard of{" "}
          <span
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "0",
              color: "#0690F2",
            }}
          >
            verification
          </span>
        </span>
        <span
          className="mt-1 block text-[36px] text-[#0A1628] md:text-[46px] lg:text-[56px]"
          style={{ fontWeight: 600, letterSpacing: "-0.04em" }}
        >
          <span
            className="text-[24px] md:text-[34px] lg:text-[42px]"
            style={{ color: "#93A1B5", fontWeight: 500 }}
          >
            for{" "}
          </span>
          <FingerprintIcon />
          humans{" "}
          <span
            className="text-[28px] md:text-[32px]"
            style={{ color: "#93A1B5", fontWeight: 600 }}
          >
            +
          </span>{" "}
          <SparkleIcon />
          AI
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-[560px] text-[16px] leading-[1.55] text-[#5B6B82] md:text-[18px]">
        Verify real people and AI agents from our platform or API, powered by
        global-leading deepfake detection and compliance built to scale globally.
      </p>

      <div className="mt-8 flex items-center justify-center gap-3 max-md:gap-2">
        <HeroDemoButton />
        <a
          href="https://docs.deepidv.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[14px] border bg-white px-[30px] py-[14px] text-[15px] font-semibold text-[#0A1628] transition-all duration-200 hover:scale-[1.02] hover:border-[#CBD5E1] max-md:px-5 max-md:py-2.5 max-md:text-[14px]"
          style={{ borderColor: "#E2E8F0", letterSpacing: "-0.02em" }}
        >
          Docs
          <ArrowUpRight size={18} strokeWidth={2} aria-hidden className="opacity-70" />
        </a>
      </div>
    </div>
  );
}

/* ── Step content pieces (left rail + right quote card) ────────────────── */
function StepCopy({ step }: { step: Step }) {
  return (
    <div className="flex flex-col">
      <h2 className="text-[clamp(1.7rem,2.5vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-[#0A1628]">
        {step.title.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>
      <p className="mt-4 max-w-[320px] text-[15px] leading-relaxed text-[#5B6B82]">
        {step.sub}
      </p>
    </div>
  );
}

function QuoteCard({ step }: { step: Step }) {
  return (
    <div className="w-full rounded-2xl bg-[#F5F7FA] p-7 ring-1 ring-black/[0.04]">
      <p className="text-[clamp(1.15rem,1.5vw,1.5rem)] font-semibold leading-snug tracking-tight text-[#0A1628]">
        {step.quoteBold}
      </p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#7A8AA0]">
        {step.quoteRest}
      </p>
      <p
        className="mt-6 text-[24px] italic text-[#0690F2]"
        style={{ fontFamily: SERIF }}
      >
        deepidv
      </p>
    </div>
  );
}

/* ── Device chrome ─────────────────────────────────────────────────────── */
function BrowserChrome() {
  return (
    <div
      className="flex h-[34px] w-full items-center gap-2 border-b border-black/[0.06] bg-[#F1F4F8] px-3.5"
      style={{ fontFamily: FONT }}
    >
      <span className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
      </span>
      <span className="mx-auto flex max-w-[55%] items-center gap-1.5 truncate rounded-md bg-white px-3 py-0.5 text-[11px] font-medium text-[#5B6B82] ring-1 ring-black/[0.05]">
        app.deepidv.com/console
      </span>
    </div>
  );
}

function PhoneStatusBar() {
  return (
    <div
      className="flex h-[32px] w-full items-center justify-between px-5 text-[12px] font-semibold text-[#0A1628]"
      style={{ fontFamily: FONT }}
    >
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden>
          <rect x="0" y="7" width="2.6" height="4" rx="0.6" fill="#0A1628" />
          <rect x="4" y="5" width="2.6" height="6" rx="0.6" fill="#0A1628" />
          <rect x="8" y="2.6" width="2.6" height="8.4" rx="0.6" fill="#0A1628" />
          <rect x="12" y="0" width="2.6" height="11" rx="0.6" fill="#0A1628" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden>
          <path d="M7.5 2C4.6 2 2.1 3.1 0.4 4.9l1.4 1.4C3.1 4.9 5.2 4 7.5 4s4.4.9 5.7 2.3l1.4-1.4C12.9 3.1 10.4 2 7.5 2Z" fill="#0A1628" />
          <path d="M7.5 6c-1.3 0-2.5.5-3.4 1.4l1.5 1.5c.5-.5 1.2-.8 1.9-.8s1.4.3 1.9.8l1.5-1.5C10 6.5 8.8 6 7.5 6Z" fill="#0A1628" />
          <circle cx="7.5" cy="10" r="1.1" fill="#0A1628" />
        </svg>
        <span className="flex items-center">
          <span className="relative h-[11px] w-[22px] rounded-[3px] border border-[#0A1628]/40">
            <span className="absolute inset-[1.5px] right-[5px] rounded-[1px] bg-[#0A1628]" />
          </span>
          <span className="ml-[1px] h-[4px] w-[1.5px] rounded-r-sm bg-[#0A1628]/40" />
        </span>
      </span>
    </div>
  );
}

/* Glass bezel shared by the morphing device + the static phone. */
const GLASS_BEZEL =
  "relative bg-white/35 backdrop-blur-xl ring-1 ring-white/60 border border-white/50";
const GLASS_SHADOW = "0 30px 80px -28px rgba(10,22,45,0.28)";

function DashboardShot({ priority = false }: { priority?: boolean }) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={DASHBOARD_SRC}
        alt="The deepidv verification console — monitor every verification across your organization"
        fill
        priority={priority}
        sizes="(max-width: 1023px) 100vw, 60vw"
        className="object-cover object-top"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, transparent 58%, #ffffff 100%)" }}
      />
    </div>
  );
}

/* Autoplaying product video that fills the phone screen. */
function PhoneVideo({ src }: { src: string }) {
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="h-full w-full object-cover"
    />
  );
}

/* ── Static fallback (reduced-motion + < lg) ───────────────────────────── */
function StaticPhone({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${GLASS_BEZEL} w-[262px] rounded-[42px] p-2`}
      style={{ boxShadow: GLASS_SHADOW }}
    >
      <div className="relative overflow-hidden rounded-[34px] bg-white">
        <PhoneStatusBar />
        <div className="relative h-[540px] overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function StaticHero() {
  return (
    <section
      className="relative w-screen overflow-hidden bg-white"
      style={{ marginLeft: "calc(50% - 50vw)" }}
    >
      <LightBackdrop />
      <div className="relative z-10 mx-auto max-w-[1100px] px-5 pb-20 pt-28 md:pt-32">
        <HeroCopy />

        {/* Screenshot in a glass browser frame */}
        <div className="mx-auto mt-12 max-w-[920px]">
          <div
            className={`${GLASS_BEZEL} overflow-hidden rounded-[18px] p-1.5`}
            style={{ boxShadow: GLASS_SHADOW }}
          >
            <div className="overflow-hidden rounded-[13px] bg-white">
              <BrowserChrome />
              <div className="relative">
                <Image
                  src={DASHBOARD_SRC}
                  alt="The deepidv verification console"
                  width={2400}
                  height={1213}
                  priority
                  sizes="100vw"
                  className="h-auto w-full"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 72%, #ffffff 100%)" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Two feature steps, stacked */}
        <div className="mt-20 flex flex-col gap-16 md:gap-24">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`flex flex-col items-center gap-8 md:gap-10 ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="w-full md:w-[34%]">
                <StepCopy step={step} />
              </div>
              <div className="flex w-full justify-center md:w-[32%]">
                <StaticPhone>
                  <PhoneVideo src={step.video} />
                </StaticPhone>
              </div>
              <div className="w-full md:w-[34%]">
                <QuoteCard step={step} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Animated morph (lg + motion-allowed) ──────────────────────────────── */
function AnimatedHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [dims, setDims] = useState({
    monW: 900,
    monH: 455,
    phW: 280,
    phH: 620,
    introY: 250,
  });

  // Geometry, recomputed on resize. Screenshot is 2400x1213 (1.978:1); the
  // videos are 570x1280 (~0.445:1) so the phone screen is sized to match them.
  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let monW = Math.min(980, vw * 0.6);
      let monH = monW / 1.978;
      const maxMonH = vh * 0.52;
      if (monH > maxMonH) {
        monH = maxMonH;
        monW = monH * 1.978;
      }
      const phH = Math.min(660, Math.max(600, vh * 0.74));
      // screen area = phH - 16 (bezel) - 32 (status bar); width tracks the
      // video aspect (~0.455) plus the 16px bezel.
      const phW = Math.round((phH - 48) * 0.455) + 16;
      const introY = Math.round(vh * 0.36);
      setDims({ monW, monH, phW, phH, introY });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scroll progress (0..1 across the pinned section), from the section's own
  // rect. Driven by rAF on native scroll + a direct Lenis subscription.
  const p = useMotionValue(0);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const range = el.offsetHeight - window.innerHeight;
      const prog = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
      p.set(prog);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const lenis = (
      window as unknown as {
        lenis?: { on?: (e: string, cb: () => void) => void; off?: (e: string, cb: () => void) => void };
      }
    ).lenis;
    lenis?.on?.("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      lenis?.off?.("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [p]);

  // Morph in place (centred). No horizontal travel.
  const width = useTransform(p, [0.14, 0.46], [dims.monW, dims.phW]);
  const height = useTransform(p, [0.14, 0.46], [dims.monH, dims.phH]);
  const radius = useTransform(p, [0.14, 0.46], [14, 44]);
  const deviceY = useTransform(p, [0, 0.46], [dims.introY, 0]);

  // Chrome + screenshot cross-fade (screenshot fades out before the frame
  // leaves landscape, so the wide image never crops to a sliver).
  const browserOpacity = useTransform(p, [0.14, 0.24], [1, 0]);
  const screenshotOpacity = useTransform(p, [0.14, 0.24], [1, 0]);
  const phoneChromeOpacity = useTransform(p, [0.30, 0.44], [0, 1]);

  // Soft blue bloom behind the centred phone, so the glass frame reads on
  // white (and echoes the reference's gradient-behind-phone).
  const bloomOpacity = useTransform(p, [0.34, 0.5], [0, 1]);

  // Intro headline lifts + fades before the morph.
  const introCopyOpacity = useTransform(p, [0.06, 0.18], [1, 0]);
  const introCopyY = useTransform(p, [0.06, 0.18], [0, -44]);

  // Two product videos, cross-faded; video 0 fades in during the morph.
  const v0 = useTransform(p, [0.30, 0.42, 0.66, 0.71], [0, 1, 1, 0]);
  const v1 = useTransform(p, [0.66, 0.71], [0, 1]);
  const videoOpacities = [v0, v1];

  // Left rail + right card: container entrance, then per-step cross-fade.
  const railOpacity = useTransform(p, [0.44, 0.52], [0, 1]);
  const leftX = useTransform(p, [0.44, 0.52], [-24, 0]);
  const rightX = useTransform(p, [0.44, 0.52], [24, 0]);
  const stepA = useTransform(p, [0.46, 0.52, 0.66, 0.71], [0, 1, 1, 0]);
  const stepB = useTransform(p, [0.66, 0.71], [0, 1]);
  const stepOpacities = [stepA, stepB];

  // Progress bar: segments fill cumulatively.
  const seg1 = useTransform(p, [0.46, 0.52], [0, 1]);
  const seg2 = useTransform(p, [0.66, 0.71], [0, 1]);
  const segFills = [seg1, seg2];

  // Hug the centred phone: left copy ends just left of the frame, the quote
  // card tucks slightly behind its right edge (reference layout).
  const leftOffset = Math.round(dims.phW / 2 + 28);
  const rightOffset = Math.round(dims.phW / 2 - 16);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen bg-white"
      style={{ marginLeft: "calc(50% - 50vw)", height: "300vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <LightBackdrop />

        {/* Blue bloom behind the centred phone */}
        <motion.div
          aria-hidden
          style={{ opacity: bloomOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className="h-full w-full"
            style={{
              background:
                "radial-gradient(circle, rgba(6,144,242,0.20) 0%, rgba(6,144,242,0.06) 42%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Intro headline — centred in the upper stage */}
        <motion.div
          style={{ opacity: introCopyOpacity, y: introCopyY }}
          className="absolute inset-x-0 top-0 z-30 flex h-[62vh] items-center justify-center px-6"
        >
          <HeroCopy />
        </motion.div>

        {/* Left rail — hugs the phone's left edge; copy top-aligned to the
            frame, progress bar pinned to the frame's bottom. */}
        <motion.div
          style={{
            opacity: railOpacity,
            x: leftX,
            y: "-50%",
            right: `calc(50% + ${leftOffset}px)`,
            height: dims.phH,
          }}
          className="absolute top-1/2 z-30 hidden w-[clamp(260px,22vw,340px)] flex-col justify-between lg:flex"
        >
          <div className="relative flex-1">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                style={{ opacity: stepOpacities[i] }}
                className="absolute inset-x-0 top-0 flex flex-col"
              >
                <StepCopy step={step} />
              </motion.div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {segFills.map((fill, i) => (
              <div
                key={i}
                className="relative h-1.5 w-12 overflow-hidden rounded-full bg-[#E2E8F0]"
              >
                <motion.div
                  style={{ scaleX: fill }}
                  className="absolute inset-0 origin-left rounded-full bg-[#0690F2]"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right rail — quote card tucked just behind the phone's right edge. */}
        <motion.div
          style={{
            opacity: railOpacity,
            x: rightX,
            y: "-50%",
            left: `calc(50% + ${rightOffset}px)`,
            height: dims.phH,
          }}
          className="absolute top-1/2 z-10 hidden w-[clamp(300px,26vw,420px)] items-center lg:flex"
        >
          <div className="relative w-full">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                style={{ opacity: stepOpacities[i] }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2"
              >
                <QuoteCard step={step} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* The morphing device, centred */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <motion.div
            style={{
              width,
              height,
              y: deviceY,
              borderRadius: radius,
              boxShadow: GLASS_SHADOW,
              willChange: "width, height, transform",
            }}
            className={`${GLASS_BEZEL} p-2`}
          >
            <motion.div
              style={{ borderRadius: radius }}
              className="relative h-full w-full overflow-hidden bg-white"
            >
              {/* Screenshot (LCP — opacity starts at 1) */}
              <motion.div style={{ opacity: screenshotOpacity }} className="absolute inset-0">
                <DashboardShot priority />
              </motion.div>

              {/* Browser chrome (fades out) */}
              <motion.div
                style={{ opacity: browserOpacity }}
                className="absolute inset-x-0 top-0 z-30"
              >
                <BrowserChrome />
              </motion.div>

              {/* Phone status bar (fades in) */}
              <motion.div
                style={{ opacity: phoneChromeOpacity }}
                className="absolute inset-x-0 top-0 z-30"
              >
                <PhoneStatusBar />
              </motion.div>

              {/* Product videos — cross-faded by step */}
              <div className="absolute inset-x-0 bottom-0 top-[32px] overflow-hidden bg-black/[0.02]">
                {STEPS.map((step, i) => (
                  <motion.div
                    key={step.num}
                    style={{ opacity: videoOpacities[i] }}
                    className="absolute inset-0"
                  >
                    <PhoneVideo src={step.video} />
                  </motion.div>
                ))}
              </div>

              {/* Floating glass pill (per step) */}
              <div className="pointer-events-none absolute bottom-3 left-3 z-40">
                {STEPS.map((step, i) => (
                  <motion.span
                    key={step.num}
                    style={{ opacity: stepOpacities[i] }}
                    className="absolute bottom-0 left-0 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-semibold text-[#0690F2] shadow-[0_6px_18px_-6px_rgba(10,22,45,0.4)] ring-1 ring-black/[0.06] backdrop-blur-md"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                    {step.pill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Notch + home indicator (fade in over the bezel) */}
            <motion.div
              aria-hidden
              style={{ opacity: phoneChromeOpacity }}
              className="pointer-events-none absolute left-1/2 top-[12px] z-40 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black"
            />
            <motion.div
              aria-hidden
              style={{ opacity: phoneChromeOpacity }}
              className="pointer-events-none absolute bottom-[9px] left-1/2 z-40 h-[4px] w-[110px] -translate-x-1/2 rounded-full bg-black/30"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

export default function HeroScrollMorph(): ReactNode {
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  // Mount EXACTLY ONE hero tree. SSR + the first client paint render the
  // static tree, so the LCP screenshot is preloaded once (not twice — CSS
  // hiding does not suppress next/image's preload). After mount we swap in the
  // pinned morph only on lg with motion allowed; SSR === first client render,
  // so there is no hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const showAnimated = mounted && isDesktop && !reduce;

  return showAnimated ? <AnimatedHero /> : <StaticHero />;
}
