# Frontend - Conference Room Scheduler

This is the frontend of the application, built with **React, Vite, Axios, and Socket.io-client**.

## Installation

```sh
cd Frontend
cp .env.example .env  # Configure API URL
npm install
```

## Running the Frontend

```sh
npm run dev  # Runs the development server
```

## API Connection

By default, the frontend connects to the backend at `http://localhost:5001`. If needed, update the `.env` file:

```sh
VITE_API_URL=http://localhost:5001
VITE_SOCKET_CHANNEL="new-booking"
```

## Features

- Displays a list of **existing bookings**.
- Allows **creating new bookings** with conflict prevention.
- Updates **in real time** using **Socket.io**.

## DevOps Considerations

- Uses **environment variables** for API configuration.
- **Lightweight and fast** setup with Vite.
- Ready for **containerization** if needed.

**For backend setup, refer to [`/Backend/README.md`](../Backend/README.md).** 🚀
