import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Inter, Geist, Instrument_Serif } from "next/font/google";
import { cn } from "@/lib/utils";
import JsonLd from "@/components/seo/JsonLd";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

const SITE_URL = "https://www.deepidv.com";

/* Mobile-first viewport. `viewport-fit: cover` is required for the
 * env(safe-area-inset-*) utilities in globals.css to take effect on iOS
 * with a notch / Dynamic Island. We also drop the implicit
 * `maximum-scale=1` so accessibility users can pinch-zoom. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0C" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "./" },
  title: {
    default: "deepidv — AI-Powered Identity Verification & Fraud Prevention",
    template: "%s — deepidv",
  },
  description:
    "The AI-native verification engine. Document, biometric, liveness, and deepfake detection with agentic fraud monitoring across 211+ countries. Composite risk scoring in under 150ms.",
  applicationName: "deepidv",
  authors: [{ name: "Deep Identity Inc." }],
  creator: "Deep Identity Inc.",
  publisher: "Deep Identity Inc.",
  openGraph: {
    type: "website",
    siteName: "deepidv",
    locale: "en_US",
    url: SITE_URL,
    title: "deepidv — AI-Powered Identity Verification & Fraud Prevention",
    description:
      "The AI-native verification engine. Document, biometric, liveness, and deepfake detection with agentic fraud monitoring across 211+ countries.",
    images: [
      {
        url: "/images/logos/deepidv-default.svg",
        width: 398,
        height: 96,
        alt: "deepidv",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@deepidv",
    creator: "@deepidv",
    title: "deepidv — AI-Powered Identity Verification & Fraud Prevention",
    description:
      "The AI-native verification engine. Document, biometric, liveness, and deepfake detection with agentic fraud monitoring across 211+ countries.",
    images: ["/images/logos/deepidv-default.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "deepidv",
  legalName: "Deep Identity Inc.",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/logos/deepidv-default.svg`,
    width: 398,
    height: 96,
  },
  sameAs: [
    "https://www.linkedin.com/company/deepidv",
    "https://x.com/deepidv",
    "https://www.youtube.com/@deepidv",
    "https://www.tiktok.com/@deepidv",
    "https://www.producthunt.com/products/deepidv",
  ],
  description:
    "deepidv is the AI-native verification engine and agentic compliance suite. Document intelligence, biometrics, deepfake detection, behavioral risk scoring, and continuous monitoring — all built from scratch.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    addressCountry: "US",
  },
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "deepidv",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const SOFTWARE_APPLICATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "deepidv",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Identity Verification",
  operatingSystem: "Web",
  url: SITE_URL,
  description:
    "AI-native identity verification platform: document intelligence, biometrics, liveness, deepfake detection, and agentic fraud monitoring across 211+ countries.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  offers: {
    "@type": "Offer",
    price: "0.05",
    priceCurrency: "USD",
    description: "Pay-per-verification pricing, no minimum commitment",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("antialiased", "font-sans", inter.variable, geist.variable, instrumentSerif.variable)}>
      <head>
        {/* Warm DNS + TLS to GTM/GA early so the analytics scripts (loaded
            with afterInteractive) don't add a fresh handshake to TBT. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="" />
      </head>
      <body className="bg-white overflow-x-clip">
        {/* Site-wide entity graph, rendered as plain inline <script> tags.
            These were previously emitted via next/script with
            strategy="afterInteractive", which injects them only AFTER
            hydration — so they were absent from the server-rendered HTML
            entirely. Google renders JS and would eventually see them, but
            the AI crawlers robots.ts explicitly welcomes (GPTBot, ClaudeBot,
            PerplexityBot, CCBot, …) largely do not execute JavaScript, so
            they never saw the Organization node at all. That also left every
            page's `provider: {"@id": ".../#organization"}` pointing at an
            entity absent from the markup.

            JSON-LD is data, not executable script, so next/script buys
            nothing here and costs the initial-HTML presence that matters. */}
        <JsonLd
          schemas={[
            ORGANIZATION_SCHEMA,
            WEBSITE_SCHEMA,
            SOFTWARE_APPLICATION_SCHEMA,
          ]}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-46QJFD8XK1"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
        >{`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-46QJFD8XK1');
gtag('config', 'AW-17958479172');
`}</Script>
        {children}
      </body>
    </html>
  );
}
