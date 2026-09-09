"use client";

import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Droplets,
  Factory,
  Filter,
  Gauge,
  MapPin,
  Plus,
  Search,
  ShieldCheck,
  Sprout,
  Waves,
  X,
  AlertTriangle,
} from "lucide-react";
import { useMemo, useState } from "react";
import DashboardHeader from "@/app/dashboard/DashboardHeader";

type SourceType =
  | "reservoir"
  | "treatment"
  | "groundwater"
  | "recycled";

type SourceStatus = "Healthy" | "Warning" | "Critical";

type WaterSource = {
  id: number;
  name: string;
  type: SourceType;
  status: SourceStatus;
  available: string;
  capacity: number;
  quality: number;
  location: string;
  distance: string;
  description: string;
  icon: typeof Droplets;
};

const sources: WaterSource[] = [
  {
    id: 1,
    name: "Reservoir North",
    type: "reservoir",
    status: "Healthy",
    available: "4.8M L",
    capacity: 78,
    quality: 96,
    location: "Northern Basin",
    distance: "18.6 km",
    description:
      "Primary regional water source with high availability and strong quality conditions.",
    icon: Droplets,
  },
  {
    id: 2,
    name: "Reservoir East",
    type: "reservoir",
    status: "Healthy",
    available: "3.2M L",
    capacity: 64,
    quality: 91,
    location: "Eastern Basin",
    distance: "24.2 km",
    description:
      "Secondary reservoir supporting industrial and municipal demand.",
    icon: Droplets,
  },
  {
    id: 3,
    name: "Treatment Plant 01",
    type: "treatment",
    status: "Healthy",
    available: "1.9M L",
    capacity: 86,
    quality: 98,
    location: "Central Treatment District",
    distance: "12.4 km",
    description:
      "High-quality treated water suitable for municipal and industrial applications.",
    icon: Waves,
  },
  {
    id: 4,
    name: "Groundwater Well 04",
    type: "groundwater",
    status: "Warning",
    available: "1.4M L",
    capacity: 51,
    quality: 87,
    location: "Southern Aquifer",
    distance: "31.8 km",
    description:
      "Groundwater source currently operating below preferred availability levels.",
    icon: Gauge,
  },
  {
    id: 5,
    name: "Recycled Water Plant",
    type: "recycled",
    status: "Healthy",
    available: "1.1M L",
    capacity: 73,
    quality: 94,
    location: "Industrial Reuse Zone",
    distance: "16.1 km",
    description:
      "Recycled water source designed to reduce freshwater demand and network pressure.",
    icon: Activity,
  },
  {
    id: 6,
    name: "Groundwater Well 07",
    type: "groundwater",
    status: "Critical",
    available: "0.6M L",
    capacity: 29,
    quality: 79,
    location: "Western Aquifer",
    distance: "38.5 km",
    description:
      "Low availability detected. AI recommends reducing allocation from this source.",
    icon: Gauge,
  },
];

const filterOptions: {
  key: SourceType | "all";
  label: string;
  icon: typeof Droplets;
}[] = [
  {
    key: "all",
    label: "All Sources",
    icon: Filter,
  },
  {
    key: "reservoir",
    label: "Reservoirs",
    icon: Droplets,
  },
  {
    key: "treatment",
    label: "Treatment",
    icon: Waves,
  },
  {
    key: "groundwater",
    label: "Groundwater",
    icon: Gauge,
  },
  {
    key: "recycled",
    label: "Recycled",
    icon: Activity,
  },
];

