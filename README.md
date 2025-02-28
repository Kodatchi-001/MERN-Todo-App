# MERN Stack Project

## Description

This project is a full-stack application built with **MERN** (MongoDB, Express.js, React, Node.js). 
It allows you to create, read, update, and delete data in a MongoDB database via an API built with Express.js and Node.js. 
The front-end is developed in React , while the back-end uses Express.js to handle HTTP requests and MongoDB for data storage.

## Features

- User authentication and management
- CRUD (Create, Read, Update, Delete) operations for data
- Use of **CORS** to handle cross-origin requests
- MongoDB connection via **Mongoose** to simplify database operations

## Prerequisites

Before starting, make sure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **MongoDB**: [Install MongoDB](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud database.

## Installation

### Back-End

1. Clone the project
   ```bash
   git https://github.com/Kodatchi-001/MERN-Todo-App.git
   cd MERN-Todo-App
   ```

2. Navigate to the back-end folder and install dependencies
   ```bash
   cd backend
   npm install
   ```

3. Configure your MongoDB connection in `backend/config/db.js` by replacing the connection details with your MongoDB URI.

4. Run the back-end server using `nodemon` (if you don't have `nodemon` installed, you can install it globally using `npm install -g nodemon`):
   ```bash
   nodemon server.js
   ```

5. The back-end server will be running at `http://localhost:3000`.

### Front-End

1. Navigate to the front-end folder
   ```bash
   cd frontend
   ```

2. Install the front-end dependencies
   ```bash
   npm install
   ```

3. Start the front-end server
   ```bash
   npm start
   ```

4. The front-end will be running at `http://localhost:3001`.

### Running the Full Stack

1. Ensure both the back-end and front-end servers are running on different ports:
   - **Back-End**: `http://localhost:3000`
   - **Front-End**: `http://localhost:3001`

2. Open your browser and navigate to `http://localhost:3001` to see the application in action.

## Main Dependencies

- **Express.js**: A framework to handle HTTP requests on the server side.
- **MongoDB**: NoSQL database to store the data.
- **Mongoose**: ODM to interact with MongoDB and simplify database operations.
- **CORS**: Middleware to handle cross-origin requests.
- **React**: JavaScript library to build the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
  
## Project Structure

```
  /backend
        /model
        server.js
    /frontend
        /src
            /assets
            /components
            /pages
            /slices
            /store
            /styles
            /types
            App.js
            index.js
    .gitignore
    package.json
    README.md
```

## Testing

No tests have been implemented in this project yet.
