import React, { useEffect, useState } from 'react';

import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Modal
} from '@mui/material';

import { addPlaceAPI, baseAPI, deleteUpdatePlace, getAllCategories, getAllIslands } from "../../GlobalConstants";
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import LocationForm from './FormElements/LocationForm';
import ImageForm from './FormElements/ImageForm';
import TimingForm from './FormElements/TimingForm';
import CategoryForm from './FormElements/CategoryForm';
import IslandForm from './FormElements/IslandForm';
import BestTimeToVisitForm from './FormElements/BestTimeToVisitForm';
import ExternalLinksForm from './FormElements/ExternalLinksForm';
import DosAndDontsForm from './FormElements/DosAndDontsForm';
import ActivitiesForm from './FormElements/ActivitiesForm';
import EntryCostForm from './FormElements/EntryCostForm';
import UpdateImagesForm from './FormElements/UpdateImagesForm';

const initialState = {
  name: '',
  description: '',
  entry: true,
  entry_cost: [
  ],
  location: {
    type: "Point",
    coordinates: [
      "",
      ""
    ]
  },
  address: { street: '', city: '', state: 'Andman and Nicobar Islands', zip: '', country: 'India' },
  island: '',
  activities: [],
  categories: [],
  external_links: [],
  timings: [
    { day: 'Monday', open_time: '', close_time: '' },
    { day: 'Tuesday', open_time: '', close_time: '' },
    { day: 'Wednesday', open_time: '', close_time: '' },
    { day: 'Thursday', open_time: '', close_time: '' },
    { day: 'Friday', open_time: '', close_time: '' },
    { day: 'Saturday', open_time: '', close_time: '' },
    { day: 'Sunday', open_time: '', close_time: '' },
  ],
  do_s: [],
  dont_s: [],
  images: [],
  howToReach: '',
  bestTimeToVisit: {
    startMonth: '',
    endMonth: ''
  }
};


