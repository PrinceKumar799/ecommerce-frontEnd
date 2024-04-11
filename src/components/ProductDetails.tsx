import { useNavigate, useParams } from "react-router-dom";
// import productsData from "../utils/productsData";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewAccordion from "./ReviewAccordion";
import { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../features/cart/cartSlict";
import ConfiramationSnackBar from "./ConfirmationSnackBar";

interface User {
  userId: string;
  firstName: string;
  lastName: string;
}
export interface Review {
  reviewId: number;
  content: string;
  user: User;
}
interface ProductReviews {
  name: string;
  category: string;
  ratings: number;
  price: number;
  image: string;
  description: string;
  review: Review[];
}

const ProductDetails: React.FC = () => {
  //Get by id  from the Api
  const { productId } = useParams<{ productId: string }>();

  const [productDetails, setProductDetails] = useState<ProductReviews>();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((State: RootState) => State.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [snackbarObj, setSnackbarObj] = useState({ msg: "", isError: false });
  const handleAddToCart = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!isLoggedIn) {
      //alert("Please, Login First");
      localStorage.removeItem("authToken");
      navigate("/users/login");
    }
    const authToken = localStorage.getItem("authToken");
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URLL}/carts/addToCart`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setSnackbarObj({
        msg: "Product Added To cart Succesfully",
        isError: false,
      });
      dispatch(add());
    } catch (error) {
      // Handle the error
      setSnackbarObj({ msg: "Error adding product to cart", isError: true });
    }
  };
  const handleAddToWishlist = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!isLoggedIn) {
      alert("Please, Login First");
      localStorage.removeItem("authToken");
      navigate("/users/login");
    }
    const authToken = localStorage.getItem("authToken");
    try {
      if (!productId) throw new Error();
      const id = +productId;
      await axios.post(
        `${process.env.REACT_APP_API_URLL}/wishlist`,
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setSnackbarObj({
        msg: "Product Added To Wishlist Succesfully",
        isError: false,
      });
    } catch (error) {
      setSnackbarObj({
        msg: "Error adding product to wishlist",
        isError: true,
      });
    }
  };
  useEffect(() => {
    axios
      .get(`process.env.REACT_APP_API_URLL/products/${productId}`)
      .then((response) => {
        setProductDetails(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }, []);
  if (!productDetails) return <h1>Loading...</h1>;
  if (!productId) return <h2>No Such product exists</h2>;
  // console.log("productDetails", productDetails?.review);
  return (
    <Box sx={{ padding: "2%" }}>
      <Grid container spacing={2}>
        <Grid item xs={10} md={6}>
          <Box>
            <img
              className="product-img"
              src={productDetails?.image}
              alt="product image"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Paper elevation={3} sx={{ padding: "2rem" }}>
                <Stack direction="column">
                  <Typography
                    variant="h3"
                    marginBottom="1rem"
                    color="ThreeDHighlight"
                    boxShadow="initial"
                  >
                    {productDetails?.name}
                  </Typography>
                  <Stack direction="column" justifyContent="center">
                    <Typography variant="subtitle1">
                      <Badge
                        badgeContent={productDetails?.category}
                        color="primary"
                        sx={{ marginBottom: "1rem" }}
                      ></Badge>
                    </Typography>
                    <Typography variant="subtitle1">
                      <Badge
                        badgeContent={productDetails?.description}
                        color="secondary"
                        sx={{ marginBottom: "1rem" }}
                      ></Badge>
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle1">
                    <Rating value={productDetails?.ratings}></Rating>
                  </Typography>
                  <Typography
                    variant="h5"
                    marginBottom="1rem"
                    color="Highlight"
                  >
                    Price: {productDetails?.price}
                  </Typography>
                  <ButtonGroup style={{ alignSelf: "center" }}>
                    <Button onClick={handleAddToCart} variant="contained">
                      Buy Now
                    </Button>
                    <Button variant="outlined" onClick={handleAddToWishlist}>
                      Add to wishlist
                    </Button>
                  </ButtonGroup>
                </Stack>
              </Paper>
            </Grid>
            <Grid item>
              <ReviewAccordion
                reviews={productDetails?.review}
                productId={productId}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {snackbarObj.msg && (
        <ConfiramationSnackBar
          onAdd={() => setSnackbarObj({ msg: "", isError: false })}
          message={snackbarObj.msg}
          isError={snackbarObj.isError}
        />
      )}
    </Box>
  );
};

export default ProductDetails;
