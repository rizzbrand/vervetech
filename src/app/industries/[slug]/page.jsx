import { notFound } from "next/navigation";
import IndustryPage from "../IndustryPage";
import { getIndustry, industriesBySlug } from "../industriesConfig";

export function generateStaticParams() {
  return Object.keys(industriesBySlug).map((slug) => ({ slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    notFound();
  }

  return <IndustryPage industry={industry} />;
}
