import React from "react";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
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
  const classes = useStyles();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const handleForward = () => {
    navigate(1);
  };

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.backButton}
          color="secondaryk"
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
        >
          Start Conference Now
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Homenavbar;
