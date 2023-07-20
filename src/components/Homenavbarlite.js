import React from "react";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import API from "../api/API";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "transparent",
    width: "80vw",
    margin: "0 auto",
    boxShadow: "none",
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  forwardButton: {
    marginRight: theme.spacing(2),
  },
  startButton: {
    backgroundColor: "#0161b0",
    marginRight: theme.spacing(2),
    borderRadius: 20,
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
    fontSize: "1vw",
    margin: "0 40px",
    padding: "2vh 2vw",
  },
  searchInput: {
    flexGrow: 1,
    background: "white",
    borderRadius: 20,
    border: "white",
    padding: "1vh 1vw",
  },
}));

const Homenavbar = () => {
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
  const classes = useStyles();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const handleForward = () => {
    navigate(1);
  };

  const handleStartConference = () => {
    API.createconference(
      token,
      3600000,
      3,
      48,
      "en_US",
      "Instant Conference",
      false,
      0
    )
      .then((res) => {
        console.log("Creating instant conference: ", res);
        API.ConferenceInfo(
          token,
          res.scheduleConferenceResult.conferenceInfo.conferenceKey
            .conferenceID,
          "0"
        )
          .then((res) => {
            console.log("Conference info: ", res);
            localStorage.setItem(
              "meetingDetails",
              JSON.stringify(res.conferenceResult.conferenceInfo)
            );
            window.open(`/home/instantConference`);
          })
          .catch((err) => {
            console.log("Couldnt fetch conference info: ", err);
          });
      })
      .catch((err) => {
        console.log(err);
        alert("Error creating conference");
      });
  };

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.backButton}
          color="secondary"
          aria-label="back"
          onClick={handleBack}
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          edge="start"
          className={classes.forwardButton}
          color="secondary"
          aria-label="forward"
          onClick={handleForward}
        >
          <ArrowForward />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartConference}
          className={classes.startButton}
        >
          Start Conference Now
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Homenavbar;
