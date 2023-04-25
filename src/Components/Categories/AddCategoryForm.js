import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
// import axios from "axios";

const AddCategoryForm = () => {
  const handleSubmit = (e) =>{
    e.preventDefault();
      // api fetch for addCategory goes here
      // setIsLoading(true);
      // setError(null);

      // try {
      //     const response = await axios.post(`${baseAPI}${addCategoryAPI}`, {
      //         CategoryName,
      //         CategoryDescription,
      //     }, {
      //         headers: {
      //             'Content-Type': 'application/json',
      //             "Access-Control-Allow-Origin": "*",
      //             "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      //         }
      //     });

      //     const token = response.data.token;
      //     localStorage.setItem("token", token);
          

      // } catch (error) {


      //     if (Math.floor(error.response.status / 100) === 5) {
      //         error.response.data.color = 'rgb(255 99 0)';
      //     } else {
      //         error.response.data.color = 'red';
      //     }

      //     setError(error.response.data);


      // } finally {
      //     setIsLoading(false);
      // }
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