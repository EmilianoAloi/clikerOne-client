// utiles/useProveedores.js
import { useContext, useState, useEffect } from "react";
import { ProveedorContext } from "../contexts/ProveedorContext";

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
  }, [id, proveedor, getProveedorByID]);

  return {
    proveedor: proveedor || remoteProveedor,
    loading,
  };
};
