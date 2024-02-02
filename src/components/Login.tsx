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
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      // Make API call to post login data
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      const authToken = response.data.token;

      // Store the token in local storage
      localStorage.setItem("authToken", authToken);
      dispatch(login());
    } catch (error) {
      //   setError("User does not exists");
    }
    navigate("/");
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card variant="elevation" sx={{ padding: "1.2rem" }}>
        <Typography variant="h5">Login</Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
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
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
          {/* {error && (
            <Typography variant="h6" color="red">
              {error}
            </Typography>
          )} */}
          <Typography variant="body2" style={{ marginTop: "1rem" }}>
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </Typography>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
