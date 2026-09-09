"use client";

import { motion } from "framer-motion";
import { Droplets } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="navbar"
    >
      {/* LOGO */}

      <div className="brand">
        <div className="brand-icon">
          <Droplets size={30} strokeWidth={2.5} />
        </div>

        <div>
          <div className="brand-name">
            Aqua<span>X</span>Change
          </div>

          <div className="brand-tagline">
            Smarter Water. Smarter Decisions.
          </div>
        </div>
      </div>

      {/* PROJECT INFORMATION TICKER */}

      <div className="nav-ticker">
        <div className="nav-ticker-track">
          <span>AI-POWERED WATER EXCHANGE</span>
          <b>•</b>

          <span>SMART WATER ALLOCATION</span>
          <b>•</b>

          <span>WATER DEMAND FORECASTING</span>
          <b>•</b>

          <span>RESERVOIRS</span>
          <b>•</b>

          <span>AGRICULTURE</span>
          <b>•</b>

          <span>INDUSTRY</span>
          <b>•</b>

          <span>MUNICIPALITIES</span>
          <b>•</b>

          <span>AI DECISION SUPPORT</span>
          <b>•</b>

          <span>SUSTAINABLE WATER MANAGEMENT</span>

          {/* DUPLICATE FOR SEAMLESS LOOP */}

          <span>AI-POWERED WATER EXCHANGE</span>
          <b>•</b>

          <span>SMART WATER ALLOCATION</span>
          <b>•</b>

          <span>WATER DEMAND FORECASTING</span>
          <b>•</b>

          <span>RESERVOIRS</span>
          <b>•</b>

          <span>AGRICULTURE</span>
          <b>•</b>

          <span>INDUSTRY</span>
          <b>•</b>

          <span>MUNICIPALITIES</span>
          <b>•</b>

          <span>AI DECISION SUPPORT</span>
          <b>•</b>

          <span>SUSTAINABLE WATER MANAGEMENT</span>
        </div>
      </div>

      {/* SAVE WATER MESSAGE */}

      <div className="nav-water-message">
        <div className="nav-water-drops">
          <motion.span
            animate={{
              y: [0, 10, 0],
              opacity: [0.35, 1, 0.35],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.span
            animate={{
              y: [0, 13, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: 0.5,
              ease: "easeInOut",
            }}
          />

          <motion.span
            animate={{
              y: [0, 8, 0],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: 0.9,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="nav-water-icon">
          <Droplets size={17} strokeWidth={2} />
        </div>

        <div className="nav-water-text">
          <span>SAVE WATER</span>
          <strong>SAVE LIFE</strong>
        </div>
      </div>
    </motion.nav>
  );
}