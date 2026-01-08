
# Task Manager Application

A full-stack task management application built with Next.js, Express.js, and MongoDB.

Live link : https://task-manager-nu-plum.vercel.app

## Features

- User authentication (Register/Login) with JWT
- Create, edit, and delete tasks
- Mark tasks as Pending or Completed
- Responsive UI with shadcn/ui components
- Secure HTTP-only cookie authentication

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- React
- Axios
- shadcn/ui
- Tailwind CSS
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Project Structure

```
task-manager/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── app/
    │   ├── dashboard/
    │   │   └── page.jsx
    │   ├── login/
    │   │   └── page.jsx
    │   ├── register/
    │   │   └── page.jsx
    │   ├── layout.jsx
    │   ├── page.jsx
    │   └── globals.css
    ├── components/
    │   ├── ui/
    │   │   ├── button.jsx
    │   │   ├── card.jsx
    │   │   ├── dialog.jsx
    │   │   ├── input.jsx
    │   │   ├── label.jsx
    │   │   └── textarea.jsx
    │   ├── TaskCard.jsx
    │   └── TaskModal.jsx
    ├── lib/
    │   ├── axios.js
    │   └── utils.js
    ├── package.json
    ├── tailwind.config.js
    ├── jsconfig.json
    └── .env.local
```

## Both Backend and frontend are stored in seprated repo you can clone both seprately
## Backend part for Task-Manager App : https://github.com/Aman3007/Task_Manager-Backend

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-super-secret-jwt-key-change-this
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```


5. Start the backend server:
```bash
node server
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Register a new account with your name, email, and password
3. Login with your credentials
4. Create, edit, delete, and manage your tasks
5. Toggle task status between Pending and Completed

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/verify` - Verify authentication

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Validation Rules

### Registration
- Name: Required, non-empty
- Email: Required, valid email format
- Password: Minimum 8 characters, at least one uppercase letter, at least one special character

### Login
- Email: Required, valid email format
- Password: Required

### Tasks
- Title: Required, non-empty
- Content/Description: Required, non-empty

## Security Features

- Passwords hashed with bcryptjs
- JWT stored in HTTP-only cookies
- Protected routes on both frontend and backend
- CORS enabled with credentials





