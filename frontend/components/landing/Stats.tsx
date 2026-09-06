"use client";

import { motion } from "framer-motion";
import { Droplets, Network, Leaf } from "lucide-react";

const stats = [
  {
    icon: Droplets,
    value: "1.24M L",
    label: "Water Connected",
  },
  {
    icon: Network,
    value: "150+",
    label: "Active Stakeholders",
  },
  {
    icon: Leaf,
    value: "94.7%",
    label: "AI Matching Accuracy",
  },
];

export default function Stats() {
  return (
    <section className="stats-section">

      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.label}
            className="stat"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15,
            }}
          >

            <Icon />

            <div>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>

          </motion.div>
        );
      })}

    </section>
  );
}