import { createBrowserRouter } from 'react-router-dom'

import PublicLayout from './layouts/PublicLayout.tsx'
import AdminLayout from './layouts/AdminLayout.tsx'

import LoginForm from './components/auth/LoginForm.tsx'
import { ForgotPasswordForm } from './components/auth/ForgotPasswordForm.tsx'
import RegisterForm from './components/auth/RegisterForm.tsx'
import PublicRoute from './routes/PublicRoute.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import Dashboard from './components/Dashboard.tsx'
import Todo from './components/todos/Todo.tsx'
import SystemInfo from './components/SystemInfo.tsx'
import AddTodo from './components/todos/AddTodo.tsx'
import EditTodo from './components/todos/EditTodo.tsx'

const router = createBrowserRouter([
  // Public routes
  {
    element: <PublicRoute />, // redirect if logged in
    children: [
      {
        path: "/",
        element: <PublicLayout />,
        children: [
          { path: "/", index: true, element: <LoginForm /> },
          { path: "register", element: <RegisterForm /> },
          { path: "forgot-password", element: <ForgotPasswordForm /> },
        ],
      },
    ],
  },

  // Protected admin routes
  {
    element: <ProtectedRoute />, // redirect if not logged in
    children: [
      {
        path: "/",
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          {
            path: "todos", children: [
              { path: "", element: <Todo /> },
              { path: "add-todo", element: <AddTodo /> },
              { path: "edit-todo/:id", element: <EditTodo /> }
            ]
          },
          { path: "system-info", element: <SystemInfo /> },
        ],
      },
    ],
  },
  // You can also add routes outside the nested structure
  {
    path: '*', // Catch-all for undefined routes
    element: <h1>404 - Page Not Found</h1>,
  },
])

export default router;
