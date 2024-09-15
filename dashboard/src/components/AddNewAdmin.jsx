import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

 
const AddNewAdmin = () => {
  const {isAuthenticated} = useContext(Context)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const handleAdmin=async(e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:4000/api/v1/user/admin/addnew",
      { firstName, lastName, email, phone, dob, gender, password },{
      withCredentials:true,
       headers: { "Content-Type": "application/json" },
    }).then(()=>{
      toast.success("Admin Added Successfully")
      
    })
    }catch(err){
      toast.error(err.response.data.message)
    }
  }

  if(!isAuthenticated){
    return <Navigate to={"/login"}></Navigate>
  }
  return (
     <section className="page">
      <section className="container form-component add-admin-form">
      
        <h1 className="form-title">ADD NEW ADMIN</h1>
        <form onSubmit={handleAdmin}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            
            <input
              type={"date"}
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">ADD NEW ADMIN</button>
          </div>
        </form>
      </section>
    </section>
  )
}

export default AddNewAdmin