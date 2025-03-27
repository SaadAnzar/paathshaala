import AnalyticsChart from "@/components/billing/analytics-chart";
import Pricing from "@/components/billing/pricing";

export default function Subscription() {
  const data = [
    {
      id: "Credits Used",
      label: "Credits Used",
      value: 10,
    },
    {
      id: "Credits Remaining",
      label: "Credits Remaining",
      value: 20,
    },
  ];

  return (
    <div className="space-y-6">
      <AnalyticsChart data={data} />
      <Pricing />
    </div>
  );
}
