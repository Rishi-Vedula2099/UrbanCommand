"use client";

import {
  Truck,
  Droplets,
  Shield,
  Ambulance,
  Flame,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import type { AnalyticsStat } from "@repo/shared-types";
import { KPICard } from "@/components/dashboard/KPICard";
import { LiveFeed } from "@/components/dashboard/LiveFeed";
import {
  MOCK_KPI_STATS,
  MOCK_VEHICLES,
  MOCK_INCIDENTS,
  MOCK_AI_ALERTS,
} from "@/lib/mockData";
import { clsx } from "clsx";

const VEHICLE_TYPE_META = {
  garbage_truck: {
    Icon: Truck,
    label: "Garbage Trucks",
    color: "text-city-amber",
  },
  water_tanker: {
    Icon: Droplets,
    label: "Water Tankers",
    color: "text-city-cyan",
  },
  police_patrol: {
    Icon: Shield,
    label: "Police Patrols",
    color: "text-city-indigo",
  },
  ambulance: { Icon: Ambulance, label: "Ambulances", color: "text-city-rose" },
  fire_truck: { Icon: Flame, label: "Fire Engines", color: "text-city-rose" },
};

const KPI_ICONS = [
  <Truck key="t" className="w-4 h-4" />,
  <Shield key="s" className="w-4 h-4" />,
  <Ambulance key="a" className="w-4 h-4" />,
  <TrendingUp key="tu" className="w-4 h-4" />,
  <Flame key="f" className="w-4 h-4" />,
  <Droplets key="d" className="w-4 h-4" />,
];

const KPI_COLORS = [
  "cyan",
  "rose",
  "amber",
  "emerald",
  "indigo",
  "emerald",
] as const;
const KPI_UNITS = ["", "", " min", "", "", "%"];

const STATUS_DOT: Record<string, string> = {
  active: "bg-city-emerald",
  idle: "bg-city-amber",
  offline: "bg-city-muted",
  emergency: "bg-city-rose animate-pulse",
  maintenance: "bg-city-indigo",
};

const ALERT_COLORS = {
  bottleneck: "text-city-amber border-city-amber/20 bg-city-amber/5",
  anomaly: "text-city-rose border-city-rose/20 bg-city-rose/5",
  delay: "text-city-amber border-city-amber/20 bg-city-amber/5",
  route_suggestion:
    "text-city-emerald border-city-emerald/20 bg-city-emerald/5",
};

export default function DashboardPage() {
  // Compute fleet summary
  const fleetSummary = Object.entries(VEHICLE_TYPE_META).map(
    ([type, meta]) => ({
      ...meta,
      count: MOCK_VEHICLES.filter((v) => v.type === type).length,
      active: MOCK_VEHICLES.filter(
        (v) => v.type === type && v.status === "active",
      ).length,
    }),
  );

  const recentIncidents = MOCK_INCIDENTS.slice(0, 5);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">
            Good afternoon, <span className="gradient-text">Admin</span> 👋
          </h2>
          <p className="text-sm text-city-muted mt-0.5">
            Here's your city overview for today
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-emerald">● System Normal</span>
          <span className="text-xs text-city-muted">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {MOCK_KPI_STATS.map((stat, i) => (
          <KPICard
            key={stat.label}
            stat={stat}
            unit={KPI_UNITS[i]}
            icon={KPI_ICONS[i]}
            color={KPI_COLORS[i]}
          />
        ))}
      </div>

      {/* Middle Row: Fleet Summary + Incidents + Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[340px]">
        {/* Fleet Summary */}
        <div className="glass-card p-4 flex flex-col">
          <h3 className="text-sm font-semibold text-slate-200 mb-3">
            Fleet Summary
          </h3>
          <div className="space-y-2 flex-1 overflow-auto hide-scrollbar">
            {fleetSummary.map(({ Icon, label, color, count, active }) => (
              <div
                key={label}
                className="flex items-center justify-between p-2.5 rounded-lg bg-city-surface/40 hover:bg-city-surface/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-md bg-city-bg border border-city-border">
                    <Icon className={clsx("w-3.5 h-3.5", color)} />
                  </div>
                  <span className="text-sm text-slate-300">{label}</span>
                </div>
                <div className="text-right">
                  <p className={clsx("text-sm font-bold", color)}>{count}</p>
                  <p className="text-[10px] text-city-muted">{active} active</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="glass-card flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-city-border/60">
            <span className="text-sm font-semibold text-slate-200">
              Recent Incidents
            </span>
            <a
              href="/incidents"
              className="text-xs text-city-cyan hover:text-cyan-300 transition-colors"
            >
              View all →
            </a>
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {recentIncidents.map((inc) => (
              <div
                key={inc.id}
                className="flex items-start gap-3 px-4 py-2.5 border-b border-city-border/40 hover:bg-city-surface/40 transition-colors cursor-pointer"
              >
                <span
                  className={clsx("status-dot mt-1.5 flex-shrink-0", {
                    "bg-city-rose": inc.severity === "critical",
                    "bg-city-amber": inc.severity === "high",
                    "bg-city-indigo": inc.severity === "medium",
                    "bg-city-muted": inc.severity === "low",
                  })}
                />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-200 truncate">
                    {inc.title}
                  </p>
                  <p className="text-[10px] text-city-muted">
                    {inc.address ?? inc.category} ·{" "}
                    {inc.status.replace("_", " ")}
                  </p>
                </div>
                <span
                  className={clsx("badge flex-shrink-0 text-[10px]", {
                    "badge-rose": inc.severity === "critical",
                    "badge-amber": inc.severity === "high",
                    "badge-indigo": inc.severity === "medium",
                    "badge-muted": inc.severity === "low",
                  })}
                >
                  {inc.severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Feed */}
        <LiveFeed />
      </div>

      {/* Bottom Row: AI Alerts + Active Vehicles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* AI Alerts */}
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1 rounded-md bg-city-indigo/10">
              <TrendingUp className="w-3.5 h-3.5 text-city-indigo" />
            </div>
            <span className="text-sm font-semibold text-slate-200">
              AI Predictions & Alerts
            </span>
            <span className="badge badge-indigo ml-auto">
              {MOCK_AI_ALERTS.length} active
            </span>
          </div>
          <div className="space-y-2">
            {MOCK_AI_ALERTS.map((alert) => (
              <div
                key={alert.id}
                className={clsx(
                  "p-3 rounded-lg border text-xs",
                  ALERT_COLORS[alert.type],
                )}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-medium capitalize">
                    {alert.type.replace("_", " ")}
                  </span>
                  <span
                    className={clsx("badge text-[10px]", {
                      "badge-rose": alert.severity === "critical",
                      "badge-amber": alert.severity === "high",
                      "badge-indigo": alert.severity === "medium",
                      "badge-muted": alert.severity === "low",
                    })}
                  >
                    {alert.severity}
                  </span>
                </div>
                <p className="text-slate-400 leading-snug">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Vehicles mini-table */}
        <div className="glass-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-city-border/60">
            <span className="text-sm font-semibold text-slate-200">
              Active Vehicles
            </span>
            <a
              href="/vehicles"
              className="text-xs text-city-cyan hover:text-cyan-300 transition-colors"
            >
              Manage fleet →
            </a>
          </div>
          <div className="overflow-auto hide-scrollbar max-h-[220px]">
            <table className="city-table">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Speed</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_VEHICLES.filter((v) => v.status !== "offline").map(
                  (v) => (
                    <tr key={v.id} className="cursor-pointer">
                      <td>
                        <span className="font-medium text-slate-200 text-xs">
                          {v.name}
                        </span>
                        <br />
                        <span className="text-[10px] text-city-muted font-mono">
                          {v.licensePlate}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs capitalize">
                          {v.type.replace("_", " ")}
                        </span>
                      </td>
                      <td>
                        <span
                          className={clsx("flex items-center gap-1.5 text-xs", {
                            "text-city-emerald": v.status === "active",
                            "text-city-amber": v.status === "idle",
                            "text-city-rose": v.status === "emergency",
                            "text-city-indigo": v.status === "maintenance",
                            "text-city-muted": v.status === "offline",
                          })}
                        >
                          <span
                            className={clsx(
                              "w-1.5 h-1.5 rounded-full",
                              STATUS_DOT[v.status],
                            )}
                          />
                          {v.status}
                        </span>
                      </td>
                      <td>
                        <span className="font-mono text-xs text-city-muted">
                          {v.location.speed ?? 0} km/h
                        </span>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
