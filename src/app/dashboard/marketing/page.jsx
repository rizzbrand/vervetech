"use client";

import {
  marketingCampaigns,
  marketingStats,
} from "@/dashboard/data/mockData";
import {
  Badge,
  Card,
  CardBody,
  DataTable,
  PageHeader,
  SectionTitle,
  StatCard,
} from "@/dashboard/components/ui";

function MiniBarChart() {
  const bars = [40, 65, 45, 80, 55, 90, 70];
  return (
    <div className="flex h-32 items-end gap-2">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-md bg-gradient-to-t from-ink to-ink/40"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export default function MarketingPage() {
  return (
    <div>
      <PageHeader
        title="Marketing"
        description="Campaign performance, social posts, and email analytics"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {marketingStats.map((stat) => (
          <StatCard key={stat.label} {...stat} trend="up" />
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardBody>
            <SectionTitle>Campaign Performance</SectionTitle>
            <MiniBarChart />
            <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <p className="text-ink-muted">Impressions</p>
                <p className="font-semibold">284k</p>
              </div>
              <div>
                <p className="text-ink-muted">Clicks</p>
                <p className="font-semibold">12.4k</p>
              </div>
              <div>
                <p className="text-ink-muted">Conversions</p>
                <p className="font-semibold">842</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <SectionTitle>Email Analytics</SectionTitle>
            <dl className="space-y-4">
              <div className="flex justify-between text-sm">
                <dt className="text-ink-muted">Open rate</dt>
                <dd className="font-medium">41%</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-ink-muted">Click rate</dt>
                <dd className="font-medium">8.6%</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-ink-muted">Unsubscribes</dt>
                <dd className="font-medium">0.4%</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-ink-muted">Revenue attributed</dt>
                <dd className="font-medium">$14,200</dd>
              </div>
            </dl>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6">
        <CardBody>
          <SectionTitle>Active Campaigns & Social Posts</SectionTitle>
          <DataTable
            columns={[
              { key: "name", label: "Campaign" },
              { key: "channel", label: "Channel" },
              {
                key: "status",
                label: "Status",
                render: (row) => (
                  <Badge
                    variant={row.status === "Live" ? "success" : "default"}
                  >
                    {row.status}
                  </Badge>
                ),
              },
              { key: "performance", label: "Performance" },
            ]}
            rows={marketingCampaigns}
          />
        </CardBody>
      </Card>
    </div>
  );
}
