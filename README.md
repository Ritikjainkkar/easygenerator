# Easygenerator Assignment

React frontend and a Node.js/NestJS backend. 

Where backend is configured to run on port 3000 and frontend running on port 3001 with CORS enabled specifically for this port.

## Prerequisites

To run this project, you'll need the following installed:
- Node.js (at least version 20)
- npm (comes with Node.js)
- MongoDB (local or remote)

### Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory

mongo url shared via email

```plaintext
MONGODB_URL=mongodb://yourMongoDBUrl 
JWT_KEY=yourSecretJWTKey
```

### Set Up the Frontend

Navigate to the frontend directory, install dependencies:

```bash
cd ../client
npm install
```

### Start the Backend

```bash
cd server
npm run start
```

### Start the Frontend

From the `client` directory:

```bash
npm start
```