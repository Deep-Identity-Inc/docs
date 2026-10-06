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
