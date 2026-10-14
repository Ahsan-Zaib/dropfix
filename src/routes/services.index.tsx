import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { services } from "@/config/site";
import { PageHeader } from "@/components/site/Layout";
import { ServiceCard } from "@/components/site/Sections";
import { WhatsAppButton } from "@/components/site/Contact";

export const Route = createFileRoute("/services/")({
  head: () => seo("Plumbing Services | Dropfix", "Leak repairs, blocked drains, toilets, taps, pipework, bathrooms, kitchens, water heaters and commercial plumbing from Dropfix."),
  component: () => (
    <>
      <PageHeader eyebrow="Services" title="Every plumbing job, done right." intro="Choose a service to learn more, get a guide price or book a visit.">
        <WhatsAppButton kind="quote" label="Ask about a job" />
      </PageHeader>
      <section className="section-y">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
      </section>
    </>
  ),
});
