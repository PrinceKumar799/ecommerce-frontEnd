import { useParams } from "react-router-dom";
import productsData from "../utils/productsData";
import { Box, Grid, Rating, Typography } from "@mui/material";
import "./ProductDetails.css";
import { useEffect, useState } from "react";
import axios from "axios";
interface User {
  userId: string;
  firstName: string;
  lastName: string;
}
interface Review {
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
  reviews: Review[];
}

const ProductDetails: React.FC = () => {
  //Get by id  from the Api
  const { productId } = useParams<{ productId: string }>();
  console.log(productId);
  const [productDetails, setProductDetails] = useState<ProductReviews>();
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
  return (
    <Box sx={{ padding: "10%" }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <img src={productDetails?.image} alt="product image" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h3">{productDetails?.name}</Typography>
            </Grid>
            <Grid item>
              <Typography>{productDetails?.category}</Typography>
            </Grid>
            <Grid item>
              <Typography>{productDetails?.ratings}⭐</Typography>
            </Grid>
            <Grid item>
              <Typography>{productDetails?.price}</Typography>
            </Grid>
            <Grid item>
              <Typography>{productDetails?.description}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
