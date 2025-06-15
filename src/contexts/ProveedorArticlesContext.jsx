import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const ProveedorArticlesContext = createContext(undefined);

export const ProveedorArticlesProvider = ({ children }) => {
  const [articlesByProveedor, setArticlesByProveedor] = useState({});

  const loadArticlesByProveedor = async (idProveedor, force = false) => {
    if (articlesByProveedor[idProveedor] && !force) return;
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/proveedores/articulos/proveedor/${idProveedor}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setArticlesByProveedor((prev) => ({ ...prev, [idProveedor]: [] }));
          return;
        }
        throw new Error("Error al obtener artículos del proveedor");
      }

      const data = await response.json();
      setArticlesByProveedor((prev) => ({
        ...prev,
        [idProveedor]: data.filter((a) => a.estado_logico),
      }));
    } catch (error) {
      console.error("❌ Error en loadArticlesByProveedor:", error);
      toast.error("Error inesperado al cargar artículos");
    }
  };

  const getArticlesForProveedor = (idProveedor) =>
    articlesByProveedor[idProveedor] || [];

  return (
    <ProveedorArticlesContext.Provider
      value={{
        articlesByProveedor,
        loadArticlesByProveedor,
        getArticlesForProveedor,
      }}
    >
      {children}
    </ProveedorArticlesContext.Provider>
  );
};

export const useProveedorArticles = () => {
  const context = useContext(ProveedorArticlesContext);
  if (!context) {
    throw new Error(
      "useProveedorArticles debe usarse dentro de un ProveedorArticlesProvider"
    );
  }
  return context;
};
