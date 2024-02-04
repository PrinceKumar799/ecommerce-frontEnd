import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
interface ProductObj {
  productId: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  imageURL: string;
}
const ProductsByUser: React.FC = () => {
  const [productData, setProductData] = useState<ProductObj[]>();
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/products/user",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setProductData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [authToken]);

  const handleDelete = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:3000/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      alert("Product deleted successfully");
      const newProducts = productData?.filter(
        (product) => product.productId != productId
      );
      setProductData(newProducts);
    } catch (error) {
      alert("Error deleting product");
    }
  };

  //   const handleUpdate = (product: ProductObj) => {
  //     setSelectedProduct(product);
  //     setOpenDialog(true);
  //   };

  //   const handleCloseDialog = () => {
  //     setSelectedProduct({});
  //     setOpenDialog(false);
  //   };

  //   const handleUpdateSubmit = async () => {
  //     try {
  //       await axios.put(
  //         `http://localhost:3000/products/${selectedProduct.id}`,
  //         selectedProduct,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${authToken}`,
  //           },
  //         }
  //       );
  //       alert("Product updated successfully");
  //       handleCloseDialog();
  //       // Refresh the data after update
  //     } catch (error) {
  //       alert("Error updating product");
  //     }
  //   };

  //   const handleChange = (event) => {
  //     const { name, value } = event.target;
  //     setSelectedProduct((prevProduct) => ({

  //       [name]: value,
  //     }));
  //   };

  return (
    <Container component="main" maxWidth="lg">
      <TableContainer component={Card} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow selected>
              <TableCell variant="head">Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock Quantity</TableCell>
              <TableCell>Image URL</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData?.map((product) => (
              <TableRow key={product.productId}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stockQuantity}</TableCell>
                <TableCell>{product.imageURL}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      console.log("edit button clicked");
                      navigate(`products/updateProducts/${product.productId}`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(product.productId)}
                    sx={{ marginLeft: 1 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ProductsByUser;
