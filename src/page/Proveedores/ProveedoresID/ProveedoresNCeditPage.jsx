import { useParams } from "react-router-dom";
import NCeditContainer from "@/components/proveedores/proveedor/ncPage/ncedit/NCeditContainer";
import { useProveedores } from "@/queries/proveedores/useProveedores";
import { useFacturaById } from "@/queries/proveedores/factura/useFacturaById";

export default function ProveedoresNCeditPage() {
  const { id, idNC } = useParams();

  // Traé todos los proveedores (puede usarse para buscar uno por ID)
  const {
    data: proveedores,
    isLoading: loadingProveedores,
    error: errorProveedores,
  } = useProveedores();

  // Traé la nota de crédito individual (por id)
  const {
    data: notaCredito,
    isLoading: loadingNC,
    error: errorNC,
  } = useFacturaById(idNC);

  // Buscar proveedor correspondiente
  const proveedor = proveedores?.find(
    (p) => String(p.id_proveedor) === String(id)
  );

  // Mostrar estados
  if (loadingProveedores || loadingNC) return <div>Cargando...</div>;
  if (errorProveedores)
    return (
      <div>
        Error al cargar proveedores:{" "}
        {errorProveedores.message || errorProveedores}
      </div>
    );
  if (errorNC)
    return (
      <div>
        Error al cargar la nota de crédito: {errorNC.message || errorNC}
      </div>
    );
  if (!proveedor || !notaCredito) return <div>Datos no encontrados</div>;

  // Formatear fechas (si querés seguir formateando antes de pasar a props)
  const formatFecha = (f) => f && f.split("T")[0];
  [
    "fecha_emision",
    "fecha_vencimiento",
    "fecha_contable",
    "fecha_acreditacion",
  ].forEach((campo) => {
    if (notaCredito[campo])
      notaCredito[campo] = formatFecha(notaCredito[campo]);
  });

  return <NCeditContainer proveedor={proveedor} notaCredito={notaCredito} />;
}
