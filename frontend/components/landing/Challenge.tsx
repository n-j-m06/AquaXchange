"use client";

import { motion } from "framer-motion";
import {
  Sprout,
  Factory,
  Building2,
  Globe2,
  Droplet,
  ArrowDown,
} from "lucide-react";

const features = [
  {
    icon: Sprout,
    title: "Support Agriculture",
    description: "Ensure food security",
  },
  {
    icon: Factory,
    title: "Enable Industry",
    description: "Drive sustainable growth",
  },
  {
    icon: Building2,
    title: "Empower Cities",
    description: "Smarter urban living",
  },
  {
    icon: Globe2,
    title: "Protect Our Planet",
    description: "A more resilient future",
  },
];

export default function Challenge() {
  return (
    <section className="challenge">

      <div className="challenge-heading">

        <div>
          <span>A GLOBAL CHALLENGE</span>

          <h2>
            Water is everywhere.
            <br />
            Efficient allocation isn't.
          </h2>
        </div>

        <div className="challenge-divider">
          <Droplet />
        </div>

        <p>
          While some regions have surplus water,
          others face critical shortages.
          AquaXChange bridges this gap with
          AI-powered allocation, real-time data
          and intelligent decision making.
        </p>

      </div>

      <div className="feature-grid">

        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              className="feature"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
              }}
            >

              <Icon />

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

            </motion.div>
          );
        })}

      </div>

      <motion.div
        className="scroll-explore"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div>
          <ArrowDown />
        </div>

        <span>Scroll to explore</span>
      </motion.div>

    </section>
  );
}