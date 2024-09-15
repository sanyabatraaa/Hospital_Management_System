import { useContext, useEffect, useState } from "react"
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";


const Messages = () => {
  const [messages,setMessages] = useState([]);
  const {isAuthenticated} = useContext(Context)

  useEffect(()=>{
    const fetchMessages = async()=>{
      try{
        const {data}= await axios.get("http://localhost:4000/api/v1/message/getall",{
          withCredentials:true
        })
        setMessages(data.messages);
      }catch(err){
        console.log(err.response.data.message)
      }
    };
    fetchMessages();
  },[])

  if(!isAuthenticated) {
    <Navigate to={"/login"}></Navigate>
  }
  return (
    <section className="page messages">
      <h1>MESSAGE</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((m)=>{
            return(
              <div className="card" key={m._id}>
                <div className="details">
                  <p>
                    FirstName: <span>{m.firstName}</span>
                  </p>
                  <p>
                    LastName: <span>{m.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{m.email}</span>
                  </p>
                  <p>
                    Phone: <span>{m.phone}</span>
                  </p>
                  <p>
                    Message: <span>{m.message}</span>
                  </p>
                </div>
              </div>
            )
          })
        ):(<h1>No Messages!!</h1>)}
      </div>
    </section>
    
  )
}

export default Messages