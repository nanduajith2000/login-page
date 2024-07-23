import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  makeStyles,
  Link,
} from "@material-ui/core";
import logo from "../images/bsnl-logo.jpeg";
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
    marginRight: 16,
    width: 52,
  },
  link: {
    color: "black",
    textTransform: "capitalize",
    margin: "0 8px",
    fontFamily: "Poppins, sans-serif",
    fontSize: 18,
  },
});

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="relative" className="navbar">
      <Container>
        <Toolbar>
          <div className="title">
            <img src={logo} alt="" className={classes.logo} />
            <Typography className={classes.titleText}>
              MULTIMEDIA AUDIO
              <br /> CONFERENCING SERVICE
            </Typography>
          </div>
          <div className="buttonsWrapper">
            <Link href="." underline="none" className={classes.link}>
              Home
            </Link>
            <div className="separator" />
            <Link href="./download" underline="none" className={classes.link}>
              Download
            </Link>
            <div className="separator" />
            <Link href="./about" underline="none" className={classes.link}>
              About
            </Link>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