const UpdatePlaceForm = ({ jumpToTab }) => {
  const [formValues, setFormValues] = useState(initialState);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [islands, setIslands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [openModal, setOpenModal] = useState(false);


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  var place

  useEffect(() => {
    if (!localStorage.getItem('place')) {
      jumpToTab(0);
    }
    else {
      place = JSON.parse(localStorage.getItem('place'));
      if (!place.bestTimeToVisit) {
        place.bestTimeToVisit = {
          startMonth: 'January',
          endMonth: 'December'
        }
      }
      setFormValues(place)
    }

  }, [])

  //should be removed later
  useEffect(() => {
    console.log(formValues);
  }, [formValues])

  useEffect(() => {
    fetchCategoryData();
    fetchIslandData();
  }, [])

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };



  //address part functions 
  const handleAddressChange = (event) => {
    const { value, name } = event.target;

    setFormValues((prevValues) => {
      const address = prevValues.address;
      address[name] = value;
      return { ...prevValues, address };
    });
  }

  //submit the place
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    var data = formValues; 

    try {
      var response = await axios.put(`${baseAPI}${deleteUpdatePlace}/${formValues._id.toString()}`, {
        data
      }, {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      let successAlert = {
        errorType: 'success',
        message: "Place has been successfully updated."
      }

      setError(successAlert);
      handleClick();
      console.log(response);

    } catch (error) {

      console.log(error);
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


  const fetchIslandData = async () => {
    try {
      const response = await axios.get(`${baseAPI}${getAllIslands}`, {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      });

      setIslands(response.data.islands);


    } catch (error) {


      if (Math.floor(error.response.status / 100) === 5) {
        error.response.data.errorType = 'warning';
      } else {
        error.response.data.errorType = 'error';
      }

      setError(error.response.data);

      handleClick();
    }
  }

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(`${baseAPI}${getAllCategories}`, {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      });

      setCategories(response.data.categories);


    } catch (error) {


      if (Math.floor(error.response.status / 100) === 5) {
        error.response.data.errorType = 'warning';
      } else {
        error.response.data.errorType = 'error';
      }

      setError(error.response.data);

      handleClick();
    }
  }


  return (
    <>
      <Container maxWidth="md">
        <Box mt={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h1" gutterBottom>
                Add Place
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {/* name */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      name='name'
                      required
                      value={formValues.name}
                      onChange={handleFormChange}
                      variant="outlined"
                    />
                  </Grid>
                  {/* description */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name='description'
                      required
                      value={formValues.description}
                      onChange={handleFormChange}
                      variant="outlined"
                      multiline
                      rows={4}
                    />
                  </Grid>
                  {/* entry and entry costs */}
                  <EntryCostForm formValues={formValues}
                    setFormValues={setFormValues}
                    setError={setError}
                    handleClick={handleClick}
                  />

                  {/* how to reach */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="How To Reach"
                      name='howToReach'
                      required
                      value={formValues.howToReach}
                      onChange={handleFormChange}
                      variant="outlined"
                      multiline
                      rows={4}
                    />
                  </Grid>
                  {/* address */}
                  <Box sx={{ mt: 2, ml: 2 }}>
                    <Typography variant="h6">Address</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          id="street"
                          name="street"
                          label="Street"
                          required
                          value={formValues.address.street}
                          onChange={handleAddressChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="city"
                          name="city"
                          label="City"
                          required
                          value={formValues.address.city}
                          onChange={handleAddressChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="state"
                          name="state"
                          label="State"
                          value={formValues.address.state}
                          disabled
                          onChange={handleAddressChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="zipCode"
                          name="zip"
                          label="Zip Code"
                          required
                          value={formValues.address.zip}
                          onChange={handleAddressChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="country"
                          name="country"
                          label="Country"
                          disabled
                          value={formValues.address.country}
                          onChange={handleAddressChange}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  {/* activites */}
                  <ActivitiesForm formValues={formValues}
                    setFormValues={setFormValues}
                    setError={setError}
                    handleClick={handleClick}
                  />
                  {/* do's and don'ts */}
                  <DosAndDontsForm formValues={formValues}
                    setFormValues={setFormValues}
                    setError={setError}
                    handleClick={handleClick}
                  />

                  {/* external links */}
                  <ExternalLinksForm formValues={formValues}
                    setFormValues={setFormValues}
                    setError={setError}
                    handleClick={handleClick}
                  />

                  {/* best time to visit */}
                  <BestTimeToVisitForm formValues={formValues}
                    setFormValues={setFormValues}
                    setError={setError}
                    handleClick={handleClick}
                  />

                  {/* island  */}
                  <IslandForm formValues={formValues}
                    setFormValues={setFormValues}
                    setError={setError}
                    handleClick={handleClick}
                    islands={islands}
                  />

                  {/* categories  */}
                  <CategoryForm formValues={formValues}
                    setFormValues={setFormValues}
                    setError={setError}
                    handleClick={handleClick}
                    categories={categories}
                  />

                  {/* timings */}

                  <TimingForm formValues={formValues}
                    setFormValues={setFormValues}
                    setError={setError}
                    handleClick={handleClick} />



                  <div style={{marginTop:20, marginLeft:20}}>
                    <Button variant='contained' onClick={() => setOpenModal(true)}>Open Image Update Form</Button>
                    <Modal open={openModal} onClose={() => setOpenModal(false)}>
                      <UpdateImagesForm
                        formValues={formValues}
                        setFormValues={setFormValues}
                        setError={setError}
                        handleClick={handleClick}
                        setOpenModal={setOpenModal}
                      />
                    </Modal>
                  </div>

                  {/* images */}
                  {/* <ImageForm
                    formValues={formValues}
                    setFormValues={setFormValues}
                    setError={setError}
                    handleClick={handleClick}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                  /> */}


                  {/* location  */}
                  <LocationForm
                    formValues={formValues}
                    setFormValues={setFormValues}
                    setError={setError}
                    handleClick={handleClick}
                  />


                  <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
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
                        Update Place
                      </Button>

                    }
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Container>


      {error && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error.errorType} sx={{ width: '100%' }}>
          {error.message}
        </Alert>
      </Snackbar>}
    </>
  );
};

export default UpdatePlaceForm;
