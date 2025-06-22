# Intelligence Web Interaction Protocol (IWIP) - Specification

**Version:** 1.0
**Date:** June 22, 2025
**Status:** Draft - For Review & Contribution

## 1. Introduction

The Intelligence Web Interaction Protocol (IWIP) defines a standardized, secure, and efficient framework for Large Language Models (LLMs) to interact with web applications.  IWIP aims to establish a common wiring layer, fostering interoperability and empowering users with control over their data and interactions. This document details the protocol's components, data formats, and security considerations.

## 2. Core Principles

* **Openness:** IWIP is an open standard, encouraging community contribution and innovation.
* **Vendor Neutrality:** IWIP is not tied to any specific cloud provider, LLM, or runtime environment.
* **Security First:** Security is paramount, incorporating robust authentication, authorization, and data protection.
* **Forward Compatibility:** IWIP is designed to be extensible and adaptable to future technologies.
* **User Control:** Users retain control over their data and interactions with AI agents.

## 3. Protocol Overview

IWIP operates on a request-response model. An LLM agent initiates a request, which is processed by the web application, and a standardized response is returned to the agent.  The protocol leverages JSON for data exchange and relies on a secure session token system for authentication and authorization.

## 4. Key Components

### 4.1. LLM-Ready Data Layer

* **Purpose:** Provides LLMs with pre-processed, context-rich data from the website.
* **Format:** JSON or YAML.
* **Content:**
    * `content`: Extracted text content.
    * `summaries`: Summaries of varying token lengths (50, 100, 250, 500).
    * `metadata`:  Object containing:
        * `url`: The original URL of the content.
        * `date`: Publication date.
        * `author`: Author of the content.
        * `keywords`: Relevant keywords.
        * `content_type`: Type of content (e.g., article, product description).
    * `embedding`: Vector embedding of the content (using a consistent embedding model).

### 4.2. Action Registry

* **Purpose:** Defines available web app actions for LLMs.
* **Format:** JSON within the `.iwip` file.
* **Structure:**

```json
{
  "name": "action_name",
  "type": "web_function | api | llm_action | application_action",
  "function_name": "javascript_function_name", 
  "api_endpoint": "/api/endpoint",
  "parameters": {
    "param1": "data_type",
    "param2": "data_type"
  },
  "description": "Human-readable description of the action",
  "response_types": {
    "success": {
      "description": "Description of success response",
      "data_schema": {
        "field1": "data_type",
        "field2": "data_type"
      }
    },
    "error": {
      "description": "Description of error response",
      "data_schema": {
        "error_code": "string",
        "error_message": "string"
      }
    }
  }
}
```

### 4.3. IWIP Runner

* **Purpose:** Securely executes JavaScript functions exposed by the website.
* **Implementation:** JavaScript file hosted on the website (e.g., `iwip-runner.js`).
* **Responsibilities:**
    * Function Registry: Maintains a list of authorized functions.
    * Security Checks: Verifies session tokens and function authorization.
    * Parameter Validation: Validates input parameters.
    * Error Handling: Provides standardized error responses.

### 4.4. Session Token System

* **Purpose:** Authenticate and authorize agent access to web app functionality.
* **Mechanism:** OAuth-inspired, using short-lived session tokens.
* **Workflow:** (See Section 5.2 for detailed workflow)

### 4.5. Standardized Response System

* **Purpose:** Provide a consistent format for communicating action results.
* **Format:** JSON.
* **Structure:**

```json
{
  "success": true/false,
  "data": {
    // Action-specific data (structure defined by 'response_type')
  },
  "message": "Human-readable message (optional)",
  "response_type": "string"
}
```

## 5. Protocol Workflow

### 5.1. Action Request

1. The LLM agent retrieves the `.iwip` file from the website.
2. The agent identifies the desired action and its associated parameters.
3. The agent requests an action-specific token from the LLM Origin Server.
4. The LLM Origin Server presents the action to the user for approval.
5. Upon approval, the LLM Origin Server issues an action-specific token to the agent.
6. The agent sends a request to the IWIP Runner, including the action name, parameters, and action-specific token.

### 5.2. Action Execution & Response

1. The IWIP Runner validates the action-specific token and parameters.
2. The IWIP Runner executes the corresponding action (JavaScript function or API call).
3. The IWIP Runner constructs a JSON response according to the `response_type` defined in the Action Registry.
4. The IWIP Runner sends the response back to the LLM agent.
5. The LLM agent processes the response and generates a user-facing output.

## 6. Security Considerations

* **CORS Control:**  `allowed_origins` array in the `.iwip` file.
* **Input Validation:**  Strict validation of all input parameters.
* **Authentication & Authorization:**  Robust session token system and per-action tokens.
* **Regular Security Audits:**  Ongoing security assessments.
* **HTTPS:** All communication must occur over HTTPS.

## 7. Future Extensions

* **NLIP Integration:** Explore alignment with the Natural Language Interaction Protocol (NLIP).
* **Multi-Modal Support:** Extend the protocol to support other modalities (audio, video, images).
* **Advanced Error Handling:** Implement more sophisticated error handling mechanisms.

## 8. Appendix

* **Data Types:** (Define supported data types for parameters and response data)
* **Error Codes:** (Define standardized error codes)