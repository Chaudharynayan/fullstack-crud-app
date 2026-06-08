# Personal Task Manager

## Brief Description

This project is a full-stack Personal Task Manager application built as part of the Studio Graphene Full Stack Developer Assessment (Exercise 1).

The application allows users to create, view, update, complete, and delete tasks. Users can add task details such as title, description, and due date, track completion status, filter tasks based on status, and identify overdue tasks. The project follows a client-server architecture using React for the frontend and Node.js with Express for the backend.

---

## Live Demo Link

Frontend:
https://fullstack-crud-app-seven.vercel.app

Backend:
https://fullstack-crud-app-ide7.onrender.com

---

## Tech Stack

### Frontend
- React
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- CORS

### Development Tools
- Git
- GitHub
- Vercel (Frontend Deployment)
- Render (Backend Deployment)

### Why These Technologies?

- React provides a simple component-based frontend architecture.
- Express simplifies REST API development.
- CORS enables communication between frontend and backend.
- Plain CSS was chosen for simplicity and full control over styling.
- Render and Vercel provide free and reliable deployment options.

---

## Features Implemented

### Must Have Features

- Create a new task
- View all tasks
- Update task details
- Delete task with confirmation
- Mark task as complete/incomplete
- Filter tasks by:
  - All
  - Active
  - Completed
- Sort tasks by creation date (newest first)
- Optional description field
- Optional due date field

### Should Have Features

- Active task count
- Completed task count
- Empty state UI
- Overdue task highlighting

### Additional Features

- Responsive design
- Modern UI styling
- Error handling for invalid requests

---

## How to Run Locally

### Prerequisites

Install:

- Node.js
- npm

Verify installation:

```bash
node -v
npm -v
```

---

### Clone Repository

```bash
git clone https://github.com/Chaudharynayan/fullstack-crud-app.git
cd fullstack-crud-app
```

---

### Backend Setup

```bash
cd backend

npm install

node index.js
```

Backend will run on:

```text
http://localhost:5000
```

---

### Frontend Setup

Open a new terminal:

```bash
cd frontend

npm install

npm start
```

Frontend will run on:

```text
http://localhost:3000
```

---

## API Documentation

### Create Task

Method:

```http
POST /tasks
```

Request Body:

```json
{
  "title": "Complete Assignment",
  "description": "Finish Studio Graphene task",
  "dueDate": "2026-06-15"
}
```

Response:

```json
{
  "message": "Task created",
  "task": {
    "id": 1,
    "title": "Complete Assignment"
  }
}
```

---

### Get All Tasks

Method:

```http
GET /tasks
```

Response:

```json
[
  {
    "id": 1,
    "title": "Complete Assignment",
    "description": "Finish Studio Graphene task",
    "dueDate": "2026-06-15",
    "completed": false
  }
]
```

---

### Update Task

Method:

```http
PUT /tasks/:id
```

Request Body:

```json
{
  "title": "Updated Task",
  "description": "Updated Description",
  "dueDate": "2026-06-20"
}
```

Response:

```json
{
  "message": "Task updated"
}
```

---

### Toggle Task Status

Method:

```http
PATCH /tasks/:id/toggle
```

Response:

```json
{
  "message": "Task status toggled"
}
```

---

### Delete Task

Method:

```http
DELETE /tasks/:id
```

Response:

```json
{
  "message": "Task deleted"
}
```

---

## Project Structure

```text
fullstack-crud-app
│
├── backend
│   ├── server.js
│   ├── package.json
│   └── node_modules
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   │
│   ├── package.json
│   └── node_modules
│
└── README.md
```

### Folder Description

#### backend/

Contains Express server and REST API endpoints.

#### frontend/

Contains React user interface and application state management.

#### README.md

Project documentation and setup instructions.

---

## Challenges Faced

- Implementing task filtering logic.
- Managing frontend-backend communication.
- Handling task completion updates without page refresh.
- Designing a responsive and clean user interface.

---

## Future Improvements / Next Steps

If given more time, I would implement:

- Search tasks by title.
- Persist tasks using SQLite or a JSON file.
- Drag-and-drop task reordering.
- Authentication and user accounts.
- Unit and integration testing.
- Better edit forms using modals instead of browser prompts.
- Pagination for large task lists.

---

## AI Usage Disclosure

AI tools were used to assist with:
- Understanding React and Express concepts.
- Code structure guidance.
- Debugging issues during development.
- Improving UI styling.

---
