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
  IconButton,
} from "@material-ui/core";
import { NavigateNext, NavigateBefore } from "@material-ui/icons";
import API from "../api/API"

// const queryConferencehistory = require("../api/QueryConferenceHistory");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflow: "auto", // Enable overflow scrolling
    maxHeight: "70vh", // Set a specific height for the table container
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
  },
  title: {
    textAlign: "auto",
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

  const classes = useStyles();
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

  const [totalPages, setTotalPages] = React.useState(23);

  // React.useEffect(() => {
  //   const token = getCookie("user");

  // },[]);
  const [pageIndex, setPageIndex] = React.useState(totalPages);

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  React.useEffect(() => {
    const token = getCookie("user");
    API.queryConferencehistory(token, pageIndex)
      .then((res) => {
        const meetingArray = Object.values(res)
          .filter((value) => typeof value === "object")
          .map((meeting) => meeting);
        setMeetings(meetingArray.reverse());
        setTotalPages(res.totalPages);
      })
      .catch((err) => {
        alert("Could not fetch meeting history. Please try again later.");
      });
  }, [pageIndex]);

  function convertMillisecondsToHoursAndMinutes(milliseconds) {
    var hours = Math.floor(milliseconds / (1000 * 60 * 60));
    var minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

    return { hours: hours, minutes: minutes };
  }

  return (
    <Container>
      <Container className={classes.headerContainer}>
        <Typography variant="h6" className={classes.title}>
          Previous Conferences
        </Typography>
        <div className={classes.paginationContainer}>
          <IconButton
            className={classes.paginationButton}
            disabled={pageIndex === 1}
            onClick={() => handlePageChange(pageIndex + 1)}
          >
            <NavigateBefore />
          </IconButton>
          <IconButton
            className={classes.paginationButton}
            disabled={pageIndex === totalPages}
            onClick={() => handlePageChange(pageIndex - 1)}
          >
            <NavigateNext />
          </IconButton>
        </div>
      </Container>
      <Container disableGutters className={classes.root}>
        <Table className={classes.tableContainer}>
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
                Start time
              </TableCell>
              <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
                Duration
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {meetings.map((conference, index) => (
              <TableRow
                key={conference.id}
                className={index % 2 === 0 ? classes.evenRow : classes.oddRow}
              >
                <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
                  {conference.scheduserName}
                </TableCell>
                <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
                  {conference.subject}
                </TableCell>
                <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
                  {conference.conferenceKey.conferenceID}
                </TableCell>
                <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
                  {conference.size}
                </TableCell>
                <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
                  {convertUTCMillisecondsToDate(conference.startTime).day}-
                  {convertUTCMillisecondsToDate(conference.startTime).month}-
                  {convertUTCMillisecondsToDate(conference.startTime).year}{" "}
                  {convertUTCMillisecondsToDate(conference.startTime).hours}:
                  {convertUTCMillisecondsToDate(conference.startTime).minutes}
                </TableCell>
                <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
                  {convertMillisecondsToHoursAndMinutes(conference.length)
                    .hours +
                    "h " +
                    convertMillisecondsToHoursAndMinutes(conference.length)
                      .minutes +
                    "m"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Container>
  );
};

export default PreviousConferences;
