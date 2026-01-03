# API Documentation

The Task Manager Backend is a RESTful API built with Express.js and Sequelize.

## Base URL
`http://localhost:5000/api`

## Authentication

### Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "example",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: `201 Created` with Token and User object.

### Login User
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: `200 OK` with Token and User object.

### Get Current User
- **URL**: `/auth/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response**: `200 OK` with User details.

---

## Tasks

### Get All Tasks
- **URL**: `/tasks`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response**: `200 OK` with Array of Tasks.

### Create Task
- **URL**: `/tasks`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "New Task",
    "description": "Task details",
    "status": "Todo"
  }
  ```
- **Success Response**: `201 Created`.

### Update Task
- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Partial update allowed (title, description, status).

### Delete Task
- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <token>`

### Get Task Statistics
- **URL**: `/tasks/stats`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response**: Object with counts for each status.
