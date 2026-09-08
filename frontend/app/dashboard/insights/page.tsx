"use client";

import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  Brain,
  Building2,
  CheckCircle2,
  Droplets,
  Factory,
  Gauge,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  Sprout,
  TrendingUp,
  Waves,
  Zap,
} from "lucide-react";

const decisionFactors = [
  {
    label: "Supply availability",
    value: "High",
    score: "96%",
    icon: Droplets,
  },
  {
    label: "Water quality compatibility",
    value: "Excellent",
    score: "96%",
    icon: ShieldCheck,
  },
  {
    label: "Transportation distance",
    value: "18.6 km",
    score: "92%",
    icon: MapPin,
  },
  {
    label: "Sustainability",
    value: "91 / 100",
    score: "91%",
    icon: Leaf,
  },
  {
    label: "Economic efficiency",
    value: "+14.2%",
    score: "89%",
    icon: TrendingUp,
  },
];

const history = [
  {
    time: "14:32",
    title: "Allocation optimized",
    description: "Reservoir North → Industry Zone B",
    type: "allocation",
  },
  {
    time: "14:18",
    title: "Demand spike detected",
    description: "Agriculture Zone A",
    type: "alert",
  },
  {
    time: "13:54",
    title: "Water quality verified",
    description: "Treatment Plant 01",
    type: "quality",
  },
  {
    time: "13:21",
    title: "Route efficiency improved",
    description: "Network optimization completed",
    type: "optimization",
  },
];

