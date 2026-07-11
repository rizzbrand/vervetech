import { businessApps } from "@/dashboard/data/businessApps";
import AppDetailClient from "./AppDetailClient";

export function generateStaticParams() {
  return businessApps.map((app) => ({ slug: app.slug }));
}

export default function AppDetailPage() {
  return <AppDetailClient />;
}
