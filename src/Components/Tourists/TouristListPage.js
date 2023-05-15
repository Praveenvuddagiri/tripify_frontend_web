import React, { useState, useEffect } from "react";
// import Grid from '@mui/material/Grid';
import TouristsTable from "./TouristsTable";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { baseAPI, getAllTourists } from "../../GlobalConstants";
import axios from "axios";
import { Email } from "@mui/icons-material";

const TouristListPage = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tourists, setTourists] = useState([]);
  const [emails, setEmails] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseAPI}${getAllTourists}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTourists(response.data.users);

      const ems = response.data.users.map((tour) => tour.email).join(",");
      setEmails(ems);
    } catch (error) {
      if (Math.floor(error.response.status / 100) === 5) {
        error.response.data.errorType = "warning";
      } else {
        error.response.data.errorType = "error";
      }

      setError(error.response.data);

      handleClick();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    fetchData();
  }, []);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginTop="15px"
      >
        <Typography variant="h4" align="center" gutterBottom>
          Tourists
        </Typography>
        <Button
          href={`mailto:${emails}`}
          style={{ marginLeft: 20 }}
          startIcon={<Email />}
          variant="contained"
          color="secondary"
        >
          Contact All
        </Button>
        <TouristsTable tourists={tourists} />

        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>

      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={error.errorType}
            sx={{ width: "100%" }}
          >
            {error.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default TouristListPage;
