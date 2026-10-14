import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Layout";
import { EmergencySection, FaqList } from "@/components/site/Sections";

export const Route = createFileRoute("/emergency")({
  head: () => seo("Urgent Plumbing Help | Dropfix", "Burst pipe, major leak or overflowing toilet? Contact Dropfix for urgent plumbing assistance."),
  component: () => (
    <>
      <PageHeader eyebrow="Urgent plumbing" title="Water where it shouldn't be?" intro="Turn off the water at your stopcock if it's safe to do so, avoid electrics near water, then contact us." />
      <EmergencySection />
      <section className="section-y"><div className="container-x"><FaqList limit={5} /></div></section>
    </>
  ),
});
