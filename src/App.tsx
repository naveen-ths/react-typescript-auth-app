import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './components/Dashboard';
import SystemInfo from './components/SystemInfo';


function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterForm />
            } 
          />
          <Route 
            path="/forgot-password" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <ForgotPasswordForm />
            } 
          />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/system-info" 
            element={
              <ProtectedRoute>
                <SystemInfo />
              </ProtectedRoute>
            } 
          />
          
          {/* Default redirect */}
          <Route 
            path="/" 
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
            } 
          />
          
          {/* Catch all - redirect to appropriate page */}
          <Route 
            path="*" 
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
