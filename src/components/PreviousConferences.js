import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Container,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 20,
  },
  title: {
    backgroundColor: "#D9D9D9",
    textAlign: "auto",
    borderRadius: 10,
    padding: "10px 20px",
    fontFamily: "Poppins,sans-serif",
  },
  headerRow: {
    backgroundColor: "#0161b0",
    color: "white",
    borderRadius: 20,
  },
  tableBody: {
    overflowY: "auto",
    maxHeight: "40vh",
    borderRadius: 20,
  },
  evenRow: {
    backgroundColor: "#D9D9D9",
  },
  oddRow: {
    backgroundColor: "white",
  },
}));

const PreviousConferences = () => {
  const classes = useStyles();

  // Hardcoded conference data (replace with actual JSON data)
  const conferences = [
    {
      id: 1,
      creator: "John Doe",
      subject: "Conference 1",
      conferenceId: "ABC123",
      participants: 50,
      startTime: "2023-06-20T09:00:00Z",
      duration: "1 hour",
    },
    {
      id: 2,
      creator: "Jane Smith",
      subject: "Conference 2",
      conferenceId: "DEF456",
      participants: 80,
      startTime: "2023-06-21T14:30:00Z",
      duration: "1.5 hours",
    },
    // Add more conference objects as needed
  ];

  return (
    <Container className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Previous Conferences
      </Typography>
      <Table>
        <TableHead>
          <TableRow className={classes.headerRow}>
            <TableCell>Creator</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Conference ID</TableCell>
            <TableCell>No of Participants</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {conferences.map((conference, index) => (
            <TableRow
              key={conference.id}
              className={index % 2 === 0 ? classes.evenRow : classes.oddRow}
            >
              <TableCell>{conference.creator}</TableCell>
              <TableCell>{conference.subject}</TableCell>
              <TableCell>{conference.conferenceId}</TableCell>
              <TableCell>{conference.participants}</TableCell>
              <TableCell>{conference.startTime}</TableCell>
              <TableCell>{conference.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default PreviousConferences;
