import React, { useState } from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
  },
  button: {
    backgroundColor: "#0161b0",
    color: "white",
    textTransform: "capitalize",
    fontFamily: "Poppins, sans-serif",
  },
}));

export default function AddParticipants({ onAddParticipant }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    const participant = {
      id: Date.now(),
      name: name,
      number: phoneNumber,
      selected: false,
      connected: false,
      muted: false,
    };
    onAddParticipant(participant);
    setName("");
    setPhoneNumber("");
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Button variant="contained" className={classes.button} type="submit">
        Submit
      </Button>
    </form>
  );
}
