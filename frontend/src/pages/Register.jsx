import { useContext, useState } from "react"
import {Context} from "../main"
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Register = () => {
  const {isAuthenticated,setIsAuthenticated} = useContext(Context)
  const [firstName, setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob,setDob] = useState("");
  const [password,setPassword] = useState("");
  const [gender,setGender] = useState("")

  const navigateTo = useNavigate();
  
  const handleRegistration = async(e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:4000/api/v1/user/patient/register",
        {firstName,lastName,email,phone,dob,gender,password,role:"Patient"},{
          withCredentials: true,
          headers : {"Content-Type":"application/json"}
        }
      ).then(()=>{
        toast.success("Registered successfully")
        setIsAuthenticated(true);
        navigateTo("/");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setDob("");
        setGender("");
        setPassword("");
      })
    }catch(e){
      toast.error(e.response.data.message);
    }
  }

  if(isAuthenticated){
    return <Navigate to="/"></Navigate>
  }

  
  return (
    <>
    <div className="container form-component register-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleRegistration}>
        <div>
          <input type="text" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}></input>
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}></input>
        </div>
        <div>
          <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
          <input type="number" placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)}></input>
        </div>
        <div>
          <input type="date" placeholder="Date of Birth" value={dob} onChange={(e)=>setDob(e.target.value)}></input>
        </div>
        <div>
          <select value={gender} onChange={(e)=>setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        </div>
        <div>
        <p>Already Registered?</p>
        <Link to={"/login"}>Login Now</Link>
        <div>
          <button type="submit">Register</button>
        </div>
      </div>
      </form>
    </div>
    </>
  )
}

export default Register