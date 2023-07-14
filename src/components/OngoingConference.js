import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { Mic, Call, Search, CallEnd, MicOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import ConferenceSidenav from "./ConferenceSidenav";
import { useNavigate } from "react-router-dom";
import API from "../api/API";
// const Login = require("../api/Login");

const useStyles = makeStyles((theme) => ({
  root: {
    gap: theme.spacing(2),
    display: "flex",
    width: "100%",
  },
  container: {
    width: "84vw",
  },
  title: {
    fontWeight: "bold",
    fontFamily: "Poppins, sans-serif",
    textAlign: "left",
    marginBottom: 10,
    marginTop: 40,
  },
  subtitle: {
    fontFamily: "Poppins, sans-serif",
    textAlign: "left",
    marginBottom: 30,
  },
  section: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  searchInput: {
    background: "white",
    borderRadius: 20,
    width: "50%",
    padding: "1vh 0.8vw",
  },
  tableContainer: {
    marginTop: 8,
    width: "100%",
  },

  tableHeaderCell: {
    backgroundColor: "#0161b0",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Poppins, sans-serif",
  },

  tableCell: {
    fontFamily: "Poppins, sans-serif",
  },
  tableRow: {
    "&:nth-child(even)": {
      backgroundColor: "#D9D9D9",
    },
    "&:nth-child(odd)": {
      backgroundColor: "white",
    },
  },
  disconnectedCall: {
    color: "red",
  },
  mutedMic: {
    color: "gray",
  },
  message: {
    fontFamily: "Poppins, sans-serif",
    fontSize: "1.2vw",
    textAlign: "center",
  },
}));

const InviteParticipants = require("../api/InviteParticipants");
function clearAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
}

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

const OngoingConference = () => {
  const navigate = useNavigate();

  const userID = localStorage.getItem("userID");
  const classes = useStyles();
  const [meeting, setMeeting] = useState(
    JSON.parse(localStorage.getItem("meetingDetails"))
  );
  const [participants, setParticipants] = useState(
    JSON.parse(localStorage.getItem("meetingDetails")).attendees
  );
  console.log(participants);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    clearAllCookies();
    API.Login(meeting.conferenceKey.conferenceID, meeting.chair, "ConferenceID")
      .then((res) => {
        console.log("Join response: ", res);
        if (res.message === "success") {
          document.cookie = "cred=" + res.token;
          localStorage.setItem("ConferenceID", meeting.conferenceID);
          localStorage.setItem("Password", meeting.chair);
          console.log(document.cookie);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCheckedUser = (participantId) => {
    setParticipants((prevParticipants) => {
      const updatedParticipants = prevParticipants.map((participant) => {
        if (participant.id === participantId) {
          return {
            ...participant,
            selected: !participant.selected,
          };
        }
        return participant;
      });
      return updatedParticipants;
    });
  };

  const handleMute = (participantId) => {
    setParticipants((prevParticipants) => {
      const updatedParticipants = prevParticipants.map((participant) => {
        if (participant.id === participantId) {
          return {
            ...participant,
            muted: !participant.muted,
          };
        }
        return participant;
      });
      return updatedParticipants;
    });
  };

  const handleCall = (participant) => {
    const credCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("cred="));

    if (credCookie) {
      var credValue = credCookie.substring(5);
      // Output: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiIxMjMxNzk1MjQwIiwiZXhwaXJ5IjoxNjg5NDUwOTQxLjU2MzIyN30.RhWViXoOUMiRe_w7HRXesNTahYZkFkBK9ThUFklykXI
    }
    console.log("Participant: ", participant);

    const invitePara = [
      {
        name: participant.attendeeName,
        phone: participant.addressEntry.address,
      },
    ];
    console.log("Cred:", credValue);
    console.log("Conference ID: ", meeting.conferenceKey.conferenceID);
    InviteParticipants(
      credValue,
      meeting.conferenceKey.conferenceID,
      invitePara
    )
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
        alert("Could not call attendee. Please try again later.");
      });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter participants based on search query
  const filteredParticipants = participants.filter((participant) =>
    participant.attendeeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={classes.root}>
      <ConferenceSidenav
        participants={participants}
        setParticipants={setParticipants}
      />
      <Container className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          {meeting.scheduserName}'s Conference
        </Typography>
        <Typography variant="subtitle2" className={classes.subtitle}>
          {/* {participants.filter((participant) => participant.connected).length} */}
          0/{participants.length} on call
        </Typography>
        <div className={classes.section}>
          <TextField
            placeholder="Search..."
            className={`${classes.searchInput}`}
            InputProps={{
              startAdornment: <Search />,
              disableUnderline: true,
              style: {
                fontFamily: "Poppins, sans-serif",
                fontSize: "1vw",
              },
            }}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Select
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Number
                </TableCell>
                <TableCell className={classes.tableHeaderCell}></TableCell>
                <TableCell className={classes.tableHeaderCell}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {filteredParticipants.length > 0 ? (
                filteredParticipants.map((participant) => (
                  <TableRow key={participant.id} className={classes.tableRow}>
                    <TableCell className={classes.tableCell}>
                      <Checkbox
                        checked={participant.selected}
                        onChange={() => handleCheckedUser(participant.id)}
                      />
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {participant.attendeeName}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {participant.addressEntry.address}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <IconButton
                        onClick={() => handleCall(participant)}
                        // disabled={
                        //   !participant.connected && participant.selected
                        // }
                      >
                        <Call />
                        {/* {participant.connected ? (
                          <CallEnd
                            className={
                              participant.connected
                                ? classes.disconnectedCall
                                : ""
                            }
                          />
                        ) : (
                          <Call />
                        )} */}
                      </IconButton>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <IconButton
                        onClick={() => handleMute(participant.id)}
                        // disabled={
                        //   !participant.connected && participant.selected
                        // }
                      >
                        {participant.muted ? (
                          <MicOff
                            className={
                              participant.muted ? classes.mutedMic : ""
                            }
                          />
                        ) : (
                          <Mic />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className={classes.message} colSpan={5}>
                    No participants yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default OngoingConference;
