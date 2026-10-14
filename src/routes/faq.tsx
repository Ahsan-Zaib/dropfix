import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Layout";
import { FaqList } from "@/components/site/Sections";

export const Route = createFileRoute("/faq")({
  head: () => seo("Plumbing FAQ | Dropfix", "Answers to common questions about Dropfix plumbing services, pricing, booking and coverage."),
  component: () => (
    <>
      <PageHeader eyebrow="FAQ" title="Frequently asked questions" />
      <section className="section-y"><div className="container-x"><FaqList /></div></section>
    </>
  ),
});
