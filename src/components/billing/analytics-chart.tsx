"use client";

import { ResponsivePie } from "@nivo/pie";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsChart({ data }: { data: any }) {
  return (
    <Card className="relative h-full min-h-[200px] rounded-xl px-6 text-black">
      <CardHeader className="flex justify-center pb-0">
        <div className="flex justify-center">
          <CardTitle className="flex justify-center gap-4 text-3xl font-bold tracking-tight">
            Credits Usage Analytics
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-3 px-4">
          <div className="flex h-64 gap-2 text-lg font-bold">
            <ResponsivePie
              data={data}
              margin={{ top: 30, right: 60, bottom: 30, left: 0 }}
              innerRadius={0.5}
              padAngle={4}
              startAngle={-250}
              cornerRadius={1}
              activeOuterRadiusOffset={8}
              borderWidth={4}
              colors={{ scheme: "set2" }}
              borderColor={{
                from: "color",
                modifiers: [["darker", 0.3]],
              }}
              arcLinkLabelsTextColor="#000"
              arcLinkLabelsThickness={3}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 5]],
              }}
              motionConfig="wobbly"
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              fill={[
                {
                  match: {
                    id: "Credits Used",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "Credits Remaining",
                  },
                  id: "lines",
                },
              ]}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
