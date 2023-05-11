import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { UploadFile } from "@mui/icons-material";
import axios from "axios";
import { baseAPI, deleteUpdatePlace } from "../../../GlobalConstants";
import { LoadingButton } from "@mui/lab";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


function UpdateImagesForm({ formValues, setFormValues, setError, handleClick,setOpenModal }) {
    const [imagePreview, setImagePreview] = useState(formValues.images);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        console.log(images);
    }, [images])

    // images 
    const handleImageChange = (event) => {

        if (images.length === 0) {
            console.log("geegx");
            const e = {
                errorType: 'error',
                message: 'Please Note: If you update images you had to update all the images.'
            }
            setError(e);
            handleClick();

            setImages([]);
            setImagePreview([]);
        }

        const files = Array.from(event.target.files);
        const imagesArray = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImagePreview((prevImages) => [...prevImages, ...imagesArray]);

        var imgs = images;
        imgs = [...imgs, ...files];
        setImages(imgs);
    };

    const handleImageDelete = (index) => {
        setImagePreview((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );
        var imgs = images;
        imgs = imgs.filter((_, i) => i !== index)
        setImages(imgs);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            var response = await axios.put(`${baseAPI}${deleteUpdatePlace}/${formValues._id.toString()}`, {
                images
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
                message: "Place images has been successfully updated."
            }

            setError(successAlert);
            handleClick();
            console.log(response);

            setFormValues((prevFormValues) => ({
                ...prevFormValues,
                images: response.data.place.images
            }))
            setOpenModal(false);

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
    }
    return (

        <Box sx={{ ...style, width: 900 }}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ mt: 2, ml: 2 }}>
                    <Typography variant="h6">Images</Typography>
                    <input
                        accept="image/*"
                        id="image-upload"
                        type="file"
                        multiple
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                        required
                    />
                    <label htmlFor="image-upload">
                        <Button
                            variant="contained"
                            component="span"
                            startIcon={<AddCircleRoundedIcon />}
                            sx={{ mt: 2 }}
                        >
                            Add Images
                        </Button>
                    </label>
                    <Grid container spacing={2} sx={{ mt: 2 }} sm={12}>
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
                                        src={image.preview ? image.preview : image.secure_url}
                                        alt={image.file ? image.file.name : image.id}
                                        style={{ height: '100%', width: 'auto' }}
                                    />
                                    <IconButton
                                        aria-label="delete"
                                        sx={{ position: 'absolute', top: 5, right: 5 }}
                                        onClick={() => handleImageDelete(index)}

                                    >
                                        <DeleteRoundedIcon />
                                    </IconButton>
                                </Paper>
                            </Grid>
                        ))}

                        <Grid item sm={12}>
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
                                    variant="contained"
                                    component="span"
                                    startIcon={<UploadFile />}
                                    sx={{ mt: 2, ml: 2 }}
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Update Images
                                </Button>

                            }
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </Box>
    );
}

export default UpdateImagesForm;