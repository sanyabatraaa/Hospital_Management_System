import { useContext, useState } from "react"
import { Context } from "../main"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";


const Sidebar = () => {
  const [show,setShow] = useState(false)

  const {isAuthenticated,setIsAuthenticated} = useContext(Context)

  const handleLogout = async ()=>{
    await axios.get("http://localhost:4000/api/v1/user/admin/logout",{
      withCredentials:true
    }).then(()=>{
      toast.success("Logged out Successfully")
      setIsAuthenticated(false)
    })
    .catch((err)=>{
      toast.error(err.response.data.message)
    })
  }

  const navigateTo= useNavigate();

  const goToHomePage =()=>{
    navigateTo("/");
    setShow(!show)
  }
  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setShow(!show);
  };
  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };
  return (

    <>
        {console.log(show)}
    <nav style={!isAuthenticated ? {display:"none"}:{display:"flex"}} className={show?"show sidebar":"sidebar"}>
      
      <div className="links">
        <TiHome onClick={goToHomePage}></TiHome>
        <FaUserDoctor onClick={gotoDoctorsPage}></FaUserDoctor>
        <MdAddModerator onClick={gotoAddNewAdmin}></MdAddModerator>
        <IoPersonAddSharp onClick={gotoAddNewDoctor} />
        <AiFillMessage onClick={gotoMessagesPage} />
        <RiLogoutBoxFill onClick={handleLogout} />
      </div>
      <div className="wrapper" style={!isAuthenticated ? { display: "none" } : { display: "flex" }}>
        <GiHamburgerMenu className="hamburger" onClick={()=> setShow(!show)}></GiHamburgerMenu>
      </div>
    </nav>
    </>
  )
}

export default Sidebar