import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  ButtonGroup,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const UserDetails: React.FC = () => {
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      navigate("/users/login");
      return;
    }

    const apiUrl = `${process.env.REACT_APP_API_URLL}/users/userDetails`;

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          dispatch(logout());
          navigate("/users/login");
        }
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ marginTop: 4 }}>
        <CardContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Typography variant="h4" gutterBottom>
                User Details
              </Typography>
              <Typography variant="body1" paragraph>
                Name: {userData.firstName + " " + userData.lastName}
              </Typography>
              <Typography variant="body1" paragraph>
                Email: {userData?.email}
              </Typography>

              <ButtonGroup variant="text">
                <Button
                  color="primary"
                  onClick={(event) => {
                    event.preventDefault();
                    navigate("/products/addProducts");
                  }}
                >
                  Add Products
                </Button>
                <Button
                  color="primary"
                  onClick={(event) => {
                    event.preventDefault();
                    console.log("herre navigating");
                    navigate("/products/editProducts");
                  }}
                >
                  Edit Products
                </Button>
                <Button color="primary" onClick={handleLogout}>
                  Logout
                </Button>
              </ButtonGroup>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserDetails;
