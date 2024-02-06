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
  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert("Please, Login First");
      navigate("/users/login");
    }
    const authToken = localStorage.getItem("authToken");
    try {
      await axios.post(
        "http://localhost:3000/carts/addToCart",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert("Product Added To cart Succesfully");
      dispatch(add());
    } catch (error) {
      // Handle the error
      console.error("Error adding product to cart:");
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${productId}`)
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
        <Grid item xs={10} md={5}>
          <Box>
            <img
              className="product-img"
              src={productDetails?.image}
              alt="product image"
            />
          </Box>
        </Grid>
        <Grid item xs={10} md={5} marginLeft="auto">
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
                    <Button variant="outlined">Add to wishlist</Button>
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
    </Box>
  );
};

export default ProductDetails;
