import { Link } from "@tanstack/react-router";
import {
  ShieldCheck, Receipt, CalendarCheck, Building2, Droplets, Waves, Toilet, Flame, Wrench, MessagesSquare, Hammer,
  FileText, Home, CalendarDays, Headphones, RefreshCcw, ClipboardCheck, Star, ArrowRight, Check, MapPin, RotateCcw,
} from "lucide-react";
import { btn } from "@/lib/ui";
import { serviceImage } from "@/lib/images";
import { business, plans, reviews, faqs, pricing, type Service } from "@/config/site";
import { CallButton, WhatsAppButton } from "./Contact";
import { SectionTitle, DemoNote } from "./Layout";
import { useEffect, useState } from "react";

export function TrustStrip() {
  const items = [
    { icon: ShieldCheck, t: "Reliable Service" },
    { icon: Receipt, t: "Clear Pricing" },
    { icon: CalendarCheck, t: "Easy Online Booking" },
    { icon: Building2, t: "Residential & Commercial" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map(({ icon: I, t }) => (
        <div key={t} className="flex items-center gap-3 rounded-2xl bg-navy-foreground/10 px-4 py-3 backdrop-blur-sm">
          <I className="size-5 shrink-0 text-primary" />
          <span className="text-sm font-semibold">{t}</span>
        </div>
      ))}
    </div>
  );
}

