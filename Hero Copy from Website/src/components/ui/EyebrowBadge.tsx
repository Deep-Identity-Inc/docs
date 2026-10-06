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
