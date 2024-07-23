import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, IconButton } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";

const localizer = momentLocalizer(moment);

const useStyles = makeStyles((theme) => ({
  calendarContainer: {
    height: 370,
    width: "35vw",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    overflow: "hidden",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 10,
  },
  navigationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "16px",
    background: "#0161b0",
    borderRadius: 10,
  },
  navigationButton: {
    color: "white",
    marginLeft: "8px",
    marginRight: "8px",
  },
  customEventWrapper: {
    background: "#0161b0",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "4px",
    cursor: "pointer",
  },
}));

const MeetingCalendar = () => {
  const classes = useStyles();
  const [meetingSchedule, setMeetingSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(moment());

  useEffect(() => {
    // Fetch meeting schedule from FastAPI backend
    const fetchMeetingSchedule = async () => {
      try {
        const response = await fetch("/api/meeting-schedule");
        if (response.ok) {
          const data = await response.json();
          setMeetingSchedule(data);
        } else {
          console.error(
            "Error fetching meeting schedule:",
            response.statusText
          );
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meeting schedule:", error);
        setLoading(false);
      }
    };

    fetchMeetingSchedule();
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, "month"));
  };

  const formatCustomDayHeader = (date, label) => {
    const day = date.getDate();
    const formattedDay = day > 9 ? day : "x";
    return (
      <div className="rbc-header" style={{ textAlign: "center" }}>
        {formattedDay}
        <br />
        {label}
      </div>
    );
  };

  const CustomCalendarHeader = ({ label }) => {
    const parts = label.split(" ");
    const monthYear = parts.slice(0, 2).join(" ");
    return (
      <div className={classes.navigationContainer}>
        <div style={{ flex: 1 }}></div> {/* Add a flexible empty div */}
        <IconButton
          className={classes.navigationButton}
          onClick={handlePrevMonth}
        >
          <ChevronLeft style={{ color: "white" }} />
        </IconButton>
        <span style={{ color: "white" }}>{monthYear}</span>
        <IconButton
          className={classes.navigationButton}
          onClick={handleNextMonth}
        >
          <ChevronRight style={{ color: "white" }} />
        </IconButton>
        <div style={{ flex: 1 }}></div> {/* Add another flexible empty div */}
      </div>
    );
  };

  const CustomCalendar = ({ events }) => (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100%" }}
      eventPropGetter={() => ({
        style: {
          backgroundColor: "#0161b0",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "4px",
          cursor: "pointer",
        },
      })}
      components={{
        toolbar: CustomCalendarHeader,
        day: {
          header: formatCustomDayHeader,
        },
      }}
      views={{
        month: true,
        week: true,
      }}
      defaultDate={currentDate.toDate()}
      defaultView={Views.MONTH}
    />
  );

  return (
    <div className={classes.calendarContainer}>
      {loading ? (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      ) : (
        <CustomCalendar events={meetingSchedule} />
      )}
    </div>
  );
};

export default MeetingCalendar;
