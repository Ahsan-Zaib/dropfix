import { useState } from "react";
import { z } from "zod";
import { btn } from "@/lib/ui";
import { quoteServiceOptions, waLink } from "@/config/site";
import { WhatsAppButton } from "./Contact";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().regex(/^[+\d][\d\s()-]{6,19}$/, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  service: z.string().min(1, "Please choose a service"),
  address: z.string().trim().min(2, "Please enter your address or postcode").max(200),
  message: z.string().trim().min(5, "Please add a short message").max(1500),
});

export function ContactForm({ service, message }: { service?: string; message?: string }) {
  const [v, setV] = useState({ name: "", phone: "", email: "", service: service && quoteServiceOptions.includes(service) ? service : "", address: "", message: message ?? "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(v);
    if (!r.success) { const m: Record<string, string> = {}; r.error.issues.forEach((i) => (m[String(i.path[0])] = i.message)); setErrors(m); return; }
    setErrors({});
    setState("sending");
    await new Promise((res) => setTimeout(res, 600));
    setState("done");
  };

  if (state === "done")
    return (
      <div className="rounded-3xl border bg-card p-8 shadow-soft" role="status">
        <h3 className="text-2xl font-bold text-navy">Thanks, {v.name.split(" ")[0]}!</h3>
        <p className="mt-3 text-muted-foreground">Your request is ready, but online delivery isn't switched on yet — so it hasn't been sent. Please send it via WhatsApp so our team receives it.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <WhatsAppButton kind="general" label={waLink() ? "Send on WhatsApp" : "WhatsApp coming soon"} extra={`${v.service} at ${v.address}. ${v.message}`} />
          <button onClick={() => setState("idle")} className={btn("outline")}>Edit request</button>
        </div>
      </div>
    );

  const F = ({ k, label, type = "text" }: { k: "name" | "phone" | "email" | "address"; label: string; type?: string }) => (
    <label className="grid gap-1.5 text-xs font-bold uppercase tracking-widest text-navy">
      {label}
      <input type={type} className="field normal-case tracking-normal font-normal" value={v[k]} onChange={set(k)} aria-invalid={!!errors[k]} />
      {errors[k] && <span role="alert" className="normal-case tracking-normal font-medium text-destructive">{errors[k]}</span>}
    </label>
  );

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 rounded-3xl border bg-card p-6 shadow-soft md:p-8 sm:grid-cols-2">
      {F({ k: "name", label: "Name" })}
      {F({ k: "phone", label: "Phone", type: "tel" })}
      {F({ k: "email", label: "Email", type: "email" })}
      <label className="grid gap-1.5 text-xs font-bold uppercase tracking-widest text-navy">
        Service required
        <select className="field normal-case tracking-normal font-normal" value={v.service} onChange={set("service")}><option value="">Select a service</option>{quoteServiceOptions.map((o) => <option key={o}>{o}</option>)}</select>
        {errors.service && <span role="alert" className="normal-case tracking-normal font-medium text-destructive">{errors.service}</span>}
      </label>
      <div className="sm:col-span-2">{F({ k: "address", label: "Address / Postcode" })}</div>
      <label className="grid gap-1.5 text-xs font-bold uppercase tracking-widest text-navy sm:col-span-2">
        Message
        <textarea className="field min-h-32 normal-case tracking-normal font-normal" value={v.message} onChange={set("message")} />
        {errors.message && <span role="alert" className="normal-case tracking-normal font-medium text-destructive">{errors.message}</span>}
      </label>
      <button type="submit" disabled={state === "sending"} className={btn("primary", "lg", "sm:col-span-2 tracking-widest")}>{state === "sending" ? "SENDING…" : "SEND REQUEST"}</button>
    </form>
  );
}
