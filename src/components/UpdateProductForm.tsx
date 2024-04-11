import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import FilledInput from "@mui/material/FilledInput";
import Button from "@mui/material/Button";
import { Card, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProductForm = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    category: "",
    imageURL: "",
  });
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URLL}/products/${productId}`
        );
        const productData = response.data;
        console.log(productData);
        setFormData({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          stockQuantity: productData.stockQuantity,
          category: productData.category,
          imageURL: productData.image,
        });
        console.log(productData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let val: number | string = value;
    if (name === "price" || name === "stockQuantity") {
      val = +value;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: val,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        alert("You are logged Out!!!");
        navigate("/login");
      }
      await axios.patch(
        `${process.env.REACT_APP_API_URLL}/products/${productId}`,
        {
          name: formData.name,
          description: formData.description,
          stockQuantity: +formData.stockQuantity,
          price: +formData.price,
          category: formData.category,
          image: formData.imageURL,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert("Product Updated Successfully");
      navigate("/user/userDetails");
      setFormData({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        category: "",
        imageURL: "",
      });
    } catch (error) {
      alert("Product operation failed");
      console.error("Error:", error);
    }
  };
  return (
    <Container component="main" maxWidth="sm">
      <Card sx={{ padding: "1rem", marginTop: "auto" }}>
        <Typography variant="h5">{"Update Product Details"}</Typography>
        <form className="form">
          <FilledInput
            placeholder="Name"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <FilledInput
            placeholder="Category"
            name="category"
            type="string"
            value={formData.category}
            onChange={handleChange}
            fullWidth
            required
          />
          <FilledInput
            placeholder="Product Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
          />
          <FilledInput
            placeholder="Price per piece"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            required
          />
          <FilledInput
            placeholder="Stocks quantity"
            name="stockQuantity"
            type="number"
            value={formData.stockQuantity}
            onChange={handleChange}
            fullWidth
            required
          />
          <FilledInput
            placeholder="Image URL"
            name="imageURL"
            type="string"
            value={formData.imageURL}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Update
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default UpdateProductForm;
