import React from "react";
import Dashboard from "../components/Dashboard";
import CreateConference from "../components/CreateConference";
import Sidenav from "../components/Sidenav";
import Contacts from "../components/Contacts";
import ConferenceTemplates from "../components/ConferenceTemplates";
import CreateTemplate from "../components/CreateTemplate";
import InstantConference from "./InstantConference";
import Settings from "../components/Settings";
import { Routes, Route, useLocation } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const location = useLocation();
  const hideSidenav = location.pathname === "/home/instantConference";

  return (
    <div className="home-container">
      {!hideSidenav && <Sidenav />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/createConference" element={<CreateConference />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/conferenceTemplates" element={<ConferenceTemplates />} />
        <Route path="/createTemplate" element={<CreateTemplate />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/instantConference" element={<InstantConference />} />
      </Routes>
    </div>
  );
}
