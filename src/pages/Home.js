import React from "react";
import Dashboard from "../components/Dashboard";
import CreateConference from "../components/CreateConferencePage";
import Sidenav from "../components/Sidenav";
import Contacts from "../components/Contacts";
import ConferenceTemplates from "../components/ConferenceTemplates";
import CreateTemplate from "../components/CreateTemplate";
import InstantConference from "./InstantConference";
import Settings from "../components/Settings";
import { Routes, Route, useLocation } from "react-router-dom";
import participantsData from "../data/participantsData";
import { userDetailsContext } from "../App";
import "./Home.css";

export const userDetailsContextThree = React.createContext();

export default function Home() {
  const webAccount = React.useContext(userDetailsContext).webAccount;
  const setWebAccount = React.useContext(userDetailsContext).setWebAccount;
  const location = useLocation();
  const hideSidenav = location.pathname === "/home/instantConference";

  return (
    <div className="home-container">
      <userDetailsContextThree.Provider value={{ webAccount, setWebAccount }}>
        {!hideSidenav && <Sidenav />}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/createConference" element={<CreateConference />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route
            path="/conferenceTemplates"
            element={<ConferenceTemplates />}
          />
          <Route path="/createTemplate" element={<CreateTemplate />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/instantConference"
            element={<InstantConference participantsData={participantsData} />}
          />
        </Routes>
      </userDetailsContextThree.Provider>
    </div>
  );
}
