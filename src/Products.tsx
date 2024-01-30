import { Box, Pagination } from "@mui/material";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";

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
  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleFilter = (data: string): void => {
    setFilterByName(data);
  };
  const handePageChage = (event, value: number) => {
    setPage(value);
  };
  useEffect(() => {
    const apiUrl = `http://localhost:3000/products?name=${filterByName}&p=${page}`;
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
  }, [filterByName, page]);

  //Impelment Shimmer
  if (!products) return <h2>Loading...</h2>;

  return (
    <div>
      <SearchBar handleNameFilter={handleFilter} />
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-evenly"
      >
        {products?.data?.map((product) => (
          <ProductCard product={product} />
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
        />
      </Box>
    </div>
  );
};

export default Products;
