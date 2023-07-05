import { Button, Divider, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import ContactsIcon from "@mui/icons-material/Contacts";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
// import { userDetailsContextThree } from "../pages/Home";

import logo from "../images/bsnl-logo.jpeg";
const Logout = require("../api/Logout.js");

const useStyles = makeStyles(() => ({
  sidenavContainer: {
    width: "16vw",
    height: "150vh",
    backgroundColor: "#0161b0",
    borderRadius: "0 20px 20px 0",
    display: "flex",
    flexDirection: "column",
    gap: "2vh",
    padding: "10vh 1vw",
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
    backgroundColor: "#D9D9D9",
  },
  welcomeSection: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2vh",
    marginTop: 0,
    justifyContent: "center",
  },
  welcomeText: {
    color: "white",
    fontFamily: "Poppins, sans-serif",
    fontSize: "1.1vw",
    marginLeft: "1.2vw",
  },
  logo: {
    width: "5vw",
    height: "auto",
  },
}));

export default function Sidenav(props) {
  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const [activeButton, setActiveButton] = useState(
    getActiveButtonFromPath(location.pathname)
  );

  function getActiveButtonFromPath(pathname) {
    const pathSegments = pathname.split("/");

    if (pathSegments.length === 2) {
      return "dashboard";
    } else if (pathSegments[2] === "createConference") {
      return "createConference";
    } else if (pathSegments[2] === "contacts") {
      return "contacts";
    } else if (pathSegments[2] === "conferenceTemplates") {
      return "conferenceTemplates";
    } else if (pathSegments[2] === "settings") {
      return "settings";
    } else {
      return "";
    }
  }

  const handleClick = (button) => {
    setActiveButton(button);
    if (button === "dashboard") {
      navigate("/home");
    } else {
      navigate(`/home/${button}`);
    }
  };

  const handleLogout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    // window.location.reload();
    console.log(document.cookie);
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
    const token = getCookie("user");
    // console.log(cookieValue);
    console.log(Logout(token));
    function clearAllCookies() {
      var cookies = document.cookie.split(":");

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie =
          name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      }
    }
    clearAllCookies();
    navigate("/");
  };

  return (
    <div className={classes.sidenavContainer}>
      <div className={classes.welcomeSection}>
        <img src={logo} alt="Logo" className={classes.logo} />
        <span className={classes.welcomeText}>
          Welcome, <br />
          {userID}!
        </span>
      </div>
      <Divider className={classes.line} />
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
        onClick={() => handleLogout()}
      >
        <LogoutIcon className={classes.icon} />
        Log Out
      </Button>
    </div>
  );
}
