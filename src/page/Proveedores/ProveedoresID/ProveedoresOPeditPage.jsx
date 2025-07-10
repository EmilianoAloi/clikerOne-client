import ProveedoresOPeditContainer from "@/components/proveedores/proveedor/opPage/opedit/ProveedoresOPeditContainer";
import { useProveedores } from "@/queries/proveedores/useProveedores";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProveedoresOPeditPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id, idOP } = useParams();
  const { data: proveedores } = useProveedores();
  const [proveedor, setProveedor] = useState(null);
  const [pagoData, setPagoData] = useState(null);
  const [loading, setLoading] = useState(true);
  // Buscar proveedor
  useEffect(() => {
    if (!id) return;
    const found = proveedores?.find(
      (p) => String(p.id_proveedor) === String(id)
    );
    if (found) {
      setProveedor(found);
    } else {
      // Fetch si no está en contexto
      fetch(`${API_URL}/api/proveedores/${id}`)
        .then((res) => res.json())
        .then((data) => setProveedor(data));
    }
  }, [id, proveedores, API_URL]);

  // Buscar datos del pago
  useEffect(() => {
    if (!idOP) return;
    setLoading(true);
    fetch(`${API_URL}/api/proveedores/pagos/${idOP}`)
      .then((res) => res.json())
      .then((data) => setPagoData(data))
      .finally(() => setLoading(false));
  }, [idOP, API_URL]);

  if (loading || !proveedor || !pagoData) return <div>Cargando...</div>;

  return (
    <ProveedoresOPeditContainer
      pagoData={pagoData}
      proveedor={proveedor}
      modo="editar"
    />
  );
};

export default ProveedoresOPeditPage;
