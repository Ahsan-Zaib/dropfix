import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Plus, AlertCircle } from "lucide-react";
import { seo } from "@/lib/seo";
import { btn } from "@/lib/ui";
import { serviceImage } from "@/lib/images";
import { services, pricing, estimateDisclaimer } from "@/config/site";
import { PageHeader, SectionTitle } from "@/components/site/Layout";
import { WhatsAppButton } from "@/components/site/Contact";
import { BeforeAfter } from "@/components/site/BeforeAfter";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = services.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData }) => (loaderData ? seo(`${loaderData.title} | Dropfix`, loaderData.short) : { meta: [] }),
  component: ServicePage,
});

function ServicePage() {
  const s = Route.useLoaderData();
  return (
    <>
      <PageHeader eyebrow="Service" title={s.title} intro={s.description}>
        <Link to="/book" search={{ service: s.quoteKey }} className={btn("primary", "lg")}>Book Now</Link>
        <Link to="/pricing" className={btn("ghostLight", "lg")}>Get an Estimate</Link>
        <WhatsAppButton kind="quote" size="lg" extra={`Service: ${s.title}.`} />
      </PageHeader>
      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-10">
            {s.note && <p className="flex gap-2 rounded-2xl bg-emergency/10 p-4 text-sm text-navy"><AlertCircle className="size-5 shrink-0 text-emergency" />{s.note}</p>}
            <img src={serviceImage[s.slug]} alt={s.title} width={960} height={640} className="aspect-[3/2] w-full rounded-3xl object-cover shadow-soft" />
            <Block title="Common problems" items={s.problems} icon="dot" />
            <Block title="Work included" items={s.included} icon="check" />
            <Block title="Optional extras" items={s.extras} icon="plus" />
          </div>
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-navy p-8 text-navy-foreground">
              <p className="eyebrow">Pricing guidance</p>
              <p className="mt-3 font-display text-3xl font-bold">{s.from !== null && !pricing.demo ? `From ${pricing.currency}${s.from}` : "Request a Quote"}</p>
              <p className="mt-3 text-sm text-navy-foreground/70">{estimateDisclaimer}</p>
              <Link to="/book" search={{ service: s.quoteKey }} className={btn("primary", "md", "mt-6 w-full")}>Book this service</Link>
            </div>
            <div className="rounded-3xl border p-6">
              <h3 className="mb-4 font-semibold text-navy">FAQs</h3>
              {s.faqs.map((f) => <div key={f.q} className="mb-3"><p className="font-medium text-navy">{f.q}</p><p className="text-sm text-muted-foreground">{f.a}</p></div>)}
            </div>
          </aside>
        </div>
      </section>
      <section className="section-y bg-muted">
        <div className="container-x">
          <SectionTitle eyebrow="Before & after" title="Examples of the difference" />
          <BeforeAfter />
        </div>
      </section>
    </>
  );
}

function Block({ title, items, icon }: { title: string; items: string[]; icon: "check" | "plus" | "dot" }) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-navy">{title}</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((i) => (
          <li key={i} className="flex gap-3 rounded-2xl bg-muted p-4 text-sm">
            {icon === "check" ? <Check className="size-5 shrink-0 text-primary" /> : icon === "plus" ? <Plus className="size-5 shrink-0 text-primary" /> : <span className="mt-1.5 size-2 shrink-0 rounded-full bg-emergency" />}
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
