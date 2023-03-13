import React, { useEffect, useState } from "react";
import {
  styled,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Typography,
  Grid,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { baseAPI, signUpAPI } from "../GlobalConstants";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../State/StateProvider";
import Header from "./Header";

const RootBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
});

const FormBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  margin: "2rem",
  border: "2px solid #3f51b5",
  borderRadius: "1rem",
  backgroundColor: "#fff",
  maxWidth: "550px",
  width: "100%",
  boxShadow: "8px 12px 32px 0px rgba(0,0,0,0.1)",
});

const FieldBox = styled("div")({
  margin: "0.5rem 0",
  width: "100%",
});

const StyledButton = styled(Button)({
  margin: "1rem 0 0.5rem",
  width: "100%",
  paddingTop: "10px",
  paddingBottom: "10px",
});

const TitleBox = styled("div")({
  margin: "1rem 0",
  fontWeight: "bold",
  fontSize: "2rem",
});

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const isValidPassword = (password) => {
    const hasMinimumLength = password.length >= 8;
    const hasNumericCharacters = (password.match(/[0-9]/g) || []).length >= 3;
    const hasUppercaseCharacter = (password.match(/[A-Z]/g) || []).length >= 1;
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
      password
    );

    return (
      hasMinimumLength &&
      hasNumericCharacters &&
      hasUppercaseCharacter &&
      hasSpecialCharacter
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // api fetch for login goes here

    if (!isValidPassword(password)) {
      const error = {
        message:
          "Please ensure that the password should have a minimum length of 8 characters, at least 3 numeric characters, 1 uppercase letter, and 1 special character",
        color: "red",
      };

      setError(error);
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${baseAPI}${signUpAPI}`,
        {
          email,
          password,
          name,
          role,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      );

      localStorage.setItem("email", email);

      // const token = response.data.token;
      // localStorage.setItem("token", token);

      // const userData = response.data.user;
      // localStorage.setItem("user", JSON.stringify(userData));

      // dispatch({
      //   type: "SET_USER",
      //   user: userData,
      // });
      navigate("/otpverify");
    } catch (error) {
      if (Math.floor(error.response.status / 100) === 5) {
        error.response.data.color = "rgb(255 99 0)";
      } else {
        error.response.data.color = "red";
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
    <>
      <Header />
      <RootBox>
        <FormBox>
          <TitleBox>Tripify Registration</TitleBox>
          <form onSubmit={handleSubmit}>
            <FieldBox>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                inputProps={{ maxLength: 50 }}
                required
              />
            </FieldBox>
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
                label="Role"
                variant="outlined"
                select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="serviceprovider">Service Provider</MenuItem>
              </TextField>
            </FieldBox>

            <FieldBox>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setPassword(inputValue);
                }}
                type={showPassword ? "text" : "password"}
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
            <StyledButton
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress color="primary" /> : "Sign Up"}
            </StyledButton>

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1" color="textPrimary">
                <a href="/login" color="primary" variant="body2">
                  Login?
                </a>
              </Typography>
            </Grid>
          </form>
        </FormBox>
        {error && (
          <Alert variant="soft" color="error" style={{ color: error.color }}>
            {error.message}
          </Alert>
        )}
      </RootBox>
    </>
  );
};

export default Signup;
