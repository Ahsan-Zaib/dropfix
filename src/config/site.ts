/**
 * DROPFIX — central business settings.
 * Everything customer-facing (contact details, services, prices, plans,
 * reviews, service areas) is edited here.
 *
 * ⚠ PLACEHOLDERS: values marked `null` / `configured: false` have NOT been
 * supplied by the business yet. The site hides or softens features that
 * depend on them so no broken or misleading info is published.
 */

export const business = {
  name: "Dropfix",
  tagline: "Reliable Plumbing. Done Right.",
  supportingTagline: "Every Drop Matters. Every Fix Counts.",
  /** International format, digits only, e.g. "447700900123". null = not supplied. */
  // DEMO TEST NUMBERS — replace with the real business numbers.
  phoneE164: "447700900123" as string | null,
  phoneDisplay: "+44 7700 900123 (demo)" as string | null,
  /** WhatsApp number: country code + digits only. null = not supplied. */
  whatsappNumber: "447700900123" as string | null,
  email: null as string | null,
  address: null as string | null,
  /** Google Maps embed query (address or place name). null hides the map. */
  mapsQuery: null as string | null,
  hours: null as string | null,
  emergency: {
    /** Only set true if the business confirms emergency call-outs. */
    available: false,
    hours: null as string | null,
  },
  serviceAreas: [] as string[],
  postcodes: [] as string[],
  reviewUrl: null as string | null,
  social: {} as Record<string, string>,
};

export const isPhoneConfigured = () => !!business.phoneE164;
export const isWhatsAppConfigured = () => !!business.whatsappNumber;

export const waMessages = {
  general: "Hello Dropfix, I'd like to enquire about your plumbing services.",
  quote: "Hello Dropfix, I'd like a quote for a plumbing job.",
  emergency: "Hello Dropfix, I need help with an urgent plumbing issue.",
  booking: "Hello Dropfix, I'd like to discuss a plumbing appointment.",
} as const;
export type WaKind = keyof typeof waMessages;

