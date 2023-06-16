import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
} from "@material-ui/core";
import "./Navbar.css";

const Navbar = () => {
  return (
    <AppBar position="static" className="navbar">
      <Container>
        <Toolbar>
          <div className="title">
            <img src="" alt="Logo" className="logo" />
            <Typography sx={{ fontSize: 24 }} className="titleText">
              MULTIMEDIA VIDEO
              <br /> CONFERENCING SERVICE
            </Typography>
          </div>
          <div className="buttonsWrapper">
            <Button sx={{ fontSize: 24 }} color="inherit" className="button">
              Home
            </Button>
            <div className="separator" />
            <Button sx={{ fontSize: 24 }} color="inherit" className="button">
              Download
            </Button>
            <div className="separator" />
            <Button sx={{ fontSize: 24 }} color="inherit" className="button">
              About
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
