# System Design: Smart EV Charging Orchestration Platform

## 1. Introduction
This document outlines the architectural decisions and system design for the Smart EV Charging Orchestration Platform. The platform is designed to handle high-concurrency IoT telemetry from thousands of EV chargers while providing a robust API layer for business integrations.

## 2. Architecture Overview
The system employs an **Event-Driven Microservices Architecture** built on AWS and WSO2.

### High-Level Layers:
- **API Management (WSO2)**: Acts as the entry point for all external consumers. Handles authentication, rate limiting, and protocol mediation.
- **Compute (AWS Lambda)**: Stateless, event-driven functions that process business logic (e.g., session start, load balancing calculation).
- **Communication (AWS IoT Core)**: Manages MQTT connectivity with EV Chargers, handling authentication via X.509 certificates.
- **Data Persistence (Amazon DynamoDB)**: Scalable NoSQL database for real-time state storage.
- **Messaging (Amazon SQS)**: Decouples ingestion from processing to ensure system resilience during telemetry spikes.

## 3. Core Components

### 3.1 WSO2 API Layer
- **API Manager**: Exposes RESTful endpoints for mobile applications.
- **Micro Integrator**: Coordinates requests between internal AWS services and legacy billing systems. It performs complex transformations (OCPP to JSON) and error handling.

### 3.2 Charging Orchestration (AWS)
- **Session Manager (Lambda)**: Tracks active charging sessions, power delivery, and duration.
- **Grid Intelligence (Lambda)**: Analyzes local grid capacity and adjusts charging limits in real-time.
- **Telemetry Ingester (IoT Core & SQS)**: Efficiently captures MQTT messages from chargers and routes them to downstream services.

## 4. Data Flow

### 4.1 Inbound Telemetry (Charger to Cloud)
1. Charger publishes a heartbeat/status message via **MQTT** to **AWS IoT Core**.
2. **IoT Rule** evaluates the message and forwards it to an **SQS Queue**.
3. **Lambda Worker** triggers on SQS messages, updates **DynamoDB** state, and notifies relevant stakeholders (WebSockets/SNS).

### 4.2 Outbound Control (Cloud to Charger)
1. User requests "Start Charging" via **Mobile App**.
2. Request hits **WSO2 API Gateway**.
3. WSO2 orchestrates the request to **AWS Lambda**.
4. Lambda verifies state and publishes a command to the charger's **MQTT Topic** via **IoT Core**.

## 5. Security Architecture
- **JWT-based Authentication**: WSO2 issues and verifies tokens for consumers.
- **Mutual TLS (mTLS)**: Standard for IoT Core communication with physical chargers.
- **IAM Policies**: Least-privilege access for all Lambda functions and system components.

## 6. Scalability & Resilience
- **Serverless First**: Automatic scaling of compute and database resources.
- **Queue-Based Decoupling**: Prevents "Thundering Herd" issues during regional power restoration when thousands of chargers reconnect.
- **Multi-AZ Strategy**: Leveraging AWS regions for high availability.

## 7. Future Considerations
- **Machine Learning**: Implementing SageMaker for predictive maintenance of chargers.
- **Blockchain**: Exploring decentralized identity for cross-network roaming (Plug & Charge).
