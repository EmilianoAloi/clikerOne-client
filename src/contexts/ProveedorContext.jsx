import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores`;

const ProveedorContext = createContext(undefined);

export const ProveedorProvider = ({ children }) => {
  const [proveedores, setProveedores] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshProveedores = async (force = false, updatedProveedor = null) => {
    if (isLoaded && !force) return; // Si los datos ya están cargados y no se fuerza la recarga, no se hace nada

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al obtener proveedores");
      const data = await response.json();

      // Si es una actualización, solo actualiza ese proveedor en particular
      if (updatedProveedor) {
        setProveedores((prevProveedores) =>
          prevProveedores.map((p) =>
            p.id_proveedor === updatedProveedor.id_proveedor
              ? updatedProveedor
              : p
          )
        );
      } else {
        const enriched = data.map((p) => {
          const facturas = p.facturas_pendientes ?? 0;
          const saldo = p.saldo ?? 0;
          return {
            ...p,
            facturasText: facturas === 0 ? "Ninguna" : `${facturas} factura(s)`,
            saldoText:
              saldo === 0
                ? "Saldo Cero"
                : saldo > 0
                ? `+ $${saldo.toLocaleString("es-AR")}`
                : `- $${Math.abs(saldo).toLocaleString("es-AR")}`,
          };
        });

        setProveedores(enriched);
      }
      setIsLoaded(true);
    } catch (error) {
      console.error("Error al obtener los proveedores:", error);
      toast.error("Error al obtener los proveedores.");
    }
  };

  useEffect(() => {
    refreshProveedores();
  }, []);

  useEffect(() => {
    console.log("PROVEEDORES:", proveedores);
  }, [proveedores]);

  const getProveedorByID = async (id) => {
    const local = proveedores.find((p) => p.id_proveedor === id);
    if (local) return local; // Si ya está en el contexto, no hace falta hacer el fetch

    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error("Proveedor no encontrado");
      return await response.json(); // Solo hace fetch si no lo encuentra en el contexto
    } catch (error) {
      console.error("Error al obtener proveedor por ID:", error);
      return null;
    }
  };

  const createProveedor = async (proveedor) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proveedor),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Error al crear proveedor.");
        return;
      }

      toast.success("Proveedor agregado con éxito.");
      await refreshProveedores(true);
    } catch (error) {
      toast.error("Error agregando proveedor.");
      console.error(error);
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
        payload.articulos = articulos.map(({ id, ...rest }) =>
          typeof id === "number" ? { id_articulo: id, ...rest } : { ...rest }
        );
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

      await refreshProveedores(true);
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
      toast.success(`Proveedor "${nombre}" eliminado con éxito.`);
      await refreshProveedores(true);
    } catch (error) {
      console.error("Error eliminando proveedor:", error);
      toast.error("Hubo un problema al eliminar el proveedor.");
    }
  };

  const createProveedorWithArticles = async (proveedorData, articulos) => {
    try {
      const res = await fetch(`${API_URL}/con-articulos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proveedor: proveedorData, articulos }),
      });

      const contentType = res.headers.get("content-type");
      const data = contentType?.includes("application/json")
        ? await res.json()
        : await res.text();

      if (!res.ok) {
        throw new Error(
          data?.error || "Error al crear proveedor con artículos"
        );
      }

      return data;
    } catch (error) {
      console.error("Error creando proveedor con artículos:", error);
      throw error;
    }
  };

  const activateProveedor = async (id, nombre) => {
    try {
      await editProveedor(id, { estado_logico: true }, [], [], true);
      toast.success(`Proveedor "${nombre}" activado con éxito.`);
      await refreshProveedores(true);
    } catch (error) {
      console.error("Error activando proveedor:", error);
      toast.error("Hubo un problema al activar el proveedor.");
    }
  };

  return (
    <ProveedorContext.Provider
      value={{
        proveedores,
        refreshProveedores,
        createProveedor,
        createProveedorWithArticles,
        editProveedor,
        removeProveedor,
        getProveedorByID,
        activateProveedor,
      }}
    >
      {children}
    </ProveedorContext.Provider>
  );
};

export const useProveedores = () => {
  const context = useContext(ProveedorContext);
  if (!context) {
    throw new Error(
      "useProveedores debe usarse dentro de un ProveedorProvider"
    );
  }
  return context;
};

export const useProveedor = (id) => {
  const { proveedores, getProveedorByID } = useProveedores();

  const proveedor = proveedores.find((p) => p.id_proveedor === id);

  const [remoteProveedor, setRemoteProveedor] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!proveedor && id) {
      setLoading(true);
      getProveedorByID(id).then((res) => {
        setRemoteProveedor(res);
        setLoading(false);
      });
    }
  }, [id, proveedor]);

  return {
    proveedor: proveedor || remoteProveedor,
    loading,
  };
};
