"use client";

import {
  Activity,
  Droplets,
  Factory,
  MapPin,
  Sprout,
  Building2,
  TrendingUp,
  AlertTriangle,
  Brain,
  ArrowUpRight,
  Waves,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import DashboardHeader from "@/app/dashboard/DashboardHeader";
const stats = [
  {
    title: "Available Water",
    value: "12.4M",
    unit: "Litres",
    change: "+8.4%",
    icon: Droplets,
  },
  {
    title: "Current Demand",
    value: "9.8M",
    unit: "Litres",
    change: "+3.2%",
    icon: TrendingUp,
  },
  {
    title: "Water Allocated",
    value: "8.7M",
    unit: "Litres",
    change: "88.7%",
    icon: Activity,
  },
  {
    title: "Avg. Quality",
    value: "94",
    unit: "Quality Score",
    change: "+2.1%",
    icon: Waves,
  },
];

const sectors = [
  {
    name: "Agriculture",
    percentage: 48,
    demand: "4.7M L",
    icon: Sprout,
  },
  {
    name: "Industry",
    percentage: 31,
    demand: "3.0M L",
    icon: Factory,
  },
  {
    name: "Municipality",
    percentage: 21,
    demand: "2.1M L",
    icon: Building2,
  },
];

const alerts = [
  {
    title: "Low reservoir level",
    location: "Reservoir North",
    severity: "High",
  },
  {
    title: "Demand spike detected",
    location: "Industrial Zone B",
    severity: "Medium",
  },
  {
    title: "Water quality optimal",
    location: "Treatment Plant 02",
    severity: "Normal",
  },
];

export default function Dashboard() {
  const [userName, setUserName] = useState("Niranjan");

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("aquaxchange_user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        if (user?.name) {
          setUserName(user.name);
        }
      }
    } catch {
      // Keep default name if stored user data is unavailable
    }
  }, []);

  const initials = userName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("aquaxchange_token");
    localStorage.removeItem("aquaxchange_user");

    window.location.href = "/";
  };

  return (
    <main className="dashboard-page">

      {/* =====================================================
          TOP NAVIGATION
          ===================================================== */}

      <DashboardHeader />

      {/* =====================================================
          DASHBOARD CONTENT
          ===================================================== */}

      <section className="dashboard-content">


        {/* ===================================================
            HEADER
            =================================================== */}

        <div className="dashboard-heading">

          <div>

            <p className="dashboard-eyebrow">
              WATER INTELLIGENCE CENTER
            </p>

            <h1>
              Hey There!
              <span> Here&apos;s your water overview.</span>
            </h1>

            <p className="dashboard-subtitle">
              Real-time visibility into water availability, demand,
              allocation and system health.
            </p>

          </div>


          <button className="refresh-button">

            <Activity size={16} />

            Live Data

          </button>

        </div>


        {/* ===================================================
            STAT CARDS
            =================================================== */}

        <div className="dashboard-stats">

          {stats.map((stat) => {

            const Icon = stat.icon;

            return (

              <div
                className="dashboard-stat-card"
                key={stat.title}
              >

                <div className="stat-top">

                  <div className="stat-icon">
                    <Icon size={19} />
                  </div>

                  <span className="stat-change">
                    {stat.change}
                  </span>

                </div>


                <p>
                  {stat.title}
                </p>


                <div className="stat-value">

                  {stat.value}

                  <small>
                    {stat.unit}
                  </small>

                </div>

              </div>

            );

          })}

        </div>


        {/* ===================================================
            MAIN GRID
            =================================================== */}

        <div className="dashboard-main-grid">


          {/* =================================================
              WATER ALLOCATION MAP
              ================================================= */}

          <div className="dashboard-panel map-panel">


            <div className="panel-header">

              <div>

                <span className="panel-label">
                  LIVE NETWORK
                </span>

                <h2>
                  Water Allocation Map
                </h2>

              </div>


              <button className="panel-action">

                Explore Map

                <ArrowUpRight size={15} />

              </button>

            </div>


            {/* =================================================
                ADVANCED WATER NETWORK
                ================================================= */}

            <div className="water-map">


              {/* MAP BACKGROUND */}

              <div className="map-grid" />

              <div className="map-glow" />

              <div className="map-vignette" />


              {/* =================================================
                  SVG NETWORK
                  ================================================= */}

              <svg
                className="water-network"
                viewBox="0 0 1000 520"
                preserveAspectRatio="none"
              >

                <defs>

                  <linearGradient
                    id="flowGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >

                    <stop offset="0%" />
                    <stop offset="45%" />
                    <stop offset="100%" />

                  </linearGradient>


                  <filter id="flowGlow">

                    <feGaussianBlur
                      stdDeviation="3"
                      result="blur"
                    />

                    <feMerge>

                      <feMergeNode in="blur" />

                      <feMergeNode in="SourceGraphic" />

                    </feMerge>

                  </filter>

                </defs>


                {/* RESERVOIR → AI */}

                <path
                  id="reservoir-flow"
                  d="M 150 110 C 270 125, 345 210, 475 255"
                  className="network-path"
                />


                {/* AI → AGRICULTURE */}

                <path
                  id="agriculture-flow"
                  d="M 525 255 C 650 215, 730 125, 850 105"
                  className="network-path"
                />


                {/* AI → INDUSTRY */}

                <path
                  id="industry-flow"
                  d="M 475 275 C 350 315, 275 400, 160 420"
                  className="network-path"
                />


                {/* AI → MUNICIPALITY */}

                <path
                  id="city-flow"
                  d="M 525 275 C 650 315, 730 390, 850 415"
                  className="network-path"
                />


                {/* =================================================
                    MOVING WATER PARTICLES
                    ================================================= */}

                <circle
                  r="4"
                  className="flow-particle"
                >

                  <animateMotion
                    dur="3.5s"
                    repeatCount="indefinite"
                  >

                    <mpath href="#reservoir-flow" />

                  </animateMotion>

                </circle>


                <circle
                  r="3"
                  className="flow-particle"
                >

                  <animateMotion
                    dur="3.5s"
                    begin="1.2s"
                    repeatCount="indefinite"
                  >

                    <mpath href="#reservoir-flow" />

                  </animateMotion>

                </circle>


                <circle
                  r="4"
                  className="flow-particle"
                >

                  <animateMotion
                    dur="4s"
                    repeatCount="indefinite"
                  >

                    <mpath href="#agriculture-flow" />

                  </animateMotion>

                </circle>


                <circle
                  r="3"
                  className="flow-particle"
                >

                  <animateMotion
                    dur="4s"
                    begin="1.5s"
                    repeatCount="indefinite"
                  >

                    <mpath href="#agriculture-flow" />

                  </animateMotion>

                </circle>


                <circle
                  r="4"
                  className="flow-particle"
                >

                  <animateMotion
                    dur="3.8s"
                    repeatCount="indefinite"
                  >

                    <mpath href="#industry-flow" />

                  </animateMotion>

                </circle>


                <circle
                  r="3"
                  className="flow-particle"
                >

                  <animateMotion
                    dur="3.8s"
                    begin="1.3s"
                    repeatCount="indefinite"
                  >

                    <mpath href="#industry-flow" />

                  </animateMotion>

                </circle>


                <circle
                  r="4"
                  className="flow-particle"
                >

                  <animateMotion
                    dur="4.2s"
                    repeatCount="indefinite"
                  >

                    <mpath href="#city-flow" />

                  </animateMotion>

                </circle>


                <circle
                  r="3"
                  className="flow-particle"
                >

                  <animateMotion
                    dur="4.2s"
                    begin="1.7s"
                    repeatCount="indefinite"
                  >

                    <mpath href="#city-flow" />

                  </animateMotion>

                </circle>

              </svg>


              {/* =================================================
                  RESERVOIR NODE
                  ================================================= */}

              <div className="map-node reservoir-node">

                <div className="node-pulse" />

                <div className="node-icon">
                  <Droplets size={19} />
                </div>

                <div className="node-details">

                  <span>
                    RESERVOIR NORTH
                  </span>

                  <strong>
                    4.8M L
                  </strong>

                  <small>
                    78% capacity
                  </small>

                </div>

              </div>


              {/* =================================================
                  AGRICULTURE NODE
                  ================================================= */}

              <div className="map-node agriculture-node">

                <div className="node-pulse" />

                <div className="node-icon">
                  <Sprout size={18} />
                </div>

                <div className="node-details">

                  <span>
                    AGRICULTURE
                  </span>

                  <strong>
                    2.9M L
                  </strong>

                  <small>
                    High demand
                  </small>

                </div>

              </div>


              {/* =================================================
                  INDUSTRY NODE
                  ================================================= */}

              <div className="map-node industry-node">

                <div className="node-pulse" />

                <div className="node-icon">
                  <Factory size={18} />
                </div>

                <div className="node-details">

                  <span>
                    INDUSTRY ZONE B
                  </span>

                  <strong>
                    3.0M L
                  </strong>

                  <small>
                    18.6 km away
                  </small>

                </div>

              </div>


              {/* =================================================
                  MUNICIPALITY NODE
                  ================================================= */}

              <div className="map-node city-node">

                <div className="node-pulse" />

                <div className="node-icon">
                  <Building2 size={18} />
                </div>

                <div className="node-details">

                  <span>
                    MUNICIPALITY
                  </span>

                  <strong>
                    2.1M L
                  </strong>

                  <small>
                    Stable demand
                  </small>

                </div>

              </div>


              {/* =================================================
                  CENTRAL AI CORE
                  ================================================= */}

              <div className="map-ai">

                <div className="ai-ring ring-one" />

                <div className="ai-ring ring-two" />

                <div className="ai-ring ring-three" />

                <div className="ai-core-inner">

                  <Brain size={25} />

                  <span>
                    AI CORE
                  </span>

                </div>

              </div>


              {/* =================================================
                  FLOW INFORMATION
                  ================================================= */}

              <div className="flow-label label-reservoir">
                2.4M L
              </div>

              <div className="flow-label label-agriculture">
                1.8M L
              </div>

              <div className="flow-label label-industry">
                2.4M L
              </div>

              <div className="flow-label label-city">
                1.7M L
              </div>


            </div>

          </div>


          {/* =================================================
              AI RECOMMENDATION
              ================================================= */}

          <div className="dashboard-panel ai-panel">

            <div className="panel-header">

              <div>

                <span className="panel-label">
                  INTELLIGENCE
                </span>

                <h2>
                  AI Recommendation
                </h2>

              </div>

              <div className="ai-status">

                <span />

                Active

              </div>

            </div>


            <div className="recommendation">

              <div className="recommendation-icon">
                <Brain size={24} />
              </div>

              <div>

                <span className="recommendation-label">
                  OPTIMAL ALLOCATION
                </span>

                <h3>

                  Reservoir North

                  <span>
                    {" → "}
                  </span>

                  Industry Zone B

                </h3>

              </div>

            </div>


            <div className="recommendation-amount">

              <strong>
                2.4M L
              </strong>

              <span>
                recommended transfer
              </span>

            </div>


            <div className="confidence">

              <div className="confidence-header">

                <span>
                  AI Confidence
                </span>

                <strong>
                  94%
                </strong>

              </div>

              <div className="confidence-bar">

                <div />

              </div>

            </div>


            <div className="reason-list">

              <div>

                <span>
                  Supply availability
                </span>

                <strong>
                  High
                </strong>

              </div>


              <div>

                <span>
                  Distance
                </span>

                <strong>
                  18.6 km
                </strong>

              </div>


              <div>

                <span>
                  Quality compatibility
                </span>

                <strong>
                  96%
                </strong>

              </div>


              <div>

                <span>
                  Sustainability score
                </span>

                <strong>
                  91/100
                </strong>

              </div>

            </div>


            <button className="recommendation-button">

              View Full Recommendation

              <ArrowUpRight size={16} />

            </button>

          </div>

        </div>


        {/* ===================================================
            LOWER GRID
            =================================================== */}

        <div className="dashboard-lower-grid">


          {/* =================================================
              DEMAND BY SECTOR
              ================================================= */}

          <div className="dashboard-panel sector-panel">

            <div className="panel-header">

              <div>

                <span className="panel-label">
                  DEMAND DISTRIBUTION
                </span>

                <h2>
                  Demand by Sector
                </h2>

              </div>

            </div>


            <div className="sector-list">

              {sectors.map((sector) => {

                const Icon = sector.icon;

                return (

                  <div
                    className="sector-item"
                    key={sector.name}
                  >

                    <div className="sector-icon">
                      <Icon size={18} />
                    </div>


                    <div className="sector-info">

                      <div className="sector-name">

                        <span>
                          {sector.name}
                        </span>

                        <strong>
                          {sector.demand}
                        </strong>

                      </div>


                      <div className="sector-bar">

                        <div
                          style={{
                            width: `${sector.percentage}%`,
                          }}
                        />

                      </div>

                    </div>


                    <span className="sector-percent">
                      {sector.percentage}%
                    </span>

                  </div>

                );

              })}

            </div>

          </div>


          {/* =================================================
              RECENT ALERTS
              ================================================= */}

          <div className="dashboard-panel alerts-panel">

            <div className="panel-header">

              <div>

                <span className="panel-label">
                  SYSTEM MONITOR
                </span>

                <h2>
                  Recent Alerts
                </h2>

              </div>

              <span className="alert-count">
                3 active
              </span>

            </div>


            <div className="alerts-list">

              {alerts.map((alert) => (

                <div
                  className="alert-item"
                  key={alert.title}
                >

                  <div
                    className={`alert-icon ${alert.severity.toLowerCase()}`}
                  >

                    {alert.severity === "High" ? (

                      <AlertTriangle size={17} />

                    ) : alert.severity === "Medium" ? (

                      <Activity size={17} />

                    ) : (

                      <Droplets size={17} />

                    )}

                  </div>


                  <div className="alert-content">

                    <strong>
                      {alert.title}
                    </strong>

                    <span>

                      <MapPin size={12} />

                      {alert.location}

                    </span>

                  </div>


                  <span
                    className={`alert-severity ${alert.severity.toLowerCase()}`}
                  >
                    {alert.severity}
                  </span>

                </div>

              ))}

            </div>

          </div>


        </div>


      </section>

    </main>
  );
}