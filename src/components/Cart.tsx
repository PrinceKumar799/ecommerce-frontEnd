import axios from "axios";
import { useEffect, useState } from "react";
import CartItems from "./CartCard";
import { useNavigate } from "react-router-dom";
import { Badge, Box, Button, CircularProgress, Paper } from "@mui/material";
// import { green } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { remove } from "../features/cart/cartSlict";
interface CartObj {
  cartItemId: number;
  productId: number;
  quantity: number;
  productName: string;
  price: number;
  image: string;
  rating: number;
}
import { REACT_APP_API_URL } from "../../constants.js";

type CartResponseData = CartObj[];
const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartResponseData>();
  const [totalValue, setTotalValue] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteFromCart = (
    productId: number,
    quantity: number,
    price: number
  ) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/users/login");
      return;
    }

    axios
      .patch(`${REACT_APP_API_URL}/carts/remove?productId=${productId}`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(() => {
        const newCartItems = cartItems?.filter(
          (cartItem) => cartItem.productId !== productId
        );
        setCartItems(newCartItems);
        setTotalValue(totalValue - quantity * price);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleTotalAmount = (price: number) => {
    // console.log(typeof price);
    setTotalValue(totalValue + +price);
  };

  // const makePayment = async () => {
  //   const authToken = localStorage.getItem("authToken");
  //   if (!authToken) {
  //     navigate("/users/login");
  //     return;
  //   }
  //   const stripe = await loadStripe(
  //     "pk_test_51OhUjdSIlwpnlAGIpupcblTe22OixlU399Y4gGnGds4pJdJRvrhWjU5zI8qxmDsK4I9vS83RrV3uur8bnSyj6izV00qE83SW9d"
  //   );
  //   const body = {
  //     products: cartItems,
  //   };
  //   axios
  //     .post(`REACT_APP_API_URL/carts/checkoutcart`, body, {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => console.log(err));
  // };
  useEffect(() => {
    dispatch(remove());
    const authToken = localStorage.getItem("authToken");

    // Check if authToken is available
    if (!authToken) {
      navigate("/users/login");
      return;
    }
    const apiUrl = `${REACT_APP_API_URL}/carts`;

    // Include Authorization header in the request
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setCartItems(response.data);
        setTotalValue(
          response.data.reduce((accumulator: number, currObj: CartObj) => {
            return accumulator + currObj.price * currObj.quantity;
          }, 0)
        );
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
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
          marginLeft: "20%",
          marginBottom: "2rem",
          height: "5rem",
          fontWeight: "bold",
        }}
      >
        <Badge>Total: ₹{totalValue}</Badge>
        <Button variant="contained" color="success" onClick={() => {}}>
          Checkout
        </Button>
      </Paper>
    </Box>
  );
};

export default Cart;
