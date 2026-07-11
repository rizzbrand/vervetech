"use client";
import "../content-page.css";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import { useViewTransition } from "@/hooks/useViewTransition";
import { getIndustryRoute } from "./industriesConfig";

const industries = [
  {
    name: "Fintech",
    slug: "fintech",
    description:
      "Payments, lending, and financial infrastructure for the next generation of digital finance.",
  },
  {
    name: "Creator Economy",
    description:
      "Platforms and tools that help creators monetize, grow audiences, and build sustainable brands.",
  },
  {
    name: "SaaS & Startups",
    slug: "saas",
    description:
      "Product development for early-stage and scaling SaaS companies ready to move fast.",
  },
  {
    name: "Web3 & Blockchain",
    slug: "blockchain-web3",
    description:
      "On-chain products, token systems, and decentralized infrastructure for digital-native brands.",
  },
  {
    name: "Enterprise & Automation",
    slug: "ai-technology",
    description:
      "AI-powered workflows and business automation that eliminate friction at scale.",
  },
  {
    name: "Brand & Media",
    description:
      "Digital experiences, identity systems, and product design for modern media companies.",
  },
];

const Page = () => {
  const { navigateWithTransition } = useViewTransition();

  return (
    <div className="content-page">
      <section className="content-header">
        <div className="container">
          <Copy delay={0.8}>
            <h1>Industries we partner with</h1>
            <p className="lg">
              We work across sectors where technology, branding, and innovation
              intersect — helping teams build products that matter.
            </p>
          </Copy>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="content-grid">
            {industries.map((industry) => {
              const href = industry.slug
                ? getIndustryRoute(industry.slug)
                : "/contact";

              return (
                <a
                  key={industry.name}
                  href={href}
                  className="content-card content-card--link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition(href);
                  }}
                >
                  <Copy animateOnScroll={true}>
                    <h3>{industry.name}</h3>
                    <p>{industry.description}</p>
                  </Copy>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
