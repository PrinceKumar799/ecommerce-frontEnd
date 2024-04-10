import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";

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
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="*" Component={Body} />
      </Routes>
    </Router>
  );
}

export default App;
