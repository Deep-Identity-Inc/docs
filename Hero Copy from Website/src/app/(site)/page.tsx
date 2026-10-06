import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getPageSeo } from "@/lib/pageSeoConfig";
import PageSchemas from "@/components/seo/PageSchemas";
import VideoSchema from "@/components/seo/VideoSchema";
import SmoothScroll from "@/components/layout/SmoothScroll";
import HeroScrollMorph from "@/components/home/hero-morph/HeroScrollMorph";
import OnePlatformSection from "@/components/home/OnePlatformSection";
import ServiceStrip from "@/components/home/ServiceStrip";
import LargeVideoSection from "@/components/home/LargeVideoSection";
import ProductsShowcase from "@/components/home/ProductsShowcase";
import CustomerJourney from "@/components/home/CustomerJourney";
import EnterpriseReady from "@/components/home/EnterpriseReady";
import WhyUs from "@/components/home/WhyUs";
import API from "@/components/home/API";
import WorkflowSection from "@/components/home/WorkflowSection";
import DemoVideo from "@/components/home/DemoVideo";
import BuiltForWhatYoureBuilding from "@/components/home/BuiltForWhatYoureBuilding";
import UnifiedApiSection from "@/components/kyc/UnifiedApiSection";
import Pricing from "@/components/home/Pricing";
import FAQSection from "@/components/ui/Sections/FAQSection";
import BottomCTA from "@/components/home/BottomCTA";

const FAQ_ITEMS = [
  {
    question: "What is deepidv?",
    answer:
      "deepidv is a full-stack verification engine built from the ground up to be a true all-in-one platform. We verify identities, run background and credit checks, and monitor fraud in real time — all from a single dashboard. No more stitching together five different vendors to get a complete picture. We built what we wished existed.",
  },
  {
    question: "Is it free?",
    answer:
      "We run on a pay-per-use model, so you only pay for what you actually use. No bloated annual contracts, no minimum commitments out of the gate. Whether you're running ten verifications a month or ten thousand, the pricing scales with you. Reach out and we'll build a plan around your volume.",
  },
  {
    question: "How is deepidv different?",
    answer:
      "Most platforms do one thing well and bolt on the rest through third-party integrations. We built our verification engine, AI monitoring, and screening suite on our own infrastructure and IP. That means faster results, fewer points of failure, and one team to call when you need support. You get ID verification, liveness, AML, background checks, credit pulls, fraud monitoring, and more — without ever leaving the platform.",
  },
  {
    question: "How long does integration take?",
    answer:
      "Most teams are live within a day or two using our hosted flow or web SDKs. If you're going the full API route with custom logic, you're looking at a week or so depending on complexity. We've made it a priority to keep integration lightweight — our docs are clean, our SDKs are well-maintained, and our team is available if you hit a wall.",
  },
  {
    question: "What integration options are available?",
    answer:
      "We meet you where you are. Choose from hosted flows where you generate a link and share it, native SDKs for iOS, Android, React Native, and Flutter, web SDKs for JavaScript, Next.js, and React, iframe or webview embeds for in-app experiences, or standalone server-to-server APIs if you want full control. Mix and match depending on your use case.",
  },
  {
    question: "What countries and documents do you support?",
    answer:
      "We support 211+ countries and thousands of document types — passports, national IDs, driver's licenses, residence permits, you name it. And this isn't built on someone else's engine. It's our own technology and IP, so we control the accuracy, speed, and coverage directly.",
  },
  {
    question: "Can deepidv detect deepfakes?",
    answer:
      "Yes. Our liveness and face match technology is built to catch synthetic media, deepfakes, and presentation attacks. As generative AI gets better, so do we. This isn't a checkbox feature for us — it's core to what we do.",
  },
  {
    question: "How do I get started?",
    answer:
      "Reach out through our website or book a call with the team. We'll walk you through a demo, understand your use case, and get you set up with API keys. Most teams go from first call to live integration in under a week.",
  },
  {
    question: "Do you offer real-time monitoring after onboarding?",
    answer:
      "Absolutely. Verification shouldn't stop at the front door. Our agentic AI monitors for behavioral anomalies, identity drift, and fraud signals continuously — not just at the point of onboarding. Think of it as a living risk layer that adapts as threats evolve.",
  },
  {
    question: "Is deepidv compliant with global regulations?",
    answer:
      "Yes. We're built with compliance at the core — KYC, AML, GDPR, and regional data residency requirements. We stay ahead of regulatory changes so you don't have to. If you're operating across borders, we can walk you through exactly how we handle data in each jurisdiction.",
  },
  {
    question: "Can I customize the verification flow for different use cases?",
    answer:
      "Completely. You define the rules, the order, and the requirements. Need just a face scan for one user segment and full KYC with AML screening for another? Build both flows on the same platform. No code changes, no separate vendor calls — just configure it and go.",
  },
];

export const metadata: Metadata = {
  ...buildPageMetadata(getPageSeo("home")),
  // Override `title` to use Next's `absolute` form so the layout's
  // `%s — deepidv` template doesn't append on the homepage.
  title: { absolute: getPageSeo("home").title },
  // Trustpilot one-time domain verification — renders
  // <meta name="trustpilot-one-time-domain-verification-id" content="…" />
  other: {
    "trustpilot-one-time-domain-verification-id":
      "83e489ec-8632-4795-9596-8c27ca7ca6eb",
  },
};

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <PageSchemas pageKey="home" faqs={FAQ_ITEMS} />
      {/* VideoObject JSON-LD for the brand film in LargeVideoSection
          ("" === homepage key in the SITE_VIDEOS registry). */}
      <VideoSchema pageKey="" />
      <HeroScrollMorph />
      <OnePlatformSection />
      <ServiceStrip />
      <LargeVideoSection />
      <CustomerJourney />
      <WhyUs />
      <BuiltForWhatYoureBuilding />
      <ProductsShowcase />
      <EnterpriseReady />
      <UnifiedApiSection />
      <API />
      <WorkflowSection />
      <DemoVideo />
      <div className="container pb-10">
        <Pricing showCalculator={false} />
      </div>
      <FAQSection
        title={
          <>
            Your questions, <span className="text-gradient-blue">answered</span>
          </>
        }
        faqs={FAQ_ITEMS}
      />
      <BottomCTA />
    </>
  );
}
