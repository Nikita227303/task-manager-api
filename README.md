# task-manager-api
# Task Manager API

A simple Task Manager REST API built using Node.js, Express, and MongoDB.  
This project allows users to manage their daily tasks with full authentication and secure access using JWT.

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)

## Features
- User Registration & Login
- JWT Authentication & Protected Routes
- Create Task
- Read All Tasks
- Update Task
- Delete Task

## Installation

1. Clone the repository  
git clone https://github.com/Nikita227303/task-manager-api

2. Install dependencies  
npm install

3. Create .env file  
PORT=5000  
MONGO_URI=your_mongodb_url  
JWT_SECRET=your_secret_key  

4. Run the server  
npm start

## API Endpoints

### Auth Routes
POST /api/auth/register  
POST /api/auth/login  

### Task Routes (Protected)
GET /api/tasks  
POST /api/tasks  
PUT /api/tasks/:id  
DELETE /api/tasks/:id  

## Workflow
User registers → logs in → receives JWT token → uses token to access and manage tasks.

## Future Improvements
- Task categories & filtering  
- Due date reminders  
- Frontend UI integration  
- Role-based access control
