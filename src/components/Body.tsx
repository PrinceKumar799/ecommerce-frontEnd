import { Route, Routes } from "react-router-dom";
import Login from "../Login";
import Products from "../Products";
import ProductDetails from "./ProductDetails";
import Signup from "../Signup";
import Cart from "./Cart";
const Body: React.FC = () => {
  return (
    <div className="body">
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/signup" Component={Signup} />
        <Route path="/carts" Component={Cart} />
      </Routes>
    </div>
  );
};

export default Body;
