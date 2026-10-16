import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { img } from "@/lib/images";
import { btn } from "@/lib/ui";
import { seo } from "@/lib/seo";
import { services } from "@/config/site";
import { CallButton, WhatsAppButton } from "@/components/site/Contact";
import { SectionTitle, Wave } from "@/components/site/Layout";
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
      <section className="no-reveal relative isolate overflow-hidden bg-navy text-navy-foreground">
        <img src={img.hero} alt="Dropfix plumber repairing pipework under a kitchen sink" width={1920} height={1088} className="absolute inset-0 -z-10 size-full object-cover object-right scale-105 animate-[page-in_1.4s_ease_both]" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-grid" aria-hidden />
        <div className="absolute -left-32 top-10 -z-10 size-[28rem] rounded-full bg-primary/25 blur-3xl animate-float" aria-hidden />
        <div className="container-x relative pt-20 pb-28 md:pt-32 md:pb-40">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 animate-rise">
              <span className="relative flex size-2"><span className="absolute inset-0 rounded-full bg-primary animate-ripple" /><span className="relative size-2 rounded-full bg-primary" /></span>
              Reliable Plumbing. Done Right.
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.05] md:text-7xl animate-rise [animation-delay:.1s]">Plumbing Problems? <span className="text-gradient">We've Got You Covered.</span></h1>
            <p className="mt-6 text-lg text-navy-foreground/80 md:text-xl animate-rise [animation-delay:.2s]">From leaking taps and blocked drains to plumbing installations and maintenance, Dropfix delivers dependable service to keep your water flowing.</p>
            <div className="mt-8 flex flex-wrap gap-3 animate-rise [animation-delay:.3s]">
              <Link to="/book" className={btn("primary", "lg")}>Book a Plumber <ArrowRight className="size-4" /></Link>
              <Link to="/pricing" className={btn("ghostLight", "lg")}>Get a Free Quote</Link>
              <CallButton size="lg" />
              <WhatsAppButton size="lg" />
            </div>
          </div>
          <div className="pointer-events-none absolute right-8 top-24 hidden flex-col gap-4 xl:flex">
            <div className="glass rounded-2xl px-5 py-4 animate-bob"><p className="text-2xl font-bold">Fast</p><p className="text-sm text-navy-foreground/70">response bookings</p></div>
            <div className="glass ml-12 rounded-2xl px-5 py-4 animate-bob [animation-delay:1.5s]"><p className="text-2xl font-bold">Upfront</p><p className="text-sm text-navy-foreground/70">guide pricing</p></div>
          </div>
          <div className="mt-14 md:mt-20 animate-rise [animation-delay:.45s]"><TrustStrip /></div>
        </div>
        <Wave />
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
