
import axios from "axios"
import { useContext, useEffect, useState } from "react";
import {Context} from "../main"
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
const Doctors = () => {

  const [doctors,setDoctors]= useState([])
  const {isAuthenticated} = useContext(Context)

  useEffect(()=>{
    const fetchDoctors = async()=>{
    
    try{
      const {data} = await axios.get("http://localhost:4000/api/v1/user/doctors",{
        withCredentials: true,
      })
      setDoctors(data.doctors);
    }catch(e){
      toast.error(e.response.data.message)
    }
    
  }
  fetchDoctors();
  },[]);

  if(!isAuthenticated) {
    return <Navigate to={"/"}></Navigate>
  }
  
  return (
    <>
    <section className="page doctors">
      <h1>Doctors</h1>
      <div className="banner">
  {doctors && doctors.length > 0 ? (
    doctors.map((doctor) => {
      return (
        <div className="card" key={doctor.id}>
          <img src={doctor.docAvatar && doctor.docAvatar.url} alt="doc avatar" />
          <h4>{`${doctor.firstName} ${doctor.lastName}`}</h4>
          <div className="details">
            <p>Email: <span>{doctor.email}</span></p>
            <p>Phone: <span>{doctor.phone}</span></p>
            <p>DOB: <span>{doctor.dob.substring(0,10)}</span></p>
            <p>Department: <span>{doctor.doctorDepartment}</span></p>
            <p>Gender: <span>{doctor.gender}</span></p>
          </div>
        </div>
      );
    })
  ) : (
    <h1>No Registered Doctors Found!</h1>
  )}
</div>

    </section>
      
    </>
  )
}

export default Doctors