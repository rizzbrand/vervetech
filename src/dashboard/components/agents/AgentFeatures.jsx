"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { agentFeatureFilters, agentFeatures } from "@/dashboard/data/agentFeatures";
import { AppIcon } from "@/dashboard/lib/icons";
import { cn } from "@/dashboard/lib/cn";

export function AgentFeatures() {
  const [activeFilter, setActiveFilter] = useState("Business");

  const filteredFeatures = useMemo(() => {
    return agentFeatures.filter((feature) => feature.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="mt-14 w-full sm:mt-16">
      <div className="dashboard-scrollbar flex gap-2 overflow-x-auto pb-1">
        {agentFeatureFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeFilter === filter
                ? "bg-ink text-surface"
                : "border border-surface-border bg-surface text-ink-muted hover:border-ink/20 hover:text-ink"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="dashboard-scrollbar mt-4 flex gap-4 overflow-x-auto pb-2">
        {filteredFeatures.map((feature) => (
          <Link
            key={feature.id}
            href={feature.href}
            className="group relative flex w-[220px] shrink-0 flex-col overflow-hidden rounded-2xl border border-surface-border bg-surface p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card sm:w-[260px]"
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-transparent",
                feature.glow
              )}
              aria-hidden="true"
            />
            <div
              className={cn(
                "relative flex h-9 w-9 items-center justify-center rounded-lg text-white",
                feature.color
              )}
            >
              <AppIcon name={feature.icon} className="h-4 w-4" />
            </div>
            <h3 className="relative mt-4 text-[15px] font-semibold leading-snug text-ink">
              {feature.name}
            </h3>
            <p className="relative mt-2 line-clamp-4 text-sm leading-relaxed text-ink-muted">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
