import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeletePlace = () => {
  const [placeName, setPlaceName] = useState('');
  const [places, setPlaces] = useState([]);

  const handleSearch = () => {
    // api fetch for getPlaceDetails goes here
    // update places state with the response data
    const sampleData = [
      {
        id: 1,
        name: 'Place 1',
        description: 'This is place 1',
      },
      {
        id: 2,
        name: 'Place 2',
        description: 'This is place 2',
      },
    ];
    setPlaces(sampleData);
  };

  const handleDelete = (id) => {
    // api fetch for deletePlace goes here
    // remove the deleted place from places state
    setPlaces(places.filter((place) => place.id !== id));
  };

  return (
    <Box m={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Delete Place
      </Typography>
      <Box component="form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Place Name"
              variant="outlined"
              required
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={!placeName}
              fullWidth
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
      {places.length > 0 && (
        <TableContainer component={Paper} mt={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Place Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {places.map((place) => (
                <TableRow key={place.id}>
                  <TableCell>{place.name}</TableCell>
                  <TableCell>{place.description}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(place.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default DeletePlace;
