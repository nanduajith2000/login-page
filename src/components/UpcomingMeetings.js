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
  Chip,
  CircularProgress,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useNavigate } from "react-router-dom";
import API from "../api/API.js";

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
    gap: 20,
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
    fontSize: "0.8rem",
    color: "white",
    borderRadius: 15,
    height: 30,
    textTransform: "capitalize",
    width: 80,
    fontFamily: "Poppins, sans-serif",
  },
  editButton: {
    color: "white",
    fontSize: "0.8rem",
    borderRadius: 15,
    border: "1px solid white",
    height: 30,
    width: 80,
    textTransform: "capitalize",
    fontFamily: "Poppins, sans-serif",
  },
  endButton: {
    backgroundColor: "black",
    fontSize: "0.8rem",
    color: "white",
    width: 80,
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
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  emptyMessage: {
    fontSize: 16,
    // fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginTop: "20vh",
  },
  chipContainer: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 10,
    alignItems: "center",
  },
  chip: {
    height: 12,
    fontSize: 8,
    textAlign: "center",
  },
}));

const UpcomingMeetings = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);

  function convertUTCMillisecondsToDate(utcMilliseconds) {
    // Create a new Date object with the UTC milliseconds
    var date = new Date(parseInt(utcMilliseconds, 10));

    // Specify the time zone as 'Asia/Kolkata' for Indian time
    var options = { timeZone: "Asia/Kolkata" };

    // Extract the different components of the date in Indian time
    var year = date.toLocaleString("en-IN", { year: "numeric", options });
    var month = date.toLocaleString("en-IN", { month: "2-digit", options });
    var day = date.toLocaleString("en-IN", { day: "2-digit", options });
    var hours = date
      .toLocaleString("en-IN", {
        hour: "2-digit",
        hour12: false,
        options,
      })
      .padStart(2, "0");
    var minutes = date
      .toLocaleString("en-IN", { minute: "2-digit", options })
      .padStart(2, "0"); // Ensure minutes have two digits

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
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [isSingleMeeting, setIsSingleMeeting] = React.useState(false);
  const [singleMeetingDetails, setSingleMeetingDetails] = React.useState({});

  React.useEffect(() => {
    const token = getCookie("user");
    API.queryConferenceList(token)
      .then((res) => {
        console.log("Conference List: ", res);
        if (
          (res.conferenceList &&
            res.conferenceList.result &&
            res.conferenceList.result.resultDesc === "UNAUTHORIZED") ||
          res.message === "UNAUTHORIZED"
        ) {
          alert(
            "Session expired. Please login again or try clearing your cookies."
          );
          navigate("/");
        } else {
          if (res.message === "no_upcoming_meetings") {
            setIsEmpty(true);
          } else {
            const meetingArray = Object.values(res)
              .filter((value) => typeof value === "object")
              .map((meeting, index) => ({
                ...meeting,
                id: index + 1,
                expanded: false,
              }));
            setMeetings(meetingArray);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        alert("Could not fetch meeting details. Please try again later.");
        console.log(err);
        setLoading(false);
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

  const handleEndConference = (meeting) => {
    const confirmEnd = window.confirm(
      "Are you sure you want to end this meeting?"
    );
    if (confirmEnd) {
      console.log("Ending meeting: ", meeting);
      const token = getCookie("user");
      API.Login(
        meeting.conferenceKey.conferenceID,
        meeting.chair,
        "ConferenceID"
      )
        .then((res) => {
          API.EndConference(res.token, meeting.conferenceKey.conferenceID)
            .then((res) => {
              console.log("End conference response: ", res);

              setLoading(true);
              API.queryConferenceList(token)
                .then((res) => {
                  console.log("Conference List: ", res);
                  if (res.message === "UNAUTHORIZED") {
                    alert("Session expired. Please login again.");
                    navigate("/");
                  } else {
                    const meetingArray = Object.values(res)
                      .filter((value) => typeof value === "object")
                      .map((meeting) => ({
                        ...meeting,
                        expanded: false,
                      }));
                    setMeetings(meetingArray);

                    setLoading(false);
                  }
                })
                .catch((err) => {
                  alert(
                    "Could not fetch meeting details. Please try again later."
                  );
                });
            })
            .catch((err) => {
              console.log(err);
              alert("Could not end meeting. Please try again later.");
            });
        })
        .catch((err) => {
          console.log(err);
          alert("Could not end meeting. Please try again later.");
        });
    }
  };

  const handleRemoveConference = (meeting) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this meeting?"
    );
    if (confirmDelete) {
      console.log("Removing meeting: ", meeting);
      const token = getCookie("user");
      API.RemoveConference(token, meeting.conferenceKey.conferenceID, "0")
        .then((res) => {
          console.log(res);
          if (res.message === "UNAUTHORIZED") {
            alert("Session expired. Please login again.");
            navigate("/");
          } else {
            setLoading(true);
            API.queryConferenceList(token)
              .then((res) => {
                const meetingArray = Object.values(res)
                  .filter((value) => typeof value === "object")
                  .map((meeting) => ({
                    ...meeting,
                    expanded: false,
                  }));
                setMeetings(meetingArray);
                setLoading(false);
              })
              .catch((err) => {
                alert(
                  "Could not fetch meeting details. Please try again later."
                );
                setLoading(false);
              });
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Could not remove meeting. Please try again later.");
        });
    }
  };

  const renderMeetingDetails = (meeting) => {
    let { accessNumber, conferenceKey, chair, general, size, attendees } =
      meeting;

    if (!Array.isArray(attendees)) {
      attendees = attendees ? [attendees] : [];
    }

    return (
      <React.Fragment>
        {!isSingleMeeting && (
          <Container disableGutters className={classes.secondaryText}>
            <Typography
              variant="body2"
              className={classes.listItemSecondaryText}
            >
              Access Number: {accessNumber}
            </Typography>
            <Typography
              variant="body2"
              className={classes.listItemSecondaryText}
            >
              Conference ID: {conferenceKey.conferenceID}
            </Typography>
            <Typography
              variant="body2"
              className={classes.listItemSecondaryText}
            >
              Chairperson Password: {chair}
            </Typography>
            <Typography
              variant="body2"
              className={classes.listItemSecondaryText}
            >
              Guest Password: {general}
            </Typography>
            <Typography
              variant="body2"
              className={classes.listItemSecondaryText}
            >
              Meeting Size: {size}
            </Typography>
            {attendees !== undefined && (
              <Container disableGutters className={classes.chipContainer}>
                {attendees.map((attendee) => (
                  <Chip
                    key={attendee.attendeeName}
                    label={attendee.attendeeName}
                    className={classes.chip}
                  />
                ))}
              </Container>
            )}
          </Container>
        )}
        {isSingleMeeting && (
          <Container disableGutters className={classes.secondaryText}>
            <Typography
              variant="body2"
              className={classes.listItemSecondaryText}
            >
              Access Number: {singleMeetingDetails.accessNumber}
            </Typography>
            <Typography
              variant="body2"
              className={classes.listItemSecondaryText}
            >
              Conference ID: {singleMeetingDetails.conferenceID}
            </Typography>
            <Typography
              variant="body2"
              className={classes.listItemSecondaryText}
            >
              Chairperson Password:
            </Typography>
            <Typography
              variant="body2"
              className={classes.listItemSecondaryText}
            >
              Guest Password:
            </Typography>
            <Typography
              variant="body2"
              className={classes.listItemSecondaryText}
            >
              Participants: {singleMeetingDetails.size}
            </Typography>
          </Container>
        )}
      </React.Fragment>
    );
  };

  const currentTime = new Date().getTime();

  return (
    <Container className={classes.root}>
      <Container>
        <Typography variant="h6" className={classes.heading}>
          Ongoing/Upcoming Meetings
        </Typography>
      </Container>
      <Divider />
      {loading ? ( // Render loading icon if loading is true
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      ) : (
        <Container>
          <List style={{ maxHeight: "300px", overflowY: "auto" }}>
            {!isEmpty &&
              !isSingleMeeting &&
              meetings.map((meeting) => (
                <React.Fragment key={meeting.id}>
                  <ListItem
                    key={meeting.id}
                    className={`${classes.listItem} ${
                      meeting.expanded ? classes.rootExpanded : ""
                    }`}
                  >
                    <div className={classes.dateBox}>
                      <Typography
                        variant="body2"
                        className={classes.dateBoxDay}
                      >
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
                            singleMeetingDetails.endTime
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
                        {meeting.startTime <= currentTime && (
                          <Button
                            variant="contained"
                            className={classes.joinButton}
                            onClick={() => handleJoinConference(meeting)}
                          >
                            Join
                          </Button>
                        )}
                        {meeting.startTime <= currentTime &&
                          meeting.expanded && (
                            <Button
                              variant="contained"
                              className={classes.endButton}
                              onClick={() => handleEndConference(meeting)}
                            >
                              End
                            </Button>
                          )}
                        {meeting.startTime > currentTime && (
                          <Button
                            variant="outlined"
                            className={classes.editButton}
                            onClick={() => handleEditConference(meeting)}
                          >
                            Edit
                          </Button>
                        )}

                        {meeting.startTime > currentTime && (
                          <Button
                            variant="contained"
                            className={classes.endButton}
                            onClick={() => handleRemoveConference(meeting)}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            {isEmpty && !isSingleMeeting && (
              <Typography variant="body2" className={classes.emptyMessage}>
                No upcoming meetings
              </Typography>
            )}
            {!isEmpty && isSingleMeeting && (
              <React.Fragment key={singleMeetingDetails.id}>
                <ListItem
                  key={singleMeetingDetails.id}
                  className={`${classes.listItem} ${
                    singleMeetingDetails.expanded ? classes.rootExpanded : ""
                  }`}
                >
                  <div className={classes.dateBox}>
                    <Typography variant="body2" className={classes.dateBoxDay}>
                      {
                        convertUTCMillisecondsToDate(
                          singleMeetingDetails.startTime
                        ).day
                      }
                    </Typography>
                    <Typography
                      variant="body2"
                      className={classes.dateBoxMonthYear}
                    >
                      {
                        convertUTCMillisecondsToDate(
                          singleMeetingDetails.startTime
                        ).month
                      }
                      -
                      {
                        convertUTCMillisecondsToDate(
                          singleMeetingDetails.startTime
                        ).year
                      }
                    </Typography>
                  </div>
                  <div
                    className={`${classes.meetingContent} ${
                      singleMeetingDetails.expanded
                        ? classes.meetingContentExpanded
                        : ""
                    }`}
                  >
                    <div className={classes.meetingHeader}>
                      <Typography
                        variant="body1"
                        className={classes.listItemText}
                      >
                        {singleMeetingDetails.subject}
                      </Typography>
                      <IconButton
                        className={classes.expandButton}
                        color="secondary"
                        onClick={() => {
                          setSingleMeetingDetails({
                            ...singleMeetingDetails,
                            expanded: !singleMeetingDetails.expanded,
                          });
                        }}
                      >
                        {singleMeetingDetails.expanded ? (
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
                        convertUTCMillisecondsToDate(
                          singleMeetingDetails.startTime
                        ).formattedTime
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
                      Creator: {singleMeetingDetails.creator}
                    </Typography>
                    {singleMeetingDetails.expanded && (
                      <div className={classes.meetingDetails}>
                        <Container disableGutters>
                          {renderMeetingDetails(singleMeetingDetails)}
                        </Container>
                      </div>
                    )}
                    <div
                      className={
                        !singleMeetingDetails.expanded
                          ? classes.buttonContainer
                          : classes.buttonContainerExpanded
                      }
                    >
                      {singleMeetingDetails.startTime <= currentTime && (
                        <Button
                          variant="contained"
                          className={classes.joinButton}
                          onClick={() =>
                            handleJoinConference(singleMeetingDetails)
                          }
                        >
                          Join
                        </Button>
                      )}
                      {singleMeetingDetails.startTime <= currentTime &&
                        singleMeetingDetails.expanded && (
                          <Button
                            variant="contained"
                            className={classes.endButton}
                            onClick={() =>
                              handleEndConference(singleMeetingDetails)
                            }
                          >
                            End
                          </Button>
                        )}
                      {singleMeetingDetails.startTime > currentTime && (
                        <Button
                          variant="outlined"
                          className={classes.editButton}
                          onClick={() =>
                            handleEditConference(singleMeetingDetails)
                          }
                        >
                          Edit
                        </Button>
                      )}

                      {singleMeetingDetails.startTime > currentTime && (
                        <Button
                          variant="contained"
                          className={classes.endButton}
                          onClick={() =>
                            handleRemoveConference(singleMeetingDetails)
                          }
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </ListItem>
                <Divider />
              </React.Fragment>
            )}
          </List>
        </Container>
      )}
    </Container>
  );
};

export default UpcomingMeetings;
