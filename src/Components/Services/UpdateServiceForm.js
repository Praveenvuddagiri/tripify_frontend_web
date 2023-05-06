import { Alert, Box, Button, Grid, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseAPI, deleteUpdateService } from '../../GlobalConstants';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LoadingButton } from '@mui/lab';


function UpdateServiceForm({ jumpToTab }) {
    
    const [ServiceName, setServiceName] = useState('');
    const [ServiceDesc, setServiceDesc] = useState('');
    const [ServiceId, setServiceId] = useState('');
    const [ServiceImage, setServiceImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    var Service;

    useEffect(() => {
        if (!localStorage.getItem('Service')) {
            jumpToTab(0);
        }
        else{
            Service = JSON.parse(localStorage.getItem('Service'));
            setServiceName(Service.name);
            setServiceDesc(Service.description);
            setImagePreview(Service.image.secure_url);
            setServiceId(Service._id.toString());
        }
        
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.put(`${baseAPI}${deleteUpdateService}/${ServiceId}`, {
                "name": ServiceName,
                "description": ServiceDesc,
                "image": ServiceImage
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
                message: "Service has been successfully updated"
            }

            setError(successAlert);
            handleClick();

        } catch (error) {
            if (Math.floor(error.response.status / 100) === 5) {
                error.response.data.errorType = 'warning';
            } else {
                error.response.data.errorType = 'error';
            }

            setError(error.response.data);
            handleClick();


        } finally {
            setIsLoading(false);
        }
    };



    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setServiceImage(file);
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    };


    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };



    return (
        <>
            <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" marginTop='15px'>
                <Typography variant="h5" align="center" gutterBottom>
                    Update Service
                </Typography>
                <Box component="form" onSubmit={handleSubmit} container justify="center" encType='multipart/form-data'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                required
                                name="ServiceName"
                                value={ServiceName}
                                onChange={(e) => setServiceName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                variant="outlined"
                                required
                                name="ServiceDescription"
                                value={ServiceDesc}
                                multiline
                                rows={4}
                                onChange={(e) => setServiceDesc(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box component="label" htmlFor="Service-image-upload" display="block">
                                <Button
                                    variant="contained"
                                    fullWidth
                                    color='success'
                                    component="span"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload Image
                                </Button>
                                <input
                                    type="file"
                                    id="Service-image-upload"
                                    name="ServiceImage"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                />
                            </Box>
                            {imagePreview && (
                                <Box mt={1} display="flex" justifyContent="center" alignItems="center">
                                    <img src={imagePreview} 
                                    alt="Service Preview" 
                                    style={{ maxWidth: "100%", width: "300px" }} />
                                </Box>
                            )}
                        </Grid>

                        <Grid item xs={12}>
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

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Update Service
                                </Button>

                            }
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {error && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={error.errorType} sx={{ width: '100%' }}>
                    {error.message}
                </Alert>
            </Snackbar>}
        </>
    );
}

export default UpdateServiceForm;