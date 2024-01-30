import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

interface CartCardProps {
  cartItemData: {
    quantity: number;
    productName: string;
    price: number;
    image: string;
    rating: number;
    productId: number;
  };
  onAdd: () => void;
  onRemove: () => void;
  onDelete: (productId: number) => void;
}

const CartCard: React.FC<CartCardProps> = ({
  cartItemData,
  onAdd,
  onRemove,
  onDelete,
}) => {
  const { quantity, productName, price, image, rating, productId } =
    cartItemData;

  return (
    <Card sx={{ display: "flex", marginBottom: "1rem" }}>
      <CardMedia
        component="img"
        alt={productName}
        height="140"
        image={image}
        sx={{ minWidth: 140 }}
      />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <Typography variant="h6">{productName}</Typography>
        <Typography variant="subtitle1">Price: ${price}</Typography>
        <Typography variant="subtitle1">Quantity: {quantity}</Typography>
        <Typography variant="subtitle1">Rating: {rating}</Typography>
        <div style={{ marginTop: "auto" }}>
          <IconButton onClick={onAdd} color="primary">
            <AddIcon />
          </IconButton>
          <IconButton onClick={onRemove} color="secondary">
            <RemoveIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(productId)} color="error">
            <DeleteIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartCard;
