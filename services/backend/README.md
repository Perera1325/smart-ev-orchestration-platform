# Smart EV Backend Service

This directory contains the core Node.js backend for the Smart EV Charging Orchestration Platform.

## Features
- **Station Discovery**: Fetch available charging stations.
- **Booking Management**: Create and track EV charging reservations.
- **Payment Simulation**: Simulate transaction success/failure.
- **Logging**: Morgan middleware for request logging.
- **Error Handling**: Centralized error management.

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env` file (one has been provided for demo purposes):
   ```env
   PORT=3000
   NODE_ENV=development
   ```

3. **Run the Server**:
   ```bash
   npm start
   ```
   Or for development (if nodemon is installed):
   ```bash
   npm run dev
   ```

## API Specification

### 1. Stations
- **GET `/stations`**
  - Description: Returns a list of all charging stations.
  - Example: `curl http://localhost:3000/stations`

- **GET `/stations/:id`**
  - Description: Returns details for a specific station.

### 2. Booking
- **POST `/booking`**
  - Description: Create a new charging reservation.
  - Body: `{ "userId": "user123", "stationId": "ST-001", "timeSlot": "2024-04-20T10:00:00Z" }`
  - Example: `curl -X POST -H "Content-Type: application/json" -d '{"userId":"u1","stationId":"ST-001","timeSlot":"10am"}' http://localhost:3000/booking`

- **GET `/booking/:id`**
  - Description: Fetch booking status.

### 3. Payment
- **POST `/payment`**
  - Description: Simulate a payment process.
  - Body: `{ "bookingId": "BK-123", "amount": 2500, "paymentMethod": "CC" }`

---

> [!NOTE]
> These APIs are designed to be integrated with **WSO2 API Manager** in Day 5.
