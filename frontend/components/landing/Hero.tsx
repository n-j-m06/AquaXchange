"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import WaterScene from "./WaterScene";

export default function Hero() {
  return (
    <section className="ax-hero">
        {/* FULL SCREEN RAIN */}
<div className="ax-global-rain" aria-hidden="true">
  {Array.from({ length: 110 }).map((_, i) => (
    <span
      key={i}
      style={{
        left: `${(i * 17.37) % 100}%`,
        animationDelay: `${(i * 0.13) % 4}s`,
        animationDuration: `${1.3 + ((i * 11) % 14) / 10}s`,
        opacity: 0.18 + ((i * 7) % 6) / 20,
      }}
    />
  ))}
</div>

      {/* LEFT CONTENT */}
      <div className="ax-hero-content">

        <motion.div
          className="ax-eyebrow"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span />
          AI POWERED WATER EXCHANGE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          A More
          <br />
          Sustainable
          <br />
          <em>Tomorrow.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Connecting water sources, industries,
          cities and agriculture through intelligent
          allocation.
        </motion.p>

        <motion.div
          className="ax-hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a href="/login" className="ax-primary-btn">
  Explore the Platform
  <ArrowRight size={18} />
</a>

        </motion.div>

      </div>

      {/* RIGHT VISUAL */}
      <motion.div
        className="ax-hero-visual"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <WaterScene />
      </motion.div>

    </section>
  );
}