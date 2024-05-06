import AnalyticsChart from "@/components/billing/analytics-chart";

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
      value: 30,
    },
  ];

  return (
    <div>
      <h1>Billing</h1>
      <AnalyticsChart data={data} />
    </div>
  );
}
