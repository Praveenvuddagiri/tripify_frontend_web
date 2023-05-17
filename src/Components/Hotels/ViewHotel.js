import React, { useEffect, useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

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
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    FormGroup,
} from "@mui/material";
import {
    baseAPI,
    getAllIslands,
} from "../../GlobalConstants";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import RoomForm from "./RoomForm";

const initialValues = {
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
    governmentAuthorizedLicense: null,
    island: "",
    location: {
        type: "Point",
        coordinates: ["", ""],
    },
    facilities: [],
    checkinTime: '',
    checkoutTime: '',
    rooms: []
};

const ViewHotel = ({jumpToTab}) => {
    const [hotel, setHotel] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [islands, setIslands] = useState([]);
    const [locationUrl, setLocationUrl] = useState("");
    const [imagePreview, setImagePreview] = useState([]);
    useEffect(() => {
        if (!localStorage.getItem("hotel")) {
          jumpToTab(3);
        } else {
          const ho = JSON.parse(localStorage.getItem("hotel"));
          setHotel(ho);
          setImagePreview(ho.images);
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
        }
    };
  
    useEffect(() => {
        fetchIslandData();
    }, []);

    useEffect(() => {
        console.log(hotel);
    }, [hotel]);

    return (
        <form >
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5">Add a new hotel</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="name"
                            label="Hotel name"
                            value={hotel.name}
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
                            label="Hotel description"
                            value={hotel.description}
                            fullWidth
                            required
                            disabled
                            multiline
                            rows={4}
                            error={Boolean(errors.description)}
                            helperText={errors.description}
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <Typography variant="h6">Check In & Check Out Time</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="checkinTime"
                            label="Check In"
                            value={hotel.checkinTime}
                            fullWidth
                            required
                            disabled
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="checkoutTime"
                            label="Check Out"
                            value={hotel.checkoutTime}
                            fullWidth
                            required
                            disabled
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <Typography variant="h6">Images</Typography>

                        <input
                            accept="images/*"
                            id="images-upload"
                            type="file"
                            multiple
                            style={{ display: "none" }}
                            name="images"
                        />
                        <label htmlFor="images-upload">
                            <Button
                                variant="contained"
                                component="span"
                                startIcon={<AddCircleRoundedIcon />}
                                sx={{ mt: 2 }}
                            >
                                Add Hotel Images
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
                                            src={image.secure_url}
                                            alt={image.id}
                                            style={{ height: "100%", width: "auto" }}
                                        />
                                        <IconButton
                                            aria-label="delete"
                                            sx={{ position: "absolute", top: 5, right: 5 }}
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
                                    value={hotel.location.coordinates[0]}
                                    type="number"
                                    required
                                    disabled
                                />
                                <TextField
                                    label="Latitude"
                                    name="latitude"
                                    value={hotel.location.coordinates[1]}
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
                                        value={hotel.island}
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
                            value={hotel.address.street}
                            fullWidth
                            required
                            disabled
                            error={Boolean(errors.address?.street)}
                            helperText={errors.address?.street}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="city"
                            label="City"
                            value={hotel.address.city}
                            fullWidth
                            required
                            disabled
                            error={Boolean(errors.address?.city)}
                            helperText={errors.address?.city}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="state"
                            label="State"
                            value={hotel.address.state}
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
                            value={hotel.address.zip}
                            fullWidth
                            required
                            disabled
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
                            value={hotel.contact.phone}
                            type="number"
                            fullWidth
                            required
                            disabled
                            error={Boolean(errors.contact?.phone)}
                            helperText={errors.contact?.phone}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="email"
                            label="Contact email"
                            value={hotel.contact.email}
                            type="email"
                            fullWidth
                            required
                            disabled
                            error={Boolean(errors.contact?.email)}
                            helperText={errors.contact?.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="website"
                            label="Contact website"
                            value={hotel.contact.website}
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
                            name="governmentAuthorizedLicense"
                        />
                        <label htmlFor="govt-upload">
                        </label>
                        {hotel.governmentAuthorizedLicense && (
                            <Grid
                                item
                                xs={7}
                                key={hotel.governmentAuthorizedLicense.name}
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
                                        src={
                                            hotel.governmentAuthorizedLicense.secure_url
                                        }
                                        type="application/pdf"
                                        width="100%"
                                        height="auto"
                                    />
                                </Paper>
                            </Grid>
                        )}
                    </Grid>

                    <Grid sx={{ mt: 4, ml: 2 }} sm={12}>
                        <Typography variant="h6">Facilities</Typography>
                        <Grid item xs={12} >
                            <FormGroup>
                                {hotel.facilities.map((facility, index) => (
                                    <Grid item sm={12}
                                        mb={2}
                                        key={index}
                                        sx={{ display: "flex", alignItems: "center", mt: 2, justifyContent: "center" }}
                                    >
                                        <TextField
                                            id={`facility-${index}`}
                                            name={`facility-${index}`}
                                            label={`Facility ${index + 1}`}
                                            required
                                            value={facility}
                                        />
                                        <Grid ml={5}>
                                            <Button
                                                variant="contained"
                                                startIcon={<RemoveCircleRoundedIcon />}
                                            >
                                                Remove
                                            </Button>
                                        </Grid>
                                    </Grid>
                                ))}
                                <div sx={{ display: "flex", alignItems: "center" }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<AddCircleRoundedIcon />}
                                    >
                                        Add Facility
                                    </Button>
                                </div>
                            </FormGroup>
                        </Grid>
                    </Grid>

                    <RoomForm hotel={hotel} setHotel={setHotel} />

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
                                Add Hotel
                            </Button>
                        </Grid>
                    )}



                </Grid>
            </Container>
            {error && (
                <Snackbar open={open} autoHideDuration={6000} >
                    <Alert
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


export default ViewHotel;