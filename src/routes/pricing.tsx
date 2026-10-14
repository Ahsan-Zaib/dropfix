import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Layout";
import { QuoteCalculator } from "@/components/site/QuoteCalculator";

export const Route = createFileRoute("/pricing")({
  head: () => seo("Pricing & Quote Calculator | Dropfix", "Get a guide price for your plumbing job in under a minute, then request a detailed quote or book a visit."),
  component: () => (
    <>
      <PageHeader eyebrow="Pricing" title="Clear pricing, no surprises." intro="Tell us about the job for a guide estimate. We'll always confirm the final price before work begins." />
      <section className="section-y"><div className="container-x"><QuoteCalculator /></div></section>
    </>
  ),
});
