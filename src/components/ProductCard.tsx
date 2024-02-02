import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import WishlistIcon from "./WishlistIcon";
interface Product {
  name: string;
  productId: number;
  ratings: number;
  category: string;
  price: number;
  image: string;
}
interface ProductCardProps {
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, ratings, price, image, productId } = product;
  const navigate = useNavigate();
  const isLoggedIn = useSelector((State: RootState) => State.auth.isLoggedIn);

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
      navigate("/carts");
    } catch (error) {
      // Handle the error
      console.error("Error adding product to cart:");
    }
  };

  return (
    <Card className="inner-cnt1" raised style={{ position: "relative" }}>
      <CardMedia
        component="img"
        alt={name}
        height="140"
        image={image}
        style={{ objectFit: "fill" }}
      />
      <WishlistIcon productId={productId} />
      <Link to={`/products/${productId}`}>
        <CardContent>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Ratings: {ratings}
          </Typography>
          <Typography variant="body1" color="blueviolet">
            Price: ₹{price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="large"
            color="primary"
            variant="contained"
            sx={{
              margin: "auto",
            }}
            onClick={() => handleAddToCart()}
          >
            Add to cart
          </Button>
        </CardActions>
      </Link>
    </Card>
  );
};

export default ProductCard;
