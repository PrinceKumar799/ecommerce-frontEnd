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

  const handleAddToCart = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      alert("Please, Login First");
      navigate("/users/login");
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/carts/addToCart",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert("Product Added To cart Succesfully");
      navigate("/");
    } catch (error) {
      // Handle the error
      console.error("Error adding product to cart:");
    }
  };

  return (
    <Card
      className="inner-cnt1"
      // style={{ marginBottom: "2.0rem" }}
    >
      <Link to={`/products/${productId}`}>
        <CardMedia
          component="img"
          alt={name}
          height="140"
          image={image}
          style={{ objectFit: "fill" }}
        />
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
