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

const DeleteCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);

  const handleSearch = () => {
    // api fetch for getCategoryDetails goes here
    // update categories state with the response data
    const sampleData = [
      {
        id: 1,
        name: 'Category 1',
        description: 'This is category 1',
      },
      {
        id: 2,
        name: 'Category 2',
        description: 'This is category 2',
      },
    ];
    setCategories(sampleData);
  };

  const handleDelete = (id) => {
    // api fetch for deleteCategory goes here
    // remove the deleted category from categories state
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <Box m={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Delete Category
      </Typography>
      <Box component="form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Category Name"
              variant="outlined"
              required
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={!categoryName}
              fullWidth
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
      {categories.length > 0 && (
        <TableContainer component={Paper} mt={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(category.id)}>
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

export default DeleteCategory;
