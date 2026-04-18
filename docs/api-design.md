# API Design: Smart EV Charging Orchestration Platform

## 1. Overview
The platform exposes a RESTful API via WSO2 API Manager. This API allows consumers to manage charging stations, initiate sessions, and monitor power delivery.

**Base URL**: `https://api.smart-ev.io/v1`  
**Authentication**: OAuth 2.0 (Client Credentials / Authorization Code Grant)

## 2. Endpoints

### 2.1 Charging Stations

#### GET `/chargers`
Lists all charging stations available in the network.

**Query Parameters**:
- `status`: Filter by `AVAILABLE`, `OCCUPIED`, `OUT_OF_SERVICE`.
- `lat`, `long`: Geolocation filter within radius.

**Response**: `200 OK`
```json
[
  {
    "id": "CH-99281",
    "location": "Colombo 07 - Central Mall",
    "status": "AVAILABLE",
    "power_rating": "50kW",
    "connector_type": "CCS2"
  }
]
```

#### GET `/chargers/{id}`
Retrieves detailed status for a specific charger.

---

### 2.2 Session Management

#### POST `/sessions`
Starts a new charging session.

**Request Body**:
```json
{
  "charger_id": "CH-99281",
  "vehicle_id": "EV-3312",
  "target_soc": 80,
  "payment_method_id": "pm_12345"
}
```

**Response**: `201 Created`
```json
{
  "session_id": "SES-88219",
  "status": "STARTING",
  "estimated_completion": "2024-04-18T23:30:00Z"
}
```

#### GET `/sessions/{id}`
Live metrics for an active session.

**Response**:
```json
{
  "session_id": "SES-88219",
  "current_power_kw": 44.5,
  "energy_delivered_kwh": 12.8,
  "current_soc": 45,
  "elapsed_time_min": 15
}
```

#### DELETE `/sessions/{id}`
Stops an active charging session and initiates settlement.

---

## 3. Webhooks
The platform can notify external systems of key events via HTTPS Webhooks.

- `session.started`: Triggered when power delivery begins.
- `session.completed`: Triggered when session ends.
- `charger.fault`: Triggered when an IoT device reports an error.

## 4. Error Handling
Standard HTTP status codes are used:
- `400 Bad Request`: Validation failure.
- `401 Unauthorized`: Missing or invalid OAuth token.
- `403 Forbidden`: Insufficient scopes.
- `409 Conflict`: Charger already in use.
- `429 Too Many Requests`: Rate limit exceeded.
- `500 Internal Server Error`: Server-side failure.

---

## 5. Security
All requests must include a Bearer token:
`Authorization: Bearer <access_token>`
