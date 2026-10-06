"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  User,
  Activity,
  FileText,
  Fingerprint,
  UserPlus,
  Globe,
  ScanFace,
  Search,
  CreditCard,
  ShieldCheck,
  Bell,
  type LucideIcon,
} from "lucide-react";
import EyebrowBadge from "@/components/ui/EyebrowBadge";

/* ------------------------------------------------------------------ *
 * Data — one entry per journey step. The active step shows its
 * illustration in the left square (framed by floating status popups),
 * its label goes near-black in the list, and its description surfaces
 * on the right. `accent` only tints the popups — no colored orb.
 * ------------------------------------------------------------------ */
type CardRow = { label: string; value: string; green?: boolean };
type FloatCard = {
  Icon: LucideIcon;
  title: string;
  tag: string;
  rows?: CardRow[];
  position: "tr" | "bl";
};
type Step = {
  label: string;
  description: string;
  accent: string;
  cards: FloatCard[];
};

const STEPS: Step[] = [
  {
    label: "Sign-Up",
    description:
      "Capture user identity data at the point of registration with configurable verification flows. Adaptive risk signals determine the right level of checks before a user ever enters your platform.",
    accent: "#2D8CFF",
    cards: [
      {
        Icon: UserPlus,
        title: "Account created",
        tag: "Onboarding",
        position: "tr",
        rows: [
          { label: "Email", value: "Verified", green: true },
          { label: "Device", value: "Trusted" },
        ],
      },
      { Icon: Globe, title: "Geo check passed", tag: "Risk routing", position: "bl" },
    ],
  },
  {
    label: "User Verification",
    description:
      "AI-native document verification and biometric matching across 211+ countries. Active liveness detection stops deepfakes, masks, and injection attacks in real time.",
    accent: "#06B6D4",
    cards: [
      {
        Icon: ScanFace,
        title: "ID verified",
        tag: "Biometrics",
        position: "tr",
        rows: [
          { label: "Document", value: "Passport" },
          { label: "Match", value: "99.5%", green: true },
        ],
      },
      { Icon: Fingerprint, title: "Liveness passed", tag: "Active check", position: "bl" },
    ],
  },
  {
    label: "Screening",
    description:
      "Automated AML, sanctions, PEP, and adverse media screening at the point of onboarding. Continuous re-screening ensures you catch changes as they happen.",
    accent: "#8B5CF6",
    cards: [
      {
        Icon: Search,
        title: "Screening results",
        tag: "AML",
        position: "tr",
        rows: [
          { label: "Sanctions", value: "Clear", green: true },
          { label: "PEP", value: "Clear", green: true },
        ],
      },
      { Icon: FileText, title: "Adverse media scan", tag: "Monitoring", position: "bl" },
    ],
  },
  {
    label: "Optional Checks",
    description:
      "Layer in additional checks based on your risk appetite and regulatory requirements. From credit reports to background screening, deepidv handles it in one workflow.",
    accent: "#FB9A3C",
    cards: [
      {
        Icon: CreditCard,
        title: "Credit report",
        tag: "Optional",
        position: "tr",
        rows: [
          { label: "Score", value: "742" },
          { label: "Status", value: "Pulled", green: true },
        ],
      },
      { Icon: FileText, title: "Background check", tag: "Deep dive", position: "bl" },
    ],
  },
  {
    label: "Login",
    description:
      "Biometric re-verification at login ensures the person returning is the same person who onboarded. Catch account takeover attempts before they cause damage.",
    accent: "#6366F1",
    cards: [
      {
        Icon: Fingerprint,
        title: "Re-authentication",
        tag: "Login",
        position: "tr",
        rows: [
          { label: "Biometric", value: "Matched", green: true },
          { label: "Device", value: "Recognized" },
        ],
      },
      { Icon: ShieldCheck, title: "Step-up cleared", tag: "Adaptive", position: "bl" },
    ],
  },
  {
    label: "Ongoing Monitoring",
    description:
      "Agentic AI continuously monitors for changes in risk, identity, and compliance status. Automated alerts and case escalation keep your platform protected around the clock.",
    accent: "#22C55E",
    cards: [
      {
        Icon: Activity,
        title: "Risk monitor",
        tag: "Live",
        position: "tr",
        rows: [
          { label: "Risk score", value: "0.04", green: true },
          { label: "Status", value: "Low" },
        ],
      },
      { Icon: Bell, title: "No new alerts", tag: "24/7", position: "bl" },
    ],
  },
];

const CYCLE_MS = 3800;
const PAUSE_MS = 10000;

