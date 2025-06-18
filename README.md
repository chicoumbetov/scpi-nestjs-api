<p align="center">Add commentMore actions
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
# SCPI - Backend Application

---

## Project Overview

This project is the backend application for **SCPI**, a simulated fintech product focused on **Sociétés Civiles de Placement Immobilier (SCPI)** – French real estate investment trusts. It demonstrates robust backend development practices, particularly in handling financial transactions, data integrity, and concurrency using modern technologies.

The core functionality showcased is the **SCPI Unit Subscription process**, which is implemented with a strong emphasis on transactional integrity using ACID properties.

---

## Features

- **User Management**: Basic user (investor) creation and retrieval.
- **SCPI Unit Management**: Definition and retrieval of available SCPI units with their prices.
- **Transactional Subscriptions**: Securely handles the purchase of SCPI units by investors, ensuring:
  - **Atomicity**: Funds are deducted, and units are allocated as a single, indivisible operation. If any step fails (e.g., insufficient funds), the entire operation is rolled back, leaving the database in its original state.
  - **Consistency**: Adheres to business rules, such as checking for sufficient user balance before a transaction proceeds.
  - **Isolation**: Uses pessimistic locking (`pessimistic_write`) to prevent race conditions during concurrent subscription attempts, ensuring data accuracy even under heavy load.
  - **Durability**: Committed transactions are permanently stored, surviving system failures.
- **Subscription Tracking**: Records the status of each subscription (PENDING, COMPLETED, FAILED) for auditing and traceability.
- **Robust Error Handling**: Gracefully manages errors within transactions, rolling back changes and logging failures.
- **Logging**: Implements request/response logging using NestJS Interceptors for observability.

---

## Technologies Used

- **Backend Framework**: [NestJS](https://nestjs.com/) (Node.js framework for building efficient, reliable and scalable server-side applications)
- **ORM**: [TypeORM](https://typeorm.io/) (Object-Relational Mapper for TypeScript and JavaScript)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Robust, open-source relational database)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Typed superset of JavaScript that compiles to plain JavaScript)
- **Dependency Management**: npm

---

## Architecture Highlights

The application follows a modular and layered architecture, typical for NestJS applications:

- **Modules**: Features are organized into distinct modules (`UsersModule`, `ScpiUnitsModule`, `SubscriptionsModule`).
- **Services**: Contains the business logic, interacting with the database via TypeORM Repositories. The `SubscriptionsService` prominently features transactional logic.
- **Controllers**: Handle incoming HTTP requests and delegate to the services.
- **Entities**: TypeORM entities define the database schema and relationships.
- **Interceptors**: Used for cross-cutting concerns like request/response logging, demonstrating AOP (Aspect-Oriented Programming) principles.

---

## How to Run Locally

To get this project up and running on your local machine, follow these steps:

### 1. Prerequisites

- **Node.js**: Make sure you have Node.js (LTS version recommended) installed.
- **PostgreSQL**: Install and set up a PostgreSQL database server.

### 2. Database Setup

1.  Create a new PostgreSQL database for this project (e.g., `scpi`).

    ```sql
    CREATE DATABASE scpi;
    ```

2.  Ensure you have a user with appropriate permissions for this database. Update the connection details in `ormconfig.json` (or your `AppModule` TypeORM configuration).

### 3. Clone the Repository

```bash
git clone <repository_url_here>
cd scpi-nestjs-api
```

4. Install Dependencies

```Bash

npm install
```

5. Configure Database Connection
   Open ormconfig.json (or the TypeORM configuration in src/app.module.ts) and update the database credentials to match your PostgreSQL setup:

```JSON
// ormconfig.json (example)
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "your_pg_username", // <-- UPDATE THIS
  "password": "your_pg_password", // <-- UPDATE THIS
  "database": "scpi-nestjs-api",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true // For development, set to false in production and use migrations
}
```

6. Run the Application

```Bash

npm run start:dev
```

The application will start on http://localhost:3000.

API Endpoints (Examples)
You can use tools like Postman, Insomnia, or curl to test the endpoints.

1. Create a User
   POST /users

```JSON
{
  "email": "investor@example.com",
  "initialBalance": 5000.00
}
```

2. Create an SCPI Unit
   POST /scpi-units

```JSON

{
  "name": "SCPI",
  "price": 200.00
}
```

3. Subscribe to SCPI Units (Transactional)
   This is the core transactional endpoint.

POST /subscriptions

```JSON

{
  "userId": 1,        // ID of the user created above
  "scpiUnitId": 1,    // ID of the SCPI unit created above
  "desiredUnits": 5   // Number of units to subscribe to
}
```

Expected Behavior:

- \*\*Success: If the user has sufficient balance, their balance will decrease, their scpiUnitsOwned will increase, and a COMPLETED subscription record will be created.
- \*\*Failure (e.g., Insufficient Funds): The transaction will be rolled back. The user's balance and SCPI unit count will remain unchanged, and a FAILED subscription record will be created with a reason.

## Learning & Development Insights

This project provided a practical opportunity to deepen my understanding and application of:

- **Database Transactions**: Implementing and testing ACID properties, especially Atomicity and Isolation, which are paramount in financial applications.
- **Pessimistic Locking**: Using FOR UPDATE (via pessimistic_write in TypeORM) to prevent race conditions and ensure data integrity in high-concurrency scenarios.
- **TypeORM QueryRunner**: Gaining hands-on experience with TypeORM's lower-level transaction management API for fine-grained control.
- **NestJS Architecture**: Reinforcing modular design principles, dependency injection, and the use of pipes/interceptors for common concerns.
- **Error Handling Strategies**: Developing robust error handling within a transactional context to ensure data consistency.
