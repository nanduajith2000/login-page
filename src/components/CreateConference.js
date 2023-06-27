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
} from "@material-ui/core";

const CreateConference = () => {
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [participants, setParticipants] = useState(1);
  const [addContacts, setAddContacts] = useState("");
  const [addGroups, setAddGroups] = useState("");
  const [addedParticipants, setAddedParticipants] = useState([]);

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

  return (
    <div>
      <Typography variant="h6" component="h6" style={{ fontWeight: "bold" }}>
        Create Conference
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            fullWidth
            variant="filled"
          />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth variant="filled">
                <InputLabel>Date</InputLabel>
                <Select value={date} onChange={(e) => setDate(e.target.value)}>
                  <MenuItem value="01">01</MenuItem>
                  {/* Add other date options */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth variant="filled">
                <InputLabel>Month</InputLabel>
                <Select value={date} onChange={(e) => setDate(e.target.value)}>
                  <MenuItem value="01">January</MenuItem>
                  {/* Add other month options */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth variant="filled">
                <InputLabel>Year</InputLabel>
                <Select value={date} onChange={(e) => setDate(e.target.value)}>
                  <MenuItem value="2022">2022</MenuItem>
                  {/* Add other year options */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth variant="filled">
                <InputLabel>Start Time</InputLabel>
                <Select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                >
                  <MenuItem value="09:00">09:00</MenuItem>
                  {/* Add other start time options */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="filled">
                <InputLabel>Duration</InputLabel>
                <Select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <MenuItem value="1 hour">1 hour</MenuItem>
                  {/* Add other duration options */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <FormControl fullWidth variant="filled">
            <InputLabel>Number of Participants</InputLabel>
            <Select
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            >
              <MenuItem value={1}>1</MenuItem>
              {/* Add other number of participant options */}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSchedule}
            style={{ backgroundColor: "#0161b0", color: "white" }}
          >
            Schedule
          </Button>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="filled">
            <InputLabel>Add Contacts</InputLabel>
            <Select
              value={addContacts}
              onChange={(e) => setAddContacts(e.target.value)}
            >
              <MenuItem value="contact1">Contact 1</MenuItem>
              {/* Add other contact options */}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="filled">
            <InputLabel>Add Groups</InputLabel>
            <Select
              value={addGroups}
              onChange={(e) => setAddGroups(e.target.value)}
            >
              <MenuItem value="group1">Group 1</MenuItem>
              {/* Add other group options */}
            </Select>
          </FormControl>
          <Typography
            variant="h6"
            component="h6"
            style={{ fontWeight: "bold", marginTop: "16px" }}
          >
            Participants
          </Typography>
          {addedParticipants.length === 0 ? (
            <Typography>No participants added yet</Typography>
          ) : (
            addedParticipants.map((participant, index) => (
              <Typography key={index}>{participant}</Typography>
            ))
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddParticipant}
            style={{ backgroundColor: "#0161b0", color: "white" }}
          >
            Add Participant
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateConference;
