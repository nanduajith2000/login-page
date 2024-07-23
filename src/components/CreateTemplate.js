import React, { useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Container,
  IconButton,
  Fab,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";
import Homenavbarlite from "./Homenavbarlite";
import { useNavigate } from "react-router-dom";
import TemplateCreated from "./TemplateCreated";
import API from "../api/API";
// const createconferencetemplate = require("../api/CreateConferenceTemplate");

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    fontWeight: "bold",
    fontFamily: "Poppins, sans-serif",
    textAlign: "left",
    marginBottom: 20,
    marginTop: 40,
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  buttonContainer: {
    display: "flex",
  },
  button: {
    backgroundColor: "#0161b0",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    textTransform: "none",
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    marginRight: 10,
    marginLeft: 10,
  },
  subtitle: {
    fontFamily: "Poppins, sans-serif",
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 20,
  },
  // formControl: {
  //   backgroundColor: "white", // Change the background color to white
  // },
  select: {
    display: "flex",
    alignItems: "center", // Vertically center the values
  },
  timeSection: {
    display: "flex",
    alignItems: "center", // Align items horizontally
    justifyContent: "space-between", // Distribute space evenly
  },
  timeInput: {
    width: "45%", // Adjust the width of each time input
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  dialogTitle: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    textAlign: "center",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

const CreateTemplate = () => {
  const [subject, setSubject] = useState("");

  const [duration, setDuration] = useState({
    hours: "01",
    minutes: "00",
  });
  const [participants, setParticipants] = useState(3);
  const [userID, setUserID] = useState(localStorage.getItem("userID")); // [ADDED
  const [addContacts, setAddContacts] = useState("");
  const [addGroups, setAddGroups] = useState("");
  const [addedParticipants, setAddedParticipants] = useState([]);
  const [attendeeName, setAttendeeName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const classes = useStyles();
  const navigate = useNavigate();

  const handleCreateTemplate = () => {
    const durationInHours = parseInt(duration.hours, 10);
    const durationInMinutes = parseInt(duration.minutes, 10);

    const durationInMilliseconds =
      durationInHours * 60 * 60 * 1000 + durationInMinutes * 60 * 1000;

    setOpenConfirmation(true);

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

    var token = getCookie("user");

    API.createconferencetemplate(
      token,
      0,
      durationInMilliseconds,
      participants,
      48,
      "en_US",
      subject,
      contacts
    )
      .then((res) => {
        console.log(res);
        if (res.message === "UNAUTHORIZED") {
          alert("Session Expired. Please login again.");
          navigate("/");
        }
      })

      .catch((err) => {
        console.log(err);
        navigate("/home");
        alert("Error in creating template. Please try again.");
      });
  };

  const handleAddExternalParticipant = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAttendeeName("");
    setPhoneNumber("");
  };

  const handleAddParticipant = () => {
    const participant = addContacts || addGroups;
    const newParticipant = {
      id: new Date().getTime(), // Unique ID for each participant
      name: participant,
    };
    setAddedParticipants((prevParticipants) => [
      ...prevParticipants,
      newParticipant,
    ]);
    setAddContacts("");
    setAddGroups("");
  };

  const handleAddContact = () => {
    const newContact = {
      attendeeName: `${attendeeName}`,
      conferenceRole: "general",
      addressEntry: [
        {
          address: `${phoneNumber}`,
          type: "phone",
        },
      ],
    };

    setContacts((prevContacts) => [...prevContacts, newContact]);

    handleCloseDialog();
  };

  const handleDeleteParticipant = (id) => {
    setAddedParticipants((prevParticipants) =>
      prevParticipants.filter((participant) => participant.id !== id)
    );
  };

  const handleDeleteContact = (name) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.attendeeName !== name)
    );
  };

  const generateTimeOptions = (isHours) => {
    const max = isHours ? 23 : 59;
    const options = Array.from({ length: max + 1 }, (_, i) => {
      const value = i.toString().padStart(2, "0");
      return (
        <MenuItem key={value} value={value}>
          {value}
        </MenuItem>
      );
    });
    return options;
  };

  return (
    <div className={classes.root}>
      <Homenavbarlite />
      {!openConfirmation && (
        <Container>
          <Typography variant="h5" className={classes.title}>
            Create Conference Template
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Subject:
              </Typography>
              <TextField
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                fullWidth
                variant="filled"
              />

              <Typography variant="subtitle1" className={classes.subtitle}>
                Duration:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl
                    fullWidth
                    variant="filled"
                    className={classes.formControl}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Select
                          value={duration.hours}
                          onChange={(e) =>
                            setDuration((prevDuration) => ({
                              ...prevDuration,
                              hours: e.target.value,
                            }))
                          }
                          className={classes.select}
                        >
                          {generateTimeOptions(true)}
                        </Select>
                      </Grid>
                      <Grid item xs={6}>
                        <Select
                          value={duration.minutes}
                          onChange={(e) =>
                            setDuration((prevDuration) => ({
                              ...prevDuration,
                              minutes: e.target.value,
                            }))
                          }
                          className={classes.select}
                        >
                          {generateTimeOptions(false)}
                        </Select>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
              </Grid>

              <Typography variant="subtitle1" className={classes.subtitle}>
                Number of Participants:
              </Typography>
              <FormControl
                fullWidth
                variant="filled"
                className={classes.formControl}
              >
                <Select
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                  className={classes.select}
                >
                  {Array.from({ length: 48 }, (_, i) => i + 3).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Fab
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={handleCreateTemplate}
              >
                <AddIcon />
              </Fab>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Add Contacts:
              </Typography>
              <FormControl
                fullWidth
                variant="filled"
                className={classes.formControl}
              >
                <Select
                  value={addContacts}
                  onChange={(e) => setAddContacts(e.target.value)}
                  className={classes.select}
                >
                  <MenuItem value="contact1">Contact 1</MenuItem>
                  {/* Add other contact options */}
                </Select>
              </FormControl>

              <Typography variant="subtitle1" className={classes.subtitle}>
                Add Groups:
              </Typography>
              <FormControl
                fullWidth
                variant="filled"
                className={classes.formControl}
              >
                <Select
                  value={addGroups}
                  onChange={(e) => setAddGroups(e.target.value)}
                  className={classes.select}
                >
                  <MenuItem value="group1">Group 1</MenuItem>
                  {/* Add other group options */}
                </Select>
              </FormControl>

              <Container className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddParticipant}
                  className={classes.button}
                >
                  Add Contact/Group
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddExternalParticipant}
                  className={classes.button}
                >
                  Add External Participant
                </Button>
              </Container>

              <Typography variant="subtitle1" className={classes.subtitle}>
                Participants:
              </Typography>
              <div>
                {addedParticipants.map((participant) => (
                  <Chip
                    key={participant.id}
                    label={participant.attendeeName}
                    onDelete={() => handleDeleteParticipant(participant.id)}
                    className={classes.chip}
                  />
                ))}
                {contacts.map((contact) => (
                  <Chip
                    key={contact.id}
                    label={contact.attendeeName}
                    onDelete={() => handleDeleteContact(contact.attendeeName)}
                    className={classes.chip}
                  />
                ))}
              </div>
            </Grid>
          </Grid>
        </Container>
      )}
      {openConfirmation && (
        <TemplateCreated
          subject={subject}
          creator={userID}
          participants={participants}
        />
      )}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        className={classes.dialogRoot}
      >
        <DialogTitle>
          <Typography variant="h6" className={classes.dialogTitle}>
            Add Contact
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            label="Name"
            value={attendeeName}
            onChange={(e) => setAttendeeName(e.target.value)}
            required
            fullWidth
            className={classes.textField}
          />
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            fullWidth
            className={classes.textField}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAddContact}
            variant="contained"
            className={classes.addButton}
          >
            Add
          </Button>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            className={classes.cancelButton}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateTemplate;
