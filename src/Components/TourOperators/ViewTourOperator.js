import React, { useEffect, useState } from 'react';

import {
    TextField,
    Grid,
    Typography,
    Container,
    Paper
} from '@mui/material';
const ViewTourOperator = ({ jumpToTab }) => {
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
    const [imagePreview, setImagePreview] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("touroperator")) {
            jumpToTab(0);
        } else {
            const tour = JSON.parse(localStorage.getItem("touroperator"));
            setCompany(tour);
            setImagePreview(tour.images);
        }
    }, []);

    useEffect(() => {
        console.log(company);
    }, [company])

    return (
        <form >
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
                            label="Company description"
                            value={company.description}
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
                        <Typography variant="h6">Image</Typography>
                        {company.image && (
                            <Grid item xs={8} key={company.image.id} mt={2}>
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
                                        src={company.image.secure_url}
                                        alt={company.image.id}
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
                            value={company.address.city}
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
                            value={company.address.state}
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
                            fullWidth
                            required
                            disabled
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
                            fullWidth
                            required
                            disabled
                            error={Boolean(errors.contact?.name)}
                            helperText={errors.contact?.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="phone"
                            label="Contact phone"
                            value={company.contact.phone}
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
                            value={company.contact.email}
                            type='email'
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
                            value={company.contact.website}
                            fullWidth
                            disabled
                            error={Boolean(errors.contact?.website)}
                            helperText={errors.contact?.website}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6">Government Authorized License</Typography>
                        {company.governmentAuthorizedLicense && (
                            <Grid item xs={7} key={company.governmentAuthorizedLicense.id} mt={2}>
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
                                        src={company.governmentAuthorizedLicense.secure_url}
                                        type="application/pdf"
                                        width="100%"
                                        height="auto"
                                    />

                                </Paper>
                            </Grid>
                        )}
                    </Grid>


                    <Grid item xs={12}>
                        <Typography variant="h6">Tariff Document</Typography>
                        {company.tariffDocument && (
                            <Grid item xs={7} key={company.tariffDocument.id} mt={2}>
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
                                        src={company.tariffDocument.secure_url}
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
        </form>
    );
};



export default ViewTourOperator;