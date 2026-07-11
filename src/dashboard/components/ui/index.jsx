import { cn } from "@/dashboard/lib/cn";

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-surface-border bg-surface shadow-soft",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return (
    <div className={cn("border-b border-surface-border px-5 py-4", className)}>
      {children}
    </div>
  );
}

export function CardBody({ className, children }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}

export function Badge({ children, variant = "default", className }) {
  const variants = {
    default: "bg-surface-muted text-ink-muted",
    success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
    warning: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
    danger: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
    accent: "bg-surface-muted text-ink",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  const variants = {
    primary: "bg-ink text-surface hover:bg-accent-hover",
    secondary:
      "border border-surface-border bg-surface text-ink hover:bg-surface-muted",
    ghost: "text-ink-muted hover:bg-surface-muted hover:text-ink",
    accent: "bg-ink text-surface hover:bg-accent-hover",
    violet: "bg-violet-600 text-white hover:bg-violet-700",
    installed:
      "border border-emerald-200 bg-emerald-50 text-emerald-700 cursor-default dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-9 px-4 text-sm",
    lg: "h-10 px-5 text-sm",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function StatCard({ label, value, change, trend, icon: Icon }) {
  const trendColor =
    trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-500" : "text-ink-muted";

  return (
    <Card className="group p-4 transition-shadow hover:shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
            {label}
          </p>
          <p className="mt-1.5 text-2xl font-semibold tracking-tight text-ink">
            {value}
          </p>
          {change && (
            <p className={cn("mt-1 text-xs font-medium", trendColor)}>{change}</p>
          )}
        </div>
        {Icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted transition-colors group-hover:bg-surface-hover">
            <Icon className="h-4 w-4 text-ink-muted group-hover:text-ink" />
          </div>
        )}
      </div>
    </Card>
  );
}

export function PageHeader({ title, description, action }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink normal-case sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function SectionTitle({ children, action }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-ink">{children}</h2>
      {action}
    </div>
  );
}

export function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-surface-border bg-surface px-6 py-12 text-center">
      <p className="text-sm font-medium text-ink">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-ink-muted">{description}</p>
    </div>
  );
}

export function DataTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-surface-border text-xs uppercase tracking-wide text-ink-faint">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-surface-border/70 last:border-0 hover:bg-surface-muted/60"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3.5 text-ink">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1 text-ink-muted">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < Math.floor(rating) ? "opacity-100" : "opacity-25"}>
          ★
        </span>
      ))}
      <span className="ml-1 text-xs text-ink-muted">{rating}</span>
    </div>
  );
}
