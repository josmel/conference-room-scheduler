# OrbitLink Conference Room Scheduler

This project is an application to manage conference room bookings, ensuring that there are no scheduling conflicts.

## Technologies Used

- **Backend:** Node.js, Express, SQLite, Socket.io
- **Frontend:** React, Axios, Socket.io-client

## Installation and Execution

### 1️⃣ Clone the repository

```sh
git clone https://github.com/josmel/conference-room-scheduler.git
cd conference-room-scheduler
```

### 2️⃣ Configure Backend and Frontend

🔹 **Backend:** Follow the instructions in [`/Backend/README.md`](Backend/README.md)  
🔹 **Frontend:** Follow the instructions in [`/Frontend/README.md`](Frontend/README.md)

### 3️⃣ Run the Backend and Frontend Separately

Open two terminal windows and run the following commands:

**Terminal 1 - Start Backend**

```sh
cd Backend
npm run dev
```

**Terminal 2 - Start Frontend**

```sh
cd Frontend
npm run dev
```

## API Endpoints

- `GET /api/v1/bookings` → Retrieve bookings
- `POST /api/v1/bookings` → Create a booking

## DevOps Considerations

- **Environment variables:** Configured in `.env` files in each module.
- **Modular structure:** Backend and frontend are separated for easy deployment.
- **Containerization ready:** The project can be easily dockerized if needed.

**For more details, check the specific READMEs for the backend and frontend.** 🚀
