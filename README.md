# Backend Setup

This repository contains the backend code for the React project. Follow the instructions below to set up and run the backend along with a MongoDB instance using Docker Compose.

## Prerequisites

- Node.js and npm installed. You can download them from [nodejs.org](https://nodejs.org/).
- Docker and Docker Compose installed. You can download them from [docker.com](https://www.docker.com/).

## Getting Started

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/your-username/react-backend.git
   cd react-backend`

   ```

2. Create a `.env` file in the `backend` directory and specify the following environment variables:
   ```
   MONGO_URL=mongodb://localhost:27017/shipment-tracking-db
   SECRET_KEY=key
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   ```
3. Start a MongoDB instance using Docker Compose:

   ```
   docker-compose up -d
   ```

This will start a MongoDB container named `mongodb` using the configuration in the `docker-compose.yml` file. The database will be accessible at `mongodb://localhost:27017`.

1. Install backend dependencies:

   ```
   npm install
   ```

1. Start the backend server:

   ```
   npm start
   ```

   The backend server will run at `http://localhost:3001`.

## Backend API Endpoints

- Protected Route: POST <http://localhost:3000/login>
- Protected Route: POST <http://localhost:3000/signup>
- Protected Route: POST <http://localhost:3000/shipment/create>
- Protected Route: POST <http://localhost:3000/tracking/update>
- Unprotected Route: GET <http://localhost:3000/track>
- Protected Route: GET <http://localhost:3000/shipment/all>

## Folder Structure

- `/src`: Contains the backend server code.
