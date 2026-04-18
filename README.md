# Smart EV Charging Orchestration Platform

[![Cloud-Native](https://img.shields.io/badge/Architecture-Cloud--Native-blue.svg)](https://aws.amazon.com/)
[![WSO2](https://img.shields.io/badge/Integration-WSO2-orange.svg)](https://wso2.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## 🌟 Project Overview

The **Smart EV Charging Orchestration Platform** is an enterprise-grade, cloud-native solution designed to manage the growing complexities of Electric Vehicle (EV) charging infrastructure. By leveraging **AWS serverless computing** and **WSO2 API orchestration**, the platform provides a scalable, secure, and highly available system for grid-aware charging management.

---

## 🛑 Problem Statement

The rapid adoption of Electric Vehicles has introduced several critical challenges for charge point operators and grid utilities:
- **Grid Instability**: Simultaneous high-power charging sessions can overload local distribution transformers.
- **Fragmented Infrastructure**: Lack of interoperability between different charger manufacturers and software platforms.
- **User Experience Gaps**: Inconsistent payment methods and poor real-time visibility into charger availability.
- **Operational Inefficiency**: High overhead costs for managing distributed IoT assets at scale.

## 💡 Proposed Solution

Our platform addresses these issues through a centralized orchestration layer that:
1. **Balances Load**: Dynamically adjusts charging rates based on real-time grid conditions and renewable energy availability.
2. **Unified API Gateway**: Uses WSO2 to provide a secure, standardized interface for mobile apps, third-party aggregators, and OEM services.
3. **IoT-First Architecture**: Seamlessly integrates with chargers via AWS IoT Core for low-latency telemetry and control.
4. **Data-Driven Insights**: Utilizes AWS analytics to predict peak demand and optimize energy distribution.

---

## 🏗 High-Level Architecture

The system follows a microservices-based, event-driven architecture:

1.  **Consumer Layer**: Mobile Apps and Web Portals interact with the system via the WSO2 API Manager.
2.  **Integration & Orchestration**: WSO2 Micro Integrator handles complex service orchestration, protocol transformation, and security enforcement.
3.  **Compute Layer**: AWS Lambda functions execute business logic in a scalable, serverless environment.
4.  **Communication Layer**: AWS IoT Core manages the MQTT-based communication with the physical Charging Stations.
5.  **Data Layer**: Amazon DynamoDB provides a high-performance, NoSQL store for session state and charging profiles.
6.  **Messaging Layer**: AWS SQS buffers incoming telemetry data and handles asynchronous background tasks.

> [!NOTE]
> A detailed architecture diagram [v1] can be found in the [docs/](docs/architecture-v1.png) folder.

---

## 🎯 Architectural Goals (AWS Well-Architected)

- **Security**: Zero-trust approach using WSO2 OAuth2/OIDC and AWS IAM.
- **Reliability**: Multi-AZ deployment and automatic failover mechanisms.
- **Performance Efficiency**: Leveraging serverless scaling to handle unpredictable spikes in charging demand.
- **Cost Optimization**: Utilizing AWS pay-as-you-go pricing models and Spot instances for non-critical workloads.
- **Operational Excellence**: Comprehensive CI/CD pipelines and proactive monitoring via AWS CloudWatch.
- **Sustainability**: Demand-response logic to align charging with low-carbon energy periods.

---

## 💻 Tech Stack

- **Cloud Provider**: AWS (IoT Core, Lambda, SQS, DynamoDB, CloudWatch)
- **API Management**: WSO2 API Manager, WSO2 Micro Integrator
- **Infrastructure**: Terraform (Infrastructure as Code)
- **Backend**: Node.js / Go
- **Protocols**: REST, MQTT, OCPP 2.0.1 (Planned)

---

## 📂 Project Structure

```text
├── docs/               # Architectural designs, API specs, and diagrams
├── infra/              # Terraform scripts for AWS infrastructure
├── services/           # Microservices (Charging, User, Payment)
├── wso2/               # WSO2 MI/APIM configuration files
└── .github/            # CI/CD Workflows
```

---

## 📈 Project Status

- **Day 1**: Initial project foundation, documentation, and architecture visualization complete. ✅

---

## 🚀 Next Steps

- [ ] Implementation of the `charging-service` mock API.
- [ ] Setup of AWS IoT Core rules and basic MQTT message processing.
- [ ] Integration of WSO2 MI for cross-service orchestration.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
