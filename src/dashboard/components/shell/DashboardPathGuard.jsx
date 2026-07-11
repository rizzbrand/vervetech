"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDashboard } from "@/dashboard/context/DashboardContext";
import { USER_PATHS } from "@/lib/onboarding";

const SCALE_ONLY_PREFIXES = ["/dashboard/crm", "/dashboard/marketing", "/dashboard/finance"];

export function DashboardPathGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const { userPath, isLoaded, onboardingComplete } = useDashboard();

  useEffect(() => {
    if (!isLoaded || !onboardingComplete || !userPath) return;

    if (userPath === USER_PATHS.BUILD) {
      const isBuildHome = pathname === "/dashboard";
      const isBuildArea = pathname.startsWith("/dashboard/build");

      if (isBuildHome) {
        router.replace("/dashboard/build");
        return;
      }

      const isScaleOnly = SCALE_ONLY_PREFIXES.some((prefix) =>
        pathname.startsWith(prefix)
      );

      if (isScaleOnly) {
        router.replace("/dashboard/build");
      }

      return;
    }

    if (userPath === USER_PATHS.SCALE && pathname.startsWith("/dashboard/build")) {
      router.replace("/dashboard");
    }
  }, [isLoaded, onboardingComplete, userPath, pathname, router]);

  return null;
}
