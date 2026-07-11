export const industriesBySlug = {
  fintech: {
    slug: "fintech",
    title: "Fintech",
    hero: {
      headline: "Fintech built for modern finance",
      image: "/project/fintech.png",
      imageAlt: "Fintech mobile app interface",
    },
    intro:
      "From payments and wallets to lending and compliance — we design, build, and scale technology that moves your business forward.",
    capabilities: [
      {
        title: "Payments & Wallets",
        description:
          "Checkout flows, digital wallets, and multi-rail payment systems built for speed, security, and scale.",
        label: "Pay",
      },
      {
        title: "Lending & Credit",
        description:
          "Underwriting tools, loan origination platforms, and credit products with transparent user experiences.",
        label: "Lend",
      },
      {
        title: "Banking Infrastructure",
        description:
          "Core banking integrations, KYC/AML workflows, and account management systems for modern finance.",
        label: "Bank",
      },
      {
        title: "Compliance & Security",
        description:
          "Regulatory-ready architecture, audit trails, and security patterns for high-trust financial products.",
        label: "Secure",
      },
    ],
  },
  saas: {
    slug: "saas",
    title: "SaaS",
    hero: {
      headline: "SaaS products built to scale",
      image: "/project/next-project.jpg",
      imageAlt: "SaaS product dashboard interface",
    },
    intro:
      "From MVP to enterprise — we design, engineer, and launch subscription platforms, dashboards, and growth systems that help SaaS teams ship faster and retain longer.",
    capabilities: [
      {
        title: "Product Platforms",
        description:
          "Multi-tenant architectures, role-based access, and core app experiences designed for reliability from day one.",
        label: "Build",
      },
      {
        title: "Subscription & Billing",
        description:
          "Pricing pages, checkout flows, plan management, and billing integrations that convert trials into revenue.",
        label: "Grow",
      },
      {
        title: "Analytics & Onboarding",
        description:
          "Activation funnels, in-app guidance, and product analytics that reduce churn and improve time-to-value.",
        label: "Retain",
      },
      {
        title: "Integrations & API",
        description:
          "Developer portals, webhooks, and third-party integrations that turn your product into a platform.",
        label: "Connect",
      },
    ],
  },
  "ai-technology": {
    slug: "ai-technology",
    title: "AI & Technology",
    hero: {
      headline: "AI systems built for real-world impact",
      image: "/featured-work/work-10.1.jpeg",
      imageAlt: "AI-powered software interface",
    },
    intro:
      "From intelligent agents to automated workflows — we design and ship AI products that integrate cleanly into your stack and deliver measurable business outcomes.",
    capabilities: [
      {
        title: "AI Agents & Copilots",
        description:
          "Context-aware assistants, chat interfaces, and task automation that help teams move faster with less friction.",
        label: "Assist",
      },
      {
        title: "Workflow Automation",
        description:
          "End-to-end process automation across ops, support, sales, and internal tools — reducing manual work at scale.",
        label: "Automate",
      },
      {
        title: "ML & Data Pipelines",
        description:
          "Model integration, data ingestion, and inference layers built for reliability, observability, and continuous improvement.",
        label: "Learn",
      },
      {
        title: "Enterprise AI Integration",
        description:
          "Secure deployments, API orchestration, and governance patterns that make AI production-ready for large teams.",
        label: "Deploy",
      },
    ],
  },
  "blockchain-web3": {
    slug: "blockchain-web3",
    title: "Blockchain & Web3",
    hero: {
      headline: "Web3 products built with clarity",
      image: "/featured-work/work-7.png",
      imageAlt: "Blockchain and Web3 product interface",
    },
    intro:
      "From smart contracts to consumer wallets — we design and build on-chain products that feel intuitive, trustworthy, and ready for mainstream adoption.",
    capabilities: [
      {
        title: "Smart Contracts & dApps",
        description:
          "Audited contract architecture, decentralized applications, and protocol interfaces built for security and performance.",
        label: "Build",
      },
      {
        title: "Wallets & Onboarding",
        description:
          "Wallet connections, account abstraction, and onboarding flows that reduce friction for new Web3 users.",
        label: "Connect",
      },
      {
        title: "Token Systems & DeFi",
        description:
          "Tokenomics design, staking, liquidity, and DeFi experiences with transparent UX and robust backend logic.",
        label: "Token",
      },
      {
        title: "Web3 Infrastructure",
        description:
          "Indexer pipelines, chain integrations, and monitoring systems that keep on-chain products reliable at scale.",
        label: "Chain",
      },
    ],
  },
  "e-commerce": {
    slug: "e-commerce",
    title: "E-commerce",
    hero: {
      headline: "Commerce experiences built to convert",
      image: "/featured-work/work9.1.jpeg",
      imageAlt: "E-commerce storefront and shopping interface",
    },
    intro:
      "From storefronts to checkout — we design and build digital commerce products that drive discovery, conversion, and repeat purchase across every channel.",
    capabilities: [
      {
        title: "Digital Storefronts",
        description:
          "Headless and custom storefronts with fast browsing, rich product pages, and brand-led shopping experiences.",
        label: "Shop",
      },
      {
        title: "Checkout & Payments",
        description:
          "Optimized checkout flows, payment gateways, and cart experiences that reduce drop-off and increase order value.",
        label: "Pay",
      },
      {
        title: "Inventory & Operations",
        description:
          "Order management, fulfillment integrations, and admin tools that keep commerce operations running smoothly.",
        label: "Manage",
      },
      {
        title: "Loyalty & Personalization",
        description:
          "Recommendations, promotions, and retention systems that turn first-time buyers into long-term customers.",
        label: "Grow",
      },
    ],
  },
  "real-estate": {
    slug: "real-estate",
    title: "Real Estate",
    hero: {
      headline: "Real estate platforms built for modern markets",
      image: "/featured-work/work-1.jpg",
      imageAlt: "Real estate property platform interface",
    },
    intro:
      "From listings to closings — we design and build digital products that help brokers, developers, and proptech teams move faster and serve clients better.",
    capabilities: [
      {
        title: "Listings & Search",
        description:
          "Property discovery, advanced filters, map search, and listing experiences that help buyers find the right fit faster.",
        label: "List",
      },
      {
        title: "Virtual Tours & Media",
        description:
          "Immersive property showcases, 3D walkthroughs, and rich media systems that bring listings to life online.",
        label: "Show",
      },
      {
        title: "CRM & Lead Management",
        description:
          "Agent dashboards, lead routing, and client communication tools that keep every deal organized and moving.",
        label: "Track",
      },
      {
        title: "Transactions & Portals",
        description:
          "Offer workflows, document management, and client portals that simplify the path from inquiry to close.",
        label: "Close",
      },
    ],
  },
};

export const getIndustry = (slug) => industriesBySlug[slug] ?? null;

export const getIndustryRoute = (slug) => `/industries/${slug}`;

export const industryMenuRoutes = {
  Fintech: "/industries/fintech",
  SaaS: "/industries/saas",
  "AI & Technology": "/industries/ai-technology",
  "Blockchain & Web3": "/industries/blockchain-web3",
  "E-commerce": "/industries/e-commerce",
  "Real Estate": "/industries/real-estate",
};

export const getIndustryMenuRoute = (title) =>
  industryMenuRoutes[title] ?? "/industries";
