import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import Signup from "./Signup";
import Cart from "./Cart";
import User from "./User";
import ProductForm from "./ProductForm";
import Wishlist from "./WishList";
const Body: React.FC = () => {
  return (
    <div className="body">
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="products">
          <Route path="addProducts" element={<ProductForm />} />
          <Route path=":productId" element={<ProductDetails />} />
        </Route>

        <Route path="/signup" Component={Signup} />
        <Route path="/carts" Component={Cart} />
        <Route path="/users/userDetails" Component={User}></Route>
        <Route path="/wishlist" Component={Wishlist}></Route>
        <Route path="/" Component={Products} />
        <Route path="*" Component={Products}></Route>
      </Routes>
    </div>
  );
};

export default Body;
