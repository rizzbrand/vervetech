"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp as TrendingUpIcon,
  Users,
  Wallet,
} from "lucide-react";
import { AppIcon } from "@/dashboard/lib/icons";
import {
  aiRecommendations,
  overviewStats,
  recentActivity,
  upcomingTasks,
} from "@/dashboard/data/mockData";
import { PageToolbar } from "@/dashboard/components/shell/PageToolbar";
import {
  Badge,
  Button,
  Card,
  CardBody,
  SectionTitle,
  StatCard,
} from "@/dashboard/components/ui";

const statIcons = {
  DollarSign,
  Users,
  ShoppingBag,
  TrendingUp: TrendingUpIcon,
  Wallet,
  Sparkles,
};

export default function DashboardOverviewPage() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const primaryStats = overviewStats.slice(0, 4);
  const secondaryStats = overviewStats.slice(4);

  return (
    <div>
      <PageToolbar
        breadcrumbs={[{ label: "Home", href: "/dashboard" }, { label: "Overview" }]}
        title={`${greeting}, Divine`}
        description="Your business command center — performance, AI insights, and priorities."
        actions={
          <div className="flex gap-2">
            <Link href="/dashboard/ai">
              <Button variant="secondary" size="sm">
                <Sparkles className="h-3.5 w-3.5 text-ink-muted" />
                Ask AI
              </Button>
            </Link>
            <Link href="/dashboard/apps">
              <Button variant="primary" size="sm">
                Browse apps
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        }
      />

      <div className="mb-6 rounded-xl border border-surface-border bg-surface-muted px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-soft">
              <TrendingDown className="h-5 w-5 text-ink-muted" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">
                {aiRecommendations.headline}
              </p>
              <p className="mt-0.5 text-sm text-ink-muted">
                {aiRecommendations.summary}
              </p>
            </div>
          </div>
          <Link href="/dashboard/ai">
            <Button variant="primary" size="sm">
              View AI plan
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {primaryStats.map((stat) => (
          <StatCard key={stat.label} {...stat} icon={statIcons[stat.icon]} />
        ))}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {secondaryStats.map((stat) => (
          <StatCard key={stat.label} {...stat} icon={statIcons[stat.icon]} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardBody>
            <SectionTitle
              action={
                <Link
                  href="/dashboard/ai"
                  className="text-xs font-medium text-ink hover:underline"
                >
                  Open assistant
                </Link>
              }
            >
              AI Recommendations
            </SectionTitle>
            <ul className="space-y-2.5">
              {aiRecommendations.actions.map((action) => (
                <li
                  key={action}
                  className="flex items-center gap-3 rounded-lg border border-surface-border bg-surface-muted/40 px-3 py-2.5 text-sm text-ink"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-ink-muted" />
                  {action}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardBody>
            <SectionTitle>Upcoming Tasks</SectionTitle>
            <ul className="space-y-2">
              {upcomingTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-start justify-between gap-2 rounded-lg border border-surface-border px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      {task.title}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-muted">
                      <Clock className="h-3 w-3" />
                      {task.due}
                    </p>
                  </div>
                  <Badge
                    variant={
                      task.priority === "high"
                        ? "danger"
                        : task.priority === "medium"
                          ? "warning"
                          : "default"
                    }
                  >
                    {task.priority}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-4">
        <CardBody className="p-0">
          <div className="border-b border-surface-border px-5 py-3.5">
            <SectionTitle>Recent Activity</SectionTitle>
          </div>
          <div className="divide-y divide-surface-border">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-surface-muted/40"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-muted">
                  <AppIcon name={item.icon} className="h-3.5 w-3.5 text-ink-muted" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">{item.title}</p>
                  <p className="truncate text-xs text-ink-muted">{item.detail}</p>
                </div>
                <span className="shrink-0 text-xs text-ink-faint">{item.time}</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
