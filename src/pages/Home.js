import React from "react";
import Dashboard from "../components/Dashboard";
import Sidenav from "../components/Sidenav";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <Sidenav />
      <Dashboard />
    </div>
  );
}
