import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
interface WishlistCardProps {
  wishlistItemData: {
    name: string;
    productId: number;
    price: number;
    image: string;
    rating: number;
  };
  onDelete: (productId: number) => void;
}

const WishlistCard: React.FC<WishlistCardProps> = ({
  wishlistItemData,
  onDelete,
}) => {
  const { name, price, image, rating, productId } = wishlistItemData;
  console.log(wishlistItemData);
  return (
    <Card sx={{ marginBottom: "1rem", padding: "1rem" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <CardMedia
            component="img"
            alt={name}
            height="140"
            image={image}
            sx={{ objectFit: "contain" }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={9}>
          <CardContent className="cart-card-cnt">
            <Grid container direction="column" spacing="2">
              <Grid item>
                <Typography variant="subtitle1">{name}</Typography>
              </Grid>
              <Grid>
                <Typography variant="subtitle2">Price: ₹{price}</Typography>
              </Grid>
              <Grid>
                <Typography variant="h6">{rating}</Typography>
              </Grid>
            </Grid>
            <IconButton onClick={() => onDelete(productId)} color="error">
              <DeleteOutlined />
            </IconButton>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default WishlistCard;
