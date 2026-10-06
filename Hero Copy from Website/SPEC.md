# deepidv home page → pitch deck: 1:1 replication spec

**Scope:** the hero and the four sections directly under it on `https://www.deepidv.com/` (source of truth: the `deepidv-website-next` repo, branch `Update--Deep-Brief-Week-of-Aug-10`, captured 2026-09-08).
**Only content change:** the hero headline becomes **"Invest in the new standard of AI + Human Verification & Risk Management"**. Everything else is copied verbatim.

This document is written for a Claude Code session that does **not** have the website repo. It is self-contained: every source file is reproduced verbatim in the appendices, every asset is listed with its exact dimensions, and every asset you might be missing has a defined placeholder. A companion folder `deepidv-home-top5-kit/` (same content as the appendices, plus the binary assets and reference screenshots) may be provided alongside; if you have it, copy files from it instead of retyping from the appendices.

---

## 0. Read this first

1. **Build order (top to bottom), nothing in between:**
   1. `HeroScrollMorph` — hero (scroll-pinned monitor→phone morph, 300vh tall on desktop)
   2. `OnePlatformSection` — dark navy bento ("Verify anyone. Stop every fraud.")
   3. `ServiceStrip` — "Proprietary Solutions Built by Us" pills + Claude MCP video
   4. `LargeVideoSection` — "AI that knows how to verify" YouTube facade card
   5. `CustomerJourney` — "Catch every threat / Cover every touchpoint" auto-cycling journey
