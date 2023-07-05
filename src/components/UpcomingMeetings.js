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
import meetings from "../data/meetingsList.json";

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
  },
  heading: {
    fontFamily: "Poppins, sans-serif",
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold",
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
    top: 16,
    right: 16,
  },
  buttonContainerExpanded: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 64,
    right: 16,
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
  const classes = useStyles();
  const [expandedMeetings, setExpandedMeetings] = React.useState([]);

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

  const handleEndConference = (meeting) => {
    console.log("Ending meeting: ", meeting);
  };

  const renderMeetingDetails = (meeting) => {
    const {
      accessNumber,
      conferenceId,
      chairpersonPassword,
      guestPassword,
      numParticipants,
    } = meeting;

    return (
      <React.Fragment className={classes.secondaryText}>
        <Typography variant="body2" className={classes.listItemSecondaryText}>
          Access Number: {accessNumber}
        </Typography>
        <Typography variant="body2" className={classes.listItemSecondaryText}>
          Conference ID: {conferenceId}
        </Typography>
        <Typography variant="body2" className={classes.listItemSecondaryText}>
          Chairperson Password: {chairpersonPassword}
        </Typography>
        <Typography variant="body2" className={classes.listItemSecondaryText}>
          Guest Password: {guestPassword}
        </Typography>
        <Typography variant="body2" className={classes.listItemSecondaryText}>
          Participants: {numParticipants}
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
          {meetings.map((meeting) => (
            <React.Fragment key={meeting.id}>
              <ListItem className={classes.listItem}>
                <div className={classes.dateBox}>
                  <Typography variant="body2" className={classes.dateBoxDay}>
                    {new Date(meeting.startTime).toLocaleDateString("en-US", {
                      day: "numeric",
                    })}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.dateBoxMonthYear}
                  >
                    {new Date(meeting.startTime).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </Typography>
                </div>
                <div className={classes.meetingContent}>
                  <div className={classes.meetingHeader}>
                    <Typography
                      variant="body1"
                      className={classes.listItemText}
                    >
                      {meeting.title}
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
                    Start Time: {new Date(meeting.startTime).toLocaleString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.listItemSecondaryText}
                  >
                    End Time: {new Date(meeting.endTime).toLocaleString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.listItemSecondaryText}
                  >
                    Creator: {meeting.creator}
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
                      variant="contained"
                      className={classes.endButton}
                      onClick={() => handleEndConference(meeting)}
                    >
                      End
                    </Button>
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
