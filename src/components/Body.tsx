import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import Wishlist from "./WishList";
import UpdateProductForm from "./UpdateProductForm";
import ProductsByUser from "./ProductsByUser";
import Shimmer from "./Shimmer";
import Header from "./Header";
import Footer from "./Footer";
const Cart = React.lazy(() => import("./Cart"));
const User = React.lazy(() => import("./User"));
const ProductForm = React.lazy(() => import("./ProductForm"));
const Body: React.FC = () => {
  return (
    <>
      <Header />
      <div className="body">
        <Routes>
          <Route path="products">
            <Route
              path="addProducts"
              element={
                <Suspense fallback={<Shimmer />}>
                  <ProductForm />
                </Suspense>
              }
            />
            <Route
              path="editProducts/products/updateProducts/:productId"
              element={<UpdateProductForm />}
            />
            <Route path="editProducts/" element={<ProductsByUser />} />
            <Route path=":productId" element={<ProductDetails />} />
            <Route index element={<Products />} />
          </Route>
          <Route
            path="/carts"
            element={
              <Suspense fallback={<Shimmer />}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="/users/userDetails"
            element={
              <Suspense fallback={<Shimmer />}>
                <User></User>
              </Suspense>
            }
          />
          <Route path="/wishlist" Component={Wishlist}></Route>
          <Route path="/" Component={Products} />
          <Route path="*" Component={Products}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Body;
