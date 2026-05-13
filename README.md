<# Task Management Reference App

## Purpose

This repository contains a simple task management reference application built using Angular and .NET Web API.

The goal of the implementation was not to build a feature-rich product, but to demonstrate how I would structure and approach a production-oriented application from both an engineering and delivery perspective.

The focus areas were:

* Clear separation of concerns
* Simple and maintainable structure
* API design and validation
* Error handling and logging
* Practical delivery approach for a lean team

---

## Solution Overview

The application provides a basic one-screen task management workflow where users can:

* Create tasks
* View tasks
* Update task status
* Delete tasks

The frontend is built in Angular and communicates with a .NET Web API backend through REST endpoints.

For simplicity, the backend currently uses in-memory storage rather than a database.

---

## Architecture

### High-Level Flow

```text
Angular Frontend
        ↓
.NET Web API
        ↓
Service Layer
        ↓
Data Layer
```

### Approach Taken

I intentionally kept the architecture simple and modular rather than introducing unnecessary complexity early.

The implementation separates:

* UI concerns
* API endpoints
* Business logic
* Request contracts/models

This makes the solution easier to maintain and extend as additional functionality is introduced.

---

## Tech Stack

### Frontend

* Angular
* TypeScript

### Backend

* .NET 8 Web API
* ASP.NET Core

### Tooling

* Swagger/OpenAPI
* GitHub
* Angular CLI
* .NET CLI

---

## Project Structure

```text
frontend/
└── task-management-ui/

backend/
└── TaskManagement.Api/
```

### Backend Structure

```text
Controllers/   → API endpoints
Services/      → Business logic
Models/        → Domain models
Contracts/     → Request DTOs
Middleware/    → Error handling
```

### Frontend Structure

```text
core/      → Shared services/models
features/  → Feature-related UI
shared/    → Shared reusable components
```

---

## Running the Application

### Prerequisites

Ensure the following are installed:

* .NET 8 SDK
* Node.js
* Angular CLI

---

### Running the Backend

From the repository root:

```bash
cd backend/TaskManagement.Api
dotnet run
```

Swagger will be available at:

```text
http://localhost:5164/swagger
```

---

### Running the Frontend

From the repository root:

```bash
cd frontend/task-management-ui
ng serve
```

Frontend URL:

```text
http://localhost:4200
```

---

## Local Development Notes

The Angular frontend is configured to call the backend API running locally on:

```text
http://localhost:5164
```
If the backend runs on a different local port, update:

frontend/task-management-ui/src/app/core/services/task-api.service.ts

CORS is enabled locally for:

```text
http://localhost:4200
```

For simplicity in local development:

* HTTPS redirection was disabled
* In-memory storage is used instead of a database

In a production environment this would typically be replaced with:

* HTTPS enforcement
* Persistent database storage
* Environment-based configuration
* Restricted CORS policies

---

## Design Decisions

### Keep the MVP Simple

I intentionally focused on core workflow functionality rather than breadth of features. The goal was to establish a clean and extensible foundation first.

### Lightweight but Structured

Although the application is small, the solution is still separated into controllers, services, contracts, and models to keep responsibilities clear as the project grows.

### Centralised Error Handling

Global exception middleware was added to avoid duplicated error handling logic across controllers and provide consistent API responses.

### Avoid Early Over-Engineering

I deliberately avoided introducing distributed architecture or microservices at this stage. For a workflow application of this size, a modular monolith is simpler to maintain and faster to deliver.

---

## Testing Approach

The focus of this implementation was demonstrating structure and delivery approach rather than comprehensive test coverage.

In a production implementation I would typically include:

* Unit tests for services
* API integration tests
* Frontend component testing
* CI/CD quality gates

---

## Potential Next Steps

Some logical next steps for the application would include:

* Database integration
* Authentication and role-based access
* File attachments
* Notifications/reminders
* Reporting/dashboard capability
* Deployment pipelines
* AI-assisted task categorisation/prioritisation

---

## Final Note

The solution intentionally prioritises simplicity, maintainability, and delivery practicality over unnecessary complexity. The objective was to provide a clean starting point that a small engineering team could continue building on safely over time.