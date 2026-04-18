# API Design: Smart EV Charging Orchestration Platform

## 1. Overview
The platform exposes a RESTful API via WSO2 API Manager. This API allows consumers to manage charging stations, initiate bookings, and handle payments.

**Base URL**: `https://api.smart-ev.io/v1`  
**Authentication**: OAuth 2.0 (JWT Tokens)

## 2. Endpoints

### 2.1 Charging Stations

#### GET `/stations`
Lists all charging stations available in the network.

**Query Parameters**:
- `status`: `AVAILABLE`, `OCCUPIED`, `OUT_OF_SERVICE`.
- `type`: `DC_FAST`, `AC_LEVEL2`.

**Response**: `200 OK`
```json
[
  {
    "station_id": "STN-7721",
    "name": "EcoCharge Central",
    "status": "AVAILABLE",
    "coordinates": {"lat": 6.9271, "lng": 79.8612},
    "connectors": [
      {"id": "CN-1", "type": "CCS2", "max_power": "150kW"},
      {"id": "CN-2", "type": "CHAdeMO", "max_power": "50kW"}
    ]
  }
]
```

---

### 2.2 Boarding & Reservations

#### POST `/bookings`
Creates a reservation for a charging slot.

**Request Body**:
```json
{
  "station_id": "STN-7721",
  "connector_id": "CN-1",
  "start_time": "2024-04-18T23:00:00Z",
  "duration_minutes": 60
}
```

**Response**: `201 Created`
```json
{
  "booking_id": "BKG-55412",
  "status": "PENDING_PAYMENT",
  "expiry_time": "2024-04-18T22:45:00Z"
}
```

#### GET `/bookings/{id}`
Retrieves the status and details of a specific booking.

**Response**:
```json
{
  "booking_id": "BKG-55412",
  "status": "CONFIRMED",
  "station_name": "EcoCharge Central",
  "qr_code_payload": "BKG-55412-AUTH-TOKEN"
}
```

---

### 2.3 Payments

#### POST `/payments`
Processes the payment for a booking or a completed session.

**Request Body**:
```json
{
  "booking_id": "BKG-55412",
  "amount": 25.50,
  "currency": "USD",
  "payment_method_id": "pm_card_visa_9921"
}
```

**Response**: `200 OK`
```json
{
  "transaction_id": "TXN-88001",
  "status": "SUCCESS",
  "receipt_url": "https://pay.smart-ev.io/receipt/TXN-88001"
}
```

---

## 3. Webhooks & Events
Consumers can subscribe to events published via WSO2 MI or direct SNS notifications:
- `booking.confirmed`: Triggered after successful payment.
- `charging.started`: Real-time notification from IoT core via Lambda.
- `payment.failed`: Notifies user to update payment method.

## 4. Error Responses
| Code | Meaning |
| :--- | :--- |
| `400` | **Bad Request** - Invalid input parameters. |
| `401` | **Unauthorized** - Missing or expired JWT. |
| `404` | **Not Found** - Station or Booking ID does not exist. |
| `409` | **Conflict** - Slot already reserved for the requested time. |
| `500` | **Technical Failure** - Downstream service timeout. |

---

## 5. Security Summary
1. **OAuth 2.0**: All calls require a JWT in the `Authorization` header.
2. **Scopes**:
   - `read:stations`: List/view station details.
   - `write:bookings`: Create/modify reservations.
   - `process:payments`: Execute payment transactions (Internal Service Scope).