export function EmergencySection() {
  const cards = [
    { icon: Droplets, t: "Burst Pipes" }, { icon: Waves, t: "Major Water Leaks" }, { icon: Wrench, t: "Blocked Drains" },
    { icon: Toilet, t: "Overflowing Toilets" }, { icon: Flame, t: "Water Heater Problems" }, { icon: Droplets, t: "Pipe Leaks" },
  ];
  return (
    <section className="section-y bg-navy text-navy-foreground relative overflow-hidden">
      <div className="absolute -left-32 bottom-0 size-[28rem] rounded-full bg-emergency/15 blur-3xl" aria-hidden />
      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p className="eyebrow mb-3 !text-emergency">Urgent help</p>
          <h2 className="text-3xl font-bold md:text-5xl">Need a Plumber Urgently?</h2>
          <p className="mt-4 text-lg text-navy-foreground/75">
            Water where it shouldn't be? Turn off your stopcock if it's safe to do so, then get in touch.
            {business.emergency.available && business.emergency.hours ? ` Urgent call-outs: ${business.emergency.hours}.` : " We'll tell you honestly when we can attend."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton size="lg" />
            <WhatsAppButton kind="emergency" size="lg" />
            <Link to="/book" search={{ urgency: "Emergency" }} className={btn("ghostLight", "lg")}>Request Emergency Assistance</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {cards.map(({ icon: I, t }) => (
            <div key={t} className="rounded-2xl border border-navy-foreground/10 bg-navy-foreground/5 p-5 transition-colors hover:border-emergency/60">
              <I className="mb-4 size-7 text-emergency" />
              <p className="font-semibold">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceCard({ s }: { s: Service }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-soft card-lift">
      <div className="aspect-[3/2] overflow-hidden">
        <img src={serviceImage[s.slug]} alt={s.title} loading="lazy" width={960} height={640} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-navy">{s.title}</h3>
          <span className="shrink-0 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
            {s.from !== null && pricing.enabled && !pricing.demo ? `From ${pricing.currency}${s.from}` : "Request a Quote"}
          </span>
        </div>
        <p className="flex-1 text-sm text-muted-foreground">{s.short}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link to="/services/$slug" params={{ slug: s.slug }} className={btn("outline", "sm")}>Learn More <ArrowRight className="size-3.5" /></Link>
          <Link to="/book" search={{ service: s.quoteKey }} className={btn("primary", "sm")}>Book Now</Link>
          <WhatsAppButton kind="quote" size="sm" label="Enquire" extra={`Service: ${s.title}.`} />
        </div>
      </div>
    </article>
  );
}

export function WhyChoose() {
  const items = [
    { icon: MessagesSquare, t: "Reliable Communication", d: "We keep you updated before, during and after every visit." },
    { icon: Hammer, t: "Professional Workmanship", d: "Careful, tidy work using quality parts and materials." },
    { icon: FileText, t: "Transparent Quotes", d: "Clear estimates with no surprises — changes are agreed first." },
    { icon: Home, t: "Respect for Your Property", d: "Floor protection, tidy working areas and a clean finish." },
    { icon: CalendarDays, t: "Easy Online Booking", d: "Request an appointment in a few minutes, any time." },
    { icon: Headphones, t: "Helpful Customer Support", d: "Friendly people who answer your questions honestly." },
    { icon: RefreshCcw, t: "Flexible Maintenance Plans", d: "Planned checks that help prevent costly problems." },
    { icon: ClipboardCheck, t: "Clear Follow-Up", d: "A summary of what we did and any recommended next steps." },
  ];
  return (
    <section className="section-y bg-muted">
      <div className="container-x">
        <SectionTitle eyebrow="Our promise" title="Why Choose Dropfix?" intro="Dependable service, honest communication and clear estimates — every time." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: I, t, d }) => (
            <div key={t} className="rounded-3xl bg-card p-6 shadow-soft card-lift">
              <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-accent"><I className="size-6 text-primary" /></div>
              <h3 className="mb-2 font-semibold text-navy">{t}</h3>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = ["Tell Us the Problem.", "Get an Estimate.", "Book Your Appointment.", "Get the Job Done."];
  const desc = ["Describe the issue online, by phone or on WhatsApp.", "Use our calculator or request a detailed quote.", "Pick a preferred date and time that suits you.", "We arrive prepared, fix it properly and tidy up."];
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionTitle center eyebrow="How it works" title="Four simple steps to sorted plumbing" />
        <ol className="relative grid gap-6 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-border md:block" aria-hidden />
          {steps.map((s, i) => (
            <li key={s} className="relative text-center animate-rise" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="relative mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-aqua-gradient font-display text-lg font-bold text-primary-foreground shadow-soft">{i + 1}</div>
              <h3 className="font-semibold text-navy">{s}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc[i]}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 text-center"><Link to="/book" className={btn("primary", "lg")}>Book a Plumber</Link></div>
      </div>
    </section>
  );
}

export function ReviewsSection({ full = false }: { full?: boolean }) {
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionTitle center eyebrow="Reviews" title="What Our Customers Say" />
        {reviews.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-3xl border border-dashed bg-muted p-10 text-center">
            <div className="mb-4 flex justify-center gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-5 text-border" />)}</div>
            <p className="font-semibold text-navy">Genuine customer reviews will appear here.</p>
            <p className="mt-2 text-sm text-muted-foreground">We only publish real feedback from real customers — never invented testimonials.</p>
            {business.reviewUrl && <a href={business.reviewUrl} target="_blank" rel="noopener noreferrer" className={btn("primary", "md", "mt-6")}>Leave a Review</a>}
            {!business.reviewUrl && full && <Link to="/contact" className={btn("outline", "md", "mt-6")}>Share your feedback</Link>}
          </div>
        ) : (
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
            {reviews.map((r) => (
              <figure key={r.name + r.date} className="w-80 shrink-0 snap-start rounded-3xl border bg-card p-6 shadow-soft">
                <div className="mb-3 flex gap-0.5">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="size-4 fill-emergency text-emergency" />)}</div>
                <blockquote className="text-sm">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-xs text-muted-foreground"><b className="text-navy">{r.name}</b> · {r.service} · {r.date}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function PlansSection() {
  return (
    <section className="section-y bg-muted">
      <div className="container-x">
        <SectionTitle center eyebrow="Maintenance plans" title="Prevent Problems Before They Start." intro="Planned plumbing care for homes, landlords and property managers." />
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div key={p.id} className={`flex flex-col rounded-3xl p-8 shadow-soft card-lift ${"featured" in p && p.featured ? "bg-navy text-navy-foreground" : "bg-card"}`}>
              <p className="eyebrow mb-2">{p.frequency}</p>
              <h3 className="text-2xl font-bold">{p.name}</h3>
              <p className={`mt-2 text-sm ${"featured" in p && p.featured ? "text-navy-foreground/75" : "text-muted-foreground"}`}>{p.for}</p>
              <p className="mt-6 font-display text-2xl font-bold">{p.price ?? "Price on request"}</p>
              <ul className="my-6 grid flex-1 gap-3 text-sm">
                {p.checks.map((c) => <li key={c} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{c}</li>)}
              </ul>
              <p className="mb-6 text-xs opacity-70">{p.terms} No automatic recurring charges.</p>
              <div className="grid gap-2">
                <Link to="/book" search={{ service: "Other", notes: `Maintenance plan: ${p.name}` }} className={btn("primary")}>Request a Maintenance Visit</Link>
                <WhatsAppButton kind="general" label="Enquire on WhatsApp" extra={`I'm interested in the ${p.name}.`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqList({ limit }: { limit?: number }) {
  const list = limit ? faqs.slice(0, limit) : faqs;
  return (
    <div className="mx-auto grid max-w-3xl gap-3">
      {list.map((f) => (
        <details key={f.q} className="group rounded-2xl border bg-card px-6 py-4 shadow-soft open:border-primary/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy">
            {f.q}
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-primary transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function MapSection() {
  return (
    <section className="section-y">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionTitle eyebrow="Service areas" title="Local Plumbing Services You Can Count On." />
          {business.serviceAreas.length ? (
            <div className="flex flex-wrap gap-2">{business.serviceAreas.map((a) => <span key={a} className="rounded-full bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground">{a}</span>)}</div>
          ) : (
            <p className="text-muted-foreground">Not sure if we cover your area? Send us your postcode and we'll confirm straight away.</p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className={btn("primary")}>Check my postcode</Link>
            {business.mapsQuery && <a className={btn("outline")} target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.mapsQuery)}`}>Get directions</a>}
          </div>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-3xl border bg-muted shadow-soft">
          {business.mapsQuery ? (
            <iframe title="Dropfix location map" className="size-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(business.mapsQuery)}&output=embed`} />
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-3 p-8 text-center text-muted-foreground">
              <MapPin className="size-10 text-primary" />
              <p className="font-medium text-navy">Map coming soon</p>
              <p className="text-sm">Our location and coverage map will appear here once confirmed.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

type Saved = { ref: string; service: string; address: string; date: string; createdAt: string };

export function RetentionSection() {
  const [last, setLast] = useState<Saved | null>(null);
  useEffect(() => {
    try {
      const list: Saved[] = JSON.parse(localStorage.getItem("dropfix_bookings") || "[]");
      setLast(list[0] ?? null);
    } catch { /* ignore */ }
  }, []);
  return (
    <section className="section-y">
      <div className="container-x grid gap-10 rounded-[2rem] bg-accent p-8 md:p-14 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow mb-3">Repeat customers</p>
          <h2 className="text-3xl font-bold text-navy md:text-4xl">Your Trusted Plumber, Whenever You Need Us.</h2>
          <p className="mt-4 text-muted-foreground">Rebook a previous service in seconds, keep your details handy and get reminders for planned maintenance.</p>
        </div>
        <div className="rounded-3xl bg-card p-6 shadow-soft">
          {last ? (
            <>
              <DemoNote>Saved on this device only</DemoNote>
              <p className="mt-4 text-sm text-muted-foreground">Your last request · {last.ref}</p>
              <p className="mt-1 text-lg font-semibold text-navy">{last.service}</p>
              <p className="text-sm text-muted-foreground">{last.address}</p>
              <Link to="/book" search={{ service: last.service, address: last.address }} className={btn("primary", "md", "mt-5")}>
                <RotateCcw className="size-4" /> Book the Same Service Again
              </Link>
            </>
          ) : (
            <>
              <p className="font-semibold text-navy">No previous bookings on this device yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">After your first booking request, you'll be able to rebook the same service here in one tap.</p>
              <Link to="/book" className={btn("primary", "md", "mt-5")}>Make your first booking</Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
