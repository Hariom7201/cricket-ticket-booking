const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: String,
  date: String,
  slot: String,
});

module.exports = mongoose.model("Booking", bookingSchema);