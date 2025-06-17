import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  Fingerprint,
  Globe,
  Info,
  Boxes,
  UserCog,
  MapPin,
  Landmark,
  Percent,
  Calendar1,
  Pencil,
} from "lucide-react";

import ProveedorDetailItem from "./ProveedorDetailItem";
import { useProveedor } from "@/contexts/ProveedorContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ProveedorDeleteDialog from "./ProveedorDeleteDialog";
import { useProveedores } from "@/contexts/ProveedorContext";

const ProveedorDetailInfo = ({ proveedor }) => {
  const { proveedores = [], removeProveedor } = useProveedores() || {};

  // Busca el proveedor actualizado (si cambia en el contexto), si no, usa la prop
  const currentProveedor =
    proveedores.find((p) => p.id_proveedor === proveedor.id_proveedor) ||
    proveedor;

  if (!currentProveedor) {
    return <div className="p-6">Proveedor no encontrado.</div>;
  }

  const navigate = useNavigate();

  function esFechaMovimientoValida(fecha) {
    if (!fecha) return false;
    const lower = fecha.toLowerCase?.() || fecha;
    const fechasInvalidas = [
      "31/12/999",
      "9999-12-31",
      "0000-00-00",
      "null",
      "undefined",
    ];
    if (fechasInvalidas.includes(lower)) return false;
    const dateObj = new Date(fecha);
    return !isNaN(dateObj.getTime()) && dateObj.getFullYear() > 1900;
  }

  function mostrarIvaPredeterminado(iva) {
    if (iva === null || iva === undefined || iva === "" || isNaN(Number(iva))) {
      return "Sin datos";
    }
    return `${iva}%`;
  }

  function mostrarCampo(valor) {
    return valor !== null && valor !== undefined && String(valor).trim() !== ""
      ? valor
      : "Sin datos";
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <ProveedorDetailItem
          icon={UserCog}
          label="Nombre"
          value={currentProveedor.nombre}
        />
        <ProveedorDetailItem
          icon={User}
          label="Persona de Contacto"
          value={currentProveedor.contacto}
        />
        <ProveedorDetailItem
          icon={Phone}
          label="Teléfono"
          value={currentProveedor.telefono}
        />
        <ProveedorDetailItem
          icon={MapPin}
          label="Dirección"
          value={currentProveedor.direccion}
        />
        <ProveedorDetailItem
          icon={Globe}
          label="Sitio Web"
          value={currentProveedor.web}
        />
        <ProveedorDetailItem
          icon={Mail}
          label="Correo electrónico"
          value={currentProveedor.email}
        />
        <ProveedorDetailItem
          icon={Boxes}
          label="Artículos"
          value={
            Array.isArray(currentProveedor.articulos) &&
            currentProveedor.articulos.length > 0
              ? `${currentProveedor.articulos.length} artículo(s)`
              : "Sin Artículos"
          }
        />
        <ProveedorDetailItem
          icon={Landmark}
          label="Razón Social"
          value={currentProveedor.razon_social}
        />
        <ProveedorDetailItem
          icon={Fingerprint}
          label="CUIT"
          value={mostrarCampo(currentProveedor.cuit)}
        />
        <ProveedorDetailItem
          icon={Info}
          label="Condición IVA"
          value={currentProveedor.iva_condicion}
        />
        <ProveedorDetailItem
          icon={Percent}
          label="IVA predeterminado"
          value={mostrarIvaPredeterminado(currentProveedor.iva_predeterminado)}
        />
        <ProveedorDetailItem
          icon={Calendar1}
          label="Último movimiento"
          value={
            esFechaMovimientoValida(currentProveedor.fecha_ultimo_movimiento)
              ? new Date(
                  currentProveedor.fecha_ultimo_movimiento
                ).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "Sin movimientos"
          }
        />
      </div>

      <Separator className="mt-7 mb-4" />

      <div>
        <div className="w-full flex justify-between items-end">
          <div>
            <h3 className="text-lg font-medium ">Observaciones</h3>
            <p className="text-sm text-muted-foreground xl:max-w-xl break-words">
              {currentProveedor.observaciones}
            </p>
          </div>
          <div className="flex items-center  mb-[-6px]">
            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                navigate(`/proveedores/${currentProveedor.id_proveedor}/editar`)
              }
              className="text-sm cursor-pointer pe-0"
            >
              <Pencil className="w-4 h-4 " />
            </Button>

            <ProveedorDeleteDialog
              proveedor={currentProveedor}
              onDelete={() =>
                removeProveedor(
                  currentProveedor.id_proveedor,
                  currentProveedor.nombre || "Proveedor"
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProveedorDetailInfo;
