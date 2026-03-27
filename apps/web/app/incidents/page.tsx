"use client";

import { useState, useMemo } from "react";
import {
  AlertTriangle,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  Flame,
  Waves,
  Zap,
  Trash2,
} from "lucide-react";
import { useIncidentStore } from "@/store/incidentStore";
import { MOCK_INCIDENTS } from "@/lib/mockData";
import type {
  Incident,
  IncidentSeverity,
  IncidentStatus,
} from "@repo/shared-types";
import { clsx } from "clsx";
import { useEffect } from "react";

const SEVERITY_STYLES: Record<
  IncidentSeverity,
  { badge: string; dot: string }
> = {
  critical: { badge: "badge-rose", dot: "bg-city-rose" },
  high: { badge: "badge-amber", dot: "bg-city-amber" },
  medium: { badge: "badge-indigo", dot: "bg-city-indigo" },
  low: { badge: "badge-muted", dot: "bg-city-muted" },
};

const STATUS_LABEL: Record<IncidentStatus, { label: string; class: string }> = {
  open: { label: "Open", class: "text-city-rose" },
  in_progress: { label: "In Progress", class: "text-city-amber" },
  resolved: { label: "Resolved", class: "text-city-emerald" },
  closed: { label: "Closed", class: "text-city-muted" },
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  pothole: <AlertTriangle className="w-3.5 h-3.5" />,
  flood: <Waves className="w-3.5 h-3.5" />,
  power_outage: <Zap className="w-3.5 h-3.5" />,
  garbage_overflow: <Trash2 className="w-3.5 h-3.5" />,
  fire: <Flame className="w-3.5 h-3.5" />,
};

function IncidentCard({ incident }: { incident: Incident }) {
  const sv = SEVERITY_STYLES[incident.severity];
  const st = STATUS_LABEL[incident.status];
  const { updateIncidentStatus } = useIncidentStore();

  return (
    <div
      className={clsx(
        "glass-card p-4 hover:border-city-border transition-all cursor-pointer group animate-slide-up",
        incident.severity === "critical" &&
          "border-city-rose/30 bg-city-rose/5",
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-start gap-2.5 min-w-0">
          <div
            className={clsx("p-1.5 rounded-md mt-0.5 flex-shrink-0", {
              "bg-city-rose/10 text-city-rose":
                incident.severity === "critical",
              "bg-city-amber/10 text-city-amber": incident.severity === "high",
              "bg-city-indigo/10 text-city-indigo":
                incident.severity === "medium",
              "bg-city-muted/10 text-city-muted": incident.severity === "low",
            })}
          >
            {CATEGORY_ICONS[incident.category] ?? (
              <AlertTriangle className="w-3.5 h-3.5" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-100 truncate">
              {incident.title}
            </p>
            <p className="text-xs text-city-muted flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" />
              {incident.address ?? incident.category}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className={clsx("badge", sv.badge)}>{incident.severity}</span>
          <span className={clsx("text-[10px] font-medium", st.class)}>
            ● {st.label}
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-snug mb-3">
        {incident.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-[10px] text-city-muted">
          <Clock className="w-3 h-3" />
          {new Date(incident.createdAt).toLocaleString("en-IN", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {incident.status !== "resolved" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                updateIncidentStatus(incident.id, "resolved");
              }}
              className="btn-ghost py-1 px-2 text-[10px] flex items-center gap-1"
            >
              <CheckCircle2 className="w-3 h-3" /> Resolve
            </button>
          )}
          <button className="btn-ghost py-1 px-2 text-[10px] flex items-center gap-1">
            <ChevronRight className="w-3 h-3" /> Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default function IncidentsPage() {
  const { incidents, setIncidents } = useIncidentStore();

  useEffect(() => {
    setIncidents(MOCK_INCIDENTS);
  }, [setIncidents]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<IncidentStatus | "all">(
    "all",
  );
  const [severityFilter, setSeverityFilter] = useState<
    IncidentSeverity | "all"
  >("all");

  const incidentsList = Object.values(incidents);
  const filtered = useMemo(() => {
    return incidentsList
      .filter((inc) => {
        const matchSearch =
          !search ||
          inc.title.toLowerCase().includes(search.toLowerCase()) ||
          (inc.address ?? "").toLowerCase().includes(search.toLowerCase());
        const matchStatus =
          statusFilter === "all" || inc.status === statusFilter;
        const matchSeverity =
          severityFilter === "all" || inc.severity === severityFilter;
        return matchSearch && matchStatus && matchSeverity;
      })
      .sort((a, b) => {
        const sev = { critical: 0, high: 1, medium: 2, low: 3 };
        return sev[a.severity] - sev[b.severity];
      });
  }, [incidentsList, search, statusFilter, severityFilter]);

  const counts = {
    total: incidentsList.length,
    open: incidentsList.filter((i) => i.status === "open").length,
    in_progress: incidentsList.filter((i) => i.status === "in_progress").length,
    critical: incidentsList.filter((i) => i.severity === "critical").length,
    resolved: incidentsList.filter((i) => i.status === "resolved").length,
  };

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: "Total", value: counts.total, color: "text-slate-200" },
          { label: "Open", value: counts.open, color: "text-city-rose" },
          {
            label: "In Progress",
            value: counts.in_progress,
            color: "text-city-amber",
          },
          {
            label: "Critical",
            value: counts.critical,
            color: "text-city-rose",
          },
          {
            label: "Resolved",
            value: counts.resolved,
            color: "text-city-emerald",
          },
        ].map(({ label, value, color }) => (
          <div key={label} className="glass-card px-4 py-3 text-center">
            <p className={clsx("text-2xl font-bold", color)}>{value}</p>
            <p className="text-xs text-city-muted mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters + Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 bg-city-surface/60 border border-city-border rounded-lg px-3 py-1.5 flex-1 min-w-48">
          <Search className="w-3.5 h-3.5 text-city-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search incidents..."
            className="bg-transparent text-sm text-slate-300 placeholder:text-city-muted outline-none flex-1"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="city-input w-auto"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value as any)}
          className="city-input w-auto"
        >
          <option value="all">All Severity</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button className="btn-primary flex items-center gap-1.5 py-2">
          <Plus className="w-3.5 h-3.5" /> Report Incident
        </button>
      </div>

      {/* Incidents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((inc) => (
          <IncidentCard key={inc.id} incident={inc} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-16 text-city-muted">
            <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No incidents match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