export default function SourcesPage() {
  const [activeFilter, setActiveFilter] = useState<
    SourceType | "all"
  >("all");

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedSource, setSelectedSource] =
    useState<WaterSource | null>(null);

  const filteredSources = useMemo(() => {
    return sources.filter((source) => {
      const matchesFilter =
        activeFilter === "all" ||
        source.type === activeFilter;

      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        source.name.toLowerCase().includes(query) ||
        source.location.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <main className="sources-page">

      {/* =====================================================
          NAVIGATION
          ===================================================== */}

      <DashboardHeader />
      {/* =====================================================
          PAGE CONTENT
          ===================================================== */}

      <section className="sources-content">


        {/* ===================================================
            HEADER
            =================================================== */}

        <div className="sources-heading">

          <div>

            <button
              className="map-back-button"
              onClick={() =>
                window.location.href = "/dashboard"
              }
            >

              <ArrowLeft size={14} />

              Back to Overview

            </button>


            <p className="dashboard-eyebrow">
              WATER RESOURCE NETWORK
            </p>


            <h1>
              Water <span>Sources.</span>
            </h1>


            <p className="dashboard-subtitle">
              Monitor availability, quality, capacity
              and operational health across the water
              supply network.
            </p>

          </div>


          <button className="add-source-button">

            <Plus size={15} />

            Add Source

          </button>

        </div>


        {/* ===================================================
            SUMMARY CARDS
            =================================================== */}

        <div className="source-summary-grid">


          <div className="source-summary-card">

            <div className="source-summary-icon">

              <Droplets size={18} />

            </div>


            <div>

              <span>
                TOTAL AVAILABLE
              </span>

              <strong>
                12.4M L
              </strong>

              <small>
                Across all active sources
              </small>

            </div>

          </div>


          <div className="source-summary-card">

            <div className="source-summary-icon">

              <Activity size={18} />

            </div>


            <div>

              <span>
                ACTIVE SOURCES
              </span>

              <strong>
                12
              </strong>

              <small>
                10 healthy · 2 require attention
              </small>

            </div>

          </div>


          <div className="source-summary-card">

            <div className="source-summary-icon">

              <ShieldCheck size={18} />

            </div>


            <div>

              <span>
                AVG. QUALITY
              </span>

              <strong>
                94 / 100
              </strong>

              <small>
                Network quality score
              </small>

            </div>

          </div>


          <div className="source-summary-card warning-summary">

            <div className="source-summary-icon">

              <AlertTriangle size={18} />

            </div>


            <div>

              <span>
                SOURCES AT RISK
              </span>

              <strong>
                2
              </strong>

              <small>
                AI monitoring recommended
              </small>

            </div>

          </div>


        </div>


        {/* ===================================================
            TOOLBAR
            =================================================== */}

        <div className="sources-toolbar">


          <div className="source-filters">

            {filterOptions.map((filter) => {

              const Icon = filter.icon;

              return (

                <button
                  key={filter.key}
                  className={
                    activeFilter === filter.key
                      ? "source-filter active"
                      : "source-filter"
                  }
                  onClick={() =>
                    setActiveFilter(filter.key)
                  }
                >

                  <Icon size={13} />

                  {filter.label}

                </button>

              );

            })}

          </div>


          <div className="source-search">

            <Search size={14} />

            <input
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search sources..."
            />

          </div>

        </div>


        {/* ===================================================
            SOURCE GRID
            =================================================== */}

        <div className="sources-grid">

          {filteredSources.map((source) => {

            const Icon = source.icon;

            return (

              <article
                className={`source-card ${source.status.toLowerCase()}`}
                key={source.id}
              >


                {/* CARD HEADER */}

                <div className="source-card-header">

                  <div className="source-type-icon">

                    <Icon size={19} />

                  </div>


                  <div className="source-status">

                    <span />

                    {source.status}

                  </div>

                </div>


                {/* NAME */}

                <div className="source-card-title">

                  <span>
                    {source.type === "reservoir"
                      ? "RESERVOIR"
                      : source.type === "treatment"
                      ? "TREATMENT FACILITY"
                      : source.type === "groundwater"
                      ? "GROUNDWATER"
                      : "RECYCLED WATER"}
                  </span>


                  <h2>
                    {source.name}
                  </h2>


                  <p>

                    <MapPin size={11} />

                    {source.location}

                  </p>

                </div>


                {/* AVAILABLE */}

                <div className="source-available">

                  <span>
                    AVAILABLE WATER
                  </span>

                  <strong>
                    {source.available}
                  </strong>

                </div>


                {/* CAPACITY */}

                <div className="source-capacity">

                  <div>

                    <span>
                      CAPACITY
                    </span>

                    <strong>
                      {source.capacity}%
                    </strong>

                  </div>


                  <div className="capacity-track">

                    <div
                      style={{
                        width: `${source.capacity}%`,
                      }}
                    />

                  </div>

                </div>


                {/* METRICS */}

                <div className="source-metrics">


                  <div>

                    <span>
                      QUALITY
                    </span>

                    <strong>
                      {source.quality}
                    </strong>

                  </div>


                  <div>

                    <span>
                      DISTANCE
                    </span>

                    <strong>
                      {source.distance}
                    </strong>

                  </div>


                  <div>

                    <span>
                      STATUS
                    </span>

                    <strong>
                      {source.status}
                    </strong>

                  </div>


                </div>


                {/* BUTTON */}

                <button
                  className="source-details-button"
                  onClick={() =>
                    setSelectedSource(source)
                  }
                >

                  View Source Details

                  <ArrowUpRight size={14} />

                </button>

              </article>

            );

          })}


          {/* EMPTY STATE */}

          {filteredSources.length === 0 && (

            <div className="sources-empty">

              <Search size={22} />

              <strong>
                No sources found
              </strong>

              <span>
                Try changing the filter or search query.
              </span>

            </div>

          )}

        </div>


        {/* ===================================================
            NETWORK INSIGHT
            =================================================== */}

        <div className="source-network-insight">

          <div className="network-insight-icon">

            <BrainIcon />

          </div>


          <div className="network-insight-content">

            <span>
              AI SOURCE INSIGHT
            </span>

            <h3>
              Reservoir North is currently the most
              efficient supply source.
            </h3>

            <p>
              Its high availability, 96/100 quality score
              and 18.6 km proximity to Industry Zone B make
              it the preferred source for the next allocation.
            </p>

          </div>


          <button>

            Open AI Insights

            <ArrowUpRight size={14} />

          </button>

        </div>


        {/* ===================================================
            DETAILS MODAL
            =================================================== */}

        {selectedSource && (

          <div
            className="source-modal-backdrop"
            onClick={() =>
              setSelectedSource(null)
            }
          >

            <div
              className="source-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <button
                className="source-modal-close"
                onClick={() =>
                  setSelectedSource(null)
                }
              >

                <X size={16} />

              </button>


              <div className="modal-source-icon">

                <selectedSource.icon size={24} />

              </div>


              <span className="modal-source-type">

                {
                  selectedSource.type === "reservoir"
                    ? "RESERVOIR"
                    : selectedSource.type === "treatment"
                    ? "TREATMENT FACILITY"
                    : selectedSource.type === "groundwater"
                    ? "GROUNDWATER"
                    : "RECYCLED WATER"
                }

              </span>


              <h2>
                {selectedSource.name}
              </h2>


              <div className="modal-status">

                <span />

                {selectedSource.status}

              </div>


              <p className="modal-description">
                {selectedSource.description}
              </p>


              <div className="modal-metrics">


                <div>

                  <span>
                    AVAILABLE
                  </span>

                  <strong>
                    {selectedSource.available}
                  </strong>

                </div>


                <div>

                  <span>
                    CAPACITY
                  </span>

                  <strong>
                    {selectedSource.capacity}%
                  </strong>

                </div>


                <div>

                  <span>
                    QUALITY
                  </span>

                  <strong>
                    {selectedSource.quality}/100
                  </strong>

                </div>


                <div>

                  <span>
                    DISTANCE
                  </span>

                  <strong>
                    {selectedSource.distance}
                  </strong>

                </div>

              </div>


              <div className="modal-location">

                <MapPin size={14} />

                <div>

                  <span>
                    LOCATION
                  </span>

                  <strong>
                    {selectedSource.location}
                  </strong>

                </div>

              </div>


              <button className="modal-action">

                <CheckCircle2 size={15} />

                Use in Allocation Analysis

              </button>

            </div>

          </div>

        )}

      </section>

    </main>
  );
}


/* =========================================================
   SMALL AI ICON
   ========================================================= */

function BrainIcon() {

  return (

    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >

      <path d="M9.5 3.5a3 3 0 0 0-5 2.24A3.5 3.5 0 0 0 3 12a3.5 3.5 0 0 0 2.5 6.26A3 3 0 0 0 11 20.5V6.5a3 3 0 0 0-1.5-3Z" />

      <path d="M14.5 3.5a3 3 0 0 1 5 2.24A3.5 3.5 0 0 1 21 12a3.5 3.5 0 0 1-2.5 6.26A3 3 0 0 1 13 20.5V6.5a3 3 0 0 1 1.5-3Z" />

      <path d="M8 8h2" />
      <path d="M14 8h2" />
      <path d="M7 13h3" />
      <path d="M14 13h3" />
      <path d="M8 17h2" />
      <path d="M14 17h2" />

    </svg>

  );
}