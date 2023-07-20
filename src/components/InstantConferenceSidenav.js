import React, { useState } from "react";
import AddParticipants from "./AddParticipants";
import { Button, makeStyles, Dialog, DialogTitle } from "@material-ui/core";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import GroupIcon from "@material-ui/icons/Group";
import CallIcon from "@material-ui/icons/Call";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import {
  SubdirectoryArrowRight,
  CallEnd as CallEndIcon,
} from "@mui/icons-material";
import API from "../api/API";

const useStyles = makeStyles(() => ({
  sidenavContainer: {
    width: "16vw",
    height: "100vh",
    backgroundColor: "#0161b0",
    borderRadius: "0 20px 20px 0",
    display: "flex",
    flexDirection: "column",
    gap: "2vh",
    padding: "20vh 1vw",
  },
  button: {
    color: "white",
    height: "7vh",
    justifyContent: "left",
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
    fontSize: "0.8vw",
    gap: "1vw",
    backgroundColor: "transparent",
    borderRadius: "10px 0 0 10px",
    marginLeft: "10px",
    marginRight: "-1vw",
  },
  icon: {
    marginRight: "0.8vw",
  },
  line: {
    backgroundColor: "white",
  },
}));

export default function Sidenav(props) {
  const [areAllParticipantsMuted, setAreAllParticipantsMuted] = useState(false);
  const [isAddParticipantsOpen, setIsAddParticipantsOpen] = useState(false);
  const [areAllParticipantsConnected, setAreAllParticipantsConnected] =
    useState(false);
  const classes = useStyles();
  const [meeting, setMeeting] = useState(
    JSON.parse(localStorage.getItem("meetingDetails"))
  );
  const attendees = JSON.parse(
    localStorage.getItem("meetingDetails")
  ).attendees;
  const defaultParticipants = attendees
    ? Array.isArray(attendees)
      ? attendees
      : [attendees]
    : [];

  const [participants, setParticipants] = useState(defaultParticipants);

  let newArray = [];

  participants?.map((participant) => {
    newArray.push({
      attendeeName: participant.attendeeName,
      conferenceRole: participant.conferenceRole,
      addressEntry: [
        {
          address: participant.addressEntry.address,
          type: participant.addressEntry.type,
        },
      ],
    });
  });

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

  const handleAddParticipants = (participant) => {
    // Append participant data to participantsData.json or perform necessary operations
    const { attendeeName, addressEntry } = participant;
    const credValue = localStorage.getItem("cred");
    const token = getCookie("user");
    const conferenceID = localStorage.getItem("ConferenceID");

    const invitePara = [
      {
        name: attendeeName,
        phone: addressEntry[0].address,
      },
    ];

    API.InviteParticipants(credValue, conferenceID, invitePara)
      .then((res) => {
        console.log("Invite Participants Response: ", res);
        // Handle the success response
      })
      .catch((err) => {
        console.log(err);
        // Handle the error response
      });
    setIsAddParticipantsOpen(false);
    window.location.reload();
  };

  const handleAddGroups = () => {
    // logic to add groups
  };

  const handleCallAbsent = () => {
    setIsAddParticipantsOpen(false);
    props.setParticipants((prevParticipants) => {
      const updatedParticipants = prevParticipants.map((participant) => ({
        ...participant,
        connected: true,
      }));
      return updatedParticipants;
    });
  };

  const handleUnmuteAll = () => {
    const token = localStorage.getItem("cred");
    API.MuteConference(token, meeting.conferenceKey.conferenceID, false)
      .then((res) => {
        console.log("Unmute all response: ", res);
      })
      .catch((err) => {
        console.log("Unmute all error: ", err);
        alert("Error in unmuting all participants");
      });
    setAreAllParticipantsMuted(false);
  };

  const handleMuteAll = () => {
    const token = localStorage.getItem("cred");
    API.MuteConference(token, meeting.conferenceKey.conferenceID, true)
      .then((res) => {
        console.log("Mute all response: ", res);
      })
      .catch((err) => {
        console.log("Mute all error: ", err);
        alert("Error in muting all participants");
      });

    setAreAllParticipantsMuted(true);
  };

  const handleCreateSubconference = () => {
    // logic to create subconference
  };

  const handleEndAll = () => {
    props.setParticipants((prevParticipants) => {
      const updatedParticipants = prevParticipants.map((participant) => ({
        ...participant,
        connected: false,
      }));
      return updatedParticipants;
    });
    setAreAllParticipantsConnected(false);
  };

  return (
    <div className={classes.sidenavContainer}>
      <Button
        variant="text"
        className={`${classes.button} `}
        onClick={() => setIsAddParticipantsOpen(true)}
      >
        <GroupAddIcon className={classes.icon} />
        Add Participants
      </Button>
      <Button
        variant="text"
        className={`${classes.button} `}
        onClick={handleAddGroups}
      >
        <GroupIcon className={classes.icon} />
        Add Groups
      </Button>
      <Button
        variant="text"
        className={`${classes.button} `}
        onClick={handleCallAbsent}
      >
        <CallIcon className={classes.icon} />
        Call Absent
      </Button>
      <Button
        variant="text"
        className={`${classes.button} `}
        onClick={areAllParticipantsMuted ? handleUnmuteAll : handleMuteAll}
      >
        {areAllParticipantsMuted ? (
          <MicIcon className={classes.icon} />
        ) : (
          <MicOffIcon className={classes.icon} />
        )}
        {areAllParticipantsMuted ? "Unmute All" : "Mute All"}
      </Button>
      <Button
        variant="text"
        className={`${classes.button} `}
        onClick={handleCreateSubconference}
      >
        <SubdirectoryArrowRight className={classes.icon} />
        Create Sub Conference
      </Button>
      <Button
        variant="text"
        className={`${classes.button} `}
        onClick={handleEndAll}
      >
        <CallEndIcon className={classes.icon} />
        End All
      </Button>
      <Dialog
        className={classes.dialog}
        open={isAddParticipantsOpen}
        onClose={() => setIsAddParticipantsOpen(false)}
      >
        <DialogTitle>Add Participants</DialogTitle>
        <AddParticipants onAddParticipant={handleAddParticipants} />
      </Dialog>
    </div>
  );
}
