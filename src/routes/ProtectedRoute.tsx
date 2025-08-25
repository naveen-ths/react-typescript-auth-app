import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore, type AuthStore } from "../stores/authStore";
export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state: AuthStore) => state.isAuthenticated);
  const location = useLocation();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
}