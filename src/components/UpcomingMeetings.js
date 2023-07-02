import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  Divider,
  Container,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import meetings from "../data/meetingsList.json";
import InstantConference from "../pages/InstantConference";
import { Routes, Route, useNavigate } from "react-router-dom";

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
  },
  heading: {
    fontFamily: "Poppins, sans-serif",
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold",
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
    marginBottom: 5,
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
  buttonContainer: {
    marginLeft: "auto", // Align buttons to the right
    display: "flex",
    flexDirection: "column",
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
}));

const UpcomingMeetings = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleJoinConference = (meeting) => {
    console.log("Joining meeting: ", meeting);
    const url = `/home/instantConference?creator=${meeting.creator}`;
    window.open(url, "_blank");
  };

  const handleEndConference = (meeting) => {
    console.log("Ending meeting: ", meeting);
  };

  const renderMeetingDetails = (meeting) => {
    const { startTime, endTime, creator, active } = meeting;

    if (active) {
      return (
        <React.Fragment>
          <Typography variant="body2" className={classes.listItemSecondaryText}>
            Start Time: {new Date(startTime).toLocaleString()}
          </Typography>
          <Typography variant="body2" className={classes.listItemSecondaryText}>
            End Time: {new Date(endTime).toLocaleString()}
          </Typography>
          <Typography variant="body2" className={classes.listItemSecondaryText}>
            Creator: {meeting.creator}
          </Typography>
          <Typography variant="body2" className={classes.listItemSecondaryText}>
            Access Number: {meeting.accessNumber}
          </Typography>
          <Typography variant="body2" className={classes.listItemSecondaryText}>
            Conference ID: {meeting.conferenceId}
          </Typography>
          <Typography variant="body2" className={classes.listItemSecondaryText}>
            Chairperson Password: {meeting.chairpersonPassword}
          </Typography>
          <Typography variant="body2" className={classes.listItemSecondaryText}>
            Guest Password: {meeting.guestPassword}
          </Typography>
          <Typography variant="body2" className={classes.listItemSecondaryText}>
            Participants: {meeting.numParticipants}
          </Typography>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Typography variant="body2" className={classes.listItemSecondaryText}>
            Start Time: {new Date(startTime).toLocaleString()}
          </Typography>
          <Typography variant="body2" className={classes.listItemSecondaryText}>
            End Time: {new Date(endTime).toLocaleString()}
          </Typography>
          <Typography variant="body2" className={classes.listItemSecondaryText}>
            Creator: {creator}
          </Typography>
        </React.Fragment>
      );
    }
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
        <List style={{ maxHeight: "300px", overflow: "auto" }}>
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
                <div>
                  <Typography variant="body1" className={classes.listItemText}>
                    {meeting.title}
                  </Typography>
                  {renderMeetingDetails(meeting)}
                </div>
                {meeting.active && (
                  <div className={classes.buttonContainer}>
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
                      End Now
                    </Button>
                  </div>
                )}
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Container>
    </Container>
  );
};

export default UpcomingMeetings;
