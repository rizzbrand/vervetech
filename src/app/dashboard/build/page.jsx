"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  FileText,
  Globe,
  LayoutTemplate,
  Palette,
  Search,
  Sparkles,
  Wand2,
} from "lucide-react";
import { templates, templateFilters } from "@/app/templates/templatesData";
import { PageToolbar } from "@/dashboard/components/shell/PageToolbar";
import { useDashboard } from "@/dashboard/context/DashboardContext";
import { cn } from "@/dashboard/lib/cn";
import {
  Badge,
  Button,
  Card,
  CardBody,
} from "@/dashboard/components/ui";

const launchSteps = [
  { id: "choose", label: "Choose path" },
  { id: "template", label: "Pick template" },
  { id: "customize", label: "Customize" },
  { id: "launch", label: "Go live" },
];

const buildTools = [
  {
    title: "AI Website Builder",
    description: "Generate pages, copy, and layouts with AI.",
    href: "/dashboard/apps/ai-website-builder",
    icon: Globe,
  },
  {
    title: "Brand Studio",
    description: "Logos, colors, and brand kits in minutes.",
    href: "/dashboard/apps/brand-studio",
    icon: Palette,
  },
  {
    title: "Document Generator",
    description: "Proposals, contracts, and pitch decks.",
    href: "/dashboard/apps/document-generator",
    icon: FileText,
  },
];

const tabs = [
  { id: "templates", label: "Templates" },
  { id: "tools", label: "Tools" },
];

