"use client";

import { motion } from "framer-motion";
import {
  Droplets,
  Factory,
  Building2,
  Sprout,
  BrainCircuit,
} from "lucide-react";

export default function WaterNetwork() {
  return (
    <div className="water-network">

      {/* BACKGROUND MOUNTAINS */}

      <div className="mountains">
        <div className="mountain mountain-one" />
        <div className="mountain mountain-two" />
        <div className="mountain mountain-three" />
      </div>

      {/* RESERVOIR */}

      <motion.div
        className="reservoir"
        animate={{
          boxShadow: [
            "0 0 20px rgba(0,220,255,.2)",
            "0 0 50px rgba(0,220,255,.55)",
            "0 0 20px rgba(0,220,255,.2)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <div className="reservoir-water" />

        <div className="waterfall">
          <span />
          <span />
          <span />
        </div>
      </motion.div>

      {/* AI CORE */}

      <motion.div
        className="ai-core"
        animate={{
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="ai-ring ring-one" />
        <div className="ai-ring ring-two" />

        <BrainCircuit size={35} />

        <strong>AI</strong>

        <small>AquaXChange</small>
        <small>AI Core</small>
      </motion.div>

      {/* CONNECTION LINES */}

      <div className="connection connection-one" />
      <div className="connection connection-two" />
      <div className="connection connection-three" />

      {/* WATER PARTICLES */}

      {[...Array(16)].map((_, index) => (
        <motion.div
          key={index}
          className="water-particle"
          style={{
            left: `${25 + Math.random() * 45}%`,
            top: `${25 + Math.random() * 45}%`,
          }}
          animate={{
            x: [0, 120, 220],
            y: [0, 40, 10],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* INDUSTRY */}

      <div className="network-card industry-card">
        <Factory />
        <div>
          <strong>Industry</strong>
          <b>100,000 L</b>
          <span className="status green">● Balanced</span>
        </div>
      </div>

      {/* AGRICULTURE */}

      <div className="network-card agriculture-card">
        <Sprout />
        <div>
          <strong>Agriculture</strong>
          <b>240,000 L</b>
          <span className="status red">● High Demand</span>
        </div>
      </div>

      {/* MUNICIPALITY */}

      <div className="network-card municipality-card">
        <Building2 />
        <div>
          <strong>Municipality</strong>
          <b>180,000 L</b>
          <span className="status yellow">● Medium Demand</span>
        </div>
      </div>

      {/* RESERVOIR CARD */}

      <div className="network-card reservoir-card">
        <Droplets />
        <div>
          <strong>Reservoir Alpha</strong>
          <b>500,000 L</b>
          <span className="status green">● Surplus</span>
        </div>
      </div>

      {/* SLOGAN */}

      <div className="network-slogan">
        Every Drop
        <br />
        Creates Possibilities
      </div>

    </div>
  );
}