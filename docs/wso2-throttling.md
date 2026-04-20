# WSO2 API Rate Limiting (Throttling)

Throttling is a core governance feature implemented in WSO2 API Manager to prevent backend exhaustion and manage monetization plans for the Smart EV Orchestration Platform.

## Why Throttling is Important

Without rate limits, the Node.js backend remains vulnerable to:
- **DDoS Attacks**: Volumetric attacks overwhelming the `/payment` endpoint.
- **Resource Exhaustion**: Database/In-memory leaks from excessive traffic.
- **Monetization Enforcement**: We cannot enforce tier-based pricing (Free vs Premium) without limits.

## Configured Policies

In WSO2 Publisher, we have attached specific traffic management (throttling) tiers to the **EV Charging API v1.0.0**:

### 1. Subscription Tiers (API Level)

Developers can subscribe to one of the following plans via the Developer Portal:

- **Bronze Plan**: 100 requests per minute per user.
  - Used for standard 3rd-party integrators testing the `/stations` discovery.
- **Silver Plan**: 500 requests per minute per user.
- **Gold Plan**: 1,000 requests per minute per user.
- **Unlimited Plan**: Overrides default throttling (reserved for internal admin clients).

### 2. Advanced Rate Limiting (Resource Level)

WSO2 allows us to apply precise limitations on specific HTTP resources:

- **POST /payment**: Throttled strictly at **50 requests per minute** to prevent brute-forcing simulated payment gateways. If a user exceeds this, the WSO2 Gateway responds with an HTTP `429 Too Many Requests`.
- **GET /stations**: Cached and allowed up to **1000 requests per minute** without hitting the backend to improve performance.

## Execution Flow
1. Request hits WSO2 API Gateway.
2. Gateway verifies OAuth token.
3. Traffic Manager evaluates the request count against the quota for the token/application.
4. If limit exceeded -> Drop request & return HTTP `429`.
5. If within limits -> Proxy request to `http://localhost:3000`.
