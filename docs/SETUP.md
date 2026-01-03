# Detailed Setup Guide

## 🛠 Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Recommended: v18+)
- [PostgreSQL](https://www.postgresql.org/)

## 📥 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd task-manager-app
   ```

2. **Backend Setup**:
   - Navigate to the `backend` folder.
   - Install dependencies: `npm install`.
   - Create/Edit `.env` file:
     ```env
     PORT=5000
     DB_URL=postgres://<username>:<password>@localhost:5432/task_db
     JWT_SECRET=your_jwt_secret_key
     NODE_ENV=development
     ```
   - Ensure you have a database named `task_db` in PostgreSQL.

3. **Frontend Setup**:
   - Navigate to the `frontend` folder.
   - Install dependencies: `npm install`.
   - Start development server: `npm run dev`.

## 🧪 Verification

- Open `http://localhost:5173`.
- Try registering a new user.
- Add a task and check if it appears in the list and the chart.
- Refresh the page to ensure persistence.
