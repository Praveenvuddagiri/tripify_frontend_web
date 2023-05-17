import React, { useEffect, useState } from 'react';

import {
    TextField,
    Grid,
    Typography,
    Box,
    Container,
    Card,
    CardContent,
    Snackbar,
    Alert,
    FormGroup,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    FormControlLabel,
    Checkbox,
    CircularProgress,
    Paper
} from '@mui/material';

import { baseAPI, getAllCategories, getAllIslands, getAllReviewsPerPlace } from "../../GlobalConstants";
import axios from 'axios';
import ReviewsCard from './FormElements/ReviewCard';

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




const ViewPlace = ({ jumpToTab }) => {
    const [formValues, setFormValues] = useState(initialState);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [islands, setIslands] = useState([]);
    const [reviewsData, setReviewsData] = useState({});
    const [imagePreview, setImagePreview] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    var place = { images: [] }

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
        fetchRatingsData();

        if (categories.length !== 0)
            setIsLoading(false)


        fetchCategoryData();
        
        fetchIslandData();

        const imagesArray = place.images;
        setImagePreview(imagesArray);


    }, [])

    //should be removed later
    useEffect(() => {
        console.log(formValues);
        fetchRatingsData();
    }, [formValues])

    useEffect(() => {
        if (categories.length !== 0)
            setIsLoading(false)
    }, [categories])



    const generateTimeOptions = () => {
        const options = [];
        for (let i = 0; i < 24; i++) {
            const hour = i < 10 ? `0${i}` : i.toString();
            options.push(<MenuItem key={`hour-${hour}`} value={`${hour}:00`}>{`${hour}:00`}</MenuItem>);
        }
        return options;
    };

    const fetchRatingsData = async () => {
        try {
            const response = await axios.get(`${baseAPI}${getAllReviewsPerPlace}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                },
                params: {
                    id: formValues._id.toString()
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
            <Container maxWidth="md" >
                <Box mt={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h1" gutterBottom>
                                View Place
                            </Typography>

                            <Grid container spacing={2}>
                                {/* name */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        name='name'
                                        required
                                        value={formValues.name}
                                        disabled
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
                                        disabled
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
                                                disabled
                                            >
                                                <MenuItem value={false}>No</MenuItem>
                                                <MenuItem value={true}>Yes</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {formValues.entry && (
                                            <Box sx={{ marginLeft: "1rem" }}>

                                                {formValues.entry_cost.map((cost, index) => (
                                                    <Box key={index} sx={{ display: "flex", alignItems: "center", marginTop: '20px' }}>
                                                        <TextField
                                                            name="category"
                                                            label="Category"
                                                            required
                                                            value={cost.category}
                                                            disabled
                                                            sx={{ marginLeft: "1rem" }}
                                                        />
                                                        <TextField
                                                            name="cost"
                                                            label="Cost"
                                                            value={cost.cost}
                                                            required
                                                            disabled

                                                            sx={{ marginLeft: "1rem" }}
                                                        />
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>


                                <Grid item xs={12} sm={12}>
                                    <Typography variant="h6" gutterBottom>
                                        External Links
                                    </Typography>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Box sx={{ ml: 2 }}>
                                            {formValues.external_links.map((link, index) => (
                                                <Box key={index} sx={{ display: "flex", alignItems: "center", marginTop: '20px' }}>
                                                    <TextField
                                                        name="title"
                                                        label="Title"
                                                        required
                                                        value={link.title}
                                                        disabled
                                                        sx={{ marginLeft: "1rem" }}
                                                    />
                                                    <TextField
                                                        name="link"
                                                        label="Link"
                                                        required
                                                        value={link.link}
                                                        disabled
                                                        sx={{ marginLeft: "1rem" }}
                                                    />
                                                </Box>
                                            ))}
                                        </Box>
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
                                        disabled
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
                                                disabled
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
                                                disabled
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
                                                disabled
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
                                                            disabled
                                                        />
                                                    </Box>
                                                ))}

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
                                                {formValues.do_s.map((doItem, index) => (
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
                                                            disabled
                                                        />

                                                    </Box>
                                                ))}
                                            </FormGroup>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                {formValues.dont_s.map((dontItem, index) => (
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
                                                            disabled
                                                        />

                                                    </Box>
                                                ))}

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

                                            {formValues.external_links.map((link, index) => (
                                                <Box key={index} sx={{ display: "flex", alignItems: "center", marginTop: '20px' }}>
                                                    <TextField
                                                        name="title"
                                                        label="Title"
                                                        required
                                                        value={link.title}
                                                        disabled
                                                        sx={{ marginLeft: "1rem" }}
                                                    />
                                                    <TextField
                                                        name="link"
                                                        label="Link"
                                                        required
                                                        value={link.link}
                                                        disabled
                                                        sx={{ marginLeft: "1rem" }}
                                                    />
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
                                                    disabled
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
                                                    disabled
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
                                                    disabled
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
                                    {isLoading && <Box >
                                        <CircularProgress />
                                    </Box>}
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
                                                                disabled
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
                                                        <InputLabel id={`${timing.day}-open_time-label`}>{timing.day} Open Time</InputLabel>
                                                        <Select
                                                            labelId={`${timing.day}-open_time-label`}
                                                            id={`${timing.day}-open_time`}
                                                            name={`${timing.day}-open_time`}
                                                            label={`${timing.day} Open Time`}
                                                            value={timing.open_time}
                                                            disabled
                                                        >
                                                            <MenuItem value="">None</MenuItem>
                                                            {generateTimeOptions()}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                                                        <InputLabel id={`${timing.day}-close_time-label`}>{timing.day} Close Time</InputLabel>
                                                        <Select
                                                            labelId={`${timing.day}-close_time-label`}
                                                            id={`${timing.day}-close_time`}
                                                            name={`${timing.day}-close_time`}
                                                            label={`${timing.day} Close Time`}
                                                            value={timing.close_time}
                                                            disabled
                                                        >
                                                            <MenuItem value="">None</MenuItem>
                                                            {generateTimeOptions()}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </React.Fragment>

                                        ))
                                        }
                                    </Grid>
                                </Box>

                                {/* images */}
                                <Box sx={{ mt: 2, ml: 2 }}>
                                    <Typography variant="h6">Images</Typography>

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
                                                        src={image.secure_url}
                                                        alt={image.id}
                                                        style={{ height: '100%', width: 'auto' }}
                                                    />

                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>


                                {/* location  */}
                                <Box sx={{ mt: 2, ml: 2 }}>
                                    <Typography variant="h6">Location</Typography>
                                    <Grid container spacing={2} alignItems="center">

                                        <Grid item xs={12} sm={12} style={{ display: "flex", flexDirection: "row" }}>
                                            <Box sx={{ mt: 2, mr: 3 }}>
                                                <TextField
                                                    label="Longitude"
                                                    name="longitude"
                                                    value={formValues.location.coordinates[0]}
                                                    type="number"
                                                    required
                                                    disabled
                                                />
                                            </Box>
                                            <Box sx={{ mt: 2 }}>
                                                <TextField
                                                    label="Latitude"
                                                    name="latitude"
                                                    value={formValues.location.coordinates[1]}
                                                    type="number"
                                                    required
                                                    disabled
                                                />
                                            </Box>
                                        </Grid>

                                    </Grid>
                                </Box>


                                <Box sx={{ mt: 2, ml: 2 }}>
                                    <Grid container spacing={2} alignItems="center">

                                        <ReviewsCard
                                            reviewsData={reviewsData}
                                        />

                                    </Grid>
                                </Box>



                            </Grid>
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

export default ViewPlace;
