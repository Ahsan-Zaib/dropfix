import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { z } from "zod";
import { btn } from "@/lib/ui";
import { estimate, estimateDisclaimer, propertyTypes, quoteServiceOptions, urgencyOptions } from "@/config/site";
import { WhatsAppButton } from "./Contact";
import { cn } from "@/lib/utils";

const steps = ["Service", "Problem", "Property", "Date & time", "Your details", "Summary"];

export type BookingSearch = { service?: string; urgency?: string; address?: string; notes?: string };

const detailsSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().regex(/^[+\d][\d\s()-]{6,19}$/, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email address").max(255),
});

export function BookingFlow({ initial }: { initial: BookingSearch }) {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string>("");
  const [d, setD] = useState({
    service: initial.service && quoteServiceOptions.includes(initial.service) ? initial.service : "",
    urgency: initial.urgency && urgencyOptions.includes(initial.urgency) ? initial.urgency : "Routine",
    description: initial.notes ?? "", property: "", address: initial.address ?? "", postcode: "",
    date: "", time: "", name: "", phone: "", email: "", message: "", access: "", contact: "Phone",
  });
  const set = (k: keyof typeof d) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setD({ ...d, [k]: e.target.value });

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0 && !d.service) e.service = "Please choose a service";
    if (s === 1 && d.description.trim().length < 5) e.description = "Please describe the problem in a few words";
    if (s === 2) { if (!d.property) e.property = "Please choose a property type"; if (!d.address.trim()) e.address = "Please enter the service address"; if (!d.postcode.trim()) e.postcode = "Please enter a postcode"; }
    if (s === 3) { if (!d.date) e.date = "Please choose a preferred date"; else if (new Date(d.date) < new Date(new Date().toDateString())) e.date = "Please choose a future date"; if (!d.time) e.time = "Please choose a preferred time"; }
    if (s === 4) { const r = detailsSchema.safeParse(d); if (!r.success) r.error.issues.forEach((i) => (e[String(i.path[0])] = i.message)); }
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const next = () => validate(step) && setStep(step + 1);
  const est = estimate({ service: d.service, urgency: d.urgency, fixtures: 1 });

  const submit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    const ref = "DF-" + Date.now().toString(36).toUpperCase().slice(-6);
    try {
      const list = JSON.parse(localStorage.getItem("dropfix_bookings") || "[]");
      list.unshift({ ref, service: d.service, address: `${d.address}, ${d.postcode}`, date: `${d.date} ${d.time}`, createdAt: new Date().toISOString() });
      localStorage.setItem("dropfix_bookings", JSON.stringify(list.slice(0, 10)));
    } catch { /* ignore */ }
    setSubmitting(false);
    setDone(ref);
  };

  if (done)
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border bg-card p-8 text-center shadow-soft md:p-12 animate-rise">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-accent"><Clock className="size-8 text-primary" /></div>
        <p className="eyebrow">Awaiting confirmation</p>
        <h2 className="mt-2 text-3xl font-bold text-navy">Booking request received</h2>
        <p className="mt-2 text-muted-foreground">Reference <b className="text-navy">{done}</b></p>
        <div className="my-8 grid gap-2 rounded-2xl bg-muted p-6 text-left text-sm">
          <p><b>Service:</b> {d.service}</p>
          <p><b>Requested time:</b> {d.date} · {d.time} (preference, not yet confirmed)</p>
          <p><b>Address:</b> {d.address}, {d.postcode}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          <b className="text-navy">Next steps:</b> online booking delivery isn't connected yet, so this request is saved on this device only.
          To make sure we receive it, please also send it to us on WhatsApp or via the contact page.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <WhatsAppButton kind="booking" extra={`Ref ${done}: ${d.service} on ${d.date} (${d.time}) at ${d.postcode}.`} />
          <Link to="/" className={btn("outline")}>Back to home</Link>
        </div>
      </div>
    );

  return (
    <div className="mx-auto max-w-3xl">
      <ol className="mb-8 grid grid-cols-6 gap-2" aria-label="Booking progress">
        {steps.map((s, i) => (
          <li key={s} className="text-center">
            <div className={cn("mx-auto mb-2 h-1.5 rounded-full", i <= step ? "bg-primary" : "bg-border")} />
            <span className={cn("hidden text-xs font-medium sm:block", i === step ? "text-navy" : "text-muted-foreground")}>{s}</span>
          </li>
        ))}
      </ol>
      <div className="rounded-3xl border bg-card p-6 shadow-soft md:p-10">
        <p className="eyebrow mb-1">Step {step + 1} of {steps.length + 1}</p>
        <h2 className="mb-6 text-2xl font-bold text-navy">{["Choose the plumbing service", "Describe the problem", "Property details", "Preferred date and time", "Your details", "Check your booking"][step]}</h2>

        {step === 0 && (
          <div className="grid gap-2 sm:grid-cols-2">
            {quoteServiceOptions.map((o) => (
              <button type="button" key={o} onClick={() => setD({ ...d, service: o })} className={cn("flex items-center justify-between rounded-xl border px-4 py-3 text-left font-medium transition", d.service === o ? "border-primary bg-accent text-navy" : "hover:border-primary")}>
                {o}{d.service === o && <Check className="size-4 text-primary" />}
              </button>
            ))}
            <Err m={errors.service} />
          </div>
        )}
        {step === 1 && (
          <div className="grid gap-4">
            <L label="What's happening? *"><textarea className="field min-h-32" value={d.description} onChange={set("description")} maxLength={1000} /><Err m={errors.description} /></L>
            <L label="Urgency"><select className="field" value={d.urgency} onChange={set("urgency")}>{urgencyOptions.map((u) => <option key={u}>{u}</option>)}</select></L>
            <L label="Photo (optional)"><input type="file" accept="image/*" className="field" onChange={(e) => setPhoto(e.target.files?.[0]?.name ?? "")} />
              {photo && <span className="text-xs font-normal text-muted-foreground">Selected: {photo}. Photo uploads aren't connected yet — please also share it on WhatsApp.</span>}</L>
          </div>
        )}
        {step === 2 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <L label="Property type *"><select className="field" value={d.property} onChange={set("property")}><option value="">Select</option>{propertyTypes.map((p) => <option key={p}>{p}</option>)}</select><Err m={errors.property} /></L>
            <L label="Postcode *"><input className="field" value={d.postcode} onChange={set("postcode")} maxLength={12} /><Err m={errors.postcode} /></L>
            <L label="Service address *" full><input className="field" value={d.address} onChange={set("address")} maxLength={200} /><Err m={errors.address} /></L>
          </div>
        )}
        {step === 3 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <L label="Preferred date *"><input type="date" className="field" value={d.date} onChange={set("date")} /><Err m={errors.date} /></L>
            <L label="Preferred time *"><select className="field" value={d.time} onChange={set("time")}><option value="">Select</option><option>Morning (8am–12pm)</option><option>Afternoon (12pm–4pm)</option><option>Late afternoon (4pm–6pm)</option></select><Err m={errors.time} /></L>
            <p className="text-xs text-muted-foreground sm:col-span-2">Times are preferences — we'll confirm actual availability with you.</p>
          </div>
        )}
        {step === 4 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <L label="Full name *"><input className="field" autoComplete="name" value={d.name} onChange={set("name")} /><Err m={errors.name} /></L>
            <L label="Phone number *"><input className="field" type="tel" autoComplete="tel" value={d.phone} onChange={set("phone")} /><Err m={errors.phone} /></L>
            <L label="Email address *"><input className="field" type="email" autoComplete="email" value={d.email} onChange={set("email")} /><Err m={errors.email} /></L>
            <L label="Preferred contact method"><select className="field" value={d.contact} onChange={set("contact")}><option>Phone</option><option>Email</option><option>WhatsApp</option></select></L>
            <L label="Access instructions" full><input className="field" value={d.access} onChange={set("access")} placeholder="e.g. Parking, door code, pets" /></L>
            <L label="Additional message" full><textarea className="field" value={d.message} onChange={set("message")} maxLength={1000} /></L>
          </div>
        )}
        {step === 5 && (
          <div className="grid gap-4 text-sm">
            <dl className="grid gap-3 rounded-2xl bg-muted p-6 sm:grid-cols-2">
              {[["Service", d.service], ["Urgency", d.urgency], ["Problem", d.description], ["Property", d.property], ["Address", `${d.address}, ${d.postcode}`], ["Preferred time", `${d.date} · ${d.time}`], ["Name", d.name], ["Phone", d.phone], ["Email", d.email], ["Contact by", d.contact]].map(([k, v]) => (
                <div key={k}><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{k}</dt><dd className="mt-0.5 text-navy">{v}</dd></div>
              ))}
            </dl>
            {est && <p className="rounded-2xl bg-accent p-4 text-accent-foreground"><b>Guide estimate:</b> {est.currency}{est.low}–{est.currency}{est.high}{est.demo && " (example pricing)"}. <span className="block text-xs mt-1">{estimateDisclaimer}</span></p>}
          </div>
        )}

        <div className="mt-8 flex justify-between gap-3">
          <button type="button" onClick={() => setStep(step - 1)} disabled={step === 0} className={btn("outline")}><ChevronLeft className="size-4" /> Back</button>
          {step < 5 ? (
            <button type="button" onClick={next} className={btn("primary")}>Continue <ChevronRight className="size-4" /></button>
          ) : (
            <button type="button" onClick={submit} disabled={submitting} className={btn("primary")}>{submitting ? "Submitting…" : "Submit Booking Request"}</button>
          )}
        </div>
      </div>
    </div>
  );
}

function L({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return <label className={cn("grid gap-1.5 text-sm font-semibold text-navy", full && "sm:col-span-2")}>{label}{children}</label>;
}
function Err({ m }: { m?: string }) {
  return m ? <span role="alert" className="text-xs font-medium text-destructive sm:col-span-2">{m}</span> : null;
}
