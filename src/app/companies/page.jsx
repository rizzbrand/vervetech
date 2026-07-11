"use client";
import "./companies.css";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import { useMemo, useState } from "react";
import { companies, companyFilters } from "./companiesData";

const Page = () => {
  const [activeFilter, setActiveFilter] = useState(null);

  const filteredCompanies = useMemo(() => {
    if (!activeFilter) return companies;
    return companies.filter((company) => company.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="companies-page">
      <section className="companies-hero">
        <div className="container">
          <Copy delay={0.8}>
            <h1>
              Companies we&apos;ve helped build{" "}
              <span className="companies-hero-line">
               from startup to enterprise
              </span>
            </h1>
          </Copy>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="companies-filters">
            <span className="companies-filters-label">Filter By:</span>
            {companyFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`companies-filter-btn${
                  activeFilter === filter ? " companies-filter-btn--active" : ""
                }`}
                onClick={() =>
                  setActiveFilter((current) =>
                    current === filter ? null : filter
                  )
                }
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="companies-list">
            {filteredCompanies.length === 0 ? (
              <p className="companies-empty">
                No companies match this filter yet.
              </p>
            ) : (
              filteredCompanies.map((company) => (
                <a
                  key={company.name}
                  href={company.url}
                  className="companies-row companies-row-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${company.name}`}
                >
                  <Copy animateOnScroll={true}>
                    <h2 className="companies-row-name">
                      <span className="companies-row-name-text">
                        {company.name}
                      </span>
                    </h2>
                  </Copy>

                  <Copy animateOnScroll={true}>
                    <p className="companies-row-desc">{company.description}</p>
                  </Copy>

                  <span className="companies-row-industry">{company.industry}</span>
                </a>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
