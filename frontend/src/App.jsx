
import "./App.css";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import { useContext, useEffect } from "react";

import axios from "axios";
import { Context } from "./main";
import Footer from "./components/Footer";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  return (
    
    <>
    
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/appointment" element={<Appointment/>}></Route>
        <Route path="/about" element={<AboutUs/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
      <ToastContainer postion="top-center"/>
    </Router>
    <Footer/>
    </>
  )
}

export default App