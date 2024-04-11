import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import WishlistCard from "./WishlistCard";

interface WishlistObj {
  productName: string;
  price: number;
  image: string;
  rating: number;
  productId: number;
}

type WishlistResponseData = WishlistObj[];
const Wishlist: React.FC = () => {
  const [wislistItems, setWislistItems] = useState<WishlistResponseData>();
  const navigate = useNavigate();
  const deleteFromWishlist = (productId: number) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/users/login");
      return;
    }

    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/wishlist/removeProduct/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then(() => {
        const newWishlistItems = wislistItems?.filter(
          (cartItem) => cartItem.productId !== productId
        );
        setWislistItems(newWishlistItems);
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
    const apiUrl = `${process.env.REACT_APP_API_URL}/wishlist`;

    // Include Authorization header in the request
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setWislistItems(response.data.map((item) => item.product));
      })
      .catch((error) => {
        console.error("Error fetching Cart:", error);
      });
  }, []);
  if (!wislistItems) return <CircularProgress style={{ margin: "auto" }} />;

  return (
    <Box>
      {wislistItems.map((wishlistItemData) => (
        <WishlistCard
          key={wishlistItemData.productId}
          wishlistItemData={wishlistItemData}
          onDelete={deleteFromWishlist}
        />
      ))}
    </Box>
  );
};

export default Wishlist;
