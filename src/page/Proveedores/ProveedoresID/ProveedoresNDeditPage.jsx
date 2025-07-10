import { useParams } from "react-router-dom";
import NDeditContainer from "@/components/proveedores/proveedor/ndPage/ndedit/NDeditContainer";
import { useProveedores } from "@/queries/proveedores/useProveedores";
import { useFacturaById } from "@/queries/proveedores/factura/useFacturaById";

export default function ProveedoresNDeditPage() {
  const { id, idND } = useParams();

  // Proveedores (React Query)
  const {
    data: proveedores,
    isLoading: loadingProveedores,
    error: errorProveedores,
  } = useProveedores();

  // Nota de débito (React Query)
  const {
    data: notaDebito,
    isLoading: loadingND,
    error: errorND,
  } = useFacturaById(idND);

  // Buscar proveedor por id
  const proveedor = proveedores?.find(
    (p) => String(p.id_proveedor) === String(id)
  );

  // States de carga y error
  if (loadingProveedores || loadingND) return <div>Cargando...</div>;
  if (errorProveedores)
    return (
      <div>
        Error al cargar proveedores:{" "}
        {errorProveedores.message || errorProveedores}
      </div>
    );
  if (errorND)
    return (
      <div>Error al cargar la nota de débito: {errorND.message || errorND}</div>
    );
  if (!proveedor || !notaDebito) return <div>Datos no encontrados</div>;

  // Formatear fechas para input tipo date
  [
    "fecha_emision",
    "fecha_vencimiento",
    "fecha_contable",
    "fecha_acreditacion",
  ].forEach((campo) => {
    if (notaDebito[campo]) notaDebito[campo] = notaDebito[campo].split("T")[0];
  });

  return <NDeditContainer proveedor={proveedor} notaDebito={notaDebito} />;
}
