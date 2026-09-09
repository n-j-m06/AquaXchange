"use client";

import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Droplets,
  Factory,
  Filter,
  MapPin,
  Search,
  Sprout,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import DashboardHeader from "@/app/dashboard/DashboardHeader";

type DemandType = "municipality" | "agriculture" | "industry";

type DemandRequest = {
  id: number;
  name: string;
  type: DemandType;
  location: string;
  requested: string;
  allocated: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  trend: number;
  deadline: string;
  status: "Pending" | "Partially Allocated" | "Allocated";
  detail: string;
};
const demandRequests: DemandRequest[] = [
  {
    id: 1,
    name: "Municipality Central",
    type: "municipality",
    location: "Central District",
    requested: "2.8M L",
    allocated: "2.1M L",
    priority: "Critical",
    trend: 18.4,
    deadline: "Today, 18:00",
    status: "Partially Allocated",
    detail: "High municipal consumption driven by increased residential demand.",
  },
  {
    id: 2,
    name: "Agriculture Zone A",
    type: "agriculture",
    location: "Northern Agricultural Belt",
    requested: "3.2M L",
    allocated: "2.4M L",
    priority: "High",
    trend: 14.7,
    deadline: "Today, 21:00",
    status: "Partially Allocated",
    detail: "Irrigation demand is above the seasonal average.",
  },
  {
    id: 3,
    name: "Industry Zone B",
    type: "industry",
    location: "Eastern Industrial Corridor",
    requested: "3.0M L",
    allocated: "2.6M L",
    priority: "High",
    trend: 11.2,
    deadline: "Tomorrow, 08:00",
    status: "Partially Allocated",
    detail: "Industrial process requirements require a stable water supply.",
  },
  {
    id: 4,
    name: "Agriculture Zone B",
    type: "agriculture",
    location: "Western Agricultural Belt",
    requested: "2.1M L",
    allocated: "1.8M L",
    priority: "Medium",
    trend: 7.8,
    deadline: "Tomorrow, 12:00",
    status: "Allocated",
    detail: "Demand is stable with moderate irrigation requirements.",
  },
  {
    id: 5,
    name: "Municipality South",
    type: "municipality",
    location: "Southern District",
    requested: "1.7M L",
    allocated: "1.4M L",
    priority: "Medium",
    trend: 6.3,
    deadline: "Tomorrow, 16:00",
    status: "Allocated",
    detail: "Normal municipal demand with a slight upward trend.",
  },
  {
    id: 6,
    name: "Industry Zone A",
    type: "industry",
    location: "Western Industrial Corridor",
    requested: "1.4M L",
    allocated: "1.2M L",
    priority: "Low",
    trend: 3.9,
    deadline: "Sep 11, 10:00",
    status: "Allocated",
    detail: "Current allocation is sufficient for projected industrial usage.",
  },
];

const typeConfig = {
  municipality: {
    label: "Municipality",
    icon: Building2,
  },
  agriculture: {
    label: "Agriculture",
    icon: Sprout,
  },
  industry: {
    label: "Industry",
    icon: Factory,
  },
};

const priorityConfig = {
  Critical: "critical",
  High: "high",
  Medium: "medium",
  Low: "low",
};

