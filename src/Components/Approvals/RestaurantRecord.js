import React, { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiSquareCircle } from '@mdi/js';
import {
    TableCell,
    TableRow,
    Typography,
    IconButton,
    Button
} from '@mui/material';
import { Check, Phone, Email, Language, Description } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { approveRestaurantAdmin, baseAPI, unapproveRestaurantAdmin } from '../../GlobalConstants';
import { LoadingButton } from '@mui/lab';

function RestaurantRecord({ restaurant, fetchData, setError, handleClick, setIsLoading }) {

    const [isApproving, setIsApproving] = useState(false);
    const [isUnapproving, setIsUnapproving] = useState(false);

    const handleApprove = async () => {
        setIsApproving(true);
        try {
            await axios.put(`${baseAPI}${approveRestaurantAdmin}/${restaurant._id.toString()}`, {}, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            const e = {
                message: "Approved restaurant successfully.",
                errorType: 'success'
            }
            setError(e)

            handleClick();

            setIsLoading(true);


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
            setIsLoading(false);
            setIsApproving(false);
        }
    }

    const handleUnapprove = async () => {
        setIsUnapproving(true);
        try {
            await axios.put(`${baseAPI}${unapproveRestaurantAdmin}/${restaurant._id.toString()}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            const e = {
                message: "Unapproved restaurant successfully.",
                errorType: 'success'
            }
            setError(e)

            handleClick();

            setIsLoading(true);

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
            setIsLoading(false);
            setIsUnapproving(false);
        }
    }
    useEffect(
        () =>{
            console.log(restaurant);
        },[]
    )
    return (
        <>
            <TableRow key={restaurant.name}>
                <TableCell component="th" scope="row">
                    <b>{restaurant.name}</b>
                </TableCell>
                <TableCell>
                    <img src={restaurant.images[0].secure_url} alt={`${restaurant.name} photo`} style={{ width: '100px', borderRadius: '40%' }} />
                </TableCell>
                <TableCell>
                    {restaurant.island}
                </TableCell>
                <TableCell>
                    {restaurant.isVeg? <Icon path={mdiSquareCircle} size={1} color="green"/>:<Icon path={mdiSquareCircle} size={1} color="red"/>}
                </TableCell>
                <TableCell>
                    <Typography>
                        {restaurant.address.street}, {restaurant.address.city}, {restaurant.address.zip}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography>
                        <IconButton href={`tel:${restaurant.contact.phone}`} >
                            <Phone />
                        </IconButton> {restaurant.contact.phone}
                    </Typography>
                    <Typography>
                        <IconButton href={`mailto:${restaurant.contact.email}`}>
                            <Email />
                        </IconButton> {restaurant.contact.email}
                    </Typography>
                    <Typography>
                        <IconButton href={restaurant.contact.website} target="_blank">
                            <Language />
                        </IconButton>{restaurant.contact.website}
                    </Typography>
                </TableCell>

                <TableCell>
                    <IconButton href={restaurant.governmentAuthorizedLicense.secure_url} target="_blank" >
                        <Description style={{ fontSize: '40px' }} color='primary' />
                    </IconButton>
                </TableCell>
                <TableCell >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        {restaurant.isApproved === true ?

                            (
                                isUnapproving ?
                                    <LoadingButton
                                        loading={isUnapproving}
                                        variant="contained"
                                        
                                        disabled
                                        style={{ height: '40px' }}
                                    >
                                        <span>disabled</span>
                                    </LoadingButton>
                                    :

                                    < Button startIcon={<CloseIcon />} variant="contained" color="error" onClick={() => { handleUnapprove() }}>
                                        Unapprove
                                    </Button>
                            )


                            :

                            (
                                isApproving ?
                                    <LoadingButton
                                        loading={isApproving}
                                        variant="contained"
                                        
                                        disabled
                                        style={{ height: '40px' }}
                                    >
                                        <span>disabled</span>
                                    </LoadingButton>
                                    :
                                    <Button startIcon={<Check />} variant="contained" color="success" onClick={() => { handleApprove() }}>
                                        Approve
                                    </Button>
                            )

                        }

                        <Button href={`mailto:?to=${restaurant.contact.email}`}
                            style={{ marginLeft: 20 }} startIcon={<Email />} variant="contained" color="primary">
                            Contact
                        </Button>
                    </div>
                </TableCell>
            </TableRow >
        </>
    );
}

export default RestaurantRecord;