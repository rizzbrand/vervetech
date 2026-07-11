"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Package,
  Plus,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/dashboard/lib/cn";
import { useDashboard } from "@/dashboard/context/DashboardContext";
import { AppIcon } from "@/dashboard/lib/icons";

const scaleHomeNav = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Agents", href: "/dashboard/ai", icon: Bot },
];

const buildHomeNav = [
  { label: "Launchpad", href: "/dashboard/build", icon: LayoutDashboard },
  { label: "Agents", href: "/dashboard/ai", icon: Bot },
];

function NavLink({ item, onNavigate }) {
  const pathname = usePathname();
  const isActive =
    item.href === "/dashboard" || item.href === "/dashboard/build"
      ? pathname === item.href
      : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors",
        isActive
          ? "bg-surface-muted text-ink"
          : "text-ink-muted hover:bg-surface-muted/70 hover:text-ink"
      )}
    >
      <item.icon className="h-4 w-4 shrink-0 opacity-70" />
      {item.label}
    </Link>
  );
}

function InstalledAppNav({ app, onNavigate }) {
  const pathname = usePathname();
  const detailRoute = `/dashboard/apps/${app.slug}`;
  const isActive =
    pathname.startsWith(app.route) || pathname.startsWith(detailRoute);
  const [expanded, setExpanded] = useState(isActive || true);

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13px] font-medium transition-colors",
          isActive ? "bg-surface-muted text-ink" : "text-ink hover:bg-surface-muted/70"
        )}
      >
        <span
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded text-white",
            app.color
          )}
        >
          <AppIcon name={app.icon} className="h-3 w-3" />
        </span>
        <span className="flex-1 truncate">{app.sidebarLabel}</span>
        {expanded ? (
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
        )}
      </button>

      {expanded && app.menu && (
        <div className="ml-3 mt-0.5 space-y-0.5 border-l border-surface-border pl-3">
          {app.menu.map((item) => {
            const subActive = pathname === item.href;
            return (
              <Link
                key={`${app.id}-${item.label}`}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "block rounded-md px-2 py-1.5 text-[13px] transition-colors",
                  subActive
                    ? "bg-surface-muted font-medium text-ink"
                    : "text-ink-muted hover:bg-surface-muted hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SidebarContent({ onClose, showMobileHeader = false }) {
  const { installedApps, isBuildPath } = useDashboard();
  const homeNav = isBuildPath ? buildHomeNav : scaleHomeNav;

  return (
    <div className="flex h-full min-h-0 flex-col bg-surface">
      {showMobileHeader && (
        <div className="flex shrink-0 items-center justify-between border-b border-surface-border px-4 py-3">
          <span className="text-sm font-semibold">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-surface-muted"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="shrink-0 border-b border-surface-border px-3 py-3 md:hidden">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left hover:bg-surface-muted"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">
              Rizzbrand Technologies
            </p>
            <p className="text-[11px] text-ink-muted">Business workspace</p>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 text-ink-faint" />
        </button>
      </div>

      <div className="shrink-0 px-3 py-3">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-3 py-2 text-sm font-medium text-surface transition-colors hover:bg-accent-hover"
        >
          <Plus className="h-4 w-4" />
          Create
        </button>
      </div>

      <div
        role="navigation"
        aria-label="Workspace navigation"
        className="dashboard-sidebar-nav dashboard-scrollbar px-2"
      >
        <p className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
          {isBuildPath ? "Build" : "Home"}
        </p>
        <div className="space-y-0.5">
          {homeNav.map((item) => (
            <NavLink key={item.href} item={item} onNavigate={onClose} />
          ))}
          <NavLink
            item={{
              label: isBuildPath ? "Tools" : "Business Apps",
              href: isBuildPath ? "/dashboard/apps?category=Build" : "/dashboard/apps",
              icon: Package,
            }}
            onNavigate={onClose}
          />
          <NavLink
            item={{ label: "Settings", href: "/dashboard/settings", icon: Settings }}
            onNavigate={onClose}
          />
        </div>

        <div className="mt-5">
          <p className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
            Installed Apps
          </p>
          {installedApps.length > 0 ? (
            <div className="space-y-1">
              {installedApps.map((app) => (
                <InstalledAppNav
                  key={app.id}
                  app={app}
                  onNavigate={onClose}
                />
              ))}
            </div>
          ) : (
            <Link
              href="/dashboard/apps"
              onClick={onClose}
              className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
            >
              <Package className="h-4 w-4" />
              Browse marketplace
            </Link>
          )}
        </div>
      </div>

      <div className="mt-auto shrink-0 space-y-2 border-t border-surface-border p-3">
        <Link
          href="/dashboard/ai"
          className="flex items-center gap-2 rounded-lg bg-surface-muted px-3 py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-surface-hover"
        >
          <Sparkles className="h-4 w-4 text-ink-muted" />
          AI Business Score: 82
        </Link>
      </div>
    </div>
  );
}

export function Sidebar({ open, onClose }) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <>
      <div className="dashboard-sidebar-wrap">
        <aside className="dashboard-sidebar">
          <SidebarContent onClose={onClose} />
        </aside>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            aria-label="Close overlay"
          />
          <aside className="dashboard-sidebar absolute inset-y-0 left-0 z-10 flex h-full w-[min(85vw,20rem)] flex-col rounded-r-2xl border-l-0 shadow-card">
            <SidebarContent onClose={onClose} showMobileHeader />
          </aside>
        </div>
      )}
    </>
  );
}