export default function BuildDashboardPage() {
  const { selectedTemplate, selectTemplate } = useDashboard();
  const [activeTab, setActiveTab] = useState("templates");
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const selected = useMemo(
    () => templates.find((t) => t.slug === selectedTemplate),
    [selectedTemplate]
  );

  const filteredTemplates = useMemo(() => {
    let list =
      activeFilter === "All"
        ? templates
        : templates.filter((template) => template.tags.includes(activeFilter));

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (template) =>
          template.name.toLowerCase().includes(q) ||
          template.industry.toLowerCase().includes(q) ||
          template.description.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeFilter, query]);

  const currentStep = selected ? 2 : 1;

  return (
    <div className="space-y-8">
      <PageToolbar
        breadcrumbs={[
          { label: "Build", href: "/dashboard/build" },
          { label: "Launchpad" },
        ]}
        title="Build your company"
        description="Start from a proven template or let AI shape your brand, site, and launch plan."
      />

      <Card className="overflow-hidden">
        <CardBody className="p-0">
          <div className="border-b border-surface-border px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
                  Launch progress
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  {selected
                    ? `You're set up with ${selected.name}. Customize and launch when ready.`
                    : "Pick how you want to start — templates are fastest, AI is most flexible."}
                </p>
              </div>
              <div className="dashboard-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1">
                {launchSteps.map((step, index) => {
                  const stepNumber = index + 1;
                  const isComplete = stepNumber < currentStep;
                  const isCurrent = stepNumber === currentStep;

                  return (
                    <div
                      key={step.id}
                      className={cn(
                        "flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium",
                        isComplete && "border-ink/10 bg-ink text-white",
                        isCurrent && "border-ink bg-white text-ink",
                        !isComplete && !isCurrent && "border-surface-border bg-surface-muted text-ink-faint"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full text-[10px]",
                          isComplete && "bg-white/20",
                          isCurrent && "bg-ink text-white",
                          !isComplete && !isCurrent && "bg-white text-ink-faint"
                        )}
                      >
                        {isComplete ? <Check className="h-3 w-3" /> : stepNumber}
                      </span>
                      {step.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-px bg-surface-border sm:grid-cols-2">
            <Link
              href="#templates"
              onClick={() => setActiveTab("templates")}
              className="group flex flex-col gap-3 bg-white p-5 transition-colors hover:bg-surface-muted/40 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-surface-border bg-surface-muted">
                  <LayoutTemplate className="h-5 w-5 text-ink" />
                </span>
                <ArrowRight className="h-4 w-4 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-ink">Start with a template</h2>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  Browse industry-ready SaaS foundations and launch in days, not months.
                </p>
              </div>
              <span className="text-xs font-medium text-ink-muted">
                {templates.length} templates available
              </span>
            </Link>

            <Link
              href="/dashboard/ai"
              className="group flex flex-col gap-3 border-t border-surface-border bg-white p-5 transition-colors hover:bg-surface-muted/40 sm:border-l sm:border-t-0 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-surface-border bg-ink text-white">
                  <Wand2 className="h-5 w-5" />
                </span>
                <ArrowRight className="h-4 w-4 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-ink">Start with AI</h2>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  Describe your idea and get a brand kit, site outline, and launch checklist.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-ink">
                <Sparkles className="h-3 w-3" />
                Recommended if you&apos;re starting from scratch
              </span>
            </Link>
          </div>
        </CardBody>
      </Card>

      {selected && (
        <Card className="border-ink/15 bg-[#fafbfc]">
          <CardBody className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-center gap-4">
              <div className="h-14 w-20 overflow-hidden rounded-lg border border-surface-border bg-white">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
                  Selected template
                </p>
                <p className="font-semibold text-ink">{selected.name}</p>
                <p className="text-sm text-ink-muted">{selected.industry}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => selectTemplate(null)}
              >
                Change
              </Button>
              <Link href={`/dashboard/build/${selected.slug}`}>
                <Button variant="primary" size="sm">
                  Continue setup
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      )}

      <div id="templates" className="space-y-4">
        <div className="flex items-center gap-1 border-b border-surface-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-3 py-2.5 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "text-ink"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-ink" />
              )}
            </button>
          ))}
        </div>

        {activeTab === "templates" && (
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-sm flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="h-9 w-full rounded-lg border border-surface-border bg-white pl-9 pr-3 text-sm outline-none focus:border-ink/20 focus:ring-2 focus:ring-black/5"
                />
              </div>
              <p className="text-xs text-ink-muted">
                {filteredTemplates.length} template
                {filteredTemplates.length === 1 ? "" : "s"}
              </p>
            </div>

            <div className="dashboard-scrollbar flex gap-2 overflow-x-auto pb-1">
              {templateFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    activeFilter === filter
                      ? "bg-ink text-white"
                      : "border border-surface-border bg-white text-ink-muted hover:border-ink/20 hover:text-ink"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>

            {filteredTemplates.length === 0 ? (
              <Card className="border-dashed">
                <CardBody className="py-12 text-center">
                  <p className="font-medium text-ink">No templates match your search</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    Try a different filter or start with AI instead.
                  </p>
                  <Link href="/dashboard/ai" className="mt-4 inline-block">
                    <Button variant="primary" size="sm">
                      Start with AI
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredTemplates.map((template) => {
                  const isSelected = selectedTemplate === template.slug;

                  return (
                    <Card
                      key={template.slug}
                      className={cn(
                        "group overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-card",
                        isSelected && "ring-2 ring-ink"
                      )}
                    >
                      <Link href={`/dashboard/build/${template.slug}`}>
                        <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
                          <img
                            src={template.image}
                            alt={template.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                          <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2 py-1 text-[11px] font-medium text-ink shadow-soft">
                            {template.industry}
                          </span>
                          {isSelected && (
                            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-ink px-2 py-1 text-[11px] font-medium text-white">
                              <Check className="h-3 w-3" />
                              Selected
                            </span>
                          )}
                        </div>
                      </Link>
                      <CardBody className="space-y-3 p-4">
                        <div>
                          <Link href={`/dashboard/build/${template.slug}`}>
                            <h3 className="font-semibold text-ink transition-colors group-hover:text-ink/80">
                              {template.name}
                            </h3>
                          </Link>
                          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                            {template.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {template.features.map((feature) => (
                            <Badge key={feature}>{feature}</Badge>
                          ))}
                        </div>
                        <div className="flex flex-col gap-3 border-t border-surface-border pt-3 sm:flex-row sm:items-center sm:justify-between">
                          <span className="text-sm font-medium text-ink">
                            {template.price}
                          </span>
                          <div className="flex w-full gap-2 sm:w-auto">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex-1 sm:flex-none"
                              onClick={() => selectTemplate(template.slug)}
                            >
                              {isSelected ? "Selected" : "Select"}
                            </Button>
                            <Link href={`/dashboard/build/${template.slug}`} className="flex-1 sm:flex-none">
                              <Button variant="primary" size="sm" className="w-full">
                                Preview
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === "tools" && (
          <div className="grid gap-4 sm:grid-cols-3">
            {buildTools.map((tool) => (
              <Link key={tool.title} href={tool.href}>
                <Card className="group h-full transition-all hover:-translate-y-0.5 hover:shadow-card">
                  <CardBody className="flex h-full flex-col gap-4 p-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-surface-border bg-surface-muted transition-colors group-hover:border-ink/20 group-hover:bg-white">
                      <tool.icon className="h-5 w-5 text-ink" />
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-ink">{tool.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                        {tool.description}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-ink">
                      Open tool
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Card className="border-dashed bg-transparent">
        <CardBody className="flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-surface-border bg-white">
              <Bot className="h-5 w-5 text-ink-muted" />
            </span>
            <div>
              <h3 className="font-semibold text-ink">Not sure where to start?</h3>
              <p className="mt-1 max-w-xl text-sm text-ink-muted">
                Tell the AI assistant about your industry and goals — it will
                recommend the best template and a 7-day launch plan.
              </p>
            </div>
          </div>
          <Link href="/dashboard/ai">
            <Button variant="secondary" size="sm">
              <Sparkles className="h-3.5 w-3.5" />
              Chat with AI
            </Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
