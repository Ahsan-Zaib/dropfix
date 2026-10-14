import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Calculator } from "lucide-react";
import { btn } from "@/lib/ui";
import { estimate, estimateDisclaimer, propertyTypes, quoteServiceOptions, urgencyOptions } from "@/config/site";
import { WhatsAppButton } from "./Contact";
import { DemoNote } from "./Layout";

export function QuoteCalculator() {
  const [f, setF] = useState({ service: "", property: "", urgency: "Routine", description: "", fixtures: 1, postcode: "", date: "", time: "", notes: "" });
  const [result, setResult] = useState<ReturnType<typeof estimate> | "none" | null>(null);
  const [err, setErr] = useState("");
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF({ ...f, [k]: k === "fixtures" ? Number(e.target.value) : e.target.value });

  const run = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.service || !f.property) { setErr("Please choose a service and property type."); return; }
    setErr("");
    setResult(estimate({ service: f.service, urgency: f.urgency, fixtures: f.fixtures }) ?? "none");
  };

  const summary = `Service: ${f.service || "-"}, Property: ${f.property || "-"}, Urgency: ${f.urgency}. ${f.description}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <form onSubmit={run} className="grid gap-5 rounded-3xl border bg-card p-6 shadow-soft md:p-8 sm:grid-cols-2" noValidate>
        <Field label="Service type *">
          <select className="field" value={f.service} onChange={set("service")}><option value="">Select a service</option>{quoteServiceOptions.map((o) => <option key={o}>{o}</option>)}</select>
        </Field>
        <Field label="Property type *">
          <select className="field" value={f.property} onChange={set("property")}><option value="">Select property</option>{propertyTypes.map((o) => <option key={o}>{o}</option>)}</select>
        </Field>
        <fieldset className="sm:col-span-2">
          <legend className="mb-2 text-sm font-semibold text-navy">Problem urgency</legend>
          <div className="grid grid-cols-3 gap-2">
            {urgencyOptions.map((u) => (
              <label key={u} className={`cursor-pointer rounded-xl border px-3 py-3 text-center text-sm font-semibold transition ${f.urgency === u ? (u === "Emergency" ? "border-emergency bg-emergency/10 text-navy" : "border-primary bg-accent text-navy") : "hover:border-primary"}`}>
                <input type="radio" name="urgency" value={u} checked={f.urgency === u} onChange={set("urgency")} className="sr-only" />{u}
              </label>
            ))}
          </div>
        </fieldset>
        <Field label="Problem description" full><textarea className="field min-h-24" value={f.description} onChange={set("description")} placeholder="e.g. Kitchen tap dripping constantly" /></Field>
        <Field label="Number of affected fixtures"><input type="number" min={1} max={20} className="field" value={f.fixtures} onChange={set("fixtures")} /></Field>
        <Field label="Postcode or address"><input className="field" value={f.postcode} onChange={set("postcode")} /></Field>
        <Field label="Preferred date"><input type="date" className="field" value={f.date} onChange={set("date")} /></Field>
        <Field label="Preferred time"><select className="field" value={f.time} onChange={set("time")}><option value="">Any time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></Field>
        <Field label="Additional notes" full><input className="field" value={f.notes} onChange={set("notes")} /></Field>
        <p className="text-xs text-muted-foreground sm:col-span-2">Got a photo? Share it on WhatsApp after requesting your quote.</p>
        {err && <p role="alert" className="text-sm font-medium text-destructive sm:col-span-2">{err}</p>}
        <button type="submit" className={btn("primary", "lg", "sm:col-span-2")}><Calculator className="size-4" /> Get My Estimate</button>
      </form>

      <aside className="flex flex-col rounded-3xl bg-navy p-8 text-navy-foreground" aria-live="polite">
        <p className="eyebrow">Your estimate</p>
        {result === null && <p className="mt-4 text-navy-foreground/70">Fill in the details and press “Get My Estimate”.</p>}
        {result === "none" && (
          <div className="mt-4"><p className="font-display text-2xl font-bold">Request a Quote</p><p className="mt-2 text-sm text-navy-foreground/70">This job needs a personal assessment, so we'll prepare a detailed quote for you.</p></div>
        )}
        {result && result !== "none" && (
          <div className="mt-4">
            {result.demo && <DemoNote>Example pricing — not confirmed Dropfix prices</DemoNote>}
            <p className="mt-4 font-display text-5xl font-bold">{result.currency}{result.low}<span className="text-navy-foreground/50"> – </span>{result.currency}{result.high}</p>
            <p className="mt-2 text-sm text-navy-foreground/70">{f.service} · {f.property} · {f.urgency}</p>
          </div>
        )}
        <p className="mt-6 text-xs text-navy-foreground/60">{estimateDisclaimer}</p>
        <div className="mt-auto grid gap-2 pt-8">
          <Link to="/contact" search={{ service: f.service || undefined, message: summary }} className={btn("ghostLight")}>Request a Detailed Quote</Link>
          <Link to="/book" search={{ service: f.service || undefined, urgency: f.urgency, notes: f.description || undefined }} className={btn("primary")}>Continue to Booking</Link>
          <WhatsAppButton kind="quote" label="Ask on WhatsApp" extra={summary} />
        </div>
      </aside>
    </div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return <label className={`grid gap-1.5 text-sm font-semibold text-navy ${full ? "sm:col-span-2" : ""}`}>{label}{children}</label>;
}
