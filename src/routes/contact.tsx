import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { seo } from "@/lib/seo";
import { business } from "@/config/site";
import { PageHeader } from "@/components/site/Layout";
import { ContactForm } from "@/components/site/ContactForm";
import { MapSection } from "@/components/site/Sections";
import { CallButton, WhatsAppButton } from "@/components/site/Contact";

const search = z.object({ service: z.string().optional(), message: z.string().optional() });

export const Route = createFileRoute("/contact")({
  validateSearch: (s) => search.parse(s),
  head: () => seo("Contact Dropfix | Let's Get Your Plumbing Sorted", "Contact Dropfix for plumbing quotes, bookings and enquiries by form, phone or WhatsApp."),
  component: ContactPage,
});

function ContactPage() {
  const s = Route.useSearch();
  const rows = [
    { icon: Phone, l: "Phone", v: business.phoneDisplay ?? "Coming soon" },
    { icon: Mail, l: "Email", v: business.email ?? "Coming soon" },
    { icon: Clock, l: "Business hours", v: business.hours ?? "To be confirmed" },
    { icon: MapPin, l: "Service areas", v: business.serviceAreas.join(", ") || "Ask us about your postcode" },
  ];
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's Get Your Plumbing Sorted.">
        <CallButton size="lg" />
        <WhatsAppButton size="lg" />
      </PageHeader>
      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <ContactForm key={JSON.stringify(s)} service={s.service} message={s.message} />
          <ul className="grid content-start gap-4">
            {rows.map(({ icon: I, l, v }) => (
              <li key={l} className="flex gap-4 rounded-2xl bg-muted p-5">
                <I className="size-5 shrink-0 text-primary" />
                <div><p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{l}</p><p className="mt-1 font-medium text-navy">{v}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <MapSection />
    </>
  );
}
