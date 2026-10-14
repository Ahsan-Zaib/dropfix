import { createFileRoute } from "@tanstack/react-router";
import { Check, Minus } from "lucide-react";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Layout";
import { PlansSection } from "@/components/site/Sections";

const rows: [string, boolean, boolean, boolean][] = [
  ["Pipework, tap and valve checks", true, true, true],
  ["Toilet and drain checks", true, true, true],
  ["Water heater visual check", false, true, true],
  ["Written visit summary", false, true, true],
  ["Multi-property scheduling", false, false, true],
];

export const Route = createFileRoute("/maintenance-plans")({
  head: () => seo("Plumbing Maintenance Plans | Dropfix", "Planned plumbing maintenance for homeowners, landlords and property managers. Prevent problems before they start."),
  component: () => (
    <>
      <PageHeader eyebrow="Maintenance plans" title="Prevent Problems Before They Start." intro="Regular checks catch small issues early — saving money, mess and stress." />
      <PlansSection />
      <section className="section-y">
        <div className="container-x overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead><tr className="border-b"><th className="py-4 font-semibold">Compare plans</th>{["Essential", "Home Care", "Property Care"].map((h) => <th key={h} className="py-4 text-center font-semibold text-navy">{h}</th>)}</tr></thead>
            <tbody>{rows.map(([l, ...v]) => <tr key={l} className="border-b"><td className="py-4">{l}</td>{v.map((x, i) => <td key={i} className="text-center">{x ? <Check className="mx-auto size-5 text-primary" /> : <Minus className="mx-auto size-5 text-border" />}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>
    </>
  ),
});
