import React from "react";
import Dashboard from "../components/Dashboard";
import CreateConference from "../components/CreateConferencePage";
import Sidenav from "../components/Sidenav";
import Contacts from "../components/Contacts";
import ConferenceTemplates from "../components/ConferenceTemplates";
import CreateTemplate from "../components/CreateTemplate";
import InstantConference from "../components/InstantConference";
import OngoingConference from "../components/OngoingConference";
import Settings from "../components/Settings";
import EditConferencePage from "../components/EditConferencePage";
import { Routes, Route, useLocation } from "react-router-dom";
import participantsData from "../data/participantsData";
import { userDetailsContext } from "../App";
import "./Home.css";

export const userDetailsContextThree = React.createContext();

export default function Home(props) {
  const webAccount = React.useContext(userDetailsContext).webAccount;
  const setWebAccount = React.useContext(userDetailsContext).setWebAccount;
  let [meeting, setMeeting] = React.useState([]);
  const location = useLocation();
  const hideSidenav = location.pathname === "/home/instantConference";
  const alsoHideSidenav = location.pathname === "/home/startConference";

  return (
    <div className="home-container">
      <userDetailsContextThree.Provider
        value={{ webAccount, setWebAccount, meeting, setMeeting }}
      >
        {!hideSidenav && !alsoHideSidenav && <Sidenav userID={props.userID} />}
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
          <Route path="/startConference" element={<OngoingConference />} />
          <Route path="/editConference" element={<EditConferencePage />} />
        </Routes>
      </userDetailsContextThree.Provider>
    </div>
  );
}
