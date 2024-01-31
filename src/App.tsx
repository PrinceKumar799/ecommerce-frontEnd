import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Body from "./components/Body";
// import productsData from "./utils/productsData";
// type ProductObj = {
//   name: string;
//   category: string;
//   ratings: number;
//   price: number;
//   image: string;
// };
function App() {
  return (
    <Router>
      <Header />
      {/* <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/signup" Component={Signup} />
      </Routes> */}
      <Body />
      <Footer />
    </Router>
  );
}

export default App;
