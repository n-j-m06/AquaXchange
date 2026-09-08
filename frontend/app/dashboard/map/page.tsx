"use client";

import {
  Activity,
  ArrowLeft,
  Building2,
  Droplets,
  Factory,
  Filter,
  LocateFixed,
  MapPin,
  Maximize2,
  Sprout,
  Waves,
  X,
} from "lucide-react";
import { useState } from "react";

type LocationType =
  | "reservoir"
  | "agriculture"
  | "industry"
  | "municipality"
  | "treatment";

type Location = {
  id: number;
  name: string;
  type: LocationType;
  x: number;
  y: number;
  value: string;
  status: string;
  detail: string;
};

const locations: Location[] = [
  {
    id: 1,
    name: "Reservoir North",
    type: "reservoir",
    x: 16,
    y: 24,
    value: "4.8M L",
    status: "78% capacity",
    detail: "Primary regional water source",
  },
  {
    id: 2,
    name: "Reservoir East",
    type: "reservoir",
    x: 76,
    y: 20,
    value: "3.2M L",
    status: "64% capacity",
    detail: "Secondary water source",
  },
  {
    id: 3,
    name: "Agriculture Zone A",
    type: "agriculture",
    x: 18,
    y: 72,
    value: "2.4M L",
    status: "High demand",
    detail: "Irrigation requirement",
  },
  {
    id: 4,
    name: "Agriculture Zone B",
    type: "agriculture",
    x: 78,
    y: 67,
    value: "1.8M L",
    status: "Stable",
    detail: "Irrigation requirement",
  },
  {
    id: 5,
    name: "Industrial Zone B",
    type: "industry",
    x: 54,
    y: 82,
    value: "3.0M L",
    status: "High demand",
    detail: "Industrial consumption",
  },
  {
    id: 6,
    name: "Municipality Central",
    type: "municipality",
    x: 84,
    y: 40,
    value: "2.1M L",
    status: "Stable",
    detail: "Municipal consumption",
  },
  {
    id: 7,
    name: "Treatment Plant 01",
    type: "treatment",
    x: 42,
    y: 29,
    value: "1.9M L",
    status: "Operational",
    detail: "Water treatment facility",
  },
];

const typeConfig = {
  reservoir: {
    label: "Reservoir",
    icon: Droplets,
  },
  agriculture: {
    label: "Agriculture",
    icon: Sprout,
  },
  industry: {
    label: "Industry",
    icon: Factory,
  },
  municipality: {
    label: "Municipality",
    icon: Building2,
  },
  treatment: {
    label: "Treatment Plant",
    icon: Waves,
  },
};

