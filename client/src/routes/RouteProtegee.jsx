import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

export default function RouteProtegee({ children }) {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/connexion" replace />;
  return children;
}