import React from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Button, Divider } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "60vw",
  },
  titleContainer: {
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: "#0ce23b",
    padding: "1vh 0.8vw",
    borderRadius: 20,
  },
  title: {
    color: "white",
    fontSize: "1.5rem",
    fontFamily: "Poppins, sans-serif",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 40,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#0161b0",
    color: "white",
    textTransform: "capitalize",
    fontFamily: "Poppins, sans-serif",
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: "black",
    color: "white",
    textTransform: "capitalize",
    fontFamily: "Poppins, sans-serif",
    borderRadius: 10,
  },
  text: {
    fontFamily: "Poppins, sans-serif",
    fontSize: "1rem",
    marginBottom: 10,
  },
  detailHeader: {
    fontWeight: "bold",
    fontFamily: "Poppins, sans-serif",
    marginRight: 5,
  },
}));

export default function ConferenceCreated(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSaveAsTemplate = () => {
    console.log("Save as template");
  };

  return (
    <Container className={classes.root}>
      <Container className={classes.titleContainer}>
        <Typography className={classes.title}>
          Conference edited successfully! The conference notification has been
          sent to you via SMS or email.
        </Typography>
      </Container>

      <Divider />
      <Container className={classes.detailsContainer}>
        <Typography className={classes.text} variant="body1">
          <span className={classes.detailHeader}>Subject:</span> {props.subject}
        </Typography>
        <Typography className={classes.text} variant="body1">
          <span className={classes.detailHeader}>Date:</span> {props.day}{" "}
          {props.month}, {props.year}
        </Typography>
        <Typography className={classes.text} variant="body1">
          <span className={classes.detailHeader}>Start time:</span>{" "}
          {props.hours}:{props.minutes}
        </Typography>
        <Typography className={classes.text} variant="body1">
          <span className={classes.detailHeader}>Conference ID:</span>{" "}
          {props.conferenceID}
        </Typography>
        <Typography className={classes.text} ariant="body1">
          <span className={classes.detailHeader}>Access number:</span>{" "}
          {props.accessNumber}
        </Typography>
        <Typography className={classes.text} variant="body1">
          <span className={classes.detailHeader}>Chairperson password:</span>{" "}
          {props.chairpersonPassword}
        </Typography>
        <Typography className={classes.text} variant="body1">
          <span className={classes.detailHeader}>Guest password:</span>{" "}
          {props.guestPassword}
        </Typography>
        <Typography className={classes.text} variant="body1">
          <span className={classes.detailHeader}>Creator:</span> {props.creator}
        </Typography>
        <Typography className={classes.text} variant="body1">
          <span className={classes.detailHeader}>Participants:</span>{" "}
          {props.addedParticipants}
        </Typography>
        <Typography className={classes.text} variant="body1">
          <span className={classes.detailHeader}>Number of participants:</span>{" "}
          {props.participants}
        </Typography>
      </Container>
      <Container className={classes.buttonContainer}>
        <Button
          className={classes.button}
          onClick={() => {
            navigate("/home");
          }}
        >
          Return to Dashboard
        </Button>
        <Button className={classes.saveButton} onClick={handleSaveAsTemplate}>
          Save as Template
        </Button>
      </Container>
    </Container>
  );
}
