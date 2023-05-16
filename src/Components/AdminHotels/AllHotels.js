import { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import { baseAPI, getAllHotelsAdmin } from "../../GlobalConstants";
import { Alert, Box, CircularProgress, Grid, Snackbar } from "@mui/material";
import axios from "axios";




function AllHotels({ jumpToTab }) {
  const [hotels, setHotels] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseAPI}${getAllHotelsAdmin}`, {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });

      setHotels(response.data.hotels);


    } catch (error) {


      if (Math.floor(error.response.status / 100) === 5) {
        error.response.data.errorType = 'warning';
      } else {
        error.response.data.errorType = 'error';
      }

      setError(error.response.data);

      handleClick();
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    localStorage.removeItem('hotel');
    setIsLoading(true);

    fetchData();

  }, []);



  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>


      {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
          hotels.map((hotel) =>
            <Grid item xs={2} sm={4} md={3} mb={3} key={hotel._id}>
              <div>
                <HotelCard
                  hotels={hotel}
                  setError={setError}
                  handleClick={handleClick}
                  fetchData={fetchData}
                  jumpToTab={jumpToTab}
                />
              </div>
            </Grid>
          )
        }
      </Grid>



      {error && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error.errorType} sx={{ width: '100%' }}>
          {error.message}
        </Alert>
      </Snackbar>}
    </>
  );
}

export default AllHotels;