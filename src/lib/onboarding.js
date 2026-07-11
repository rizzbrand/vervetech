import { businessApps } from "@/dashboard/data/businessApps";

export const STORAGE_KEYS = {
  userPath: "rizzbrand-user-path",
  selectedTemplate: "rizzbrand-selected-template",
  onboardingComplete: "rizzbrand-onboarding-complete",
  installedAppsByPath: "rizzbrand-installed-apps-by-path",
};

const LEGACY_APPS_STORAGE_KEY = "rizzbrand-installed-apps";

export const USER_PATHS = {
  BUILD: "build",
  SCALE: "scale",
};

export const BUILD_DEFAULT_APPS = [
  "website-builder",
  "brand-studio",
  "doc-generator",
];

export const SCALE_DEFAULT_APPS = [
  "crm-pro",
  "marketing-suite",
  "finance-hub",
];

const BUILD_APP_IDS = new Set(
  businessApps.filter((app) => app.category === "Build").map((app) => app.id)
);

function getDefaultAppsForPath(path) {
  return path === USER_PATHS.BUILD ? BUILD_DEFAULT_APPS : SCALE_DEFAULT_APPS;
}

function withDefaultApps(path, appIds = []) {
  const defaults = getDefaultAppsForPath(path);
  return [...new Set([...appIds, ...defaults])];
}

function readInstalledAppsStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.installedAppsByPath);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    return {
      [USER_PATHS.BUILD]: Array.isArray(parsed[USER_PATHS.BUILD])
        ? parsed[USER_PATHS.BUILD]
        : [],
      [USER_PATHS.SCALE]: Array.isArray(parsed[USER_PATHS.SCALE])
        ? parsed[USER_PATHS.SCALE]
        : [],
    };
  } catch {
    return null;
  }
}

function writeInstalledAppsStore(store) {
  localStorage.setItem(
    STORAGE_KEYS.installedAppsByPath,
    JSON.stringify({
      [USER_PATHS.BUILD]: withDefaultApps(USER_PATHS.BUILD, store[USER_PATHS.BUILD]),
      [USER_PATHS.SCALE]: withDefaultApps(USER_PATHS.SCALE, store[USER_PATHS.SCALE]),
    })
  );
}

function migrateLegacyInstalledApps() {
  if (readInstalledAppsStore()) {
    localStorage.removeItem(LEGACY_APPS_STORAGE_KEY);
    return;
  }

  try {
    const legacyRaw = localStorage.getItem(LEGACY_APPS_STORAGE_KEY);
    if (!legacyRaw) return;

    const legacyApps = JSON.parse(legacyRaw);
    if (!Array.isArray(legacyApps)) return;

    const buildApps = legacyApps.filter((id) => BUILD_APP_IDS.has(id));
    const scaleApps = legacyApps.filter((id) => !BUILD_APP_IDS.has(id));

    writeInstalledAppsStore({
      [USER_PATHS.BUILD]: buildApps,
      [USER_PATHS.SCALE]: scaleApps,
    });
    localStorage.removeItem(LEGACY_APPS_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function getInstalledAppIdsForPath(path) {
  migrateLegacyInstalledApps();

  const store = readInstalledAppsStore();
  if (!store) {
    return withDefaultApps(path);
  }

  return withDefaultApps(path, store[path] || []);
}

export function setInstalledAppIdsForPath(path, appIds) {
  migrateLegacyInstalledApps();

  const store = readInstalledAppsStore() || {
    [USER_PATHS.BUILD]: [],
    [USER_PATHS.SCALE]: [],
  };

  store[path] = withDefaultApps(path, appIds);
  writeInstalledAppsStore(store);
}

export function getStoredUserPath() {
  if (typeof window === "undefined") return null;
  try {
    const path = localStorage.getItem(STORAGE_KEYS.userPath);
    return path === USER_PATHS.BUILD || path === USER_PATHS.SCALE ? path : null;
  } catch {
    return null;
  }
}

export function getStoredSelectedTemplate() {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEYS.selectedTemplate);
  } catch {
    return null;
  }
}

export function isOnboardingComplete() {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEYS.onboardingComplete) === "true";
  } catch {
    return false;
  }
}

export function persistOnboardingChoice(path, options = {}) {
  const { templateSlug, installedAppIds = [] } = options;

  localStorage.setItem(STORAGE_KEYS.userPath, path);
  localStorage.setItem(STORAGE_KEYS.onboardingComplete, "true");

  if (templateSlug) {
    localStorage.setItem(STORAGE_KEYS.selectedTemplate, templateSlug);
  } else {
    localStorage.removeItem(STORAGE_KEYS.selectedTemplate);
  }

  setInstalledAppIdsForPath(path, installedAppIds);
  return getInstalledAppIdsForPath(path);
}

export function getOnboardingRedirect(path, templateSlug) {
  if (path === USER_PATHS.BUILD) {
    return templateSlug
      ? `/dashboard/build/${templateSlug}`
      : "/dashboard/build";
  }
  return "/dashboard";
}

export function switchUserPath(path, currentPath, currentInstalledAppIds = []) {
  if (currentPath) {
    setInstalledAppIdsForPath(currentPath, currentInstalledAppIds);
  }

  localStorage.setItem(STORAGE_KEYS.userPath, path);

  if (path === USER_PATHS.SCALE) {
    localStorage.removeItem(STORAGE_KEYS.selectedTemplate);
  }

  return getInstalledAppIdsForPath(path);
}