export default function AIInsightsPage() {
  return (
    <main className="ai-insights-page">

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

          <a href="/dashboard/map">
            Water Map
          </a>

          <a
            className="active"
            href="/dashboard/insights"
          >
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
            AI Engine Active
          </span>

          <div className="user-avatar">
            AX
          </div>

        </div>

      </header>


      {/* =====================================================
          CONTENT
          ===================================================== */}

      <section className="ai-insights-content">


        {/* ===================================================
            HEADER
            =================================================== */}

        <div className="ai-insights-heading">

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
              AI DECISION CENTER
            </p>


            <h1>
              Intelligent <span>Water Decisions.</span>
            </h1>


            <p className="dashboard-subtitle">
              AI-powered recommendations for optimal
              water allocation, efficiency and sustainability.
            </p>

          </div>


          <div className="ai-engine-status">

            <div className="ai-engine-icon">

              <Brain size={17} />

            </div>


            <div>

              <strong>
                AI ENGINE
              </strong>

              <span>
                Processing network data
              </span>

            </div>


            <div className="ai-processing-dot" />

          </div>

        </div>


        {/* ===================================================
            MAIN AI GRID
            =================================================== */}

        <div className="ai-main-grid">


          {/* =================================================
              PRIMARY RECOMMENDATION
              ================================================= */}

          <div className="ai-recommendation-panel">

            <div className="ai-panel-header">

              <div>

                <span className="ai-panel-label">
                  TOP RECOMMENDATION
                </span>

                <h2>
                  Optimal Water Allocation
                </h2>

              </div>


              <div className="recommendation-badge">

                <Sparkles size={12} />

                AI Recommended

              </div>

            </div>


            {/* ROUTE */}

            <div className="ai-route">

              <div className="ai-location">

                <div className="ai-location-icon source">

                  <Droplets size={22} />

                </div>

                <div>

                  <span>
                    SOURCE
                  </span>

                  <strong>
                    Reservoir North
                  </strong>

                  <small>
                    4.8M L available
                  </small>

                </div>

              </div>


              <div className="ai-route-connector">

                <div className="route-line">

                  <span className="route-particle" />

                </div>

                <span>
                  OPTIMAL ROUTE
                </span>

              </div>


              <div className="ai-location">

                <div className="ai-location-icon destination">

                  <Factory size={22} />

                </div>

                <div>

                  <span>
                    DESTINATION
                  </span>

                  <strong>
                    Industry Zone B
                  </strong>

                  <small>
                    3.0M L demand
                  </small>

                </div>

              </div>

            </div>


            {/* ALLOCATION */}

            <div className="allocation-highlight">

              <div>

                <span>
                  RECOMMENDED TRANSFER
                </span>

                <strong>
                  2.4M L
                </strong>

              </div>


              <div className="allocation-arrow">

                <ArrowUpRight size={24} />

              </div>


              <div className="allocation-confidence">

                <span>
                  CONFIDENCE
                </span>

                <strong>
                  94%
                </strong>

              </div>

            </div>


            {/* ACTIONS */}

            <div className="ai-actions">

              <button className="primary-ai-button">

                <CheckCircle2 size={16} />

                Apply Recommendation

              </button>


              <button className="secondary-ai-button">

                View Reasoning

                <ArrowUpRight size={15} />

              </button>

            </div>

          </div>


          {/* =================================================
              CONFIDENCE PANEL
              ================================================= */}

          <div className="ai-confidence-panel">

            <div className="ai-panel-header">

              <div>

                <span className="ai-panel-label">
                  MODEL CONFIDENCE
                </span>

                <h2>
                  Decision Confidence
                </h2>

              </div>

              <Gauge size={19} />

            </div>


            <div className="confidence-orbit">

              <div className="confidence-orbit-ring ring-a" />

              <div className="confidence-orbit-ring ring-b" />

              <div className="confidence-value">

                <strong>
                  94
                </strong>

                <span>
                  %
                </span>

              </div>

              <small>
                HIGH CONFIDENCE
              </small>

            </div>


            <div className="confidence-description">

              The current recommendation is strongly
              supported by available supply, demand,
              quality and route-efficiency data.

            </div>


            <div className="model-status">

              <div>

                <span>
                  Model
                </span>

                <strong>
                  AquaAI Optimizer
                </strong>

              </div>

              <div>

                <span>
                  Last updated
                </span>

                <strong>
                  2 min ago
                </strong>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            WHY THIS DECISION
            =================================================== */}

        <div className="ai-panel reasoning-panel">

          <div className="ai-panel-header">

            <div>

              <span className="ai-panel-label">
                DECISION EXPLANATION
              </span>

              <h2>
                Why did the AI choose this allocation?
              </h2>

            </div>


            <div className="reasoning-status">

              <Brain size={13} />

              5 factors analyzed

            </div>

          </div>


          <div className="factor-grid">

            {decisionFactors.map((factor) => {

              const Icon = factor.icon;

              return (

                <div
                  className="decision-factor"
                  key={factor.label}
                >

                  <div className="factor-icon">

                    <Icon size={17} />

                  </div>


                  <div className="factor-content">

                    <span>
                      {factor.label}
                    </span>

                    <strong>
                      {factor.value}
                    </strong>

                  </div>


                  <div className="factor-score">

                    <strong>
                      {factor.score}
                    </strong>

                    <div className="factor-bar">

                      <div
                        style={{
                          width: factor.score,
                        }}
                      />

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        </div>


        {/* ===================================================
            FORECAST + SYSTEM HEALTH
            =================================================== */}

        <div className="ai-analytics-grid">


          {/* DEMAND FORECAST */}

          <div className="ai-panel forecast-panel">

            <div className="ai-panel-header">

              <div>

                <span className="ai-panel-label">
                  PREDICTIVE ANALYTICS
                </span>

                <h2>
                  Demand Forecast
                </h2>

              </div>


              <div className="forecast-badge">

                <TrendingUp size={13} />

                +14.3%

              </div>

            </div>


            <div className="forecast-summary">

              <div>

                <span>
                  CURRENT
                </span>

                <strong>
                  9.8M L
                </strong>

              </div>


              <div className="forecast-arrow">

                <ArrowUpRight size={18} />

              </div>


              <div>

                <span>
                  NEXT 7 DAYS
                </span>

                <strong>
                  11.2M L
                </strong>

              </div>

            </div>


            {/* GRAPH */}

            <div className="forecast-chart">

              <div className="chart-lines">

                <span />
                <span />
                <span />
                <span />

              </div>


              <svg
                viewBox="0 0 600 170"
                preserveAspectRatio="none"
                className="forecast-svg"
              >

                <defs>

                  <linearGradient
                    id="forecastFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopOpacity=".25"
                    />

                    <stop
                      offset="100%"
                      stopOpacity="0"
                    />

                  </linearGradient>

                </defs>


                <path
                  d="
                    M0 125
                    C50 118 65 108 105 112
                    C145 116 160 92 200 98
                    C245 104 260 78 305 83
                    C350 88 370 67 405 70
                    C445 73 470 48 510 56
                    C545 62 570 39 600 30
                    L600 170
                    L0 170
                    Z
                  "
                  className="forecast-area"
                />


                <path
                  d="
                    M0 125
                    C50 118 65 108 105 112
                    C145 116 160 92 200 98
                    C245 104 260 78 305 83
                    C350 88 370 67 405 70
                    C445 73 470 48 510 56
                    C545 62 570 39 600 30
                  "
                  className="forecast-line"
                />

              </svg>


              <div className="chart-labels">

                <span>
                  TODAY
                </span>

                <span>
                  +2 DAYS
                </span>

                <span>
                  +4 DAYS
                </span>

                <span>
                  +7 DAYS
                </span>

              </div>

            </div>

          </div>


          {/* NETWORK HEALTH */}

          <div className="ai-panel health-panel">

            <div className="ai-panel-header">

              <div>

                <span className="ai-panel-label">
                  SYSTEM INTELLIGENCE
                </span>

                <h2>
                  Network Health
                </h2>

              </div>


              <div className="health-score">
                92
              </div>

            </div>


            <div className="health-list">

              <div className="health-item">

                <div className="health-icon">
                  <Droplets size={16} />
                </div>

                <div>

                  <span>
                    Water availability
                  </span>

                  <strong>
                    Healthy
                  </strong>

                </div>

                <i className="health-good" />

              </div>


              <div className="health-item">

                <div className="health-icon">
                  <Waves size={16} />
                </div>

                <div>

                  <span>
                    Water quality
                  </span>

                  <strong>
                    Excellent
                  </strong>

                </div>

                <i className="health-good" />

              </div>


              <div className="health-item">

                <div className="health-icon">
                  <Zap size={16} />
                </div>

                <div>

                  <span>
                    Network efficiency
                  </span>

                  <strong>
                    89%
                  </strong>

                </div>

                <i className="health-good" />

              </div>


              <div className="health-item">

                <div className="health-icon">
                  <Activity size={16} />
                </div>

                <div>

                  <span>
                    Active routes
                  </span>

                  <strong>
                    8 / 8
                  </strong>

                </div>

                <i className="health-good" />

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            AI ACTIVITY
            =================================================== */}

        <div className="ai-panel activity-panel">

          <div className="ai-panel-header">

            <div>

              <span className="ai-panel-label">
                AI ACTIVITY
              </span>

              <h2>
                Decision History
              </h2>

            </div>


            <button className="view-history-button">

              View All

              <ArrowUpRight size={14} />

            </button>

          </div>


          <div className="ai-history">

            {history.map((item) => (

              <div
                className="history-item"
                key={item.time}
              >

                <div className="history-time">
                  {item.time}
                </div>


                <div
                  className={`history-icon ${item.type}`}
                >

                  {item.type === "allocation" && (
                    <Droplets size={15} />
                  )}

                  {item.type === "alert" && (
                    <Activity size={15} />
                  )}

                  {item.type === "quality" && (
                    <ShieldCheck size={15} />
                  )}

                  {item.type === "optimization" && (
                    <TrendingUp size={15} />
                  )}

                </div>


                <div className="history-content">

                  <strong>
                    {item.title}
                  </strong>

                  <span>
                    {item.description}
                  </span>

                </div>


                <CheckCircle2
                  size={14}
                  className="history-check"
                />

              </div>

            ))}

          </div>

        </div>


      </section>

    </main>
  );
}