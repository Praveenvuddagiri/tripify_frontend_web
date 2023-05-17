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
    UpdateHotelServiceProvider,
    baseAPI,
    deleteUpdateHotel,
    getAllIslands,
} from "../../GlobalConstants";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import RoomForm from "./RoomForm";

const UpdateHotel = ({jumpToTab}) => {
const [hotel, setHotel] = useState ({
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
 });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [islands, setIslands] = useState([]);
    const [locationUrl, setLocationUrl] = useState("");
    const [imagePreview, setImagePreview] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("hotel")) {
          jumpToTab(2);
        } else {
          const ho = JSON.parse(localStorage.getItem("hotel"));
          setHotel(ho);
        }
      }, []);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setHotel((prevState) => ({
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
        setHotel((prevFormValues) => ({
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
            setHotel((prevFormValues) => ({
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
        const add = hotel.address;

        add[e.target.name] = e.target.value;

        setHotel((prevCompany) => ({
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
        const con = hotel.contact;

        con[e.target.name] = e.target.value;

        setHotel((prevCompany) => ({
            ...prevCompany,
            contact: con,
        }));
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setHotel((prevState) => ({
            ...prevState,
            [name]: files[0],
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        var data = hotel;

        try {
            await axios.put(
                `${baseAPI}${deleteUpdateHotel}/${hotel._id.toString()}`,
                {
                    data,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            let successAlert = {
                errorType: "success",
                message: "Hotel has been successfully added",
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
        console.log(hotel);
    }, [hotel]);

    // images
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const imagesArray = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImagePreview((prevImages) => [...prevImages, ...imagesArray]);

        var imgs = hotel.images;
        imgs = [...imgs, ...files];
        setHotel((prevFormValues) => ({
            ...prevFormValues,
            images: imgs,
        }));
    };

    const handleImageDelete = (index) => {
        setImagePreview((prevImages) => prevImages.filter((_, i) => i !== index));
        var imgs = hotel.images;
        imgs = imgs.filter((_, i) => i !== index);
        setHotel((prevFormValues) => ({
            ...prevFormValues,
            images: imgs,
        }));
    };


    const handleFacilityChange = (event, index) => {
        const { value } = event.target;
        setHotel((prevValues) => {
            const facilities = [...prevValues.facilities];
            facilities[index] = value;
            return { ...prevValues, facilities };
        });
    };

    const handleAddFacility = () => {
        setHotel((prevValues) => ({
            ...prevValues,
            facilities: [...prevValues.facilities, ""],
        }));
    };

    const handleFacilityRemove = (index) => {
        setHotel((prevValues) => {
            const facilities = [...prevValues.facilities];
            facilities.splice(index, 1);
            return { ...prevValues, facilities };
        });
    };


    return (
        <form onSubmit={handleSubmit}>
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5"><center>Update Hotel</center></Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="name"
                            label="Hotel name"
                            value={hotel.name}
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
                            label="Hotel description"
                            value={hotel.description}
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
                        <Typography variant="h6">Check In & Check Out Time</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="checkinTime"
                            label="Check In"
                            value={hotel.checkinTime}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="checkoutTime"
                            label="Check Out"
                            value={hotel.checkoutTime}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
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
                                    value={hotel.location.coordinates[0]}
                                    onChange={handleLocationChange}
                                    type="number"
                                    required
                                    disabled
                                />
                                <TextField
                                    label="Latitude"
                                    name="latitude"
                                    value={hotel.location.coordinates[1]}
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
                                        value={hotel.island}
                                        onChange={handleChange}
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
                            value={hotel.address.city}
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
                            value={hotel.address.state}
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
                            value={hotel.address.zip}
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
                            value={hotel.contact.phone}
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
                            value={hotel.contact.email}
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
                            value={hotel.contact.website}
                            onChange={handleContactChange}
                            fullWidth
                            error={Boolean(errors.contact?.website)}
                            helperText={errors.contact?.website}
                        />
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
                                            onChange={(event) => handleFacilityChange(event, index)}
                                        />
                                        <Grid ml={5}>
                                            <Button
                                                variant="contained"
                                                onClick={() => handleFacilityRemove(index)}
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
                                        onClick={handleAddFacility}
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
                                Update Hotel
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


export default UpdateHotel;