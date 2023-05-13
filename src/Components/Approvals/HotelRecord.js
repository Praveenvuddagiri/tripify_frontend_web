import React, { useEffect, useState } from 'react';
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
import { approveHotelAdmin, baseAPI, unapproveHotelAdmin } from '../../GlobalConstants';
import { LoadingButton } from '@mui/lab';

function HotelRecord({ hotel, fetchData, setError, handleClick, setIsLoading }) {

    const [isApproving, setIsApproving] = useState(false);
    const [isUnapproving, setIsUnapproving] = useState(false);

    const handleApprove = async () => {
        setIsApproving(true);
        try {
            await axios.put(`${baseAPI}${approveHotelAdmin}/${hotel._id.toString()}`, {}, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            const e = {
                message: "Approved hotel successfully.",
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
            setIsApproving(true);
        }
    }

    const handleUnapprove = async () => {
        setIsUnapproving(true);
        try {
            await axios.put(`${baseAPI}${unapproveHotelAdmin}/${hotel._id.toString()}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            const e = {
                message: "Unapproved hotel successfully.",
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
            setIsUnapproving(true);
        }
    }
    return (
        <>
            <TableRow key={hotel.name}>
                <TableCell component="th" scope="row">
                    <b>{hotel.name}</b>
                </TableCell>
                <TableCell>
                    <img src={hotel.images[0].secure_url} alt={`${hotel.name} photo`} style={{ width: '100px', borderRadius: '40%' }} />
                </TableCell>
                <TableCell>
                    {hotel.island}
                </TableCell>
                <TableCell>
                    <Typography>
                        {hotel.address.street}, {hotel.address.city}, {hotel.address.zip}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography>
                        <IconButton href={`tel:${hotel.contact.phone}`} >
                            <Phone />
                        </IconButton> {hotel.contact.phone}
                    </Typography>
                    <Typography>
                        <IconButton href={`mailto:${hotel.contact.email}`}>
                            <Email />
                        </IconButton> {hotel.contact.email}
                    </Typography>
                    <Typography>
                        <IconButton href={hotel.contact.website} target="_blank">
                            <Language />
                        </IconButton>{hotel.contact.website}
                    </Typography>
                </TableCell>

                <TableCell>
                    <IconButton href={hotel.governmentAuthorizedLicense.secure_url} target="_blank" >
                        <Description style={{ fontSize: '40px' }} color='primary' />
                    </IconButton>
                </TableCell>
                <TableCell >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        {hotel.isApproved === true ?

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

                        <Button href={`mailto:?to=${hotel.contact.email}`}
                            style={{ marginLeft: 20 }} startIcon={<Email />} variant="contained" color="primary">
                            Contact
                        </Button>
                    </div>
                </TableCell>
            </TableRow >
        </>
    );
}

export default HotelRecord;