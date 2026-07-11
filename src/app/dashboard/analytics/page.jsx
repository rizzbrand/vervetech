"use client";

import { PageHeader, EmptyState } from "@/dashboard/components/ui";

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Unified business analytics across your installed apps"
      />
      <EmptyState
        title="Analytics dashboard"
        description="Install Analytics Pro from the marketplace to unlock unified KPIs and custom reports."
      />
    </div>
  );
}
