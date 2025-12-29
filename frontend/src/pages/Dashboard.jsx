import React, { useEffect, useState } from "react";
import EventForm from "../components/EventForm";
import axios from "axios";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    try {
      const res = await axios.get("https://8a69333f-b382-4724-ae7e-d2b36ab57abb-00-2pofjhqx85ni.sisko.replit.dev:3000/api/events", { params: { createdBy: user.name } });
      setEvents(res.data);
    } catch (err) {
      console.log("Failed to fetch events", err);
    }
  };

  useEffect(() => { loadEvents(); }, []);

  return (
    <div style={{
  backgroundColor: "#e6f7ff",
  padding: "40px",
  minHeight: "100vh",
  textAlign: "center"
}}>
  <h1 style={{ color: "#333", marginBottom: "20px" }}>Welcome {user.name}</h1>

  <div style={{ marginBottom: "30px" }}>
    <EventForm refresh={loadEvents} />
  </div>

  <hr style={{ margin: "30px 0", borderColor: "#ccc" }} />

  <h3 style={{ color: "#333", marginBottom: "15px" }}>Your Events</h3>

  {events.length === 0 
    ? <p style={{ color: "#555" }}>No events yet</p>
    : <ul style={{ listStyleType: "none", padding: 0 }}>
        {events.map(ev => (
          <li 
            key={ev._id} 
            style={{
              backgroundColor: "#ffffff",
              padding: "10px",
              margin: "10px auto",
              width: "300px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          >
            <strong>{ev.title}</strong> — {ev.date}
          </li>
        ))}
      </ul>
  }

  <footer style={{ color: "#555", marginTop: "30px" }}>
    Design By S.Mayoor.[BSc.Eng-Moratuwa (reading)]
  </footer>
</div>

  );
}
