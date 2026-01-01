import React, { useState } from "react";
import axios from "axios";

export default function EventForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const createEvent = async () => {
    if (!title || !date) {
      alert("Title மற்றும் Date உள்ளிடவும்");
      return;
    }

    if (!token) {
      alert("Please login again");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/events",
        { title, date },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTitle("");
      setDate("");
      refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff8dc",
        padding: "40px",
        textAlign: "center",
        minHeight: "100vh"
      }}
    >
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
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "gray" : "#ff8c00",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px"
        }}
      >
        {loading ? "Creating..." : "Create Event"}
      </button>

      <footer style={{ color: "#555", marginTop: "20px" }}>
        Design By S.Mayoor. [BSc.Eng-Moratuwa (Reading)]
      </footer>
    </div>
  );
}