/** Returns a wa.me link, or the contact page when no number is configured. */
export function waLink(kind: WaKind = "general", extra?: string) {
  if (!business.whatsappNumber) return null;
  const text = extra ? `${waMessages[kind]} ${extra}` : waMessages[kind];
  return `https://wa.me/${business.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}
export function telLink() {
  return business.phoneE164 ? `tel:+${business.phoneE164.replace(/\D/g, "")}` : null;
}

/* ------------------------------------------------------------------ */
/* PRICING — demo rules. `demo: true` labels every estimate as example. */
/* Set real numbers and `demo: false` once the business confirms them.   */
/* ------------------------------------------------------------------ */
export const pricing = {
  enabled: true,
  demo: true,
  currency: "£",
  callOutFee: 45,
  labourPerHour: 55,
  extraFixture: 30,
  materialsMarkup: 0.15,
  urgency: { Routine: 0, Urgent: 0.2, Emergency: 0.5 } as Record<string, number>,
  discountPercent: 0,
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  quoteKey: string;
  /** Demo starting price used by the estimator; null = "Request a Quote". */
  from: number | null;
  hours: [number, number];
  description: string;
  problems: string[];
  included: string[];
  extras: string[];
  faqs: { q: string; a: string }[];
  note?: string;
};

const f = (q: string, a: string) => ({ q, a });

export const services: Service[] = [
  { slug: "leak-detection-repair", title: "Leak Detection and Repair", quoteKey: "Leak Repair", from: 70, hours: [1, 3],
    short: "Find and fix hidden or visible leaks before they cause damage.",
    description: "We trace the source of the leak, explain what we find, and carry out a tidy, lasting repair.",
    problems: ["Damp patches on walls or ceilings", "Unexplained rise in water bills", "Dripping joints under sinks", "Sound of running water"],
    included: ["Visual and pressure-based inspection", "Repair of the affected joint or section", "Leak test after repair", "Clear explanation of findings"],
    extras: ["Replacement of worn isolation valves", "Pipe lagging"],
    faqs: [f("Can you find leaks inside walls?", "We'll inspect and advise on the best approach for your property before any work begins.")] },
  { slug: "blocked-drains", title: "Blocked Drains", quoteKey: "Blocked Drain", from: 65, hours: [1, 2],
    short: "Clear slow or blocked sinks, showers, toilets and outside drains.",
    description: "From slow-draining basins to fully blocked outside drains, we clear the blockage and help prevent it returning.",
    problems: ["Water draining slowly", "Gurgling sounds", "Unpleasant smells", "Overflowing gullies"],
    included: ["Assessment of the blockage", "Manual or mechanical clearing", "Flow test", "Prevention advice"],
    extras: ["Trap replacement", "Drain guard fitting"],
    faqs: [f("Do you clear outside drains?", "Yes, accessible outside drains and gullies can be cleared. Larger sewer issues will be assessed on site.")] },
  { slug: "toilet-repairs-installation", title: "Toilet Repairs and Installation", quoteKey: "Toilet Repair", from: 60, hours: [1, 3],
    short: "Fix running, leaking or blocked toilets, or fit a brand-new one.",
    description: "We repair flush mechanisms, fill valves and seals, or remove and install a new toilet neatly.",
    problems: ["Constantly running cistern", "Weak or no flush", "Leaking base", "Wobbly pan"],
    included: ["Diagnosis", "Replacement of faulty parts", "Secure fitting and seal", "Function test"],
    extras: ["Soft-close seat", "Removal of old toilet"],
    faqs: [f("Can I supply my own toilet?", "Yes. We'll check it is complete and suitable before fitting.")] },
  { slug: "tap-faucet-repairs", title: "Tap and Faucet Repairs", quoteKey: "Tap Repair", from: 50, hours: [0.5, 1.5],
    short: "Stop drips and replace worn or outdated taps.",
    description: "Dripping taps waste water and money. We repair cartridges and washers or fit a replacement tap.",
    problems: ["Dripping tap", "Stiff handle", "Low flow", "Leak at the base"],
    included: ["Isolation of supply", "Washer or cartridge replacement", "Tap fitting if required", "Leak check"],
    extras: ["New isolation valves", "Aerator replacement"],
    faqs: [f("Can you fit a tap I bought online?", "Usually yes — tell us the model when booking so we can confirm compatibility.")] },
  { slug: "pipe-repair-replacement", title: "Pipe Repair and Replacement", quoteKey: "Pipe Repair", from: 80, hours: [1, 4],
    short: "Repair damaged sections or replace old, corroded pipework.",
    description: "We repair or replace damaged pipework using quality materials, leaving a neat, tested finish.",
    problems: ["Corroded pipes", "Burst or split sections", "Noisy pipes", "Low water pressure"],
    included: ["Isolation and drain-down", "Section repair or replacement", "Pressure test", "Tidy-up"],
    extras: ["Pipe insulation", "Additional isolation valves"],
    faqs: [f("Do you replace whole runs of pipe?", "Yes, we'll quote after assessing access and length.")] },
  { slug: "bathroom-plumbing", title: "Bathroom Plumbing", quoteKey: "Bathroom Plumbing", from: null, hours: [4, 16],
    short: "Showers, basins, baths and full bathroom plumbing.",
    description: "Plumbing for bathroom upgrades and refits, from a new shower valve to a full first and second fix.",
    problems: ["Poor shower performance", "Leaking bath seals", "Outdated fittings", "Planning a refit"],
    included: ["Site survey", "First and second fix plumbing", "Fixture connection", "Testing"],
    extras: ["Shower pumps", "Concealed valves"],
    faqs: [f("Do you do full bathroom refits?", "We handle the plumbing and can discuss your wider plans during the survey.")] },
  { slug: "kitchen-plumbing", title: "Kitchen Plumbing", quoteKey: "Kitchen Plumbing", from: 70, hours: [1, 4],
    short: "Sinks, waste, appliances and kitchen fittings connected properly.",
    description: "We connect sinks, dishwashers, washing machines and taps with tidy, leak-free pipework.",
    problems: ["Leaking sink waste", "Appliance installation", "Blocked kitchen sink", "Tap replacement"],
    included: ["Supply and waste connection", "Appliance hook-up", "Leak testing"],
    extras: ["Water filter taps", "Additional valves"],
    faqs: [f("Can you plumb in my dishwasher?", "Yes, where a suitable supply and waste are available or can be added.")] },
  { slug: "water-heater-services", title: "Water Heater Services", quoteKey: "Water Heater Service", from: null, hours: [1, 5],
    short: "Repairs and servicing for water heaters and cylinders.",
    description: "Diagnosis, repair and replacement of water heaters and hot water cylinders, within our qualifications.",
    problems: ["No hot water", "Lukewarm water", "Leaking cylinder", "Strange noises"],
    included: ["Diagnosis", "Repair or replacement advice", "Safety checks"],
    extras: ["Thermostat replacement", "Insulation jacket"],
    faqs: [f("Do you work on gas appliances?", "Only where our team holds the appropriate registration — please ask when booking.")] },
  { slug: "plumbing-installation", title: "Plumbing Installation", quoteKey: "Installation", from: null, hours: [2, 8],
    short: "New fixtures, appliances and pipework installed neatly.",
    description: "From outside taps to new radiators and fixtures, we install to a high, tidy standard.",
    problems: ["New fixture needed", "Outside tap", "Additional supply", "Upgrades"],
    included: ["Planning", "Installation", "Testing", "Clean-up"],
    extras: ["Isolation valves", "Pipe boxing"],
    faqs: [f("Do you supply the fixtures?", "We can supply or fit customer-supplied items — let us know your preference.")] },
  { slug: "commercial-plumbing", title: "Commercial Plumbing", quoteKey: "Commercial Plumbing", from: null, hours: [2, 8],
    short: "Reliable plumbing for offices, shops and rental properties.",
    description: "Planned and reactive plumbing for businesses and landlords, with clear communication and minimal disruption.",
    problems: ["Washroom faults", "Kitchen and staff areas", "Planned maintenance", "Tenant call-outs"],
    included: ["Site assessment", "Repairs and installations", "Job reports"],
    extras: ["Maintenance contracts"],
    faqs: [f("Can you work outside opening hours?", "Ask us — we'll confirm what can be arranged for your site.")] },
  { slug: "general-maintenance", title: "General Plumbing Maintenance", quoteKey: "Other", from: 60, hours: [1, 3],
    short: "Routine checks and small jobs to keep things running smoothly.",
    description: "A practical visit to check, adjust and fix the small things before they become big problems.",
    problems: ["Multiple small jobs", "Pre-sale checks", "Annual check-ups"],
    included: ["Visual inspection", "Valve and seal checks", "Minor repairs", "Written notes"],
    extras: ["Maintenance plan enrolment"],
    faqs: [f("Can I list several small jobs?", "Yes — describe them in your booking and we'll plan the visit.")] },
  { slug: "boiler-heating-plumbing", title: "Boiler and Heating Plumbing", quoteKey: "Other", from: null, hours: [2, 6],
    short: "Radiators and heating pipework — where qualified and permitted.",
    description: "Radiator and heating pipework services. Boiler work is only carried out where our team holds the required qualifications and registrations.",
    note: "Offered only where Dropfix is qualified and permitted. Please confirm when enquiring.",
    problems: ["Cold radiators", "Leaking radiator valves", "Noisy heating pipes"],
    included: ["Assessment", "Radiator and valve work", "System checks"],
    extras: ["Thermostatic radiator valves"],
    faqs: [f("Do you service gas boilers?", "Only if our team holds the appropriate gas registration. We will confirm before booking.")] },
];

export const quoteServiceOptions = ["Leak Repair", "Blocked Drain", "Toilet Repair", "Tap Repair", "Pipe Repair", "Bathroom Plumbing", "Kitchen Plumbing", "Water Heater Service", "Installation", "Commercial Plumbing", "Other"];
export const propertyTypes = ["House", "Apartment", "Office", "Shop", "Other"];
export const urgencyOptions = ["Routine", "Urgent", "Emergency"];

export function estimate(input: { service: string; urgency: string; fixtures: number }) {
  if (!pricing.enabled) return null;
  const svc = services.find((s) => s.quoteKey === input.service && s.from !== null);
  if (!svc || svc.from === null) return null;
  const extra = Math.max(0, input.fixtures - 1) * pricing.extraFixture;
  const lo = pricing.callOutFee + svc.from + svc.hours[0] * pricing.labourPerHour * 0.5 + extra;
  const hi = pricing.callOutFee + svc.from + svc.hours[1] * pricing.labourPerHour + extra;
  const mult = (1 + (pricing.urgency[input.urgency] ?? 0)) * (1 + pricing.materialsMarkup) * (1 - pricing.discountPercent / 100);
  const r = (n: number) => Math.round((n * mult) / 5) * 5;
  return { low: r(lo), high: r(hi), currency: pricing.currency, demo: pricing.demo };
}

export const estimateDisclaimer =
  "Your estimate is based on the information provided. The final price may vary depending on inspection, access, materials, labour, and the confirmed scope of work.";

/* ------------------------------------------------------------------ */
export const plans = [
  { id: "essential", name: "Essential Maintenance", for: "For routine plumbing checks and basic maintenance.", price: null as string | null, frequency: "Annual visit",
    checks: ["Visual check of accessible pipework", "Tap and valve check", "Toilet flush and seal check", "Drain flow check"], terms: "Terms and renewal confirmed on enquiry." },
  { id: "home-care", name: "Home Care Plan", for: "For periodic home plumbing inspections and planned maintenance.", price: null as string | null, frequency: "Twice a year", featured: true,
    checks: ["Everything in Essential", "Water heater visual check", "Minor adjustments included", "Written visit summary"], terms: "Terms and renewal confirmed on enquiry." },
  { id: "property-care", name: "Property Care Plan", for: "For landlords and property managers requiring ongoing plumbing maintenance.", price: null as string | null, frequency: "Flexible schedule",
    checks: ["Multi-property scheduling", "Tenant-ready checks", "Visit reports per property", "Priority booking requests"], terms: "Terms and renewal confirmed on enquiry." },
];

/* Before & after — DEMONSTRATION images, not real customer jobs. */
export const projectsDemo = true;

/** Real reviews only. Empty until genuine reviews are supplied. */
export const reviews: { name: string; rating: number; service: string; text: string; date: string }[] = [];

export const faqs = [
  f("What plumbing services do you provide?", "Leak repairs, blocked drains, toilets, taps, pipework, bathroom and kitchen plumbing, water heaters, installations, commercial plumbing and maintenance."),
  f("How much does a plumber cost?", "It depends on the job, access and materials. Use our online estimator for a guide, or request a detailed quote."),
  f("Can I get an online estimate?", "Yes. Our quote calculator gives a guide range where pricing is available. Final prices are confirmed after inspection."),
  f("Do you offer emergency plumbing?", "Please contact us directly about urgent problems and we'll let you know what we can do and when."),
  f("How quickly can a plumber attend?", "Attendance depends on demand and location. We'll give you an honest time when you contact us."),
  f("Can I book online?", "Yes. Submit a booking request with your preferred date and time and we'll confirm availability."),
  f("Can I send photos of my plumbing issue?", "Yes — photos help us understand the problem. You can share them on WhatsApp or attach one when booking."),
  f("Do you repair leaking pipes?", "Yes, from small joint leaks to replacing damaged sections."),
  f("Can you fix blocked drains?", "Yes, including sinks, showers, toilets and accessible outside drains."),
  f("Do you install plumbing fixtures?", "Yes — taps, toilets, basins, showers, appliances and more."),
  f("Do you work with commercial properties?", "Yes, including offices, shops and rental properties."),
  f("Which areas do you cover?", "Contact us with your postcode and we'll confirm whether we cover your area."),
  f("Do you offer maintenance plans?", "Yes. See our Maintenance Plans page and request the plan that suits you."),
  f("Can I rebook a previous service?", "Yes. Use 'Book the same service again' or simply mention your previous job when booking."),
  f("Can I reschedule an appointment?", "Yes — please get in touch as early as possible and we'll find a new time."),
  f("What happens if the final price differs from the estimate?", "We'll explain any difference and agree it with you before carrying out extra work."),
  f("Which payment methods do you accept?", "Accepted payment methods will be confirmed with your quote."),
];

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/our-work", label: "Our Work" },
  { to: "/reviews", label: "Reviews" },
  { to: "/maintenance-plans", label: "Maintenance Plans" },
  { to: "/about", label: "About Us" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;