2. **Preferred path (Path A):** React 19 + Next.js (or any React app) + Tailwind CSS v4 + framer-motion 12. Copy the files in Appendix A verbatim, add the global CSS in §2.3, install the deps in §2.1. This is a true 1:1.
3. **Fallback path (Path B):** if the deck is not React/Tailwind (plain HTML, Keynote, Figma, Canva…), reproduce from the visual spec in §3–§7 and the computed truth table in §8, using the reference screenshots as the master.
4. **Fidelity rules:** match values exactly, do not "improve" anything, do not add gloss/shine/shadows that are not listed, keep it flat. Brand name is always lowercase `deepidv` (never "DeepIDV"), even at the start of a sentence.
5. **Three things that are NOT obvious from the component code** (they come from the site's global CSS and will silently break 1:1 if you skip §2.3):
   - The site's `globals.css` has **unlayered** `:where(h1)…:where(h5)` rules. Tailwind v4 puts utilities in `@layer utilities`, and unlayered CSS beats layered CSS regardless of specificity. So every `h2` in these sections renders at **38px / line-height 1.3 / weight 600** at ≥1024px even though the classes say `lg:text-[52px] font-bold leading-[1.05]`. Copy the rules from §2.3 verbatim and unlayered. The computed truth table in §8 is what the live site actually renders.
   - `text-primary` renders **near-black `#171717`**, not brand blue (shadcn's `--primary` overrides the `--color-primary` token). The "OUR TECHNOLOGY" eyebrow in ServiceStrip is near-black on the live site.
   - `var(--font-sans)` resolves to **Inter** (next/font), not SF Pro. Sections 3–5 are Inter; the hero and section 2 explicitly use **Geist**; italic accents use **Instrument Serif**.

---

## 1. Kit contents (what is in `deepidv-home-top5-kit/`)

```
deepidv-home-top5-kit/
├── SPEC.md                                   ← this file
├── src/app/globals.css                       ← full site CSS (only the parts in §2.3 are required)
├── src/app/layout.tsx                        ← font wiring reference (Geist, Instrument Serif, Inter)
├── src/app/(site)/page.tsx                   ← section order reference (only the first 5 imports matter)
├── src/components/home/hero-morph/HeroScrollMorph.tsx   ← SECTION 1 (hero)
├── src/components/home/hero-morph/DesktopDashboard.tsx  ← PLACEHOLDER for the console screenshot (code-built)
├── src/components/home/hero-morph/ScreenVerification.tsx← PLACEHOLDER for verify-flow.webm (code-built)
├── src/components/home/hero-morph/ScreenDeepfake.tsx    ← PLACEHOLDER for deepfake video (code-built)
├── src/components/home/HeroDemoButton.tsx    ← "Get Started" button (site version; simplified version in §3.6)
├── src/components/home/OnePlatformSection.tsx← SECTION 2
├── src/components/home/ServiceStrip.tsx      ← SECTION 3
├── src/components/home/LargeVideoSection.tsx ← SECTION 4
├── src/components/home/CustomerJourney.tsx   ← SECTION 5
├── src/components/ui/EyebrowBadge.tsx        ← used by section 5
├── src/components/layout/SmoothScroll.tsx    ← Lenis smooth scroll (optional but part of the feel)
├── src/lib/utils.ts                          ← `cn()` helper (clsx + tailwind-merge)
├── public/images/heros/hero-console-dashboard.webp   2400×1213  (hero screenshot, LCP)
├── public/images/fingerprint.svg                     70×70 viewBox (hero headline icon)
├── public/images/sparkle.svg                         24×24 viewBox (hero headline icon)
├── public/images/eyebrow-icon.svg                    24×24 viewBox (section 5 badge chevron)
├── public/images/logos/brand/claude.svg              24×24 viewBox, fill #D97757 (sections 2 + 3)
├── public/images/agents/agents.webp                  1732×955   (section 2 white card illustration)
├── public/images/every-identity-globe.webp           1024×1024  (section 2 "Audit-ready" card bg)
├── public/images/service-icons/*.svg                 6 Iconify icons, pre-fetched (section 3)
├── public/videos/verify-flow.webm                    570×1280, 63.2 s (hero phone video, step 1)
├── public/videos/deepfake-detection-workflow-step.webm 570×1280, 36.2 s (hero phone video, step 2)
├── public/videos/MCPServer_MotionSaas.mp4            1920×1080, 38.5 s, 26 MB (section 3 video)
├── public/videos/deepidv x Claude 2.png              1920×1080 (section 3 video poster; note the spaces)
└── reference-screenshots/                            1440×900 desktop captures, header hidden
    ├── hero-p0.00.png … hero-p1.00.png               hero at scroll progress p = 0, .10, .20, .30, .40, .50, .58, .75, .90, 1.0
    ├── hero-p0.00-NEW-TITLE.png                      hero intro WITH the new investor headline (target look)
    ├── section-02-one-platform.png                   full section, 1440×1617
    ├── section-03-service-strip.png                  full section, 1440×999
    ├── section-04-large-video.png                    full section, 1440×1195
    ├── section-05-customer-journey*.png              three auto-cycle states, 1440×1049
    └── mobile-390-top5-fullpage.png                  390-wide full page of all five sections (static hero variant)
```

---

## 2. Stack and global setup (Path A)

### 2.1 Dependencies (exact versions the site uses)

```
next 16.2.4 · react 19.2.4 · react-dom 19.2.4 · tailwindcss ^4 · @tailwindcss/postcss ^4
framer-motion ^12.38.0 · lucide-react ^1.11.0 · @iconify/react ^6.0.2 · lenis ^1.3.23
clsx ^2.1.1 · tailwind-merge ^3.5.0 · shadcn ^4.5.0 (only for `@import "shadcn/tailwind.css"`; optional, see 2.3)
```

Not needed for the deck: `@calcom/embed-react` (the site's "Get Started" opens a Cal.com modal; §3.6 gives a plain button), analytics, SEO schema components (`PageSchemas`, `VideoSchema`), `next/font` if you use `<link>` fonts instead.

### 2.2 Fonts (which font renders where)

| Font | Where it renders | How the site loads it |
|---|---|---|
| **Geist** (400/500/600) | Hero (everything), Section 2 (everything), browser/phone chrome | `next/font/google` → CSS var `--font-geist` |
| **Instrument Serif** italic 400 | Hero word "verification" (new: "Verification"), hero quote-card "deepidv", Section 2 word "anyone" | `next/font/google` → CSS var `--font-instrument-serif` |
| **Inter** (400/500/600) | Sections 3, 4, 5 (body font via `--font-sans`) | `next/font/google` → CSS var `--font-sans` on `<html>` (self-hosted `@font-face` also exists but next/font wins) |

Next.js wiring (from `src/app/layout.tsx`):

```tsx
import { Inter, Geist, Instrument_Serif } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument-serif" });
// <html className={`antialiased font-sans ${inter.variable} ${geist.variable} ${instrumentSerif.variable}`}>
// <body className="bg-white overflow-x-clip">
```

Non-Next fallback (put in `<head>`, then define the same three CSS variables on `:root`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root { --font-geist: "Geist"; --font-instrument-serif: "Instrument Serif"; --font-sans: "Inter"; }
  html { font-family: var(--font-sans), system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
</style>
```

### 2.3 Global CSS you MUST add (Tailwind v4 `globals.css`)

The components rely on these globals. Copy them into your app's global stylesheet exactly (the full original file is in the kit at `src/app/globals.css` and in Appendix B; only the parts below are required for the five sections).

```css
@import "tailwindcss";
/* optional: the site also imports shadcn's preset, which is what overrides --color-primary.
   If you do NOT import it, add the .text-primary override at the bottom of this block. */
/* @import "shadcn/tailwind.css"; */

@theme {
  --color-primary: #0080DC;         /* token exists, but see .text-primary note below */
  --font-sans: "SF Pro", "Inter", system-ui, sans-serif; /* overridden at runtime by next/font → Inter */

  /* ServiceStrip mobile marquee */
  --animate-marquee: marquee var(--duration, 40s) linear infinite;
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(calc(-100% - var(--gap, 1rem))); }
  }
}

/* `container` utility used by sections 3 and 4 */
@utility container {
  @apply px-4 mx-auto max-w-[98rem] sm:px-6 lg:px-8;
}

body {
  background: #ffffff;
  color: #0B0F1A;
  font-family: var(--font-sans);
}

/* Lenis (only if you mount <SmoothScroll />) */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: clip; }
.lenis.lenis-smooth iframe { pointer-events: none; }

/* Tailwind v3-style default border colour (v4 defaults to currentColor) */
@layer base {
  *, ::before, ::after { border-color: #e5e5e5; }
}

/* ===== CRITICAL — unlayered heading rules. These BEAT Tailwind utilities (cascade layers). ===== */
:where(h1) { font-size: 37px; line-height: 1.1; font-weight: 600; }
@media (min-width: 768px)  { :where(h1) { font-size: 42px; line-height: 1; } }
@media (min-width: 1024px) { :where(h1) { font-size: 48px; } }

:where(h2) { font-size: 25px; line-height: 1.3; font-weight: 600; }
@media (min-width: 768px)  { :where(h2) { font-size: 33px; } }
@media (min-width: 1024px) { :where(h2) { font-size: 38px; } }

:where(h3) { font-size: 22px; line-height: 1.1; font-weight: 600; }
@media (min-width: 768px)  { :where(h3) { font-size: 24px; } }
@media (min-width: 1024px) { :where(h3) { font-size: 26px; } }

:where(h4) { font-size: 18px; line-height: 1.3; font-weight: 500; }
@media (min-width: 768px)  { :where(h4) { font-size: 19px; } }
@media (min-width: 1024px) { :where(h4) { font-size: 20px; } }

:where(h5) { font-size: 16px; line-height: 1.3; font-weight: 400; }
@media (min-width: 768px)  { :where(h5) { font-size: 17px; } }

/* If you did NOT import shadcn/tailwind.css: make `text-primary` match the live site (near-black). */
/* .text-primary { color: #171717; } */
```

Why the heading rules matter, concretely (all at ≥1024px): hero `h1` line-height becomes **1.0** (not 1.05); section 2 `h2` "Verify anyone. Stop every fraud." renders **38px** (not 52px), and its `<em>anyone</em>` inherits weight 600 → Instrument Serif has no 600 so the browser **synthesizes bold** (that faux-bold italic is the real look); all `h3` cards in section 2 render **26px** (not 27px/32px) and weight 600 (not 500); sections 3, 4, 5 `h2` render **38px / 49.4px line-height / 600** (not 30–44px bold). Section 5's `h5` = 17px/400.

### 2.4 Tailwind v4 palette values used (for Path B, or non-Tailwind CSS)

| Class | Hex | Class | Hex |
|---|---|---|---|
| `gray-50` | `#f9fafb` | `gray-400` | `#99a1af` |
| `gray-100` | `#f3f4f6` | `gray-500` | `#6a7282` |
| `gray-200` | `#e5e7eb` | `gray-700` | `#364153` |
| `gray-300` | `#d1d5dc` | `gray-900` | `#101828` |
| `neutral-400` | `#a1a1a1` | `neutral-800` | `#262626` |
| `text-primary` (as rendered) | `#171717` | body text | `#0B0F1A` |

Brand colours used directly in the components: `#0690F2` (brand blue, CTAs/accents), `#0F8DEC`, `#007AFF`, `#6FB7F0` (light blue on navy), `#0A1628` (hero ink), `#5B6B82` (hero muted), `#93A1B5` (hero subtle), `#7A8AA0`, `#E2E8F0`, `#F5F7FA`, `#F1F4F8`, `#F7F9FC`, `#EAF4FE`, `#E7F7EE`/`#16A34A`/`#22C55E` (green), `#030712` (Get Started button), navy `#0A1428`/`#0A1220`/`#0B1322`.

### 2.5 Page assembly

```tsx
// app/page.tsx (or the deck's route)
import SmoothScroll from "@/components/layout/SmoothScroll";        // optional
import HeroScrollMorph from "@/components/home/hero-morph/HeroScrollMorph";
import OnePlatformSection from "@/components/home/OnePlatformSection";
import ServiceStrip from "@/components/home/ServiceStrip";
import LargeVideoSection from "@/components/home/LargeVideoSection";
import CustomerJourney from "@/components/home/CustomerJourney";

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <HeroScrollMorph />
      <OnePlatformSection />
      <ServiceStrip />
      <LargeVideoSection />
      <CustomerJourney />
    </>
  );
}
```

Layout context on the live site: `<main>` sits inside `<div className="flex flex-col min-h-screen w-full lg:py-5 overflow-x-clip">` (20px top padding at ≥1024px) under a **fixed** header. The deck has no header; nothing in the five sections depends on it (the hero copy is vertically centred in its own 62vh box). Keep `<body className="bg-white overflow-x-clip">` because the hero and section 2 use `w-screen` + `marginLeft: calc(50% - 50vw)` full-bleed tricks. Section 2 deliberately overlaps the bottom of the hero with `-mt-8 lg:-mt-12` (its rounded navy surface rises over the hero's white).

---

## 3. Section 1 — Hero (`HeroScrollMorph.tsx`, Appendix A.1)

### 3.1 What it is
A light "Dribbble-style" hero. On desktop (≥1024px, motion allowed) the section is **300vh tall** with a **sticky 100vh stage**. The intro shows the headline + 2 CTAs above a glass browser frame containing the real deepidv console screenshot. As you scroll, the headline lifts and fades, the browser frame **morphs in place into a phone** (width/height/radius interpolate), the screenshot cross-fades out, a product video fades in inside the phone, and a three-column "board" appears: step copy on the left, phone centre, quote card right, with a two-segment progress bar. Two steps; scrolling up reverses everything. Below 1024px or with `prefers-reduced-motion`, a **static** variant renders: same copy, screenshot in a browser frame, then the two steps stacked with a static phone each.

### 3.2 Scroll timeline (p = scroll progress 0→1 across the 300vh section; `range = sectionHeight − viewportHeight`)

| p | What happens (framer-motion `useTransform` ranges) |
|---|---|
| 0.00–0.06 | Intro hold. Nothing moves (LCP screenshot paints sharp). |
| 0.06–0.18 | Headline block opacity 1→0 and y 0→−44px. |
| 0.14–0.46 | **THE MORPH**: frame width monW→phW, height monH→phH, border-radius 14→44px; device y introY→0 (from p=0). |
| 0.14–0.24 | Browser chrome opacity 1→0 and screenshot opacity 1→0 (screenshot leaves before the frame goes portrait). |
| 0.30–0.44 | Phone status bar + notch + home indicator opacity 0→1. |
| 0.30–0.42 | Video 1 opacity 0→1 (stays 1 until 0.66, then →0 by 0.71). |
| 0.34–0.50 | Blue bloom behind phone opacity 0→1. |
| 0.44–0.52 | Left rail + right quote card opacity 0→1, x −24→0 (left) / +24→0 (right). |
| 0.46–0.52 | Step 1 content opacity 0→1; progress segment 1 scaleX 0→1. |
| 0.66–0.71 | Step 1 → Step 2 cross-fade (copy, quote, pill, video); segment 2 scaleX 0→1. |
| 1.00 | Step 2 board, held until the section unpins. |

Geometry (recomputed on resize; `vw`/`vh` = viewport):
```
monW = min(980, vw*0.6);  monH = monW/1.978;  if (monH > vh*0.52) { monH = vh*0.52; monW = monH*1.978 }
phH  = min(660, max(600, vh*0.74));  phW = round((phH-48)*0.455) + 16;  introY = round(vh*0.36)
leftOffset = round(phW/2 + 28)  (left rail's right edge = 50% + leftOffset)
rightOffset = round(phW/2 − 16) (quote card's left edge = 50% + rightOffset, tucked slightly behind the phone)
```
At 1440×900: monW 864, monH 437, phW 294, phH 660, introY 324 (the bezel frame measures 294×660).

Scroll progress source: the component reads its own `getBoundingClientRect()` on native `scroll` (rAF-throttled) **and** subscribes to `window.lenis` if present. It uses a manual `useMotionValue`, not `useScroll`. It mounts exactly one tree: SSR + first client paint render the static tree, then swaps to the animated tree after mount when `matchMedia("(min-width:1024px)")` matches and reduced motion is off (no hydration mismatch).

### 3.3 Visual spec of every layer (desktop)

- **Section:** `bg-white`, `w-screen`, `marginLeft: calc(50% − 50vw)`, `height: 300vh`. Stage: `sticky top-0 h-screen overflow-hidden`.
- **Backdrop** (shared by both variants), all `pointer-events-none absolute inset-x-0 top-0`:
  1. `h-[72vh]` — `radial-gradient(120% 75% at 50% -8%, rgba(6,144,242,0.16) 0%, rgba(10,143,220,0.07) 30%, rgba(255,255,255,0) 62%)`
  2. `h-[50vh]` — `radial-gradient(60% 45% at 50% 6%, rgba(6,144,242,0.10) 0%, transparent 70%)`, `filter: blur(8px)`
  3. `h-[80vh]` dot grid — `radial-gradient(circle at center, rgba(10,22,45,0.05) 1px, transparent 2px)`, `background-size: 28px 28px`, masked `linear-gradient(180deg, #000 0%, transparent 45%)`.
- **Blue bloom behind the phone:** 640×640, centred, `radial-gradient(circle, rgba(6,144,242,0.20) 0%, rgba(6,144,242,0.06) 42%, transparent 70%)`, opacity driven by p.
- **Headline block** (`HeroCopy`): absolutely positioned `inset-x-0 top-0 h-[62vh]`, flex-centred, z-30; inner wrapper `max-w-[820px] px-6 text-center translate-y-6 md:translate-y-8`, font Geist.
  - `h1`: weight 600, `letter-spacing -0.04em`; **effective line-height 1.0** at lg (from the global `:where(h1)`).
  - Line 1 span: `block`, 36/46/**56px** (base/md/lg), weight 600, letter-spacing −0.05em, text gradient `linear-gradient(180deg, #0A1628 0%, rgba(10,22,45,0.55) 100%)` via `bg-clip-text text-transparent`. Inside it, the accent word is `font-family: var(--font-instrument-serif)`, italic, weight 400, letter-spacing 0, colour `#0690F2` (solid; it is inside the clipped span but its own colour applies… on the live site it renders solid `#0690F2`).
  - Line 2 span: `block mt-1`, 36/46/56px, colour `#0A1628`, weight 600, letter-spacing −0.04em. Contains: a smaller grey word (24/34/42px, `#93A1B5`, weight 500), the fingerprint icon, "humans", a "+" (28/32px, `#93A1B5`, weight 600), the sparkle icon, "AI".
  - Icons: `<img>` inline, `align-middle`, `margin-bottom: 6px`. Fingerprint: 38/46/54px square, `filter: drop-shadow(0 0 14px rgba(6,144,242,0.35))`. Sparkle: 42/50/58px square, `object-cover`, `drop-shadow(0 0 16px rgba(6,144,242,0.35))`. Both SVGs are a top-to-bottom gradient `#357CF7 → #BCD1F2` (files in kit; inline SVG in Appendix C).
  - Subhead `p`: `mt-6 max-w-[560px]`, 16px → 18px (md), line-height 1.55, colour `#5B6B82`.
  - CTA row: `mt-8 flex justify-center gap-3` (gap-2 below md).
    - **Get Started**: `bg-[#030712] text-white font-semibold text-[16px] rounded-[14px] px-[34px] py-[15px]`, Geist, letter-spacing −0.02em, `hover:scale-[1.03]`, transition 200ms; below md: `px-5 py-2.5 text-[14px] rounded-[12px]`. Rendered 154×54.
    - **Docs**: `inline-flex items-center gap-2 rounded-[14px] border bg-white px-[30px] py-[14px] text-[15px] font-semibold text-[#0A1628]`, border `#E2E8F0`, letter-spacing −0.02em, hover `scale-[1.02]` + border `#CBD5E1`; trailing lucide `ArrowUpRight` 18px stroke 2 at 70% opacity; links to `https://docs.deepidv.com` (new tab). Rendered 123×53.
- **Device frame** (morphs): `GLASS_BEZEL = "relative bg-white/35 backdrop-blur-xl ring-1 ring-white/60 border border-white/50"`, padding 8px (`p-2`), `box-shadow: 0 30px 80px -28px rgba(10,22,45,0.28)`, `will-change: width, height, transform`. Inner screen: `relative h-full w-full overflow-hidden bg-white`, same animated radius.
  - **Browser chrome** (top, 34px): `bg-[#F1F4F8] border-b border-black/[0.06] px-3.5`, three 10px dots `#FF5F57 #FEBC2E #28C840` with 6px gaps, centred URL pill `max-w-[55%] rounded-md bg-white px-3 py-0.5 text-[11px] font-medium text-[#5B6B82] ring-1 ring-black/[0.05]` reading `app.deepidv.com/console`.
  - **Screenshot** (`DashboardShot`): `next/image` `fill`, `object-cover object-top`, `sizes="(max-width:1023px) 100vw, 60vw"`, `priority`; overlay `linear-gradient(180deg, transparent 58%, #ffffff 100%)` so the bottom of the screenshot melts into white.
  - **Phone status bar** (top, 32px): `px-5 text-[12px] font-semibold text-[#0A1628]` → "9:41" left; right: 4-bar signal SVG (16×11), wifi SVG (15×11), battery (22×11 rounded 3px, border `#0A1628/40`, fill inset 1.5px with 5px right gap, nub 1.5×4).
  - **Notch:** 84×22 black pill at `top-[12px]`, centred. **Home indicator:** 110×4 `bg-black/30` at `bottom-[9px]`, centred. Both fade in with the status bar.
  - **Video area:** `absolute inset-x-0 bottom-0 top-[32px] overflow-hidden bg-black/[0.02]`; each `<video autoPlay muted loop playsInline preload="auto" class="h-full w-full object-cover">`, cross-faded by p.
  - **Floating pill** (bottom-left of screen, `bottom-3 left-3`, z-40): `rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-semibold text-[#0690F2] shadow-[0_6px_18px_-6px_rgba(10,22,45,0.4)] ring-1 ring-black/[0.06] backdrop-blur-md`, leading 6px green dot `#22C55E`. Text per step: `142ms · verified` / `synthetic media blocked`.
- **Left rail** (`hidden lg:flex`, z-30): width `clamp(260px, 22vw, 340px)`, height = phH, vertically centred (`top-1/2`, y −50%), right edge at `calc(50% + leftOffset)`. Top: step copy (absolute stack, cross-faded). Bottom: progress bar = two `h-1.5 w-12 rounded-full bg-[#E2E8F0]` tracks with `bg-[#0690F2]` fills (`origin-left scaleX`), gap 8px.
  - Step `h2`: `text-[clamp(1.7rem,2.5vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-[#0A1628]`, one `<span class="block">` per title line. **Effective at 1440: 38px / 49.4px / 600 / −0.95px** (global rule wins over the clamp).
  - Step sub `p`: `mt-4 max-w-[320px] text-[15px] leading-relaxed text-[#5B6B82]`.
- **Right rail** (`hidden lg:flex`, z-10 — *behind* the phone): width `clamp(300px, 26vw, 420px)`, left edge at `calc(50% + rightOffset)`, vertically centred. **Quote card:** `w-full rounded-2xl bg-[#F5F7FA] p-7 ring-1 ring-black/[0.04]` (rendered 374×210): bold line `text-[clamp(1.15rem,1.5vw,1.5rem)] font-semibold leading-snug tracking-tight text-[#0A1628]`; body `mt-4 text-[15px] leading-relaxed text-[#7A8AA0]`; signature `mt-6 text-[24px] italic text-[#0690F2]` in Instrument Serif reading `deepidv`.
- **Static variant** (`StaticHero`, <1024px or reduced motion): `relative w-screen overflow-hidden bg-white` + backdrop; content `max-w-[1100px] px-5 pb-20 pt-28 md:pt-32`; `HeroCopy`; then the screenshot in a glass browser frame `max-w-[920px] mt-12` (`GLASS_BEZEL overflow-hidden rounded-[18px] p-1.5`, inner `rounded-[13px] bg-white`, `BrowserChrome`, `<Image width=2400 height=1213 priority sizes="100vw" class="h-auto w-full">` with overlay `linear-gradient(180deg, transparent 72%, #fff 100%)`); then the two steps stacked `mt-20 gap-16 md:gap-24`, each `flex-col items-center gap-8 md:gap-10`, alternating `md:flex-row` / `md:flex-row-reverse`, columns 34% / 32% / 34% (copy / `StaticPhone` / quote). `StaticPhone`: `GLASS_BEZEL w-[262px] rounded-[42px] p-2`, inner `rounded-[34px] bg-white`, status bar, `h-[540px]` video area.

### 3.4 Copy (verbatim)

Current site headline (to be replaced): line 1 `The new standard of *verification*` · line 2 `for ⌾ humans + ✦ AI`.

Subhead (unchanged): `Verify real people and AI agents from our platform or API, powered by global-leading deepfake detection and compliance built to scale globally.`

CTAs (unchanged): `Get Started` · `Docs ↗`

Steps (unchanged):

| | Step 1 | Step 2 |
|---|---|---|
| Title lines | `The Fastest` / `Verification API` | `North America's` / `Best Deepfake` / `Detection SDK` |
| Sub | `Document, liveness, and face match in one call — a decision in under 150ms.` | `Five forensic layers catch synthetic media and AI fakes before they get in.` |
| Video | `/videos/verify-flow.webm` | `/videos/deepfake-detection-workflow-step.webm` |
| Pill | `142ms · verified` | `synthetic media blocked` |
| Quote bold | `Speed is the whole point.` | `Fakes don't get through.` |
| Quote rest | `That's exactly why teams ship verification in an afternoon, not a quarter.` | `That's exactly why the hardest synthetic media stops here, not in production.` |
| Signature | `deepidv` (Instrument Serif italic, `#0690F2`) | same |

### 3.5 THE NEW HEADLINE (the only content change)

Target: **"Invest in the new standard of AI + Human Verification & Risk Management"**, typeset in the existing headline system as three lines at the same sizes, reusing the same gradient/serif/icon treatments. This exact JSX was rendered in the real hero at 1440×900 and fits inside the 820px column without wrapping (see `reference-screenshots/hero-p0.00-NEW-TITLE.png`):

```
Line 1 (gradient ink):        Invest in the new standard of
Line 2 (solid #0A1628):       ✦ AI  +  ⌾ Human          ← sparkle before "AI", grey "+", fingerprint before "Human"
Line 3 (gradient ink):        Verification & Risk Management   ← "Verification" in Instrument Serif italic #0690F2
```

Replace the `<h1>…</h1>` inside `HeroCopy()` in `HeroScrollMorph.tsx` with:

```tsx
<h1 className="font-[600] leading-[1.05]" style={{ letterSpacing: "-0.04em" }}>
  {/* line 1 */}
  <span
    className="block bg-clip-text text-transparent text-[36px] md:text-[46px] lg:text-[56px]"
    style={{
      backgroundImage: "linear-gradient(180deg, #0A1628 0%, rgba(10,22,45,0.55) 100%)",
      fontWeight: 600,
      letterSpacing: "-0.05em",
    }}
  >
    Invest in the new standard of
  </span>
  {/* line 2 */}
  <span
    className="mt-1 block text-[36px] text-[#0A1628] md:text-[46px] lg:text-[56px]"
    style={{ fontWeight: 600, letterSpacing: "-0.04em" }}
  >
    <SparkleIcon />
    AI{" "}
    <span className="text-[28px] md:text-[32px]" style={{ color: "#93A1B5", fontWeight: 600 }}>
      +
    </span>{" "}
    <FingerprintIcon />
    Human
  </span>
  {/* line 3 */}
  <span
    className="mt-1 block bg-clip-text text-transparent text-[36px] md:text-[46px] lg:text-[56px]"
    style={{
      backgroundImage: "linear-gradient(180deg, #0A1628 0%, rgba(10,22,45,0.55) 100%)",
      fontWeight: 600,
      letterSpacing: "-0.05em",
    }}
  >
    <span
      style={{
        fontFamily: SERIF,
        fontStyle: "italic",
        fontWeight: 400,
        letterSpacing: "0",
        color: "#0690F2",
      }}
    >
      Verification
    </span>{" "}
    &amp; Risk Management
  </span>
</h1>
```

Notes: `SERIF`, `FingerprintIcon`, `SparkleIcon` already exist in the file. The grey "for" span from the original is removed (there is no "for" in the new title). If line 1 ever wraps at your viewport, change `lg:text-[56px]` to `lg:text-[52px]` on all three lines rather than widening the 820px column. With three lines the copy block is ≈375px tall (the original two-line block measures 318px) and sits centred inside the 62vh box (558px at a 900px viewport, then nudged down 32px by `md:translate-y-8`), so it ends around y≈500px and still clears the device frame, whose top edge sits at ≈556px at 1440×900 (stage centre 450 + introY 324 − monH/2 218). The reference screenshot confirms the buttons bottom out at ≈498px and the frame starts at ≈565px. Leave the subhead and CTAs exactly as they are (the request changes the title only).

### 3.6 "Get Started" button without Cal.com

The site's `HeroDemoButton` opens a Cal.com booking modal (`team/deepidv/demo`) and fires a Google Ads conversion. For the deck, keep the visual and drop the integrations:

```tsx
"use client";
export default function HeroDemoButton() {
  return (
    <button
      type="button"
      style={{ fontFamily: "var(--font-geist), system-ui, sans-serif", letterSpacing: "-0.02em" }}
      className="relative px-[34px] py-[15px] bg-[#030712] text-white font-semibold text-[16px] rounded-[14px] transition-all duration-200 hover:scale-[1.03] cursor-pointer max-md:px-5 max-md:py-2.5 max-md:text-[14px] max-md:rounded-[12px]"
    >
      Get Started
    </button>
  );
}
```

### 3.7 Assets used by the hero, and placeholders if you don't have them

| Asset | Have it in kit? | What it is | Placeholder if missing |
|---|---|---|---|
| `/images/heros/hero-console-dashboard.webp` 2400×1213 (1.978:1) | yes | Real screenshot of the deepidv web console, **Sessions** page: left sidebar (deepidv logo; blue "Agent Console" button; nav Dashboard, Workflows, **Sessions** (active, black), Compliance ›, Monitoring ›, Detection, Analytics, Developer Tools ›; bottom "Avery Patel · Enterprise · 1,250/5,000 credits"); main area on `#F7F9FC`-ish grey: "Meridian Financial / Admin" org row, title "Sessions" + "Monitor all verifications across your organization", buttons "Chat with Luna" and blue "+ New Session", tabs `All 25 · Verified 7 · Submitted 3 · In Progress 8 · Rejected 4 · Voided 0 · Failed 0`, filters (Search…, Workflow, Services, Date Sent, Country), table columns APPLICANT / WORKFLOW / SERVICES / COUNTRY / DATE SENT / SENT BY / STATUS with rows Ava Reynolds, Mateo Chen, Olivia Bennett, Daniel Park (2 sessions), Priya Shah (workflows like "Meridian - ID + Face", coloured service dots, 🇨🇦/🇺🇸 flags, "June 12, 2026 2:57 PM", "Avery Patel", blue "In Progress" / green "Verified" chips). | Render `DesktopDashboard.tsx` (Appendix A.2, code-built with lucide icons, same palette) inside the browser frame instead of `<Image>`: replace `<DashboardShot priority />` with `<DesktopDashboard />` and the static variant's `<Image …>` with a `aspect-[1.978]` box containing `<DesktopDashboard />`. Keep the white fade overlay. |
| `/images/fingerprint.svg` (70×70) | yes (also inline in Appendix C) | Fingerprint glyph, vertical gradient `#357CF7 → #BCD1F2` | Inline the SVG from Appendix C. Do not substitute a lucide icon (the gradient is part of the look). |
| `/images/sparkle.svg` (24×24) | yes (also inline in Appendix C) | Four-point sparkle + small sparkle, same gradient | Inline the SVG from Appendix C. |
| `/videos/verify-flow.webm` 570×1280, 63.2 s, 5.1 MB | yes | Screen recording of the deepidv hosted verification flow in a mobile browser (`dev-verify.deepidv.com`): "Front of your ID" capture of an Ontario driver's licence on a wooden desk, then document/selfie steps. | Option 1: any 9:19.5 (≈0.445) portrait screen recording. Option 2: render `ScreenVerification.tsx` (Appendix A.3, code-built "Verified · Identity confirmed" phone screen) in place of `<PhoneVideo src=…/>` for step 1. |
| `/videos/deepfake-detection-workflow-step.webm` 570×1280, 36.2 s, 1.6 MB | yes | Screen recording of the selfie/liveness step: oval face frame with a blue face-mesh overlay, caption "Hold still and look straight ahead". | Render `ScreenDeepfake.tsx` (Appendix A.4, "Synthetic media check passed · five forensic layers · 99.2%") for step 2. |

The phone screen area is sized to the videos' 0.445 aspect (`phW = (phH−48)*0.455 + 16`), so any replacement video should be 570×1280 or the same ratio, `object-cover`.

---

## 4. Section 2 — `OnePlatformSection.tsx` (Appendix A.6)

### 4.1 Shape and surface
- Outer `section`: `relative w-full bg-white`, font Geist.
- Navy surface: `relative -mt-8 lg:-mt-12 overflow-hidden rounded-tl-[20px]`, `shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]`, background `linear-gradient(180deg, #0A1428 0%, #0A1220 100%)`, and the signature **sweep**: `border-top-right-radius: clamp(180px,62vw,1000px) clamp(90px,22vw,360px)` (at 1440: 892.8px × 316.8px — the top-right corner is one huge elliptical curve, top-left is a small 20px radius). Top glow: `absolute inset-x-0 top-0 h-[55%]` `radial-gradient(60% 46% at 50% 0%, rgba(6,144,242,0.12), transparent 68%)`.
- Content: `max-w-[1200px] px-5 sm:px-6 py-20 md:py-24 lg:py-28`. Rendered section height 1593px at 1440 wide.

### 4.2 Header (12-col grid, gap-4)
- Eyebrow (`lg:col-span-3`): `text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6FB7F0]` → `One platform for identity & fraud`.
- `h2` (`lg:col-span-9`, `max-w-[620px]`): `text-[34px] sm:text-[44px] lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.03em] text-white` — **effective 38px / 49.4px / 600 / −1.14px**. Text: `Verify <em>anyone</em>.<br class="hidden lg:block"/> Stop every fraud.` where `<em>` = Instrument Serif italic, colour `#6FB7F0`, weight inherited 600 (faux bold).
- Sub `p`: `mt-4 max-w-2xl text-[15px] leading-relaxed text-white/55` → `One Verification API, drop-in SDKs, and a native MCP server — every KYC, KYB, AML, and deepfake check in one place.`

### 4.3 Bento grid (`mt-12 grid gap-3.5`, 1 col → md 2 cols → lg 12 cols)
Shared glass card style `GLASS = "relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md"`. Chip = `whitespace-nowrap rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[12px] font-medium text-white/80`. Card heading `h3` = `text-[22px] lg:text-[27px] font-semibold leading-[1.12] tracking-tight text-white` → **effective 26px / 28.6px / 600 / −0.65px**.

1. **Row 1, full width (lg col-span-12): split container** `rounded-[26px] border border-white/10 overflow-hidden`, `flex-col lg:flex-row`.
   - **Left 52%** (`p-7 lg:p-9 flex-col gap-6`), background `linear-gradient(158deg, #0B3AA0 0%, #1E62C9 50%, #4E92E6 100%)`.
     - `h3` `text-[26px] lg:text-[32px] font-medium` → effective 26px/600: `Every check. One API.`
     - White result card `max-w-[400px] rounded-2xl bg-white p-4 shadow-[0_30px_60px_-24px_rgba(8,20,60,0.6)]` (400×149): top row green pill `bg-[#E7F7EE] text-[#16A34A] text-[11px] font-semibold rounded-full px-2.5 py-1` with lucide `Check` 11/3 → `Verified`; right `138ms` + lucide `Share2` 13 in `#93A1B5` 11px medium. Then avatar `h-10 w-10 rounded-xl bg-[#EAF4FE] text-[#0690F2] text-[12px] font-semibold` "MA" + `Maria Andersson` (14px semibold `#0A1628`) / `Passport · Sweden` (12px `#5B6B82`). Then chips `bg-[#F1F4F8] text-[#0A1628] text-[11px] font-medium rounded-full px-2.5 py-1`: `Document ✓`, `Liveness ✓`, `Face 99.5%`, `AML clear`.
     - Search bar `mt-3 rounded-2xl border border-white/30 bg-white/15 px-4 py-3 backdrop-blur-md` (526×47): lucide `Search` 16 white/80, `Run any check…` 14px white/80, `<kbd>` `⌘K` (`rounded-md border-white/30 bg-white/20 px-1.5 py-0.5 font-mono text-[10px]`).
     - Bottom chips (`mt-auto pt-2`, `border-white/25 bg-white/10 text-white/90 text-[12px]`): `KYC, KYB, AML / PEP, Sanctions, Deepfake, Background`.
   - **Right 48%** (`p-7 lg:p-9 flex-col justify-end`), background `#0A1428`, with `DotGrid` (`opacity-[0.10]`, `radial-gradient(circle, #fff 1px, transparent 1px)` 26px grid). Right-aligned: `h3` `The most complete system.`; `p` `ml-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/55` → `Match every person and business against the exact checks they need — from one proven platform with a verifiable record.` Bottom row `mt-8 flex items-center gap-4`: **PillCarousel** bleeding off the left edge (`-ml-7 lg:-ml-9`, mask `linear-gradient(90deg,#000 0%,#000 76%,transparent 100%)`, items = CHECKS doubled, animates `x: 0% → −50%` over 22 s linear infinite) + white CTA `rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0A1628]` `The Journey ↗` (lucide `ArrowUpRight` 15/2.2, `hover:-translate-y-0.5`) linking to `#customer-journey`.
     CHECKS = `KYC, KYB, AML / PEP, Sanctions, Deepfake, Background, Credit, Age, Address, NFC`.
2. **SDK + MCP card** (GLASS, `lg:col-span-7 lg:row-start-2`, `min-h-[300px] p-6 lg:p-7`): `h3` `SDKs for apps. MCP for agents.`; **ClaudeChat** block `mt-5 rounded-2xl border border-white/10 bg-[#0B1322]`: header row (`px-4 py-2.5 border-b border-white/[0.07]`) with `claude.svg` 16px + `Claude` (12px white/70) + right pill `bg-white/[0.06] text-[10.5px] text-[#6FB7F0]` with green dot → `deepidv MCP`; body `p-4 space-y-3`: user bubble right-aligned `rounded-2xl rounded-br-sm bg-white/[0.07] px-3.5 py-2 text-[13px] text-white/85` → `Verify this customer before I release the payout.`; tool chip `rounded-md border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[11px] text-white/55` with lucide `Sparkles` 11 `#6FB7F0` → `deepidv.verify_identity()`; result line 13px medium white/90 with green check circle (`bg-[#16A34A]/25`, `Check` 11/3 `#22C55E`) → `Verified — passport · liveness · AML clear.` Bottom chips (`mt-auto pt-5`): `Web, iOS, Android, React Native, Flutter, MCP`.
3. **Agentic fraud suite card** (white, `lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:row-span-2`, `min-h-[360px] rounded-[26px] border border-black/[0.08] bg-white shadow-[0_10px_40px_-12px_rgba(10,22,45,0.14)]`): top glow `h-48 radial-gradient(60% 90% at 50% 0%, rgba(6,144,242,0.10), transparent 70%)` pulsing opacity 0.6→1→0.6 over 5 s; illustration area `min-h-[210px] flex-1` with `agents.webp` (`fill object-contain p-6`, `unoptimized`) floating `y: 0 → −10 → 0` over 6 s ease-in-out infinite; bottom `p-6 lg:p-7`: `h3` (`text-[#0A1628]`) `An agentic fraud suite.`; row `mt-5 gap-2`: blue CTA `rounded-full bg-[#0690F2] px-4 py-2 text-[13px] font-semibold text-white` `Meet the agents ↗` (site links to `#meet-your-team`, a section not in this scope — point it at `#customer-journey` or drop the href) + light chips `border-black/10 bg-[#F5F7FA] text-[#5B6B82] text-[12px] font-medium rounded-full px-2.5 py-1`: `Luna, Arc, deepeye, Arbiter, Know Your Agent`.
4. **Audit-ready card** (GLASS, `lg:col-span-7 lg:row-start-3`, `min-h-[200px]`): background image `every-identity-globe.webp` (`fill object-cover object-right opacity-40`) under `linear-gradient(to right, rgba(8,16,30,0.96) 26%, rgba(8,16,30,0.5) 64%, rgba(8,16,30,0.1) 100%)`; content `p-6 lg:p-7 justify-between gap-5`: `h3` `Audit-ready in 211+ countries.` + chips `211+ countries, GDPR, SOC 2, ISO 27001, Cryptographic proof, <150ms`.

### 4.4 Stats band (`mt-3.5`, `rounded-[26px] border border-white/10 bg-white/[0.03] py-8 backdrop-blur-md`, 2 cols → lg 4 cols with `divide-x divide-white/10`)
Each cell `px-6 text-center lg:text-left`: value `text-[40px] lg:text-[52px] font-semibold tabular-nums text-white`, label `mt-2 text-[12px] uppercase tracking-wide text-white/45`.
`30+` check types behind one API · `6` SDK targets plus a native MCP server · `211+` countries covered on day one · `100%` of checks signed with verifiable proof.

### 4.5 Motion
Everything reveals with `whileInView` once (`amount 0.2`): opacity 0→1, y 24→0, 0.55 s, ease `[0.16,1,0.3,1]`, delays 0 / 0.04 / 0.08 / 0.12 / 0.10 / 0.06 in DOM order; inner stagger on the agentic card 0.16 / 0.22 / 0.30 (y 16→0, 0.6 s). All motion is gated on `mounted && !prefers-reduced-motion` (initial `false` otherwise) to avoid hydration mismatch.

### 4.6 Assets and placeholders
| Asset | Have it? | Description | Placeholder |
|---|---|---|---|
| `/images/logos/brand/claude.svg` | yes (inline in Appendix C) | Anthropic Claude "starburst" mark, fill `#D97757`, 24×24 viewBox | Inline from Appendix C. |
| `/images/agents/agents.webp` 1732×955, transparent | yes | Illustration of the deepidv agent mascots: a large glossy **blue** round character (deepeye, with a magnifying glass and a dark-blue star), a white document card, and three smaller round characters — **green** (Arc), **pink** (Luna), **orange** (Arbiter) — over a swooping pale-blue ribbon with small white sparkles. | Build an inline SVG at the same 1732×955 box: a soft ribbon (`#DCE9FB`→`#F3F7FD` bezier band across the width), four circles with two dark oval eyes each — blue `#0F8DEC` r≈130 at (640,470), pink `#EC4899` r≈75 at (1015,430), green `#22C55E` r≈50 at (1075,265), orange `#F97316` r≈70 at (1200,370) — plus a tilted white rounded rectangle "document" at (845,530). Keep it flat, no gloss. Or omit the image and leave the top glow + empty space; do not swap in a stock photo. |
| `/images/every-identity-globe.webp` 1024×1024 | yes | Dark, near-monochrome photographic globe with floating white label pills carrying names in many scripts, flags and green check badges (`Анна Иванов 🇷🇺`, `李伟 🇨🇳`, `Paul Kennedy 🇺🇸`, `James Smith 🇬🇧`, `Sophie Martin 🇫🇷`, `田中 ゆき 🇯🇵`, `María García 🇲🇽`, `Carlos Silva 🇧🇷`, `Ahmed Khan 🇸🇦`). Shown at 40% opacity, right-aligned, under the navy gradient, so only the labels on the right side read. | Omit the `<Image>` and keep the gradient; optionally scatter 4–5 white pills (`rounded-md bg-white/90 text-[#0A1628] text-[13px] font-semibold px-2 py-1` with a flag emoji and a green ✓ dot) at 40% opacity on the right 40% of the card. |

---

## 5. Section 3 — `ServiceStrip.tsx` (Appendix A.7)

- `section`: `py-12 bg-white overflow-hidden lg:mt-20`; inner `.container mx-auto px-4`. Font Inter (inherited). Rendered height 975px at 1440.
- Header `text-center mb-10`: eyebrow `text-sm text-primary font-medium uppercase tracking-wider` → **renders `#171717`** (near-black, 14px, letter-spacing 0.7px): `Our Technology`; `h2 mt-4 text-2xl sm:text-3xl` → **effective 38px / 49.4px / 600**: `Proprietary Solutions Built by Us`.
- Strip wrapper `relative` with 80px white fade gradients on both sides (`from-white to-transparent`, z-10).
  - Desktop (≥1024): `flex flex-wrap items-center justify-center gap-6 max-w-5xl mx-auto` → 6 cards + a dashed ghost card `px-6 py-3 rounded-2xl border border-dashed border-gray-300 text-gray-400` with `text-sm font-semibold` `+ 15 more services`.
  - Mobile (<1024, measured via `window.innerWidth`): `overflow-hidden py-4` → `flex w-max gap-6 animate-marquee` with the items duplicated.
  - **ServiceCard:** `flex items-center gap-2 px-6 py-1 rounded-2xl bg-gray-50 border border-gray-100` (rendered 199×50); icon wrapper `p-2 rounded-xl`; `<Icon>` from `@iconify/react` `w-6 h-6 text-gray-500/70`; label `text-[15px] font-medium text-gray-500/80 whitespace-nowrap`.
  - Items (Iconify id → label): `mynaui:face-id` → ID Verification · `hugeicons:face-id` → Deepfake Detection · `mdi:bank-transfer` → Open Banking · `mdi:map-marker-check` → Address Verification · `mdi:shield-search` → Background Checks · `mdi:robot-outline` → Risk & Compliance Agents. `@iconify/react` fetches these from `api.iconify.design` at runtime; the kit also has them pre-fetched as SVG files in `public/images/service-icons/` (`<set>-<name>.svg`, 24×24, `currentColor`) if you prefer `<img>`/inline SVG with `color: rgba(106,114,130,0.7)`.
- Claude promo block `max-w-4xl mx-auto mt-16`: centred pill `inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700` with `claude.svg` 16px → `Now available in Claude`; then `relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 aspect-video shadow-[0_2px_8px_rgba(0,0,0,0.06)]` (896×504) containing `<video src="/videos/MCPServer_MotionSaas.mp4" poster="/videos/deepidv%20x%20Claude%202.png" muted loop playsInline preload="metadata" class="w-full h-full object-cover">`. An `IntersectionObserver` (threshold 0.4) plays it when ≥40% visible and pauses when it leaves.

Assets: `MCPServer_MotionSaas.mp4` 1920×1080, 38.5 s, 26 MB (motion-graphics promo: "Your Ai Agent in Claude" title, deepidv × Claude MCP demo). Poster `deepidv x Claude 2.png` 1920×1080: light dotted background with faint diagonal blue and peach bands, the `deepidv` wordmark (blue chevron logo, navy "deep", blue "idv") on the left and the Claude starburst + "Claude" serif wordmark on the right. **Placeholders:** the same film is on YouTube as `https://www.youtube.com/watch?v=t50mizB-IFU` ("deepidv now runs natively inside your AI agent.", 39 s) — use an `<iframe src="https://www.youtube.com/embed/t50mizB-IFU?autoplay=1&mute=1&loop=1&playlist=t50mizB-IFU&controls=0&rel=0&modestbranding=1">` in the same aspect-video box, or show only the poster (or `https://i.ytimg.com/vi/t50mizB-IFU/maxresdefault.jpg`) as a static image.

---

## 6. Section 4 — `LargeVideoSection.tsx` (Appendix A.8)

- `section overflow-hidden` → `.container py-16 lg:py-24` → card `rounded-[28px] border border-gray-200/70 bg-[#f6f7f9] p-5 sm:p-8 lg:p-14` (1376×979 at 1440). Font Inter.
- Header `flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-12`:
  - `h2 max-w-2xl text-3xl sm:text-4xl lg:text-[40px] font-bold leading-[1.1] tracking-tight` → **effective 38px / 49.4px / 600 / −0.95px**, two `block` spans: `AI that knows how to verify` in `text-gray-400` (`#99a1af`) and `AI trained to verify in seconds` in `text-gray-900` (`#101828`).
  - `p text-base leading-relaxed text-gray-500 lg:max-w-sm lg:pt-1` (384px wide, `#6a7282`): `Verify anyone, anywhere in seconds. Instant face matching, deepfake detection, document verification and more through a single API.`
- Media `mt-10 lg:mt-14`: `relative aspect-video w-full overflow-hidden rounded-2xl lg:rounded-3xl border border-gray-200 bg-gray-900` (1262×710).
  - Facade (before click): full-bleed `<img src="https://i.ytimg.com/vi/kxCRwBm9lBw/maxresdefault.jpg" loading="lazy" class="absolute inset-0 h-full w-full object-cover">` (thumbnail: blue gradient, big "We Got It All" headline, console UI, "Start Verification" pill, Claude/WhatsApp/Chrome logos), dark overlay `bg-black/15` (`hover: bg-black/25`), white play button `h-16 w-16 lg:h-[72px] lg:w-[72px] rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.18)]` (`hover:scale-105`) with a `fill-gray-900` triangle `M8 5v14l11-7z` (24px, `ml-0.5`, 28px on lg).
  - On click: `<iframe src="https://www.youtube.com/embed/kxCRwBm9lBw?autoplay=1&rel=0&modestbranding=1" title="Verify Humans and AI. We Got It All With deepidv." allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen class="absolute inset-0 h-full w-full">`.
- YouTube video: **`kxCRwBm9lBw`** — "Verify Humans and AI. We Got It All With deepidv." (deepidv channel `https://www.youtube.com/@deepidv`, published 2026-06-24, 80 s). Watch URL `https://www.youtube.com/watch?v=kxCRwBm9lBw`. Nothing here needs a local asset. (The site also emits VideoObject JSON-LD for it; skip that in the deck.)

---

## 7. Section 5 — `CustomerJourney.tsx` (Appendix A.9) + `EyebrowBadge.tsx` (A.10)

- `section#customer-journey`: `scroll-mt-28 overflow-hidden bg-[#F8F8FA] px-4 sm:px-6 py-20 lg:py-28`; inner `max-w-[1200px] mx-auto`. Font Inter. Height 1025px at 1440.
- Header (`max-w-2xl`): `EyebrowBadge` → `The Journey`; `h2 mt-5 text-[32px] sm:text-[40px] md:text-[44px] font-bold leading-[1.1] tracking-tight` → **effective 38px / 49.4px / 600 / −0.95px**: `Catch every threat` (`text-gray-400`) / `Cover every touchpoint` (`text-gray-900`); `h5 mt-5 max-w-[520px] text-[17px] text-gray-500` → `deepidv protects your platform from sign-up to ongoing monitoring — one engine, no code, no gaps.`
- **EyebrowBadge:** `inline-flex items-center gap-1.5 pl-3.5 pr-4 py-1.5 rounded-full bg-gray-100/80 border border-gray-200/60 text-sm text-gray-500 font-medium` with `<img src="/images/eyebrow-icon.svg" class="w-4">` (blue `#1D7BF5` chevron/pennant, inline in Appendix C).
- Body `mt-12 lg:mt-16 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center`:
  - **Left — VisualStage:** `relative mx-auto aspect-square w-full max-w-[520px]`. Clipped layer `absolute inset-0 overflow-hidden rounded-[28px] border border-black/[0.05]` with `radial-gradient(120% 110% at 50% 0%, #FFFFFF 0%, #F1F2F5 100%)`; the active illustration cross-fades (`AnimatePresence mode="wait"`, 0.4 s). Illustrations are code-built (`IllustrationWrapper` = `p-6 sm:p-10` → `max-w-[320px] rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.35)]`): Sign-Up form skeleton with blue `#3B82F6` "Verify Identity" button; Verification 2-up (document icon card + avatar with green check "Verified 99.5%"); Screening list (Sanctions Clear, PEP Clear, Adverse Media Review in amber `#F59E0B`); Optional Checks toggles (Credit Report, Background Check, Address Verification on; Education Check off); Login fingerprint in a dashed spinning ring (8 s) + "Match confirmed"; Monitoring metrics (Active Users 1,284 · Flagged 12 · Alerts 3) + "AI Agent Active" with pinging green dot.
  - **Floating StatusCards** (overflow the stage): `absolute z-10 w-[58%] max-w-[290px] rounded-2xl border border-black/[0.06] bg-white/90 p-3.5 shadow-[0_22px_50px_-22px_rgba(15,23,42,0.45)] backdrop-blur-md`; positions `tr` = `top-[3%] right-[-2%] sm:right-[-4%]`, `bl` = `bottom-[6%] left-[-2%] sm:left-[-4%]`; enter with opacity 0→1, y 14→0, scale 0.95→1, 0.45 s easeOut, delays 0.12 / 0.20. Row: icon box `h-7 w-7 rounded-lg` tinted `${accent}1f` with the accent-coloured lucide icon 15/2.25, title `text-[13px] font-semibold text-neutral-800`, tag pill `rounded-full px-2 py-0.5 text-[10px] font-medium` in the same tint; optional rows `text-[12px]` label `text-neutral-400` / value `#374151` or green `#16A34A`.
  - **Right:** `grid sm:grid-cols-[auto_1fr] gap-8 sm:gap-10 items-center`. Step list `ul gap-2.5 lg:gap-3.5` of `<button>` `text-2xl lg:text-[30px] font-medium leading-tight tracking-tight transition-colors duration-500`, colour `#0B0F1A` when active else `#E2E5EA`. Description `min-h-[120px]`, `p max-w-[36ch] text-[15px] lg:text-base leading-relaxed text-gray-500`, cross-fades (opacity/y 10→0 in, y −8 out, 0.35 s).
- **Timing:** auto-advance every **3800 ms**, loops; clicking a step selects it and pauses auto-advance for **10 000 ms**.
- **Steps (verbatim):**

| # | Label | Accent | Description | Card TR (icon · title · tag · rows) | Card BL (icon · title · tag) |
|---|---|---|---|---|---|
| 1 | Sign-Up | `#2D8CFF` | Capture user identity data at the point of registration with configurable verification flows. Adaptive risk signals determine the right level of checks before a user ever enters your platform. | UserPlus · Account created · Onboarding · Email: Verified (green), Device: Trusted | Globe · Geo check passed · Risk routing |
| 2 | User Verification | `#06B6D4` | AI-native document verification and biometric matching across 211+ countries. Active liveness detection stops deepfakes, masks, and injection attacks in real time. | ScanFace · ID verified · Biometrics · Document: Passport, Match: 99.5% (green) | Fingerprint · Liveness passed · Active check |
| 3 | Screening | `#8B5CF6` | Automated AML, sanctions, PEP, and adverse media screening at the point of onboarding. Continuous re-screening ensures you catch changes as they happen. | Search · Screening results · AML · Sanctions: Clear (green), PEP: Clear (green) | FileText · Adverse media scan · Monitoring |
| 4 | Optional Checks | `#FB9A3C` | Layer in additional checks based on your risk appetite and regulatory requirements. From credit reports to background screening, deepidv handles it in one workflow. | CreditCard · Credit report · Optional · Score: 742, Status: Pulled (green) | FileText · Background check · Deep dive |
| 5 | Login | `#6366F1` | Biometric re-verification at login ensures the person returning is the same person who onboarded. Catch account takeover attempts before they cause damage. | Fingerprint · Re-authentication · Login · Biometric: Matched (green), Device: Recognized | ShieldCheck · Step-up cleared · Adaptive |
| 6 | Ongoing Monitoring | `#22C55E` | Agentic AI continuously monitors for changes in risk, identity, and compliance status. Automated alerts and case escalation keep your platform protected around the clock. | Activity · Risk monitor · Live · Risk score: 0.04 (green), Status: Low | Bell · No new alerts · 24/7 |

No binary assets besides `eyebrow-icon.svg`.

---

## 8. Computed truth table (measured on the live build at 1440×900, Chrome)

Use this to verify your build. Values are what the browser actually renders after the global heading rules.

| Element | Font | Size / line-height | Weight | Letter-spacing | Colour |
|---|---|---|---|---|---|
| Hero h1 line 1 span | Geist | 56 / 56 | 600 | −2.8px (−0.05em) | gradient `#0A1628 → rgba(10,22,45,.55)` |
| Hero serif accent word | Instrument Serif italic | 56 / 56 | 400 | 0 | `#0690F2` |
| Hero h1 line 2 span | Geist | 56 / 56 | 600 | −2.24px (−0.04em) | `#0A1628` |
| Hero "+" | Geist | 32 / 32 | 600 | inherits | `#93A1B5` |
| Hero subhead | Geist | 18 / 27.9 | 400 | 0 | `#5B6B82` |
| Get Started | Geist | 16 / 24 | 600 | −0.32px | white on `#030712`, r14, 154×54 |
| Docs | Geist | 15 / 22.5 | 600 | −0.3px | `#0A1628` on white, border `#E2E8F0`, r14, 123×53 |
| Browser URL pill | Geist | 11 / 16.5 | 500 | 0 | `#5B6B82` on white, r8 |
| Hero step h2 | Inter* | 38 / 49.4 | 600 | −0.95px | `#0A1628` |
| Hero step sub | Inter* | 15 / 24.4 | 400 | 0 | `#5B6B82` |
| Hero quote card | Inter* | 28px padding, r18, 374×210 | | | `#F5F7FA` |
| Hero pill | Inter* | 11 / 16.5 | 600 | 0 | `#0690F2` on white/85, 121×29 |
| Phone bezel frame | | 294×660, r44, 8px pad | | | white/35, 1px white/50 border |
| S2 eyebrow | Geist | 12 / 18 | 600 | 1.92px | `#6FB7F0` |
| S2 h2 | Geist | 38 / 49.4 | 600 | −1.14px | white |
| S2 `<em>anyone</em>` | Instrument Serif italic | 38 / 49.4 | 600 (synthesized) | −1.14px | `#6FB7F0` |
| S2 sub | Geist | 15 / 24.4 | 400 | 0 | white 55% |
| S2 card h3 (all) | Geist | 26 / 28.6 | 600 | −0.65px | white (agentic card: `#0A1628`) |
| S2 "The Journey" CTA | Geist | 13 / 19.5 | 600 | 0 | `#0A1628` on white, pill, 137×40 |
| S2 "Meet the agents" | Geist | 13 / 19.5 | 600 | 0 | white on `#0690F2`, pill, 155×36 |
| S2 stat value / label | Geist | 52 / 78 · 12 / 18 | 600 · 400 | 0 · 0.3px | white · white 45% |
| S3 eyebrow "OUR TECHNOLOGY" | Inter | 14 / 20 | 500 | 0.7px | `#171717` |
| S3 h2 | Inter | 38 / 49.4 | 600 | 0 | `#0B0F1A` |
| S3 card label | Inter | 15 / 22.5 | 500 | 0 | `#6a7282` 80% on `#f9fafb`, r18, 199×50 |
| S3 "+ 15 more services" | Inter | 14 / 20 | 600 | 0 | `#99a1af`, dashed `#d1d5dc` |
| S3 Claude pill | Inter | 14 / 20 | 500 | 0 | `#364153` on `#f9fafb`, 1px `#e5e7eb`, 218×34 |
| S3 video box | | 896×504, r18 | | | `#f3f4f6`, 1px `#e5e7eb` |
| S4 card | | 1376×979, r28, 56px pad | | | `#f6f7f9`, 1px `#e5e7eb` 70% |
| S4 h2 lines | Inter | 38 / 49.4 | 600 | −0.95px | `#99a1af` / `#101828` |
| S4 paragraph | Inter | 16 / 26 | 400 | 0 | `#6a7282`, 384px wide |
| S4 media box / play | | 1262×710, r22 · 72×72 white circle | | | `#101828` bg |
| S5 section | | 112px v-pad | | | `#f8f8fa` |
| S5 h2 lines | Inter | 38 / 49.4 | 600 | −0.95px | `#99a1af` / `#101828` |
| S5 h5 | Inter | 17 / 22.1 | 400 | 0 | `#6a7282` |
| S5 step active / inactive | Inter | 30 / 37.5 | 500 | −0.75px | `#0B0F1A` / `#E2E5EA` (mid-transition samples: `#262a34`, `#c7cad0`) |
| S5 description | Inter | 16 / 26 | 400 | 0 | `#6a7282`, 260px wide |
| S5 stage / status card | | 520×520 · 276×106, r18, 14px pad | | | white/90, 1px black/6 |

\* The hero's step copy, quote card and pill do **not** set `fontFamily`, so they inherit the body font (Inter) even though the headline is Geist. That is how the live site renders; keep it.

---

## 9. Verification checklist (do these before calling it done)

1. Open the page at exactly **1440×900** and compare against `reference-screenshots/hero-p0.00-NEW-TITLE.png` (intro) and `hero-p0.58.png` / `hero-p1.00.png` (board). Scroll slowly: the frame must morph **in place, centred** with no horizontal travel; the screenshot must be gone before the frame is narrower than it is tall.
2. Measure with DevTools: any `h2` in sections 2–5 → `38px` / `49.4px` / `600`. If you see 52px or 40px or 44px, the unlayered heading rules from §2.3 are missing.
3. "OUR TECHNOLOGY" must be near-black `#171717`, not blue.
4. Hero headline: Geist; the word "Verification" is Instrument Serif italic 400 in `#0690F2`; line-height is 1.0 (lines touch tightly). Sections 3–5 text is Inter.
5. Section 2's navy surface has a giant elliptical top-right corner and overlaps the hero by 48px (`-mt-12`) at lg.
6. Section 3 auto-plays the Claude video only while ≥40% in view; section 4 shows the YouTube thumbnail with a white play button and only loads the iframe on click.
7. Section 5 advances every 3.8 s; clicking a step pauses cycling for 10 s.
8. Resize below 1024px: the hero becomes the static stacked variant (`mobile-390-top5-fullpage.png`); section 3's pills turn into a marquee.
9. `prefers-reduced-motion: reduce` → static hero, no Lenis, no reveals.
10. Brand name lowercase everywhere: `deepidv`.

---

## 10. Placeholder summary

| Asset | Size | Placeholder (only if missing) |
|---|---|---|
| Console screenshot `hero-console-dashboard.webp` | 2400×1213 | `DesktopDashboard.tsx` code-built dashboard inside the browser frame |
| `fingerprint.svg`, `sparkle.svg`, `eyebrow-icon.svg`, `claude.svg` | tiny | Inline SVG from Appendix C |
| `verify-flow.webm` | 570×1280 · 63 s | `ScreenVerification.tsx` code-built phone screen, or any 0.445-ratio portrait recording |
| `deepfake-detection-workflow-step.webm` | 570×1280 · 36 s | `ScreenDeepfake.tsx` code-built phone screen |
| `agents.webp` | 1732×955 | Flat inline-SVG mascots as described in §4.6, or omit |
| `every-identity-globe.webp` | 1024×1024 | Omit image, keep gradient (+ optional white name pills at 40%) |
| `MCPServer_MotionSaas.mp4` + poster | 1920×1080 · 38 s | YouTube `t50mizB-IFU` embed, or the poster / `https://i.ytimg.com/vi/t50mizB-IFU/maxresdefault.jpg` as a still |
| Section 4 video | remote | none needed — YouTube `kxCRwBm9lBw` + `https://i.ytimg.com/vi/kxCRwBm9lBw/maxresdefault.jpg` |
| Iconify service icons | remote | pre-fetched SVGs in `public/images/service-icons/`, or lucide fallbacks `ScanFace, ShieldAlert, Landmark, MapPinCheck, ShieldCheck, Bot` |

---

# Appendices — verbatim source

Everything below is copied byte-for-byte from the website repo. Paths are relative to the app's `src/` unless noted. Do not retype by hand if you have the kit folder; copy the files.

## Appendix A — Components (React 19 / Tailwind v4 / framer-motion 12 / lucide-react)

### A.1 HeroScrollMorph.tsx — SECTION 1 (hero). Apply the §3.5 headline change inside `HeroCopy()`.

`src/components/home/hero-morph/HeroScrollMorph.tsx`

````tsx
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
````

### A.2 DesktopDashboard.tsx — PLACEHOLDER for the console screenshot (not imported by the site today)

`src/components/home/hero-morph/DesktopDashboard.tsx`

````tsx
import { ScanFace, BadgeCheck, Activity, Check } from "lucide-react";

type CheckRow = {
  label: string;
  status: string;
};

const CHECK_ROWS: CheckRow[] = [
  { label: "Document authenticity", status: "Passed" },
  { label: "Liveness", status: "Passed" },
  { label: "Face match", status: "99.4%" },
  { label: "AML & PEP screening", status: "No match" },
  { label: "Deepfake defense", status: "Passed" },
];

type Stat = {
  value: string;
  label: string;
};

const STATS: Stat[] = [
  { value: "211+", label: "countries" },
  { value: "162", label: "frameworks" },
  { value: "sub-150ms", label: "decisions" },
];

export default function DesktopDashboard() {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden"
      style={{
        backgroundColor: "#F7F9FC",
        fontFamily: "var(--font-geist), system-ui, sans-serif",
        color: "#0A1628",
      }}
    >
      {/* Top app bar */}
      <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-black/[0.06] px-5">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[#0F8DEC]" />
          <span className="text-[15px] font-semibold tracking-tight">
            deepidv
          </span>
          <span className="text-[13px] font-medium" style={{ color: "#93A1B5" }}>
            / Verification Console
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium"
            style={{ backgroundColor: "#E7F7EE", color: "#16A34A" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
            Live
          </span>
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold tracking-tight"
            style={{ backgroundColor: "#EAF4FE", color: "#0F8DEC" }}
          >
            MA
          </span>
        </div>
      </header>

      {/* Body */}
      <div className="flex min-h-0 flex-1 flex-col gap-4 px-5 py-4">
        <div className="grid min-h-0 flex-1 grid-cols-[40%_1fr] gap-4">
          {/* LEFT card: Active session */}
          <section className="flex flex-col rounded-2xl bg-white p-5 ring-1 ring-black/[0.06] shadow-[0_10px_30px_-12px_rgba(10,22,45,0.12)]">
            <div
              className="text-[12px] font-medium uppercase tracking-wide"
              style={{ color: "#93A1B5" }}
            >
              Active session
            </div>

            {/* Applicant block */}
            <div className="mt-4 flex items-center gap-3">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: "#EAF4FE" }}
              >
                <ScanFace size={20} strokeWidth={2} color="#0F8DEC" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-[15px] font-semibold">
                  Maria Andersson
                </div>
                <div className="text-[13px]" style={{ color: "#5B6B82" }}>
                  Passport · Sweden
                </div>
              </div>
            </div>

            {/* Verified badge row */}
            <div
              className="mt-4 flex items-center gap-2 rounded-xl px-3.5 py-3"
              style={{ backgroundColor: "#E7F7EE" }}
            >
              <BadgeCheck size={18} strokeWidth={2} color="#16A34A" />
              <span
                className="text-[14px] font-semibold"
                style={{ color: "#16A34A" }}
              >
                Verified
              </span>
            </div>

            {/* Confidence meter */}
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium" style={{ color: "#5B6B82" }}>
                  Match confidence
                </span>
                <span className="text-[13px] font-semibold tabular-nums">99.4%</span>
              </div>
              <div
                className="mt-2 h-2 w-full overflow-hidden rounded-full"
                style={{ backgroundColor: "#EEF2F7" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "99.4%",
                    background:
                      "linear-gradient(90deg, #0F8DEC 0%, #007AFF 100%)",
                  }}
                />
              </div>
            </div>

            {/* Decision chip */}
            <div className="mt-auto pt-5">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium"
                style={{ backgroundColor: "#EAF4FE", color: "#0F8DEC" }}
              >
                <Activity size={14} strokeWidth={2} />
                142ms · decision
              </span>
            </div>
          </section>

          {/* RIGHT card: Checks */}
          <section className="flex flex-col rounded-2xl bg-white p-5 ring-1 ring-black/[0.06] shadow-[0_10px_30px_-12px_rgba(10,22,45,0.12)]">
            <div
              className="text-[12px] font-medium uppercase tracking-wide"
              style={{ color: "#93A1B5" }}
            >
              Checks
            </div>

            <ul className="mt-3 flex min-h-0 flex-1 flex-col divide-y divide-black/[0.06]">
              {CHECK_ROWS.map((row) => (
                <li
                  key={row.label}
                  className="flex flex-1 items-center justify-between"
                >
                  <span className="text-[14px] font-medium">{row.label}</span>
                  <span className="flex items-center gap-2">
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full"
                      style={{ backgroundColor: "#E7F7EE" }}
                    >
                      <Check size={13} strokeWidth={2.5} color="#16A34A" />
                    </span>
                    <span
                      className="text-[13px] font-semibold"
                      style={{ color: "#16A34A" }}
                    >
                      {row.status}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* BOTTOM stat strip */}
        <div className="grid shrink-0 grid-cols-3 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-start rounded-2xl bg-white px-5 py-4 ring-1 ring-black/[0.06] shadow-[0_10px_30px_-12px_rgba(10,22,45,0.12)]"
            >
              <span className="text-[22px] font-semibold leading-none tracking-tight tabular-nums">
                {stat.value}
              </span>
              <span className="mt-1.5 text-[13px]" style={{ color: "#93A1B5" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
````

### A.3 ScreenVerification.tsx — PLACEHOLDER for verify-flow.webm (step 1 phone screen)

`src/components/home/hero-morph/ScreenVerification.tsx`

````tsx
import { Activity, BadgeCheck, Check, ScanFace } from "lucide-react";

export default function ScreenVerification() {
  const checklist: { label: string; status: string }[] = [
    { label: "Document", status: "Passed" },
    { label: "Liveness", status: "Passed" },
    { label: "Face match", status: "99.4%" },
  ];

  return (
    <div
      className="flex h-full w-full min-h-[540px] flex-col px-4 pt-4 pb-6"
      style={{
        backgroundColor: "#F7F9FC",
        fontFamily: "var(--font-geist), system-ui, sans-serif",
      }}
    >
      {/* Header row */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#0F8DEC]" />
          <span className="text-sm font-semibold tracking-tight text-[#0A1628]">
            deepidv
          </span>
        </div>
        <span className="text-xs font-medium text-[#93A1B5]">Verification</span>
      </div>

      {/* Hero success card */}
      <div className="flex flex-col items-center rounded-2xl bg-white p-6 text-center ring-1 ring-black/[0.06] shadow-[0_10px_30px_-12px_rgba(10,22,45,0.12)]">
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full"
          style={{
            border: "3px solid #22C55E",
            backgroundColor: "#E7F7EE",
            boxShadow: "0 0 0 8px #E7F7EE",
          }}
        >
          <BadgeCheck size={40} strokeWidth={2} color="#16A34A" />
        </div>
        <p className="mt-5 text-2xl font-semibold tracking-tight text-[#0A1628]">
          Verified
        </p>
        <p className="mt-1 text-sm text-[#5B6B82]">Identity confirmed</p>
      </div>

      {/* Decision time pill (caption for the hero) */}
      <div className="mt-3 flex justify-center">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-[#007AFF]"
          style={{ backgroundColor: "#EAF4FE" }}
        >
          <Activity size={14} strokeWidth={2} />
          Decision in 142ms
        </span>
      </div>

      {/* Applicant mini-card */}
      <div className="mt-7 flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/[0.06] shadow-[0_10px_30px_-12px_rgba(10,22,45,0.12)]">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#EAF4FE" }}
        >
          <ScanFace size={18} strokeWidth={2} color="#0F8DEC" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-sm font-semibold text-[#0A1628]">
              Maria Andersson
            </p>
            <BadgeCheck
              size={14}
              strokeWidth={2}
              color="#16A34A"
              className="shrink-0"
            />
          </div>
          <p className="truncate text-xs text-[#5B6B82]">Passport · Sweden</p>
        </div>
      </div>

      {/* Checklist card */}
      <div className="mt-4 rounded-2xl bg-white px-4 py-1 ring-1 ring-black/[0.06] shadow-[0_10px_30px_-12px_rgba(10,22,45,0.12)]">
        {checklist.map((item, i) => (
          <div
            key={item.label}
            className={`flex items-center justify-between py-3.5 ${
              i !== checklist.length - 1 ? "border-b border-black/[0.05]" : ""
            }`}
          >
            <span className="text-sm font-medium text-[#0A1628]">
              {item.label}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#16A34A]">
                {item.status}
              </span>
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full"
                style={{ backgroundColor: "#E7F7EE" }}
              >
                <Check size={14} strokeWidth={2.5} color="#16A34A" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
````

### A.4 ScreenDeepfake.tsx — PLACEHOLDER for deepfake-detection-workflow-step.webm (step 2 phone screen)

`src/components/home/hero-morph/ScreenDeepfake.tsx`

````tsx
import { ShieldCheck, Check, BadgeCheck } from "lucide-react";

const LAYERS = [
  "Pixel forensics",
  "Facial geometry",
  "Temporal consistency",
  "Liveness signal",
  "Source & origin",
] as const;

const CARD =
  "rounded-2xl bg-white ring-1 ring-black/[0.06] shadow-[0_10px_30px_-12px_rgba(10,22,45,0.12)]";

export default function ScreenDeepfake() {
  return (
    <div
      className="w-full h-full min-h-[540px] flex flex-col gap-4 px-4 pt-4 pb-6"
      style={{
        backgroundColor: "#F7F9FC",
        fontFamily: "var(--font-geist), system-ui, sans-serif",
      }}
    >
      {/* Tiny header */}
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#0F8DEC]" />
        <span className="text-[13px] font-semibold text-[#0A1628]">
          deepidv
        </span>
        <span className="ml-auto text-[11px] font-medium text-[#93A1B5]">
          Deepfake defense
        </span>
      </div>

      {/* TOP card */}
      <div className={`${CARD} p-5 flex flex-col items-center text-center`}>
        <div
          className="h-16 w-16 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: "#EAF4FE" }}
        >
          <ShieldCheck size={24} strokeWidth={2} color="#0F8DEC" />
        </div>
        <p className="mt-4 text-[15px] font-semibold leading-snug text-[#0A1628] text-balance">
          Synthetic media check passed
        </p>
        <p className="mt-1 text-[13px] text-[#5B6B82]">
          No manipulation detected
        </p>
      </div>

      {/* FIVE-LAYER card */}
      <div className={`${CARD} p-5`}>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#93A1B5]">
          Forensic layers
        </p>
        <div className="mt-4 flex flex-col gap-3.5">
          {LAYERS.map((layer) => (
            <div key={layer}>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#0A1628]">
                  {layer}
                </span>
                <span
                  className="h-4 w-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#E7F7EE" }}
                >
                  <Check size={11} strokeWidth={2} color="#16A34A" />
                </span>
              </div>
              <div
                className="mt-2 h-1 w-full rounded-full overflow-hidden"
                style={{ backgroundColor: "#E7F7EE" }}
              >
                <div
                  className="h-full w-full rounded-full"
                  style={{ backgroundColor: "#22C55E" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONFIDENCE card */}
      <div className={`${CARD} p-5 flex flex-col items-center text-center`}>
        <p className="text-3xl font-semibold text-[#0F8DEC]">99.2%</p>
        <p className="mt-1 flex items-center gap-1.5 text-[13px] text-[#5B6B82]">
          <BadgeCheck size={16} strokeWidth={2} color="#16A34A" />
          authenticity confidence
        </p>
      </div>
    </div>
  );
}
````

### A.5 HeroDemoButton.tsx — site version (Cal.com + analytics). Use the simplified §3.6 version in the deck.

`src/components/home/HeroDemoButton.tsx`

````tsx
"use client";

import { useRef } from "react";
import { getCalApi } from "@calcom/embed-react";
import { sendDemoButtonConversion } from "@/utils/analytics";

export default function HeroDemoButton() {
  const calInitialized = useRef(false);

  const handleClick = async () => {
    sendDemoButtonConversion();
    if (calInitialized.current) return;
    calInitialized.current = true;
    const cal = await getCalApi({ namespace: "deepidv" });
    cal("ui", {
      cssVarsPerTheme: {
        light: { "cal-brand": "#018cec" },
        dark: { "cal-brand": "#018cec" },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  };

  return (
    <button
      data-cal-namespace="deepidv"
      data-cal-link="team/deepidv/demo"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      data-tap-press
      onClick={handleClick}
      style={{
        fontFamily: "var(--font-geist), system-ui, sans-serif",
        letterSpacing: "-0.02em",
      }}
      className="relative px-[34px] py-[15px] bg-[#030712] text-white font-semibold text-[16px] rounded-[14px] transition-all duration-200 hover:scale-[1.03] cursor-pointer max-md:px-5 max-md:py-2.5 max-md:text-[14px] max-md:rounded-[12px]"
    >
      Get Started
    </button>
  );
}
````

### A.6 OnePlatformSection.tsx — SECTION 2

`src/components/home/OnePlatformSection.tsx`

````tsx
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
````

### A.7 ServiceStrip.tsx — SECTION 3

`src/components/home/ServiceStrip.tsx`

````tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

type ServiceItem = { icon: string; label: string };

const ITEMS: ServiceItem[] = [
  { icon: "mynaui:face-id", label: "ID Verification" },
  { icon: "hugeicons:face-id", label: "Deepfake Detection" },
  { icon: "mdi:bank-transfer", label: "Open Banking" },
  { icon: "mdi:map-marker-check", label: "Address Verification" },
  { icon: "mdi:shield-search", label: "Background Checks" },
  { icon: "mdi:robot-outline", label: "Risk & Compliance Agents" },
];

export default function ServiceStrip() {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Play the Claude video when it scrolls into view; pause when it leaves.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 bg-white overflow-hidden lg:mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-sm text-primary font-medium uppercase tracking-wider">
            Our Technology
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl">Proprietary Solutions Built by Us</h2>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {isMobile ? (
            <div className="overflow-hidden py-4">
              <div className="flex w-max gap-6 items-center animate-marquee">
                {[...ITEMS, ...ITEMS].map((item, i) => (
                  <ServiceCard key={`${item.label}-${i}`} item={item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-6 max-w-5xl mx-auto">
              {ITEMS.map((item, i) => (
                <ServiceCard key={i} item={item} />
              ))}
              <motion.div className="group flex items-center gap-2 px-6 py-3 rounded-2xl border border-dashed border-gray-300 text-gray-400 transition-all">
                <span className="text-sm font-semibold">+ 15 more services</span>
              </motion.div>
            </div>
          )}
        </div>

        {/* Now available in Claude — self-hosted MCP promo video, placed
            below the solutions strip. Branded image used as the poster. */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700">
              <img
                src="/images/logos/brand/claude.svg"
                alt="Claude"
                className="w-4 h-4"
              />
              Now available in Claude
            </span>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 aspect-video shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <video
              ref={videoRef}
              src="/videos/MCPServer_MotionSaas.mp4"
              poster="/videos/deepidv%20x%20Claude%202.png"
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <motion.div className="flex-shrink-0 flex items-center gap-2 px-6 py-1 rounded-2xl bg-gray-50 border border-gray-100">
      <div className="p-2 rounded-xl">
        <Icon icon={item.icon} className="w-6 h-6 text-gray-500/70" />
      </div>
      <span className="text-[15px] font-medium text-gray-500/80 whitespace-nowrap">
        {item.label}
      </span>
    </motion.div>
  );
}
````

### A.8 LargeVideoSection.tsx — SECTION 4

`src/components/home/LargeVideoSection.tsx`

````tsx
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
````

### A.9 CustomerJourney.tsx — SECTION 5

`src/components/home/CustomerJourney.tsx`

````tsx
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
````

### A.10 EyebrowBadge.tsx — used by section 5

`src/components/ui/EyebrowBadge.tsx`

````tsx
import type { ReactNode } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

type EyebrowBadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function EyebrowBadge({ children, className }: EyebrowBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 pl-3.5 pr-4 py-1.5 rounded-full bg-gray-100/80 border border-gray-200/60 text-sm text-gray-500 font-medium",
        className,
      )}
    >
      {/* <Icon
        icon="solar:alt-arrow-right-bold"
        className="w-4 h-4 text-blue-500 flex-shrink-0"
      /> */}
      <img src="/images/eyebrow-icon.svg" className="w-4" alt="" />
      {children}
    </span>
  );
}
````

### A.11 SmoothScroll.tsx — Lenis smooth scroll (optional; the hero subscribes to `window.lenis` if present)

`src/components/layout/SmoothScroll.tsx`

````tsx
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
````

### A.12 utils.ts — `cn()` helper imported by EyebrowBadge

`src/lib/utils.ts`

````ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
````

## Appendix B — Full site `globals.css` (only the §2.3 subset is required; included for completeness)

### B.1 globals.css

`src/app/globals.css`

````css
@import "tailwindcss";
/* @import "tw-animate-css"; */
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

/* Inter — self-hosted variable font (covers weights 400-700) */
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter/inter-latin.woff2") format("woff2");
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter/inter-latin-ext.woff2") format("woff2");
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* SF Pro — self-hosted, Latin subset */
@font-face {
  font-family: "SF Pro";
  src: url("/fonts/sf-pro-display/SFPRODISPLAYREGULAR.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: "SF Pro";
  src: url("/fonts/sf-pro-display/SFPRODISPLAYMEDIUM.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: "SF Pro";
  src: url("/fonts/sf-pro-display/SFPRODISPLAYSEMIBOLD.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: "SF Pro";
  src: url("/fonts/sf-pro-display/SFPRODISPLAYBOLD.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@theme {
  --color-background: #F7F7F8;
  --color-background-light: #ffffff;

  --color-primary: #0080DC;
  --color-primary-light: #3B82F6;
  --color-primary-lighter: #F2F6FE;
  --color-primary-dark: #005DA0;

  --color-coral: #FF6B6B;
  --color-coral-light: #FF6B6B;
  --color-coral-dark: #FF4757;

  --color-citrus: #FF9500;
  --color-citrus-light: #FFB347;
  --color-citrus-dark: #E8890C;

  --color-neon: #8B5CF6;
  --color-neon-light: #A78BFA;
  --color-neon-dark: #7C3AED;

  --color-lime: #84CC16;
  --color-lime-light: #A3E635;
  --color-lime-dark: #65A30D;

  /* Features-pages light theme (below-hero sections) */
  --color-surface-light: #F9FAFB;
  --color-surface-light-2: #F3F4F6;
  --color-text-dark: #0F172A;
  --color-text-dark-muted: #475569;
  --color-text-dark-subtle: #94A3B8;
  --color-brand-blue: #2D8CFF;
  --color-brand-blue-dark: #1E6EE0;
  --color-brand-blue-light: #4FA3FF;
  --color-icon-purple: #A78BFA;
  --color-icon-teal: #00D4AA;
  --color-border-light: #E5E7EB;
  --color-divider-light: #E5E7EB;
  --color-eyebrow-bg: #EFF6FF;
  --color-eyebrow-text: #1E3A5F;

  /* Agent brand palettes — Luna (pink), Arc (green), Arbiter (orange) */
  --color-luna-100: #FFE4F0;
  --color-luna-300: #FF8AC1;
  --color-luna-500: #EC4899;
  --color-luna-700: #BE1A6A;

  --color-arc-100: #DCFCE7;
  --color-arc-300: #6EE7A7;
  --color-arc-500: #22C55E;
  --color-arc-700: #15803D;

  --color-arbiter-100: #FFEDD5;
  --color-arbiter-300: #FDBA74;
  --color-arbiter-500: #F97316;
  --color-arbiter-700: #C2410C;

  --shadow-card-light: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03);
  --shadow-card-elevated: 0 4px 12px 0 rgba(45, 140, 255, 0.08);

  /* Apple design tokens (per DESIGN.md generated by getdesign).
     Photography-first, single Action Blue accent, no decorative
     shadows on chrome — only one drop-shadow allowed under product
     imagery. Used by the page-section components rendering the
     All-In-One Products pages and elsewhere. */
  --color-action-blue: #0066cc;
  --color-action-blue-focus: #0071e3;
  --color-action-blue-on-dark: #2997ff;
  --color-ink: #0B0F1A;
  --color-ink-muted-80: #1E2535;
  --color-ink-muted-48: #7a7a7a;
  --color-canvas: #ffffff;
  --color-canvas-parchment: #f5f5f7;
  --color-surface-pearl: #fafafc;
  --color-tile-dark-1: #272729;
  --color-tile-dark-2: #2a2a2c;
  --color-tile-dark-3: #252527;
  --color-hairline: #e0e0e0;
  --color-divider-soft: #f0f0f0;
  --color-body-muted-on-dark: #cccccc;
  --shadow-product: rgba(0, 0, 0, 0.22) 3px 5px 30px 0;

  --radius-card: 16px;
  --radius-button: 10px;

  --font-sans: "SF Pro", "Inter", system-ui, sans-serif;

  --animate-marquee: marquee var(--duration, 40s) linear infinite;
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(calc(-100% - var(--gap, 1rem))); }
  }

  --animate-marquee-vertical: marquee-vertical var(--duration, 40s) linear infinite;
  @keyframes marquee-vertical {
    0%   { transform: translateY(0); }
    100% { transform: translateY(calc(-100% - var(--gap, 1rem))); }
  }

  --animate-grid: grid 18s linear infinite;
  @keyframes grid {
    0%   { transform: translateY(-50%); }
    100% { transform: translateY(0); }
  }

  --animate-border-beam: border-beam calc(var(--duration) * 1s) infinite linear;
  @keyframes border-beam {
    100% { offset-distance: 100%; }
  }

  @keyframes orbit {
    0%   { transform: rotate(calc(var(--angle, 0deg))) translateY(calc(var(--radius) * -1)) rotate(calc(var(--angle, 0deg) * -1)); }
    100% { transform: rotate(calc(var(--angle, 0deg) + 360deg)) translateY(calc(var(--radius) * -1)) rotate(calc((var(--angle, 0deg) + 360deg) * -1)); }
  }

  @keyframes hero-rise {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }


  @keyframes aurora {
    0%   { background-position: 0% 50%;   transform: rotate(-5deg) scale(0.9); }
    25%  { background-position: 50% 100%; transform: rotate(5deg)  scale(1.1); }
    50%  { background-position: 100% 50%; transform: rotate(-3deg) scale(0.95); }
    75%  { background-position: 50% 0%;   transform: rotate(3deg)  scale(1.05); }
    100% { background-position: 0% 50%;   transform: rotate(-5deg) scale(0.9); }
  }
}

/* Aurora-blue fill (same palette as AuroraText) for surfaces — a gently
   panning gradient so the blue has depth instead of reading as a flat block.
   Position-only animation (no rotate/scale) so it works on a sized panel. */
@keyframes aurora-pan {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.aurora-blue-panel {
  background-image: linear-gradient(150deg, #16336e 0%, #226fa6 30%, #0a6cc0 54%, #1583d7 76%, #16336e 100%);
  background-size: 165% 165%;
  animation: aurora-pan 10s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .aurora-blue-panel {
    animation: none;
    background-position: 50% 50%;
  }
}

@utility container {
  @apply px-4 mx-auto max-w-[98rem] sm:px-6 lg:px-8;
}

@utility btn {
  @apply px-6 py-3 rounded-[10px] font-medium transition-all duration-200 flex items-center justify-center;
}

@utility btn-primary {
  @apply btn bg-gradient-to-r from-[#0690F2] to-[#21a2ff] text-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_0_20px_rgba(37,99,235,0.3)];
}

@utility btn-outline {
  @apply btn border border-gray-200 hover:bg-gray-50 text-gray-700 hover:border-gray-300;
}

@utility btn-ghost {
  @apply btn text-gray-600 hover:text-gray-800 hover:bg-gray-50;
}

@utility text-gradient-blue {
  background: linear-gradient(90deg, #0690F2 0%, #014b80 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

@utility scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

body {
  background: var(--color-background-light);
  color: #0B0F1A;
  font-family: var(--font-sans);
}

/* --- Lenis smooth scroll (mounted by <SmoothScroll />) ---
 * Required stylesheet from the Lenis docs. These rules only take effect
 * while Lenis is active (it toggles the `lenis*` classes on <html>), so
 * pages without <SmoothScroll /> are completely unaffected. */
html.lenis,
html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
/* Opt a scrollable child out of smoothing with `data-lenis-prevent`. */
.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
.lenis.lenis-stopped {
  overflow: clip;
}
.lenis.lenis-smooth iframe {
  pointer-events: none;
}

/* --- Mobile optimization pass — scoped to mobile-only --- */
@media (max-width: 767px) {
  /* iOS Safari address-bar correctness. Tailwind's `h-screen` compiles to
   * `height: 100vh`; swap to dynamic viewport units on mobile so layout
   * doesn't jump as the URL bar appears/disappears. Desktop is unaffected. */
  .min-h-screen { min-height: 100dvh; }
  .h-screen { height: 100dvh; }
  /* Inline `style={{ minHeight: "100vh" }}` wrappers tagged with
   * data-mobile-dvh="true" get the same swap on mobile. */
  [data-mobile-dvh="true"] { min-height: 100dvh !important; }

  /* WCAG 2.5.5 — 44x44 minimum tap target. Opt-in via data-tap. */
  [data-tap] { min-width: 44px; min-height: 44px; }

  /* Tactile press feedback. Opt-in via data-tap-press. */
  [data-tap-press] { transition: transform 100ms ease, opacity 100ms ease; }
  [data-tap-press]:active { transform: scale(0.98); opacity: 0.9; }
}

/* Safe-area-aware padding utilities (iOS notch / Dynamic Island). */
.pt-safe { padding-top: env(safe-area-inset-top); }
.pb-safe { padding-bottom: env(safe-area-inset-bottom); }
.pl-safe { padding-left: env(safe-area-inset-left); }
.pr-safe { padding-right: env(safe-area-inset-right); }

/* Restore v3-style default border color (v4 uses currentColor).
   Must sit in @layer base so explicit utilities like border-white/10 override. */
@layer base {
  *,
  ::before,
  ::after {
    border-color: #e5e5e5;
  }
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans;
  }
}

:where(h1) { font-size: 37px; line-height: 1.1; font-weight: 600; }
@media (min-width: 768px) { :where(h1) { font-size: 42px; line-height: 1; } }
@media (min-width: 1024px) { :where(h1) { font-size: 48px; } }

:where(h2) { font-size: 25px; line-height: 1.3; font-weight: 600; }
@media (min-width: 768px) { :where(h2) { font-size: 33px; } }
@media (min-width: 1024px) { :where(h2) { font-size: 38px; } }

:where(h3) { font-size: 22px; line-height: 1.1; font-weight: 600; }
@media (min-width: 768px) { :where(h3) { font-size: 24px; } }
@media (min-width: 1024px) { :where(h3) { font-size: 26px; } }

:where(h4) { font-size: 18px; line-height: 1.3; font-weight: 500; }
@media (min-width: 768px) { :where(h4) { font-size: 19px; } }
@media (min-width: 1024px) { :where(h4) { font-size: 20px; } }

:where(h5) { font-size: 16px; line-height: 1.3; font-weight: 400; }
@media (min-width: 768px), (min-width: 1024px) { :where(h5) { font-size: 17px; } }

/* Minimal prose-like spacing for legal/policy content.
   @tailwindcss/typography isn't installed; this replicates the essentials. */
.prose {
  color: #404040;
  line-height: 1.7;
}
.prose > * + * { margin-top: 1.25em; }
.prose h1, .prose h2, .prose h3, .prose h4 {
  color: #0B0F1A;
  font-weight: 700;
  line-height: 1.3;
}
.prose h1 { font-size: 2em; margin-top: 2em; margin-bottom: 0.6em; }
.prose h2 { font-size: 1.5em; margin-top: 2em; margin-bottom: 0.6em; }
.prose h3 { font-size: 1.25em; margin-top: 1.75em; margin-bottom: 0.5em; }
.prose h4 { font-size: 1.05em; margin-top: 1.5em; margin-bottom: 0.4em; }
.prose p { margin-top: 1em; margin-bottom: 1em; }
.prose ul, .prose ol { margin-top: 1em; margin-bottom: 1em; padding-left: 1.5em; }
.prose ul { list-style: disc; }
.prose ol { list-style: decimal; }
.prose li { margin-top: 0.4em; margin-bottom: 0.4em; }
.prose li > p { margin-top: 0.4em; margin-bottom: 0.4em; }
.prose a { color: var(--color-primary, #0690F2); }
.prose a:hover { text-decoration: underline; }
.prose strong { color: #0B0F1A; font-weight: 600; }
.prose blockquote {
  border-left: 3px solid #e5e5e5;
  padding-left: 1em;
  color: #525252;
  font-style: italic;
  margin: 1.5em 0;
}
.prose hr { border-color: #e5e5e5; margin: 2em 0; }
.prose :where(h2, h3, h4):first-child { margin-top: 0; }

/* Prose enhancements for policy content */
.prose .lead {
  font-size: 1.125em;
  line-height: 1.7;
  color: #525252;
  margin-top: 0;
  margin-bottom: 1.5em;
}
.prose h5 { font-size: 0.95em; font-weight: 600; color: #0B0F1A; margin-top: 1.25em; margin-bottom: 0.4em; }
.prose h6 { font-size: 0.85em; font-weight: 600; color: #0B0F1A; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 1.25em; margin-bottom: 0.4em; }
.prose ul ul, .prose ol ol, .prose ul ol, .prose ol ul {
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}
.prose table {
  width: 100%;
  margin: 1.5em 0;
  border-collapse: collapse;
  font-size: 0.95em;
}
.prose th, .prose td {
  border: 1px solid #e5e5e5;
  padding: 0.5em 0.75em;
  text-align: left;
  vertical-align: top;
}
.prose th { background: #fafafa; font-weight: 600; color: #0B0F1A; }
.prose code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.9em;
  background: #f5f5f5;
  padding: 0.1em 0.35em;
  border-radius: 3px;
}
.prose button {
  color: var(--color-primary, #0690F2);
  font-weight: 500;
}
.prose button:hover { text-decoration: underline; }

@theme inline {
  --font-heading: var(--font-sans);
  --font-sans: var(--font-sans);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
  --animate-gradient: gradient 8s linear infinite;
  @keyframes gradient {
  to {
    background-position: var(--bg-size, 300%) 0;
    }
  }
  --animate-shine: shine var(--duration) infinite linear
;
  @keyframes shine {
  0% {
    background-position: 0% 0%;
    }
  50% {
    background-position: 100% 100%;
    }
  to {
    background-position: 0% 0%;
    }
  }
  --animate-orbit: orbit calc(var(--duration)*1s) linear infinite;
  @keyframes orbit {
  0% {
    transform: rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg));
    }
  100% {
    transform: rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg));
    }
  }}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

/* ------------------------------------------------------------------ */
/*  Animated gradient CTA (c5) — blue/black palette. Five radial blobs */
/*  drift across wide paths and pulse in size via @property-driven     */
/*  custom-property interpolation. Used by CtaFaqSection (the standard */
/*  closing CTA+FAQ on Solutions and Industries pages).                */
/* ------------------------------------------------------------------ */
@property --c5-x1 { syntax: '<percentage>'; inherits: false; initial-value: 10%; }
@property --c5-y1 { syntax: '<percentage>'; inherits: false; initial-value: 10%; }
@property --c5-x2 { syntax: '<percentage>'; inherits: false; initial-value: 90%; }
@property --c5-y2 { syntax: '<percentage>'; inherits: false; initial-value: 10%; }
@property --c5-x3 { syntax: '<percentage>'; inherits: false; initial-value: 10%; }
@property --c5-y3 { syntax: '<percentage>'; inherits: false; initial-value: 90%; }
@property --c5-x4 { syntax: '<percentage>'; inherits: false; initial-value: 90%; }
@property --c5-y4 { syntax: '<percentage>'; inherits: false; initial-value: 90%; }
@property --c5-x5 { syntax: '<percentage>'; inherits: false; initial-value: 50%; }
@property --c5-y5 { syntax: '<percentage>'; inherits: false; initial-value: 50%; }
@property --c5-s1 { syntax: '<percentage>'; inherits: false; initial-value: 55%; }
@property --c5-s2 { syntax: '<percentage>'; inherits: false; initial-value: 55%; }
@property --c5-s3 { syntax: '<percentage>'; inherits: false; initial-value: 55%; }
@property --c5-s4 { syntax: '<percentage>'; inherits: false; initial-value: 55%; }
@property --c5-s5 { syntax: '<percentage>'; inherits: false; initial-value: 65%; }

.c5-animated-gradient {
  background-color: #126de4;
  background-image:
    radial-gradient(circle at var(--c5-x1) var(--c5-y1), #9ad0ff 0px, transparent var(--c5-s1)),
    radial-gradient(circle at var(--c5-x2) var(--c5-y2), #189fff 0px, transparent var(--c5-s2)),
    radial-gradient(circle at var(--c5-x3) var(--c5-y3), #0a0a0a 0px, transparent var(--c5-s3)),
    radial-gradient(circle at var(--c5-x4) var(--c5-y4), #189fff 0px, transparent var(--c5-s4)),
    radial-gradient(circle at var(--c5-x5) var(--c5-y5), #5fb2ff 0px, transparent var(--c5-s5));
  animation:
    c5-blob1 5s ease-in-out infinite,
    c5-blob2 6s ease-in-out infinite,
    c5-blob3 5.5s ease-in-out infinite,
    c5-blob4 6.5s ease-in-out infinite,
    c5-blob5 4s ease-in-out infinite,
    c5-size1 3.5s ease-in-out infinite,
    c5-size2 4.2s ease-in-out infinite,
    c5-size3 3.8s ease-in-out infinite,
    c5-size4 4.6s ease-in-out infinite,
    c5-size5 3s ease-in-out infinite;
}

@keyframes c5-blob1 {
  0%,100% { --c5-x1: 5%;  --c5-y1: 5%;  }
  25%     { --c5-x1: 45%; --c5-y1: 20%; }
  50%     { --c5-x1: 30%; --c5-y1: 55%; }
  75%     { --c5-x1: 0%;  --c5-y1: 30%; }
}
@keyframes c5-blob2 {
  0%,100% { --c5-x2: 95%; --c5-y2: 5%;  }
  33%     { --c5-x2: 55%; --c5-y2: 35%; }
  66%     { --c5-x2: 80%; --c5-y2: 65%; }
}
@keyframes c5-blob3 {
  0%,100% { --c5-x3: 5%;  --c5-y3: 95%; }
  40%     { --c5-x3: 45%; --c5-y3: 65%; }
  70%     { --c5-x3: 25%; --c5-y3: 100%; }
}
@keyframes c5-blob4 {
  0%,100% { --c5-x4: 95%; --c5-y4: 95%; }
  30%     { --c5-x4: 60%; --c5-y4: 70%; }
  60%     { --c5-x4: 100%; --c5-y4: 50%; }
}
@keyframes c5-blob5 {
  0%,100% { --c5-x5: 50%; --c5-y5: 50%; }
  25%     { --c5-x5: 70%; --c5-y5: 30%; }
  50%     { --c5-x5: 40%; --c5-y5: 70%; }
  75%     { --c5-x5: 30%; --c5-y5: 40%; }
}

@keyframes c5-size1 { 0%,100% { --c5-s1: 45%; } 50% { --c5-s1: 80%; } }
@keyframes c5-size2 { 0%,100% { --c5-s2: 45%; } 50% { --c5-s2: 85%; } }
@keyframes c5-size3 { 0%,100% { --c5-s3: 45%; } 50% { --c5-s3: 78%; } }
@keyframes c5-size4 { 0%,100% { --c5-s4: 45%; } 50% { --c5-s4: 82%; } }
@keyframes c5-size5 { 0%,100% { --c5-s5: 50%; } 50% { --c5-s5: 85%; } }

@media (prefers-reduced-motion: reduce) {
  .c5-animated-gradient { animation: none; }
}

/* ── Liquid-glass panel (footer) ──
   Near-transparent surface + a masked gradient ring that reads as a
   refractive 1.4px edge. Needs a lit/dark backdrop behind it to show. */
.liquid-glass {
  background: rgba(255, 255, 255, 0.04);
  background-blend-mode: luminosity;
  backdrop-filter: blur(12px) saturate(135%);
  -webkit-backdrop-filter: blur(12px) saturate(135%);
  border: none;
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.16),
    inset 0 0 0 1px rgba(255, 255, 255, 0.03),
    0 28px 64px -24px rgba(0, 0, 0, 0.55);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.2) 22%,
    rgba(255,255,255,0.07) 45%, rgba(255,255,255,0.07) 55%,
    rgba(255,255,255,0.2) 78%, rgba(255,255,255,0.55) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* Light frosted variant — same liquid-glass language for a white footer. */
.liquid-glass-light {
  background: rgba(255, 255, 255, 0.62);
  backdrop-filter: blur(14px) saturate(125%);
  -webkit-backdrop-filter: blur(14px) saturate(125%);
  border: none;
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.9),
    inset 0 0 0 1px rgba(11, 15, 26, 0.05),
    0 30px 70px -30px rgba(11, 15, 26, 0.22);
  position: relative;
  overflow: hidden;
}
.liquid-glass-light::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.2px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 22%,
    rgba(11,15,26,0.05) 45%, rgba(11,15,26,0.05) 55%,
    rgba(255,255,255,0.4) 78%, rgba(255,255,255,0.95) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* On the homepage the "Ready to get started" CTA blends into the footer, so
   the footer's glass panel tucks up tight beneath the card (no top gap).
   Scoped via :has() so every other page keeps its normal footer spacing. */
/* Cursor magnifier ripple (product-hero liquid-glass lens). */
@keyframes lgp-ripple {
  0% { transform: scale(0.32); opacity: 0.5; }
  100% { transform: scale(1.85); opacity: 0; }
}

main:has([data-cta-blend]) + footer {
  padding-top: 3rem;
}

/* Slow the animated gradient down on the homepage CTA only (the shared
   `.c5-animated-gradient` keeps its original speed elsewhere). Durations
   match the blob1-5 / size1-5 order in the base rule, ~1.6× slower. */
[data-cta-blend] .c5-animated-gradient {
  animation-duration: 8s, 9.5s, 8.8s, 10.4s, 6.4s, 5.6s, 6.7s, 6.1s, 7.4s, 4.8s;
}

/* EXPERIMENTAL — homepage CTA only. Recolours the animated gradient to a
   range of blue shades only (deep navy → light blue; no black, no white) to
   test a more inviting feel. Reuses the same animated position/size
   custom-properties so motion is unchanged; only the blob colours differ. */
.c5-blue {
  background-color: #1769d6;
  background-image:
    radial-gradient(circle at var(--c5-x1) var(--c5-y1), #c3e2ff 0px, transparent var(--c5-s1)),
    radial-gradient(circle at var(--c5-x2) var(--c5-y2), #2da3ff 0px, transparent var(--c5-s2)),
    radial-gradient(circle at var(--c5-x3) var(--c5-y3), #0a3d7a 0px, transparent var(--c5-s3)),
    radial-gradient(circle at var(--c5-x4) var(--c5-y4), #4fb0ff 0px, transparent var(--c5-s4)),
    radial-gradient(circle at var(--c5-x5) var(--c5-y5), #93caff 0px, transparent var(--c5-s5));
}

/* Frosted brand-blue mesh used by the "Built for {country}" cards. Each blob
   is a blurred orb that drifts slowly; only `transform` animates so it stays
   on the compositor. Motion stops under prefers-reduced-motion. */
@keyframes kyc-drift-a { 0%, 100% { transform: translate(0, 0) scale(1); }   50% { transform: translate(16%, -12%) scale(1.25); } }
@keyframes kyc-drift-b { 0%, 100% { transform: translate(0, 0) scale(1.15); } 50% { transform: translate(-18%, 12%) scale(0.9); } }
@keyframes kyc-drift-c { 0%, 100% { transform: translate(0, 0) scale(1.05); } 50% { transform: translate(12%, 16%) scale(1.28); } }
@media (prefers-reduced-motion: reduce) {
  [data-kyc-blob] { animation: none !important; }
}
````

## Appendix C — SVG assets (inline these verbatim if you do not have the files)

### C.1 fingerprint.svg (hero headline icon)

`public/images/fingerprint.svg`

````svg
<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M35.0729 13.0521C40.2257 13.0521 45.0868 14.1585 49.6562 16.3712C54.2257 18.584 58.0417 21.7797 61.1042 25.9583C61.4444 26.3958 61.5543 26.7847 61.4337 27.125C61.3132 27.4653 61.1061 27.7569 60.8125 28C60.5189 28.243 60.1786 28.3529 59.7917 28.3296C59.4047 28.3062 59.0644 28.0992 58.7708 27.7083C56.0972 23.9167 52.6585 21.0126 48.4546 18.9962C44.2507 16.9798 39.7901 15.9707 35.0729 15.9687C30.3557 15.9668 25.9321 16.976 21.8021 18.9962C17.6721 21.0165 14.245 23.9205 11.5208 27.7083C11.2292 28.1458 10.8889 28.3889 10.5 28.4375C10.1111 28.4861 9.77083 28.3889 9.47917 28.1458C9.13889 27.9028 8.93181 27.5994 8.85792 27.2358C8.78403 26.8722 8.89389 26.495 9.1875 26.1042C12.2014 21.9722 15.9814 18.7639 20.5275 16.4792C25.0736 14.1944 29.9221 13.0521 35.0729 13.0521ZM35.0729 19.9062C41.6354 19.9062 47.2743 22.0937 51.9896 26.4687C56.7049 30.8437 59.0625 36.2639 59.0625 42.7292C59.0625 45.1597 58.2001 47.1897 56.4754 48.8192C54.7507 50.4486 52.6478 51.2624 50.1667 51.2604C47.6856 51.2585 45.5593 50.4447 43.7879 48.8192C42.0165 47.1936 41.1289 45.1636 41.125 42.7292C41.125 41.125 40.53 39.7755 39.34 38.6808C38.15 37.5861 36.7276 37.0397 35.0729 37.0417C33.4182 37.0436 31.9958 37.591 30.8058 38.6837C29.6158 39.7765 29.0208 41.125 29.0208 42.7292C29.0208 47.4444 30.4189 51.3819 33.215 54.5417C36.0111 57.7014 39.62 59.9132 44.0417 61.1771C44.4792 61.3229 44.7708 61.566 44.9167 61.9062C45.0625 62.2465 45.0868 62.6111 44.9896 63C44.8924 63.3403 44.6979 63.6319 44.4062 63.875C44.1146 64.118 43.75 64.191 43.3125 64.0937C38.2569 62.8298 34.125 60.3137 30.9167 56.5454C27.7083 52.7771 26.1042 48.1717 26.1042 42.7292C26.1042 40.2986 26.9792 38.2569 28.7292 36.6042C30.4792 34.9514 32.5937 34.125 35.0729 34.125C37.5521 34.125 39.6667 34.9514 41.4167 36.6042C43.1667 38.2569 44.0417 40.2986 44.0417 42.7292C44.0417 44.3333 44.6493 45.6828 45.8646 46.7775C47.0799 47.8722 48.5139 48.4186 50.1667 48.4167C51.8194 48.4147 53.2292 47.8683 54.3958 46.7775C55.5625 45.6867 56.1458 44.3372 56.1458 42.7292C56.1458 37.0903 54.0799 32.3507 49.9479 28.5104C45.816 24.6701 40.8819 22.75 35.1458 22.75C29.4097 22.75 24.4757 24.6701 20.3437 28.5104C16.2118 32.3507 14.1458 37.066 14.1458 42.6562C14.1458 43.8229 14.2557 45.2812 14.4754 47.0312C14.6951 48.7812 15.2172 50.8229 16.0417 53.1562C16.1875 53.5937 16.1758 53.9826 16.0067 54.3229C15.8375 54.6632 15.5575 54.9062 15.1667 55.0521C14.7758 55.1979 14.3996 55.1862 14.0379 55.0171C13.6763 54.8479 13.4206 54.5679 13.2708 54.1771C12.5417 52.2812 12.0196 50.398 11.7046 48.5275C11.3896 46.6569 11.2311 44.7242 11.2292 42.7292C11.2292 36.2639 13.5751 30.8437 18.2671 26.4687C22.959 22.0937 28.561 19.9062 35.0729 19.9062ZM35.0729 5.90623C38.184 5.90623 41.2222 6.28248 44.1875 7.03498C47.1528 7.78748 50.0208 8.86957 52.7917 10.2812C53.2292 10.5243 53.4849 10.816 53.5587 11.1562C53.6326 11.4965 53.5957 11.8368 53.4479 12.1771C53.3001 12.5173 53.0571 12.7847 52.7187 12.9792C52.3804 13.1736 51.9672 13.1493 51.4792 12.9062C48.9028 11.5937 46.2408 10.5855 43.4933 9.88165C40.7458 9.17776 37.939 8.82485 35.0729 8.8229C32.2535 8.8229 29.4826 9.15151 26.7604 9.80873C24.0382 10.466 21.4375 11.4985 18.9583 12.9062C18.5694 13.1493 18.1806 13.2105 17.7917 13.09C17.4028 12.9694 17.1111 12.7137 16.9167 12.3229C16.7222 11.9321 16.6736 11.5801 16.7708 11.2671C16.8681 10.954 17.1111 10.674 17.5 10.4271C20.2222 8.96873 23.066 7.85068 26.0312 7.0729C28.9965 6.29512 32.0104 5.90623 35.0729 5.90623ZM35.0729 26.9792C39.5937 26.9792 43.4826 28.4987 46.7396 31.5379C49.9965 34.5771 51.625 38.3075 51.625 42.7292C51.625 43.1667 51.4918 43.5196 51.2254 43.7879C50.959 44.0562 50.6061 44.1894 50.1667 44.1875C49.7778 44.1875 49.4375 44.0543 49.1458 43.7879C48.8542 43.5215 48.7083 43.1686 48.7083 42.7292C48.7083 39.0833 47.3589 36.0335 44.66 33.5796C41.9611 31.1257 38.7654 29.8978 35.0729 29.8958C31.3804 29.8939 28.209 31.1218 25.5587 33.5796C22.9085 36.0373 21.5833 39.0872 21.5833 42.7292C21.5833 46.6667 22.2639 50.0092 23.625 52.7567C24.9861 55.5042 26.9792 58.2623 29.6042 61.0312C29.8958 61.3229 30.0417 61.6632 30.0417 62.0521C30.0417 62.441 29.8958 62.7812 29.6042 63.0729C29.3125 63.3646 28.9722 63.5104 28.5833 63.5104C28.1944 63.5104 27.8542 63.3646 27.5625 63.0729C24.6944 60.059 22.4953 56.9848 20.965 53.8504C19.4347 50.716 18.6686 47.0089 18.6667 42.7292C18.6667 38.3055 20.2708 34.5742 23.4792 31.535C26.6875 28.4958 30.5521 26.9772 35.0729 26.9792ZM35 41.2708C35.4375 41.2708 35.7904 41.4167 36.0587 41.7083C36.3271 42 36.4603 42.3403 36.4583 42.7292C36.4583 46.375 37.7708 49.3646 40.3958 51.6979C43.0208 54.0312 46.0833 55.1979 49.5833 55.1979C49.875 55.1979 50.2882 55.1736 50.8229 55.125C51.3576 55.0764 51.9167 55.0035 52.5 54.9062C52.9375 54.809 53.3147 54.8703 53.6317 55.09C53.9486 55.3097 54.1547 55.6373 54.25 56.0729C54.3472 56.4618 54.2743 56.8021 54.0312 57.0937C53.7882 57.3854 53.4722 57.5798 53.0833 57.6771C52.2083 57.9201 51.4432 58.0543 50.7879 58.0796C50.1326 58.1048 49.7311 58.1165 49.5833 58.1146C45.2569 58.1146 41.5012 56.6562 38.3162 53.7396C35.1312 50.8229 33.5397 47.1528 33.5417 42.7292C33.5417 42.3403 33.6758 42 33.9442 41.7083C34.2125 41.4167 34.5644 41.2708 35 41.2708Z" fill="url(#paint0_linear_3_7)"/>
<defs>
<linearGradient id="paint0_linear_3_7" x1="35.1583" y1="5.90623" x2="35.1583" y2="64.1354" gradientUnits="userSpaceOnUse">
<stop stop-color="#357CF7"/>
<stop offset="1" stop-color="#BCD1F2"/>
</linearGradient>
</defs>
</svg>
````

### C.2 sparkle.svg (hero headline icon)

`public/images/sparkle.svg`

````svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.28365 16.0156C8.53537 16.1934 8.83613 16.2885 9.14428 16.2877C9.45243 16.2869 9.75272 16.1904 10.0035 16.0113C10.2578 15.8256 10.4507 15.5684 10.5564 15.2713L11.1949 13.3096C11.3588 12.8179 11.6347 12.3711 12.0008 12.0044C12.367 11.6377 12.8134 11.3611 13.3048 11.1966L15.2918 10.5536C15.5856 10.4472 15.8386 10.2514 16.0152 9.99355C16.1917 9.73575 16.283 9.42904 16.276 9.11662C16.2691 8.80421 16.1643 8.50185 15.9765 8.25215C15.7886 8.00245 15.5272 7.81799 15.229 7.72477L13.2648 7.0847C12.7729 6.92101 12.3259 6.64514 11.9589 6.2789C11.592 5.91267 11.3153 5.4661 11.1506 4.97448L10.5049 2.99142C10.401 2.69927 10.2086 2.44679 9.95443 2.26911C9.70032 2.09143 9.39714 1.99738 9.0871 2.00006C8.77705 2.00273 8.47555 2.10198 8.22453 2.28402C7.97351 2.46605 7.78546 2.72181 7.68654 3.01571L7.03372 5.01592C6.86984 5.49435 6.59957 5.92936 6.24326 6.28819C5.88696 6.64703 5.4539 6.92035 4.97669 7.08756L2.99109 7.72619C2.6991 7.8304 2.4468 8.02295 2.2692 8.2771C2.09161 8.53125 1.99754 8.83441 2.00005 9.14447C2.00256 9.45453 2.10153 9.75611 2.28322 10.0074C2.46491 10.2586 2.72031 10.447 3.01395 10.5465L4.97669 11.1823C5.47105 11.3463 5.92001 11.6242 6.28746 11.9934C6.6549 12.3627 6.93057 12.813 7.09229 13.3082L7.73796 15.2955C7.84081 15.587 8.03223 15.8385 8.28365 16.0156ZM8.40507 5.42167L9.15788 3.45433L9.78642 5.42167C10.02 6.12614 10.4151 6.76618 10.9402 7.29062C11.4653 7.81506 12.1058 8.20936 12.8105 8.44198L14.819 9.1992L12.8448 9.83784C12.1407 10.0723 11.501 10.4677 10.9766 10.9928C10.4521 11.5178 10.0573 12.158 9.82356 12.8624L9.07646 14.8312L8.43507 12.861C8.20458 12.1569 7.81332 11.5161 7.29227 10.9894C6.76469 10.4641 6.12346 10.0672 5.4181 9.82927L3.44964 9.08348L5.42952 8.44055C6.12466 8.19973 6.75514 7.80231 7.27228 7.27901C7.78542 6.75352 8.17273 6.11848 8.40507 5.42167ZM17.0503 21.7905C17.1964 21.8932 17.3644 21.9606 17.5411 21.9872C17.7177 22.0138 17.8981 21.9989 18.068 21.9437C18.2379 21.8886 18.3926 21.7946 18.5199 21.6693C18.6473 21.5441 18.7437 21.3909 18.8016 21.2219L19.1559 20.1332C19.2326 19.9076 19.3596 19.7024 19.5273 19.5331C19.6959 19.3617 19.9016 19.2359 20.1273 19.1617L21.2301 18.8016C21.4576 18.7231 21.6546 18.5746 21.7928 18.3775C21.931 18.1804 22.0035 17.9446 21.9999 17.7039C21.9962 17.4631 21.9167 17.2297 21.7725 17.0368C21.6284 16.844 21.427 16.7016 21.1972 16.63L20.1058 16.2728C19.8802 16.1972 19.6751 16.0704 19.5066 15.9024C19.3381 15.7343 19.2107 15.5296 19.1345 15.3041L18.7745 14.1997C18.6972 13.9726 18.5504 13.7755 18.3548 13.6365C18.1593 13.4974 17.925 13.4235 17.6851 13.425C17.4452 13.4266 17.2119 13.5037 17.0182 13.6453C16.8245 13.7869 16.6803 13.9859 16.606 14.214L16.2532 15.3027C16.1803 15.5267 16.0566 15.7307 15.8918 15.899C15.727 16.0673 15.5256 16.1952 15.3032 16.2728L14.199 16.6328C13.9718 16.7098 13.7746 16.8564 13.6353 17.0518C13.4961 17.2472 13.4218 17.4814 13.4231 17.7213C13.4243 17.9613 13.5011 18.1947 13.6424 18.3886C13.7837 18.5825 13.9824 18.727 14.2105 18.8016L15.3004 19.1545C15.5289 19.2317 15.7347 19.3588 15.9032 19.5274C16.0732 19.6974 16.1989 19.9032 16.2718 20.1303L16.6332 21.2361C16.7114 21.4597 16.8572 21.6534 17.0503 21.7905ZM15.7461 17.8001L15.4904 17.7172L15.7532 17.6258C16.1854 17.4739 16.5772 17.2255 16.899 16.8994C17.2208 16.5734 17.464 16.1783 17.6103 15.7442L17.6931 15.4898L17.7788 15.7484C17.9247 16.1863 18.1705 16.5842 18.4968 16.9106C18.8231 17.2369 19.2209 17.4828 19.6587 17.6286L19.9373 17.7186L19.6801 17.8044C19.2415 17.9506 18.843 18.1973 18.5163 18.5247C18.1897 18.8521 17.944 19.2512 17.7988 19.6903L17.7145 19.9489L17.6317 19.6917C17.4866 19.2514 17.2405 18.8511 16.9131 18.5229C16.5857 18.1947 16.186 17.9476 15.7461 17.8015" fill="black"/>
<path d="M8.28365 16.0156C8.53537 16.1934 8.83613 16.2885 9.14428 16.2877C9.45243 16.2869 9.75272 16.1904 10.0035 16.0113C10.2578 15.8256 10.4507 15.5684 10.5564 15.2713L11.1949 13.3096C11.3588 12.8179 11.6347 12.3711 12.0008 12.0044C12.367 11.6377 12.8134 11.3611 13.3048 11.1966L15.2918 10.5536C15.5856 10.4472 15.8386 10.2514 16.0152 9.99355C16.1917 9.73575 16.283 9.42904 16.276 9.11662C16.2691 8.80421 16.1643 8.50185 15.9765 8.25215C15.7886 8.00245 15.5272 7.81799 15.229 7.72477L13.2648 7.0847C12.7729 6.92101 12.3259 6.64514 11.9589 6.2789C11.592 5.91267 11.3153 5.4661 11.1506 4.97448L10.5049 2.99142C10.401 2.69927 10.2086 2.44679 9.95443 2.26911C9.70032 2.09143 9.39714 1.99738 9.0871 2.00006C8.77705 2.00273 8.47555 2.10198 8.22453 2.28402C7.97351 2.46605 7.78546 2.72181 7.68654 3.01571L7.03372 5.01592C6.86984 5.49435 6.59957 5.92936 6.24326 6.28819C5.88696 6.64703 5.4539 6.92035 4.97669 7.08756L2.99109 7.72619C2.6991 7.8304 2.4468 8.02295 2.2692 8.2771C2.09161 8.53125 1.99754 8.83441 2.00005 9.14447C2.00256 9.45453 2.10153 9.75611 2.28322 10.0074C2.46491 10.2586 2.72031 10.447 3.01395 10.5465L4.97669 11.1823C5.47105 11.3463 5.92001 11.6242 6.28746 11.9934C6.6549 12.3627 6.93057 12.813 7.09229 13.3082L7.73796 15.2955C7.84081 15.587 8.03223 15.8385 8.28365 16.0156ZM8.40507 5.42167L9.15788 3.45433L9.78642 5.42167C10.02 6.12614 10.4151 6.76618 10.9402 7.29062C11.4653 7.81506 12.1058 8.20936 12.8105 8.44198L14.819 9.1992L12.8448 9.83784C12.1407 10.0723 11.501 10.4677 10.9766 10.9928C10.4521 11.5178 10.0573 12.158 9.82356 12.8624L9.07646 14.8312L8.43507 12.861C8.20458 12.1569 7.81332 11.5161 7.29227 10.9894C6.76469 10.4641 6.12346 10.0672 5.4181 9.82927L3.44964 9.08348L5.42952 8.44055C6.12466 8.19973 6.75514 7.80231 7.27228 7.27901C7.78542 6.75352 8.17273 6.11848 8.40507 5.42167ZM17.0503 21.7905C17.1964 21.8932 17.3644 21.9606 17.5411 21.9872C17.7177 22.0138 17.8981 21.9989 18.068 21.9437C18.2379 21.8886 18.3926 21.7946 18.5199 21.6693C18.6473 21.5441 18.7437 21.3909 18.8016 21.2219L19.1559 20.1332C19.2326 19.9076 19.3596 19.7024 19.5273 19.5331C19.6959 19.3617 19.9016 19.2359 20.1273 19.1617L21.2301 18.8016C21.4576 18.7231 21.6546 18.5746 21.7928 18.3775C21.931 18.1804 22.0035 17.9446 21.9999 17.7039C21.9962 17.4631 21.9167 17.2297 21.7725 17.0368C21.6284 16.844 21.427 16.7016 21.1972 16.63L20.1058 16.2728C19.8802 16.1972 19.6751 16.0704 19.5066 15.9024C19.3381 15.7343 19.2107 15.5296 19.1345 15.3041L18.7745 14.1997C18.6972 13.9726 18.5504 13.7755 18.3548 13.6365C18.1593 13.4974 17.925 13.4235 17.6851 13.425C17.4452 13.4266 17.2119 13.5037 17.0182 13.6453C16.8245 13.7869 16.6803 13.9859 16.606 14.214L16.2532 15.3027C16.1803 15.5267 16.0566 15.7307 15.8918 15.899C15.727 16.0673 15.5256 16.1952 15.3032 16.2728L14.199 16.6328C13.9718 16.7098 13.7746 16.8564 13.6353 17.0518C13.4961 17.2472 13.4218 17.4814 13.4231 17.7213C13.4243 17.9613 13.5011 18.1947 13.6424 18.3886C13.7837 18.5825 13.9824 18.727 14.2105 18.8016L15.3004 19.1545C15.5289 19.2317 15.7347 19.3588 15.9032 19.5274C16.0732 19.6974 16.1989 19.9032 16.2718 20.1303L16.6332 21.2361C16.7114 21.4597 16.8572 21.6534 17.0503 21.7905ZM15.7461 17.8001L15.4904 17.7172L15.7532 17.6258C16.1854 17.4739 16.5772 17.2255 16.899 16.8994C17.2208 16.5734 17.464 16.1783 17.6103 15.7442L17.6931 15.4898L17.7788 15.7484C17.9247 16.1863 18.1705 16.5842 18.4968 16.9106C18.8231 17.2369 19.2209 17.4828 19.6587 17.6286L19.9373 17.7186L19.6801 17.8044C19.2415 17.9506 18.843 18.1973 18.5163 18.5247C18.1897 18.8521 17.944 19.2512 17.7988 19.6903L17.7145 19.9489L17.6317 19.6917C17.4866 19.2514 17.2405 18.8511 16.9131 18.5229C16.5857 18.1947 16.186 17.9476 15.7461 17.8015" fill="url(#paint0_linear_3_12)"/>
<defs>
<linearGradient id="paint0_linear_3_12" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
<stop stop-color="#357CF7"/>
<stop offset="1" stop-color="#BCD1F2"/>
</linearGradient>
</defs>
</svg>
````

### C.3 eyebrow-icon.svg (section 5 badge)

`public/images/eyebrow-icon.svg`

````svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.58554 19.4999H14.2996C14.9965 19.4999 15.6505 19.1676 16.0472 18.5993L20.2824 12.6272C20.4132 12.4462 20.4836 12.2286 20.4836 12.0053C20.4836 11.782 20.4132 11.5644 20.2824 11.3835L16.0365 5.40065C15.8424 5.12026 15.5826 4.8916 15.2799 4.73462C14.9771 4.57764 14.6406 4.49709 14.2996 4.50002H4.58554C3.71707 4.50002 3.21314 5.49715 3.71707 6.2048L7.86644 12.0053L3.71707 17.8059C3.21314 18.5135 3.71707 19.4999 4.58554 19.4999Z" fill="#1D7BF5"/>
</svg>
````

### C.4 claude.svg (sections 2 + 3)

`public/images/logos/brand/claude.svg`

````svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D97757"><path d="M4.709 15.955l4.72-2.647.079-.23-.079-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.448.255h.389l.055-.157-.134-.098-.103-.097-2.357-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.146-.103.018-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312z"/></svg>
````

### C.5 service icon hugeicons-face-id.svg (section 3, Iconify `hugeicons:face-id`)

`public/images/service-icons/hugeicons-face-id.svg`

````svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.5 8.187c.104-2.1.415-3.41 1.347-4.34c.93-.932 2.24-1.243 4.34-1.347M21.5 8.187c-.104-2.1-.415-3.41-1.347-4.34c-.93-.932-2.24-1.243-4.34-1.347m0 19c2.1-.104 3.41-.415 4.34-1.347c.932-.93 1.243-2.24 1.347-4.34M8.187 21.5c-2.1-.104-3.41-.415-4.34-1.347c-.932-.93-1.243-2.24-1.347-4.34M17.5 17l-.202-.849a2 2 0 0 0-1.392-1.458l-2.406-.694v-1.467c.896-.605 1.5-1.736 1.5-3.032C15 7.567 13.656 6 12 6c-1.657 0-3 1.567-3 3.5c0 1.296.603 2.427 1.5 3.032v1.467l-2.391.7a2 2 0 0 0-1.371 1.406L6.5 17"/></svg>
````

### C.5 service icon mdi-bank-transfer.svg (section 3, Iconify `mdi:bank-transfer`)

`public/images/service-icons/mdi-bank-transfer.svg`

````svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15 14v-3h3V9l4 3.5l-4 3.5v-2zm-1-6.3V9H2V7.7L8 4zM7 10h2v5H7zm-4 0h2v5H3zm10 0v2.5l-2 1.8V10zm-3.9 6l-.6.5l1.7 1.5H2v-2zm7.9-1v3h-3v2l-4-3.5l4-3.5v2z"/></svg>
````

### C.5 service icon mdi-map-marker-check.svg (section 3, Iconify `mdi:map-marker-check`)

`public/images/service-icons/mdi-map-marker-check.svg`

````svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c3.86 0 7 3.14 7 7c0 5.25-7 13-7 13S5 14.25 5 9c0-3.86 3.14-7 7-7m-1.53 12L17 7.41L15.6 6l-5.13 5.18L8.4 9.09L7 10.5z"/></svg>
````

### C.5 service icon mdi-robot-outline.svg (section 3, Iconify `mdi:robot-outline`)

`public/images/service-icons/mdi-robot-outline.svg`

````svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17.5 15.5c0 1.11-.89 2-2 2s-2-.89-2-2s.9-2 2-2s2 .9 2 2m-9-2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.89 2-2s-.89-2-2-2M23 15v3c0 .55-.45 1-1 1h-1v1c0 1.11-.89 2-2 2H5a2 2 0 0 1-2-2v-1H2c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h1c0-3.87 3.13-7 7-7h1V5.73c-.6-.34-1-.99-1-1.73c0-1.1.9-2 2-2s2 .9 2 2c0 .74-.4 1.39-1 1.73V7h1c3.87 0 7 3.13 7 7h1c.55 0 1 .45 1 1m-2 1h-2v-2c0-2.76-2.24-5-5-5h-4c-2.76 0-5 2.24-5 5v2H3v1h2v3h14v-3h2z"/></svg>
````

### C.5 service icon mdi-shield-search.svg (section 3, Iconify `mdi:shield-search`)

`public/images/service-icons/mdi-shield-search.svg`

````svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m5.86 10.31C16.23 21.22 14.28 22.45 12 23c-2.56-.61-4.7-2.07-6.42-4.37C3.86 16.34 3 13.8 3 11V5l9-4l9 4v6c0 2.39-.64 4.61-1.92 6.67l-2.91-2.91c.52-.79.83-1.76.83-2.76a5 5 0 0 0-5-5a5 5 0 0 0-5 5a5 5 0 0 0 5 5c1 0 1.97-.31 2.76-.83z"/></svg>
````

### C.5 service icon mynaui-face-id.svg (section 3, Iconify `mynaui:face-id`)

`public/images/service-icons/mynaui-face-id.svg`

````svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 13.75h1v-4m4-.25V8m-7 8.5c1.5 1.5 4.5 1.5 6 0m-7-7V8m1.4 13c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6m18 0c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21m0-18c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4M9.4 3c-2.24 0-3.36 0-4.216.436a4 4 0 0 0-1.748 1.748C3 6.04 3 7.16 3 9.4"/></svg>
````

---

*Generated 2026-09-08 from the deepidv-website-next repo. Reference screenshots were captured from the local dev build at 1440×900 with the site header hidden.*
