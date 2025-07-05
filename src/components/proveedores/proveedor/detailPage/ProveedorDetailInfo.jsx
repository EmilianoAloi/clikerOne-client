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
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRemoveProveedor } from "@/queries/proveedores/useRemoveProveedor";
import ProveedoresDeleteDialog from "./ProveedorDeleteDialog";

const ProveedorDetailInfo = ({ proveedor }) => {
  const removeProveedor = useRemoveProveedor();
  const navigate = useNavigate();

  if (!proveedor) {
    return <div className="p-6">Proveedor no encontrado.</div>;
  }
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
          value={proveedor.nombre}
        />
        <ProveedorDetailItem
          icon={User}
          label="Persona de Contacto"
          value={proveedor.contacto}
        />
        <ProveedorDetailItem
          icon={Phone}
          label="Teléfono"
          value={proveedor.telefono}
        />
        <ProveedorDetailItem
          icon={MapPin}
          label="Dirección"
          value={proveedor.direccion}
        />
        <ProveedorDetailItem
          icon={Globe}
          label="Sitio Web"
          value={proveedor.web}
        />
        <ProveedorDetailItem
          icon={Mail}
          label="Correo electrónico"
          value={proveedor.email}
        />
        <ProveedorDetailItem
          icon={Boxes}
          label="Artículos"
          value={
            Array.isArray(proveedor.articulos) && proveedor.articulos.length > 0
              ? `${proveedor.articulos.length} artículo(s)`
              : "Sin Artículos"
          }
        />
        <ProveedorDetailItem
          icon={Landmark}
          label="Razón Social"
          value={proveedor.razon_social}
        />
        <ProveedorDetailItem
          icon={Fingerprint}
          label="CUIT"
          value={mostrarCampo(proveedor.cuit)}
        />
        <ProveedorDetailItem
          icon={Info}
          label="Condición IVA"
          value={proveedor.iva_condicion}
        />
        <ProveedorDetailItem
          icon={Percent}
          label="IVA predeterminado"
          value={mostrarIvaPredeterminado(proveedor.iva_predeterminado)}
        />
        <ProveedorDetailItem
          icon={Calendar1}
          label="Último movimiento"
          value={
            esFechaMovimientoValida(proveedor.fecha_ultimo_movimiento)
              ? new Date(proveedor.fecha_ultimo_movimiento).toLocaleDateString(
                  "es-AR",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }
                )
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
              {proveedor.observaciones}
            </p>
          </div>
          <div className="flex items-center  mb-[-6px]">
            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                navigate(`/proveedores/${proveedor.id_proveedor}/editar`)
              }
              className="text-sm cursor-pointer pe-0"
            >
              <Pencil className="w-4 h-4 " />
            </Button>

            {/* Si tu lógica de borrar proveedor sigue en Context, 
                pasale por prop un onDelete que haga el removeProveedor */}
            <ProveedoresDeleteDialog
              proveedor={proveedor}
              onDelete={() =>
                removeProveedor.mutate(proveedor.id_proveedor, {
                  onSuccess: () => navigate("/proveedores"),
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProveedorDetailInfo;
