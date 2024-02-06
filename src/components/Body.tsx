import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Login from "./Login";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import Wishlist from "./WishList";
import UpdateProductForm from "./UpdateProductForm";
import ProductsByUser from "./ProductsByUser";
import Shimmer from "./Shimmer";
const Signup = React.lazy(() => import("./Signup"));
const Cart = React.lazy(() => import("./Cart"));
const User = React.lazy(() => import("./User"));
const ProductForm = React.lazy(() => import("./ProductForm"));
const Body: React.FC = () => {
  return (
    <div className="body">
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="products">
          <Route path="addProducts" element={<ProductForm />} />
          <Route
            path="editProducts/products/updateProducts/:productId"
            element={<UpdateProductForm />}
          />
          <Route path="editProducts/" element={<ProductsByUser />} />
          <Route path=":productId" element={<ProductDetails />} />
        </Route>

        <Route path="/signup" Component={Signup} />
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
  );
};

export default Body;
