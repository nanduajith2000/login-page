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
import API from "../../src/api/API";

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
    height: "80vh",
  },
  box: {
    width: "50%",
    backgroundColor: "#D9D9D9",

    marginRight: theme.spacing(2),
    borderRadius: 10,

    gap: "0.1vw",
    overflowY: "auto", // Enable vertical scrolling when content exceeds the height
  },
  addedContact: {
    backgroundColor: "white",
    height: "10vh",
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
  const [phone, setPhone] = useState("");
  const [openGroupDialog, setOpenGroupDialog] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");

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

  const token = getCookie("user");

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();

    const filtered = contacts.filter((contact) =>
      contact.entry[1].value.toLowerCase().includes(query)
    );

    setFilteredContacts(filtered);
    setSearchQuery(query);
  };

  React.useEffect(() => {
    API.querycontactorlist(token, 1)
      .then((res) => {
        setContacts(res);
        setFilteredContacts(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // API.querypersonalcontactgrouplist(token, 1)
    //   .then((res) => {
    //     setGroups(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  React.useEffect(() => {
    console.log("CONTACTS", contacts);
  }, [contacts]);
  React.useEffect(() => {
    console.log("GROUPS", groups);
  }, [groups]);

  const [filteredContacts, setFilteredContacts] = useState(contacts);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setName("");
    setPhone("");
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
      entry: [
        { key: "name", value: `${name}` },
        { key: "phone", value: `${phone}` },
      ],
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
            onChange={handleSearch}
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
            {filteredContacts.map((contact, index) => (
              <div key={index} className={classes.addedContact}>
                <Typography variant="subtitle2" className={classes.contactName}>
                  {contact.entry[1].value}
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.contactPhoneNumber}
                >
                  {contact.entry[2].value}
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
