"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("skeleton-shimmer rounded-lg", className)}
      aria-hidden="true"
    />
  );
}

export function MatchCardSkeleton() {
  return (
    <div className="glass-card p-5 space-y-4">
      {/* League */}
      <div className="flex items-center gap-2">
        <Skeleton className="w-5 h-5 rounded-full" />
        <Skeleton className="w-24 h-3" />
      </div>
      {/* Teams */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-20 h-4" />
        </div>
        <Skeleton className="w-16 h-8 rounded-md" />
        <div className="flex items-center gap-3">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      </div>
      {/* Status */}
      <div className="flex justify-center">
        <Skeleton className="w-20 h-5 rounded-full" />
      </div>
    </div>
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      <Skeleton className="w-full h-48 rounded-t-2xl rounded-b-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-3/4 h-5" />
        <div className="flex justify-between pt-2">
          <Skeleton className="w-16 h-3" />
          <Skeleton className="w-20 h-3" />
        </div>
      </div>
    </div>
  );
}
