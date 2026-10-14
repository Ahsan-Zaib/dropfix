import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Layout";

const sections = [
  ["Estimates and quotes", "Online estimates are guides only. The final price may vary depending on inspection, access, materials, labour, and the confirmed scope of work, and will be agreed before work starts."],
  ["Bookings", "Online booking requests are preferences and are not confirmed until Dropfix contacts you to confirm a date and time."],
  ["Cancellations and rescheduling", "Please let us know as early as possible if you need to change or cancel an appointment."],
  ["Maintenance plans", "Plan details, prices and renewal terms are confirmed in writing on enquiry. No automatic recurring charges are taken through this website."],
  ["Liability", "We carry out work with reasonable care and skill. Specific guarantees are only those confirmed in writing for your job."],
];

export const Route = createFileRoute("/terms")({
  head: () => seo("Terms and Conditions | Dropfix", "Terms covering Dropfix estimates, bookings, maintenance plans and services."),
  component: () => (
    <>
      <PageHeader title="Terms and Conditions" intro="These terms are a template and should be reviewed by the business before publishing." />
      <section className="section-y"><div className="container-x max-w-3xl space-y-8">{sections.map(([t, d]) => <div key={t}><h2 className="text-xl font-bold text-navy">{t}</h2><p className="mt-2 text-muted-foreground">{d}</p></div>)}</div></section>
    </>
  ),
});
