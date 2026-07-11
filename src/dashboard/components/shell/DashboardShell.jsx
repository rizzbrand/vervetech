"use client";

import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";
import { useDashboard } from "@/dashboard/context/DashboardContext";

export function DashboardShell({ children }) {
  const { sidebarOpen, setSidebarOpen } = useDashboard();

  return (
    <div className="dashboard-root">
      <div className="flex h-screen overflow-hidden bg-surface-muted">
        <div className="flex min-w-0 flex-1 flex-col">
          <TopNav onMenuClick={() => setSidebarOpen(true)} />

          <div className="flex min-h-0 flex-1">
            <div className="hidden w-60 shrink-0 flex-col min-h-0 md:flex">
              <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
            </div>

            <main className="dashboard-main dashboard-scrollbar min-w-0 flex-1">
              <div className="mx-auto max-w-[1400px] px-5 py-5 lg:px-8 lg:py-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
