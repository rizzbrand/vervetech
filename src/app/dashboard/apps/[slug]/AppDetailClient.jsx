"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { getAppBySlug } from "@/dashboard/data/businessApps";
import { useDashboard } from "@/dashboard/context/DashboardContext";
import { AppIcon } from "@/dashboard/lib/icons";
import {
  Button,
  Card,
  CardBody,
  SectionTitle,
  StarRating,
} from "@/dashboard/components/ui";

export default function AppDetailClient() {
  const { slug } = useParams();
  const app = getAppBySlug(slug);
  const { isInstalled, installApp } = useDashboard();

  if (!app) {
    notFound();
  }

  const installed = isInstalled(app.id);

  return (
    <div>
      <Link
        href="/dashboard/apps"
        className="mb-6 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to marketplace
      </Link>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl text-white ${app.color}`}
          >
            <AppIcon name={app.icon} className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{app.name}</h1>
            <StarRating rating={app.rating} />
            <p className="mt-2 max-w-xl text-ink-muted">{app.description}</p>
            <p className="mt-2 text-sm text-ink-muted">
              {app.users} users · {app.category}
            </p>
          </div>
        </div>

        {installed ? (
          <Button variant="installed" size="lg" disabled>
            Installed
          </Button>
        ) : (
          <Button variant="primary" size="lg" onClick={() => installApp(app.id)}>
            Install — ${app.price}/month
          </Button>
        )}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardBody>
            <SectionTitle>Overview</SectionTitle>
            <ul className="space-y-3">
              {app.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-ink-muted"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50">
                    <Check className="h-3 w-3 text-emerald-600" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <SectionTitle>Pricing</SectionTitle>
            <div className="space-y-3">
              {app.plans.map((plan, i) => (
                <div
                  key={plan.name}
                  className={`flex items-center justify-between rounded-xl border p-4 ${
                    i === 1
                      ? "border-ink bg-surface-muted"
                      : "border-surface-border"
                  }`}
                >
                  <div>
                    <p className="font-medium text-ink">{plan.name}</p>
                    {i === 1 && (
                      <p className="text-xs text-ink-muted">Most popular</p>
                    )}
                  </div>
                  <p className="text-lg font-semibold">${plan.price}/mo</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
