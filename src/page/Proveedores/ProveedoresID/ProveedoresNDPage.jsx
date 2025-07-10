// src/pages/ProveedoresNDPage.jsx
import { useParams } from "react-router-dom";
import ProveedorNDcontainer from "@/components/proveedores/proveedor/ndPage/ProveedorNDcontainer";
import { useProveedor } from "@/queries/proveedores/useProveedor";

export default function ProveedoresNDPage() {
  const { id } = useParams();

  if (!id || isNaN(Number(id))) {
    return <p>Error: ID de proveedor no válido</p>;
  }

  const { data: proveedor, isLoading, isError } = useProveedor(id);

  if (isLoading) return <p>Cargando proveedor...</p>;
  if (isError || !proveedor) return <p>Error: proveedor no encontrado</p>;

  return <ProveedorNDcontainer proveedor={proveedor} />;
}
