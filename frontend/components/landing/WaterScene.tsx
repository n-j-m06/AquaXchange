"use client";

export default function WaterScene() {
  return (
    <div className="water-intelligence">

      {/* =====================================================
          AMBIENT ATMOSPHERE
          ===================================================== */}

      <div className="water-ambient-glow" />


      {/* =====================================================
          CENTRAL AI WATER INTELLIGENCE
          ===================================================== */}

     <div
  className="water-core"
  style={{
    top: "40%",
    left: "52%",
    transform: "translate(-50%, -50%)",
  }}
>

        <div className="water-core-ring ring-one" />
        <div className="water-core-ring ring-two" />

        <div className="water-core-inner">

          <div className="water-drop">
            💧
          </div>

          <div className="water-core-title">
            AQUAXCHANGE
          </div>

          <div className="water-core-value">
            AI WATER INTELLIGENCE
          </div>

          <div className="water-core-status">
            <span />
            SYSTEM ACTIVE
          </div>

        </div>
      </div>


      {/* =====================================================
          INVISIBLE CURVED WATER NETWORK

          The paths themselves are invisible.
          Only glowing particles travel along them.
          ===================================================== */}

      <svg
        className="water-flow-system"
        viewBox="0 0 1000 650"
        preserveAspectRatio="none"
        aria-hidden="true"
      >

        <defs>

          {/* Soft cyan glow */}
          <filter
            id="waterGlow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur
              stdDeviation="3"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>


          {/* Stronger glow */}
          <filter
            id="waterGlowStrong"
            x="-200%"
            y="-200%"
            width="500%"
            height="500%"
          >
            <feGaussianBlur
              stdDeviation="6"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

        </defs>


        {/* =================================================
            HIDDEN FLOW PATHS
            ================================================= */}

        {/* Reservoir → AI */}
        <path
          id="reservoirFlow"
          d="
            M 270 155
            C 355 165
              390 215
              475 305
          "
          fill="none"
          stroke="transparent"
        />


        {/* AI → Agriculture */}
        <path
          id="agricultureFlow"
          d="
            M 525 325
            C 625 285
              700 245
              850 175
          "
          fill="none"
          stroke="transparent"
        />


        {/* AI → Industry */}
        <path
          id="industryFlow"
          d="
            M 475 350
            C 410 405
              350 470
              250 520
          "
          fill="none"
          stroke="transparent"
        />


        {/* AI → Municipality */}
        <path
          id="cityFlow"
          d="
            M 530 350
            C 620 405
              700 455
              820 510
          "
          fill="none"
          stroke="transparent"
        />


        {/* =================================================
            RESERVOIR → AI PARTICLES
            ================================================= */}

        <circle
          r="3"
          fill="#7df9ff"
          filter="url(#waterGlow)"
        >
          <animateMotion
            dur="3.2s"
            repeatCount="indefinite"
            begin="0s"
          >
            <mpath href="#reservoirFlow" />
          </animateMotion>
        </circle>


        <circle
          r="2.5"
          fill="#00dfff"
          filter="url(#waterGlow)"
        >
          <animateMotion
            dur="3.2s"
            repeatCount="indefinite"
            begin="1.05s"
          >
            <mpath href="#reservoirFlow" />
          </animateMotion>
        </circle>


        <circle
          r="2"
          fill="#b8fbff"
          filter="url(#waterGlow)"
        >
          <animateMotion
            dur="3.2s"
            repeatCount="indefinite"
            begin="2.1s"
          >
            <mpath href="#reservoirFlow" />
          </animateMotion>
        </circle>


        {/* =================================================
            AI → AGRICULTURE
            ================================================= */}

        <circle
          r="3"
          fill="#7df9ff"
          filter="url(#waterGlow)"
        >
          <animateMotion
            dur="3.5s"
            repeatCount="indefinite"
            begin="0.2s"
          >
            <mpath href="#agricultureFlow" />
          </animateMotion>
        </circle>


        <circle
          r="2.5"
          fill="#00dfff"
          filter="url(#waterGlow)"
        >
          <animateMotion
            dur="3.5s"
            repeatCount="indefinite"
            begin="1.35s"
          >
            <mpath href="#agricultureFlow" />
          </animateMotion>
        </circle>


        <circle
          r="2"
          fill="#b8fbff"
          filter="url(#waterGlow)"
        >
          <animateMotion
            dur="3.5s"
            repeatCount="indefinite"
            begin="2.5s"
          >
            <mpath href="#agricultureFlow" />
          </animateMotion>
        </circle>


        {/* =================================================
            AI → INDUSTRY
            ================================================= */}

        <circle
          r="3"
          fill="#7df9ff"
          filter="url(#waterGlow)"
        >
          <animateMotion
            dur="3.1s"
            repeatCount="indefinite"
            begin="0.4s"
          >
            <mpath href="#industryFlow" />
          </animateMotion>
        </circle>


        <circle
          r="2.5"
          fill="#00dfff"
          filter="url(#waterGlow)"
        >
          <animateMotion
            dur="3.1s"
            repeatCount="indefinite"
            begin="1.45s"
          >
            <mpath href="#industryFlow" />
          </animateMotion>
        </circle>


        <circle
          r="2"
          fill="#b8fbff"
          filter="url(#waterGlow)"
        >
          <animateMotion
            dur="3.1s"
            repeatCount="indefinite"
            begin="2.5s"
          >
            <mpath href="#industryFlow" />
          </animateMotion>
        </circle>


        {/* =================================================
            AI → MUNICIPALITY
            ================================================= */}

        <circle
          r="3"
          fill="#7df9ff"
          filter="url(#waterGlow)"
        >
          <animateMotion
            dur="3.7s"
            repeatCount="indefinite"
            begin="0.7s"
          >
            <mpath href="#cityFlow" />
          </animateMotion>
        </circle>


        <circle
          r="2.5"
          fill="#00dfff"
          filter="url(#waterGlow)"
        >
          <animateMotion
            dur="3.7s"
            repeatCount="indefinite"
            begin="1.9s"
          >
            <mpath href="#cityFlow" />
          </animateMotion>
        </circle>


        <circle
          r="2"
          fill="#b8fbff"
          filter="url(#waterGlow)"
        >
          <animateMotion
            dur="3.7s"
            repeatCount="indefinite"
            begin="3s"
          >
            <mpath href="#cityFlow" />
          </animateMotion>
        </circle>


        {/* =================================================
            EXTRA CORE ENERGY PARTICLES
            ================================================= */}

        <circle
          cx="500"
          cy="325"
          r="3"
          fill="#ffffff"
          filter="url(#waterGlowStrong)"
        >
          <animate
            attributeName="opacity"
            values="0.2;1;0.2"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>


        <circle
          cx="500"
          cy="325"
          r="18"
          fill="none"
          stroke="rgba(0,225,255,0.35)"
          strokeWidth="1"
        >
          <animate
            attributeName="r"
            values="15;32;15"
            dur="3.5s"
            repeatCount="indefinite"
          />

          <animate
            attributeName="opacity"
            values="0.5;0;0.5"
            dur="3.5s"
            repeatCount="indefinite"
          />
        </circle>

      </svg>


      {/* =====================================================
          RESERVOIR
          TOP LEFT
          ===================================================== */}

      <div
  className="water-card reservoir-card"
  style={{
    top: "10%",
    left: "8%",
  }}
>

        <div className="water-card-icon">
          💧
        </div>

        <div>
          <span>RESERVOIR</span>

          <strong>
            500,000 L
          </strong>

          <small className="positive">
            ● SURPLUS
          </small>
        </div>

      </div>


      {/* =====================================================
          AGRICULTURE
          TOP RIGHT
          ===================================================== */}

      <div
  className="water-card agriculture-card"
  style={{
    top: "12%",
    right: "1%",
  }}
>
        <div className="water-card-icon">
          🌱
        </div>

        <div>
          <span>AGRICULTURE</span>

          <strong>
            240,000 L
          </strong>

          <small className="warning">
            ● HIGH DEMAND
          </small>
        </div>

      </div>


      {/* =====================================================
          INDUSTRY
          BOTTOM LEFT
          ===================================================== */}

     <div
  className="water-card industry-card"
  style={{
    bottom: "27%",
    left: "7%",
  }}
>

        <div className="water-card-icon">
          🏭
        </div>

        <div>
          <span>INDUSTRY</span>

          <strong>
            100,000 L
          </strong>

          <small className="positive">
            ● BALANCED
          </small>
        </div>

      </div>


      {/* =====================================================
          MUNICIPALITY
          BOTTOM RIGHT
          ===================================================== */}

   <div
  className="water-card city-card"
  style={{
    bottom: "28%",
    right: "7%",
  }}
>

        <div className="water-card-icon">
          🏙️
        </div>

        <div>
          <span>MUNICIPALITY</span>

          <strong>
            180,000 L
          </strong>

          <small className="medium">
            ● MEDIUM DEMAND
          </small>
        </div>

      </div>

    </div>
  );
}