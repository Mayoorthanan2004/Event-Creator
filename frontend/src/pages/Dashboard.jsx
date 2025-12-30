import React, { useEffect, useState } from "react";
import EventForm from "../components/EventForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // redirect if not logged in
  useEffect(() => {
    if (!user || !token) {
      nav("/");
    }
  }, [user, token, nav]);

  const loadEvents = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://event-creator-two.vercel.app/api/events",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setEvents(res.data);
    } catch (err) {
      console.log("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []); // ok here

  return (
    <div
      style={{
        backgroundColor: "#e6f7ff",
        padding: "40px",
        minHeight: "100vh",
        textAlign: "center"
      }}
    >
      <h1 style={{ color: "#333", marginBottom: "20px" }}>
        Welcome {user?.name}
      </h1>

      <div style={{ marginBottom: "30px" }}>
        <EventForm refresh={loadEvents} />
      </div>

      <hr style={{ margin: "30px 0", borderColor: "#ccc" }} />

      <h3 style={{ color: "#333", marginBottom: "15px" }}>Your Events</h3>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p style={{ color: "#555" }}>No events yet</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
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
              <strong>{ev.title}</strong> —{" "}
              {new Date(ev.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}

      <footer style={{ color: "#555", marginTop: "30px" }}>
        Design By S.Mayoor. [BSc.Eng-Moratuwa (reading)]
      </footer>
    </div>
  );
}
