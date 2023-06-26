import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  TextField,
} from "@material-ui/core";
import { ArrowBack, ArrowForward, Search } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

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

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.backButton}
          color="secondaryk"
          aria-label="back"
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          edge="start"
          className={classes.forwardButton}
          color="secondary"
          aria-label="forward"
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
