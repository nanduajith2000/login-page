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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { NavigateNext, NavigateBefore, InfoOutlined } from "@material-ui/icons";
import API from "../api/API";

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
  paginationContainer: {
    display: "flex",
    alignItems: "center",
  },
  pageIndex: {
    fontFamily: "Poppins, sans-serif",
    fontSize: "0.8rem",
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
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  dialog: {
    "& .MuiDialog-paperWidthSm": {
      width: "50%",
      textAlign: "center",
    },
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "Poppins, sans-serif",
    gap: "1em",
  },
  infobutton: {
    width: "0.8em",
  },
  infoContainer: {
    display: "flex",
    alignItems: "center",
    fontFamily: "Poppins, sans-serif",
  },
  infoHeader: {
    fontWeight: "bold",
    marginRight: "0.5em",
  },
  closeButton: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    color: "#0161b0",
    textTransform: "none",
  },
}));

const PreviousConferences = () => {
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

  const classes = useStyles();
  const [meetings, setMeetings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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

  const [totalPages, setTotalPages] = React.useState(1);

  // React.useEffect(() => {
  //   const token = getCookie("user");

  // },[]);
  const [pageIndex, setPageIndex] = React.useState(totalPages);
  const [pageNumber, setPageNumber] = React.useState(1);

  const handlePageChange = (newPageIndex, newPageNumber) => {
    setPageIndex(newPageIndex);
    setPageNumber(newPageNumber);
  };

  React.useEffect(() => {
    const token = getCookie("user");
    setLoading(true);
    API.queryConferencehistory(token, pageIndex)
      .then((res) => {
        console.log("Previous conferences: ", res);
        // if (res.message === "UNAUTHORIZED") {
        //   alert("Session expired. Please login again.");
        //   navigate("/");
        // } else {
        const meetingArray = Object.values(res)
          .filter((value) => typeof value === "object")
          .map((meeting) => meeting);
        setMeetings(meetingArray.reverse());
        // }
        setLoading(false);
      })
      .catch((err) => {
        alert("Could not fetch meeting history. Please try again later.");
        setLoading(false);
      });
  }, [pageIndex]);

  React.useEffect(() => {
    const token = getCookie("user");
    setLoading(true);
    API.queryConferencehistory(token, pageIndex)
      .then((res) => {
        console.log("Previous conferences: ", res);
        // if (res.message === "UNAUTHORIZED") {
        //   alert("Session expired. Please login again.");
        //   navigate("/");
        // } else {
        setPageIndex(res.total / 10 + 1);
        const meetingArray = Object.values(res)
          .filter((value) => typeof value === "object")
          .map((meeting) => meeting);
        setMeetings(meetingArray.reverse());
        // }
        setLoading(false);
      })
      .catch((err) => {
        alert("Could not fetch meeting history. Please try again later.");
        setLoading(false);
      });
  }, []);

  function convertMillisecondsToHoursAndMinutes(milliseconds) {
    var hours = Math.floor(milliseconds / (1000 * 60 * 60));
    var minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

    return { hours: hours, minutes: minutes };
  }
  const [openConferenceInfo, setOpenConferenceInfo] = React.useState(false);
  const [conferenceInfo, setConferenceInfo] = React.useState({});

  const handleConferenceInfo = (conference) => {
    const token = getCookie("user");
    API.ConferenceInfo(token, conference.conferenceKey.conferenceID, 0)
      .then((res) => {
        console.log(res);
        setConferenceInfo(res.conferenceResult.conferenceInfo);
        setOpenConferenceInfo(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Container className={classes.headerContainer}>
        <Typography variant="h6" className={classes.title}>
          Previous Conferences
        </Typography>
        <div className={classes.paginationContainer}>
          <IconButton
            className={classes.paginationButton}
            disabled={pageIndex === totalPages}
            onClick={() => handlePageChange(pageIndex + 1, pageNumber - 1)}
          >
            <NavigateBefore />
          </IconButton>
          <Typography className={classes.pageIndex}>{pageNumber}</Typography>
          <IconButton
            className={classes.paginationButton}
            disabled={pageIndex === 1}
            onClick={() => handlePageChange(pageIndex - 1, pageNumber + 1)}
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
              <TableCell style={{ fontFamily: "Poppins, sans-serif" }}>
                {""}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {loading ? ( // Render loading icon if loading is true
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              // Render meetings when loading is false
              meetings.map((conference, index) => (
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
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        handleConferenceInfo(conference);
                      }}
                    >
                      <InfoOutlined className={classes.infobutton} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Container>
      {/* Dialog for displaying conference details */}
      <Dialog
        className={classes.dialog}
        open={openConferenceInfo}
        onClose={() => setOpenConferenceInfo(false)}
      >
        <DialogTitle>Conference Details</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography className={classes.infoContainer}>
            <Typography className={classes.infoHeader}>Subject:</Typography>{" "}
            {conferenceInfo.subject}
          </Typography>
          <Typography className={classes.infoContainer}>
            <Typography className={classes.infoHeader}>Start Time:</Typography>{" "}
            {convertUTCMillisecondsToDate(conferenceInfo.startTime).day}-
            {convertUTCMillisecondsToDate(conferenceInfo.startTime).month}-
            {convertUTCMillisecondsToDate(conferenceInfo.startTime).year}{" "}
            {convertUTCMillisecondsToDate(conferenceInfo.startTime).hours}:
            {convertUTCMillisecondsToDate(conferenceInfo.startTime).minutes}
          </Typography>
          <Typography className={classes.infoContainer}>
            <Typography className={classes.infoHeader}>Duration:</Typography>{" "}
            {convertMillisecondsToHoursAndMinutes(conferenceInfo.length).hours}h{" "}
            {
              convertMillisecondsToHoursAndMinutes(conferenceInfo.length)
                .minutes
            }
            m
          </Typography>
          <Typography className={classes.infoContainer}>
            <Typography className={classes.infoHeader}>
              Conference ID:
            </Typography>{" "}
            {conferenceInfo.conferenceKey?.conferenceID}
          </Typography>
          <Typography className={classes.infoContainer}>
            <Typography className={classes.infoHeader}>
              Access Number:
            </Typography>{" "}
            {conferenceInfo.accessNumber}
          </Typography>
          <Typography className={classes.infoContainer}>
            <Typography className={classes.infoHeader}>
              Chairperson Password:
            </Typography>{" "}
            {conferenceInfo.passwords && conferenceInfo.passwords[0]?.password}
          </Typography>
          <Typography className={classes.infoContainer}>
            <Typography className={classes.infoHeader}>
              Guest Password:
            </Typography>{" "}
            {conferenceInfo.passwords && conferenceInfo.passwords[1]?.password}
          </Typography>
          <Typography className={classes.infoContainer}>
            <Typography className={classes.infoHeader}>Creator:</Typography>{" "}
            {conferenceInfo.scheduserName}
          </Typography>
          <Typography className={classes.infoContainer}>
            <Typography className={classes.infoHeader}>
              Meeting Size:
            </Typography>{" "}
            {conferenceInfo.size}
          </Typography>
          <Typography className={classes.infoContainer}>
            <Typography className={classes.infoHeader}>
              Participants:
            </Typography>{" "}
            {conferenceInfo.attendees
              ? conferenceInfo.attendees.map(
                  (attendee) => attendee.attendeeName + ", "
                )
              : "None"}
          </Typography>
          {/* Add more details as needed */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenConferenceInfo(false)}
            className={classes.closeButton}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PreviousConferences;
