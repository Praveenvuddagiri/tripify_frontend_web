import React, { useEffect, useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Icon from "@mdi/react";
import { mdiSquareCircle } from "@mdi/js";

import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Paper,
  Snackbar,
  Alert,
  IconButton,
  Switch,
  FormControlLabel,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  addRestaurantByServiceProviderAPI,
  baseAPI,
  getAllIslands,
} from "../../GlobalConstants";
import axios from "axios";
import { LoadingButton } from "@mui/lab";

const AddRestuarant = () => {
  const [restaurant, setRestaurant] = useState({
    name: "",
    description: "",
    images: [],
    address: {
      street: "",
      city: "",
      state: "Andaman and Nicobar Islands",
      zip: "",
    },
    contact: {
      phone: "",
      email: "",
      website: "",
    },
    menu: null,
    governmentAuthorizedLicense: null,
    isVeg: false,
    island: "",
    location: {
      type: "Point",
      coordinates: ["", ""],
    },
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [islands, setIslands] = useState([]);
  const [locationUrl, setLocationUrl] = useState("");
  const [imagePreview, setImagePreview] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRestaurant((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchIslandData = async () => {
    try {
      const response = await axios.get(`${baseAPI}${getAllIslands}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      });

      setIslands(response.data.islands);
    } catch (error) {
      if (Math.floor(error.response.status / 100) === 5) {
        error.response.data.errorType = "warning";
      } else {
        error.response.data.errorType = "error";
      }

      setError(error.response.data);

      handleClick();
    }
  };

  const handleLocationChange = (event) => {
    const { name, value } = event.target;
    setRestaurant((prevFormValues) => ({
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

  // handle get coordinates button click
  const handleGetCoordinatesClick = () => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = locationUrl.match(regex);
    if (match) {
      const latitude = match[1];
      const longitude = match[2];
      setRestaurant((prevFormValues) => ({
        ...prevFormValues,
        location: {
          ...prevFormValues.location,
          coordinates: [longitude, latitude],
        },
      }));
    } else {
      const e = { errorType: "error", message: "Invalid URL" };
      setError(e);
      handleClick();
    }
  };

  const handleAddressChange = (e) => {
    const add = restaurant.address;

    add[e.target.name] = e.target.value;

    setRestaurant((prevCompany) => ({
      ...prevCompany,
      address: add,
    }));
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleContactChange = (e) => {
    const con = restaurant.contact;

    con[e.target.name] = e.target.value;

    setRestaurant((prevCompany) => ({
      ...prevCompany,
      contact: con,
    }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setRestaurant((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    var data = JSON.stringify(restaurant);

    try {
      await axios.post(
        `${baseAPI}${addRestaurantByServiceProviderAPI}`,
        {
          images: restaurant.images,
          governmentAuthorizedLicense: restaurant.governmentAuthorizedLicense,
          menu: restaurant.menu,
          data,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let successAlert = {
        errorType: "success",
        message: "Restaurant has been successfully added",
      };

      setError(successAlert);
      handleClick();
    } catch (error) {
      console.log(error);
      if (Math.floor(error.response.status / 100) === 5) {
        error.response.data.errorType = "warning";
      } else {
        error.response.data.errorType = "error";
      }

      setError(error.response.data);
      handleClick();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIslandData();
  }, []);

  useEffect(() => {
    console.log(restaurant);
  }, [restaurant]);

  // images
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imagesArray = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImagePreview((prevImages) => [...prevImages, ...imagesArray]);

    var imgs = restaurant.images;
    imgs = [...imgs, ...files];
    setRestaurant((prevFormValues) => ({
      ...prevFormValues,
      images: imgs,
    }));
  };

  const handleImageDelete = (index) => {
    setImagePreview((prevImages) => prevImages.filter((_, i) => i !== index));
    var imgs = restaurant.images;
    imgs = imgs.filter((_, i) => i !== index);
    setRestaurant((prevFormValues) => ({
      ...prevFormValues,
      images: imgs,
    }));
  };

  const handleIsVegChange = (event) => {
    setRestaurant((prevState) => ({
      ...prevState,
      isVeg: event.target.checked,
    }));
  };

  const handleIslandChange = (event) => {
    setRestaurant((prevFormValues) => ({
      ...prevFormValues,
      island: event.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Add a new restaurant</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Restaurant name"
              value={restaurant.name}
              onChange={handleChange}
              fullWidth
              required
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="description"
              label="Restaurant description"
              value={restaurant.description}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={4}
              error={Boolean(errors.description)}
              helperText={errors.description}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={restaurant.isVeg}
                  onChange={handleIsVegChange}
                  name="isVeg"
                  color="primary"
                />
              }
              label={
                restaurant.isVeg ? (
                  <Typography>
                    <IconButton>
                      <Icon path={mdiSquareCircle} size={1.5} color="green" />
                    </IconButton>{" "}
                    {"Pure Vegetarian"}
                  </Typography>
                ) : (
                  <Typography>
                    <IconButton>
                      <Icon path={mdiSquareCircle} size={1.5} color="red" />
                    </IconButton>{" "}
                    {"Non Vegetarian"}
                  </Typography>
                )
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Image</Typography>

            <input
              accept="images/*"
              id="images-upload"
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={handleImageChange}
              name="images"
            />
            <label htmlFor="images-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<AddCircleRoundedIcon />}
                sx={{ mt: 2 }}
              >
                Add Restaurant Images
              </Button>
            </label>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {imagePreview.map((image, index) => (
                <Grid item xs={4} key={index}>
                  <Paper
                    sx={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 200,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={image.preview}
                      alt={image.file.name}
                      style={{ height: "100%", width: "auto" }}
                    />
                    <IconButton
                      aria-label="delete"
                      sx={{ position: "absolute", top: 5, right: 5 }}
                      onClick={() => handleImageDelete(index)}
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Location</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid
                item
                xs={12}
                sm={12}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  sx={{ mt: 2, mr: 3, width: "70%" }}
                  fullWidth
                  label="URL"
                  name="locationUrl"
                  type="text"
                  value={locationUrl}
                  onChange={(e) => setLocationUrl(e.target.value)}
                  sm={8}
                />
                <Button
                  sx={{ mt: 2, mr: 3, width: "25%" }}
                  style={{ marginLeft: "20px" }}
                  variant="outlined"
                  onClick={handleGetCoordinatesClick}
                >
                  Get Coordinates
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <TextField
                  label="Longitude"
                  name="longitude"
                  value={restaurant.location.coordinates[0]}
                  onChange={handleLocationChange}
                  type="number"
                  required
                  disabled
                />
                <TextField
                  label="Latitude"
                  name="latitude"
                  value={restaurant.location.coordinates[1]}
                  onChange={handleLocationChange}
                  type="number"
                  required
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <FormControl variant="standard" sx={{ minWidth: 300 }}>
                  <InputLabel id="island-label">Island</InputLabel>
                  <Select
                    labelId="island-label"
                    id="island"
                    name="island"
                    label="Island"
                    value={restaurant.island}
                    onChange={handleIslandChange}
                  >
                    {islands &&
                      islands.map((island) => (
                        <MenuItem key={island._id} value={island._id}>
                          {island.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Address</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="street"
              label="Street address"
              value={restaurant.address.street}
              onChange={handleAddressChange}
              fullWidth
              required
              error={Boolean(errors.address?.street)}
              helperText={errors.address?.street}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="city"
              label="City"
              value={restaurant.address.city}
              onChange={handleAddressChange}
              fullWidth
              required
              error={Boolean(errors.address?.city)}
              helperText={errors.address?.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="state"
              label="State"
              value={restaurant.address.state}
              onChange={handleAddressChange}
              fullWidth
              disabled
              error={Boolean(errors.address?.state)}
              helperText={errors.address?.state}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="zip"
              label="Zip code"
              value={restaurant.address.zip}
              onChange={handleAddressChange}
              fullWidth
              required
              error={Boolean(errors.address?.zip)}
              helperText={errors.address?.zip}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Contact Details</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="phone"
              label="Contact phone"
              value={restaurant.contact.phone}
              onChange={handleContactChange}
              type="number"
              fullWidth
              required
              error={Boolean(errors.contact?.phone)}
              helperText={errors.contact?.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Contact email"
              value={restaurant.contact.email}
              onChange={handleContactChange}
              type="email"
              fullWidth
              required
              error={Boolean(errors.contact?.email)}
              helperText={errors.contact?.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="website"
              label="Contact website"
              value={restaurant.contact.website}
              onChange={handleContactChange}
              fullWidth
              error={Boolean(errors.contact?.website)}
              helperText={errors.contact?.website}
            />
          </Grid>

          <Grid item xs={12}>
            <input
              accept=".pdf"
              id="govt-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              name="governmentAuthorizedLicense"
            />
            <label htmlFor="govt-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<AddCircleRoundedIcon />}
                sx={{ mt: 2 }}
              >
                Add Government Authorized License
              </Button>
            </label>
            {restaurant.governmentAuthorizedLicense && (
              <Grid
                item
                xs={7}
                key={restaurant.governmentAuthorizedLicense.name}
                mt={2}
              >
                <Paper
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200,
                    overflow: "hidden",
                  }}
                >
                  <embed
                    src={URL.createObjectURL(
                      restaurant.governmentAuthorizedLicense
                    )}
                    type="application/pdf"
                    width="100%"
                    height="auto"
                  />
                </Paper>
              </Grid>
            )}
          </Grid>

          <Grid item xs={12}>
            <input
              accept=".pdf"
              id="menu-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              name="menu"
            />
            <label htmlFor="menu-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<AddCircleRoundedIcon />}
                sx={{ mt: 2 }}
              >
                Add Menu
              </Button>
            </label>
            {restaurant.menu && (
              <Grid item xs={7} key={restaurant.menu.name} mt={2}>
                <Paper
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200,
                    overflow: "hidden",
                  }}
                >
                  <embed
                    src={URL.createObjectURL(restaurant.menu)}
                    type="application/pdf"
                    width="100%"
                    height="auto"
                  />
                </Paper>
              </Grid>
            )}
          </Grid>

          {isLoading ? (
            <LoadingButton
              loading={isLoading}
              variant="contained"
              fullWidth
              disabled
              style={{ height: "40px" }}
            >
              <span>disabled</span>
            </LoadingButton>
          ) : (
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add restaurant
              </Button>
            </Grid>
          )}
        </Grid>
      </Container>
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={error.errorType}
            sx={{ width: "100%" }}
          >
            {error.message}
          </Alert>
        </Snackbar>
      )}
    </form>
  );
};

export default AddRestuarant;
