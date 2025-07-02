// src/contexts/AuthContext.jsx
import { authenticateUser } from "@/utils/authenticate-user";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (formData) => {
    setLoading(true);
    const { token, user: u } = await authenticateUser(formData);
    localStorage.setItem("token", token);
    setUser(u);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Al iniciar, si hay token, lo ponemos en headers
  useEffect(() => {
    const token = localStorage.getItem("token");
    // aquí podrías llamar a un endpoint /api/auth/me para recuperar user
    // o decodificar el JWT si ya tienes esa lógica
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
