import BadgeEstado from "@/components/ui/badge-custom";
import { CardHeader } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const OCviewTitle = ({ orden }) => {
  function formatDate(dateInput) {
    if (!dateInput) return "-";
    // Si es Date, la pasamos a ISO; si es string ISO, la usamos tal cual
    const iso = dateInput instanceof Date ? dateInput.toISOString() : dateInput;
    // iso === "2025-07-24T00:00:00.000Z"
    const [year, month, day] = iso.split("T")[0].split("-");
    return `${day}/${month}/${year}`; // "24/07/2025"
  }

  return (
    <CardHeader className="rounded-t-lg mb-1 mt-[-5rem] md:mt-0 px-0 md:px-2">
      <div className="flex md:flex-row justify-between items-start md:items-start w-full">
        {/* Izquierda: icono, título y fechas */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold">
            Orden de Compra #{orden.id_orden_compra}
          </div>
          <p className="text-md text-muted-foreground">
            Fecha emisión: {formatDate(orden.fecha_emision)}
          </p>
        </div>

        {/* Derecha: monto total y estado */}
        <div className="text-right">
          <div className="text-4xl font-bold mb-2">
            {formatCurrency(orden.monto_total || 0)}
          </div>
          <BadgeEstado
            estado={orden.estado_compra}
            className="text-md px-2 py-4 px-3 font-semibold"
          />
        </div>
      </div>
    </CardHeader>
  );
};

export default OCviewTitle;
