import BadgeEstado from "@/components/ui/badge-custom";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return format(new Date(dateStr), "dd/MM/yyyy", { locale: es });
};

export default function OPviewHeader({ pago }) {
  const estadoKey = (pago.estado_pago || "ejecutada").toLowerCase().trim();

  return (
    <div className="mt-[-45px] md:mt-0 md:bg-muted/80 px-6 py-10 border-x md:border-b ">
      <div className="flex  md:flex-row justify-between items-center md:items-start gap-4">
        {/* Izquierda: razón social y CUIT */}
        <div>
          <h2 className="text-5xl  md:font-medium md:text-6xl ">
            {pago.proveedor_razon_social}
          </h2>
          <p className="text-sm text-muted-foreground ">
            CUIT: {pago.proveedor_cuit}
          </p>
        </div>

        {/* Derecha: estado y fechas */}
        <div className="flex flex-col items-start md:items-end gap-1 text-sm">
          <div className="flex items-center gap-2 pt-[35px] pd:mt-0">
            <span className="text-muted-foreground">Estado:</span>
            <BadgeEstado estado={estadoKey} className="mt-0" />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-semibold">
              Fecha de Ejecución:
            </span>
            <span className="font-semibold ">
              {formatDate(pago.fecha_creada)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-semibold">
              Fecha de pago:
            </span>
            <span className="font-semibold ">
              {formatDate(pago.fecha_creada)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
