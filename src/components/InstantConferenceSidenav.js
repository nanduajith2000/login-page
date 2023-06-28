import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import GroupIcon from "@material-ui/icons/Group";
import CallIcon from "@material-ui/icons/Call";
import MicOffIcon from "@material-ui/icons/MicOff";
import { SubdirectoryArrowRight } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

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

export default function Sidenav() {
  const navigate = useNavigate();
  const classes = useStyles();

  const handleAddGroups = () => {
    //logic to add groups
  };
  const handleAddParticipants = () => {
    //logic to add participants
  };
  const handleCallAbsent = () => {
    //logic to call absent
  };
  const handleMuteAll = () => {
    //logic to mute all
  };
  const handleCreateSubconference = () => {
    //logic to create subconference
  };

  return (
    <div className={classes.sidenavContainer}>
      <Button
        variant="text"
        className={`${classes.button} `}
        onClick={handleAddParticipants}
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
        onClick={handleMuteAll}
      >
        <MicOffIcon className={classes.icon} />
        Mute All
      </Button>
      <Button
        variant="text"
        className={`${classes.button} `}
        onClick={handleCreateSubconference}
      >
        <SubdirectoryArrowRight className={classes.icon} />
        Create Sub Conference
      </Button>
    </div>
  );
}
