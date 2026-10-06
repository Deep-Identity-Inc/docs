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
