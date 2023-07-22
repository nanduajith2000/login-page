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
import ScheduleTemplate from "../components/ScheduleTemplate";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import participantsData from "../data/participantsData";
import { userDetailsContext } from "../App";
import "./Home.css";

export const userDetailsContextThree = React.createContext();

export default function Home(props) {
  const webAccount = React.useContext(userDetailsContext).webAccount;
  const setWebAccount = React.useContext(userDetailsContext).setWebAccount;

  const location = useLocation();
  let [meeting, setMeeting] = React.useState([]);
  const hideSidenav = location.pathname === "/home/instantConference";
  const alsoHideSidenav = location.pathname === "/home/startConference";

  const navigate = useNavigate();
  React.useEffect(() => {
    // Check if the user is on the home page
    if (location.pathname === "/home") {
      // Redirect the user to the home page if they attempt to go back to the login page
      navigate("/home");
    }
  }, [location, navigate]);

  function getCookie(cookieName) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(":");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + "=")) {
        return cookie.substring(cookieName.length + 1);
      }
    }

    return null; // Return null if the cookie is not found
  }

  let token = getCookie("user");

  React.useEffect(() => {
    // Check if the user is on the home page
    if (!token) {
      navigate("/");
    }
  }, [token]);
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
          <Route path="/scheduletemplate" element={<ScheduleTemplate />} />
        </Routes>
      </userDetailsContextThree.Provider>
    </div>
  );
}
