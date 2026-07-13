"use client";
import "./studio.css";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import { useViewTransition } from "@/hooks/useViewTransition";

const focusAreas = [
  "AI & Automation",
  "SaaS Products",
  "Software Development",
  "Cloud Solutions",
  "Digital Transformation",
];

const principles = [
  {
    label: "Vision",
    title: "Technology that compounds progress",
    body: "We envision a world where organizations across Africa and beyond can use intelligent systems to deliver better services, unlock growth, and create lasting impact — without drowning in complexity.",
  },
  {
    label: "Mission",
    title: "Turn ambition into working systems",
    body: "Our mission is to help businesses, governments, NGOs, and nonprofits assess what matters, design the right stack, build it well, and scale with measurable outcomes.",
  },
];

const evolution = [
  {
    phase: "01",
    title: "Foundation",
    body: "We started by helping teams ship clearer products — branding, SaaS foundations, and digital experiences that made early ideas feel real.",
  },
  {
    phase: "02",
    title: "Expansion",
    body: "As clients grew, so did the work: AI, automation, platforms, and go-to-market systems for startups, scaleups, and industry operators.",
  },
  {
    phase: "03",
    title: "Transformation",
    body: "Today we partner end-to-end — from business assessment to deployed software and ongoing optimization — as a transformation partner, not just a vendor.",
  },
];

const Page = () => {
  const { navigateWithTransition } = useViewTransition();

  return (
    <div className="studio-page">
      <section className="studio-hero">
        <div className="container">
          <Copy delay={0.8}>
            <p className="studio-eyebrow">About</p>
            <h1>We build systems that help organizations move forward</h1>
            <p className="lg">
              Sky Land Technology partners with businesses, governments, NGOs,
              and nonprofits to design and ship AI, SaaS, automation, and
              digital transformation products that solve real operational
              problems.
            </p>
          </Copy>
        </div>
      </section>

      <section className="studio-story">
        <div className="container studio-story-grid">
          <div className="studio-story-media">
            <img
              src="/studio/studio-header.jpg"
              alt="Sky Land Technology studio"
            />
          </div>

          <div className="studio-story-copy">
            <Copy animateOnScroll={true}>
              <h2>Technology with a business outcome</h2>
              <p>
                We don&apos;t start with tools — we start with the outcome. Every
                engagement is shaped around revenue, efficiency, service
                delivery, or impact, then translated into software people can
                actually use.
              </p>
              <p>
                From strategy and product design to engineering and ongoing
                optimization, we stay close to the work until the system is
                live, adopted, and creating value.
              </p>
            </Copy>

            <div className="studio-focus">
              <p className="studio-focus-label">What we focus on</p>
              <ul className="studio-focus-list">
                {focusAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>

            <a
              href="/contact"
              className="studio-cta"
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition("/contact");
              }}
            >
              Talk to us
            </a>
          </div>
        </div>
      </section>

      <section className="studio-principles">
        <div className="container">
          <Copy animateOnScroll={true}>
            <p className="studio-section-label">Vision & Mission</p>
          </Copy>

          <div className="studio-principles-grid">
            {principles.map((item) => (
              <article className="studio-principle" key={item.label}>
                <Copy animateOnScroll={true}>
                  <p className="studio-principle-label">{item.label}</p>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </Copy>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-evolution">
        <div className="container">
          <div className="studio-evolution-header">
            <Copy animateOnScroll={true}>
              <p className="studio-section-label">The Evolution</p>
              <h2>How Sky Land has grown</h2>
              <p>
                From product craft to full-stack transformation — our work
                evolved with the organizations we serve.
              </p>
            </Copy>
          </div>

          <div className="studio-evolution-list">
            {evolution.map((item) => (
              <article className="studio-evolution-item" key={item.phase}>
                <span className="studio-evolution-phase">{item.phase}</span>
                <div className="studio-evolution-copy">
                  <Copy animateOnScroll={true}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </Copy>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