export default function DemandPage() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | DemandType
  >("all");
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] =
    useState<DemandRequest | null>(null);

  const filteredRequests = useMemo(() => {
    return demandRequests.filter((request) => {
      const matchesFilter =
        activeFilter === "all" || request.type === activeFilter;

      const matchesSearch =
        request.name.toLowerCase().includes(search.toLowerCase()) ||
        request.location.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  return (
    <main className="demand-page">
      <DashboardHeader />
      {/* CONTENT */}
      <section className="demand-content">
        <div className="demand-heading">
          <div>
            <div className="section-eyebrow">
              <Activity size={14} />
              DEMAND INTELLIGENCE
            </div>

            <h1>Water Demand.</h1>

            <p>
              Monitor consumption requirements, forecast demand and
              prioritize allocations across the network.
            </p>
          </div>

          <div className="demand-engine">
            <div className="engine-icon">
              <Zap size={18} />
            </div>

            <div>
              <span>AI Forecast Engine</span>
              <strong>Active</strong>
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="demand-summary-grid">
          <SummaryCard
            icon={<Droplets size={20} />}
            label="Current Demand"
            value="9.8M L"
            change="+8.6%"
            positive
          />

          <SummaryCard
            icon={<TrendingUp size={20} />}
            label="Forecast Demand"
            value="11.2M L"
            change="+14.3%"
            positive
          />

          <SummaryCard
            icon={<BarChart3 size={20} />}
            label="Unmet Demand"
            value="1.4M L"
            change="14.2%"
          />

          <SummaryCard
            icon={<Zap size={20} />}
            label="Priority Requests"
            value="3"
            change="Requires action"
          />
        </div>

        {/* FORECAST + SECTORS */}
        <div className="demand-top-grid">
          <section className="demand-panel forecast-card">
            <div className="panel-heading">
              <div>
                <span className="panel-kicker">7-DAY FORECAST</span>
                <h2>Projected Water Demand</h2>
              </div>

              <div className="forecast-badge">
                <TrendingUp size={14} />
                +14.3%
              </div>
            </div>

            <div className="forecast-chart">
              <div className="chart-y-axis">
                <span>12M</span>
                <span>10M</span>
                <span>8M</span>
                <span>6M</span>
                <span>4M</span>
              </div>

              <div className="chart-area">
                <div className="chart-grid-line line-1" />
                <div className="chart-grid-line line-2" />
                <div className="chart-grid-line line-3" />
                <div className="chart-grid-line line-4" />

                <svg
                  className="forecast-svg"
                  viewBox="0 0 700 260"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="demandArea"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopOpacity="0.28" />
                      <stop offset="100%" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M0 190
                       C45 180, 65 175, 100 181
                       C140 188, 165 155, 200 162
                       C240 170, 260 142, 300 148
                       C345 155, 365 128, 400 136
                       C440 143, 465 111, 500 119
                       C540 126, 565 94, 600 103
                       C635 110, 665 76, 700 82
                       L700 260 L0 260 Z"
                    fill="url(#demandArea)"
                  />

                  <path
                    d="M0 190
                       C45 180, 65 175, 100 181
                       C140 188, 165 155, 200 162
                       C240 170, 260 142, 300 148
                       C345 155, 365 128, 400 136
                       C440 143, 465 111, 500 119
                       C540 126, 565 94, 600 103
                       C635 110, 665 76, 700 82"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />

                  {[0, 100, 200, 300, 400, 500, 600, 700].map(
                    (x, index) => (
                      <circle
                        key={x}
                        cx={x}
                        cy={
                          [
                            190,
                            181,
                            162,
                            148,
                            136,
                            119,
                            103,
                            82,
                          ][index]
                        }
                        r="4"
                        fill="currentColor"
                      />
                    )
                  )}
                </svg>

                <div className="chart-labels">
                  <span>Sep 9</span>
                  <span>Sep 10</span>
                  <span>Sep 11</span>
                  <span>Sep 12</span>
                  <span>Sep 13</span>
                  <span>Sep 14</span>
                  <span>Sep 15</span>
                  <span>Sep 16</span>
                </div>
              </div>
            </div>
          </section>

          <section className="demand-panel sector-card">
            <div className="panel-heading">
              <div>
                <span className="panel-kicker">BY SECTOR</span>
                <h2>Demand Distribution</h2>
              </div>
            </div>

            <div className="sector-list">
              <SectorRow
                icon={<Building2 size={18} />}
                name="Municipality"
                value="3.9M L"
                percentage={40}
                trend="+18.4%"
              />

              <SectorRow
                icon={<Sprout size={18} />}
                name="Agriculture"
                value="3.5M L"
                percentage={36}
                trend="+14.7%"
              />

              <SectorRow
                icon={<Factory size={18} />}
                name="Industry"
                value="2.4M L"
                percentage={24}
                trend="+11.2%"
              />
            </div>

            <div className="sector-footer">
              <span>Total projected demand</span>
              <strong>9.8M L</strong>
            </div>
          </section>
        </div>

        {/* REQUESTS */}
        <section className="demand-panel requests-panel">
          <div className="requests-heading">
            <div>
              <span className="panel-kicker">LIVE REQUESTS</span>
              <h2>Demand Allocation Queue</h2>
            </div>

            <div className="request-count">
              {filteredRequests.length} requests
            </div>
          </div>

          <div className="demand-toolbar">
            <div className="demand-filters">
              <button
                className={activeFilter === "all" ? "selected" : ""}
                onClick={() => setActiveFilter("all")}
              >
                All
              </button>

              <button
                className={
                  activeFilter === "municipality" ? "selected" : ""
                }
                onClick={() => setActiveFilter("municipality")}
              >
                <Building2 size={14} />
                Municipalities
              </button>

              <button
                className={
                  activeFilter === "agriculture" ? "selected" : ""
                }
                onClick={() => setActiveFilter("agriculture")}
              >
                <Sprout size={14} />
                Agriculture
              </button>

              <button
                className={activeFilter === "industry" ? "selected" : ""}
                onClick={() => setActiveFilter("industry")}
              >
                <Factory size={14} />
                Industry
              </button>
            </div>

            <div className="demand-search">
              <Search size={16} />
              <input
                placeholder="Search demand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="request-table">
            <div className="request-table-header">
              <span>Demand Source</span>
              <span>Requested</span>
              <span>Allocated</span>
              <span>Priority</span>
              <span>Trend</span>
              <span>Deadline</span>
              <span />
            </div>

            {filteredRequests.map((request) => {
              const config = typeConfig[request.type];
              const Icon = config.icon;

              return (
                <button
                  key={request.id}
                  className="request-row"
                  onClick={() => setSelectedRequest(request)}
                >
                  <div className="request-source">
                    <div className={`request-icon ${request.type}`}>
                      <Icon size={18} />
                    </div>

                    <div>
                      <strong>{request.name}</strong>
                      <span>
                        <MapPin size={11} />
                        {request.location}
                      </span>
                    </div>
                  </div>

                  <strong>{request.requested}</strong>

                  <div className="allocation-cell">
                    <strong>{request.allocated}</strong>
                    <div className="allocation-bar">
                      <span
                        style={{
                          width: `${
                            (parseFloat(request.allocated) /
                              parseFloat(request.requested)) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <span
                    className={`priority-badge ${
                      priorityConfig[request.priority]
                    }`}
                  >
                    {request.priority}
                  </span>

                  <span className="trend-value">
                    <ArrowUpRight size={14} />
                    +{request.trend}%
                  </span>

                  <span className="deadline">
                    <CalendarDays size={14} />
                    {request.deadline}
                  </span>

                  <ChevronRight size={17} className="row-arrow" />
                </button>
              );
            })}
          </div>
        </section>

        {/* AI BANNER */}
        <section className="demand-ai-banner">
          <div className="ai-banner-icon">
            <Zap size={22} />
          </div>

          <div className="ai-banner-content">
            <span>AI ALLOCATION SIGNAL</span>
            <h3>
              Municipal demand is expected to increase by 18.4% over the
              next 48 hours.
            </h3>
            <p>
              AquaXchange recommends reserving an additional 0.7M L from
              Reservoir North to maintain network stability.
            </p>
          </div>

          <a href="/dashboard/insights" className="ai-banner-action">
            View AI reasoning
            <ArrowUpRight size={16} />
          </a>
        </section>
      </section>

      {/* DETAIL MODAL */}
      {selectedRequest && (
        <div
          className="demand-modal-overlay"
          onClick={() => setSelectedRequest(null)}
        >
          <div
            className="demand-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedRequest(null)}
            >
              <X size={18} />
            </button>

            <div
              className={`modal-demand-icon ${selectedRequest.type}`}
            >
              {(() => {
                const Icon = typeConfig[selectedRequest.type].icon;
                return <Icon size={25} />;
              })()}
            </div>

            <span className="panel-kicker">
              DEMAND REQUEST #{selectedRequest.id}
            </span>

            <h2>{selectedRequest.name}</h2>

            <p className="modal-location">
              <MapPin size={14} />
              {selectedRequest.location}
            </p>

            <div className="modal-demand-stats">
              <div>
                <span>Requested</span>
                <strong>{selectedRequest.requested}</strong>
              </div>

              <div>
                <span>Allocated</span>
                <strong>{selectedRequest.allocated}</strong>
              </div>

              <div>
                <span>Priority</span>
                <strong>{selectedRequest.priority}</strong>
              </div>

              <div>
                <span>Growth</span>
                <strong>+{selectedRequest.trend}%</strong>
              </div>
            </div>

            <div className="modal-description">
              <span>Demand Analysis</span>
              <p>{selectedRequest.detail}</p>
            </div>

            <div className="modal-status">
              <CheckCircle2 size={16} />
              {selectedRequest.status}
            </div>

            <button className="modal-action">
              <Zap size={16} />
              Optimize Allocation
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

/* ---------------------------------- */
/* SUMMARY CARD */
/* ---------------------------------- */

function SummaryCard({
  icon,
  label,
  value,
  change,
  positive = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  positive?: boolean;
}) {
  return (
    <div className="demand-summary-card">
      <div className="summary-card-top">
        <div className="summary-card-icon">{icon}</div>

        <span className={positive ? "summary-positive" : ""}>
          {change}
        </span>
      </div>

      <span className="summary-label">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* ---------------------------------- */
/* SECTOR ROW */
/* ---------------------------------- */

function SectorRow({
  icon,
  name,
  value,
  percentage,
  trend,
}: {
  icon: React.ReactNode;
  name: string;
  value: string;
  percentage: number;
  trend: string;
}) {
  return (
    <div className="sector-row">
      <div className="sector-row-top">
        <div className="sector-name">
          <div className="sector-icon">{icon}</div>

          <div>
            <strong>{name}</strong>
            <span>{percentage}% of demand</span>
          </div>
        </div>

        <div className="sector-value">
          <strong>{value}</strong>
          <span>
            <ArrowUpRight size={12} />
            {trend}
          </span>
        </div>
      </div>

      <div className="sector-progress">
        <span style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}