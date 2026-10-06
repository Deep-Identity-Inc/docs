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
