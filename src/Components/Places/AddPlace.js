import React, { useState } from 'react';

import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  Box,
  Container,
  Card,
  CardContent,
} from '@mui/material';

const AddPlace = () => {
  const [location, setLocation] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [island, setIsland] = useState('');
  const [images, setImages] = useState([]);
  const [timing, setTiming] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // code to submit form data and store it
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  return (
    <Container maxWidth="md">
      <Box mt={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h1" gutterBottom>
              Add Place
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location Coordinates"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Landmark"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Zip"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    value
                    ={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Island</InputLabel>
                    <Select
                      value={island}
                      onChange={(e) => setIsland(e.target.value)}
                      variant="outlined"
                    >
                      <MenuItem value="hawaii">Hawaii</MenuItem>
                      <MenuItem value="maui">Maui</MenuItem>
                      <MenuItem value="oahu">Oahu</MenuItem>
                      <MenuItem value="kauai">Kauai</MenuItem>
                    </Select>
                    <FormHelperText>Select the Island</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <input
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleImageChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Timing"
                    value={timing}
                    onChange={(e) => setTiming(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
    );
};

export default AddPlace;
