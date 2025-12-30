import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const signup = async () => {
    // basic validation
    if (!form.name || !form.email || !form.password) {
      alert("Please Fill All Fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/auth/signup",
        form
      );

      alert("Signup successful");
      nav("/");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f8ff",
        padding: "50px",
        textAlign: "center",
        minHeight: "100vh"
      }}
    >
      <h2 style={{ color: "#333" }}>Signup</h2>

      Name:
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        style={{
          padding: "10px",
          margin: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
      <br /><br />

      Enter Email:
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        style={{
          padding: "10px",
          margin: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
      <br /><br />

      Password:
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        style={{
          padding: "10px",
          margin: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
      <br /><br />

      <button
        onClick={signup}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "gray" : "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        {loading ? "Signing up..." : "Signup"}
      </button>

      <br /><br /><br /><br />

      <footer style={{ color: "#555" }}>
        Design By S.Mayoor. [BSc.Eng-Moratuwa (reading)]
      </footer>
    </div>
  );
}
