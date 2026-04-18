# System Design: Smart EV Charging Orchestration Platform

## 1. System Overview
The Smart EV Charging Orchestration Platform is a high-performance, multitenant system designed to optimize the relationship between EV charging demand and grid capacity. As of Day 2, the system has evolved into a microservices architecture to support independent scaling and development of core business domains.

## 2. Architectural Style
The platform utilizes a hybrid architecture:
- **Microservices**: Decomposed by business domain (User, Booking, Payment, Charging).
- **Event-Driven Messaging**: Leveraging AWS SNS and SQS for asynchronous communication, ensuring high throughput and resilience during burst telemetry.
- **Serverless Compute**: Core logic resides in AWS Lambda to minimize operational overhead and maximize cost efficiency.

## 3. Component Breakdown

### 3.1 API Gateway & Integration (WSO2)
- **API Manager**: Provides the consumer-facing interface with OAuth 2.0 security, rate limiting, and analytics.
- **Micro Integrator (MI)**: Handles complex integration patterns, such as orchestrating multiple microservice calls for a single user request and performing data format transformations (e.g., protocol translation for IoT devices).

### 3.2 Backend Microservices
- **User Service**: Manages user profiles, vehicle registration, and authentication context.
- **Booking Service**: Orchestrates the availability of charging stations and manages reservations.
- **Payment Service**: Integrates with external payment providers and maintains a ledger of all financial transactions.
- **Charging Service**: (Core IoT Component) Manages real-time interaction with hardware via AWS IoT Core.

### 3.3 Messaging & Events
- **AWS SNS**: Acts as the message broker, broadcasting events (e.g., `BookingCreated`) to multiple subscribers.
- **AWS SQS**: Provides reliable, persistent queues for consumers (microservices) to process events at their own pace, preventing direct coupling.

### 3.4 Data Storage Strategy
- **Amazon DynamoDB**: Used for low-latency, high-volume data such as real-time charging session state and user profiles.
- **Amazon RDS (PostgreSQL)**: Utilized for relational data that requires strict ACID compliance, specifically for the Booking and Payment ledgers.

## 4. Detailed Data Flow (Booking & Payment)
1. **Request**: User submits a booking request via **WSO2 API Gateway**.
2. **Orchestration**: WSO2 MI calls the **Booking Service** to verify station availability.
3. **Draft**: Booking Service creates a "PENDING" record in **RDS** and publishes a `BookingCreated` event to **SNS**.
4. **Trigger**: **SNS** fans out the event to an **SQS** queue monitored by the **Payment Service**.
5. **Processing**: The Payment Service triggers a transaction. Upon success, it publishes a `PaymentSuccessful` event.
6. **Completion**: The Booking Service consumes the success event, updates the booking status to "CONFIRMED", and triggers a command to **AWS IoT Core** to reserve the physical charger.

## 5. Scaling Strategy
- **Horizontal Scaling**: AWS Lambda automatically scales with the number of incoming requests.
- **Read Replicas**: Amazon RDS scales read operations through the use of replicas for reporting and analytics.
- **On-Demand Capacity**: DynamoDB is configured for on-demand mode to handle unpredictable traffic spikes without manual intervention.

## 6. Fault Tolerance & Resilience
- **Dead Letter Queues (DLQ)**: Failed event processing is routed to a DLQ for manual inspection or automated retry scripts.
- **Circuit Breakers**: WSO2 MI implements circuit breaker patterns to prevent cascading failures when a downstream microservice is unhealthy.
- **Stateless Services**: All Lambda functions are stateless, allowing for immediate recovery from compute environment failures.

## 7. Security Considerations
- **Identity**: Integration with AWS Cognito or WSO2 Identity Server for OIDC/SAML.
- **IAM Roles**: Lambda functions use execution roles with least-privilege access.
- **Network Isolation**: All database and messaging components reside within a Private VPC, accessible only through VPC Endpoints.
- **Encryption**: Data is encrypted at rest using AWS KMS and in transit using TLS 1.3/SSL.
