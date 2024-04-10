import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Card,
  FormControl,
  CardHeader,
  CardContent,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfiramationSnackBar from "./ConfirmationSnackBar";
import { REACT_APP_API_URL } from "../../constants.js";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Make API call to post login data
      const response = await axios.post(`${REACT_APP_API_URL}/users/login`, {
        email,
        password,
      });
      const authToken = response.data.token;

      // Store the token in local storage
      localStorage.setItem("authToken", authToken);
      dispatch(login());
      navigate("/");
    } catch (error) {
      // console.log("error");
      setError(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card variant="elevation" sx={{ padding: "1rem", marginTop: "auto" }}>
        <Typography variant="h5">Login</Typography>
        <CardContent>
          <form onSubmit={handleLogin}>
            <FormControl fullWidth margin="normal">
              <TextField
                variant="outlined"
                fullWidth
                type="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                variant="outlined"
                fullWidth
                required
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Login
            </Button>
          </form>
          {error && (
            <ConfiramationSnackBar
              message="Something went wrong"
              isError={true}
              onAdd={() => setError(false)}
            />
          )}
          <Typography variant="body2" style={{ marginTop: "1rem" }}>
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
