import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import { useState } from "react";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

function ImageForm({ formValues, setFormValues, setError, handleClick }) {

  const [imagePreview, setImagePreview] = useState([]);
    // images 
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const imagesArray = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImagePreview((prevImages) => [...prevImages, ...imagesArray]);

        var imgs = formValues.images;
        imgs = [...imgs, ...files];
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            images: imgs
        }))
    };

    const handleImageDelete = (index) => {
        setImagePreview((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );
        var imgs = formValues.images;
        imgs = imgs.filter((_, i) => i !== index)
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            images: imgs
        }))

    };
    return (

        <Box sx={{ mt: 2, ml: 2 }}>
            <Typography variant="h6">Images</Typography>
            <input
                accept="image/*"
                id="image-upload"
                type="file"
                multiple
                style={{ display: 'none' }}
                onChange={handleImageChange}
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
                                src={image.preview}
                                alt={image.file.name}
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
            </Grid>
        </Box>
    );
}

export default ImageForm;