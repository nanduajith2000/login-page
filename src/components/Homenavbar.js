import React from "react";
import { ReactDOM } from "react";
import InstantConference from "./InstantConference";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  TextField,
} from "@material-ui/core";
import { ArrowBack, ArrowForward, Search } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

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
    margin: "0 auto",
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
  const classes = useStyles();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleForward = () => {
    navigate(1);
  };
  const handleStartConference = () => {
    window.open(`/home/instantConference`, "_blank");
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
          className={classes.startButton}
          onClick={handleStartConference}
        >
          Start Conference Now
        </Button>
        <TextField
          placeholder="Search..."
          className={`${classes.searchInput}`}
          InputProps={{
            startAdornment: <Search />,
            disableUnderline: true,
            style: {
              fontFamily: "Poppins,sans-serif",
              fontSize: "1vw", // Change the font here
            },
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Homenavbar;
