import {useContext,useState} from "react";
import {Context} from "../main"
import {toast} from "react-toastify"
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
    const [show,setShow] = useState(false)
    const {isAuthenticated,setIsAuthenticated} = useContext(Context)
    const handleLogout = async ()=>{
        await axios.get("http://localhost:4000/api/v1/user/patient/logout",{
            withCredentials:true
        }).then(()=>{
            toast.success("Logged out Successfully!")
            setIsAuthenticated(false)
        }).catch((e)=>{
            toast.error(e.response.data.message)
        })
    }

    const navigateTo = useNavigate();

    const goToLogin = ()=>{
        navigateTo("/login");
    }
  return (
    <nav className={"container"}>
        <div className="logo">
            <img src="/logo.png" alt="logo" className="logo-img"></img>
        </div>
        <div className={show ? "navLinks showmenu": "navLinks"}>
            <div className="links">
                <Link to={"/"} onClick={()=>setShow(!show)}>Home</Link>
                <Link to={"/appointment"} onClick={()=>setShow(!show)}>Appointment</Link>
                <Link to={"/about"} onClick={()=>setShow(!show)}>About Us</Link>
            </div>
            {isAuthenticated ? (
                <button className="logoutBtn btn" onClick={handleLogout}>LOGOUT</button>
            ):(
                <button className="loginBtn btn" onClick={goToLogin}>LOGIN</button>
            )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
    </nav>
  )
}

export default Navbar