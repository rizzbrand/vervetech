import "@/dashboard/dashboard.css";
import { DashboardLayoutClient } from "@/dashboard/components/shell/DashboardLayoutClient";

const themeInitScript = `
try {
  if (localStorage.getItem("rizzbrand-dashboard-theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
} catch {}
`;

export const metadata = {
  title: "Dashboard | Rizzbrand OS",
  description: "AI-powered business operating system",
};

export default function DashboardLayout({ children }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </>
  );
}
