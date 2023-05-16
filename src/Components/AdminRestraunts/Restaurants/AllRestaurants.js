import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { baseAPI, getAllRestaurants } from "../../GlobalConstants";
import { Alert, Box, CircularProgress, Grid, Snackbar } from "@mui/material";
import axios from "axios";




function AllRestaurants({ jumpToTab }) {
  const [restaurants, setRestaurants] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseAPI}${getAllRestaurants}`, {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      });

      setRestaurants(response.data.restaurants);


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
    localStorage.removeItem('restaurant');
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
          restaurants.map((restaurant) =>
            <Grid item xs={2} sm={4} md={3} mb={3} key={restaurant._id}>
              <div>
                <RestaurantCard
                  restaurant={restaurant}
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

export default AllRestaurants;