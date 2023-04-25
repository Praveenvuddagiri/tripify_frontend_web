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
import EditIcon from '@mui/icons-material/Edit';

const UpdateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [updatedCategories, setUpdatedCategories] = useState([]);
  const [confirmation, setConfirmation] = useState(false);

  const handleSearch = () => {
    // api fetch for getCategoryDetails goes here
    // update categories state with the response data
    const sampleData = [
      {
        id: 1,
        name: 'Category 1',
        description: 'This is category 1',
        image: 'image1.png',
      },
      {
        id: 2,
        name: 'Category 2',
        description: 'This is category 2',
        image: 'image2.png',
      },
    ];
    setCategories(sampleData);
  };

  const handleEdit = (id, field, value) => {
    // update the category field in the updatedCategories state
    const updatedCategory = updatedCategories.find((category) => category.id === id) || {};
    setUpdatedCategories([
      ...updatedCategories.filter((category) => category.id !== id),
      {
        id,
        ...updatedCategory,
        [field]: value,
      },
    ]);
  };

  const handleUpdate = () => {
    // api fetch for updateCategory goes here with the updatedCategories state data
    setConfirmation(true);
  };

  return (
    <Box m={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Update Category
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
        <Box mt={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      {category.id === updatedCategories.find((updatedCategory) => updatedCategory.id === category.id)?.id
                        ? (
                          <TextField
                            fullWidth
                            variant="outlined"
                            value={updatedCategories.find((updatedCategory) => updatedCategory.id === category.id)?.name || ''}
                            onChange={(e) => handleEdit(category.id, 'name', e.target.value)}
                          />
                        )
                        : category.name}
                    </TableCell>
                    <TableCell>
                      {category.id === updatedCategories.find((updatedCategory) => updatedCategory.id === category.id)?.id
                        ? (
                          <TextField
                          fullWidth
                          variant="outlined"
                          value={updatedCategories.find((updatedCategory) => updatedCategory.id === category.id)?.description || ''}
                          onChange={(e) => handleEdit(category.id, 'description', e.target.value)}
                          />
                          )
                          : category.description}
                          </TableCell>
                          <TableCell>
                          {category.id === updatedCategories.find((updatedCategory) => updatedCategory.id === category.id)?.id
                          ? (
                          <TextField
                          fullWidth
                          variant="outlined"
                          value={updatedCategories.find((updatedCategory) => updatedCategory.id === category.id)?.image || ''}
                          onChange={(e) => handleEdit(category.id, 'image', e.target.value)}
                          />
                          )
                          : category.image}
                          </TableCell>
                          <TableCell>
                          {category.id === updatedCategories.find((updatedCategory) => updatedCategory.id === category.id)?.id
                          ? (
                          <IconButton
                          color="primary"
                          onClick={() => {
                          setUpdatedCategories(updatedCategories.filter((updatedCategory) => updatedCategory.id !== category.id));
                          }}
                          >
                          <EditIcon />
                          </IconButton>
                          )
                          : (
                          <IconButton
                          color="primary"
                          onClick={() => {
                          const updatedCategory = updatedCategories.find((updatedCategory) => updatedCategory.id === category.id) || {};
                          setUpdatedCategories([
                          ...updatedCategories.filter((updatedCategory) => updatedCategory.id !== category.id),
                          {
                          id: category.id,
                          ...updatedCategory,
                          name: category.name,
                          description: category.description,
                          image: category.image,
                          },
                          ]);
                          }}
                          >
                          <EditIcon />
                          </IconButton>
                          )}
                          </TableCell>
                          </TableRow>
                          ))}
                          </TableBody>
                          </Table>
                          </TableContainer>
                          <Box mt={3}>
                          <Button
                          variant="contained"
                          color="primary"
                          onClick={handleUpdate}
                          disabled={updatedCategories.length === 0}
                          >
                          Update
                          </Button>
                          </Box>
                          {confirmation && (
                          <Box mt={3}>
                          <Typography variant="h6" align="center">
                          Category has been updated!
                          </Typography>
                          </Box>
                          )}
                          </Box>
                          )}
                          </Box>
                          );
                          };
                          
                        export default UpdateCategory;
