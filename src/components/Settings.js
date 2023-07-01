import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

function Settings() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
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
  const [currentPassword, setCurrentPassword] = useState("");
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

  const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  const generateRandomNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  // Set initial values for non-editable fields
  useState(() => {
    setName(generateRandomString());
    setTelephone(generateRandomNumber());
  }, []);

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography
          variant="h5"
          align="center"
          style={{ marginBottom: "2rem" }}
        >
          {showChangePassword ? "Change Password" : "Settings"}
        </Typography>
        {!showChangePassword ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Web Account:</Typography>
              <Typography variant="body1">{name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Phone Account:</Typography>
              <Typography variant="body1">{telephone}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Name:</Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
              ) : (
                <Typography variant="body1">{name}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">PIN:</Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={updatedPIN}
                  onChange={(e) => setUpdatedPIN(e.target.value)}
                />
              ) : (
                <Typography variant="body1">{pin}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Telephone:</Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={updatedTelephone}
                  onChange={(e) => setUpdatedTelephone(e.target.value)}
                />
              ) : (
                <Typography variant="body1">{telephone}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Email:</Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                />
              ) : (
                <Typography variant="body1">{email}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Allow conference chairperson to view personal contacts:
              </Typography>
              {isEditing ? (
                <FormControl fullWidth variant="outlined">
                  <Select
                    value={updatedAllowChairpersonView}
                    onChange={(e) =>
                      setUpdatedAllowChairpersonView(e.target.value)
                    }
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
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={toggleEditing}
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
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Paper
            elevation={0}
            style={{ marginTop: "2rem", padding: "2rem", maxWidth: "400px" }}
          >
            <Typography
              variant="h5"
              align="center"
              style={{ marginBottom: "2rem" }}
            >
              Change Password
            </Typography>
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
              <Typography variant="body2" color="error">
                The passwords do not match
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handlePasswordSave}
              style={{ marginTop: "1rem" }}
            >
              Save Changes
            </Button>
          </Paper>
        )}
      </Paper>
    </Box>
  );
}

export default Settings;
