import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Layout";
import { ReviewsSection } from "@/components/site/Sections";

export const Route = createFileRoute("/reviews")({
  head: () => seo("Customer Reviews | Dropfix", "Read genuine feedback from Dropfix plumbing customers and share your own experience."),
  component: () => (
    <>
      <PageHeader eyebrow="Reviews" title="Honest feedback from real customers." />
      <ReviewsSection full />
    </>
  ),
});
