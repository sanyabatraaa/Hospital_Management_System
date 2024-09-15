import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import AddNewDoctor from "./components/AddNewDoctor"
import AddNewAdmin from "./components/AddNewAdmin"
import Messages from "./components/Messages"
import Doctors from "./components/Doctors"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from "react"
import { Context } from "./main"
import axios from "axios"
import "./App.css"

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
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
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/doctor/addnew" element={<AddNewDoctor/>}></Route>
        <Route path="/admin/addnew" element={<AddNewAdmin/>}></Route>
        <Route path="/messages" element={<Messages/>}></Route>
        <Route path="/doctors" element={<Doctors/>}></Route>
      </Routes>
      <ToastContainer postion="top-center"/>
     </Router>
    </>
  )
}

export default App