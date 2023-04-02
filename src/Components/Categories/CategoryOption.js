import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';

const CategoryOption = () => {
  return (
    <Box m={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Choose an Action
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Box boxShadow={2}>
            <Button
              component={Link}
              to="/add-place"
              variant="contained"
              color="primary"
              fullWidth
            >
              Add Place
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box boxShadow={2}>
            <Button
              component={Link}
              to="/update-place"
              variant="contained"
              color="secondary"
              fullWidth
            >
              Update Place
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box boxShadow={2}>
            <Button
              component={Link}
              to="/delete-place"
              variant="contained"
              color="error"
              fullWidth
            >
              Delete Place
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryOption;