"use client";
import "./discovery.css";
import { useMemo, useState } from "react";
import { useViewTransition } from "@/hooks/useViewTransition";

const STEPS = [
  {
    id: "you",
    title: "About you",
    description: "Tell us who you are so we know how to reach you.",
  },
  {
    id: "organization",
    title: "Your organization",
    description: "A bit of context on the team or institution you represent.",
  },
  {
    id: "project",
    title: "What you're building",
    description: "Help us understand the opportunity and where you need support.",
  },
];

const ORG_TYPES = [
  "Business / Startup",
  "Scaleup",
  "Enterprise",
  "Government",
  "NGO / Nonprofit",
  "Other",
];

const HELP_OPTIONS = [
  "AI & Automation",
  "SaaS / Product build",
  "Digital transformation",
  "Website / Platform",
  "Marketing / Sales systems",
  "Not sure yet",
];

const initialForm = {
  name: "",
  email: "",
  role: "",
  organization: "",
  orgType: "",
  website: "",
  helpWith: "",
  timeline: "",
  message: "",
};

const DiscoveryPage = () => {
  const { navigateWithTransition } = useViewTransition();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const progress = useMemo(
    () => ((step + 1) / STEPS.length) * 100,
    [step]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const validateStep = () => {
    if (step === 0) {
      if (!form.name.trim() || !form.email.trim()) {
        setError("Please add your name and email to continue.");
        return false;
      }
    }

    if (step === 1) {
      if (!form.organization.trim() || !form.orgType) {
        setError("Please add your organization and type to continue.");
        return false;
      }
    }

    if (step === 2) {
      if (!form.helpWith || !form.message.trim()) {
        setError("Please choose what you need help with and add a short note.");
        return false;
      }
    }

    setError("");
    return true;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setError("");
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateStep()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="discovery-page">
        <div className="container discovery-shell">
          <div className="discovery-success">
            <p className="discovery-eyebrow">Discovery received</p>
            <h1>Thanks, {form.name.split(" ")[0] || "there"}.</h1>
            <p className="lg">
              We&apos;ve captured your details and will review them shortly. If
              anything urgent comes up, email us at{" "}
              <a href="mailto:hello@skylandtechnology.com">
                hello@skylandtechnology.com
              </a>
              .
            </p>
            <div className="discovery-success-actions">
              <button
                type="button"
                className="discovery-btn discovery-btn--primary"
                onClick={() => navigateWithTransition("/")}
              >
                Back to home
              </button>
              <button
                type="button"
                className="discovery-btn discovery-btn--ghost"
                onClick={() => navigateWithTransition("/contact")}
              >
                Contact page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const current = STEPS[step];

  return (
    <div className="discovery-page">
      <div className="container discovery-shell">
        <div className="discovery-progress" aria-hidden="true">
          <div
            className="discovery-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="discovery-meta">
          <p className="discovery-eyebrow">
            Step {step + 1} of {STEPS.length}
          </p>
          <div className="discovery-steps">
            {STEPS.map((item, index) => (
              <span
                key={item.id}
                className={`discovery-step-dot${
                  index === step ? " discovery-step-dot--active" : ""
                }${index < step ? " discovery-step-dot--done" : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="discovery-header">
          <h1>{current.title}</h1>
          <p className="lg">{current.description}</p>
        </div>

        <form className="discovery-form" onSubmit={handleSubmit} noValidate>
          {step === 0 && (
            <div className="discovery-fields">
              <label className="discovery-field">
                <span>Full name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ada Okonkwo"
                  autoComplete="name"
                  required
                />
              </label>

              <label className="discovery-field">
                <span>Work email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ada@company.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="discovery-field">
                <span>Your role</span>
                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="Founder, CTO, Program lead..."
                  autoComplete="organization-title"
                />
              </label>
            </div>
          )}

          {step === 1 && (
            <div className="discovery-fields">
              <label className="discovery-field">
                <span>Organization</span>
                <input
                  type="text"
                  name="organization"
                  value={form.organization}
                  onChange={handleChange}
                  placeholder="Company, ministry, NGO..."
                  autoComplete="organization"
                  required
                />
              </label>

              <label className="discovery-field">
                <span>Organization type</span>
                <select
                  name="orgType"
                  value={form.orgType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select one</option>
                  {ORG_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="discovery-field">
                <span>Website</span>
                <input
                  type="url"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://"
                  autoComplete="url"
                />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="discovery-fields">
              <label className="discovery-field">
                <span>What do you need help with?</span>
                <select
                  name="helpWith"
                  value={form.helpWith}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select one</option>
                  {HELP_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="discovery-field">
                <span>Timeline</span>
                <select
                  name="timeline"
                  value={form.timeline}
                  onChange={handleChange}
                >
                  <option value="">Select one</option>
                  <option value="ASAP">ASAP</option>
                  <option value="1-3 months">1–3 months</option>
                  <option value="3-6 months">3–6 months</option>
                  <option value="Exploring">Just exploring</option>
                </select>
              </label>

              <label className="discovery-field">
                <span>Tell us more</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="What are you trying to achieve, and where are things stuck today?"
                  required
                />
              </label>
            </div>
          )}

          {error && (
            <p className="discovery-error" role="alert">
              {error}
            </p>
          )}

          <div className="discovery-actions">
            {step > 0 ? (
              <button
                type="button"
                className="discovery-btn discovery-btn--ghost"
                onClick={goBack}
              >
                Back
              </button>
            ) : (
              <button
                type="button"
                className="discovery-btn discovery-btn--ghost"
                onClick={() => navigateWithTransition("/")}
              >
                Cancel
              </button>
            )}

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                className="discovery-btn discovery-btn--primary"
                onClick={goNext}
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="discovery-btn discovery-btn--primary"
              >
                Submit discovery
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiscoveryPage;
