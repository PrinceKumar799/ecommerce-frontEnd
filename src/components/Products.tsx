import { Box, Pagination } from "@mui/material";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Shimmer from "./Shimmer";

type ProductObj = {
  productId: number;
  name: string;
  category: string;
  ratings: number;
  price: number;
  image: string;
  description: string;
  stockQuantity: number;
};

interface productDataResponse {
  data: ProductObj[];
}

// type ProductData = ProductObj[];
const Products: React.FC = () => {
  const [products, setProducts] = useState<productDataResponse>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const filter = useSelector((state: RootState) => state.search.searchTerm);
  const handePageChage = (event, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const apiUrl = `http://localhost:3000/products?name=${filter}&p=${page}`;
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        if (!products) setProducts(response.data);
        else {
          setProducts(response.data);
        }
        //console.log("products", response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [filter, page]);

  useEffect(() => {}, []);
  //Impelment Shimmer
  if (loading) return <Shimmer />;

  return (
    <div>
      <Box className="outer-cnt">
        {products?.data?.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        marginTop="2rem"
        marginBottom="2rem"
      >
        <Pagination
          count={5} // Replace with the actual count based on your data
          page={page}
          color="primary"
          onChange={handePageChage}
          sx={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: "1rem",
          }}
        />
      </Box>
    </div>
  );
};

export default Products;
