require("dotenv").config();

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const db = new sqlite3.Database(process.env.DB_FILE || "bookings.db");
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    meeting_name TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL
)`);

app.get("/api/v1/bookings", (req, res) => {
  db.all("SELECT * FROM bookings", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/v1/bookings", async (req, res) => {
  const { meeting_name, start_time, end_time } = req.body;
  if (!meeting_name || !start_time || !end_time) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    db.get(
      "SELECT EXISTS (SELECT 1 FROM bookings WHERE start_time < ? AND end_time > ?) AS conflict",
      [end_time, start_time],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.conflict) {
          return res
            .status(400)
            .json({ error: "Booking overlaps with an existing one." });
        }

        db.run(
          "INSERT INTO bookings (meeting_name, start_time, end_time) VALUES (?, ?, ?)",
          [meeting_name, start_time, end_time],
          function (err) {
            if (err) return res.status(500).json({ error: err.message });
            const newBooking = {
              id: this.lastID,
              meeting_name,
              start_time,
              end_time,
            };
            io.emit(process.env.SOCKET_CHANNEL || "new-booking", newBooking); // Notify clients
            res.json(newBooking);
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
