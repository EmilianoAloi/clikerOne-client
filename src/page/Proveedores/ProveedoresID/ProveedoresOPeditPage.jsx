import React from "react";
import { useParams } from "react-router-dom";
import { useOPById } from "@/queries/proveedores/pagos/useOPById";
import ProveedoresOPeditContainer from "@/components/proveedores/proveedor/opPage/opedit/ProveedoresOPeditContainer";

export default function ProveedoresOPeditPage() {
  const { idOP } = useParams();
  const { data: pagoData, isLoading, error } = useOPById(idOP);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar la orden de pago</div>;

  return (
    <ProveedoresOPeditContainer
      modo="editar"
      proveedor={pagoData.proveedor}
      pagoData={pagoData}
    />
  );
}
