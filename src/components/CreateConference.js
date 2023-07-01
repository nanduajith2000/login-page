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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ConferenceCreated from "./ConferenceCreated";
import Homenavbarlite from "./Homenavbarlite";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    fontWeight: "bold",
    fontFamily: "Poppins, sans-serif",
    textAlign: "left",
    marginBottom: 20,
    marginTop: 20,
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  button: {
    backgroundColor: "#0161b0",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    textTransform: "none",
    marginTop: 20,
    marginBottom: 20,
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
}));

const CreateConference = () => {
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [startTime, setStartTime] = useState({
    hours: "",
    minutes: "",
  });
  const [duration, setDuration] = useState({
    hours: "",
    minutes: "",
  });
  const [participants, setParticipants] = useState(1);
  const [addContacts, setAddContacts] = useState("");
  const [addGroups, setAddGroups] = useState("");
  const [addedParticipants, setAddedParticipants] = useState([]);
  const [chairpersonPassword, setChairpersonPassword] = useState("123456");
  const [guestPassword, setGuestPassword] = useState("123456");
  const [creator, setCreator] = useState("Admin");
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const classes = useStyles();

  const handleSchedule = () => {
    console.log("Subject: ", subject);
    console.log("Date: ", date);
    console.log("Start Time: ", startTime);
    console.log("Duration: ", duration);
    console.log("Participants: ", participants);
    console.log("Added Participants: ", addedParticipants);

    setOpenConfirmation(true);
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

  const handleDeleteParticipant = (id) => {
    setAddedParticipants((prevParticipants) =>
      prevParticipants.filter((participant) => participant.id !== id)
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
                  {Array.from({ length: 50 }, (_, i) => i + 1).map((value) => (
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

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddParticipant}
                className={classes.button}
              >
                Add Participant
              </Button>

              <Typography variant="subtitle1" className={classes.subtitle}>
                Participants:
              </Typography>
              <div>
                {addedParticipants.map((participant) => (
                  <Chip
                    key={participant.id}
                    label={participant.name}
                    onDelete={() => handleDeleteParticipant(participant.id)}
                    className={classes.chip}
                  />
                ))}
              </div>
            </Grid>
          </Grid>
        </Container>
      )}
      {openConfirmation && (
        <ConferenceCreated
          openConfirmation={openConfirmation}
          setOpenConfirmation={setOpenConfirmation}
          subject={subject}
          day={date.day}
          month={date.month}
          year={date.year}
          hours={startTime.hours}
          minutes={startTime.minutes}
          chairpersonPassword={chairpersonPassword}
          guestPassword={guestPassword}
          creator={creator}
          participants={participants}
        />
      )}
    </div>
  );
};

export default CreateConference;
