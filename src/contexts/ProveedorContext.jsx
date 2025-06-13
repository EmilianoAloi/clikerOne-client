"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores`;

const ProveedorsContext = createContext(undefined);

export const ProveedorsProvider = ({ children }) => {
  const [Proveedors, setProveedors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshProveedors = async (force = false) => {
    if (isLoaded && !force) return;
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error();
      const data = await response.json();
      const enriched = data.map((s) => {
        const facturas = s.facturas_pendientes ?? 0;
        const saldo = s.saldo ?? 0;
        return {
          ...s,
          facturasText:
            facturas === 0
              ? "Ninguna"
              : `${facturas} factura${facturas > 1 ? "s" : ""}`,
          saldoText:
            saldo === 0
              ? "Saldo Cero"
              : saldo > 0
              ? `+ $${saldo.toLocaleString("es-AR")}`
              : `- $${Math.abs(saldo).toLocaleString("es-AR")}`,
        };
      });
      setProveedors(enriched);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error al obtener los proveedores:", error);
      toast.error("Error al obtener los proveedores.");
    }
  };

  useEffect(() => {
    refreshProveedors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProveedorByID = async (id) => {
    const local = Proveedors.find((s) => s.id_proveedor === id);
    if (local) return local;
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error("Proveedor no encontrado");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("❌ Error al obtener proveedor por ID:", error);
      return null;
    }
  };

  const createProveedor = async (Proveedor) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Proveedor),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Error al crear proveedor.");
        return;
      }

      toast.success("Proveedor agregado con éxito.");
      await refreshProveedors(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error desconocido";
      console.error("Error agregando proveedor:", error);
      toast.error(message);
    }
  };

  const editProveedor = async (
    id,
    proveedor,
    articulos = [],
    articulosEliminados = [],
    onlyBasicInfo = false
  ) => {
    try {
      const payload = { proveedor };
      if (!onlyBasicInfo) {
        payload.articulos = articulos.map((a) => {
          if (typeof a.id === "number") {
            const { id, ...rest } = a;
            return { id_articulo: id, ...rest };
          }
          const { id, ...rest } = a;
          return rest;
        });
        payload.articulosEliminados = articulosEliminados;
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Error al actualizar proveedor.");
        return;
      }

      if (!onlyBasicInfo) {
        toast.success(`Proveedor "${proveedor.nombre}" actualizado con éxito.`);
      }

      await refreshProveedors(true);
    } catch (error) {
      console.error("Error editando proveedor:", error);
      toast.error("Hubo un problema al actualizar el proveedor.");
    }
  };

  const removeProveedor = async (id, nombre) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Error al eliminar proveedor.");
        return;
      }
      toast.error(`Proveedor "${nombre}" eliminado con éxito.`);
      await refreshProveedors(true);
    } catch (error) {
      console.error("Error eliminando proveedor:", error);
      toast.error("Hubo un problema al eliminar el proveedor.");
    }
  };

  const createProveedorWithArticles = async (proveedorData, articulos) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/proveedores/con-articulos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ proveedor: proveedorData, articulos }),
        }
      );

      const contentType = res.headers.get("content-type");

      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.error("❌ Respuesta no JSON:", text);
        throw new Error("Respuesta no válida del servidor");
      }

      if (!res.ok) {
        console.error("❌ Error desde backend:", data);
        throw new Error(
          data?.error || "Error al crear proveedor con artículos"
        );
      }

      return data;
    } catch (error) {
      console.error("createProveedorWithArticles error:", error);
      throw error;
    }
  };

  const activateProveedor = async (id, nombre) => {
    try {
      await editProveedor(id, { estado_logico: true }, [], [], true);
      toast.success(`Proveedor "${nombre}" activado con éxito.`);
      await refreshProveedors(true);
    } catch (error) {
      console.error("Error activando proveedor:", error);
      toast.error("Hubo un problema al activar el proveedor.");
    }
  };

  return (
    <ProveedorsContext.Provider
      value={{
        Proveedors,
        refreshProveedors,
        createProveedor,
        createProveedorWithArticles,
        editProveedor,
        removeProveedor,
        getProveedorByID,
        activateProveedor,
      }}
    >
      {children}
    </ProveedorsContext.Provider>
  );
};

export const useProveedors = () => {
  const context = useContext(ProveedorsContext);
  if (!context) {
    throw new Error(
      "useProveedors debe usarse dentro de un ProveedorsProvider"
    );
  }
  return context;
};
