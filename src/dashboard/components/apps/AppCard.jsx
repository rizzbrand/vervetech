"use client";

import Link from "next/link";
import { useDashboard } from "@/dashboard/context/DashboardContext";
import { AppIcon } from "@/dashboard/lib/icons";
import {
  Button,
  Card,
  CardBody,
  StarRating,
} from "@/dashboard/components/ui";

export function AppCard({ app }) {
  const { isInstalled, installApp } = useDashboard();
  const installed = isInstalled(app.id);

  return (
    <Card className="flex h-full flex-col transition hover:border-surface-border hover:shadow-card">
      <CardBody className="flex flex-1 flex-col p-4">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white ${app.color}`}
          >
            <AppIcon name={app.icon} className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-ink">
              {app.name}
            </h3>
            <div className="mt-1">
              <StarRating rating={app.rating} />
            </div>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-muted">
          {app.description}
        </p>

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between text-xs text-ink-muted">
            <span>{app.users} users</span>
            <span className="font-medium text-ink">${app.price}/mo</span>
          </div>

          <div className="mt-3 flex gap-2">
            <Link href={`/dashboard/apps/${app.slug}`} className="flex-1">
              <Button variant="secondary" className="w-full" size="sm">
                Details
              </Button>
            </Link>
            {installed ? (
              <Button variant="installed" size="sm" className="flex-1" disabled>
                Installed
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={() => installApp(app.id)}
              >
                Install
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
