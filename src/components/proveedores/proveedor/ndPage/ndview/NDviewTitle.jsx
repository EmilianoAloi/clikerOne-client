import { CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BadgeEstado from "@/components/ui/badge-custom";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(amount);

const NDviewTitle = ({ notaDebito }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Normalizar key para el color
  const estadoKey = (notaDebito.estado_saldo || "").toLowerCase().trim();

  return (
    <CardHeader className="rounded-t-lg mb-4 mt-[-5rem] md:mt-0 px-0 md:px-2">
      <div className="flex md:flex-row justify-between items-start md:items-start w-full ">
        {/* Izquierda: icono, título y fechas */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold">
            Nota de Débito #{notaDebito.numero_factura}
          </div>
          <p className="text-md text-muted-foreground">
            Fecha contable: {formatDate(notaDebito.fecha_contable ?? "")}
          </p>
        </div>

        {/* Derecha: monto total y estado */}
        <div className="text-right ">
          <div className="text-4xl font-bold mb-2">
            {formatCurrency(notaDebito.monto_total || 0)}
          </div>
          <BadgeEstado estado={estadoKey} className="mt-1" />
        </div>
      </div>
    </CardHeader>
  );
};

export default NDviewTitle;
