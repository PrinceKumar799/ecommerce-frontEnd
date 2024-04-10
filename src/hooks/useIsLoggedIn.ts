import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { REACT_APP_API_URL } from "../../constants.js";

const useIsLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        setIsLoggedIn(!!authToken);
      }, [isLoggedIn]);
    
    
    const handleLogin = async (email:string,password:string) => {
        try {
          // Make API call to post login data
          const response = await axios.post(`${REACT_APP_API_URL}/users/login`, {
            email,
            password,
          });
          const authToken = response.data.token;
    
          // Store the token in local storage
            localStorage.setItem("authToken", authToken);
            setIsLoggedIn(true);
          navigate("/");
    
        } catch (error) {
        //   setError("User does not exists");
        }
    };
    const handleLogout = async () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        navigate('/');
    }
    return {isLoggedIn,handleLogin,handleLogout}
}

export default useIsLoggedIn;