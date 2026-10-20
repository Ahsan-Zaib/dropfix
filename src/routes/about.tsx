import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { btn } from "@/lib/ui";
import { img } from "@/lib/images";
import { PageHeader } from "@/components/site/Layout";
import { MapSection } from "@/components/site/Sections";

const blocks = [
  ["Who We Are", "Dropfix is a plumbing company focused on doing the job properly — clear communication, careful work and a tidy finish."],
  ["Our Approach", "We listen, inspect, explain the options and agree the price before starting. No pressure, no surprises."],
  ["Our Commitment to Customers", "Respect for your home or business, honest advice, and follow-up so you know exactly what was done."],
  ["Residential Plumbing", "From dripping taps to full bathroom plumbing, we look after homes of every size."],
  ["Commercial Plumbing", "Offices, shops and rental properties get reliable plumbing with minimal disruption."],
];

export const Route = createFileRoute("/about")({
  head: () => seo("About Dropfix | Good Plumbing Starts With Trust", "Learn about Dropfix — our approach to honest, reliable plumbing for homes and businesses."),
  component: () => (
    <>
      <PageHeader eyebrow="About us" title="Good Plumbing Starts With Trust." intro="Every Drop Matters. Every Fix Counts." />
      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="photo-frame aspect-[3/2] shadow-lift">
            <img src={img.kitchen} alt="Dropfix plumber connecting kitchen appliance pipework" width={960} height={640} loading="lazy" className="size-full object-cover" />
          </div>
          <div className="grid gap-8">
            {blocks.map(([t, d]) => <div key={t}><h2 className="text-xl font-bold text-navy">{t}</h2><p className="mt-2 text-muted-foreground">{d}</p></div>)}
          </div>
        </div>
      </section>
      <MapSection />
      <section className="section-y bg-navy text-navy-foreground">
        <div className="container-x text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Contact Our Team</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3"><Link to="/contact" className={btn("primary", "lg")}>Get in touch</Link><Link to="/book" className={btn("ghostLight", "lg")}>Book a Plumber</Link></div>
        </div>
      </section>
    </>
  ),
});
