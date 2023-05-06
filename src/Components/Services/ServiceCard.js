import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { baseAPI, deleteUpdateService } from '../../GlobalConstants';
import { LoadingButton } from '@mui/lab';

function ServiceCard({ service, setError, handleClick, fetchData, jumpToTab }) {

    const [deleteLoader, setDeletLoader] = React.useState(false);

    const handleDelete = async () => {
        try {
            setDeletLoader(true);
            await axios.delete(`${baseAPI}${deleteUpdateService}/${service._id.toString()}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            let successAlert = {
                errorType: 'success',
                message: "service has been successfully deleted"
            }

            setError(successAlert);
            handleClick();

            fetchData();

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
            setDeletLoader(false);
        }
    }


    const handleUpdate = (e) => {
        e.preventDefault();
        localStorage.setItem('Service',JSON.stringify(service));

        jumpToTab(2);
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={service.image.secure_url}
                title={service.image.id}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {service.name}
                </Typography>
                <div style={{ height: "100px", overflow: "auto" }}>
                    <Typography variant="body1" color="text.secondary">
                        {service.description}
                    </Typography>
                </div>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'space-evenly' }}>


                {deleteLoader ?

                    <LoadingButton
                        size="small"
                        loading={deleteLoader}
                        variant="outlined"
                        disabled
                    >
                        <span>disabled</span>
                    </LoadingButton>
                    :

                    <Button variant="outlined" color='error' startIcon={<DeleteIcon />} size='small' onClick={handleDelete}>
                        Delete
                    </Button>

                }

                <Button variant="contained" color='info' endIcon={<EditIcon />} size='small' onClick={handleUpdate}>
                    Update
                </Button>
            </CardActions>
        </Card>
    );
}

export default ServiceCard;