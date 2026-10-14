import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, MessageCircle, Mail, Phone, MapPin, Clock } from "lucide-react";
import logo from "@/assets/logo-mark.png";
import { btn } from "@/lib/ui";
import { business, navLinks, waLink } from "@/config/site";
import { CallButton } from "./Contact";
import { cn } from "@/lib/utils";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Dropfix home">
      <img src={logo} alt="" width={36} height={36} className="size-9 object-contain" />
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
        <nav className="hidden xl:flex items-center gap-1" aria-label="Main">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground hover:text-navy transition-colors" activeProps={{ className: "text-navy bg-muted" }} activeOptions={{ exact: l.to === "/" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Link to="/pricing" className={btn("outline", "sm")}>Get a Quote</Link>
          <Link to="/book" className={btn("primary", "sm")}>Book a Plumber</Link>
          <CallButton size="sm" label="Emergency? Call Now" />
        </div>
        <button className="xl:hidden inline-flex size-11 items-center justify-center rounded-full border" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="xl:hidden border-t bg-background animate-rise">
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
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      <div className="absolute -right-24 -top-24 size-96 rounded-full bg-primary/20 blur-3xl" aria-hidden />
      <div className="container-x relative py-16 md:py-24 animate-rise">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl font-bold md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-navy-foreground/75">{intro}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
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
