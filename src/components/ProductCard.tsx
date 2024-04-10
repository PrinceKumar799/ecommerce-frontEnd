import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Snackbar,
  Rating,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import WishlistIcon from "./WishlistIcon";
import { add } from "../features/cart/cartSlict";
import ConfiramationSnackBar from "./ConfirmationSnackBar";
import { REACT_APP_API_URL } from "../../constants.js";

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
  const dispatch = useDispatch();
  const [snackbarObj, setSnackbarObj] = useState({ msg: "", isError: false });
  const handleAddToCart = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!isLoggedIn) {
      // alert("Please, Login First");
      localStorage.removeItem("authToken");
      navigate("/login");
    }
    const authToken = localStorage.getItem("authToken");
    try {
      await axios.post(
        `${REACT_APP_API_URL}/carts/addToCart`,
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

  return (
    <Card className="inner-cnt1" raised style={{ position: "relative" }}>
      <CardMedia
        component="img"
        alt={name}
        height="140"
        image={image}
        style={{ objectFit: "contain" }}
      />
      <WishlistIcon productId={productId} />
      <Link to={`/products/${productId}`}>
        <CardContent>
          <Typography variant="h6">{name}</Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Ratings: {ratings}
          </Typography> */}
          <Rating value={ratings} size="small" />
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
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </CardActions>
      </Link>
      {snackbarObj.msg && (
        <ConfiramationSnackBar
          message={snackbarObj.msg}
          isError={snackbarObj.isError}
          onAdd={() => setSnackbarObj({ msg: "", isError: false })}
        />
      )}
    </Card>
  );
};

export default ProductCard;
