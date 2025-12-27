const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  const { title, date, createdBy } = req.body;

  const existing = await Event.findOne({ createdBy, date });
  if (existing)
    return res.status(400).json({ message: "You already have an event on this date" });

  const event = new Event({ title, date, createdBy });
  await event.save();

  res.json(event);
};

exports.getEvents = async (req, res) => {
  const { createdBy } = req.query;
  const events = await Event.find({ createdBy });
  res.json(events);
};
