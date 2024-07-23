import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Homenavbarlite from "./Homenavbarlite";
import API from "../api/API";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "left",
    width: "80vw",
  },
  title: {
    marginTop: 40,
    marginBottom: 40,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    textAlign: "left",
  },
  gridItem: {
    display: "flex",
    flexDirection: "column",
  },
  subtitle: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
  },
  inputField: {
    marginBottom: "1rem",
    fontFamily: "Poppins, sans-serif",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  saveButton: {
    fontFamily: "Poppins, sans-serif",
  },
  backButton: {
    fontFamily: "Poppins, sans-serif",
    backgroundColor: "black",
  },
  passwordError: {
    color: theme.palette.error.main,
    fontFamily: "Poppins, sans-serif",
  },
}));

function Settings() {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(localStorage.getItem("userID"));
  const [pin, setPIN] = useState("1234");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [allowChairpersonView, setAllowChairpersonView] = useState("Yes");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPIN, setUpdatedPIN] = useState("");
  const [updatedTelephone, setUpdatedTelephone] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedAllowChairpersonView, setUpdatedAllowChairpersonView] =
    useState("Yes");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

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

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setUpdatedName(name);
    setUpdatedPIN(pin);
    setUpdatedTelephone(telephone);
    setUpdatedEmail(email);
    setUpdatedAllowChairpersonView(allowChairpersonView);
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordSave = () => {
    if (newPassword !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
      setShowChangePassword(false);

      const token = getCookie("user");
      const account = {
        name: name,
        type: "WEB",
      };
      API.modifyuserpassword(
        token,
        account,
        currentPassword,
        newPassword,
        confirmPassword
      )
        .then((res) => {
          console.log(res);
          alert("Password changed successfully!");
        })
        .catch((err) => {
          console.log(err);
          alert("Could not change password. Please try again later.");
        });
    }
  };
  const handleGoBack = () => {
    setShowChangePassword(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    setName(updatedName);
    setPIN(updatedPIN);
    setTelephone(updatedTelephone);
    setEmail(updatedEmail);
    setAllowChairpersonView(updatedAllowChairpersonView);
    // Update settings logic
    console.log("Settings saved successfully!");
  };

  // Set initial values for non-editable fields

  return (
    <div className={classes.root}>
      <Homenavbarlite />
      <Container>
        <Typography variant="h5" align="center" className={classes.title}>
          {showChangePassword ? "Change Password" : "Settings"}
        </Typography>
        <Container>
          {!showChangePassword ? (
            <Grid container spacing={2}>
              <Grid item xs={12} className={classes.gridItem}>
                <Typography variant="subtitle1" className={classes.subtitle}>
                  Web Account:
                </Typography>
                <Typography variant="body1">
                  {localStorage.getItem("userID")}
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <Typography variant="subtitle1" className={classes.subtitle}>
                  Phone Account:
                </Typography>
                <Typography variant="body1">{telephone}</Typography>
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <Typography variant="subtitle1" className={classes.subtitle}>
                  Name:
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className={classes.inputField}
                  />
                ) : (
                  <Typography variant="body1">{name}</Typography>
                )}
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <Typography variant="subtitle1" className={classes.subtitle}>
                  PIN:
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={updatedPIN}
                    onChange={(e) => setUpdatedPIN(e.target.value)}
                    className={classes.inputField}
                  />
                ) : (
                  <Typography variant="body1">{pin}</Typography>
                )}
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <Typography variant="subtitle1" className={classes.subtitle}>
                  Telephone:
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={updatedTelephone}
                    onChange={(e) => setUpdatedTelephone(e.target.value)}
                    className={classes.inputField}
                  />
                ) : (
                  <Typography variant="body1">{telephone}</Typography>
                )}
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <Typography variant="subtitle1" className={classes.subtitle}>
                  Email:
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={updatedEmail}
                    onChange={(e) => setUpdatedEmail(e.target.value)}
                    className={classes.inputField}
                  />
                ) : (
                  <Typography variant="body1">{email}</Typography>
                )}
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <Typography variant="subtitle1" className={classes.subtitle}>
                  Allow conference chairperson to view personal contacts:
                </Typography>
                {isEditing ? (
                  <Box display="flex">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={updatedAllowChairpersonView === "Yes"}
                          onChange={() => setUpdatedAllowChairpersonView("Yes")}
                          color="primary"
                        />
                      }
                      label="Yes"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={updatedAllowChairpersonView === "No"}
                          onChange={() => setUpdatedAllowChairpersonView("No")}
                          color="primary"
                        />
                      }
                      label="No"
                    />
                  </Box>
                ) : (
                  <Typography variant="body1">
                    {allowChairpersonView}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} container justifyContent="center">
                {isEditing ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    className={classes.saveButton}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={toggleEditing}
                    className={classes.saveButton}
                  >
                    Edit Details
                  </Button>
                )}
              </Grid>
              <Grid item xs={12} container justifyContent="center">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleChangePassword}
                  className={classes.saveButton}
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Container className={classes.changePasswordContainer}>
              <FormControl
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1rem" }}
              >
                <InputLabel htmlFor="current-password">
                  Enter Current Password
                </InputLabel>
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button onClick={toggleShowCurrentPassword}>
                        {showCurrentPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1rem" }}
              >
                <InputLabel htmlFor="new-password">
                  Enter New Password
                </InputLabel>
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button onClick={toggleShowNewPassword}>
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1rem" }}
              >
                <InputLabel htmlFor="confirm-password">
                  Confirm New Password
                </InputLabel>
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button onClick={toggleShowConfirmPassword}>
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {passwordMatchError && (
                <Typography variant="body2" className={classes.passwordError}>
                  The passwords do not match
                </Typography>
              )}
              <Container className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePasswordSave}
                  style={{ marginTop: "1rem" }}
                  className={classes.saveButton}
                >
                  Save Changes
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGoBack}
                  style={{ marginTop: "1rem" }}
                  className={classes.backButton}
                >
                  Back
                </Button>
              </Container>
            </Container>
          )}
        </Container>
      </Container>
    </div>
  );
}

export default Settings;
