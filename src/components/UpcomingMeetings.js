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
import { useNavigate } from "react-router-dom";
import API from '../api/API.js';


// const queryConferenceList = require("../api/QueryConferenceList");
// const EndConference = require("../api/RemoveConference");

// const Login = require("../api/Login");

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
    gap: 20,
  },
  joinButton: {
    backgroundColor: "#0CE23B",
    color: "white",
    borderRadius: 15,
    marginBottom: 20,
    height: 30,
    textTransform: "capitalize",
    fontFamily: "Poppins, sans-serif",
  },
  editButton: {
    color: "white",
    borderRadius: 15,
    border: "1px solid white",
    height: 30,
    textTransform: "capitalize",
    fontFamily: "Poppins, sans-serif",
  },
  endButton: {
    backgroundColor: "black",
    color: "white",
    borderRadius: 15,
    height: 30,
    textTransform: "capitalize",
    fontFamily: "Poppins, sans-serif",
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
  const classes = useStyles();
  const navigate = useNavigate();

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

  React.useEffect(() => {
    const token = getCookie("user");
    API.queryConferenceList(token)
      .then((res) => {
        const meetingArray = Object.values(res)
          .filter((value) => typeof value === "object")
          .map((meeting) => ({
            ...meeting,
            expanded: false,
          }));
        setMeetings(meetingArray);
      })
      .catch((err) => {
        alert("Could not fetch meeting details. Please try again later.");
      });
  }, []);

  const handleToggleMeeting = (meetingId) => {
    setMeetings((prevMeetings) => {
      const updatedMeetings = prevMeetings.map((meeting) => {
        if (meeting.id === meetingId) {
          return {
            ...meeting,
            expanded: !meeting.expanded,
          };
        }
        return meeting;
      });

      return updatedMeetings;
    });
  };

  const handleJoinConference = (meeting) => {
    // console.log(meeting.conferenceKey.conferenceID,meeting.chair)

    localStorage.setItem("meetingDetails", JSON.stringify(meeting));
    console.log(
      "Meeting details: ",
      JSON.parse(localStorage.getItem("meetingDetails"))
    );
    window.open(`/home/startConference`);
  };

  const handleEditConference = (meeting) => {
    console.log("Editing meeting: ", meeting);
    localStorage.setItem("meetingDetails", JSON.stringify(meeting));
    navigate("/home/editConference");
  };

  const handleRemoveConference = (meeting) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this meeting?"
    );
    if (confirmDelete) {
      console.log("Removing meeting: ", meeting);
      const token = getCookie("user");
      API.EndConference(token, meeting.conferenceKey.conferenceID, "0")
        .then((res) => {
          console.log(res);
          const token = getCookie("user");
          API.queryConferenceList(token)
            .then((res) => {
              const meetingArray = Object.values(res)
                .filter((value) => typeof value === "object")
                .map((meeting) => ({
                  ...meeting,
                  expanded: false,
                }));
              setMeetings(meetingArray);
            })
            .catch((err) => {
              alert("Could not fetch meeting details. Please try again later.");
            });
        })
        .catch((err) => {
          console.log(err);
          alert("Could not end meeting. Please try again later.");
        });
    }
  };

  const renderMeetingDetails = (meeting) => {
    const { accessNumber, conferenceKey, chair, general, size } = meeting;

    return (
      <React.Fragment>
        <Container disableGutters className={classes.secondaryText}>
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
        </Container>
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
          {meetings.map((meeting) => (
            <React.Fragment key={meeting.id}>
              <ListItem
                key={meeting.id}
                className={`${classes.listItem} ${
                  meeting.expanded ? classes.rootExpanded : ""
                }`}
              >
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
                    meeting.expanded ? classes.meetingContentExpanded : ""
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
                      color="secondary"
                      onClick={() => handleToggleMeeting(meeting.id)}
                    >
                      {meeting.expanded ? (
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
                    {
                      convertUTCMillisecondsToDate(meeting.startTime)
                        .formattedTime
                    }
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.listItemSecondaryText}
                  >
                    End Time:{" "}
                    {/* {
                      convertUTCMillisecondsToDate(
                        parseInt(meeting.startTime) + parseInt(meeting.duration)
                      ).formattedTime
                    } */}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.listItemSecondaryText}
                  >
                    Creator: {meeting.scheduserName}
                  </Typography>
                  {meeting.expanded && (
                    <div className={classes.meetingDetails}>
                      <Container disableGutters>
                        {renderMeetingDetails(meeting)}
                      </Container>
                    </div>
                  )}
                  <div
                    className={
                      !meeting.expanded
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
                    {meeting.expanded && (
                      <Button
                        variant="contained"
                        className={classes.endButton}
                        onClick={() => handleRemoveConference(meeting)}
                      >
                        End
                      </Button>
                    )}
                  </div>
                </div>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Container>
    </Container>
  );
};

export default UpcomingMeetings;
