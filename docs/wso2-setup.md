# WSO2 API Manager Local Setup

This guide provides instructions for setting up the WSO2 API Manager locally to orchestrate the Smart EV Platform backend.

## 1. Download & Installation
1. Download the latest version of WSO2 API Manager from [wso2.com/api-manager](https://wso2.com/api-manager/).
2. Extract the downloaded ZIP file to a preferred directory. This will be your `<APIM_HOME>`.
3. Ensure you have Java Development Kit (JDK) 11 or 17 installed and your `JAVA_HOME` environment variable is set.

## 2. Run the Server
To start the WSO2 Micro Integrator and API Gateway:
1. Open a terminal and navigate to `<APIM_HOME>/bin`.
2. Run the startup script:
   - **Linux/Mac**: `./api-manager.sh`
   - **Windows**: `api-manager.bat`
3. Wait for the server console to display the "WSO2 Carbon started" message.

## 3. Access Portals

WSO2 APIM provides distinct web portals to separate the developer and management roles:

### The Publisher Portal
**URL**: `https://localhost:9443/publisher`
- **Purpose**: Used by API creators and architects. 
- **Capabilities**: Here you design APIs, import OpenAPI (Swagger) specifications, define lifecycle states, attach security/throttling policies, and publish the APIs to the gateway.

### The Developer Portal
**URL**: `https://localhost:9443/devportal`
- **Purpose**: Used by frontend or 3rd-party application developers to discover APIs.
- **Capabilities**: Here developers browse available APIs, read documentation, subscribe their applications to usage plans, and generate OAuth2 tokens for actual API invocation.
