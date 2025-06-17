import { CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(amount);

const statusBadgeColor = {
  "pendiente de pago":
    "bg-red-100 text-red-800 print:bg-transparent print:border print:border-red-800",
  parcial:
    "bg-orange-100 text-orange-800 print:bg-transparent print:border print:border-orange-800",
  pagada:
    "bg-green-100 text-green-800 print:bg-transparent print:border print:border-green-800",
  vencida:
    "bg-red-100 text-red-800 print:bg-transparent print:border print:border-red-800",
  sobrada:
    "bg-blue-100 text-blue-800 print:bg-transparent print:border print:border-blue-800",
  en_discusion:
    "bg-purple-100 text-purple-800 print:bg-transparent print:border print:border-purple-800",
  anulada:
    "bg-gray-100 text-gray-800 print:bg-transparent print:border print:border-gray-800",
  con_nota_credito:
    "bg-sky-100 text-sky-800 print:bg-transparent print:border print:border-sky-800",
  retenida:
    "bg-indigo-100 text-indigo-800 print:bg-transparent print:border print:border-indigo-800",
  ejecutada:
    "bg-green-50 text-green-700 print:bg-transparent print:border print:border-green-700",
  "": "bg-muted text-muted-foreground print:bg-transparent print:border print:border-muted-foreground",
};

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
          <Badge
            className={statusBadgeColor[estadoKey] || statusBadgeColor[""]}
          >
            {notaDebito.estado_saldo
              ? notaDebito.estado_saldo[0].toUpperCase() +
                notaDebito.estado_saldo.slice(1)
              : "Pendiente"}
          </Badge>
        </div>
      </div>
    </CardHeader>
  );
};

export default NDviewTitle;
