import React from "react";
import {
  List,
  ListItem,
  Divider,
  Container,
  Typography,
  Button,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import OngoingConference from "./OngoingConference";
import { Routes, Route, useNavigate } from "react-router-dom";

const queryConferenceList = require("../api/QueryConferenceList");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    height: 370,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    margin: "2vh 0",
    width: "100%",
    position: "relative",
    transition: "height 0.5s ease-in-out",
  },
  rootExpanded: {
    height: "auto",
  },
  heading: {
    fontFamily: "Poppins, sans-serif",
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  meetingContent: {
    transition: "max-height 0.5s ease-in-out", // Added transition property
  },
  meetingContentExpanded: {
    maxHeight: "300px",
    transition: "max-height 0.5s ease-in-out", // Added transition property
  },
  meetingHeader: {
    display: "flex",
    alignItems: "center",
  },
  listItem: {
    backgroundColor: "#0161b0",
    color: "white",
    borderRadius: 10,
    margin: "0.3vh auto",
    fontFamily: "Poppins, sans-serif",
  },
  listItemText: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  listItemSecondaryText: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 8,
    color: "white",
    lineHeight: 2,
  },
  dateBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    color: "white",
    padding: "4px",
    borderRadius: 4,
    marginRight: 10,
    height: 60,
    marginBottom: "auto",
    marginTop: 14,
  },
  dateBoxDay: {
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "white",
    color: "black",
    width: 55,
    textAlign: "center",
    lineHeight: 1,
    borderRadius: "8px 8px 0 0",
    height: 40,
    padding: "6px 2px",
  },
  dateBoxMonthYear: {
    fontSize: 10,
    lineHeight: 1,
    backgroundColor: "black",
    borderRadius: "0 0 8px 8px",
    height: 20,
    width: 55,
    padding: "6px 2px",
    textAlign: "center",
  },
  meetingDetails: {
    display: "flex",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 18,
    right: 16,
  },
  buttonContainerExpanded: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 18,
    right: 16,
    gap: 80,
  },
  joinButton: {
    backgroundColor: "#0CE23B",
    color: "white",
    borderRadius: 15,
    marginBottom: 20,
    height: 30,
    textTransform: "capitalize",
  },
  endButton: {
    backgroundColor: "black",
    color: "white",
    borderRadius: 15,
    height: 30,
    textTransform: "capitalize",
  },
  expandButton: {
    color: "white",
    marginRight: "auto",
  },

  secondaryText: {
    display: "flex",
    flexDirection: "column",
  },
}));

