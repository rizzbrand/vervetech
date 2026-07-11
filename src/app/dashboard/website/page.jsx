"use client";

import { PageHeader, EmptyState } from "@/dashboard/components/ui";

export default function WebsitePage() {
  return (
    <div>
      <PageHeader
        title="Website"
        description="Manage pages, domains, and conversion tracking"
      />
      <EmptyState
        title="Website manager"
        description="Install Website from the marketplace to manage your business site."
      />
    </div>
  );
}
