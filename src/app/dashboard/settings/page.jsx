"use client";

import { useState } from "react";
import {
  Bell,
  Bot,
  CreditCard,
  Moon,
  Plug,
  Settings2,
  Sun,
  Users,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  PageHeader,
} from "@/dashboard/components/ui";
import { useTheme } from "@/dashboard/context/ThemeContext";
import { cn } from "@/dashboard/lib/cn";

const tabs = [
  { id: "workspace", label: "Workspace", icon: Settings2 },
  { id: "team", label: "Team Members", icon: Users },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "ai", label: "AI Preferences", icon: Bot },
];

const teamMembers = [
  { name: "Divine", role: "Admin", email: "divine@rizzbrand.com" },
  { name: "Sarah Kim", role: "Marketing", email: "sarah@rizzbrand.com" },
  { name: "James Oka", role: "Sales", email: "james@rizzbrand.com" },
];

const integrations = [
  { name: "Stripe", status: "Connected" },
  { name: "Google Analytics", status: "Connected" },
  { name: "Slack", status: "Available" },
  { name: "Zapier", status: "Available" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("workspace");
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your workspace, team, billing, and AI preferences"
      />

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <Card className="h-fit lg:sticky lg:top-4">
          <CardBody className="p-2">
            <nav className="dashboard-scrollbar flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:space-y-1 lg:overflow-visible lg:pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors lg:w-full",
                    activeTab === tab.id
                      ? "bg-ink text-surface"
                      : "text-ink-muted hover:bg-surface-muted hover:text-ink"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            {activeTab === "workspace" && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold">Workspace</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm text-ink-muted">Company name</span>
                    <input
                      defaultValue="Rizzbrand Technologies"
                      className="mt-1.5 h-10 w-full rounded-lg border border-surface-border px-3 text-sm outline-none focus:ring-2 focus:ring-black/5"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-ink-muted">Industry</span>
                    <input
                      defaultValue="Technology"
                      className="mt-1.5 h-10 w-full rounded-lg border border-surface-border px-3 text-sm outline-none focus:ring-2 focus:ring-black/5"
                    />
                  </label>
                </div>
                <div className="rounded-xl border border-surface-border p-4">
                  <p className="text-sm font-medium text-ink">Appearance</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    Choose how the dashboard looks on your device.
                  </p>
                  <div className="mt-4 inline-flex rounded-lg border border-surface-border bg-surface-muted p-1">
                    <button
                      type="button"
                      onClick={() => setTheme("light")}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        theme === "light"
                          ? "bg-ink text-surface"
                          : "text-ink-muted hover:text-ink"
                      )}
                    >
                      <Sun className="h-4 w-4" />
                      Light
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme("dark")}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        theme === "dark"
                          ? "bg-ink text-surface"
                          : "text-ink-muted hover:text-ink"
                      )}
                    >
                      <Moon className="h-4 w-4" />
                      Dark
                    </button>
                  </div>
                </div>
                <Button>Save changes</Button>
              </div>
            )}

            {activeTab === "team" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Team Members</h2>
                  <Button size="sm">Invite member</Button>
                </div>
                <div className="divide-y divide-surface-border">
                  {teamMembers.map((member) => (
                    <div
                      key={member.email}
                      className="flex items-center justify-between py-4"
                    >
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-ink-muted">{member.email}</p>
                      </div>
                      <Badge>{member.role}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Billing</h2>
                <div className="rounded-xl border border-surface-border p-4">
                  <p className="text-sm text-ink-muted">Current plan</p>
                  <p className="mt-1 text-2xl font-semibold">Business OS Pro</p>
                  <p className="mt-1 text-sm text-ink-muted">$149/month · Renews Jul 20</p>
                </div>
                <Button variant="secondary">Manage billing</Button>
              </div>
            )}

            {activeTab === "integrations" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Integrations</h2>
                {integrations.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-xl border border-surface-border p-4"
                  >
                    <p className="font-medium">{item.name}</p>
                    <Badge
                      variant={
                        item.status === "Connected" ? "success" : "default"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Notifications</h2>
                {[
                  "Deal updates",
                  "Invoice reminders",
                  "Campaign performance",
                  "AI recommendations",
                ].map((item) => (
                  <label
                    key={item}
                    className="flex items-center justify-between rounded-xl border border-surface-border p-4"
                  >
                    <span className="text-sm font-medium">{item}</span>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </label>
                ))}
              </div>
            )}

            {activeTab === "ai" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">AI Preferences</h2>
                <label className="block">
                  <span className="text-sm text-ink-muted">Assistant tone</span>
                  <select className="mt-1.5 h-10 w-full rounded-lg border border-surface-border px-3 text-sm outline-none">
                    <option>Strategic & concise</option>
                    <option>Detailed & analytical</option>
                    <option>Creative & growth-focused</option>
                  </select>
                </label>
                <label className="flex items-center justify-between rounded-xl border border-surface-border p-4">
                  <span className="text-sm font-medium">
                    Use workspace data for recommendations
                  </span>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </label>
                <Button>Save preferences</Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
