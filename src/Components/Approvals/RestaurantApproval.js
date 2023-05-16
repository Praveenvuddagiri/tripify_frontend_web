import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Snackbar,
    Alert,
    CircularProgress,
    Box,
} from '@mui/material';
import { approveRestaurantAdmin, baseAPI, getAllRestaurantAdmin, getOneIslandDetailsUsingId, unapproveRestaurantAdmin } from '../../GlobalConstants';
import axios from 'axios';
import RestaurantRecord from './RestaurantRecord';

function RestaurantApproval() {
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
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


    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${baseAPI}${getAllRestaurantAdmin}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });


            var restrauntsUpdated = response.data.restaurants
            for (let i = 0; i < restrauntsUpdated.length; i++) {
                const restaurant = restrauntsUpdated[i];
                const islandName = await getIslandName(restaurant.island);
                restrauntsUpdated[i] = {
                    ...restaurant,
                    island: islandName
                };
            }
            console.log(response);
            setRestaurants(restrauntsUpdated);

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

    const getIslandName = async (islandId) => {
        const response = await axios.get(`${baseAPI}${getOneIslandDetailsUsingId}/${islandId}`, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        });
        return response.data.island.name;
    }



    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Restaurant Name</TableCell>
                            <TableCell>Photo</TableCell>
                            <TableCell>Island</TableCell>
                            <TableCell>Dietary Options</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Contact Details</TableCell>
                            <TableCell>Government License</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    {isLoading && <Box >
                        <CircularProgress />
                    </Box>}
                    <TableBody>
                        {restaurants.map((restaurant) => (
                            <RestaurantRecord
                                restaurant={restaurant}
                                fetchData={fetchData}
                                handleClick={handleClick}
                                setError={setError}
                                setIsLoading={setIsLoading}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {
                error && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={error.errorType} sx={{ width: '100%' }}>
                        {error.message}
                    </Alert>
                </Snackbar>
            }
        </>
    );
}

export default RestaurantApproval;
