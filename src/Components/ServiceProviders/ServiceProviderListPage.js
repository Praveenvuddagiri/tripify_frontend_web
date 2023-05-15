import React, { useState, useEffect } from 'react';
// import Grid from '@mui/material/Grid';
import ServiceProvidersTable from './ServiceProvidersTable';
import { Alert, Box, CircularProgress, Snackbar, Typography } from '@mui/material';
import { baseAPI, getAllServiceProviders } from '../../GlobalConstants';
import axios from 'axios';

const ServiceProviderListPage = () => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [serviceproviders, setServiceProviders] = useState([]);

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
        try {
            const response = await axios.get(`${baseAPI}${getAllServiceProviders}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            setServiceProviders(response.data.users);


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

    useEffect(() => {
        setIsLoading(true);

        fetchData();
    }, []);

    return (
        <>

            <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" marginTop='15px'>
                <Typography variant="h4" align="center" gutterBottom>
                Service Providers
                </Typography>
                <ServiceProvidersTable serviceproviders={serviceproviders} />

                {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <CircularProgress />
                </Box>}
            </Box>

            {error && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={error.errorType} sx={{ width: '100%' }}>
                    {error.message}
                </Alert>
            </Snackbar>}
        </>
    );
}

export default ServiceProviderListPage;