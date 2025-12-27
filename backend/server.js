
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://Mayoorthanan:Mayoor1231@cluster0.zzvxupm.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
