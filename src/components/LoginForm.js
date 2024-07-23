import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { userDetailsContextTwo } from "../pages/LoginPage.js";
import {
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Grid,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import API from "../api/API.js";
// const Login = require("../api/Login.js");

// const ConferenceInfo = require("../api/ConferenceInfo.js");

const useStyles = makeStyles((theme) => ({
  container: {
    fontFamily: "Poppins, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "10vh",
    paddingRight: "10vh",
  },
  button: {
    textTransform: "capitalize",
    fontFamily: "Poppins, sans-serif",
  },
  textField: {
    fontFamily: "Poppins, sans-serif",
  },
  errorMessage: {
    color: "red",
    backgroundColor: "#ffebee", // Light red background color,
    borderRadius:"15%",
    padding: "10px",
    textAlign: "center",
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [showConferenceForm, setShowConferenceForm] = useState(false);
  const [conferencePassword, setConferencePassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(""); // New state to track login status

  const webAccount = useContext(userDetailsContextTwo).webAccount;
  const setWebAccount = useContext(userDetailsContextTwo).setWebAccount;
  const password = useContext(userDetailsContextTwo).password;
  const setPassword = useContext(userDetailsContextTwo).setPassword;
  const conferenceId = useContext(userDetailsContextTwo).conferenceId;
  const setConferenceId = useContext(userDetailsContextTwo).setConferenceId;

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

  const handleJoinConference = () => {
    setShowConferenceForm(true);
  };

  const handleBackToLogin = () => {
    setShowConferenceForm(false);
  };

  const handleLogin = () => {
    // Do something with the submitted login information

    API.Login(webAccount, password, "WEB")
      .then((res) => {
        console.log("Login response: ", res);

        if (res.message === "success") {
          // console.log(res.token);
          document.cookie = "user=" + res.token + ": userID=" + res.userID;
          localStorage.setItem("userID", webAccount);
          console.log("Web account: ", localStorage.getItem("userID"));
          localStorage.setItem("userPassword", password);
          console.log(document.cookie);
          navigate("/home");
        } else {
          setLoginStatus("Invalid Credentials");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginStatus("Something went wrong. Please try again.");
      });
  };

  const handleJoin = () => {
    // Do something with the submitted conference information
    console.log("Conference ID:", conferenceId);
    console.log("Conference Password:", conferencePassword);

    API.Login(conferenceId, conferencePassword, "ConferenceID")
      .then((res) => {
        console.log("Join response: ", res);

        if (res.message === "success") {
          localStorage.setItem("cred", res.token);
          console.log(document.cookie);
          var token = localStorage.getItem("cred");
          API.ConferenceInfo(token, conferenceId, "0")
            .then((res) => {
              if (
                res.conferenceResult.conferenceInfo.conferenceState ===
                "Destroyed"
              ) {
                alert(
                  "Conference has already ended. Please check your credentials and try again."
                );
              } else if (
                res.conferenceResult.conferenceInfo.conferenceState ===
                "Schedule"
              ) {
                alert(
                  "Conference has not started yet. Please check your credentials and try again."
                );
              } else if (
                res.conferenceResult.conferenceInfo.conferenceState ===
                "Created"
              ) {
                localStorage.setItem(
                  "meetingDetails",
                  JSON.stringify(res.conferenceResult.conferenceInfo)
                );
                console.log(
                  "Joining the meeting: ",
                  JSON.parse(localStorage.getItem("meetingDetails"))
                );
                window.open("/home/startConference");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else alert("Invalid Credentials");
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong. Please try again.");
      });
  };

  const handleTextFieldKeyPress = (event) => {
    if (event.key === "Enter") {
      if (!showConferenceForm) {
        handleLogin();
      } else {
        handleJoin();
      }
    }
  };

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Display the loginStatus in red if it is set */}
          {loginStatus && (
            <Typography variant="body2" align="center" className={classes.errorMessage} style={{ color: "red" }}>
              {loginStatus}
            </Typography>
          )}
          <Typography variant="h5" align="center" className={classes.textField}>
            Login
          </Typography>
        </Grid>
        {!showConferenceForm ? (
          <>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Web Account"
                fullWidth
                value={webAccount}
                className={classes.textField}
                onChange={(e) => setWebAccount(e.target.value)}
                InputProps={{
                  style: {
                    fontFamily: "Poppins, sans-serif",
                  },
                }}
                InputLabelProps={{
                  component: Typography,
                  style: {
                    fontFamily: "Poppins, sans-serif",
                  },
                }}
                onKeyDown={handleTextFieldKeyPress}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                className={classes.textField}
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  style: {
                    fontFamily: "Poppins, sans-serif",
                  },
                }}
                InputLabelProps={{
                  component: Typography,
                  style: {
                    fontFamily: "Poppins, sans-serif",
                  },
                }}
                onKeyDown={handleTextFieldKeyPress}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
                className={classes.button}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                align="center"
                className={classes.textField}
              >
                <Link href="#" className={classes.text}>
                  Forgot Password?
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                align="center"
                className={classes.textField}
              >
                Use a conference ID to join a conference
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleJoinConference}
                className={classes.button}
              >
                Join Using Conference ID
              </Button>
            </Grid>
          </>
        ) : (
          <>
          <Grid item xs={12}>
              {/* Display the loginStatus in red if it is set */}
              {loginStatus && (
                <Typography variant="body2" align="center" className={classes.errorMessage} style={{ color: "red" }}>
                  {loginStatus}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Conference ID"
                className={classes.textField}
                fullWidth
                value={conferenceId}
                onChange={(e) => setConferenceId(e.target.value)}
                InputProps={{
                  style: {
                    fontFamily: "Poppins, sans-serif",
                  },
                }}
                InputLabelProps={{
                  component: Typography,
                  style: {
                    fontFamily: "Poppins, sans-serif",
                  },
                }}
                onKeyDown={handleTextFieldKeyPress}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                className={classes.textField}
                label="Password"
                type="password"
                fullWidth
                value={conferencePassword}
                onChange={(e) => setConferencePassword(e.target.value)}
                InputProps={{
                  style: {
                    fontFamily: "Poppins, sans-serif",
                  },
                }}
                InputLabelProps={{
                  component: Typography,
                  style: {
                    fontFamily: "Poppins, sans-serif",
                  },
                }}
                onKeyDown={handleTextFieldKeyPress}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleJoin}
                className={classes.button}
              >
                Join
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleBackToLogin}
                className={classes.button}
              >
                Back to Login
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default LoginForm;
