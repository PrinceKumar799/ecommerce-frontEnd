import React, { useState } from "react";
import FilledInput from "@mui/material/FilledInput";
import Button from "@mui/material/Button";
import { Card, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  // const classes = useStyles();
  const { productId } = useParams<{ productId: string }>();
  const [fill, setfill] = useState(false);
  if (productId) setfill(true);
  const intialState = {
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    category: "",
    imageURL: "",
  };
  const [formData, setFormData] = useState(intialState);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    let val: string | number;
    if (name === "price" || name === "stockQuantity") {
      val = +value;
    } else val = value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: val,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Make API call to post login data
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        alert("You are logged Out!!!");
        navigate("login");
      }
      await axios.post(
        `${process.env.REACT_APP_API_URLL}/products`,
        {
          name: formData.name,
          description: formData.description,
          stockQuantity: formData.stockQuantity,
          price: formData.price,
          category: formData.category,
          image: formData.imageURL,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert("Product Added Sucessfully");
      setFormData(intialState);
    } catch (error) {
      alert("Product was not added");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Card sx={{ padding: "1rem", marginTop: "auto" }}>
        <Typography variant="h5">Add Product Details</Typography>
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
            Submit
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default ProductForm;
