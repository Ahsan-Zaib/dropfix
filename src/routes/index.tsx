import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { img } from "@/lib/images";
import { btn } from "@/lib/ui";
import { seo } from "@/lib/seo";
import { services } from "@/config/site";
import { CallButton, WhatsAppButton } from "@/components/site/Contact";
import { SectionTitle } from "@/components/site/Layout";
import { TrustStrip, EmergencySection, ServiceCard, WhyChoose, HowItWorks, ReviewsSection, PlansSection, FaqList, MapSection, RetentionSection } from "@/components/site/Sections";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { QuoteCalculator } from "@/components/site/QuoteCalculator";

export const Route = createFileRoute("/")({
  head: () => seo("Dropfix | Professional Plumbing Services", "Discover professional plumbing services from Dropfix. Request a quote, book a plumber, explore our services, and contact our team."),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
        <img src={img.hero} alt="Dropfix plumber repairing pipework under a kitchen sink" width={1920} height={1088} className="absolute inset-0 -z-10 size-full object-cover object-right" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" aria-hidden />
        <div className="container-x py-20 md:py-32">
          <div className="max-w-2xl animate-rise">
            <p className="eyebrow mb-4">Reliable Plumbing. Done Right.</p>
            <h1 className="text-4xl font-extrabold leading-[1.05] md:text-6xl">Plumbing Problems? We've Got You Covered.</h1>
            <p className="mt-6 text-lg text-navy-foreground/80 md:text-xl">From leaking taps and blocked drains to plumbing installations and maintenance, Dropfix delivers dependable service to keep your water flowing.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book" className={btn("primary", "lg")}>Book a Plumber</Link>
              <Link to="/pricing" className={btn("ghostLight", "lg")}>Get a Free Quote</Link>
              <CallButton size="lg" />
              <WhatsAppButton size="lg" />
            </div>
          </div>
          <div className="mt-14 md:mt-20"><TrustStrip /></div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow="Our services" title="Plumbing services for every part of your property" />
            <Link to="/services" className={btn("outline", "md", "mb-12")}>All services <ArrowRight className="size-4" /></Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => <ServiceCard key={s.slug} s={s} />)}
          </div>
        </div>
      </section>

      <EmergencySection />

      <section className="section-y">
        <div className="container-x">
          <SectionTitle eyebrow="Our work" title="See the Difference Professional Plumbing Makes." intro="Explore repairs and installations that restore functionality and improve your space." />
          <BeforeAfter />
        </div>
      </section>

      <WhyChoose />
      <HowItWorks />

      <section className="section-y bg-muted">
        <div className="container-x">
          <SectionTitle eyebrow="Instant guide price" title="Get an estimate in under a minute" />
          <QuoteCalculator />
        </div>
      </section>

      <ReviewsSection />
      <RetentionSection />
      <PlansSection />
      <MapSection />

      <section className="section-y bg-muted">
        <div className="container-x">
          <SectionTitle center eyebrow="FAQ" title="Questions, answered" />
          <FaqList limit={6} />
          <div className="mt-8 text-center"><Link to="/faq" className={btn("outline")}>See all questions</Link></div>
        </div>
      </section>
    </>
  );
}
