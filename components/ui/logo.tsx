"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  withText?: boolean;
}

export function Logo({ className, withText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-1.5 group select-none", className)}>
      {/* Icon: Heartbeat into Lightning */}
      <div className="relative flex items-center justify-center">
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#emerald-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-transform duration-300 group-hover:scale-110"
        >
          {/* Custom Path: flat -> spike up -> spike down -> lightning tail */}
          <path d="M2 12h3l2-4 3 13 4-18 3 7h1" />
          <path d="M16 12l2 6 3-8h1" />
          
          <defs>
            <linearGradient id="emerald-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10B981" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Text */}
      {withText && (
        <span className="text-2xl font-black tracking-tight flex items-baseline">
          <span className="text-white drop-shadow-md">Score</span>
          <span className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">Up</span>
        </span>
      )}
    </div>
  );
}
