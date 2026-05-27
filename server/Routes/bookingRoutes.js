const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

router.post("/", async (req, res) => {
  const { user, date, slot } = req.body;

  const existingBooking = await Booking.findOne({
    date,
    slot,
  });

  if (existingBooking) {
    return res
      .status(400)
      .json({ message: "Slot already booked" });
  }

  const booking = new Booking({
    user,
    date,
    slot,
  });

  await booking.save();

  res.json({ message: "Slot booked successfully" });
});

module.exports = router;