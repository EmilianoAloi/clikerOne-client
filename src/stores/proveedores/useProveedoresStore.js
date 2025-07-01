import { create } from "zustand";

// Definimos la URL base de la API de proveedores (ajusta el import.meta si usás otra forma)
const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores`;

// Función para enriquecer proveedor
const enrichProveedor = (p) => {
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
};

export const useProveedoresStore = create((set, get) => ({
  // ---- ESTADOS ----
  proveedores: [], // Lista de proveedores cargados en memoria
  isLoaded: false, // Indica si ya se cargaron los proveedores para evitar recargas

  // ---- ACCIONES ----

  /**
   * Refresca la lista de proveedores desde la API.
   * Si se pasa 'updatedProveedor', solo actualiza ese proveedor en la lista.
   * Si 'force' es true, fuerza la recarga aunque ya esté cargado.
   */
  refreshProveedores: async (force = false, updatedProveedor = null) => {
    const { isLoaded } = get();
    if (isLoaded && !force) return;

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al obtener proveedores");
      const data = await response.json();

      if (updatedProveedor) {
        // Si hay proveedor actualizado, enriquecelo y reemplazalo solo a él
        const enriched = enrichProveedor(updatedProveedor);
        set((state) => ({
          proveedores: state.proveedores.map((p) =>
            p.id_proveedor === enriched.id_proveedor ? enriched : p
          ),
        }));
      } else {
        // Si traés toda la lista
        const enrichedList = data.map(enrichProveedor);
        set({ proveedores: enrichedList, isLoaded: true });
      }
    } catch (error) {
      console.error("Error al obtener los proveedores:", error);
    }
  },

  /**
   * Agrega un proveedor nuevo a la lista de proveedores en memoria.
   */
  addProveedorToList: (proveedor) =>
    set((state) => ({
      proveedores: [...state.proveedores, enrichProveedor(proveedor)],
    })),

  /**
   * Devuelve un proveedor por ID, buscando primero en el store.
   * Si no está, lo busca en la API y lo agrega/reemplaza.
   */
  getProveedorByID: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error("Proveedor no encontrado");
      const data = await response.json();
      const enriched = enrichProveedor(data);

      set((state) => {
        const exists = state.proveedores.some(
          (p) => p.id_proveedor === enriched.id_proveedor
        );
        return {
          proveedores: exists
            ? state.proveedores.map((p) =>
                p.id_proveedor === enriched.id_proveedor ? enriched : p
              )
            : [...state.proveedores, enriched],
        };
      });

      return enriched;
    } catch (error) {
      console.error("Error al obtener proveedor por ID:", error);
      return null;
    }
  },

  /**
   * Crea un proveedor nuevo junto con sus artículos asociados.
   * Lanza error si el CUIT está duplicado.
   */
  createProveedorWithArticles: async (proveedorData, articulos) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proveedor: proveedorData, articulos }),
      });

      // Maneja respuesta en texto o JSON según el header
      const contentType = res.headers.get("content-type");
      const data = contentType?.includes("application/json")
        ? await res.json()
        : await res.text();

      if (!res.ok) {
        if (
          data?.error &&
          data.error.includes("Ya existe un proveedor con ese CUIT")
        ) {
          throw new Error("Ya existe un proveedor con ese CUIT");
        }
        throw new Error(
          data?.error || "Error al crear proveedor con artículos"
        );
      }
      get().addProveedorToList(data);
      return data;
    } catch (error) {
      console.error("Error creando proveedor con artículos:", error);
      throw error;
    }
  },

  /**
   * Edita un proveedor (y opcionalmente sus artículos y artículos eliminados).
   * Si onlyBasicInfo=true, solo actualiza la info básica.
   * Actualiza el proveedor solo en el array.
   */
  // Al editar
  editProveedor: async (
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
        return { error: errorData.error || "Error al actualizar proveedor." };
      }

      // 👇 El backend responde el proveedor completo y actualizado
      const updatedProveedor = await response.json();
      const enriched = enrichProveedor(updatedProveedor);

      set((state) => ({
        proveedores: state.proveedores.map((p) =>
          p.id_proveedor === enriched.id_proveedor ? enriched : p
        ),
      }));

      return { success: true };
    } catch (error) {
      console.error("Error editando proveedor:", error);
      return { error: "Hubo un problema al actualizar el proveedor." };
    }
  },

  /**
   * Elimina (lógicamente) un proveedor por ID.
   * Luego refresca la lista.
   */
  removeProveedor: async (id, nombre) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const errorData = await response.json();
        return;
      }
      await get().refreshProveedores(true);
    } catch (error) {
      console.error("Error eliminando proveedor:", error);
    }
  },

  /**
   * Activa lógicamente un proveedor.
   * Hace un update básico y refresca la lista.
   */
  activateProveedor: async (id, nombre) => {
    try {
      await get().editProveedor(id, { estado_logico: true }, [], [], true);
      await get().refreshProveedores(true);
    } catch (error) {
      console.error("Error activando proveedor:", error);
    }
  },
}));
