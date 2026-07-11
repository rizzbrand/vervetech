"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { businessApps, APP_CATEGORIES } from "@/dashboard/data/businessApps";
import { AppCard } from "@/dashboard/components/apps/AppCard";
import { PageToolbar } from "@/dashboard/components/shell/PageToolbar";
import { useDashboard } from "@/dashboard/context/DashboardContext";
import { cn } from "@/dashboard/lib/cn";

const categoryDescriptions = {
  Build: "Launch your brand, site, and documents",
  Sales: "Close deals and manage customer relationships",
  Marketing: "Grow awareness and drive conversions",
  Finance: "Track revenue, expenses, and cashflow",
  Operations: "Run teams, projects, and daily operations",
  AI: "Autonomous agents for every business function",
};

export default function BusinessAppsPage() {
  return (
    <Suspense fallback={<div className="p-6" />}>
      <BusinessAppsContent />
    </Suspense>
  );
}

function BusinessAppsContent() {
  const { isBuildPath } = useDashboard();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const validCategories = APP_CATEGORIES;
  const [category, setCategory] = useState(
    validCategories.includes(initialCategory) ? initialCategory : "All"
  );
  const [query, setQuery] = useState("");

  const filteredApps = useMemo(() => {
    let apps =
      category === "All"
        ? businessApps
        : businessApps.filter((app) => app.category === category);

    if (query.trim()) {
      const q = query.toLowerCase();
      apps = apps.filter(
        (app) =>
          app.name.toLowerCase().includes(q) ||
          app.description.toLowerCase().includes(q)
      );
    }
    return apps;
  }, [category, query]);

  const grouped = useMemo(() => {
    if (category !== "All") {
      return [{ name: category, apps: filteredApps }];
    }
    return APP_CATEGORIES.filter((c) => c !== "All").map((cat) => ({
      name: cat,
      apps: filteredApps.filter((app) => app.category === cat),
    })).filter((g) => g.apps.length > 0);
  }, [category, filteredApps]);

  const getCategoryLabel = (cat) => {
    if (cat === "Build" && isBuildPath) return "Tools";
    return cat;
  };

  return (
    <div>
      <PageToolbar
        breadcrumbs={[
          { label: isBuildPath ? "Build" : "Home", href: isBuildPath ? "/dashboard/build" : "/dashboard" },
          { label: isBuildPath ? "Tools" : "Business Apps" },
        ]}
        title="App Marketplace"
        description="Install AI-powered tools to build, grow, and scale your company."
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps..."
            className="h-9 w-full rounded-lg border border-surface-border bg-white pl-9 pr-3 text-sm outline-none focus:border-ink/20 focus:ring-2 focus:ring-black/5"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {APP_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                category === cat
                  ? "bg-ink text-white"
                  : "bg-white text-ink-muted ring-1 ring-surface-border hover:text-ink"
              )}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {grouped.map((group) => (
          <section key={group.name}>
            <div className="mb-3">
              <h2 className="text-sm font-semibold text-ink">{getCategoryLabel(group.name)}</h2>
              <p className="text-xs text-ink-muted">
                {categoryDescriptions[group.name]}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {group.apps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
