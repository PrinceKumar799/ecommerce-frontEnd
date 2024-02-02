import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Link,
  Card,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      // Make API call to post login data
      await axios.post("http://localhost:3000/users", {
        email,
        password,
        firstName,
        lastName,
      });
      navigate("/login");
    } catch (error) {
      alert("User already exists");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      navigate("/signup");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card sx={{ padding: "1rem", marginTop: "auto" }}>
        <Typography variant="h5">Sign Up</Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignup}
          >
            Sign Up
          </Button>
          <Typography variant="body2" style={{ marginTop: "1rem" }}>
            Already have an account? <Link href="/login">Login</Link>
          </Typography>
        </form>
      </Card>
    </Container>
  );
};

export default Signup;
