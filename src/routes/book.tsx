import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Layout";
import { BookingFlow } from "@/components/site/BookingFlow";
import { WhatsAppButton, CallButton } from "@/components/site/Contact";

const search = z.object({
  service: z.string().optional(),
  urgency: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export const Route = createFileRoute("/book")({
  validateSearch: (s) => search.parse(s),
  head: () => seo("Book a Plumber Online | Dropfix", "Request a plumbing appointment online in a few simple steps. Choose your service, describe the problem and pick a preferred time."),
  component: BookPage,
});

function BookPage() {
  const s = Route.useSearch();
  return (
    <>
      <PageHeader eyebrow="Online booking" title="Book a Plumber" intro="Request an appointment in a few steps. We'll confirm availability with you.">
        <WhatsAppButton kind="booking" />
        <CallButton variant="ghostLight" />
      </PageHeader>
      <section className="section-y bg-muted"><div className="container-x"><BookingFlow key={JSON.stringify(s)} initial={s} /></div></section>
    </>
  );
}
