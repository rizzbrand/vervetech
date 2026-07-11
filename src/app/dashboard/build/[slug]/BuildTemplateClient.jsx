"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  Globe,
  Palette,
  Sparkles,
} from "lucide-react";
import { PageToolbar } from "@/dashboard/components/shell/PageToolbar";
import { useDashboard } from "@/dashboard/context/DashboardContext";
import {
  Badge,
  Button,
  Card,
  CardBody,
  SectionTitle,
} from "@/dashboard/components/ui";

const launchSteps = [
  "Customize branding and visual identity",
  "Generate your site structure with AI",
  "Connect domain and publish your MVP",
  "Set up docs, proposals, and onboarding flows",
];

export function BuildTemplateClient({ template }) {
  const { selectTemplate } = useDashboard();

  useEffect(() => {
    selectTemplate(template.slug);
  }, [selectTemplate, template.slug]);

  return (
    <div>
      <PageToolbar
        breadcrumbs={[
          { label: "Build", href: "/dashboard/build" },
          { label: "Templates", href: "/dashboard/build" },
          { label: template.name },
        ]}
        title={template.name}
        description={template.description}
        actions={
          <Link href="/dashboard/build">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="h-3.5 w-3.5" />
              All templates
            </Button>
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <Card className="overflow-hidden">
          <div className="aspect-[16/10] bg-surface-muted">
            <img
              src={template.image}
              alt={template.name}
              className="h-full w-full object-cover"
            />
          </div>
          <CardBody className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {template.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <ul className="space-y-2">
              {template.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-ink-muted"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="text-sm font-medium text-ink">{template.price}</p>
          </CardBody>
        </Card>

        <div className="space-y-4">
          <Card className="border-surface-border bg-surface-muted">
            <CardBody className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-ink-muted" />
                <h3 className="font-semibold text-ink">Launch with AI</h3>
              </div>
              <p className="text-sm text-ink-muted">
                We&apos;ll adapt this template to your brand, generate copy,
                and build a launch checklist tailored to {template.industry}.
              </p>
              <Link href="/dashboard/ai">
                <Button variant="primary" className="w-full">
                  <Bot className="h-4 w-4" />
                  Customize with AI
                </Button>
              </Link>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-ink">Launch checklist</h3>
                <p className="mt-1 text-sm text-ink-muted">
                  Your path from template to live product.
                </p>
              </div>
              <ol className="space-y-3">
                {launchSteps.map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-3 text-sm text-ink-muted"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-muted text-xs font-semibold text-ink">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-3">
              <h3 className="font-semibold text-ink">Open build tools</h3>
              <div className="grid gap-2">
                <Link href="/dashboard/apps/brand-studio">
                  <Button variant="secondary" className="w-full justify-start">
                    <Palette className="h-4 w-4" />
                    Brand Studio
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard/apps/ai-website-builder">
                  <Button variant="secondary" className="w-full justify-start">
                    <Globe className="h-4 w-4" />
                    AI Website Builder
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
