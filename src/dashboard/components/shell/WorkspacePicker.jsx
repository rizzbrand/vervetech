"use client";

import { ChevronDown } from "lucide-react";

export function WorkspacePicker({ className = "" }) {
  return (
    <button
      type="button"
      className={`flex h-8 max-w-[240px] items-center gap-2 rounded-lg bg-surface-hover px-2.5 text-left transition-colors hover:bg-surface-border ${className}`}
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-ink text-[10px] font-semibold text-surface">
        D
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">
        Divine gabriel&apos;s Workspace
      </span>
      <ChevronDown className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
    </button>
  );
}
