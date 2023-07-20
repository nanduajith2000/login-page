import React from "react";
import Homenavbarlite from "./Homenavbarlite";
import UpcomingMeetings from "./UpcomingMeetings";
import MeetingCalendar from "./MeetingCalendar";
import "./Dashboard.css";
import PreviousConferences from "./PreviousConferences";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Homenavbarlite />
      <div className="dashboard-sub-container">
        <UpcomingMeetings className="upcoming-meetings" />
        <MeetingCalendar className="calendar" />
      </div>
      <PreviousConferences />
    </div>
  );
}
