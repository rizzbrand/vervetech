"use client";

import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { useDashboard } from "@/dashboard/context/DashboardContext";

export function DashboardShell({ children }) {
  const { sidebarOpen, setSidebarOpen } = useDashboard();

  return (
    <div className="dashboard-root">
      <div className="flex h-dvh flex-col overflow-hidden bg-surface-muted">
        <TopNav onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex min-h-0 flex-1">
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <main className="dashboard-main dashboard-scrollbar min-w-0 flex-1 pb-16 md:pb-0">
            <div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-6">
              {children}
            </div>
          </main>
        </div>

        <MobileBottomNav />
      </div>
    </div>
  );
}
