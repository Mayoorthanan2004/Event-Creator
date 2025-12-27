const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  createdBy: String
});

module.exports = mongoose.model("Event", eventSchema);
