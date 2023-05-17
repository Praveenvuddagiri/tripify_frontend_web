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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { baseAPI, getAllHotelsAdmin, getOneIslandDetailsUsingId } from '../../GlobalConstants';
import axios from 'axios';
import HotelRecord from './HotelRecord';
import { getAllIslands } from '../../GlobalConstants';

function HotelApproval() {
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState('pending');
    const [islands, setIslands] = useState([]);




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
            const response = await axios.get(`${baseAPI}${getAllHotelsAdmin}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });


            var hotelsUpdated = response.data.hotels
            for (let i = 0; i < hotelsUpdated.length; i++) {
                const hotel = hotelsUpdated[i];
                const islandName = await getIslandName(hotel.island);
                hotelsUpdated[i] = {
                    ...hotel,
                    island: islandName
                };
            }

            if (filter === 'pending') {
                hotelsUpdated = hotelsUpdated.filter((hot) => !hot.isApproved);
            } else if (filter === 'approved') {
                hotelsUpdated = hotelsUpdated.filter((hot) => hot.isApproved);
            }

            setHotels(hotelsUpdated);

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
        var isls = islands;

        isls = isls.filter((is) => is._id.toString() === islandId);
        return isls[0].name;
    }

    const fetchIslandData = async () => {
        const response = await axios.get(`${baseAPI}${getAllIslands}`, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        });
        setIslands(response.data.islands);
    }



    useEffect(() => {
        fetchIslandData();
        fetchData();
        
    }, [])

    useEffect(() => {
        fetchData()
    }, [filter]);


    return (
        <>

            <FormControl variant="outlined" sx={{ minWidth: 150, marginBottom: '20px' }}>
                <InputLabel id="hotel-filter-label">Filter</InputLabel>
                <Select
                    labelId="hotel-filter-label"
                    id="hotel-filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    label="Filter"
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="pending" >Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                </Select>
            </FormControl>



            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Hotel Name</TableCell>
                            <TableCell>Photo</TableCell>
                            <TableCell>Island</TableCell>
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
                        {hotels.map((hotel) => (
                            <HotelRecord
                                hotel={hotel}
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

export default HotelApproval;
