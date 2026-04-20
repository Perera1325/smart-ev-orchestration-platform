# API Lifecycle Management

WSO2 API Manager enforces strict state transitions for all APIs within the Smart EV Orchestration Platform to maintain stability for integrated enterprise users.

## Standard Lifecycle States

The **EV Charging API v1.0.0** traverses the following official WSO2 states:

### 1. Created
- The initial state when the API architect imports the OpenAPI spec into the WSO2 Publisher.
- It is invisible to external developers.
- It cannot be invoked via the WSO2 Gateway.
- Used for sandbox testing, defining endpoints, and configuring security policies.

### 2. Published
- The API is officially pushed to the API Gateway.
- It becomes immediately visible on the **Developer Portal**.
- 3rd-party developers can now browse its documentation, subscribe to it, generate OAuth tokens, and call its backend services in a production environment.

### 3. Deprecated
- Triggered when a new version (e.g., `v2.0.0`) is published and the current version (`v1.0.0`) is set to be phased out.
- Existing developers who are already subscribed can continue to invoke the API without interruption.
- **New** developers cannot see or subscribe to it on the Developer Portal. 
- Prevents breaking changes while allowing legacy support.

### 4. Retired
- The absolute end of the lifecycle.
- The API is un-deployed from the API Gateway.
- Even previously subscribed developers will receive HTTP 404/503 errors if they attempt to invoke it.
- Done only when all users have been successfully migrated to newer versions.

## Lifecycle Governance Integration
By utilizing WSO2's built-in lifecycle management, the Smart EV platform ensures that backend changes (handled in `services/backend/`) never immediately break external client integrations without proper deprecation communications via the Developer Portal.
