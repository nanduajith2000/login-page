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
  Fab,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import CreateConfirmation from "./CreateConfirmation";
import Homenavbarlite from "./Homenavbarlite";
import { useNavigate } from "react-router-dom";
import API from "../api/API.js";

// const createconference = require("../api/CreateConference.js");

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
const userID = localStorage.getItem("userID");

const CreateConference = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState(`${userID}'s Conference`);
  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [startTime, setStartTime] = useState({
    hours: "11",
    minutes: "00",
  });
  const [duration, setDuration] = useState({
    hours: "01",
    minutes: "00",
  });
  const [participants, setParticipants] = useState(3);
  const [addContacts, setAddContacts] = useState("");
  const [addGroups, setAddGroups] = useState("");
  const [addedParticipants, setAddedParticipants] = useState([]);
  const [chairpersonPassword, setChairpersonPassword] = useState(null);
  const [guestPassword, setGuestPassword] = useState(null);
  const [conferenceID, setConferenceID] = useState(null);
  const [contacts, setContacts] = useState([]);

  const [creator, setCreator] = useState("Admin");
  const [accessNumber, setAccessNumber] = useState(null);
  const [attendeeName, setAttendeeName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const classes = useStyles();

  const handleSchedule = () => {
    console.log("ATTENDEES: ", contacts);
    // console.log("Subject: ", subject);
    // // console.log("Date: ", date);
    // // console.log("Start Time: ", startTime);
    // console.log("Duration: ", durationInMilliseconds);
    // console.log("Participants: ", participants);
    // // console.log("Added Participants: ", addedParticipants);

    const durationInHours = parseInt(duration.hours, 10);
    const durationInMinutes = parseInt(duration.minutes, 10);
    // console.log(durationInHours);
    // console.log(durationInMinutes);

    const durationInMilliseconds =
      durationInHours * 60 * 60 * 1000 + durationInMinutes * 60 * 1000;
    //   console.log(durationInMilliseconds);

    const selectedDate = new Date(
      `${date.month} ${date.day}, ${date.year} ${startTime.hours}:${startTime.minutes}`
    );
    const utcTimestamp = selectedDate.getTime();
    const formattedStartTimeUTC = utcTimestamp.toString();

    // console.log("UTC time: " + formattedStartTimeUTC);
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

    // console.log(token);
    // console.log("Subject: ", subject);
    // // console.log("Date: ", date);
    // // console.log("Start Time: ", startTime);
    // console.log("Duration: ", durationInMilliseconds);
    // console.log("Participants: ", participants);
    // // console.log("Added Participants: ", addedParticipants);

    const autoInvite = false;

    API.createconference(
      token,
      durationInMilliseconds,
      participants,
      48,
      "en_US",
      subject,
      autoInvite,
      formattedStartTimeUTC,
      contacts
    )
      .then((res) => {
        console.log(res);
        if (res.message === "UNAUTHORIZED") {
          navigate("/");
          alert("Session expired. Please login again.");
        } else {
          setConferenceID(
            res.scheduleConferenceResult.conferenceInfo.conferenceKey
              .conferenceID
          );
          setAccessNumber(
            res.scheduleConferenceResult.conferenceInfo.accessNumber
          );
          setCreator(res.scheduleConferenceResult.conferenceInfo.scheduserName);
          setChairpersonPassword(
            res.scheduleConferenceResult.conferenceInfo.passwords[0].password
          );
          setGuestPassword(
            res.scheduleConferenceResult.conferenceInfo.passwords[1].password
          );
        }
      })

      .catch((err) => {
        console.log(err);
        navigate("/home");
        alert("Error in creating conference. Please try again.");
      });
  };

  const handleAddParticipant = () => {
    const participant = addContacts || addGroups;
    const newParticipant = {
      id: new Date().getTime(), // Unique ID for each participant
      attendeeName: participant,
    };
    setAddedParticipants((prevParticipants) => [
      ...prevParticipants,
      newParticipant,
    ]);
  };

  const handleAddExternalParticipant = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAttendeeName("");
    setPhoneNumber("");
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

  const handleDayChange = (event) => {
    setDate((prevDate) => ({
      ...prevDate,
      day: event.target.value,
    }));
  };

  const handleMonthChange = (event) => {
    const { value } = event.target;
    let updatedDay = date.day;
    if (value === "February" && date.day > 28) {
      updatedDay = 28;
    }
    setDate((prevDate) => ({
      ...prevDate,
      month: value,
      day: updatedDay,
    }));
  };

  const handleYearChange = (event) => {
    setDate((prevDate) => ({
      ...prevDate,
      year: event.target.value,
    }));
  };

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  const generateMonthOptions = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months.map((month, index) => (
      <MenuItem key={index} value={month}>
        {month}
      </MenuItem>
    ));
  };

  const generateDayOptions = () => {
    const selectedMonth = date.month;
    let days = [];
    if (selectedMonth === "February") {
      const isLeapYear =
        (date.year % 4 === 0 && date.year % 100 !== 0) || date.year % 400 === 0;
      days = isLeapYear
        ? Array.from({ length: 29 }, (_, i) => i + 1)
        : Array.from({ length: 28 }, (_, i) => i + 1);
    } else if (
      ["April", "June", "September", "November"].includes(selectedMonth)
    ) {
      days = Array.from({ length: 30 }, (_, i) => i + 1);
    } else {
      days = Array.from({ length: 31 }, (_, i) => i + 1);
    }
    return days.map((day) => (
      <MenuItem key={day} value={day}>
        {day}
      </MenuItem>
    ));
  };

  const generateYearOptions = () => {
    const currentYear = getCurrentYear();
    const years = Array.from({ length: 11 }, (_, i) => currentYear + i);
    return years.map((year) => (
      <MenuItem key={year} value={year}>
        {year}
      </MenuItem>
    ));
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
            Create Conference
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
                // style={{ backgroundColor: "white" }}
              />

              <Typography variant="subtitle1" className={classes.subtitle}>
                Date:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <FormControl
                    fullWidth
                    variant="filled"
                    className={classes.formControl}
                  >
                    <Select
                      value={date.day}
                      onChange={handleDayChange}
                      className={classes.select}
                    >
                      {generateDayOptions()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl
                    fullWidth
                    variant="filled"
                    className={classes.formControl}
                  >
                    <Select
                      value={date.month}
                      onChange={handleMonthChange}
                      className={classes.select}
                    >
                      {generateMonthOptions()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl
                    fullWidth
                    variant="filled"
                    className={classes.formControl}
                  >
                    <Select
                      value={date.year}
                      onChange={handleYearChange}
                      className={classes.select}
                    >
                      {generateYearOptions()}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Typography variant="subtitle1" className={classes.subtitle}>
                Start Time:
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
                          value={startTime.hours}
                          onChange={(e) =>
                            setStartTime((prevTime) => ({
                              ...prevTime,
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
                          value={startTime.minutes}
                          onChange={(e) =>
                            setStartTime((prevTime) => ({
                              ...prevTime,
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
                onClick={handleSchedule}
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
        <CreateConfirmation
          openConfirmation={openConfirmation}
          setOpenConfirmation={setOpenConfirmation}
          subject={subject}
          day={date.day}
          month={date.month}
          year={date.year}
          hours={startTime.hours}
          minutes={startTime.minutes}
          chairpersonPassword={chairpersonPassword}
          conferenceID={conferenceID}
          guestPassword={guestPassword}
          creator={creator}
          accessNumber={accessNumber}
          // addedParticipants={addedParticipants}
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

export default CreateConference;
