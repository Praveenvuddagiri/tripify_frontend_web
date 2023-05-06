import React, { useEffect, useState } from 'react';

import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  Snackbar,
  Alert,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  IconButton,
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { addPlaceAPI, baseAPI, getAllCategories, getAllIslands } from "../../GlobalConstants";
import axios from 'axios';
import { LoadingButton } from '@mui/lab';

const initialState = {
  name: '',
  description: '',
  entry: true,
  entryCost: [
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
  externalLinks: [],
  timings: [
    { day: 'Monday', openTime: '', closeTime: '' },
    { day: 'Tuesday', openTime: '', closeTime: '' },
    { day: 'Wednesday', openTime: '', closeTime: '' },
    { day: 'Thursday', openTime: '', closeTime: '' },
    { day: 'Friday', openTime: '', closeTime: '' },
    { day: 'Saturday', openTime: '', closeTime: '' },
    { day: 'Sunday', openTime: '', closeTime: '' },
  ],
  dos: [],
  donts: [],
  images: [],
  howToReach: '',
  bestTimeToVisit: {
    startMonth: '',
    endMonth: ''
  }
};


const AddPlace = () => {
  const [formValues, setFormValues] = useState(initialState);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [islands, setIslands] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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

  //cost part functions 
  const handleEntryChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value === true ? true : false,
    }));
    console.log(name + "  " + value);
  };

  const handleEntryCostChange = (event, index) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => {
      const entryCost = [...prevValues.entryCost];

      if (name === 'cost') {
        console.log(value);
        if (isNaN(value)) {
          let e = { errorType: "error", message: "The cost should be number type. Ref: index-" + index }
          setError(e);
          handleClick();
          const entryCost = [...prevValues.entryCost];
          entryCost[index][name] = '';
          return { ...prevValues, entryCost: entryCost };
        }
      }
      entryCost[index][name] = value;
      return { ...prevValues, entryCost: entryCost };
    });
  };

  const handleAddEntryCost = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      entryCost: [
        ...prevValues.entryCost,
        { category: "", cost: "" }
      ],
    }));
  };

  const handleRemoveEntryCost = (index) => {
    setFormValues((prevValues) => {
      const entryCost = [...prevValues.entryCost];
      entryCost.splice(index, 1);
      return { ...prevValues, entryCost: entryCost };
    });
  };

  //address part functions 
  const handleAddressChange = (event) => {
    const { value, name } = event.target;

    setFormValues((prevValues) => {
      const address = [...prevValues.address];
      address[name] = value;
      return { ...prevValues, address };
    });
  }

  //submit the place
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${baseAPI}${addPlaceAPI}`, {
        formValues
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
        message: "Island has been successfully added"
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


    }
    finally {
      setIsLoading(false);
    }
  }

  //activites part functions 
  const handleActivityChange = (event, index) => {
    const { value } = event.target;
    setFormValues((prevValues) => {
      const activities = [...prevValues.activities];
      activities[index] = value;
      return { ...prevValues, activities };
    });
  };

  const handleAddActivity = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      activities: [...prevValues.activities, ""],
    }));
  };

  const handleActivityRemove = (index) => {
    setFormValues((prevValues) => {
      const activities = [...prevValues.activities];
      activities.splice(index, 1);
      return { ...prevValues, activities };
    });
  };

  // funtions for does and donts part 
  const handleDoChange = (event, index) => {
    const newDos = [...formValues.dos];
    newDos[index] = event.target.value;
    setFormValues({ ...formValues, dos: newDos });
  };

  const handleDontChange = (event, index) => {
    const newDonts = [...formValues.donts];
    newDonts[index] = event.target.value;
    setFormValues({ ...formValues, donts: newDonts });
  };

  const handleAddDo = () => {
    setFormValues({ ...formValues, dos: [...formValues.dos, ''] });
  };

  const handleAddDont = () => {
    setFormValues({ ...formValues, donts: [...formValues.donts, ''] });
  };

  const handleDoRemove = (index) => {
    const newDos = [...formValues.dos];
    newDos.splice(index, 1);
    setFormValues({ ...formValues, dos: newDos });
  };

  const handleDontRemove = (index) => {
    const newDonts = [...formValues.donts];
    newDonts.splice(index, 1);
    setFormValues({ ...formValues, donts: newDonts });
  };


  // functions for external links part 
  const handleExternalLinkChange = (event, index) => {
    const newLinks = [...formValues.externalLinks];
    newLinks[index][event.target.name] = event.target.value;
    setFormValues({ ...formValues, externalLinks: newLinks });
  };

  const handleAddExternalLink = () => {
    setFormValues({ ...formValues, externalLinks: [...formValues.externalLinks, { title: "", link: "" }] });
  };

  const handleRemoveExternalLink = (index) => {
    const newLinks = [...formValues.externalLinks];
    newLinks.splice(index, 1);
    setFormValues({ ...formValues, externalLinks: newLinks });
  };


  // function for best time to visit part 
  const handleBestTimeToVisitChange = (event) => {
    const { value, name } = event.target;
    const bestTimeToVisit = formValues.bestTimeToVisit;
    bestTimeToVisit[name] = value;
    setFormValues((prevValues) => ({
      ...prevValues,
      bestTimeToVisit
    }));
  };

  // for island and categories part 
  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setFormValues((prevFormValues) => {
      const updatedCategoryIds = prevFormValues.categories.includes(selectedCategoryId)
        ? prevFormValues.categories.filter((id) => id !== selectedCategoryId)
        : prevFormValues.categories.concat(selectedCategoryId);
      return {
        ...prevFormValues,
        categories: updatedCategoryIds,
      };
    });
  };


  const handleIslandChange = (event) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      island: event.target.value,
    }));
  };

  // functions for timing part 
  const handleTimingChange = (event, day, timeType) => {
    const updatedTimings = formValues.timings.map((timing) => {
      if (timing.day === day) {
        return {
          ...timing,
          [timeType]: event.target.value,
        };
      }
      return timing;
    });

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      timings: updatedTimings,
    }));
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i++) {
      const hour = i < 10 ? `0${i}` : i.toString();
      options.push(<MenuItem key={`hour-${hour}`} value={`${hour}:00`}>{`${hour}:00`}</MenuItem>);
    }
    return options;
  };

  // images 
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imagesArray = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImagePreview((prevImages) => [...prevImages, ...imagesArray]);

    var imgs = formValues.images;
    imgs = [...imgs, ...files];
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      images: imgs
    }))
  };

  const handleImageDelete = (index) => {
    setImagePreview((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
    var imgs = formValues.images;
    imgs = imgs.filter((_, i) => i !== index)
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      images: imgs
    }))

  };


  // locations
  const handleLocationChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      location: {
        ...prevFormValues.location,
        coordinates: [
          name === "longitude" ? value : prevFormValues.location.coordinates[0],
          name === "latitude" ? value : prevFormValues.location.coordinates[1],
        ],
      },
    }));
  };



  //load categories and islands

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
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>

                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="entry">Entry Paid</InputLabel>
                        <Select
                          labelId="entry"
                          id="entry"
                          name="entry"
                          label="Entry"
                          select
                          value={formValues.entry}
                          onChange={handleEntryChange}
                        >
                          <MenuItem value={false}>No</MenuItem>
                          <MenuItem value={true}>Yes</MenuItem>
                        </Select>
                      </FormControl>
                      {formValues.entry && (
                        <Box sx={{ marginLeft: "1rem" }}>
                          <Button
                            variant="contained"
                            onClick={handleAddEntryCost}
                            startIcon={<AddCircleRoundedIcon />}
                          >
                            Add Entry Cost
                          </Button>
                          {formValues.entryCost.map((cost, index) => (
                            <Box key={index} sx={{ display: "flex", alignItems: "center", marginTop: '20px' }}>
                              <TextField
                                name="category"
                                label="Category"
                                required
                                value={cost.category}
                                onChange={(event) => handleEntryCostChange(event, index)}
                                sx={{ marginLeft: "1rem" }}
                              />
                              <TextField
                                name="cost"
                                label="Cost"
                                value={cost.cost}
                                required
                                onChange={(event) => handleEntryCostChange(event, index)}
                                sx={{ marginLeft: "1rem" }}
                              />
                              <Button
                                variant="outlined"
                                onClick={() => handleRemoveEntryCost(index)}
                                startIcon={<RemoveCircleRoundedIcon />}
                                sx={{ marginLeft: "1rem" }}
                              >
                                Remove
                              </Button>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Grid>

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
                          name="zipCode"
                          label="Zip Code"
                          required
                          value={formValues.address.zipCode}
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
                  <Grid sx={{ mt: 4, ml: 2 }} sm={12}>
                    <Typography variant="h6">Activities</Typography>
                    <Grid container spacing={2} sm={12}>
                      <Grid item xs={12} >
                        <FormGroup>
                          {formValues.activities.map((activity, index) => (
                            <Box
                              key={index}
                              sx={{ display: "flex", alignItems: "center", mt: 2 }}
                            >
                              <TextField
                                fullWidth
                                id={`activity-${index}`}
                                name={`activity-${index}`}
                                label={`Activity ${index + 1}`}
                                required
                                value={activity}
                                onChange={(event) => handleActivityChange(event, index)}
                              />
                              <Box sx={{ marginLeft: "1rem" }}>
                                <Button
                                  variant="contained"
                                  onClick={() => handleActivityRemove(index)}
                                  startIcon={<RemoveCircleRoundedIcon />}
                                >
                                  Remove
                                </Button>
                              </Box>
                            </Box>
                          ))}
                          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                            <Button
                              variant="contained"
                              onClick={handleAddActivity}
                              startIcon={<AddCircleRoundedIcon />}
                            >
                              Add Activity
                            </Button>
                          </Box>
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* do's and don'ts */}
                  <Grid sx={{ mt: 4, ml: 2 }} sm={12}>
                    <Typography variant="h6">Do's and Don'ts</Typography>
                    <Grid container spacing={2} sm={12}>
                      <Grid item xs={12} >
                        <FormGroup>
                          {formValues.dos.map((doItem, index) => (
                            <Box
                              key={index}
                              sx={{ display: "flex", alignItems: "center", mt: 2 }}
                            >
                              <TextField
                                fullWidth
                                id={`do-${index}`}
                                name={`do-${index}`}
                                label={`Do ${index + 1}`}
                                required
                                value={doItem}
                                onChange={(event) => handleDoChange(event, index)}
                              />
                              <Box sx={{ marginLeft: "1rem" }}>
                                <Button
                                  variant="contained"
                                  onClick={() => handleDoRemove(index)}
                                  startIcon={<RemoveCircleRoundedIcon />}
                                >
                                  Remove
                                </Button>
                              </Box>
                            </Box>
                          ))}
                          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                            <Button
                              variant="contained"
                              onClick={handleAddDo}
                              startIcon={<AddCircleRoundedIcon />}
                            >
                              Add Do
                            </Button>
                          </Box>
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          {formValues.donts.map((dontItem, index) => (
                            <Box
                              key={index}
                              sx={{ display: "flex", alignItems: "center", mt: 2 }}
                            >
                              <TextField
                                fullWidth
                                id={`dont-${index}`}
                                name={`dont-${index}`}
                                label={`Don't ${index + 1}`}
                                required
                                value={dontItem}
                                onChange={(event) => handleDontChange(event, index)}
                              />
                              <Box sx={{ marginLeft: "1rem" }}>
                                <Button
                                  variant="contained"
                                  onClick={() => handleDontRemove(index)}
                                  startIcon={<RemoveCircleRoundedIcon />}
                                >
                                  Remove
                                </Button>
                              </Box>
                            </Box>
                          ))}
                          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                            <Button
                              variant="contained"
                              onClick={handleAddDont}
                              startIcon={<AddCircleRoundedIcon />}
                            >
                              Add Don't
                            </Button>
                          </Box>
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* external links */}
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom>
                      External Links
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ ml: 2 }}>
                        <Button
                          variant="contained"
                          onClick={handleAddExternalLink}
                          startIcon={<AddCircleRoundedIcon />}
                        >
                          Add External Link
                        </Button>
                        {formValues.externalLinks.map((link, index) => (
                          <Box key={index} sx={{ display: "flex", alignItems: "center", marginTop: '20px' }}>
                            <TextField
                              name="title"
                              label="Title"
                              required
                              value={link.title}
                              onChange={(event) => handleExternalLinkChange(event, index)}
                              sx={{ marginLeft: "1rem" }}
                            />
                            <TextField
                              name="link"
                              label="Link"
                              required
                              value={link.link}
                              onChange={(event) => handleExternalLinkChange(event, index)}
                              sx={{ marginLeft: "1rem" }}
                            />
                            <Button
                              variant="outlined"
                              onClick={() => handleRemoveExternalLink(index)}
                              startIcon={<RemoveCircleRoundedIcon />}
                              sx={{ marginLeft: "1rem" }}
                            >
                              Remove
                            </Button>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Grid>

                  {/* best time to visit */}
                  <Box sx={{ mt: 2, ml: 2 }}>
                    <Typography variant="h6">Best Time To Visit</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormControl variant="standard" sx={{ m: 2, minWidth: 200 }}>
                          <InputLabel id="startMonth">Start Month</InputLabel>
                          <Select
                            labelId="startMonth"
                            id="startMonth"
                            name="startMonth"
                            label="Start Month"
                            select
                            value={formValues.bestTimeToVisit.startMonth}
                            onChange={handleBestTimeToVisitChange}
                          >
                            <MenuItem value="January">January</MenuItem>
                            <MenuItem value="February">February</MenuItem>
                            <MenuItem value="March">March</MenuItem>
                            <MenuItem value="April">April</MenuItem>
                            <MenuItem value="May">May</MenuItem>
                            <MenuItem value="June">June</MenuItem>
                            <MenuItem value="July">July</MenuItem>
                            <MenuItem value="August">August</MenuItem>
                            <MenuItem value="September">September</MenuItem>
                            <MenuItem value="October">October</MenuItem>
                            <MenuItem value="November">November</MenuItem>
                            <MenuItem value="December">December</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl variant="standard" sx={{ m: 2, minWidth: 200 }}>
                          <InputLabel id="endMonth">End Month</InputLabel>
                          <Select
                            labelId="endMonth"
                            id="endMonth"
                            name="endMonth"
                            label="End Month"
                            select
                            value={formValues.bestTimeToVisit.endMonth}
                            onChange={handleBestTimeToVisitChange}
                          >
                            <MenuItem value="January">January</MenuItem>
                            <MenuItem value="February">February</MenuItem>
                            <MenuItem value="March">March</MenuItem>
                            <MenuItem value="April">April</MenuItem>
                            <MenuItem value="May">May</MenuItem>
                            <MenuItem value="June">June</MenuItem>
                            <MenuItem value="July">July</MenuItem>
                            <MenuItem value="August">August</MenuItem>
                            <MenuItem value="September">September</MenuItem>
                            <MenuItem value="October">October</MenuItem>
                            <MenuItem value="November">November</MenuItem>
                            <MenuItem value="December">December</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* island  */}

                  <Box sx={{ mt: 2, ml: 2 }}>
                    <Typography variant="h6" sx={{ ml: 2 }}>Island</Typography>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6}>
                        <FormControl variant="standard" sx={{ m: 2, minWidth: 200 }}>
                          <InputLabel id="island-label">Island</InputLabel>
                          <Select
                            labelId="island-label"
                            id="island"
                            name="island"
                            label="Island"
                            value={formValues.island}
                            onChange={handleIslandChange}
                          >
                            {islands.map((island) => (
                              <MenuItem key={island._id} value={island._id}>
                                {island.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* categories  */}
                  <Box sx={{ mt: 2, ml: 2 }}>
                    <Typography variant="h6">Categories</Typography>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={12}>
                        {categories.map((category) => {
                          const isChecked = Array.isArray(formValues.categories) && formValues.categories.includes(category._id);
                          return (
                            <FormControlLabel
                              key={category._id}
                              control={
                                <Checkbox
                                  name={category.name}
                                  checked={isChecked}
                                  onChange={handleCategoryChange}
                                  value={category._id}
                                />
                              }
                              label={category.name}
                            />
                          );
                        })}
                      </Grid>
                    </Grid>
                  </Box>

                  {/* timings */}

                  <Box sx={{ mt: 2, ml: 2 }}>
                    <Typography variant="h6">Timings</Typography>

                    <Grid container spacing={2} alignItems="center">
                      {formValues.timings.map((timing) => (
                        <React.Fragment key={timing.day}>
                          <Grid item xs={12} sm={6}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                              <InputLabel id={`${timing.day}-openTime-label`}>{timing.day} Open Time</InputLabel>
                              <Select
                                labelId={`${timing.day}-openTime-label`}
                                id={`${timing.day}-openTime`}
                                name={`${timing.day}-openTime`}
                                label={`${timing.day} Open Time`}
                                value={timing.openTime}
                                onChange={(event) => handleTimingChange(event, timing.day, 'openTime')}
                              >
                                <MenuItem value="">None</MenuItem>
                                {generateTimeOptions()}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                              <InputLabel id={`${timing.day}-closeTime-label`}>{timing.day} Close Time</InputLabel>
                              <Select
                                labelId={`${timing.day}-closeTime-label`}
                                id={`${timing.day}-closeTime`}
                                name={`${timing.day}-closeTime`}
                                label={`${timing.day} Close Time`}
                                value={timing.closeTime}
                                onChange={(event) => handleTimingChange(event, timing.day, 'closeTime')}
                              >
                                <MenuItem value="">None</MenuItem>
                                {generateTimeOptions()}
                              </Select>
                            </FormControl>
                          </Grid>
                        </React.Fragment>
                      ))}
                    </Grid>
                  </Box>

                  {/* images */}

                  <Box sx={{ mt: 2, ml: 2 }}>
                    <Typography variant="h6">Images</Typography>
                    <input
                      accept="image/*"
                      id="image-upload"
                      type="file"
                      multiple
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />
                    <label htmlFor="image-upload">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<AddCircleRoundedIcon />}
                        sx={{ mt: 2 }}
                      >
                        Add Images
                      </Button>
                    </label>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      {imagePreview.map((image, index) => (
                        <Grid item xs={4} key={index}>
                          <Paper
                            sx={{
                              position: 'relative',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: 200,
                              overflow: 'hidden',
                            }}
                          >
                            <img
                              src={image.preview}
                              alt={image.file.name}
                              style={{ height: '100%', width: 'auto' }}
                            />
                            <IconButton
                              aria-label="delete"
                              sx={{ position: 'absolute', top: 5, right: 5 }}
                              onClick={() => handleImageDelete(index)}

                            >
                              <DeleteRoundedIcon />
                            </IconButton>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>


                  {/* location  */}
                  <Box sx={{ mt: 2, ml: 2 }} >
                    <Typography variant="h6">Location</Typography>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={12} style={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ mt: 2, mr: 3 }}>
                          <TextField
                            label="Longitude"
                            name="longitude"
                            value={formValues.location.coordinates[0]}
                            onChange={handleLocationChange}
                            type="number"
                            required
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Latitude"
                            name="latitude"
                            value={formValues.location.coordinates[1]}
                            onChange={handleLocationChange}
                            type="number"
                            required
                          />

                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

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
                        Add Place
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

export default AddPlace;
