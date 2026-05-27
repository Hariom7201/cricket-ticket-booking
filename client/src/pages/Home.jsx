import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  const fetchBookings = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/bookings"
    );

    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleBooking = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        {
          user: "Hariom",
          date,
          slot,
        }
      );

      alert("Booking Success");
      fetchBookings();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        Box Cricket Booking
      </h1>

      <input
        type="date"
        className="border p-2 mr-2"
        onChange={(e) => setDate(e.target.value)}
      />

      <select
        className="border p-2 mr-2"
        onChange={(e) => setSlot(e.target.value)}
      >
        <option>Select Slot</option>
        <option>6AM - 7AM</option>
        <option>7AM - 8AM</option>
        <option>8AM - 9AM</option>
      </select>

      <button
        onClick={handleBooking}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Book Slot
      </button>

      <div className="mt-10">
        <h2 className="text-2xl font-bold">
          Bookings
        </h2>

        {bookings.map((booking, index) => (
          <div
            key={index}
            className="border p-3 mt-2"
          >
            <p>User: {booking.user}</p>
            <p>Date: {booking.date}</p>
            <p>Slot: {booking.slot}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;