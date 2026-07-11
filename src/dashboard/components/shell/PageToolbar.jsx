import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/dashboard/lib/cn";

export function PageToolbar({
  breadcrumbs = [],
  title,
  description,
  tabs,
  activeTab,
  onTabChange,
  actions,
  className,
}) {
  return (
    <div className={cn("mb-6", className)}>
      {breadcrumbs.length > 0 && (
        <nav className="dashboard-scrollbar mb-2 flex items-center gap-1 overflow-x-auto whitespace-nowrap text-xs text-ink-muted">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.label} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3 text-ink-faint" />}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-ink">
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-medium text-ink">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {title && (
            <h1 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              {title}
            </h1>
          )}
          {description && (
            <p className="mt-1 max-w-2xl text-sm text-ink-muted">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto">
            {actions}
          </div>
        )}
      </div>

      {tabs && tabs.length > 0 && (
        <div className="dashboard-scrollbar mt-4 flex items-center gap-1 overflow-x-auto border-b border-surface-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange?.(tab.id)}
              className={cn(
                "relative shrink-0 px-3 py-2.5 text-sm font-medium transition-colors",
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
      )}
    </div>
  );
}
