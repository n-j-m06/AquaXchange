"use client";

import { Droplets, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardHeader() {
  const pathname = usePathname();

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
      // Keep default name
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
    <header className="dashboard-nav">

      {/* BRAND */}
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

      {/* NAVIGATION */}
      <nav className="dashboard-links">

        <a
          className={pathname === "/dashboard" ? "active" : ""}
          href="/dashboard"
        >
          Overview
        </a>

        <a
          className={pathname === "/dashboard/map" ? "active" : ""}
          href="/dashboard/map"
        >
          Water Map
        </a>

        <a
          className={pathname === "/dashboard/insights" ? "active" : ""}
          href="/dashboard/insights"
        >
          AI Insights
        </a>

        <a
          className={pathname === "/dashboard/sources" ? "active" : ""}
          href="/dashboard/sources"
        >
          Sources
        </a>

        <a
          className={pathname === "/dashboard/demand" ? "active" : ""}
          href="/dashboard/demand"
        >
          Demand
        </a>

      </nav>

      {/* USER */}
      <div className="dashboard-user">

        <div className="user-info">
          <strong>{userName}</strong>

        </div>

        <div className="user-avatar">
          {initials}
        </div>

        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
          aria-label="Log out"
          title="Log out"
        >
          <LogOut size={14} />
          <span>Log out</span>
        </button>

      </div>

    </header>
  );
}