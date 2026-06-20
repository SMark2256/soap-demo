# SOAP API Demo Application

This project demonstrates an application that integrates SOAP web services using Angular (frontend) and NestJS (backend). The application utilizes various SOAP services, including calculator operations, country information, currency data, and language listings.

## Features

* Calculator with basic arithmetic operations
* Country information browser with details (capital, currency, flag)
* Currency listing and details
* Language listing and filtering

## Prerequisites

Before you begin, make sure the following are installed:

* [Node.js](https://nodejs.org/) (v18 or later)
* [npm](https://www.npmjs.com/) (v9 or later)

## Getting Started

### Step 1: Clone the Project

```bash
git clone <repository-url>
cd soap-demo
```

### Step 2: Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   npm run start:dev
   ```

   The backend will be available at http://localhost:3000

### Step 3: Frontend Setup

1. Open a new terminal and navigate to the project root directory.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm start
   ```

   The application will be available at http://localhost:4200

## Application Structure

### Backend (NestJS)

The backend is divided into different modules that integrate with various SOAP services:

* **Calculator Module**: Connects to a calculator SOAP service
* **Countries Module**: Provides country information from a SOAP service
* **Currencies Module**: Retrieves currency data from a SOAP service
* **Languages Module**: Obtains language information from a SOAP service

### Frontend (Angular)

The frontend is built with Angular and follows a component-based architecture:

* **Calculator Component**: User interface for performing calculations
* **Countries Component**: Interface for browsing country information
* **Currencies Component**: Displays currency data
* **Languages Component**: Lists and filters languages

## Environment Configuration

### Backend

Environment variables are stored in the `.env` file located in the backend directory:

```env
PORT=3000
HOST=localhost
ENABLE_CORS=true
```

If no `.env` file is present, the application will use `localhost:3000` by default.

### Frontend (Currently Not Implemented)

Environment configuration files are located in the `src/environments` directory:

* `environment.ts`: Development environment settings
* `environment.prod.ts`: Production environment settings

## Production Deployment

### Backend

```bash
cd backend
npm run build
npm run start:prod
```

### Frontend

```bash
npm run build
```

The compiled frontend will be generated in the `dist/soap` directory, ready to be deployed to a web server.

## Troubleshooting

### SOAP Service Connection Issues

If you experience problems connecting to SOAP services:

1. Check your internet connection.
2. Verify that the SOAP endpoints are accessible.
3. Review the backend logs for detailed error messages.

### API Connection Issues

If the frontend cannot connect to the backend:

1. Make sure the backend server is running.
2. Verify that the API URL configured in the frontend environment matches the backend URL.
3. Ensure that CORS is enabled on the backend.
