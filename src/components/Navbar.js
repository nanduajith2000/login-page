import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";
import AlarmIcon from "@material-ui/icons/Alarm";
import "./Navbar.css";

const useStyles = makeStyles({
  button: {
    textTransform: "capitalize",
    margin: "0 8px",
    fontFamily: "Poppins, sans-serif",
    fontSize: 18,
  },
  titleText: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 22,
    color: "#0161b0",
  },
  logo: {
    backgroundImage: "url('../images/logo.jpg')",
    marginRight: 16,
    width: 24,
  },
});

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="relative" className="navbar">
      <Container>
        <Toolbar>
          <div className="title">
            <AlarmIcon className={classes.logo} />
            <Typography className={classes.titleText}>
              MULTIMEDIA VIDEO
              <br /> CONFERENCING SERVICE
            </Typography>
          </div>
          <div className="buttonsWrapper">
            <Button className={classes.button}>Home</Button>
            <div className="separator" />
            <Button className={classes.button}>Download</Button>
            <div className="separator" />
            <Button
              sx={{ fontSize: 24, color: "black" }}
              className={classes.button}
            >
              About
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
