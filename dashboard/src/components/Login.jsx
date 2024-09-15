import { useContext, useState } from "react";
import {Context} from "../main"
import {  Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const {isAuthenticated,setIsAuthenticated}= useContext(Context)

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("")

  const navigateTo= useNavigate();

  const handleLogin = async (e) =>{
    e.preventDefault();
    try{
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",{
          email, password, role:"Admin"
        },{
          withCredentials: true,
          headers:{ "Content-Type": "application/json"}
        }
      )
      toast.success("LoggedIn successfully");
      setIsAuthenticated(true);
      navigateTo("/")
    }catch(e){
      toast.error(e.response.data.message)
    }
  }

  if(isAuthenticated){
    return <Navigate to={"/"}></Navigate>
  }
  return (
    <div className="conatiner form-component">
    <h2>Login</h2>
    <p>Only Admins are allowed to access these resources</p>
    <form onSubmit={handleLogin}>
      <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email"></input>
      <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password"></input>
      <div>
        
        <div>
          <button type="submit">Login</button>
        </div>
      </div>
    </form>
   </div>
  )
}

export default Login
