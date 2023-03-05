import React, { useState } from 'react';
import { styled, Button, TextField, InputAdornment, IconButton, CircularProgress, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { baseAPI, loginAPI } from '../GlobalConstants';

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
    width: '100%',
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

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // api fetch for login goes here
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${baseAPI}${loginAPI}`, {
                email,
                password,
            },{
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json'
                }
              });

            console.log('Login successful!',response);


        } catch (error) {
            if(Math.floor(error.response.status / 100) === 5){
                error.response.data.color = 'rgb(255 99 0)';
            } else {
                error.response.data.color = 'red';
            }
            
            setError(error.response.data);

            
        } finally {
            setIsLoading(false);
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <RootBox>
            <FormBox>
                <TitleBox>Tripify Login</TitleBox>
                <form onSubmit={handleSubmit}>
                    <FieldBox>
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            inputProps={{ maxLength: 50 }}
                            required
                        />
                    </FieldBox>
                    <FieldBox>
                        <TextField
                            fullWidth
                            label="Password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleShowPassword}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FieldBox>
                    <StyledButton variant="contained" color="primary" type="submit" disabled={isLoading}>
                        {isLoading ? <CircularProgress color="primary" /> : 'Login'}
                    </StyledButton>
                </form>
            </FormBox>
            {error && (
                <Alert variant='soft' color='error' style={{color: error.color}}>
                    An error occurred: {error.message}
                </Alert>

            )}
        </RootBox>
    );
};

export default Login;
