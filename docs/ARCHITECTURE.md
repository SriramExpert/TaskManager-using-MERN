# Architecture Overview

## Technology Stack

### Backend
- **Node.js & Express**: Web framework.
- **Sequelize (ORM)**: For database interactions.
- **PostgreSQL**: Relational database storage.
- **JWT (JSON Web Tokens)**: For secure authentication.
- **Bcrypt**: For password hashing.

### Frontend
- **React (Vite)**: UI Library and build tool.
- **Redux Toolkit**: State management.
- **Chart.js**: Data visualization for task statistics.
- **Lucide React**: Icon system.
- **Vanilla CSS**: Custom design system with glassmorphism.

## Project Structure

```text
task-manager-app/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Auth checks
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   └── server.js       # Entry point
├── frontend/
│   ├── public/         # Static assets
│   └── src/
│       ├── components/ # React components (auth, tasks, layout)
│       ├── store/      # Redux setup and slices
│       ├── App.jsx     # Routing and core layout
│       └── main.jsx    # Entry point
└── docs/               # Documentation
```

## State Flow
1. User interacts with a React component.
2. Component dispatches a Redux Action (Thunk).
3. The Thunk makes an Axios call to the Express API.
4. API processes request with Sequelize/PostgreSQL.
5. Result is returned and stored in Redux State.
6. The UI automatically re-renders with the new data.
