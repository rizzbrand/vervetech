"use client";

import { DashboardProvider } from "@/dashboard/context/DashboardContext";
import { ThemeProvider } from "@/dashboard/context/ThemeContext";
import { DashboardShell } from "@/dashboard/components/shell/DashboardShell";
import { DashboardPathGuard } from "@/dashboard/components/shell/DashboardPathGuard";

export function DashboardLayoutClient({ children }) {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <DashboardPathGuard />
        <DashboardShell>{children}</DashboardShell>
      </DashboardProvider>
    </ThemeProvider>
  );
}
