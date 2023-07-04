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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    fontFamily: "Poppins, sans-serif",
  },
  title: {
    marginBottom: "2rem",
    fontFamily: "Poppins, sans-serif",
  },
  subtitle: {
    fontFamily: "Poppins, sans-serif",
  },
  inputField: {
    marginBottom: "1rem",
    fontFamily: "Poppins, sans-serif",
  },
  saveButton: {
    marginRight: "1rem",
    fontFamily: "Poppins, sans-serif",
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
  const [currentPassword, setCurrentPassword] = useState(
    localStorage.getItem("userPassword")
  );
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

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
      // Update password logic
      console.log("Password changed successfully!");
    }
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
    <Container maxWidth="sm" className={classes.root}>
      <Box>
        <Typography variant="h5" align="center" className={classes.title}>
          {showChangePassword ? "Change Password" : "Settings"}
        </Typography>
        {!showChangePassword ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Web Account:
              </Typography>
              <Typography variant="body1">
                {localStorage.getItem("userID")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Phone Account:
              </Typography>
              <Typography variant="body1">{telephone}</Typography>
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Allow conference chairperson to view personal contacts:
              </Typography>
              {isEditing ? (
                <FormControl fullWidth variant="outlined">
                  <Select
                    value={updatedAllowChairpersonView}
                    onChange={(e) =>
                      setUpdatedAllowChairpersonView(e.target.value)
                    }
                    className={classes.inputField}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Select>
                </FormControl>
              ) : (
                <Typography variant="body1">{allowChairpersonView}</Typography>
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
          <Container>
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
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
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
              <InputLabel htmlFor="new-password">Enter New Password</InputLabel>
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
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            <Button
              variant="contained"
              color="primary"
              onClick={handlePasswordSave}
              style={{ marginTop: "1rem" }}
              className={classes.saveButton}
            >
              Save Changes
            </Button>
          </Container>
        )}
      </Box>
    </Container>
  );
}

export default Settings;
