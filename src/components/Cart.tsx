import axios from "axios";
import { useEffect, useState } from "react";
import CartItems from "./CartCard";
import { useNavigate } from "react-router-dom";
import { Badge, Box, Button, CircularProgress, Paper } from "@mui/material";
import { green } from "@mui/material/colors";
interface CartObj {
  cartItemId: number;
  productId: number;
  quantity: number;
  productName: string;
  price: number;
  image: string;
  rating: number;
}

type CartResponseData = CartObj[];
const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartResponseData>();
  const [totalValue, setTotalValue] = useState<number>(0);
  const navigate = useNavigate();
  const deleteFromCart = (productId: number) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/users/login");
      return;
    }

    axios
      .patch(
        `http://localhost:3000/carts/remove?productId=${productId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then(() => {
        const newCartItems = cartItems?.filter(
          (cartItem) => cartItem.productId !== productId
        );
        setCartItems(newCartItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleTotalAmount = (value: number) => {
    setTotalValue(totalValue + value);
  };
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    // Check if authToken is available
    if (!authToken) {
      navigate("/users/login");
      return;
    }
    const apiUrl = "http://localhost:3000/carts";

    // Include Authorization header in the request
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Cart:", error);
      });
  }, []);
  if (!cartItems) return <CircularProgress />;

  return (
    <Box>
      {cartItems.map((cartItemData) => (
        <CartItems
          key={cartItemData.cartItemId}
          cartItemData={cartItemData}
          onDelete={deleteFromCart}
          onUpdate={handleTotalAmount}
        />
      ))}
      <Paper
        elevation={20}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "aquamarine",
          marginLeft: "75%",
          marginBottom: "2rem",
          height: "5rem",
          fontWeight: "bold",
        }}
      >
        <Badge>Total: {totalValue}</Badge>
        <Button variant="contained" color="success">
          Checkout
        </Button>
      </Paper>
    </Box>
  );
};

export default Cart;
