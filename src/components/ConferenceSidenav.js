import React, { useState } from "react";
import AddParticipants from "./AddParticipants";
import {
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@material-ui/core";
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
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isAddParticipantsOpen, setIsAddParticipantsOpen] = useState(false);
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
  const [participantsDetails, setParticipantsDetails] = useState([]);
  const [inviteState, setInviteState] = useState([]);

  let newArray = [];

  participants.map((participant) => {
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

  const handleAddParticipants = (participant) => {
    // Append participant data to participantsData.json or perform necessary operations
    const { attendeeName, addressEntry } = participant;
    const credValue = localStorage.getItem("cred");
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
    const token = localStorage.getItem("cred");
    API.OnlineConferenceInfo(token, meeting.conferenceKey.conferenceID, 0)
      .then((res) => {
        console.log(res);
        setInviteState(
          Array.isArray(
            res.spellQueryconference.conference.inviteStates.inviteState
          )
            ? res.spellQueryconference.conference.inviteStates.inviteState
            : [res.spellQueryconference.conference.inviteStates.inviteState]
        );
        const conferenceDetails = res.spellQueryconference.conference;
        let participantsDetails = conferenceDetails.participants
          ? conferenceDetails.participants.participant
          : [];

        if (!Array.isArray(participantsDetails)) {
          participantsDetails = participantsDetails
            ? [participantsDetails]
            : [];
        }

        setParticipantsDetails(participantsDetails);

        // Check for absent participants and invite them
        const absentParticipants = [];

        for (const invite of inviteState) {
          const inviteName = invite.name;
          const invitePhone = invite.phone;
          const participantFound = participantsDetails.some(
            (participant) => participant.name === inviteName
          );

          if (!participantFound) {
            absentParticipants.push({ name: inviteName, phone: invitePhone });
          }
        }
        console.log("Absent participants: ", absentParticipants);

        // Make an API call to invite absent participants
        absentParticipants.forEach((participant) => {
          const invitePara = [
            {
              name: participant.name,
              phone: participant.phone,
            },
          ];

          API.InviteParticipants(
            token,
            meeting.conferenceKey.conferenceID,
            invitePara
          )
            .then((res) => {
              console.log("Invite Participants Response: ", res);
              // Handle the success response
            })
            .catch((err) => {
              console.log(err);
              // Handle the error response
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    console.log(inviteState);
    console.log(participantsDetails);
  }, [inviteState, participantsDetails]);

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
    setShowConfirmDialog(true);
  };

  const handleEndAllConfirm = () => {
    setShowConfirmDialog(false);
    const token = localStorage.getItem("cred");
    API.EndConference(token, meeting.conferenceKey.conferenceID)
      .then((res) => {
        console.log("End conference response: ", res);
        window.close();
      })
      .catch((err) => {
        console.log("End conference error: ", err);
        alert("Error in ending the conference");
      });
  };

  const handleCancelLogout = () => {
    setShowConfirmDialog(false);
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
        End Call
      </Button>
      <Dialog
        className={classes.dialog}
        open={isAddParticipantsOpen}
        onClose={() => setIsAddParticipantsOpen(false)}
      >
        <DialogTitle>Add Participants</DialogTitle>
        <AddParticipants onAddParticipant={handleAddParticipants} />
      </Dialog>
      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onClose={handleCancelLogout}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to end the meeting?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.confirmButton}
            variant="contained"
            color="primary"
            onClick={handleEndAllConfirm}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            color="white"
            onClick={handleCancelLogout}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
