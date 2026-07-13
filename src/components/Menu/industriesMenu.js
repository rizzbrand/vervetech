import { getIndustryMenuRoute } from "@/app/industries/industriesConfig";

export const industriesMenuColumns = [
  {
    label: "Industries",
    items: [
      {
        title: "Fintech",
        description: "Payments, lending, and digital finance infrastructure",
        route: getIndustryMenuRoute("Fintech"),
        icon: "fintech",
      },
      {
        title: "AI & Technology",
        description: "Intelligent systems and automation at scale",
        route: getIndustryMenuRoute("AI & Technology"),
        icon: "ai",
      },
      {
        title: "Blockchain & Web3",
        description: "On-chain products with clarity and credibility",
        route: getIndustryMenuRoute("Blockchain & Web3"),
        icon: "web3",
      },
      {
        title: "Creator Economy",
        description: "Tools and platforms for modern creators",
        route: getIndustryMenuRoute("Creator Economy"),
        icon: "creator",
      },
      {
        title: "Real Estate",
        description: "Launch fast with products that scale with you",
        route: getIndustryMenuRoute("Real Estate"),
        icon: "real-estate",
      },
    ],
  },
  {
    label: "Industries",
    items: [
      {
        title: "Healthtech",
        description: "Compliant digital products for healthcare providers",
        route: getIndustryMenuRoute("Healthtech"),
        icon: "healthtech",
      },
      {
        title: "Marketing / Sales Tech",
        description: "Brand systems and revenue-ready go-to-market products",
        route: getIndustryMenuRoute("Marketing / Sales Tech"),
        icon: "marketing",
      },
      {
        title: "Professional Services",
        description: "High-trust platforms for advisory firms",
        route: getIndustryMenuRoute("Professional Services"),
        icon: "professional",
      },
      {
        title: "E-commerce",
        description: "Digital storefronts and payment experiences",
        route: getIndustryMenuRoute("E-commerce"),
        icon: "ecommerce",
      },
      {
        title: "Automobile industry",
        description: "Virtual showrooms and dealer platforms that sell cars",
        route: getIndustryMenuRoute("Automobile industry"),
        icon: "automobile",
      },
    ],
  },
  {
    label: "By Size",
    items: [
      {
        title: "For Startups",
        description: "Launch fast with products that scale with you",
        route: "/industries",
        icon: "startup",
      },
      {
        title: "For Scaleups",
        description: "Redesign for the growth stage you're entering",
        route: "/industries",
        icon: "scaleup",
      },
      {
        title: "SaaS",
        description: "Product-led platforms built for scale",
        route: getIndustryMenuRoute("SaaS"),
        icon: "saas",
      },
      {
        title: "For Enterprise",
        description: "Performance, compliance, and AI readiness at scale",
        route: "/industries",
        icon: "enterprise-size",
      },
      {
        title: "Enterprise",
        description: "AI workflows and automation for large teams",
        route: getIndustryMenuRoute("Enterprise"),
        icon: "enterprise",
      },
    ],
  },
];
