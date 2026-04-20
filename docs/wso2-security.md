# API Security with WSO2 APIM

The Smart EV Orchestration Platform exposes sensitive routes (like `/booking` and `/payment`). We secure these backend routes at the gateway level using WSO2 API Manager.

## Authentication Mechanism: OAuth2

WSO2 API Manager uses an internal Key Manager by default to issue and validate OAuth 2.0 access tokens.

### 1. Generating Access Tokens
Developers consuming our APIs must follow the OAuth2 flow:
1. Log in to the WSO2 Developer Portal.
2. Create an **Application**.
3. Subscribe the application to the **EV Charging API v1.0.0**.
4. Navigate to the **Production Keys** tab and click **Generate Keys**.
5. WSO2 issues a `Consumer Key`, `Consumer Secret`, and a default `Access Token`.

### 2. Protecting APIs
All endpoints exported via the API definition are strictly protected using the `Bearer` token strategy. 
To invoke the APIs via Postman or cURL, clients must include the generated token in the HTTP Headers:

```http
Authorization: Bearer <YOUR_ACCESS_TOKEN>
```

### 3. JWT and Microgateways
By default, the WSO2 Key Manager issues opaque OAuth tokens. However, the API Gateway is configured to pass a backend JWT (JSON Web Token) to the Node.js service (in the `X-JWT-Assertion` header) containing subscriber details, roles, and context for fine-grained authorization downstream.
