"use client";
import "./Difference.css";
import Copy from "@/components/Copy/Copy";

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const differences = [
  {
    title: "Business-First, Not Tech-First",
    body: "We don't sell technology — we solve business problems. Every recommendation ties directly to revenue, cost, efficiency, or impact.",
    accent: "var(--accent-5)",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: "Full-Service Transformation",
    body: "From AI strategy to software development to digital marketing — one partner for the entire transformation journey.",
    accent: "var(--base-500)",
    icon: (
      <svg {...iconProps}>
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Measurable ROI",
    body: "Every engagement includes ROI estimates and KPI tracking. We prove value in numbers, not buzzwords.",
    accent: "#2f8f5b",
    icon: (
      <svg {...iconProps}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Pan-African Expertise",
    body: "Deep understanding of African markets, regulations, and business realities — with global-grade execution standards.",
    accent: "var(--accent-1)",
    icon: (
      <svg {...iconProps}>
        <path d="m3 17 6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
  },
  {
    title: "Adoption-Focused",
    body: "We don't just build — we train your teams, manage change, and ensure solutions are actually used and loved.",
    accent: "var(--accent-2)",
    icon: (
      <svg {...iconProps}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Recurring Value",
    body: "Monthly optimization, support subscriptions, and long-term partnerships — not one-off projects that gather dust.",
    accent: "#1f8a8a",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
];

const Difference = () => {
  return (
    <section className="difference">
      <div className="container">
        <div className="difference-header">
          <Copy animateOnScroll={true}>
            <h2>
              What makes us <span className="difference-emphasis">different</span>
            </h2>
            <p>
              We position Sky Land not as a technology vendor, but as your
              business transformation partner.
            </p>
          </Copy>
        </div>

        <div className="difference-grid">
          {differences.map((item) => (
            <article className="difference-item" key={item.title}>
              <span
                className="difference-icon"
                style={{ "--difference-accent": item.accent }}
              >
                {item.icon}
              </span>
              <Copy animateOnScroll={true}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Copy>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Difference;
