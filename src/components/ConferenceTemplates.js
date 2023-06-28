import React, { useState } from "react";
import {
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
} from "@material-ui/core";
import Homenavbarlite from "./Homenavbarlite";
import templateData from "../data/templateData.json";
import { Add, Edit, Delete, Search, InfoOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import InstantConferenceSidenav from "./InstantConferenceSidenav";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontFamily: "Poppins, sans-serif",
    textAlign: "left",
    marginBottom: 40,
    marginTop: 20,
  },
  section: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
    width: "100%",
  },
  searchInput: {
    background: "white",
    borderRadius: 20,
    width: "50%",
    padding: "1vh 0.8vw",
  },
  tableContainer: {
    marginTop: 8,
  },
  tableHeaderCell: {
    backgroundColor: "#0161b0",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Poppins,sans-serif",
  },
  tableCell: {
    fontFamily: "Poppins,sans-serif",
  },
  tableRow: {
    "&:nth-child(even)": {
      backgroundColor: "#D9D9D9",
    },
    "&:nth-child(odd)": {
      backgroundColor: "white",
    },
  },
  startButton: {
    backgroundColor: "#0161b0",
    color: "white",
    fontFamily: "Poppins,sans-serif",
    textTransform: "capitalize",
    borderRadius: 15,
  },
  scheduleButton: {
    backgroundColor: "#0ce23b",
    color: "white",
    fontFamily: "Poppins,sans-serif",
    textTransform: "capitalize",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
  },
  tableCellButtons: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

const ConferenceTemplates = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleParticipantInfo = (template) => {
    setSelectedTemplate(template);
  };

  const handleClosePopup = () => {
    setSelectedTemplate(null);
  };

  const handleCreateTemplate = () => {
    navigate("/home/createTemplate");
  };

  const handleStartNow = () => {
    // logic to start conference
  };

  const handleSchedule = () => {
    // logic to schedule conference
  };

  const handleEditTemplate = () => {
    // logic to edit template
  };

  const handleDeleteTemplate = () => {
    // logic to delete template
  };

  return (
    <div className={classes.root}>
      <Homenavbarlite />
      <Container>
        <Typography variant="h5" className={classes.title}>
          Conference Templates
        </Typography>
        <div className={classes.section}>
          <TextField
            placeholder="Search..."
            className={`${classes.searchInput}`}
            InputProps={{
              startAdornment: <Search />,
              disableUnderline: true,
              style: {
                fontFamily: "Poppins,sans-serif",
                fontSize: "1vw", // Change the font here
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#0161b0",
              color: "white",
              fontFamily: "Poppins,sans-serif",
              fontSize: "0.9vw",
              borderRadius: 20,
              padding: "1vh 1vw",
              textTransform: "capitalize",
            }}
            startIcon={<Add />}
            onClick={handleCreateTemplate}
          >
            Create Template
          </Button>
        </div>
        <TableContainer className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Duration
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Participants
                </TableCell>
                <TableCell className={classes.tableHeaderCell}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {templateData.map((template, index) => (
                <TableRow
                  key={index}
                  className={
                    index % 2 === 0 ? classes.tableRowEven : classes.tableRowOdd
                  }
                >
                  <TableCell className={classes.tableCell}>
                    {template.name}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {template.duration}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {template.participants.length}{" "}
                    <IconButton
                      className={classes.infoButton}
                      onClick={() => handleParticipantInfo(template)}
                    >
                      <InfoOutlined />
                    </IconButton>
                  </TableCell>
                  <TableCell className={classes.tableCellButtons}>
                    <Button
                      variant="contained"
                      className={classes.startButton}
                      onClick={handleStartNow}
                    >
                      Start now
                    </Button>
                    <Button
                      variant="contained"
                      className={classes.scheduleButton}
                      onClick={handleSchedule}
                    >
                      Schedule
                    </Button>
                    <IconButton onClick={handleEditTemplate}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={handleDeleteTemplate}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Dialog open={selectedTemplate !== null} onClose={handleClosePopup}>
        <DialogTitle>Participant Info</DialogTitle>
        <DialogContent>
          {selectedTemplate && (
            <List>
              {selectedTemplate.participants.map((participant, index) => (
                <ListItem key={index}>{participant}</ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConferenceTemplates;
