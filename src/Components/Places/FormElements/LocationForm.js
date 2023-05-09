import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

function LocationForm({ formValues, setFormValues, setError, handleClick }) {
    const[url, setUrl] = useState('');
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


    // handle get coordinates button click
    const handleGetCoordinatesClick = () => {
        const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
        const match = url.match(regex);
        if (match) {
            const latitude = match[1];
            const longitude = match[2];
            setFormValues((prevFormValues) => ({
                ...prevFormValues,
                location: {
                    ...prevFormValues.location,
                    coordinates: [longitude, latitude],
                }
            }));
        } else {
            const e = { errorType: 'error', message: 'Invalid URL' }
            setError(e);
            handleClick();
        }
    };


    return (
        <Box sx={{ mt: 2, ml: 2 }}>
            <Typography variant="h6">Location</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={12} style={{ display: "flex", flexDirection: "row" }}>
                    <Box sx={{ mt: 2, mr: 3, width: '65%' }} >
                        <TextField
                            fullWidth
                            label="URL"
                            name="url"
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Button
                            variant="outlined"
                            onClick={handleGetCoordinatesClick}
                        >
                            Get Coordinates
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} style={{ display: "flex", flexDirection: "row" }}>
                    <Box sx={{ mt: 2, mr: 3 }}>
                        <TextField
                            label="Longitude"
                            name="longitude"
                            value={formValues.location.coordinates[0]}
                            onChange={handleLocationChange}
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
                            onChange={handleLocationChange}
                            type="number"
                            required
                            disabled
                        />
                    </Box>
                </Grid>

            </Grid>
        </Box>
    );
}

export default LocationForm;