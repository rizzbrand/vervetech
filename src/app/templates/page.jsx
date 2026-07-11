"use client";
import "./templates.css";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import { useMemo, useState } from "react";
import { useViewTransition } from "@/hooks/useViewTransition";
import { templateFilters, templates } from "./templatesData";

const Page = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const { navigateWithTransition } = useViewTransition();

  const filteredTemplates = useMemo(() => {
    if (activeFilter === "All") return templates;
    return templates.filter((template) => template.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="templates-page">
      <section className="templates-hero">
        <div className="container">
          <Copy delay={0.8}>
            <h1>
              SaaS templates to launch your next company
            </h1>
            <p className="lg">
              Ready-made product templates for property marketplaces, car
              dealerships, restaurants, fintech, AI automation, and more —
              buy, customize, and go live faster.
            </p>
          </Copy>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="templates-filters">
            {templateFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`templates-filter-btn${
                  activeFilter === filter ? " templates-filter-btn--active" : ""
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="templates-grid">
            {filteredTemplates.map((template) => (
              <article className="templates-card" key={template.slug}>
                <div className="templates-card-media">
                  <img src={template.image} alt={template.name} />
                  <span className="templates-card-industry">
                    {template.industry}
                  </span>
                </div>

                <div className="templates-card-body">
                  <Copy animateOnScroll={true}>
                    <h2>{template.name}</h2>
                    <p>{template.description}</p>
                  </Copy>

                  <ul className="templates-card-features">
                    {template.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>

                  <div className="templates-card-footer">
                    <span className="templates-card-price">{template.price}</span>
                    <a
                      href={`/onboarding?intent=build&template=${template.slug}`}
                      className="templates-card-cta"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateWithTransition(
                          `/onboarding?intent=build&template=${template.slug}`
                        );
                      }}
                    >
                      Start with template
                    </a>
                  </div>
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
