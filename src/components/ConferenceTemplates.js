import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
} from "@material-ui/core";
import { Add, Edit, Delete, Search, InfoOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import Homenavbarlite from "./Homenavbarlite";
import API from "../api/API";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontFamily: "Poppins, sans-serif",
    textAlign: "left",
    marginBottom: 40,
    marginTop: 40,
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
    maxHeight: "100vh",
  },
  tableBody: {
    overflowY: "auto",
  },
  tableHeaderCell: {
    backgroundColor: "#0161b0",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Poppins, sans-serif",
  },
  tableCell: {
    fontFamily: "Poppins, sans-serif",
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
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
    borderRadius: 15,
  },
  scheduleButton: {
    backgroundColor: "#0ce23b",
    color: "white",
    fontFamily: "Poppins, sans-serif",
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
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  confirmDialogTitle: {
    backgroundColor: "#0161b0",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: "10px 0",
    marginBottom: "20px",
  },
  confirmDialogContent: {
    padding: "20px",
  },
  confirmDialogActions: {
    justifyContent: "center",
    marginBottom: "10px",
  },
}));
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

const ConferenceTemplates = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [templateData, setTemplateData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [deleteTemplateId, setDeleteTemplateId] = useState(null);

  useEffect(() => {
    const token = getCookie("user");
    API.ConferenceTemplateList(token)
      .then((res) => {
        if (res.message === "UNAUTHORIZED") {
          alert("Session expired. Please login again");
          navigate("/");
        } else {
          console.log("Conference template list: ", res);
          const templateArray = Object.values(res)
            .filter((value) => typeof value === "object")
            .map((template) => template);
          setTemplateData(templateArray);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(
          "Could not fetch template details. Please try again later."
        );
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const [showParticipantDialog, setShowParticipantDialog] = useState(false);
  const [selectedTemplateParticipants, setSelectedTemplateParticipants] =
    useState([]);

  const handleOpenParticipantDialog = (participants) => {
    setSelectedTemplateParticipants(participants);
    setShowParticipantDialog(true);
  };

  const handleCloseParticipantDialog = () => {
    setShowParticipantDialog(false);
  };

  const filteredTemplates = templateData.filter((template) => {
    const templateName = template.TemplateName.toLowerCase();
    const query = searchQuery.toLowerCase();
    return templateName.includes(query);
  });

  const handleCreateTemplate = () => {
    navigate("/home/createTemplate");
  };

  const handleStartNow = (template) => {
    // logic to start conference
  };

  const handleSchedule = (template) => {
    // logic to schedule conference
    localStorage.setItem("templateDetails", JSON.stringify(template));
    navigate("/home/scheduletemplate");
  };

  const handleEditTemplate = (template) => {
    // logic to edit template
  };

  const handleDeleteTemplate = (TemplateID) => {
    setDeleteTemplateId(TemplateID);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = (TemplateID) => {
    // Show a pop-up confirmation before proceeding with deletion
    const confirmed = true;
    if (!confirmed) {
      // If the user clicks "Cancel" in the confirmation pop-up, do nothing and return
      return;
    }

    const token = getCookie("user");
    console.log(token);
    console.log(TemplateID);
    API.deleteconferencetemplate(token, TemplateID)
      .then((res) => {
        // Handle success response if needed
        console.log(res);
        if (res.result.resultDesc === "FORBIDDEN") {
          window.alert("You are unauthorized for this action.");
          setShowConfirmDialog(false);
        } else {
          // Reload the conference template list after deletion
          API.ConferenceTemplateList(token)
            .then((res) => {
              const templateArray = Object.values(res)
                .filter((value) => typeof value === "object")
                .map((template) => template);
              setTemplateData(templateArray);
              setShowConfirmDialog(false);
            })
            .catch((err) => {
              console.log(
                "Could not fetch template details. Please try again later."
              );
            });
        }
      })
      .catch((err) => {
        // Handle error response if needed
        console.log("Error deleting template: ", err);
      });
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
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
            className={classes.searchInput}
            InputProps={{
              startAdornment: <Search />,
              disableUnderline: true,
              style: {
                fontFamily: "Poppins, sans-serif",
                fontSize: "1vw",
              },
            }}
            value={searchQuery}
            onChange={handleSearch}
          />
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#0161b0",
              color: "white",
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.9vw",
              borderRadius: 10,
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
            <TableBody className={classes.tableBody}>
              {loading ? ( // Render loading icon if loading is true
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : filteredTemplates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No templates found
                  </TableCell>
                </TableRow>
              ) : (
                // Render templates when loading is false and templates are available
                filteredTemplates.map((template, key) => (
                  <TableRow key={key} className={classes.tableRow}>
                    <TableCell className={classes.tableCell}>
                      {template.TemplateName}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {template.Length}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {template.Parties}{" "}
                      <IconButton
                        className={classes.infoButton}
                        onClick={() =>
                          handleOpenParticipantDialog(template.Participants)
                        }
                      >
                        <InfoOutlined />
                      </IconButton>
                    </TableCell>
                    <TableCell className={classes.tableCellButtons}>
                      <Button
                        variant="contained"
                        className={classes.startButton}
                        onClick={() => handleStartNow(template)}
                      >
                        Start now
                      </Button>
                      <Button
                        variant="contained"
                        className={classes.scheduleButton}
                        onClick={() => handleSchedule(template)}
                      >
                        Schedule
                      </Button>
                      <IconButton onClick={handleEditTemplate}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          handleDeleteTemplate(template.TemplateId)
                        }
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this template?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.confirmButton}
              variant="contained"
              color="primary"
              onClick={() => handleConfirmDelete(deleteTemplateId)}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="white"
              onClick={handleCancelDelete}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={showParticipantDialog}
          onClose={handleCloseParticipantDialog}
        >
          <DialogTitle>Participant Attendees</DialogTitle>
          <DialogContent>
            <List>
              {selectedTemplateParticipants.map((participant, index) => (
                <ListItem key={index}>
                  <Typography>{participant}</Typography>
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseParticipantDialog}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default ConferenceTemplates;
