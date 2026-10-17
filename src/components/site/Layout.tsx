import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, MessageCircle, Mail, Phone, MapPin, Clock } from "lucide-react";
import logo from "@/assets/logo-mark.png";
import { btn } from "@/lib/ui";
import { business, navLinks, waLink } from "@/config/site";
import { CallButton } from "./Contact";
import { cn } from "@/lib/utils";

export function Logo({ light = false }: { light?: boolean }) {
  const [dripping, setDripping] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  return (
    <Link
      to="/"
      className="relative flex shrink-0 select-none items-center gap-2.5"
      aria-label="Dropfix home"
      onClick={() => {
        setDripping(false);
        requestAnimationFrame(() => setDripping(true));
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setDripping(false), 1100);
      }}
    >
      <span className="relative">
        <img src={logo} alt="" width={36} height={36} className="size-9 object-contain" />
        {dripping && (
          <span aria-hidden className="pointer-events-none absolute left-1/2 top-6 -ml-[5px]">
            <span className="absolute inset-0 block size-2.5 rounded-full border-2 border-primary/60 animate-drop-splash" />
            <span className="block size-2.5 bg-primary animate-drop-drip" style={{ clipPath: "path('M5 0 C 7.5 3.2 10 5.2 10 7.4 A 5 5 0 1 1 0 7.4 C 0 5.2 2.5 3.2 5 0 Z')" }} />
          </span>
        )}
      </span>
      <span className={cn("font-display text-xl font-bold tracking-tight", light ? "text-navy-foreground" : "text-navy")}>
        Drop<span className="text-primary">fix</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={cn("sticky top-0 z-50 border-b bg-background/90 backdrop-blur-md transition-shadow", scrolled ? "shadow-soft border-border" : "border-transparent")}>
      <div className="container-x flex h-18 items-center justify-between gap-4 py-3">
        <Logo />
        <nav className="hidden 2xl:flex items-center gap-1" aria-label="Main">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground hover:text-navy transition-colors" activeProps={{ className: "text-navy bg-muted" }} activeOptions={{ exact: l.to === "/" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden md:flex items-center gap-2">
          <Link to="/pricing" className={btn("outline", "sm")}>Get a Quote</Link>
          <Link to="/book" className={btn("primary", "sm")}>Book a Plumber</Link>
          <CallButton size="sm" label="Emergency? Call Now" />
        </div>
        <button className="2xl:hidden inline-flex size-11 items-center justify-center rounded-full border" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="2xl:hidden border-t bg-background animate-rise">
          <nav className="container-x grid gap-1 py-4" aria-label="Mobile">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-medium hover:bg-muted">
                {l.label}
              </Link>
            ))}
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <Link to="/book" onClick={() => setOpen(false)} className={btn("primary")}>Book a Plumber</Link>
              <Link to="/pricing" onClick={() => setOpen(false)} className={btn("outline")}>Get a Quote</Link>
              <CallButton label="Emergency? Call Now" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-1 space-y-4">
          <Logo light />
          <p className="text-sm text-navy-foreground/70">{business.tagline}<br />{business.supportingTagline}</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Explore</h3>
          <ul className="grid gap-2 text-sm text-navy-foreground/80">
            {navLinks.map((l) => <li key={l.to}><Link to={l.to} className="hover:text-primary">{l.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Get help</h3>
          <ul className="grid gap-2 text-sm text-navy-foreground/80">
            <li><Link to="/book" className="hover:text-primary">Book a Plumber</Link></li>
            <li><Link to="/pricing" className="hover:text-primary">Quote Calculator</Link></li>
            <li><Link to="/emergency" className="hover:text-primary">Urgent Plumbing</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary">Terms and Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Contact</h3>
          <ul className="grid gap-3 text-sm text-navy-foreground/80">
            <li className="flex gap-2"><Phone className="size-4 shrink-0 text-primary" />{business.phoneDisplay ?? "Phone number coming soon"}</li>
            <li className="flex gap-2"><Mail className="size-4 shrink-0 text-primary" />{business.email ?? "Email coming soon"}</li>
            <li className="flex gap-2"><MapPin className="size-4 shrink-0 text-primary" />{business.address ?? "Service area details coming soon"}</li>
            <li className="flex gap-2"><Clock className="size-4 shrink-0 text-primary" />{business.hours ?? "Opening hours to be confirmed"}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-x py-6 text-xs text-navy-foreground/60">© {new Date().getFullYear()} Dropfix. All rights reserved.</div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  const href = waLink("general");
  const cls = "fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-navy shadow-lift transition-transform hover:scale-105";
  if (!href) return <Link to="/contact" className={cls} aria-label="Contact Dropfix (WhatsApp coming soon)"><MessageCircle className="size-6" /></Link>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label="Chat with Dropfix on WhatsApp"><MessageCircle className="size-6" /></a>;
}

export function PageHeader({ eyebrow, title, intro, children }: { eyebrow?: string; title: string; intro?: string; children?: ReactNode }) {
  return (
    <section className="no-reveal relative overflow-hidden bg-navy text-navy-foreground">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="absolute -right-24 -top-24 size-96 rounded-full bg-primary/30 blur-3xl animate-float" aria-hidden />
      <div className="absolute -bottom-32 left-1/4 size-80 rounded-full bg-emergency/20 blur-3xl animate-float-slow" aria-hidden />
      <div className="container-x relative pt-16 pb-24 md:pt-24 md:pb-32">
        {eyebrow && <p className="eyebrow mb-3 animate-rise">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl font-extrabold md:text-6xl animate-rise [animation-delay:.08s]">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-navy-foreground/75 animate-rise [animation-delay:.16s]">{intro}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3 animate-rise [animation-delay:.24s]">{children}</div>}
      </div>
      <Wave />
    </section>
  );
}

export function Wave() {
  return (
    <svg className="absolute inset-x-0 bottom-0 h-12 w-full text-background md:h-16" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
      <path fill="currentColor" d="M0,48 C240,88 480,8 720,32 C960,56 1200,80 1440,40 L1440,80 L0,80 Z" />
    </svg>
  );
}

export function SectionTitle({ eyebrow, title, intro, center }: { eyebrow?: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={cn("mb-12 max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl font-bold text-navy md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg text-muted-foreground">{intro}</p>}
    </div>
  );
}

export function DemoNote({ children }: { children: ReactNode }) {
  return <p className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">{children}</p>;
}
