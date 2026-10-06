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
