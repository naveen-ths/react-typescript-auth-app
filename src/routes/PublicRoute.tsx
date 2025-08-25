import { Navigate, Outlet } from "react-router-dom";

// Simulated auth check
const useAuth = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

export default function PublicRoute() {
  const isAuth = useAuth();
  return isAuth ? <Navigate to="/dashboard" replace /> : <Outlet />;
}