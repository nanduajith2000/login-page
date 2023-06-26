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
    width: "100%",
  },
  title: {
    backgroundColor: "#D9D9D9",
    textAlign: "auto",
    borderRadius: 10,
    padding: "10px 20px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
  },
  headerRow: {
    backgroundColor: "#0161b0",
    color: "white",
    borderRadius: 20,
    "& .MuiTableCell-head": {
      color: "white", // Override text color
    },
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
            <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
              Creator
            </TableCell>
            <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
              Subject
            </TableCell>
            <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
              Conference ID
            </TableCell>
            <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
              No of Participants
            </TableCell>
            <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
              Start Time
            </TableCell>
            <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
              Duration
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {conferences.map((conference, index) => (
            <TableRow
              key={conference.id}
              className={index % 2 === 0 ? classes.evenRow : classes.oddRow}
            >
              <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
                {conference.creator}
              </TableCell>
              <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
                {conference.subject}
              </TableCell>
              <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
                {conference.conferenceId}
              </TableCell>
              <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
                {conference.participants}
              </TableCell>
              <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
                {conference.startTime}
              </TableCell>
              <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
                {conference.duration}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default PreviousConferences;