/* ------------------------------------------------------------------ *
 * Floating status popup — frosted card that overflows the stage edges.
 * ------------------------------------------------------------------ */
function StatusCard({
  card,
  accent,
  delay,
}: {
  card: FloatCard;
  accent: string;
  delay: number;
}) {
  const posClass =
    card.position === "tr"
      ? "top-[3%] right-[-2%] sm:right-[-4%]"
      : "bottom-[6%] left-[-2%] sm:left-[-4%]";
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className={`absolute z-10 w-[58%] max-w-[290px] rounded-2xl border border-black/[0.06] bg-white/90 p-3.5 shadow-[0_22px_50px_-22px_rgba(15,23,42,0.45)] backdrop-blur-md ${posClass}`}
    >
      <div className="flex items-center gap-2">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accent}1f`, color: accent }}
        >
          <card.Icon size={15} strokeWidth={2.25} />
        </span>
        <span className="truncate text-[13px] font-semibold text-neutral-800">
          {card.title}
        </span>
        <span
          className="ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
          style={{ backgroundColor: `${accent}1f`, color: accent }}
        >
          {card.tag}
        </span>
      </div>
      {card.rows && (
        <div className="mt-3 space-y-1.5">
          {card.rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between text-[12px]">
              <span className="text-neutral-400">{row.label}</span>
              <span
                className="font-medium"
                style={{ color: row.green ? "#16A34A" : "#374151" }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Illustrations — the original deepidv mockups, centred in the square.
 * ------------------------------------------------------------------ */
function IllustrationWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-[320px] rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.35)]">
        {children}
      </div>
    </div>
  );
}

function SignUpIllustration() {
  return (
    <IllustrationWrapper>
      <div className="space-y-3">
        <div className="h-3 w-16 bg-gray-100 rounded" />
        <div className="h-9 w-full bg-gray-50 border border-gray-100 rounded-lg" />
        <div className="h-3 w-12 bg-gray-100 rounded" />
        <div className="h-9 w-full bg-gray-50 border border-gray-100 rounded-lg" />
        <div className="h-3 w-14 bg-gray-100 rounded" />
        <div className="h-9 w-full bg-gray-50 border border-gray-100 rounded-lg" />
        <div className="mt-4 h-10 w-full bg-[#3B82F6] rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-medium">Verify Identity</span>
        </div>
        <div className="flex items-center gap-1.5 justify-end pt-1">
          <Shield size={14} className="text-[#3B82F6]" />
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
          </span>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

function VerificationIllustration() {
  return (
    <IllustrationWrapper>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex flex-col items-center justify-center gap-2">
          <FileText size={28} className="text-gray-300" />
          <div className="h-2 w-16 bg-gray-200 rounded" />
          <div className="h-2 w-12 bg-gray-100 rounded" />
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex flex-col items-center justify-center gap-2">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
              <User size={24} className="text-gray-300" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#22C55E] rounded-full p-0.5">
              <CheckCircle size={12} className="text-white" />
            </div>
          </div>
          <span className="text-[10px] font-medium text-[#22C55E]">Verified</span>
          <span className="text-[10px] text-gray-400 font-medium">99.5%</span>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

function ScreeningIllustration() {
  const rows = [
    { label: "Sanctions", status: "Clear", color: "#22C55E", Icon: CheckCircle },
    { label: "PEP", status: "Clear", color: "#22C55E", Icon: CheckCircle },
    { label: "Adverse Media", status: "Review", color: "#F59E0B", Icon: AlertTriangle },
  ];
  return (
    <IllustrationWrapper>
      <div className="space-y-3">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Screening Results
        </div>
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
          >
            <span className="text-sm text-gray-600">{row.label}</span>
            <div className="flex items-center gap-1.5">
              <row.Icon size={14} style={{ color: row.color }} />
              <span className="text-xs font-medium" style={{ color: row.color }}>
                {row.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </IllustrationWrapper>
  );
}

function OptionalChecksIllustration() {
  const checks = [
    { label: "Credit Report", active: true },
    { label: "Background Check", active: true },
    { label: "Address Verification", active: true },
    { label: "Education Check", active: false },
  ];
  return (
    <IllustrationWrapper>
      <div className="space-y-3">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Optional Checks
        </div>
        {checks.map((check) => (
          <div
            key={check.label}
            className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
          >
            <span className="text-sm text-gray-600">{check.label}</span>
            <div
              className="w-8 h-[18px] rounded-full flex items-center px-0.5 transition-colors"
              style={{ backgroundColor: check.active ? "#3B82F6" : "#D1D5DB" }}
            >
              <div
                className="w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform"
                style={{ transform: check.active ? "translateX(14px)" : "translateX(0)" }}
              />
            </div>
          </div>
        ))}
      </div>
    </IllustrationWrapper>
  );
}

function LoginIllustration() {
  return (
    <IllustrationWrapper>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full border-2 border-dashed border-[#3B82F6]/40 animate-spin"
            style={{ animationDuration: "8s" }}
          />
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
            <Fingerprint size={28} className="text-[#3B82F6]" />
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle size={14} className="text-[#22C55E]" />
          <span className="text-xs font-medium text-[#22C55E]">Match confirmed</span>
        </div>
        <div className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={14} className="text-gray-400" />
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-20 bg-gray-200 rounded" />
            <div className="h-2 w-14 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

function MonitoringIllustration() {
  const metrics = [
    { label: "Active Users", value: "1,284" },
    { label: "Flagged", value: "12" },
    { label: "Alerts", value: "3" },
  ];
  return (
    <IllustrationWrapper>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bg-gray-50 border border-gray-100 rounded-lg p-2 text-center"
            >
              <div className="text-[10px] text-gray-400">{m.label}</div>
              <div className="text-sm font-semibold text-gray-700 mt-0.5">{m.value}</div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-[#3B82F6]" />
            <span className="text-xs font-medium text-gray-600">AI Agent Active</span>
          </div>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]" />
          </span>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

const ILLUSTRATIONS: React.FC[] = [
  SignUpIllustration,
  VerificationIllustration,
  ScreeningIllustration,
  OptionalChecksIllustration,
  LoginIllustration,
  MonitoringIllustration,
];

/* ------------------------------------------------------------------ *
 * Left stage — square holding the active illustration, framed by the
 * floating status popups (which overflow the stage edges).
 * ------------------------------------------------------------------ */
function VisualStage({ active }: { active: number }) {
  const step = STEPS[active];
  const Illustration = ILLUSTRATIONS[active];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* clipped layer: tinted background + illustration */}
      <div
        className="absolute inset-0 overflow-hidden rounded-[28px] border border-black/[0.05]"
        style={{ background: "radial-gradient(120% 110% at 50% 0%, #FFFFFF 0%, #F1F2F5 100%)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Illustration />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* floating popups — overflow the stage edges */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {step.cards.map((card, i) => (
            <StatusCard
              key={card.title}
              card={card}
              accent={step.accent}
              delay={0.12 + i * 0.08}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Section
 * ------------------------------------------------------------------ */
export default function CustomerJourney() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-advance through the steps; loops back to the start.
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [active, paused]);

  // Pause auto-advance for a beat after a manual selection.
  const handleSelect = useCallback((idx: number) => {
    setActive(idx);
    setPaused(true);
    if (pauseRef.current) clearTimeout(pauseRef.current);
    pauseRef.current = setTimeout(() => setPaused(false), PAUSE_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (pauseRef.current) clearTimeout(pauseRef.current);
    };
  }, []);

  const current = STEPS[active];

  return (
    <section id="customer-journey" className="scroll-mt-28 overflow-hidden bg-[#F8F8FA] px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        {/* Header — left aligned, two-line title */}
        <div className="max-w-2xl">
          <EyebrowBadge>The Journey</EyebrowBadge>
          <h2 className="mt-5 text-[32px] font-bold leading-[1.1] tracking-tight sm:text-[40px] md:text-[44px]">
            <span className="block text-gray-400">Catch every threat</span>
            <span className="block text-gray-900">Cover every touchpoint</span>
          </h2>
          <h5 className="mt-5 max-w-[520px] text-[17px] text-gray-500">
            deepidv protects your platform from sign-up to ongoing monitoring — one engine, no
            code, no gaps.
          </h5>
        </div>

        {/* Body — left visual stage, right step list + description */}
        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-14">
          <VisualStage active={active} />

          <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
            {/* Step list — active is near-black, the rest barely-there grey */}
            <ul className="flex flex-col gap-2.5 lg:gap-3.5">
              {STEPS.map((step, idx) => (
                <li key={step.label}>
                  <button
                    type="button"
                    onClick={() => handleSelect(idx)}
                    aria-current={idx === active}
                    className="text-left text-2xl font-medium leading-tight tracking-tight transition-colors duration-500 lg:text-[30px]"
                    style={{ color: idx === active ? "#0B0F1A" : "#E2E5EA" }}
                  >
                    {step.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Active description — surfaces on the right */}
            <div className="min-h-[120px] sm:flex sm:items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="max-w-[36ch] text-[15px] leading-relaxed text-gray-500 lg:text-base"
                >
                  {current.description}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
