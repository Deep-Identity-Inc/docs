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
