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
import { approveRestrauntAdmin, baseAPI, unapproveRestrauntAdmin } from '../../GlobalConstants';
import { LoadingButton } from '@mui/lab';

function RestrauntRecord({ restraunt, fetchData, setError, handleClick, setIsLoading }) {

    const [isApproving, setIsApproving] = useState(false);
    const [isUnapproving, setIsUnapproving] = useState(false);

    const handleApprove = async () => {
        setIsApproving(true);
        try {
            await axios.put(`${baseAPI}${approveRestrauntAdmin}/${restraunt._id.toString()}`, {}, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            const e = {
                message: "Approved restraunt successfully.",
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
            await axios.put(`${baseAPI}${unapproveRestrauntAdmin}/${restraunt._id.toString()}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            const e = {
                message: "Unapproved restraunt successfully.",
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
            <TableRow key={restraunt.name}>
                <TableCell component="th" scope="row">
                    <b>{restraunt.name}</b>
                </TableCell>
                <TableCell>
                    <img src={restraunt.images[0].secure_url} alt={`${restraunt.name} photo`} style={{ width: '100px', borderRadius: '40%' }} />
                </TableCell>
                <TableCell>
                    {restraunt.island}
                </TableCell>
                <TableCell>
                    <Typography>
                        {restraunt.address.street}, {restraunt.address.city}, {restraunt.address.zip}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography>
                        <IconButton href={`tel:${restraunt.contact.phone}`} >
                            <Phone />
                        </IconButton> {restraunt.contact.phone}
                    </Typography>
                    <Typography>
                        <IconButton href={`mailto:${restraunt.contact.email}`}>
                            <Email />
                        </IconButton> {restraunt.contact.email}
                    </Typography>
                    <Typography>
                        <IconButton href={restraunt.contact.website} target="_blank">
                            <Language />
                        </IconButton>{restraunt.contact.website}
                    </Typography>
                </TableCell>

                <TableCell>
                    <IconButton href={restraunt.governmentAuthorizedLicense.secure_url} target="_blank" >
                        <Description style={{ fontSize: '40px' }} color='primary' />
                    </IconButton>
                </TableCell>
                <TableCell >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        {restraunt.isApproved === true ?

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

                        <Button href={`mailto:?to=${restraunt.contact.email}`}
                            style={{ marginLeft: 20 }} startIcon={<Email />} variant="contained" color="primary">
                            Contact
                        </Button>
                    </div>
                </TableCell>
            </TableRow >
        </>
    );
}

export default RestrauntRecord;