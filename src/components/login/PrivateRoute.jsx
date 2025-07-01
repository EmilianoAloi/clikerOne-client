// src/components/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const location = useLocation();

  if (!isAuthenticated) {
    // Te redirige a login, pero recuerda dónde querías ir
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
