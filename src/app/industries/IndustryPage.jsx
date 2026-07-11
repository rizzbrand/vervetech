"use client";
import "./industry.css";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import { useViewTransition } from "@/hooks/useViewTransition";

const IndustryPage = ({ industry }) => {
  const { navigateWithTransition } = useViewTransition();

  return (
    <div className="industry-page">
      <section className="industry-hero">
        <div className="industry-hero-inner">
          <div className="industry-hero-content">
            <Copy delay={0.8}>
              <h1>{industry.hero.headline}</h1>
              <p className="lg">{industry.intro}</p>
            </Copy>
          </div>

          {industry.hero.image && (
            <div className="industry-hero-media">
              <img
                src={industry.hero.image}
                alt={industry.hero.imageAlt ?? industry.title}
              />
            </div>
          )}
        </div>
      </section>

      <section className="industry-section industry-build-section">
        <div className="container">
          <p className="industry-section-label industry-build-label">
            What we build
          </p>

          <div className="industry-build-grid">
            {industry.capabilities.map((capability) => (
              <article className="industry-build-card" key={capability.title}>
                <div className="industry-build-card-body">
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

      <Footer />
    </div>
  );
};

export default IndustryPage;
