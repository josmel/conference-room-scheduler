# Backend - Conference Room Scheduler

This is the backend of the application, built with **Node.js, Express, SQLite, and Socket.io**.

## Installation

```sh
cd Backend
cp .env.example .env  # Configure environment variables
npm install
```

## Running the Server

```sh
npm start  # Runs in production mode
# Or in development mode with nodemon
npm run dev
```

## API Endpoints

- `GET /api/v1/bookings` → Retrieve all bookings
- `POST /api/v1/bookings` → Create a new booking (prevents conflicts)

## ⚙️ Environment Variables (`.env`)

```sh
PORT=5001
DB_FILE=bookings.db
SOCKET_CHANNEL=new-booking
```

## DevOps Considerations

- Uses **environment variables** for flexible configuration.
- Designed with **modular structure** for scalability.
- Can be easily **containerized** if needed for deployment.

**For frontend setup, refer to [`/Frontend/README.md`](../Frontend/README.md).** 🚀
