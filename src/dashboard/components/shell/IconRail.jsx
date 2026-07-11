"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, LayoutDashboard, Package, Settings } from "lucide-react";
import { cn } from "@/dashboard/lib/cn";
import { useDashboard } from "@/dashboard/context/DashboardContext";

const scaleItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "AI", href: "/dashboard/ai", icon: Bot },
  { label: "Apps", href: "/dashboard/apps", icon: Package },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const buildItems = [
  { label: "Launchpad", href: "/dashboard/build", icon: LayoutDashboard },
  { label: "AI", href: "/dashboard/ai", icon: Bot },
  { label: "Apps", href: "/dashboard/apps?category=Build", icon: Package },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function IconRail() {
  const pathname = usePathname();
  const { isBuildPath } = useDashboard();
  const items = isBuildPath ? buildItems : scaleItems;
  const homeHref = isBuildPath ? "/dashboard/build" : "/dashboard";

  return (
    <div className="dashboard-icon-rail-wrap">
      <aside className="dashboard-icon-rail">
        <Link
          href={homeHref}
          className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-xs font-bold text-white"
          title="Rizzbrand OS"
        >
          R
        </Link>

        <nav className="flex flex-1 flex-col items-center gap-1" aria-label="Quick navigation">
          {items.map((item) => {
            const isActive =
              item.href === "/dashboard" || item.href === "/dashboard/build"
                ? pathname === item.href
                : pathname.startsWith(item.href.split("?")[0]);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={cn(
                  "group relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                  isActive
                    ? "bg-surface-muted text-ink"
                    : "text-ink-faint hover:bg-surface-muted hover:text-ink"
                )}
              >
                <item.icon className="h-[18px] w-[18px]" />
                {isActive && (
                  <span className="absolute -left-px h-5 w-0.5 rounded-full bg-ink" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex h-9 w-9 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
          D
        </div>
      </aside>
    </div>
  );
}
