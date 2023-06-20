import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  TextField,
  makeStyles,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  forwardButton: {
    marginRight: theme.spacing(2),
  },
  startButton: {
    marginRight: theme.spacing(2),
  },
  searchInput: {
    marginRight: theme.spacing(2),
  },
}));

const Homenavbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            className={classes.backButton}
            onClick={() => {
              // Handle back button click
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <IconButton
            edge="start"
            color="inherit"
            className={classes.forwardButton}
            onClick={() => {
              // Handle forward button click
            }}
          >
            <ArrowForwardIcon />
          </IconButton>

          <Button
            variant="contained"
            color="primary"
            className={classes.startButton}
            onClick={() => {
              // Handle Start Conference Now button click
            }}
          >
            Start Conference Now
          </Button>

          <TextField
            variant="outlined"
            placeholder="Search"
            className={classes.searchInput}
            // Handle search input change or submit
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Homenavbar;
