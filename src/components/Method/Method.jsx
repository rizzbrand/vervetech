"use client";
import "./Method.css";
import Copy from "@/components/Copy/Copy";

const phases = [
  {
    letter: "A",
    title: "Assess",
    summary: "Understand the business before recommending technology.",
    points: [
      "Business model & revenue streams",
      "Operations & current software",
      "AI readiness & digital maturity",
      "Marketing, sales, finance, HR",
    ],
    deliverable: "Business & AI Assessment Report",
    tone: "assess",
  },
  {
    letter: "I",
    title: "Innovate",
    summary: "Design the right technology stack.",
    points: [
      "AI strategy & roadmap",
      "Process redesign & automation",
      "SaaS architecture",
      "Data strategy & CX improvements",
    ],
    deliverable: "AI & Digital Transformation Blueprint",
    tone: "innovate",
  },
  {
    letter: "M",
    title: "Make",
    summary: "Build and implement the solutions.",
    points: [
      "AI chatbots, agents & analytics",
      "SaaS, CRM, ERP, HR systems",
      "Mobile apps, web & APIs",
      "Workflow & marketing automation",
    ],
    deliverable: "Deployed, Integrated Solutions",
    tone: "make",
  },
  {
    letter: "S",
    title: "Scale",
    summary: "Help clients continuously improve.",
    points: [
      "Digital marketing & paid ads",
      "SEO & conversion optimization",
      "AI performance optimization",
      "Monthly reviews & KPI reporting",
    ],
    deliverable: "Sustained Growth & Optimization",
    tone: "scale",
  },
];

const Method = () => {
  return (
    <section className="method">
      <div className="container">
        <div className="method-header">
          <Copy animateOnScroll={true}>
            <h2>
              Assess. Innovate. Make.{" "}
              <span className="method-emphasis">Scale.</span>
            </h2>
            <p>
              Every engagement follows a proven four-phase methodology that
              ensures technology serves business outcomes — not the other way
              around.
            </p>
          </Copy>
        </div>

        <div className="method-grid">
          {phases.map((phase, index) => (
            <article
              className={`method-phase method-phase--${phase.tone}`}
              key={phase.title}
            >
              <div className="method-phase-top">
                <span className="method-phase-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="method-phase-letter" aria-hidden>
                  {phase.letter}
                </span>
              </div>

              <Copy animateOnScroll={true}>
                <h3>{phase.title}</h3>
                <p className="method-phase-summary">{phase.summary}</p>
              </Copy>

              <ul className="method-phase-list">
                {phase.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <p className="method-phase-deliverable">{phase.deliverable}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Method;
