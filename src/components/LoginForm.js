import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { userDetailsContext } from "../pages/LoginPage.js";
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

const Login = require("../api/Login.js");

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
}));

const LoginForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [showConferenceForm, setShowConferenceForm] = useState(false);
  const [conferencePassword, setConferencePassword] = useState("");

  const webAccount = useContext(userDetailsContext).webAccount;
  const setWebAccount = useContext(userDetailsContext).setWebAccount;
  const password = useContext(userDetailsContext).password;
  const setPassword = useContext(userDetailsContext).setPassword;
  const conferenceId = useContext(userDetailsContext).conferenceId;
  const setConferenceId = useContext(userDetailsContext).setConferenceId;

  const handleJoinConference = () => {
    setShowConferenceForm(true);
  };

  const handleBackToLogin = () => {
    setShowConferenceForm(false);
  };

  const handleLogin = () => {
    // Do something with the submitted login information
    console.log("Web Account:", webAccount);
    console.log("Password:", password);

    Login(webAccount, password).then((res) => {
      console.log(res);

      if (res.message === "success") {

        // console.log(res.token);
        document.cookie = "user=" + res.token+";";
        console.log(document.cookie)
        navigate("/home");
      } else alert("Invalid Credentials");
    });
  };

  const handleJoin = () => {
    // Do something with the submitted conference information
    console.log("Conference ID:", conferenceId);
    console.log("Conference Password:", conferencePassword);
  };

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
                    fontFamily: "Poppins, sans-serif", // Specify your desired font family
                  },
                }}
                InputLabelProps={{
                  component: Typography,
                  style: {
                    fontFamily: "Poppins, sans-serif", // Specify your desired font family
                  },
                }}
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
                    fontFamily: "Poppins, sans-serif", // Specify your desired font family
                  },
                }}
                InputLabelProps={{
                  component: Typography,
                  style: {
                    fontFamily: "Poppins, sans-serif", // Specify your desired font family
                  },
                }}
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
              <TextField
                variant="outlined"
                label="Conference ID"
                className={classes.textField}
                fullWidth
                value={conferenceId}
                onChange={(e) => setConferenceId(e.target.value)}
                InputProps={{
                  style: {
                    fontFamily: "Poppins, sans-serif", // Specify your desired font family
                  },
                }}
                InputLabelProps={{
                  component: Typography,
                  style: {
                    fontFamily: "Poppins, sans-serif", // Specify your desired font family
                  },
                }}
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
                    fontFamily: "Poppins, sans-serif", // Specify your desired font family
                  },
                }}
                InputLabelProps={{
                  component: Typography,
                  style: {
                    fontFamily: "Poppins, sans-serif", // Specify your desired font family
                  },
                }}
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
