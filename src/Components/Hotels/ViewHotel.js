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
    getAllReviewsPerHotel,
} from "../../GlobalConstants";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import RoomForm from "./RoomForm";
import ReviewsCard from "../Places/FormElements/ReviewCard";

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

const ViewHotel = ({ jumpToTab }) => {
    const [hotel, setHotel] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const [reviewsData, setReviewsData] = useState({});
    const [islands, setIslands] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    useEffect(() => {
        if (!localStorage.getItem("hotel")) {
            jumpToTab(0);
        } else {
            const ho = JSON.parse(localStorage.getItem("hotel"));
            setHotel(ho);
            setImagePreview(ho.images);
        }
    }, []);

    const fetchRatingsData = async () => {
        try {
            const response = await axios.get(`${baseAPI}${getAllReviewsPerHotel}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                },
                params: {
                    id: hotel._id.toString()
                }
            });

            var data = response.data;
            data.positivePercent = (data.positiveResponse / data.numberOfReviews) * 100;
            data.negativePercent = (data.negativeResponse / data.numberOfReviews) * 100;
            data.neutralPercent = (data.neutralResponse / data.numberOfReviews) * 100;

            const ratingsData = [
                { x: `One Star-(${data.oneCount})`, y: data.oneCount },
                { x: `Two Star-(${data.twoCount})`, y: data.twoCount },
                { x: `Three Star-(${data.threeCount})`, y: data.threeCount },
                { x: `Four Star-(${data.fourCount})`, y: data.fourCount },
                { x: `Five Star-(${data.fiveCount})`, y: data.fiveCount },
            ];

            data.ratingsData = ratingsData;

            setReviewsData(data);


        } catch (error) {

        }
    }

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
        fetchRatingsData();
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
                            disabled
                            error={Boolean(errors.contact?.website)}
                            helperText={errors.contact?.website}
                        />
                    </Grid>

                    <Grid item xs={12}>

                        {hotel.governmentAuthorizedLicense && (
                            <Grid
                                item
                                xs={7}
                                key={hotel.governmentAuthorizedLicense.id}
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
                                            disabled
                                        />

                                    </Grid>
                                ))}

                            </FormGroup>
                        </Grid>
                    </Grid>

                    <>
                        <Grid item xs={12}>
                            <Typography variant="h6">Rooms</Typography>
                        </Grid>
                        {hotel.rooms && hotel.rooms.map((room, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12} sm={12}>
                                    <h4>Room - {index + 1}</h4>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel>Room Type</InputLabel>
                                        <Select
                                            name="roomType"
                                            disabled
                                            value={room.roomType}
                                            required
                                        >
                                            <MenuItem value="Single Room">Single Room</MenuItem>
                                            <MenuItem value="Twin Room">Twin Room</MenuItem>
                                            <MenuItem value="Triple Room">Triple Room</MenuItem>
                                            <MenuItem value="Family Room">Family Room</MenuItem>
                                            <MenuItem value="Suite Room">Suite Room</MenuItem>
                                            <MenuItem value="Deluxe Room">Deluxe Room</MenuItem>
                                            <MenuItem value="Cottage">Cottage</MenuItem>
                                            <MenuItem value="Dormitory Room">Dormitory Room</MenuItem>
                                            <MenuItem value="Executive Suite">Executive Suite</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        name="price"
                                        label="Price(Rs.) "
                                        type="number"
                                        value={room.price}
                                        disabled
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        name="maxOccupancy"
                                        label="Max Occupancy"
                                        value={room.maxOccupancy}
                                        disabled
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="description"
                                        label="Description"
                                        value={room.description}

                                        fullWidth
                                        rows={2}
                                        multiline
                                        required
                                        disabled
                                    />
                                </Grid>


                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel>Bed Type</InputLabel>
                                        <Select
                                            disabled
                                            name="bedType"
                                            value={room.beds.bedType}

                                            required
                                        >
                                            <MenuItem value="Single">Single</MenuItem>
                                            <MenuItem value="Twin">Twin</MenuItem>
                                            <MenuItem value="Double">Double</MenuItem>
                                            <MenuItem value="Queen">Queen</MenuItem>
                                            <MenuItem value="King">King</MenuItem>
                                            <MenuItem value="Super King">Super King</MenuItem>
                                            <MenuItem value="Bunk Bed">Bunk Bed</MenuItem>
                                            <MenuItem value="Sofa Bed">Sofa Bed</MenuItem>
                                            <MenuItem value="Futon">Futon</MenuItem>
                                            <MenuItem value="Trundle Bed">Trundle Bed</MenuItem>
                                            <MenuItem value="Murphy Bed">Murphy Bed</MenuItem>
                                            <MenuItem value="Day Bed">Day Bed</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        type="number"
                                        name="quantity"
                                        label="Bed Quantity"
                                        value={room.beds.quantity}
                                        fullWidth
                                        required
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        name="amenities"
                                        label="Amenities"
                                        value={room.amenities.join(', ')}
                                        fullWidth
                                        multiline
                                        disabled
                                    />
                                </Grid>

                            </React.Fragment>
                        ))}

                    </>

                    <Grid item xs={12} container spacing={2} alignItems="center">

                        <ReviewsCard
                            reviewsData={reviewsData}
                        />

                    </Grid>
                </Grid>
            </Container>
        </form>
    );
};


export default ViewHotel;