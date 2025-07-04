import React, { useState, useEffect, createContext } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      window.history.replaceState({}, document.title, window.location.pathname);
      setIsAuthenticated(true);
    } else {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  return (
    <LoginContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </LoginContext.Provider>
  );
};
