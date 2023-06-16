import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Grid,
} from "@material-ui/core";
import "./LoginForm.css";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const [showConferenceForm, setShowConferenceForm] = useState(false);
  const [webAccount, setWebAccount] = useState("");
  const [password, setPassword] = useState("");
  const [conferenceId, setConferenceId] = useState("");
  const [conferencePassword, setConferencePassword] = useState("");

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
          <Typography variant="h5" align="center">
            Login
          </Typography>
        </Grid>
        {!showConferenceForm ? (
          <>
            <Grid item xs={12}>
              <TextField
                label="Web Account"
                fullWidth
                value={webAccount}
                onChange={(e) => setWebAccount(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                <Link href="#">Forgot Password?</Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                Use a conference ID to join a conference
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleJoinConference}
              >
                Join Conference
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <TextField
                label="Conference ID"
                fullWidth
                value={conferenceId}
                onChange={(e) => setConferenceId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={conferencePassword}
                onChange={(e) => setConferencePassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleJoin}
              >
                Join
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" fullWidth onClick={handleBackToLogin}>
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
