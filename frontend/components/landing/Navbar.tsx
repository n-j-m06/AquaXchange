"use client";

import { motion } from "framer-motion";
import { Search, ArrowUpRight, Droplets } from "lucide-react";

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

      {/* NAVIGATION */}

      <div className="nav-links">
        <a href="#platform">Platform</a>
        <a href="#solutions">Solutions</a>
        <a href="#technology">Technology</a>
        <a href="#impact">Impact</a>
        <a href="#about">About</a>
      </div>

      {/* RIGHT */}

      <div className="nav-actions">

        <Search size={20} />

        <div className="nav-divider" />

        <a className="login-link">
          Login
        </a>

        <motion.button
          whileHover={{
            scale: 1.04,
            boxShadow: "0 0 35px rgba(0,210,255,.45)",
          }}
          whileTap={{ scale: 0.97 }}
          className="launch-button"
        >
          Launch Platform
          <ArrowUpRight size={18} />
        </motion.button>

      </div>
    </motion.nav>
  );
}