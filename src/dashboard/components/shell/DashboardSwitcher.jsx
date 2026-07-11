"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useDashboard } from "@/dashboard/context/DashboardContext";
import { USER_PATHS, getOnboardingRedirect } from "@/lib/onboarding";
import { cn } from "@/dashboard/lib/cn";

const switchTargets = {
  [USER_PATHS.BUILD]: {
    path: USER_PATHS.SCALE,
    label: "View grow dashboard",
    shortLabel: "Grow dashboard",
  },
  [USER_PATHS.SCALE]: {
    path: USER_PATHS.BUILD,
    label: "View build dashboard",
    shortLabel: "Build dashboard",
  },
};

export function DashboardSwitcher({ className = "" }) {
  const router = useRouter();
  const { isBuildPath, switchUserPath, selectedTemplate } = useDashboard();

  const currentPath = isBuildPath ? USER_PATHS.BUILD : USER_PATHS.SCALE;
  const target = switchTargets[currentPath];

  const handleSwitch = () => {
    switchUserPath(target.path);
    router.push(
      getOnboardingRedirect(
        target.path,
        target.path === USER_PATHS.BUILD ? selectedTemplate : null
      )
    );
  };

  return (
    <button
      type="button"
      onClick={handleSwitch}
      className={cn(
        "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-surface-border bg-surface px-2.5 text-xs font-medium text-ink transition-colors hover:bg-surface-muted sm:px-3 sm:text-sm",
        className
      )}
      aria-label={target.label}
    >
      <span className="hidden sm:inline">{target.label}</span>
      <span className="sm:hidden">{target.shortLabel}</span>
      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ink-muted" />
    </button>
  );
}
