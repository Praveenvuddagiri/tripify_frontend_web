import React, { useEffect, useState } from "react";
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

const ViewRestuarant = ({ jumpToTab }) => {
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
  useEffect(() => {
    if (!localStorage.getItem("restaurant")) {
      jumpToTab(0);
    } else {
      const rest = JSON.parse(localStorage.getItem("restaurant"));
      setRestaurant(rest);
      setImagePreview(rest.images);
    }
  }, []);
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

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    fetchIslandData();
  }, []);

  useEffect(() => {
    console.log(restaurant);
  }, [restaurant]);

  // images

  return (
    <form>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Restaurant Details</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Restaurant name"
              value={restaurant.name}
              fullWidth
              required
              disabled
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="description"
              label="Restaurant description"
              value={restaurant.description}
              fullWidth
              required
              multiline
              disabled
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
                  disabled
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
                      src={image.secure_url}
                      alt={image.id}
                      style={{ height: "100%", width: "auto" }}
                    />
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
                  justifyContent: "space-evenly",
                }}
              >
                <TextField
                  label="Longitude"
                  name="longitude"
                  value={restaurant.location.coordinates[0]}
                  type="number"
                  required
                  disabled
                />
                <TextField
                  label="Latitude"
                  name="latitude"
                  value={restaurant.location.coordinates[1]}
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
                    disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
              fullWidth
              error={Boolean(errors.contact?.website)}
              helperText={errors.contact?.website}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Government Authorized License</Typography>
          </Grid>
          <Grid item xs={12}>
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
                    src={restaurant.governmentAuthorizedLicense.secure_url}
                    type="application/pdf"
                    width="100%"
                    height="auto"
                  />
                </Paper>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Menu</Typography>
          </Grid>
          <Grid item xs={12}>
            {restaurant.menu && (
              <Grid item xs={7} key={restaurant.menu.id} mt={2}>
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
                    src={restaurant.menu.secure_url}
                    type="application/pdf"
                    width="100%"
                    height="auto"
                  />
                </Paper>
              </Grid>
            )}
          </Grid>
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

export default ViewRestuarant;
