import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

 
const AddNewDoctor = () => {
  const {isAuthenticated} = useContext(Context)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("")
  const [docAvatar,setDocAvatar] = useState("")
  const [docAvatarPreview,setDocAvatarPreview] = useState("")
  const navigateTo= useNavigate();

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];


  const handleAvatar= (e)=>{
    const file= e.target.files[0];
    const reader= new FileReader();
    reader.readAsDataURL(file);
    reader.onload= ()=>{
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    }
  }
  const handleDoctor=async(e)=>{
    e.preventDefault();
    try{
      const formData= new FormData();
      formData.append("firstName",firstName);
      formData.append("lastName",lastName);
      formData.append("email",email);
      formData.append("phone",phone);
      formData.append("dob",dob);
      formData.append("doctorDepartment",doctorDepartment);
      formData.append("docAvatar",docAvatar);
      formData.append("password",password)
      formData.append("gender",gender)
      
      await axios.post("http://localhost:4000/api/v1/user/doctor/addnew",
      formData,{
      withCredentials:true,
       headers: { "Content-Type": "multipart/form-data" },
    }).then(()=>{
      toast.success("Admin Added Successfully")
      
      navigateTo("/")
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
      
        <h1 className="form-title">Register a new Doctor</h1>
        <form onSubmit={handleDoctor}>
          <div className="first-wrapper">
            <img src={docAvatarPreview ? `${docAvatarPreview}` : "https://media.istockphoto.com/id/2077095666/vector/default-placeholder-doctor-portrait-photo-avatar-on-gray-background-greyscale-healthcare.jpg?s=612x612&w=0&k=20&c=en2o7NAtzp_udRQhckeWozkwHiXGz5KCRhTzY3Vbhdo="} alt="Doctor Avatar"></img>
            <input type="file" onChange={handleAvatar}></input>
          </div>
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
            <select value={doctorDepartment}
             onChange={(e)=>{setDoctorDepartment(e.target.value)}}
            >
              <option value="">Select Department</option>
              {departmentsArray.map((department,index)=>{
                return(
                  <option value={department} key={index}>{department}</option>
                )
              })}
            </select>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Register new Doctor</button>
          </div>
        </form>
      </section>
    </section>
  )
}

export default AddNewDoctor