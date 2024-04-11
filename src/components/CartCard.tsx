import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CartCardProps {
  cartItemData: {
    quantity: number;
    productName: string;
    price: number;
    image: string;
    rating: number;
    productId: number;
  };
  onDelete: (productId: number, quantity: number, price: number) => void;
  onUpdate: (value: number) => void;
}

const CartCard: React.FC<CartCardProps> = ({
  cartItemData,
  onDelete,
  onUpdate,
}) => {
  const { quantity, productName, price, image, productId } = cartItemData;
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const navigate = useNavigate();

  const handleIncreaseItemQuantity = () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      alert("Please, Login First");
      navigate("/users/login");
    }

    axios
      .post(
        "http://localhost:3000/carts/addToCart",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then(() => {
        setItemQuantity(itemQuantity + 1);
        onUpdate(price);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };
  const handleDecreaseItemQuantity = () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      alert("Please, Login First");
      navigate("/users/login");
    }

    axios
      .patch(
        "http://localhost:3000/carts/removeOne",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then(() => {
        setItemQuantity(itemQuantity - 1);
        onUpdate(-price);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };
  if (itemQuantity == 0) return <></>;
  return (
    <Card sx={{ marginBottom: "1rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <CardMedia
            component="img"
            alt={productName}
            height="140"
            image={image}
            sx={{ objectFit: "contain" }}
          />
          <Typography variant="h6">{productName}</Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={9}>
          <CardContent className="cart-card-cnt">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleIncreaseItemQuantity} color="primary">
                <AddIcon />
              </IconButton>
              <Typography variant="subtitle1">{itemQuantity}</Typography>
              <IconButton
                onClick={handleDecreaseItemQuantity}
                color="secondary"
              >
                <RemoveIcon />
              </IconButton>
            </Box>
            <Typography variant="subtitle1">
              Subtotal: ₹{price * itemQuantity}
            </Typography>
            <IconButton
              onClick={() => onDelete(productId, quantity, price)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartCard;
