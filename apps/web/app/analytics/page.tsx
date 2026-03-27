"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  MOCK_VEHICLE_ACTIVITY,
  MOCK_INCIDENT_TREND,
  MOCK_VEHICLES,
} from "@/lib/mockData";

const CUSTOM_TOOLTIP_STYLE = {
  contentStyle: {
    background: "#0C1425",
    border: "1px solid #1A2744",
    borderRadius: "8px",
    fontSize: "11px",
    color: "#E2E8F0",
  },
  labelStyle: { color: "#4B6080", marginBottom: "4px" },
};

const VEHICLE_TYPE_DISTRIBUTION = [
  {
    name: "Garbage Trucks",
    value: MOCK_VEHICLES.filter((v) => v.type === "garbage_truck").length,
    color: "#F59E0B",
  },
  {
    name: "Water Tankers",
    value: MOCK_VEHICLES.filter((v) => v.type === "water_tanker").length,
    color: "#00E5FF",
  },
  {
    name: "Police Patrols",
    value: MOCK_VEHICLES.filter((v) => v.type === "police_patrol").length,
    color: "#6366F1",
  },
  {
    name: "Ambulances",
    value: MOCK_VEHICLES.filter((v) => v.type === "ambulance").length,
    color: "#F43F5E",
  },
  {
    name: "Fire Trucks",
    value: MOCK_VEHICLES.filter((v) => v.type === "fire_truck").length,
    color: "#EF4444",
  },
];

const RESPONSE_TIME_DATA = Array.from({ length: 14 }, (_, i) => ({
  day: i + 1,
  avg: Math.floor(Math.random() * 8) + 8,
  target: 15,
}));

function ChartCard({
  title,
  children,
  subtitle,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card p-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
        {subtitle && (
          <p className="text-xs text-city-muted mt-0.5">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      {/* Row 1: Vehicle Activity + Incident Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Vehicle Activity — 24 Hours"
          subtitle="Active vs idle vs offline by hour"
        >
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={MOCK_VEHICLE_ACTIVITY}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradIdle" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A2744" />
              <XAxis
                dataKey="hour"
                tickFormatter={(h) => `${h}h`}
                tick={{ fontSize: 10, fill: "#4B6080" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#4B6080" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip {...CUSTOM_TOOLTIP_STYLE} />
              <Area
                type="monotone"
                dataKey="active"
                stroke="#10B981"
                fill="url(#gradActive)"
                strokeWidth={2}
                name="Active"
              />
              <Area
                type="monotone"
                dataKey="idle"
                stroke="#F59E0B"
                fill="url(#gradIdle)"
                strokeWidth={2}
                name="Idle"
              />
              <Area
                type="monotone"
                dataKey="offline"
                stroke="#4B6080"
                fill="none"
                strokeWidth={1}
                strokeDasharray="4 4"
                name="Offline"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Incident Trend — Last 14 Days"
          subtitle="Open vs resolved incidents daily"
        >
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={MOCK_INCIDENT_TREND}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              barSize={8}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1A2744"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 9, fill: "#4B6080" }}
                axisLine={false}
                tickLine={false}
                interval={2}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#4B6080" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip {...CUSTOM_TOOLTIP_STYLE} />
              <Legend
                wrapperStyle={{
                  fontSize: "11px",
                  color: "#4B6080",
                  marginTop: "8px",
                }}
              />
              <Bar
                dataKey="open"
                fill="#F43F5E"
                radius={[3, 3, 0, 0]}
                name="Open"
              />
              <Bar
                dataKey="resolved"
                fill="#10B981"
                radius={[3, 3, 0, 0]}
                name="Resolved"
              />
              <Bar
                dataKey="critical"
                fill="#F59E0B"
                radius={[3, 3, 0, 0]}
                name="Critical"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 2: Response Time + Fleet Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartCard
            title="Avg Response Time (minutes)"
            subtitle="Target: 15 min — Current 14-day trend"
          >
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={RESPONSE_TIME_DATA}
                margin={{ top: 0, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2744" />
                <XAxis
                  dataKey="day"
                  tickFormatter={(d) => `D${d}`}
                  tick={{ fontSize: 10, fill: "#4B6080" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 25]}
                  tick={{ fontSize: 10, fill: "#4B6080" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip {...CUSTOM_TOOLTIP_STYLE} />
                <Line
                  type="monotone"
                  dataKey="avg"
                  stroke="#00E5FF"
                  strokeWidth={2}
                  dot={{ fill: "#00E5FF", r: 3 }}
                  name="Avg Time"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#F43F5E"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="Fleet by Type" subtitle="Vehicle type distribution">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={VEHICLE_TYPE_DISTRIBUTION}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {VEHICLE_TYPE_DISTRIBUTION.map((entry, index) => (
                  <Cell key={index} fill={entry.color} opacity={0.85} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={CUSTOM_TOOLTIP_STYLE.contentStyle}
                formatter={(value, name) => [value, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {VEHICLE_TYPE_DISTRIBUTION.map((d) => (
              <div
                key={d.name}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: d.color }}
                  />
                  <span className="text-city-muted">{d.name}</span>
                </div>
                <span className="font-medium text-slate-300">{d.value}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Row 3: Performance Summary Table */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold text-slate-200 mb-4">
          Fleet Performance Summary
        </h3>
        <div className="overflow-x-auto">
          <table className="city-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Type</th>
                <th>Uptime %</th>
                <th>Incidents Handled</th>
                <th>Avg Speed</th>
                <th>Routes Today</th>
                <th>AI Optimized</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_VEHICLES.map((v) => {
                const uptime = Math.floor(Math.random() * 20) + 75;
                const incidents = Math.floor(Math.random() * 5);
                const routes = Math.floor(Math.random() * 8) + 1;
                const aiOpt = Math.random() > 0.4;
                return (
                  <tr key={v.id}>
                    <td className="font-medium text-slate-200">{v.name}</td>
                    <td className="capitalize text-xs">
                      {v.type.replace("_", " ")}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-city-border rounded-full overflow-hidden w-16">
                          <div
                            className={
                              uptime >= 85
                                ? "h-full bg-city-emerald rounded-full"
                                : "h-full bg-city-amber rounded-full"
                            }
                            style={{ width: `${uptime}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-300">
                          {uptime}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="font-mono text-xs">{incidents}</span>
                    </td>
                    <td>
                      <span className="font-mono text-xs">
                        {v.location.speed ?? 0} km/h
                      </span>
                    </td>
                    <td>
                      <span className="font-mono text-xs">{routes}</span>
                    </td>
                    <td>
                      {aiOpt ? (
                        <span className="badge badge-indigo text-[10px]">
                          ✓ Optimized
                        </span>
                      ) : (
                        <span className="badge badge-muted text-[10px]">
                          Manual
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
