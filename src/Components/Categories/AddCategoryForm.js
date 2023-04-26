import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { addCategoryAPI } from '../../GlobalConstants';


const AddCategoryForm = () => {
const [categoryName, setCategoryName] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  // api fetch for login goes here
  setIsLoading(true);
  setError(null);

  try {
      const response = await axios.post(`${baseAPI}${addCategoryAPI}`, {
          categoryName,
          CategoryDescription,
          CategoryImage,
      }, {
          headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          }
      });
      

      const userData = response.data.user;
      localStorage.setItem("user", JSON.stringify(userData));

      if(userData){
          dispatch({
              type: "SET_USER",
              user: userData
          })
          navigate('/');
      }
      

  } catch (error) {


      if (Math.floor(error.response.status / 100) === 5) {
          error.response.data.color = 'rgb(255 99 0)';
      } else {
          error.response.data.color = 'red';
      }

      setError(error.response.data);


  } finally {
      setIsLoading(false);
  }
};
  };

  return (
      <Box m={3}>
      <Typography variant="h4" align="center" gutterBottom>
      Add Category
    </Typography>
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            required
            name="CategoryName"
            // add any additional props you need for this input
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            required
            name="CategoryDescription"
            multiline
   
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            component="label"
            fullWidth
          >
            Upload Images
            <input
              type="file"
              multiple
              name="CategoryImage"
              hidden
     
            />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Add Category
          </Button>
         </Grid>
          </Grid>
       </Box>
      </Box>
    );
  };

export default AddCategoryForm;