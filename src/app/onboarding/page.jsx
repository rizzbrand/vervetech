"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Palette, TrendingUp } from "lucide-react";
import {
  USER_PATHS,
  getOnboardingRedirect,
  persistOnboardingChoice,
} from "@/lib/onboarding";
import "./onboarding.css";

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const templateSlug = searchParams.get("template");
  const intent = searchParams.get("intent");

  const handleChoose = (path) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const slug = path === USER_PATHS.BUILD ? templateSlug : null;
    persistOnboardingChoice(path, { templateSlug: slug });
    router.push(getOnboardingRedirect(path, slug));
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-inner">
        <div className="onboarding-header">
          <h1>How do you want to grow today?</h1>
          <p>
            Choose the workspace that fits where you are right now. You can
            always switch later — we&apos;ll tailor your dashboard, tools, and
            recommendations to match.
          </p>
        </div>

        <div className="onboarding-grid">
          <button
            type="button"
            className="onboarding-card onboarding-card--build"
            onClick={() => handleChoose(USER_PATHS.BUILD)}
            disabled={isSubmitting}
          >
            <span className="onboarding-card-badge onboarding-card-badge--build">
              For founders
            </span>
            <span className="onboarding-card-icon onboarding-card-icon--build">
              <Palette className="h-6 w-6" />
            </span>
            <h2>Build your brand</h2>
            <p className="onboarding-card-copy">
              Turn an idea into a real company. Pick a proven SaaS template,
              shape your brand with AI, and launch your site, docs, and identity
              — without starting from zero.
            </p>
            <ul className="onboarding-card-list">
              <li>Industry-ready templates for marketplaces, SaaS, and more</li>
              <li>AI website builder, brand studio, and document tools</li>
              <li>Launch faster with a focused build workspace</li>
            </ul>
            <span className="onboarding-card-cta">
              Start building
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>

          <button
            type="button"
            className="onboarding-card onboarding-card--scale"
            onClick={() => handleChoose(USER_PATHS.SCALE)}
            disabled={isSubmitting}
          >
            <span className="onboarding-card-badge onboarding-card-badge--scale">
              For operators
            </span>
            <span className="onboarding-card-icon onboarding-card-icon--scale">
              <TrendingUp className="h-6 w-6" />
            </span>
            <h2>Scale your company</h2>
            <p className="onboarding-card-copy">
              Run and grow an existing business. Get the full operating system —
              CRM, marketing, finance, AI agents, and analytics in one command
              center built for teams that are already in motion.
            </p>
            <ul className="onboarding-card-list">
              <li>CRM, pipeline, and customer management out of the box</li>
              <li>Marketing, finance, and operations apps in one place</li>
              <li>AI insights to spot risks and opportunities early</li>
            </ul>
            <span className="onboarding-card-cta">
              Open my dashboard
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </div>

        {intent === "build" && templateSlug && (
          <p className="onboarding-footer">
            You selected a template — choose <strong>Build your brand</strong> to
            continue with it.
          </p>
        )}

        <p className="onboarding-footer">
          Already have a workspace?{" "}
          <Link href="/dashboard">Go to dashboard</Link>
        </p>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="onboarding-page" />}>
      <OnboardingContent />
    </Suspense>
  );
}
