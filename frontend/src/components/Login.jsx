import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        "https://8a69333f-b382-4724-ae7e-d2b36ab57abb-00-2pofjhqx85ni.sisko.replit.dev:3000/api/auth/login",
        { email, password }
      );

      // save user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // redirect to dashboard
      nav("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{
  backgroundColor: "#f0f8ff",
  padding: "50px",
  textAlign: "center",
  minHeight: "100vh"
}}>
  <h2 style={{ color: "#333", marginBottom: "20px" }}>Login</h2>

  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={e => setEmail(e.target.value)}
    style={{
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "250px"
    }}
  />
  <br />

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={e => setPassword(e.target.value)}
    style={{
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "250px"
    }}
  />
  <br />

  <button
    onClick={login}
    style={{
      padding: "10px 20px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px"
    }}
  >
    Login
  </button>

  <p style={{ marginTop: "15px", color: "#555" }}>
    New user? <Link to="/signup" style={{ color: "#007BFF", textDecoration: "none" }}>Signup here</Link>
  </p>

  <footer style={{ color: "#555", marginTop: "20px" }}>
    Design By S.Mayoor.[BSc.Eng-Moratuwa (reading)]
  </footer>
</div>

  );
}
