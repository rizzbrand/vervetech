"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
  User,
  Zap,
} from "lucide-react";
import { Button } from "@/dashboard/components/ui";
import { WorkspacePicker } from "./WorkspacePicker";
import { DashboardSwitcher } from "./DashboardSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function TopNav({ onMenuClick }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 shrink-0 bg-surface-muted">
      <div className="relative flex h-12 items-center gap-3 px-4">
        <div className="absolute left-1/2 top-1/2 hidden w-full max-w-md -translate-x-1/2 -translate-y-1/2 sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" />
          <input
            type="search"
            placeholder="Search tasks, customers, apps..."
            className="h-8 w-full rounded-lg border border-surface-border bg-surface pl-9 pr-16 text-sm text-ink outline-none transition focus:border-ink/20 focus:ring-2 focus:ring-ink/10"
          />
          <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-surface-border bg-surface-muted px-1.5 py-0.5 text-[10px] font-medium text-ink-faint">
            ⌘K
          </kbd>
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-2">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-muted hover:bg-surface md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="hidden min-w-0 items-center gap-2 md:flex">
            <WorkspacePicker className="w-[220px]" />
            <DashboardSwitcher />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-1.5">
          <div className="md:hidden">
            <DashboardSwitcher />
          </div>
          <div className="relative hidden sm:block">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCreateOpen((v) => !v)}
              className="h-8 rounded-lg border-surface-border bg-surface text-ink hover:bg-surface-muted"
            >
              <Plus className="h-3.5 w-3.5" />
              Create
              <ChevronDown className="h-3 w-3 opacity-60" />
            </Button>
            {createOpen && (
              <div className="absolute right-0 top-full z-50 mt-1.5 w-44 rounded-xl border border-surface-border bg-surface p-1 shadow-card">
                {["Customer", "Invoice", "Campaign", "Task"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="flex w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-surface-muted"
                    onClick={() => setCreateOpen(false)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/dashboard/ai">
            <button
              type="button"
              className="hidden h-8 items-center gap-1.5 rounded-lg border border-surface-border px-2.5 text-xs font-medium text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink sm:inline-flex"
            >
              <Sparkles className="h-3.5 w-3.5 text-ink-muted" />
              Brain
            </button>
          </Link>

          <button
            type="button"
            className="hidden h-8 items-center gap-1.5 rounded-lg border border-surface-border px-2.5 text-xs font-medium text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink lg:inline-flex"
          >
            <Zap className="h-3.5 w-3.5" />
            Automate
          </button>

          <ThemeToggle />

          <button
            type="button"
            className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-muted"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-ink" />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((v) => !v)}
              className="flex h-8 items-center gap-2 rounded-lg px-1.5 hover:bg-surface-muted"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-surface">
                D
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full z-50 mt-1.5 w-52 rounded-xl border border-surface-border bg-surface p-1 shadow-card">
                <div className="border-b border-surface-border px-3 py-2.5">
                  <p className="text-sm font-medium">Divine</p>
                  <p className="text-xs text-ink-muted">divine@rizzbrand.com</p>
                </div>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-surface-muted"
                  onClick={() => setProfileOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-surface-muted"
                  onClick={() => setProfileOpen(false)}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  onClick={() => setProfileOpen(false)}
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
