"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type Props = {
  title: string;
  data: { label: string; value: number }[];
  color?: string;
};

export default function BarChartCard({ title, data, color = "#4F4CEE" }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="font-bold text-[#1A194D] mb-5">{title}</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: "#6B7280" }}
            axisLine={{ stroke: "#E5E7EB" }}
            tickLine={false}
          />
          <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip
            cursor={{ fill: "#F8F9FB" }}
            contentStyle={{ borderRadius: 8, border: "1px solid #EDF3FF", fontSize: 12 }}
          />
          <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}