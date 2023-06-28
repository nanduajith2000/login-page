import React, { useState } from "react";
import {
  Checkbox,
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
} from "@material-ui/core";
import { Mic, Call, Search } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import InstantConferenceSidenav from "../components/InstantConferenceSidenav";

const useStyles = makeStyles((theme) => ({
  root: {
    gap: theme.spacing(2),
    display: "flex",
  },
  container: {
    width: "84vw",
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
    alignItems: "flex-start",
    marginBottom: 20,
  },
  searchInput: {
    background: "white",
    borderRadius: 20,
    width: "50%",
    padding: "1vh 0.8vw",
  },
  tableContainer: {
    marginTop: 8,
    width: "100%",
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
}));

const ConferenceTemplates = () => {
  const classes = useStyles();

  const handleCheckedUser = () => {
    //logic to check user
  };

  const handleMute = () => {
    //logic to mute participant
  };
  const handleCall = () => {
    //logic to call participant
  };

  return (
    <div className={classes.root}>
      <InstantConferenceSidenav />
      <Container className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          Admin's Conference
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
        </div>
        <TableContainer className={classes.tableContainer}>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Select
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Number
                </TableCell>
                <TableCell className={classes.tableHeaderCell}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={classes.tableCell}>
                  <Checkbox onChange={handleCheckedUser} />
                </TableCell>
                <TableCell className={classes.tableCell}></TableCell>
                <TableCell className={classes.tableCell}></TableCell>
                <TableCell className={classes.tableCell}>
                  <IconButton onClick={handleCall}>
                    <Call />
                  </IconButton>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <IconButton onClick={handleMute}>
                    <Mic />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default ConferenceTemplates;
