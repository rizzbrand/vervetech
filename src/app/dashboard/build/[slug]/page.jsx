import { templates } from "@/app/templates/templatesData";
import { BuildTemplateClient } from "./BuildTemplateClient";

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }));
}

export default async function BuildTemplatePage({ params }) {
  const { slug } = await params;
  const template = templates.find((item) => item.slug === slug);

  if (!template) {
    return null;
  }

  return <BuildTemplateClient template={template} />;
}
