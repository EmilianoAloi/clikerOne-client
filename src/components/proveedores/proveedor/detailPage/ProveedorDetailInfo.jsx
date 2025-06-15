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

import DetailItem from "./ProveedorDetailItem";
import { Proveedor } from "@/contexts/ProveedorContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ProveedoressDeleteDialog from "./ProveedorDeleteDialog";

const ProveedoresDetailInfo = ({ Proveedor }) => {
  const { Proveedor, removeProveedores } = Proveedor();
  const currentProveedores =
    Proveedor.find((s) => s.id_proveedor === Proveedor.id_proveedor) ||
    Proveedor;
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
        <DetailItem
          icon={UserCog}
          label="Nombre"
          value={currentProveedores.nombre}
        />
        <DetailItem
          icon={User}
          label="Persona de Contacto"
          value={currentProveedores.contacto}
        />
        <DetailItem
          icon={Phone}
          label="Teléfono"
          value={currentProveedores.telefono}
        />
        <DetailItem
          icon={MapPin}
          label="Dirección"
          value={currentProveedores.direccion}
        />
        <DetailItem
          icon={Globe}
          label="Sitio Web"
          value={currentProveedores.web}
        />
        <DetailItem
          icon={Mail}
          label="Correo electrónico"
          value={currentProveedores.email}
        />
        <DetailItem
          icon={Boxes}
          label="Artículos"
          value={
            Array.isArray(currentProveedores.articulos) &&
            currentProveedores.articulos.length > 0
              ? `${currentProveedores.articulos.length} artículo(s)`
              : "Sin Artículos"
          }
        />
        <DetailItem
          icon={Landmark}
          label="Razón Social"
          value={currentProveedores.razon_social}
        />
        <DetailItem
          icon={Fingerprint}
          label="CUIT"
          value={mostrarCampo(currentProveedores.cuit)}
        />
        <DetailItem
          icon={Info}
          label="Condición IVA"
          value={currentProveedores.iva_condicion}
        />
        <DetailItem
          icon={Percent}
          label="IVA predeterminado"
          value={mostrarIvaPredeterminado(
            currentProveedores.iva_predeterminado
          )}
        />
        <DetailItem
          icon={Calendar1}
          label="Último movimiento"
          value={
            esFechaMovimientoValida(currentProveedores.fecha_ultimo_movimiento)
              ? new Date(
                  currentProveedores.fecha_ultimo_movimiento
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

      <div className="">
        <div className="w-full flex justify-between items-end">
          <div>
            <h3 className="text-lg font-medium ">Observaciones</h3>
            <p className="text-sm text-muted-foreground xl:max-w-xl break-words">
              {currentProveedores.observaciones}
            </p>
          </div>
          <div className="flex items-center  mb-[-6px]">
            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                navigate(
                  `/proveedores/${currentProveedores.id_proveedor}/editar`
                )
              }
              className="text-sm cursor-pointer pe-0"
            >
              <Pencil className="w-4 h-4 " />
            </Button>

            <ProveedoressDeleteDialog
              Proveedor={currentProveedores}
              onDelete={() =>
                removeProveedores(
                  currentProveedores.id_proveedor,
                  currentProveedores.nombre || "Proveedor"
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProveedoresDetailInfo;