const UpcomingMeetings = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [expandedMeetings, setExpandedMeetings] = React.useState([]);

  function convertUTCMillisecondsToDate(utcMilliseconds) {
    // Create a new Date object with the UTC milliseconds
    var date = new Date(parseInt(utcMilliseconds, 10));

    // Specify the time zone as 'Asia/Kolkata' for Indian time
    var options = { timeZone: "Asia/Kolkata" };

    // Extract the different components of the date in Indian time
    var year = date.toLocaleString("en-IN", { year: "numeric", options });
    var month = date.toLocaleString("en-IN", { month: "2-digit", options });
    var day = date.toLocaleString("en-IN", { day: "2-digit", options });
    var hours = date.toLocaleString("en-IN", {
      hour: "2-digit",
      hour12: false,
      options,
    });
    var minutes = date.toLocaleString("en-IN", { minute: "2-digit", options });

    // Format the date and time string
    var formattedDate = year + "-" + month + "-" + day;
    var formattedTime = hours + ":" + minutes;

    // Return the formatted date and time
    return {
      year: year,
      month: month,
      day: day,
      hours: hours,
      minutes: minutes,
      formattedDate: formattedDate,
      formattedTime: formattedTime,
    };
  }

  const [meetings, setMeetings] = React.useState([]);

  React.useEffect(() => {
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

    const token = getCookie("user");
    queryConferenceList(token)
      .then((res) => {
        const meetingArray = Object.values(res)
          .filter((value) => typeof value === "object")
          .map((meeting) => meeting);
        setMeetings(meetingArray);
      })
      .catch((err) => {
        alert("Could not fetch meeting details. Please try again later.");
      });
  }, []);

  const handleToggleMeeting = (meetingId) => {
    setExpandedMeetings((prevExpanded) =>
      prevExpanded.includes(meetingId)
        ? prevExpanded.filter((id) => id !== meetingId)
        : [...prevExpanded, meetingId]
    );
  };

  const isMeetingExpanded = (meetingId) => {
    return expandedMeetings.includes(meetingId);
  };

  const handleJoinConference = (meeting) => {
    console.log("Joining meeting: ", meeting);
    const url = `/home/instantConference`;
    window.open(url, "_blank");
  };

  const handleEditConference = (meeting) => {
    console.log("Editing meeting: ", meeting);
  };

  const handleEndConference = (meeting) => {
    console.log("Ending meeting: ", meeting);
  };

  const renderMeetingDetails = (meeting) => {
    const { accessNumber, conferenceKey, chair, general, size } = meeting;

    return (
      <React.Fragment className={classes.secondaryText}>
        <Typography variant="body2" className={classes.listItemSecondaryText}>
          Access Number: {accessNumber}
        </Typography>
        <Typography variant="body2" className={classes.listItemSecondaryText}>
          Conference ID: {conferenceKey.conferenceID}
        </Typography>
        <Typography variant="body2" className={classes.listItemSecondaryText}>
          Chairperson Password: {chair}
        </Typography>
        <Typography variant="body2" className={classes.listItemSecondaryText}>
          Guest Password: {general}
        </Typography>
        <Typography variant="body2" className={classes.listItemSecondaryText}>
          Participants: {size}
        </Typography>
      </React.Fragment>
    );
  };

  return (
    <Container className={classes.root}>
      <Container>
        <Typography variant="h6" className={classes.heading}>
          Ongoing/Upcoming Meetings
        </Typography>
      </Container>
      <Divider />
      <Container>
        <List style={{ maxHeight: "300px", overflowY: "scroll" }}>
          {meetings.map((meeting, key) => (
            <React.Fragment key={key}>
              <ListItem className={classes.listItem}>
                <div className={classes.dateBox}>
                  <Typography variant="body2" className={classes.dateBoxDay}>
                    {convertUTCMillisecondsToDate(meeting.startTime).day}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.dateBoxMonthYear}
                  >
                    {convertUTCMillisecondsToDate(meeting.startTime).month}-
                    {convertUTCMillisecondsToDate(meeting.startTime).year}
                  </Typography>
                </div>
                <div
                  className={`${classes.meetingContent} ${
                    isMeetingExpanded(meeting.id)
                      ? classes.meetingContentExpanded
                      : ""
                  }`}
                >
                  <div className={classes.meetingHeader}>
                    <Typography
                      variant="body1"
                      className={classes.listItemText}
                    >
                      {meeting.subject}
                    </Typography>
                    <IconButton
                      className={classes.expandButton}
                      onClick={() => handleToggleMeeting(meeting.id)}
                    >
                      {isMeetingExpanded(meeting.id) ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </IconButton>
                  </div>
                  <Typography
                    variant="body2"
                    className={classes.listItemSecondaryText}
                  >
                    Start Time:{" "}
                    {convertUTCMillisecondsToDate(meeting.startTime).hours}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.listItemSecondaryText}
                  >
                    End Time:
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.listItemSecondaryText}
                  >
                    Creator: {meeting.scheduserName}
                  </Typography>
                  {isMeetingExpanded(meeting.id) && (
                    <div className={classes.meetingDetails}>
                      <Container disableGutters>
                        {" "}
                        {renderMeetingDetails(meeting)}
                      </Container>
                    </div>
                  )}
                  <div
                    className={
                      !isMeetingExpanded(meeting.id)
                        ? classes.buttonContainer
                        : classes.buttonContainerExpanded
                    }
                  >
                    <Button
                      variant="contained"
                      className={classes.joinButton}
                      onClick={() => handleJoinConference(meeting)}
                    >
                      Join
                    </Button>
                    <Button
                      variant="outlined"
                      className={classes.editButton}
                      onClick={() => handleEditConference(meeting)}
                    >
                      Edit
                    </Button>
                    {isMeetingExpanded(meeting.id) && (
                      <Button
                        variant="contained"
                        className={classes.endButton}
                        onClick={() => handleEndConference(meeting)}
                      >
                        End
                      </Button>
                    )}
                  </div>
                </div>
              </ListItem>
              <Divider />
              {/* <Routes>
        <Route path="/home/startConference" element={<OngoingConference creator={meeting.scheduserName} participantsData=/>} />
      </Routes> */}
            </React.Fragment>
          ))}
        </List>
      </Container>
    </Container>
  );
};
export default UpcomingMeetings;
