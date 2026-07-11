"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, LayoutDashboard, Package, Settings } from "lucide-react";
import { useDashboard } from "@/dashboard/context/DashboardContext";
import { cn } from "@/dashboard/lib/cn";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { isBuildPath } = useDashboard();

  const items = isBuildPath
    ? [
        { label: "Launchpad", href: "/dashboard/build", icon: LayoutDashboard },
        { label: "Agents", href: "/dashboard/ai", icon: Bot },
        {
          label: "Tools",
          href: "/dashboard/apps?category=Build",
          icon: Package,
        },
        { label: "Settings", href: "/dashboard/settings", icon: Settings },
      ]
    : [
        { label: "Home", href: "/dashboard", icon: LayoutDashboard },
        { label: "Agents", href: "/dashboard/ai", icon: Bot },
        { label: "Apps", href: "/dashboard/apps", icon: Package },
        { label: "Settings", href: "/dashboard/settings", icon: Settings },
      ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-surface-border bg-surface/95 backdrop-blur-md md:hidden"
      aria-label="Mobile dashboard navigation"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="grid h-14 grid-cols-4">
        {items.map((item) => {
          const isActive =
            item.href === "/dashboard" || item.href === "/dashboard/build"
              ? pathname === item.href
              : pathname.startsWith(item.href.split("?")[0]);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 px-1 text-[10px] font-medium transition-colors",
                isActive ? "text-ink" : "text-ink-muted"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4",
                  isActive ? "text-ink" : "text-ink-faint"
                )}
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
