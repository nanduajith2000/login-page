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
import RingingCallIcon from "./RingingCallIcon";
import { makeStyles } from "@material-ui/core/styles";
import InstantConferenceSidenav from "./InstantConferenceSidenav";
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

const OngoingConference = () => {
  const classes = useStyles();
  const [meeting, setMeeting] = useState(
    JSON.parse(localStorage.getItem("meetingDetails"))
  );

  const [participants, setParticipants] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [inviteState, setInviteState] = useState([]);

  const [participantsDetails, setParticipantsDetails] = useState([]);

  const [updatedParticipants, setUpdatedParticipants] = useState();

  function getParticipantID(participantName) {
    const participant = participantsDetails.find(
      (p) => p.name === participantName
    );
    return participant ? participant.subscribers.subscriber.callID : undefined;
  }

  useEffect(() => {
    API.Login(
      meeting.conferenceKey.conferenceID,
      meeting.passwords[1].password,
      "ConferenceID"
    )
      .then((res) => {
        API.OnlineConferenceInfo(
          res.token,
          meeting.conferenceKey.conferenceID,
          0
        )
          .then((res) => {
            // console.log("Conference info: ", res);
            setInviteState(
              Array.isArray(
                res.spellQueryconference.conference.inviteStates.inviteState
              )
                ? res.spellQueryconference.conference.inviteStates.inviteState
                : [res.spellQueryconference.conference.inviteStates.inviteState]
            );
            setUpdatedParticipants(
              Array.isArray(
                res.spellQueryconference.conference.inviteStates.inviteState
              )
                ? res.spellQueryconference.conference.inviteStates.inviteState
                : [res.spellQueryconference.conference.inviteStates.inviteState]
            );
          })
          .catch((err) => {
            console.log(err);
          });
        if (res.message === "success") {
          localStorage.setItem("cred", res.token);
          localStorage.setItem(
            "ConferenceID",
            meeting.conferenceKey.conferenceID
          );
          localStorage.setItem("Password", meeting.chair);

          // Start the loop function after successful login
          const loopFunction = setInterval(() => {
            API.OnlineConferenceInfo(
              res.token,
              meeting.conferenceKey.conferenceID,
              0
            )
              .then((confInfoRes) => {
                // Process the conference info response here
                // console.log("Conference Info: ", confInfoRes);

                // Extract inviteStates from conferenceResult
                const conferenceDetails =
                  confInfoRes.spellQueryconference.conference;
                let participantsDetails = conferenceDetails.participants
                  ? conferenceDetails.participants.participant
                  : [];

                // if (!Array.isArray(inviteState)) {
                //   inviteState = inviteState ? [inviteState] : [];
                // }

                if (!Array.isArray(participantsDetails)) {
                  participantsDetails = participantsDetails
                    ? [participantsDetails]
                    : [];
                }
                setParticipantsDetails(participantsDetails);
              })
              .catch((err) => {
                console.log(err);
                // Handle errors here
              });
          }, 5000);
          // 5 seconds interval

          // Clean up the loop function when the component unmounts
          return () => clearInterval(loopFunction);
        }
      })
      .catch((err) => {
        console.log(err);
        // Handle errors here
      });
  }, []);

  useEffect(() => {
    // Add the mapping operation here using updatedInviteState
    const updatedInviteStateArray = inviteState.map((invite) => {
      const participantID = getParticipantID(invite.name);

      return {
        ...invite,
        participantID: participantID,
      };
    });
    // console.log(updatedInviteStateArray);
    setUpdatedParticipants(updatedInviteStateArray);
    // Rest of your code
  }, [inviteState, getParticipantID]);

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
    const credValue = localStorage.getItem("cred");

    console.log("Participant: ", participant);

    const invitePara = [
      {
        name: participant.name,
        phone: participant.phone,
        role: "general",
        isMute: false,
      },
    ];

    // console.log("Cred:", credValue);
    API.InviteParticipants(
      credValue,
      meeting.conferenceKey.conferenceID,
      invitePara
    )
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Could not call attendee. Please try again later.");
      });
  };

  const handleDisconnect = (participant) => {
    const credValue = localStorage.getItem("cred");
    console.log("PARTICIPANT ID: ", participant.participantID);

    API.LeaveParticipant(
      credValue,
      meeting.conferenceKey.conferenceID,
      participant.participantID
    )
      .then((res) => {
        console.log("Disconnecting call... ", res);
      })
      .catch((err) => {
        console.log(err);
        alert("Could not disconnect call. Please try again later.");
      });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredParticipants = updatedParticipants
    ? updatedParticipants.filter(
        (participant) =>
          participant.name &&
          participant.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className={classes.root}>
      <InstantConferenceSidenav
        participants={participants}
        setParticipants={setParticipants}
      />
      <Container className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          {meeting.scheduserName}'s Conference
        </Typography>
        <Typography variant="subtitle2" className={classes.subtitle}>
          {participantsDetails ? participantsDetails.length : 0}/
          {inviteState ? inviteState.length : 0} on call
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
                      {participant.name}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {participant.phone}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <IconButton
                        onClick={() =>
                          participant.participantID === undefined
                            ? handleCall(participant)
                            : handleDisconnect(participant)
                        }
                        // disabled={
                        //   !participant.connected && participant.selected
                        // }
                      >
                        {(() => {
                          if (
                            participant.participantID !== undefined &&
                            participant.state !== "100"
                          ) {
                            return <CallEnd />;
                          } else if (
                            participant.participantID === undefined &&
                            participant.state !== "100"
                          ) {
                            return <Call />;
                          } else if (participant.state === "100") {
                            return <RingingCallIcon />;
                          }
                        })()}
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
