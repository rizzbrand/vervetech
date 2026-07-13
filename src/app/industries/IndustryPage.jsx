"use client";
import "./industry.css";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import { useViewTransition } from "@/hooks/useViewTransition";
import { CapabilityIcon } from "./capabilityIcons";

const IndustryPage = ({ industry }) => {
  const { navigateWithTransition } = useViewTransition();

  return (
    <div className="industry-page">
      <section className="industry-hero">
        <div className="industry-hero-inner">
          <div className="industry-hero-content">
            <Copy delay={0.8}>
              <p className="industry-hero-eyebrow">{industry.title}</p>
              <h1>{industry.hero.headline}</h1>
              <p className="lg">{industry.intro}</p>
            </Copy>
          </div>

          {industry.hero.image && (
            <div
              className={`industry-hero-media${
                industry.hero.imageFit === "cover"
                  ? " industry-hero-media--cover"
                  : ""
              }`}
            >
              <img
                src={industry.hero.image}
                alt={industry.hero.imageAlt ?? industry.title}
              />
            </div>
          )}
        </div>
      </section>

      {industry.highlights?.length > 0 && (
        <section className="industry-section industry-highlights-section">
          <div className="container">
            <div className="industry-highlights">
              {industry.highlights.map((item) => (
                <div className="industry-highlight" key={item.label}>
                  <Copy animateOnScroll={true}>
                    <p className="industry-highlight-value">{item.value}</p>
                    <p className="industry-highlight-label">{item.label}</p>
                  </Copy>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="industry-section industry-build-section">
        <div className="container">
          <p className="industry-section-label industry-build-label">
            What we build
          </p>

          <div className="industry-build-grid">
            {industry.capabilities.map((capability) => (
              <article className="industry-build-card" key={capability.title}>
                <div className="industry-build-card-body">
                  <CapabilityIcon name={capability.icon} />
                  <Copy animateOnScroll={true}>
                    <h3>{capability.title}</h3>
                    <p>{capability.description}</p>
                  </Copy>
                </div>

                <div className="industry-build-card-footer">
                  <span className="industry-build-card-label">
                    {capability.label}
                  </span>
                  <a
                    href="/contact"
                    className="industry-build-card-arrow"
                    aria-label={`Learn more about ${capability.title}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateWithTransition("/contact");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M9 7h8v8" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {industry.proof?.items?.length > 0 && (
        <section className="industry-section industry-proof-section">
          <div className="container">
            <p className="industry-section-label">{industry.proof.label}</p>

            <div className="industry-proof-grid">
              {industry.proof.items.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="industry-proof-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Copy animateOnScroll={true}>
                    <div className="industry-proof-card-top">
                      <h3>{item.name}</h3>
                      <span className="industry-proof-card-arrow" aria-hidden>
                        ↗
                      </span>
                    </div>
                    <p>{item.description}</p>
                  </Copy>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {industry.cta && (
        <section className="industry-section industry-cta-section">
          <div className="container">
            <div className="industry-cta">
              <Copy animateOnScroll={true}>
                <h2>{industry.cta.title}</h2>
                <p>{industry.cta.description}</p>
              </Copy>
              <a
                href={industry.cta.buttonHref}
                className="industry-cta-button"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition(industry.cta.buttonHref);
                }}
              >
                {industry.cta.buttonLabel}
              </a>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default IndustryPage;
