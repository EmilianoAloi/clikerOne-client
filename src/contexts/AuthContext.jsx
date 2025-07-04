import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function decodeJWT(token) {
  try {
    const [, payloadB64] = token.split(".");
    const json = atob(payloadB64);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const login = async (formData) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: formData.get("usuario"),
        password: formData.get("password"),
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al loguear");
    localStorage.setItem("token", data.token);
    const payload = decodeJWT(data.token);
    setUser({
      id_usuario: payload.id_usuario,
      nombre: payload.nombre,
      rol: payload.rol,
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get("token");
    const token = tokenParam || localStorage.getItem("token");

    if (tokenParam) {
      localStorage.setItem("token", tokenParam);
      window.history.replaceState({}, "", window.location.pathname);
    }

    if (token) {
      const payload = decodeJWT(token);
      if (payload) {
        setUser({
          id_usuario: payload.id_usuario,
          nombre: payload.nombre,
          rol: payload.rol,
        });
      }
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
