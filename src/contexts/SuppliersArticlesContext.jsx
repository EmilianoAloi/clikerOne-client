import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const SuppliersArticlesContext = createContext(undefined);

export const ArticlesProvider = ({ children }) => {
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
    <SuppliersArticlesContext.Provider
      value={{
        articlesByProveedor,
        loadArticlesByProveedor,
        getArticlesForProveedor,
      }}
    >
      {children}
    </SuppliersArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(SuppliersArticlesContext);
  if (!context) {
    throw new Error("useArticles debe usarse dentro de un ArticlesProvider");
  }
  return context;
};