export default function WaterMapPage() {
  const [activeFilter, setActiveFilter] = useState<
    LocationType | "all"
  >("all");

  const [selectedLocation, setSelectedLocation] =
    useState<Location | null>(null);

  const visibleLocations = locations.filter(
    (location) =>
      activeFilter === "all" ||
      location.type === activeFilter
  );

  return (
    <main className="water-map-page">

      {/* =====================================================
          NAVIGATION
          ===================================================== */}

      <header className="dashboard-nav">

        <div className="dashboard-brand">

          <div className="dashboard-logo">
            <Droplets size={21} />
          </div>

          <div>
            <div className="dashboard-brand-name">
              Aqua<span>X</span>change
            </div>

            <div className="dashboard-brand-tagline">
              SMARTER WATER. SMARTER DECISIONS.
            </div>
          </div>

        </div>


        <nav className="dashboard-links">

          <a href="/dashboard">
            Overview
          </a>

          <a
            className="active"
            href="/dashboard/map"
          >
            Water Map
          </a>

          <a href="/dashboard/insights">
            AI Insights
          </a>

          <a href="/dashboard/sources">
            Sources
          </a>

          <a href="/dashboard/demand">
            Demand
          </a>

        </nav>


        <div className="dashboard-user">

          <div className="status-dot" />

          <span>
            System Online
          </span>

          <div className="user-avatar">
            AX
          </div>

        </div>

      </header>


      {/* =====================================================
          PAGE CONTENT
          ===================================================== */}

      <section className="water-map-content">


        {/* ===================================================
            HEADER
            =================================================== */}

        <div className="water-map-heading">

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
              LIVE WATER NETWORK
            </p>


            <h1>
              Water <span>Intelligence Map</span>
            </h1>


            <p className="dashboard-subtitle">
              Monitor water sources, demand zones,
              treatment facilities and allocation flows
              in real time.
            </p>

          </div>


          <div className="map-live-status">

            <span />

            LIVE NETWORK

          </div>

        </div>


        {/* ===================================================
            MAP WORKSPACE
            =================================================== */}

        <div className="map-workspace">


          {/* =================================================
              FILTER PANEL
              ================================================= */}

          <aside className="map-filter-panel">

            <div className="map-filter-header">

              <div className="filter-title">

                <Filter size={16} />

                <span>
                  NETWORK FILTERS
                </span>

              </div>

            </div>


            {/* ALL */}

            <button
              className={`filter-option ${
                activeFilter === "all"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setActiveFilter("all")
              }
            >

              <span className="filter-dot all-dot" />

              All Network

              <strong>
                {locations.length}
              </strong>

            </button>


            {/* TYPE FILTERS */}

            {(Object.keys(typeConfig) as LocationType[]).map(
              (type) => {

                const Icon =
                  typeConfig[type].icon;

                const count =
                  locations.filter(
                    (item) =>
                      item.type === type
                  ).length;

                return (

                  <button
                    key={type}
                    className={`filter-option ${
                      activeFilter === type
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      setActiveFilter(type)
                    }
                  >

                    <span className="filter-icon">

                      <Icon size={14} />

                    </span>


                    {typeConfig[type].label}


                    <strong>
                      {count}
                    </strong>

                  </button>

                );
              }
            )}


            {/* LEGEND */}

            <div className="map-legend">

              <span className="legend-title">
                FLOW STATUS
              </span>


              <div>
                <i className="legend-active" />
                Active transfer
              </div>


              <div>
                <i className="legend-warning" />
                High demand
              </div>


              <div>
                <i className="legend-stable" />
                Stable
              </div>

            </div>

          </aside>


          {/* =================================================
              MAP
              ================================================= */}

          <div className="full-water-map">


            {/* BACKGROUND */}

            <div className="full-map-grid" />

            <div className="full-map-glow" />


            {/* TERRAIN */}

            <div className="terrain terrain-one" />

            <div className="terrain terrain-two" />

            <div className="terrain terrain-three" />


            {/* =================================================
                WATER NETWORK
                ================================================= */}

            <svg
              className="full-network"
              viewBox="0 0 1000 650"
              preserveAspectRatio="none"
            >

              <defs>

                <filter id="mapFlowGlow">

                  <feGaussianBlur
                    stdDeviation="2.5"
                    result="blur"
                  />

                  <feMerge>

                    <feMergeNode in="blur" />

                    <feMergeNode in="SourceGraphic" />

                  </feMerge>

                </filter>

              </defs>


              {/* =================================================
                  RESERVOIR NORTH → AI
                  
                  Reservoir North:
                  x = 16% → 160
                  y = 24% → 156
                  ================================================= */}

              <path
                id="route-north"
                d="
                  M 160 156
                  C 245 165,
                    365 245,
                    490 315
                "
                className="full-route"
              />


              {/* =================================================
                  RESERVOIR EAST → AI
                  
                  Reservoir East:
                  x = 76% → 760
                  y = 20% → 130
                  ================================================= */}

              <path
                id="route-east"
                d="
                  M 760 130
                  C 680 150,
                    590 230,
                    510 315
                "
                className="full-route"
              />


              {/* =================================================
                  TREATMENT PLANT → AI
                  
                  Treatment Plant:
                  x = 42% → 420
                  y = 29% → 188.5
                  ================================================= */}

              <path
                id="route-treatment"
                d="
                  M 420 189
                  C 440 225,
                    465 275,
                    490 315
                "
                className="full-route"
              />


              {/* =================================================
                  AI → AGRICULTURE A
                  
                  Agriculture A:
                  x = 18% → 180
                  y = 72% → 468
                  ================================================= */}

              <path
                id="route-agriculture-a"
                d="
                  M 490 335
                  C 420 385,
                    280 435,
                    180 468
                "
                className="full-route"
              />


              {/* =================================================
                  AI → INDUSTRY
                  
                  Industry:
                  x = 54% → 540
                  y = 82% → 533
                  ================================================= */}

              <path
                id="route-industry"
                d="
                  M 500 345
                  C 505 405,
                    525 480,
                    540 533
                "
                className="full-route"
              />


              {/* =================================================
                  AI → AGRICULTURE B
                  
                  Agriculture B:
                  x = 78% → 780
                  y = 67% → 435.5
                  ================================================= */}

              <path
                id="route-agriculture-b"
                d="
                  M 520 340
                  C 600 370,
                    700 420,
                    780 436
                "
                className="full-route"
              />


              {/* =================================================
                  AI → MUNICIPALITY
                  
                  Municipality:
                  x = 84% → 840
                  y = 40% → 260
                  ================================================= */}

              <path
                id="route-municipality"
                d="
                  M 525 320
                  C 625 320,
                    745 285,
                    840 260
                "
                className="full-route"
              />


              {/* =================================================
                  MOVING PARTICLES
                  ================================================= */}


              {/* NORTH */}

              <circle
                r="5"
                className="map-flow-particle"
              >

                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                >

                  <mpath href="#route-north" />

                </animateMotion>

              </circle>


              <circle
                r="4"
                className="map-flow-particle"
              >

                <animateMotion
                  dur="4s"
                  begin="1.4s"
                  repeatCount="indefinite"
                >

                  <mpath href="#route-north" />

                </animateMotion>

              </circle>


              {/* EAST */}

              <circle
                r="5"
                className="map-flow-particle"
              >

                <animateMotion
                  dur="4.5s"
                  repeatCount="indefinite"
                >

                  <mpath href="#route-east" />

                </animateMotion>

              </circle>


              <circle
                r="4"
                className="map-flow-particle"
              >

                <animateMotion
                  dur="4.5s"
                  begin="1.6s"
                  repeatCount="indefinite"
                >

                  <mpath href="#route-east" />

                </animateMotion>

              </circle>


              {/* TREATMENT */}

              <circle
                r="4"
                className="map-flow-particle"
              >

                <animateMotion
                  dur="3.8s"
                  repeatCount="indefinite"
                >

                  <mpath href="#route-treatment" />

                </animateMotion>

              </circle>


              {/* AGRICULTURE A */}

              <circle
                r="5"
                className="map-flow-particle"
              >

                <animateMotion
                  dur="4.2s"
                  repeatCount="indefinite"
                >

                  <mpath href="#route-agriculture-a" />

                </animateMotion>

              </circle>


              <circle
                r="4"
                className="map-flow-particle"
              >

                <animateMotion
                  dur="4.2s"
                  begin="1.5s"
                  repeatCount="indefinite"
                >

                  <mpath href="#route-agriculture-a" />

                </animateMotion>

              </circle>


              {/* INDUSTRY */}

              <circle
                r="5"
                className="map-flow-particle"
              >

                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                >

                  <mpath href="#route-industry" />

                </animateMotion>

              </circle>


              <circle
                r="4"
                className="map-flow-particle"
              >

                <animateMotion
                  dur="4s"
                  begin="1.4s"
                  repeatCount="indefinite"
                >

                  <mpath href="#route-industry" />

                </animateMotion>

              </circle>


              {/* AGRICULTURE B */}

              <circle
                r="5"
                className="map-flow-particle"
              >

                <animateMotion
                  dur="4.6s"
                  repeatCount="indefinite"
                >

                  <mpath href="#route-agriculture-b" />

                </animateMotion>

              </circle>


              {/* MUNICIPALITY */}

              <circle
                r="5"
                className="map-flow-particle"
              >

                <animateMotion
                  dur="4.8s"
                  repeatCount="indefinite"
                >

                  <mpath href="#route-municipality" />

                </animateMotion>

              </circle>


              <circle
                r="4"
                className="map-flow-particle"
              >

                <animateMotion
                  dur="4.8s"
                  begin="1.7s"
                  repeatCount="indefinite"
                >

                  <mpath href="#route-municipality" />

                </animateMotion>

              </circle>

            </svg>


            {/* =================================================
                LOCATION MARKERS
                ================================================= */}

            {visibleLocations.map(
              (location) => {

                const Icon =
                  typeConfig[
                    location.type
                  ].icon;

                return (

                  <button
                    key={location.id}
                    className={`location-marker ${location.type}`}
                    style={{
                      left: `${location.x}%`,
                      top: `${location.y}%`,
                    }}
                    onClick={() =>
                      setSelectedLocation(
                        location
                      )
                    }
                  >

                    <span className="marker-pulse" />


                    <span className="marker-icon">

                      <Icon size={17} />

                    </span>


                    <span className="marker-label">

                      <strong>
                        {location.name}
                      </strong>

                      <small>
                        {location.value}
                      </small>

                    </span>

                  </button>

                );
              }
            )}


            {/* =================================================
                AI CORE
                ================================================= */}

            <div className="full-map-ai">

              <div className="full-ai-ring ai-ring-one" />

              <div className="full-ai-ring ai-ring-two" />

              <div className="full-ai-ring ai-ring-three" />


              <div className="full-ai-core">

                <Activity size={27} />

                <span>
                  AI
                </span>

              </div>

            </div>


            {/* =================================================
                MAP CONTROLS
                ================================================= */}

            <div className="map-controls">

              <button title="Locate network">

                <LocateFixed size={16} />

              </button>


              <button title="Fullscreen">

                <Maximize2 size={16} />

              </button>

            </div>


            {/* =================================================
                SELECTED LOCATION PANEL
                ================================================= */}

            {selectedLocation && (

              <div className="location-details-panel">

                <button
                  className="location-close"
                  onClick={() =>
                    setSelectedLocation(null)
                  }
                >

                  <X size={15} />

                </button>


                <div className="location-detail-icon">

                  {(() => {

                    const Icon =
                      typeConfig[
                        selectedLocation.type
                      ].icon;

                    return (
                      <Icon size={22} />
                    );

                  })()}

                </div>


                <span className="location-detail-type">

                  {
                    typeConfig[
                      selectedLocation.type
                    ].label
                  }

                </span>


                <h3>

                  {selectedLocation.name}

                </h3>


                <div className="location-detail-value">

                  <strong>

                    {selectedLocation.value}

                  </strong>


                  <span>

                    {selectedLocation.status}

                  </span>

                </div>


                <p>

                  {selectedLocation.detail}

                </p>


                <div className="location-detail-action">

                  <MapPin size={13} />

                  View detailed information

                </div>

              </div>

            )}

          </div>

        </div>


        {/* ===================================================
            MAP SUMMARY
            =================================================== */}

        <div className="map-summary">


          {/* ACTIVE SOURCES */}

          <div className="map-summary-card">

            <div className="summary-icon">

              <Droplets size={18} />

            </div>


            <div>

              <span>
                ACTIVE SOURCES
              </span>

              <strong>
                12
              </strong>

            </div>

          </div>


          {/* CURRENT DEMAND */}

          <div className="map-summary-card">

            <div className="summary-icon">

              <TrendingUpIcon />

            </div>


            <div>

              <span>
                CURRENT DEMAND
              </span>

              <strong>
                9.8M L
              </strong>

            </div>

          </div>


          {/* ACTIVE ROUTES */}

          <div className="map-summary-card">

            <div className="summary-icon">

              <Activity size={18} />

            </div>


            <div>

              <span>
                ACTIVE ROUTES
              </span>

              <strong>
                8
              </strong>

            </div>

          </div>


          {/* NETWORK QUALITY */}

          <div className="map-summary-card">

            <div className="summary-icon">

              <Waves size={18} />

            </div>


            <div>

              <span>
                NETWORK QUALITY
              </span>

              <strong>
                94%
              </strong>

            </div>

          </div>


        </div>

      </section>

    </main>
  );
}


/* =========================================================
   TREND ICON
   ========================================================= */

function TrendingUpIcon() {

  return (

    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >

      <polyline
        points="22 7 13.5 15.5 8.5 10.5 2 17"
      />

      <polyline
        points="16 7 22 7 22 13"
      />

    </svg>

  );
}