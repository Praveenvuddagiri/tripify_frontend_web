import React, { useEffect, useState } from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

import {
    TextField,

    Button,
    Grid,
    Typography,
    Container,
    Paper,
    Snackbar,
    Alert,
} from '@mui/material';
import { addTourOperatorByServiceProviderAPI, baseAPI } from '../../GlobalConstants';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';

const AddTourOperator = () => {
    const [company, setCompany] = useState({
        name: '',
        description: '',
        image: null,
        address: {
            street: '',
            city: '',
            state: 'Andaman and Nicobar Islands',
            zip: '',
        },
        contact: {
            name: '',
            phone: '',
            email: '',
            website: '',
        },
        tariffDocument: null,
        governmentAuthorizedLicense: null
    });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCompany((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddressChange = (e) => {
        const add = company.address;

        add[e.target.name] = e.target.value;

        setCompany((prevCompany) => ({
            ...prevCompany,
            address: add
        }))
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const handleContactChange = (e) => {
        const con = company.contact;

        con[e.target.name] = e.target.value;

        setCompany((prevCompany) => ({
            ...prevCompany,
            contact: con
        }))
    }

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setCompany((prevState) => ({
            ...prevState,
            [name]: files[0],
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        var data = JSON.stringify(company);


        try {
            await axios.post(`${baseAPI}${addTourOperatorByServiceProviderAPI}`, {
                "image": company.image,
                "governmentAuthorizedLicense": company.governmentAuthorizedLicense,
                "tariffDocument": company.tariffDocument,
                data
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            let successAlert = {
                errorType: 'success',
                message: "Tour Operator has been successfully added"
            }

            setError(successAlert);
            handleClick();

        } catch (error) {

            console.log(error);
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


    };
    useEffect(() => {
        console.log(company);
    }, [company])

    return (
        <form onSubmit={handleSubmit}>
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Typography variant="h5">Add a new company</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="name"
                            label="Company name"
                            value={company.name}
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
                            label="Company description"
                            value={company.description}
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
                        <Typography variant="h6">Image</Typography>


                        <input
                            accept="image/*"
                            id="image-upload"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            name='image'
                        />
                        <label htmlFor="image-upload">
                            <Button
                                variant="contained"
                                component="span"
                                startIcon={<AddCircleRoundedIcon />}
                                sx={{ mt: 2 }}
                            >
                                Add Company Logo
                            </Button>
                        </label>
                        {company.image && (
                            <Grid item xs={4} key={company.image.name} mt={2}>
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
                                        src={URL.createObjectURL(company.image)}
                                        alt={company.image.name}
                                        style={{ height: '100%', width: 'auto' }}
                                    />
                                </Paper>
                            </Grid>
                        )}
                    </Grid>


                    <Grid item xs={12}>
                        <Typography variant="h6" >Address</Typography>
                    </Grid>



                    <Grid item xs={12}>
                        <TextField
                            name="street"
                            label="Street address"
                            value={company.address.street}
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
                            value={company.address.city}
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
                            value={company.address.state}
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
                            value={company.address.zip}
                            onChange={handleAddressChange}
                            fullWidth
                            required
                            error={Boolean(errors.address?.zip)}
                            helperText={errors.address?.zip}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" >Contact Details</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="name"
                            label="Contact person name"
                            value={company.contact.name}
                            onChange={handleContactChange}
                            fullWidth
                            required
                            error={Boolean(errors.contact?.name)}
                            helperText={errors.contact?.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="phone"
                            label="Contact phone"
                            value={company.contact.phone}
                            onChange={handleContactChange}
                            type='number'
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
                            value={company.contact.email}
                            onChange={handleContactChange}
                            type='email'
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
                            value={company.contact.website}
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
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            name='governmentAuthorizedLicense'
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
                        {company.governmentAuthorizedLicense && (
                            <Grid item xs={7} key={company.governmentAuthorizedLicense.name} mt={2}>
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

                                    <embed
                                        src={URL.createObjectURL(company.governmentAuthorizedLicense)}
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
                            id="tariff-upload"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            name='tariffDocument'
                        />
                        <label htmlFor="tariff-upload">
                            <Button
                                variant="contained"
                                component="span"
                                startIcon={<AddCircleRoundedIcon />}
                                sx={{ mt: 2 }}
                            >
                                Add Tariff Document
                            </Button>
                        </label>
                        {company.tariffDocument && (
                            <Grid item xs={7} key={company.tariffDocument.name} mt={2}>
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

                                    <embed
                                        src={URL.createObjectURL(company.tariffDocument)}
                                        type="application/pdf"
                                        width="100%"
                                        height="auto"
                                    />

                                </Paper>
                            </Grid>
                        )}
                    </Grid>

                    {isLoading ?
                        <LoadingButton
                            loading={isLoading}
                            variant="contained"
                            fullWidth
                            disabled
                            style={{ height: '40px' }}
                        >
                            <span>disabled</span>
                        </LoadingButton>
                        :


                        <Grid item xs={12} >
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Add company
                            </Button>
                        </Grid>
                    }
                </Grid>
            </Container>
            {error && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={error.errorType} sx={{ width: '100%' }}>
                    {error.message}
                </Alert>
            </Snackbar>}
        </form>
    );
};



export default AddTourOperator;