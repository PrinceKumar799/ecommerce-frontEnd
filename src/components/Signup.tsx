import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Link,
  Card,
  FormControl,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfiramationSnackBar from "./ConfirmationSnackBar";
import { REACT_APP_API_URL } from "../../constants.js";

const initialUserData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
const Signup: React.FC = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Make API call to post login data
      await axios.post(`${REACT_APP_API_URL}/users`, userData);
      navigate("/login");
    } catch (error) {
      if (error.response.status === 400) setErrorMessage("User Already Exists");
      else setErrorMessage("Something went wrong");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card variant="elevation" sx={{ padding: "1rem", marginTop: "auto" }}>
        <CardContent>
          <Typography variant="h5">Sign Up</Typography>
          <form onSubmit={handleSignup}>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                label="First Name"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                autoFocus
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                label="Last Name"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                label="Email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                margin="normal"
                required
                label="Password"
                name="password"
                type="password"
                value={userData.password}
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign Up
            </Button>
            <Typography variant="body2" style={{ marginTop: "1rem" }}>
              Already have an account? <Link href="/login">Login</Link>
            </Typography>
          </form>
          {errorMessage && (
            <ConfiramationSnackBar
              onAdd={() => setErrorMessage("")}
              isError={true}
              message={errorMessage}
            />
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;
