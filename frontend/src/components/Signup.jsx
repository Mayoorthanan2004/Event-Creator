import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({});
  const nav = useNavigate();

  const signup = async () => {
    await axios.post("http://localhost:5000/api/auth/signup", form);
    nav("/");
  };

  return (
    <div style={{ backgroundColor: "#f0f8ff", padding: "50px", textAlign: "center", minHeight: "100vh" }}>
  <h2 style={{ color: "#333" }}>Signup</h2>
  
  Name: <input 
          placeholder="Name" 
          onChange={e => setForm({...form,name:e.target.value})} 
          style={{ padding: "10px", margin: "10px", borderRadius: "5px", border: "1px solid #ccc" }} 
        /><br/><br/>
  
  Enter Email: <input 
          placeholder="Email" 
          onChange={e => setForm({...form,email:e.target.value})} 
          style={{ padding: "10px", margin: "10px", borderRadius: "5px", border: "1px solid #ccc" }} 
        /><br/><br/>
  
  Password: <input 
          placeholder="Password" 
          type="password" 
          onChange={e => setForm({...form,password:e.target.value})} 
          style={{ padding: "10px", margin: "10px", borderRadius: "5px", border: "1px solid #ccc" }} 
        /><br/><br/>
  
  <button 
    onClick={signup} 
    style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
  >
    Signup
  </button><br/><br/><br/><br/><br/><br/>
  
  <footer style={{ color: "#555", marginTop: "20px" }}>Design By S.Mayoor.[BSc.Eng-Moratuwa (reading)]</footer>
</div>

    
  );
}
