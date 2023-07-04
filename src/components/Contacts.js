import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  IconButton,
  Box,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import Search from "@mui/icons-material/Search";
import Homenavbarlite from "./Homenavbarlite";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins",
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 40,
  },
  dialogTitle: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    textAlign: "center",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  searchInput: {
    background: "white",
    borderRadius: 20,
    width: "50%",
    padding: "1vh 0.8vw",
    fontFamily: "Poppins, sans-serif",
    fontSize: "1vw",
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
  },
  contactsButton: {
    color: "#0161b0",
    marginRight: theme.spacing(2),
    fontFamily: "Poppins, sans-serif",
    textTransform: "none",
    "&.MuiButton-outlined": {
      outline: "1px solid #0161b0",
    },
  },
  groupsButton: {
    background: "#0161b0",
    color: "white",
    marginRight: theme.spacing(2),
    fontFamily: "Poppins, sans-serif",
    textTransform: "none",
  },
  iconButton: {
    color: "#0161b0",
    marginRight: theme.spacing(2),
  },
  textField: {
    fontFamily: "Poppins, sans-serif",
  },
  addButton: {
    background: "#0161b0",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    textTransform: "none",
    width: "50%",

    marginLeft: theme.spacing(2),
  },
  cancelButton: {
    color: "#0161b0",
    marginRight: theme.spacing(2),
    fontFamily: "Poppins, sans-serif",
    textTransform: "none",
    "&.MuiButton-outlined": {
      outline: "1px solid #0161b0",
    },
    width: "50%",
  },
  boxContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  box: {
    width: "50%",
    backgroundColor: "#D9D9D9",
    height: "50vh",
    marginRight: theme.spacing(2),
    borderRadius: 10,
    display: "flex",
    flexWrap: "wrap",
    gap: "0.1vw",
    overflowY: "scroll",
  },
  addedContact: {
    backgroundColor: "white",
    height: "10vh",
    width: "10vw",
    borderRadius: 10,
    margin: "5px 8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  contactName: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
  },
  contactPhoneNumber: {
    fontFamily: "Poppins, sans-serif",
  },
  addedGroup: {
    backgroundColor: "white",
    height: "10vh",
    width: "10vw",
    borderRadius: 10,
    margin: "5px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)",
  },
}));

const ContactsPage = () => {
  const classes = useStyles();

  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openGroupDialog, setOpenGroupDialog] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setName("");
    setPhoneNumber("");
  };
  const handleOpenGroupDialog = () => {
    setOpenGroupDialog(true);
  };

  const handleCloseGroupDialog = () => {
    setOpenGroupDialog(false);
    setGroupName("");
  };

  const handleAddContact = () => {
    const newContact = {
      name,
      phoneNumber,
    };

    setContacts((prevContacts) => [...prevContacts, newContact]);
    handleCloseDialog();
  };
  const handleAddGroup = () => {
    const newGroup = {
      name: groupName,
      members: [],
    };

    setGroups((prevGroups) => [...prevGroups, newGroup]);
    handleCloseGroupDialog();
  };

  const handleImportContacts = () => {
    // logic to import contacts
  };

  const handleExportContacts = () => {
    // logic to export contacts
  };

  return (
    <div className={classes.root}>
      <Homenavbarlite />
      <Container className={classes.contactsContainer}>
        <Typography variant="h5" className={classes.title}>
          Contacts
        </Typography>

        <div className={classes.searchContainer}>
          <TextField
            placeholder="Search..."
            className={classes.searchInput}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            InputProps={{
              startAdornment: <Search />,
              disableUnderline: true,
            }}
          />
          <Container className={classes.buttonsContainer}>
            <Button
              variant="outlined"
              className={classes.contactsButton}
              onClick={handleOpenDialog}
            >
              Add Contacts
            </Button>
            <Button
              variant="filled"
              className={classes.groupsButton}
              onClick={handleOpenGroupDialog}
            >
              Add Groups
            </Button>
            <IconButton
              aria-label="Import Contacts"
              color="primary"
              size="small"
              title="Import Contacts"
              className={classes.iconButton}
              onClick={handleImportContacts}
            >
              <DownloadIcon />
            </IconButton>
            <IconButton
              aria-label="Export Contacts"
              color="primary"
              size="small"
              title="Export Contacts"
              className={classes.iconButton}
              onClick={handleExportContacts}
            >
              <UploadIcon />
            </IconButton>
          </Container>
        </div>

        <div className={classes.boxContainer}>
          <Box className={classes.box}>
            {contacts.map((contact, index) => (
              <div key={index} className={classes.addedContact}>
                <Typography variant="subtitle2" className={classes.contactName}>
                  {contact.name}
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.contactPhoneNumber}
                >
                  {contact.phoneNumber}
                </Typography>
              </div>
            ))}
          </Box>
          <Box className={classes.box}>
            {groups.map((group, index) => (
              <div key={index} className={classes.addedGroup}>
                <Typography variant="subtitle2" className={classes.contactName}>
                  {group.name}
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.contactPhoneNumber}
                >
                  Members: {group.members.length}
                </Typography>
              </div>
            ))}
          </Box>
        </div>
      </Container>

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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
      <Dialog
        open={openGroupDialog}
        onClose={handleCloseGroupDialog}
        className={classes.dialogRoot}
      >
        <DialogTitle>
          <Typography variant="h6" className={classes.dialogTitle}>
            Add Group
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            label="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
            fullWidth
            className={classes.textField}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAddGroup}
            variant="contained"
            className={classes.addButton}
          >
            Add
          </Button>
          <Button
            onClick={handleCloseGroupDialog}
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

export default ContactsPage;
