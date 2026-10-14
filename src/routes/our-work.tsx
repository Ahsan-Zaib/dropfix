import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { btn } from "@/lib/ui";
import { PageHeader } from "@/components/site/Layout";
import { BeforeAfter } from "@/components/site/BeforeAfter";

const categories = ["Leaking pipe repair", "Bathroom renovations", "Tap replacement", "Toilet repair", "Drain cleaning", "Kitchen plumbing", "Pipe replacement", "Fixture installation"];

export const Route = createFileRoute("/our-work")({
  head: () => seo("Before & After Projects | Dropfix", "See the difference professional plumbing makes with before-and-after examples of repairs and installations."),
  component: () => (
    <>
      <PageHeader eyebrow="Our work" title="See the Difference Professional Plumbing Makes." intro="Explore repairs and installations that restore functionality and improve your space." />
      <section className="section-y">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap gap-2">{categories.map((c) => <span key={c} className="rounded-full border px-4 py-2 text-sm font-medium">{c}</span>)}</div>
          <BeforeAfter />
          <div className="mt-12 text-center"><Link to="/book" className={btn("primary", "lg")}>Start your project</Link></div>
        </div>
      </section>
    </>
  ),
});
