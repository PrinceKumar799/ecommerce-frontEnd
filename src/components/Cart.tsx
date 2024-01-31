import axios from "axios";
import { useEffect, useState } from "react";
import CartItems from "./CartCard";
import { useNavigate } from "react-router-dom";
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
  if (!cartItems) return <h3>Loading...</h3>;

  return (
    <div>
      {cartItems.map((cartItemData) => (
        <CartItems
          key={cartItemData.cartItemId}
          cartItemData={cartItemData}
          onDelete={deleteFromCart}
        />
      ))}
    </div>
  );
};

export default Cart;
