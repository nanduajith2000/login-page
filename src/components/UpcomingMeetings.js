import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    height: 370,
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    margin: "2vh 2vw",

    // maxWidth: "50vw",
  },
  heading: {
    fontFamily: "Poppins,sans-serif",
  },
  listItem: {
    backgroundColor: "#0161b0",
    color: "white",
    borderRadius: 10,
    margin: "0.1vh auto",
    fontFamily: "Poppins,sans-serif",
  },
  listItemText: {
    fontFamily: "Poppins,sans-serif",
  },
}));

const UpcomingMeetings = () => {
  const classes = useStyles();
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: "Meeting 1",
      startTime: "2023-06-22T10:00:00Z",
      endTime: "2023-06-22T11:30:00Z",
    },
    {
      id: 2,
      title: "Meeting 2",
      startTime: "2023-06-23T14:00:00Z",
      endTime: "2023-06-23T15:30:00Z",
    },
  ]);

  // useEffect(() => {
  //   const fetchMeetings = async () => {
  //     try {
  //       const response = await fetch("./meetings.json");
  //       console.log(response);
  //       if (response.ok) {
  //         const data = await response.json();
  //         setMeetings(data);
  //       } else {
  //         console.error("Error fetching meetings: " + response);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching meetings: " + error);
  //     }
  //   };

  //   fetchMeetings(); // Call fetchMeetings here
  // }, []);
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
                <ListItemText
                  primary={meeting.title}
                  secondary={`Start Time: ${new Date(
                    meeting.startTime
                  ).toLocaleString()}`}
                  className={classes.listItemText}
                />
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
