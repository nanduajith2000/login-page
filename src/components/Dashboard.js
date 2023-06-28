import React from "react";
import Homenavbar from "./Homenavbar";
import UpcomingMeetings from "./UpcomingMeetings";
import MeetingCalendar from "./MeetingCalendar";
import "./Dashboard.css";
import PreviousConferences from "./PreviousConferences";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Homenavbar />
      <div className="dashboard-sub-container">
        <UpcomingMeetings className="upcoming-meetings" />
        <MeetingCalendar className="calendar" />
      </div>
      <PreviousConferences />
    </div>
  );
}
