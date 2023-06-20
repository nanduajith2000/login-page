import { Button, Divider, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import "./Sidenav.css";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import ContactsIcon from "@mui/icons-material/Contacts";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

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
  activeButton: {
    backgroundColor: "white",
    color: "black",
    boxShadow: "1px 1px 5px 1px rgba(0, 0, 0, 0.1)",
  },
  icon: {
    marginRight: "0.8vw",
  },
  line: {
    backgroundColor: "white",
  },
}));

export default function Sidenav() {
  const classes = useStyles();
  const [activeButton, setActiveButton] = useState("dashboard");

  const handleClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div className={classes.sidenavContainer}>
      <Button
        variant="text"
        className={`${classes.button} ${
          activeButton === "dashboard" && classes.activeButton
        }`}
        onClick={() => handleClick("dashboard")}
      >
        <HomeIcon className={classes.icon} />
        Dashboard
      </Button>
      <Button
        variant="text"
        className={`${classes.button} ${
          activeButton === "createConference" && classes.activeButton
        }`}
        onClick={() => handleClick("createConference")}
      >
        <PhoneIcon className={classes.icon} />
        Create Conference
      </Button>
      <Button
        variant="text"
        className={`${classes.button} ${
          activeButton === "contacts" && classes.activeButton
        }`}
        onClick={() => handleClick("contacts")}
      >
        <ContactsIcon className={classes.icon} />
        Contacts
      </Button>
      <Button
        variant="text"
        className={`${classes.button} ${
          activeButton === "conferenceTemplates" && classes.activeButton
        }`}
        onClick={() => handleClick("conferenceTemplates")}
      >
        <DescriptionIcon className={classes.icon} />
        Conference Templates
      </Button>
      <Divider className={classes.line} />
      <Button
        variant="text"
        className={`${classes.button} ${
          activeButton === "settings" && classes.activeButton
        }`}
        onClick={() => handleClick("settings")}
      >
        <SettingsIcon className={classes.icon} />
        Settings
      </Button>
      <Button
        variant="text"
        className={`${classes.button} ${
          activeButton === "logOut" && classes.activeButton
        }`}
        onClick={() => handleClick("logOut")}
      >
        <LogoutIcon className={classes.icon} />
        Log Out
      </Button>
    </div>
  );
}
