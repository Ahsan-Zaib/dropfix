import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Layout";

const sections = [
  ["Information we collect", "When you request a quote, booking or contact us, we collect the details you provide such as your name, phone, email, address and a description of the job."],
  ["How we use it", "We use your information only to respond to your enquiry, arrange and carry out work, and — with your consent — send follow-up or maintenance reminders."],
  ["Information stored on your device", "To make rebooking easier, a short summary of your booking requests may be stored in your browser. You can clear it at any time through your browser settings."],
  ["Sharing", "We do not sell your information. We share it only where needed to deliver our services or where required by law."],
  ["Your rights", "You can ask to access, correct or delete your personal information, or withdraw consent for marketing messages, by contacting us."],
];

export const Route = createFileRoute("/privacy")({
  head: () => seo("Privacy Policy | Dropfix", "How Dropfix collects, uses and protects your personal information."),
  component: () => (
    <>
      <PageHeader title="Privacy Policy" intro="This policy is a template and should be reviewed by the business before publishing." />
      <section className="section-y"><div className="container-x max-w-3xl space-y-8">{sections.map(([t, d]) => <div key={t}><h2 className="text-xl font-bold text-navy">{t}</h2><p className="mt-2 text-muted-foreground">{d}</p></div>)}</div></section>
    </>
  ),
});
