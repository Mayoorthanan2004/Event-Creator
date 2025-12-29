import React, { useState } from "react";
import axios from "axios";

export default function EventForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const createEvent = async () => {
    if (!title || !date) {
      alert("Enter title and date");
      return;
    }

    try {
      await axios.post("https://8a69333f-b382-4724-ae7e-d2b36ab57abb-00-2pofjhqx85ni.sisko.replit.dev/api/events", { title, date, createdBy: user.name });
      setTitle("");
      setDate("");
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div style={{
  backgroundColor: "#fff8dc",
  padding: "40px",
  textAlign: "center",
  minHeight: "100vh"
}}>
  <h3 style={{ color: "#333", marginBottom: "20px" }}>Create Event</h3>

  <input
    placeholder="Title"
    value={title}
    onChange={e => setTitle(e.target.value)}
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
    type="date"
    value={date}
    onChange={e => setDate(e.target.value)}
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
    onClick={createEvent}
    style={{
      padding: "10px 20px",
      backgroundColor: "#ff8c00",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px"
    }}
  >
    Create Event
  </button>

  <footer style={{ color: "#555", marginTop: "20px" }}>
    Design By S.Mayoor.[BSc.Eng-Moratuwa (reading)]
  </footer>
</div>

  );
}
