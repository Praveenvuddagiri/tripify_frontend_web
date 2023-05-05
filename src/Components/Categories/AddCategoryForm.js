import { Alert, Box, Button, Grid, Snackbar, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { addCategoryAPI, baseAPI } from '../../GlobalConstants';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LoadingButton } from '@mui/lab';


const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${baseAPI}${addCategoryAPI}`, {
        "name": categoryName,
        "description": categoryDesc,
        "image": categoryImage

      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      let successAlert = {
        errorType: 'success',
        message: "Category has been successfully added"
      }

      setError(successAlert);
      handleClick();

    } catch (error) {


      if (Math.floor(error.response.status / 100) === 5) {
        error.response.data.errorType = 'warning';
      } else {
        error.response.data.errorType = 'error';
      }

      setError(error.response.data);
      handleClick();


    } finally {
      setIsLoading(false);
    }
  };



  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCategoryImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };


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
      <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" marginTop='15px'>
        <Typography variant="h5" align="center" gutterBottom>
          Add Category
        </Typography>
        <Box component="form" onSubmit={handleSubmit} container justify="center" encType='multipart/form-data'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                required
                name="CategoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
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
                rows={4}
                value={categoryDesc}
                onChange={(e) => setCategoryDesc(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Box component="label" htmlFor="category-image-upload" display="block">
                <Button
                  variant="contained"
                  fullWidth
                  color='success'
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Image
                </Button>
                <input
                  type="file"
                  id="category-image-upload"
                  name="CategoryImage"
                  accept="image/*"
                  required
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </Box>
              {imagePreview && (
                <Box mt={1} display="flex" justifyContent="center" alignItems="center">
                  <img src={imagePreview} alt="Category Preview" style={{ maxWidth: "100%", width: "300px" }} />
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              {isLoading ?
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  fullWidth
                  disabled
                  style={{ height: '40px' }}
                >
                  <span>disabled</span>
                </LoadingButton>
                :

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Add Category
                </Button>

              }
            </Grid>
          </Grid>
        </Box>
      </Box>
      {error && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error.errorType} sx={{ width: '100%' }}>
          {error.message}
        </Alert>
      </Snackbar>}
    </>
  );
};

export default AddCategoryForm;