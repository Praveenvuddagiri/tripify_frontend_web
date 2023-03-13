import React, { useState } from 'react';
import { styled, Button, TextField, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import { baseAPI, forgotPasswordAPI, OtpRegenerateAPI, OtpSubmitAPI } from '../GlobalConstants';
import axios from 'axios';
import Header from './Header';
import { useStateValue } from '../State/StateProvider';
import { useNavigate } from "react-router-dom";

const RootBox = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
});

const FormBox = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    margin: '2rem',
    border: '2px solid #3f51b5',
    borderRadius: '1rem',
    backgroundColor: '#fff',
    maxWidth: '550px',
    width: '100%',
    boxShadow: '8px 12px 32px 0px rgba(0,0,0,0.1)',
});

const FieldBox = styled('div')({
    margin: '0.5rem 0',
    width: '300px',
});

const StyledButton = styled(Button)({
    margin: '1rem 0 0.5rem',
    width: '100%',
    paddingTop: '10px',
    paddingBottom: '10px',
});

const TitleBox = styled('div')({
    margin: '1rem 0',
    fontWeight: 'bold',
    fontSize: '2rem',
});
function OtpVerification() {
    const navigate = useNavigate();
    const email = localStorage.getItem('email');
    const [{ user }, dispatch] = useStateValue();
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ message: "Check your mail box for OTP and enter here for your account verification.", color: 'green' });


    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${baseAPI}${OtpSubmitAPI}`, {
                otp,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                }
            });

            console.log('OTP Verified!', response);

            localStorage.clear();

            const token = response.data.token;
            localStorage.setItem("token", token);

            const userData = response.data.user;
            localStorage.setItem("user", JSON.stringify(userData));

            dispatch({
                type: "SET_USER",
                user: userData,
            });


            navigate('/');

        } catch (error) {
            if (Math.floor(error.response.status / 100) === 5) {
                error.response.data.color = 'rgb(255 99 0)';
            } else {
                error.response.data.color = 'red';
            }

            setError(error.response.data);


        } finally {
            setIsLoading(false);
        }

    };


    const handleRegenerate = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${baseAPI}${OtpRegenerateAPI}`, {
                email,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                }
            });

            console.log('OTP Resent!', response);
            const errorMessage = {
                message: response.data.message,
                color: 'green'
            }
            setError(errorMessage);

        } catch (error) {
            if (Math.floor(error.response.status / 100) === 5) {
                error.response.data.color = 'rgb(255 99 0)';
            } else {
                error.response.data.color = 'red';
            }

            setError(error.response.data);


        } finally {
            setIsLoading(false);
        }

    };

    return (
        <>
            <Header />

            <RootBox>
                <FormBox>
                    <TitleBox>Tripify Account Verification </TitleBox>
                    <form onSubmit={handleSubmit}>
                        <FieldBox>
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="OTP"
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                inputProps={{ maxLength: 4 }}
                                required
                            />
                        </FieldBox>
                        <StyledButton variant="contained" color="primary" type="submit" disabled={isLoading}>
                            {isLoading ? <CircularProgress color="primary" /> : 'Submit OTP'}
                        </StyledButton>

                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center">
                            <Typography variant="body1" color="textPrimary">
                                <a href="/login" color="primary" variant='body2'>
                                    New User?
                                </a>
                            </Typography>

                            <Typography variant="body1" color="textPrimary">

                                <a href="#" onClick={handleRegenerate} color="primary" variant='body2'>
                                    Regenerate OTP?
                                </a>

                            </Typography>
                        </Grid>
                    </form>
                </FormBox>
                {error && (
                    <Alert variant='soft' style={{ color: error.color }}>
                        {error.message}
                    </Alert>

                )}
            </RootBox>
        </>
    );
}

export default OtpVerification
