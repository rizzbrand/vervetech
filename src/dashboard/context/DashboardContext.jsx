"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAppById, getInstalledApps } from "@/dashboard/data/businessApps";
import {
  STORAGE_KEYS,
  USER_PATHS,
  persistOnboardingChoice,
  switchUserPath as persistUserPathSwitch,
  getInstalledAppIdsForPath,
  setInstalledAppIdsForPath,
  getStoredUserPath,
  getStoredSelectedTemplate,
  isOnboardingComplete,
} from "@/lib/onboarding";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [installedAppIds, setInstalledAppIds] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userPath, setUserPath] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    try {
      const path = getStoredUserPath();
      setUserPath(path);
      setSelectedTemplate(getStoredSelectedTemplate());
      setOnboardingComplete(isOnboardingComplete());

      if (path) {
        setInstalledAppIds(getInstalledAppIdsForPath(path));
      }
    } catch {
      /* ignore */
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded || !userPath) return;
    setInstalledAppIdsForPath(userPath, installedAppIds);
  }, [installedAppIds, isLoaded, userPath]);

  const completeOnboarding = (path, options = {}) => {
    const mergedApps = persistOnboardingChoice(path, {
      ...options,
      installedAppIds,
    });

    setUserPath(path);
    setOnboardingComplete(true);
    setInstalledAppIds(mergedApps);

    if (options.templateSlug) {
      setSelectedTemplate(options.templateSlug);
    } else if (path === USER_PATHS.SCALE) {
      setSelectedTemplate(null);
    }
  };

  const selectTemplate = (templateSlug) => {
    setSelectedTemplate(templateSlug);
    if (templateSlug) {
      localStorage.setItem(STORAGE_KEYS.selectedTemplate, templateSlug);
    } else {
      localStorage.removeItem(STORAGE_KEYS.selectedTemplate);
    }
  };

  const switchUserPath = (path) => {
    const mergedApps = persistUserPathSwitch(path, userPath, installedAppIds);
    setUserPath(path);
    setInstalledAppIds(mergedApps);

    if (path === USER_PATHS.SCALE) {
      setSelectedTemplate(null);
    }
  };

  const installApp = (appId) => {
    setInstalledAppIds((prev) =>
      prev.includes(appId) ? prev : [...prev, appId]
    );
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpen(true);
    }
  };

  const uninstallApp = (appId) => {
    setInstalledAppIds((prev) => prev.filter((id) => id !== appId));
  };

  const isInstalled = (appId) => installedAppIds.includes(appId);

  const installedApps = useMemo(
    () => getInstalledApps(installedAppIds),
    [installedAppIds]
  );

  const isBuildPath = userPath === USER_PATHS.BUILD;

  const value = {
    installedAppIds,
    installedApps,
    installApp,
    uninstallApp,
    isInstalled,
    getAppById,
    sidebarOpen,
    setSidebarOpen,
    isLoaded,
    userPath,
    selectedTemplate,
    onboardingComplete,
    isBuildPath,
    completeOnboarding,
    selectTemplate,
    switchUserPath,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
}
