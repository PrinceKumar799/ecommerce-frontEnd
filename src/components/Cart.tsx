import axios from "axios";
import { useEffect, useState } from "react";
import CartItems from "./CartCard";
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
  const addToCart = () => {};
  const removeFromCart = () => {};
  const deleteFromCart = (productId: number) => {
    axios
      .patch(`http://localhost:3000/carts/remove?productId:${productId}`)
      .then(() => {
        const newCartItems = cartItems?.filter(
          (cartItem) => cartItem.productId != productId
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
      console.log("User not authenticated. Handle this case.");
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
          onAdd={addToCart}
          onDelete={deleteFromCart}
          onRemove={removeFromCart}
        />
      ))}
    </div>
  );
};

export default Cart;
