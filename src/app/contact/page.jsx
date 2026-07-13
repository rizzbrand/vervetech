"use client";
import "./contact.css";
import { useState } from "react";
import Copy from "@/components/Copy/Copy";
import Footer from "@/components/Footer/Footer";
import ContactShapes from "./ContactShapes";

const focusAreas = [
  "SaaS",
  "AI & Automation",
  "Software Development",
  "Cloud Solutions",
  "Digital Transformation",
  "Product Development",
  "Emerging Technology",
];

const initialForm = {
  name: "",
  email: "",
  company: "",
  message: "",
};

const Page = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setForm(initialForm);
  };

  return (
    <div className="contact-page">
      <ContactShapes />

      <section className="contact-hero">
        <div className="container">
          <Copy delay={0.8}>
            <p className="contact-eyebrow">Contact</p>
            <h1>Ready to build what&apos;s next?</h1>
            <p className="lg">
              Tell us about your business, your goals, and where technology
              should create leverage — we&apos;ll follow up with a clear next
              step.
            </p>
          </Copy>
        </div>
      </section>

      <section className="contact-main">
        <div className="container contact-layout">
          <div className="contact-form-panel">
            <Copy animateOnScroll={true}>
              <h2>Start a conversation</h2>
              <p className="contact-form-intro">
                Share a short brief. The more context you give us, the faster we
                can respond with something useful.
              </p>
            </Copy>

            {status === "success" ? (
              <div className="contact-success" role="status">
                <h3>Message received</h3>
                <p>
                  Thanks for reaching out. We&apos;ll review your note and get
                  back to you shortly.
                </p>
                <button
                  type="button"
                  className="contact-success-reset"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form-row">
                  <label className="contact-field">
                    <span>Name</span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label className="contact-field">
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      autoComplete="email"
                      required
                    />
                  </label>
                </div>

                <label className="contact-field">
                  <span>Company</span>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Organization or project"
                    autoComplete="organization"
                  />
                </label>

                <label className="contact-field">
                  <span>How can we help?</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what you're building, the problem you're solving, and any timeline that matters."
                    rows={6}
                    required
                  />
                </label>

                {status === "error" && (
                  <p className="contact-form-error" role="alert">
                    Please add your name, email, and a short message.
                  </p>
                )}

                <button type="submit" className="contact-submit">
                  Send message
                </button>
              </form>
            )}
          </div>

          <aside className="contact-info-panel">
            <div className="contact-info-block">
              <p className="contact-info-label">Email</p>
              <a
                href="mailto:hello@skylandtechnology.com"
                className="contact-email"
              >
                hello@skylandtechnology.com
              </a>
              <p className="contact-info-note">
                Prefer email? Reach us directly and we&apos;ll reply within 1–2
                business days.
              </p>
            </div>

            <div className="contact-info-block">
              <p className="contact-info-label">Base</p>
              <p className="contact-info-value">Accra, GH</p>
            </div>

            <div className="contact-info-block">
              <p className="contact-info-label">Focus</p>
              <ul className="contact-focus-list">
                {focusAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>

            <div className="contact-info-block">
              <p className="contact-info-label">Social</p>
              <div className="contact-socials">
                <a
                  href="https://www.instagram.com/codegridweb/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a
                  href="https://www.youtube.com/@codegrid"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
                <a
                  href="https://x.com/codegridweb"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
