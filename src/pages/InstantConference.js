import React, { useState } from "react";
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
import ConferenceSidenav from "../components/ConferenceSidenav";

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

const InstantConference = (props) => {
  const userID = localStorage.getItem("userID");
  const classes = useStyles();
  const [participants, setParticipants] = useState(props.participantsData);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleCall = (participantId) => {
    setParticipants((prevParticipants) => {
      const updatedParticipants = prevParticipants.map((participant) => {
        if (participant.id === participantId) {
          return {
            ...participant,
            connected: !participant.connected,
          };
        }
        return participant;
      });
      return updatedParticipants;
    });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter participants based on search query
  const filteredParticipants = participants.filter((participant) =>
    participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={classes.root}>
      <ConferenceSidenav
        participants={participants}
        setParticipants={setParticipants}
      />
      <Container className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          {userID}'s Conference
        </Typography>
        <Typography variant="subtitle2" className={classes.subtitle}>
          {participants.filter((participant) => participant.connected).length}/
          {participants.length} on call
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
                      {participant.number}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <IconButton
                        onClick={() => handleCall(participant.id)}
                        disabled={
                          !participant.connected && participant.selected
                        }
                      >
                        {participant.connected ? (
                          <CallEnd
                            className={
                              participant.connected
                                ? classes.disconnectedCall
                                : ""
                            }
                          />
                        ) : (
                          <Call />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <IconButton
                        onClick={() => handleMute(participant.id)}
                        disabled={
                          !participant.connected && participant.selected
                        }
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
                    No participants found.
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

export default InstantConference;
