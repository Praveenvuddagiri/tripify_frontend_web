import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

const AddIsland = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
  };

  return (
    <Box m={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Island
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              required
              name="name"
              // add any additional props you need for this input
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              required
              name="description"
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
              Add Island
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddIsland;
