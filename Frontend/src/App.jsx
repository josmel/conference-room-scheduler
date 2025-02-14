import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
const socket = io(API_URL, { transports: ["websocket"] });

const App = () => {
  const [bookings, setBookings] = useState([]);
  const [meetingName, setMeetingName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();

    socket.on(
      import.meta.env.VITE_SOCKET_CHANNEL || "new-booking",
      (newBooking) => {
        setBookings((prev) => [...new Set([...prev, newBooking])]);
      }
    );

    return () =>
      socket.off(import.meta.env.VITE_SOCKET_CHANNEL || "new-booking");
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/v1/bookings`);
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/api/v1/bookings`, {
        meeting_name: meetingName,
        start_time: startTime,
        end_time: endTime,
      });
      setBookings([...bookings, res.data]);
      setMeetingName("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <h1>Conference Room Scheduler</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Meeting Name"
          value={meetingName}
          onChange={(e) => setMeetingName(e.target.value)}
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <button type="submit">Book</button>
      </form>
      {error && <p className="error">{error}</p>}
      <h2>Bookings</h2>
      <ul className="bookings-list">
        {bookings.map((b) => (
          <li key={b.id} className="booking-item">
            <strong>{b.meeting_name}</strong>: {b.start_time} - {b.end_time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
