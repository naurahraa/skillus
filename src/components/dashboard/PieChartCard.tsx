"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

type Props = {
  title: string;
  data: { name: string; value: number }[];
};

const COLORS = ["#4F4CEE", "#F99007", "#3731D1", "#DD6A02"];

export default function PieChartCard({ title, data }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="font-bold text-[#1A194D] mb-5">{title}</h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #EDF3FF", fontSize: 12 }} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: 12, color: "#6B7280" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}