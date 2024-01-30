import { useParams } from "react-router-dom";
import productsData from "../utils/productsData";
import { Box, Rating, Typography } from "@mui/material";
import "./ProductDetails.css";
import { useEffect, useState } from "react";
import axios from "axios";

interface Review {
  content: string;
}
interface ProductDataObj {
  productId: number;
  name: string;
  category: string;
  ratings: number;
  price: number;
  image: string;
  description: string;
  stockQuantity: number;
  reviews: Review[];
}

const ProductDetails: React.FC = () => {
  //Get by id  from the Api
  return <></>;
  // const [product,setProduct] = useState<ProductDataObj>()
  // const productData = useEffect(() => {
  //   const apiUrl = "http://localhost:3000/products/";
  //   axios
  //     .get(apiUrl)
  //     .then((response) => {
  //       setProducts(response.data);
  //       console.log("products", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching products:", error);
  //     });
  // }, []);

  // const { id } = useParams();
  // if (!id) return <Typography variant="h3"> No Such Product</Typography>;
  //   return (
  //   <div className="productDet">
  //     <img src={productData.image}></img>
  //     <Box>
  //       <Typography variant="h3">{productData.name}</Typography>
  //       <Typography variant="h6">{productData.category}</Typography>
  //       <Typography variant="h4">{productData.price}</Typography>
  //       <Typography component="legend" variant="h5">
  //         Rating
  //       </Typography>
  //       <Rating name="read-only" value={productData.ratings} readOnly />
  //     </Box>
  //   </div>
  // );
};

export default ProductDetails;
