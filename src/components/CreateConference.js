import React, { useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Homenavbar from "./Homenavbar";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    fontWeight: "bold",
    fontFamily: "Poppins, sans-serif",
    textAlign: "left",
    marginBottom: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#0161b0",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    textTransform: "none",
  },
  subtitle: {
    fontFamily: "Poppins, sans-serif",
    textAlign: "left",
    fontWeight: "bold",
  },
  formControl: {
    backgroundColor: "white", // Change the background color to white
  },
  select: {
    display: "flex",
    alignItems: "center", // Vertically center the values
  },
}));

const CreateConference = () => {
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [participants, setParticipants] = useState(1);
  const [addContacts, setAddContacts] = useState("");
  const [addGroups, setAddGroups] = useState("");
  const [addedParticipants, setAddedParticipants] = useState([]);

  const classes = useStyles();

  const handleSchedule = () => {
    // Logic to schedule the conference
  };

  const handleAddParticipant = () => {
    const participant = addContacts || addGroups;
    setAddedParticipants((prevParticipants) => [
      ...prevParticipants,
      participant,
    ]);
    setAddContacts("");
    setAddGroups("");
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

  return (
    <div className={classes.root}>
      <Homenavbar />
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
              style={{ backgroundColor: "white" }}
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
                  <Select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className={classes.select}
                  >
                    <MenuItem value="09:00">09:00</MenuItem>
                    {/* Add other start time options */}
                  </Select>
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
                  <Select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className={classes.select}
                  >
                    <MenuItem value="1 hour">1 hour</MenuItem>
                    {/* Add other duration options */}
                  </Select>
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
                <MenuItem value={1}>1</MenuItem>
                {/* Add other number of participant options */}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSchedule}
              className={classes.button}
            >
              Schedule
            </Button>
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

            <Typography variant="subtitle1" className={classes.subtitle}>
              Participants:
            </Typography>
            {addedParticipants.length === 0 ? (
              <Typography style={{ fontFamily: "Poppins, sans-serif" }}>
                No participants added yet
              </Typography>
            ) : (
              addedParticipants.map((participant, index) => (
                <Typography key={index}>{participant}</Typography>
              ))
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddParticipant}
              className={classes.button}
            >
              Add Participant
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CreateConference;
