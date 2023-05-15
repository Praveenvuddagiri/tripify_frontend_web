import React, { useEffect, useState } from 'react';
import {
    TableCell,
    TableRow,
    Typography,
    IconButton,
    Button
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Check, Phone, Email, Language, Description } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { approveTourOperatorAdmin, baseAPI, unapproveTourOperatorAdmin } from '../../GlobalConstants';
import { LoadingButton } from '@mui/lab';

function TourOperatorRecord({ touroperator, fetchData, setError, handleClick, setIsLoading }) {

    const [isApproving, setIsApproving] = useState(false);
    const [isUnapproving, setIsUnapproving] = useState(false);

    const handleApprove = async () => {
        setIsApproving(true);
        try {
            await axios.put(`${baseAPI}${approveTourOperatorAdmin}/${touroperator._id.toString()}`, {}, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            const e = {
                message: "Approved Tour Operator successfully.",
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
            await axios.put(`${baseAPI}${unapproveTourOperatorAdmin}/${touroperator._id.toString()}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            const e = {
                message: "Unapproved Tour Operator successfully.",
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
    return (
        <>
            <TableRow key={touroperator.name}>
                <TableCell component="th" scope="row">
                    <b>{touroperator.name}</b>
                </TableCell>
                <TableCell>
                    <img src={touroperator.image.secure_url} alt={`${touroperator.name} photo`} style={{ width: '100px', borderRadius: '40%' }} />
                </TableCell>
                {/* <TableCell>
                    {touroperator.island}
                </TableCell> */}
                <TableCell>
                    <Typography>
                        {touroperator.address.street}, {touroperator.address.city}, {touroperator.address.zip}
                    </Typography>
                </TableCell>
                <TableCell>
                <Typography style={{minWidth:"350px", overflow:"clip"}}>
                        <IconButton >
                            <PersonIcon />
                        </IconButton> {touroperator.contact.name}
                    </Typography>
                    <Typography>
                        <IconButton href={`tel:${touroperator.contact.phone}`} >
                            <Phone />
                        </IconButton> {touroperator.contact.phone}
                    </Typography>
                    <Typography>
                        <IconButton href={`mailto:${touroperator.contact.email}`}>
                            <Email />
                        </IconButton> {touroperator.contact.email}
                    </Typography>
                    <Typography>
                        <IconButton href={touroperator.contact.website} target="_blank">
                            <Language />
                        </IconButton>{touroperator.contact.website}
                    </Typography>
                </TableCell>

                <TableCell>
                    <IconButton href={touroperator.governmentAuthorizedLicense.secure_url} target="_blank" >
                        <Description style={{ fontSize: '40px' }} color='primary' />
                    </IconButton>
                </TableCell>
                <TableCell >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        {touroperator.isApproved === true ?

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

                        <Button href={`mailto:?to=${touroperator.contact.email}`}
                            style={{ marginLeft: 20 }} startIcon={<Email />} variant="contained" color="primary">
                            Contact
                        </Button>
                    </div>
                </TableCell>
            </TableRow >
        </>
    );
}

export default TourOperatorRecord;