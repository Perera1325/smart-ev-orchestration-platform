# Architectural Decision Records (ADR)

This document records the key architectural decisions made for the Smart EV Charging Orchestration Platform.

---

## 1. Use of Microservices Architecture

**Status**: Accepted  
**Context**: The system must handle multiple distinct domains: User Management, Physical Device Orchestration (Charging), Financial Transactions (Payments), and Slot Management (Booking). A monolith would become difficult to scale and maintain as the feature set grows.

**Decision**: We will implement a microservices architecture where each business domain is managed by an independent service.

**Alternatives Considered**:
- **Monolithic Architecture**: Easier to develop initially but creates deployment bottlenecks and tight coupling.
- **Service-Oriented Architecture (SOA)**: Similar benefits but often involves more heavy-weight communication protocols like SOAP.

**Reasoning**:
- **Independent Scalability**: We can scale the Charging Service (IoT heavy) independently from the Payment Service.
- **Fault Isolation**: A failure in the Booking Service does not prevent real-time telemetry processing in the Charging Service.
- **Team Agility**: Different teams can work on different services without blocking each other.

---

## 2. Event-Driven Communication via SNS/SQS

**Status**: Accepted  
**Context**: Many operations (e.g., "Start Charging") require coordination between multiple services and the physical device. Synchronous HTTP calls between services create brittle dependencies and potential timeout issues.

**Decision**: Use an event-driven pattern with **AWS SNS** for broadcast and **AWS SQS** for point-to-point guaranteed delivery.

**Alternatives Considered**:
- **Direct Synchronous Calls (REST)**: Simpler to implement but leads to high coupling and cascading failures.
- **Dedicated Message Broker (RabbitMQ/Kafka)**: Extremely powerful but adds significant operational overhead compared to AWS native serverless options.

**Reasoning**:
- **Decoupling**: Services only need to know about the events they publish/consume.
- **Resilience**: SQS buffers requests during peak loads or downstream service outages.
- **Observability**: Clearly defined event schemas allow for easier auditing and monitoring of system-wide flows.

---

## 3. WSO2 API Gateway Integration

**Status**: Accepted  
**Context**: The platform needs to expose APIs to mobile apps and third-party partners. We require standardized security (OAuth2), rate limiting, and the ability to transform messages between different protocols (e.g., JSON to OCPP).

**Decision**: Integrate **WSO2 API Manager** and **Micro Integrator** as the edge gateway.

**Alternatives Considered**:
- **AWS API Gateway**: Good for pure serverless but lacks the advanced integration and mediation features of WSO2 out-of-the-box.
- **Custom Nginx/Kong Gateway**: Requires significant manual configuration and maintenance of security modules.

**Reasoning**:
- **Enterprise Integration**: WSO2 Micro Integrator excels at complex mediation and protocol transformation.
- **API Lifecycle Management**: WSO2 provides a comprehensive portal for managing, securing, and analyzing API usage.
- **Hybrid Support**: Easily bridges the gap between our cloud-native AWS services and potential on-premise components or external 3rd-party services.
