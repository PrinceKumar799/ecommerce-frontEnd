import FavoriteIcon from "@mui/icons-material/Favorite";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useState } from "react";
type WishlistProps = {
  productId: number;
};
const WishlistIcon: React.FC<WishlistProps> = ({ productId }) => {
  const isLoggedIn = useSelector((State: RootState) => State.auth.isLoggedIn);
  const navigate = useNavigate();
  const [color, setColor] = useState("gray");
  const handleAddToWishlist = async () => {
    if (!isLoggedIn) {
      alert("Please, Login First");
      navigate("/users/login");
    }
    const authToken = localStorage.getItem("authToken");
    try {
      await axios.post(
        "http://localhost:3000/wishlist",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("added");
      setColor("red");
      navigate("/");
    } catch (error) {
      navigate("/");
    }
  };
  return (
    <IconButton
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1,
        color: `${color}`,
      }}
      color="primary"
      onClick={() => handleAddToWishlist()}
    >
      <FavoriteIcon />
    </IconButton>
  );
};

export default WishlistIcon;
