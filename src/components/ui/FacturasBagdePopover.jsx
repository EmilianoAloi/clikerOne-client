import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FacturasBadgePopover({ facturas = [] }) {
  const navigate = useNavigate();

  if (!facturas || facturas.length === 0) {
    return (
      <span className="text-xs text-muted-foreground italic">Sin facturas</span>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant="outline"
          className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors text-xs flex items-center gap-1 px-2 py-1"
          onClick={(e) => e.stopPropagation()}
        >
          <Receipt className="h-3 w-3" />
          <span>
            {facturas.length} factura{facturas.length > 1 ? "s" : ""}
          </span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="end"
        className="min-w-[700px] p-0 overflow-hidden shadow-lg border rounded-lg "
      >
        <div className="bg-muted/100 px-4 py-3 border-b">
          <h4 className="font-medium text-sm">Facturas vinculadas</h4>
          <p className="text-xs text-muted-foreground">
            {facturas.length} factura{facturas.length > 1 ? "s" : ""} disponible
            {facturas.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Encabezado tipo tabla */}
        <div className="grid grid-cols-6 gap-2 px-4 py-2 bg-muted/20 border-b text-xs font-medium text-muted-foreground">
          <div>Número</div>
          <div>Proveedor</div>
          <div>F. Emisión</div>
          <div>F. Vencimiento</div>
          <div className="text-right">Monto</div>
          <div className="text-right">Estado</div>
        </div>

        <div className="max-h-[300px] overflow-y-auto">
          {facturas.map((factura, idx) => (
            <button
              key={factura.id_factura || idx}
              className="grid grid-cols-6 gap-2 w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors border-b border-muted/30 last:border-b-0 group cursor-pointer"
              title={`Ver factura ${factura.numero_factura}`}
              onClick={(e) => {
                e.stopPropagation();
                navigate(
                  `/proveedores/${factura.id_proveedor}/facturacion/${factura.id_factura}`
                );
              }}
            >
              {/* Número */}
              <div className="flex items-center">
                <span className="text-primary flex-shrink-0">#</span>
                <span className="truncate text-sm font-medium ">
                  {factura.numero_factura}
                </span>
              </div>

              {/* Proveedor */}
              <div className="text-sm truncate">
                {factura.proveedor_nombre || "-"}
              </div>

              {/* Fecha emisión */}
              <div className="text-sm">
                {factura.fecha_emision
                  ? new Date(factura.fecha_emision).toLocaleDateString("es-AR")
                  : "-"}
              </div>

              {/* Fecha vencimiento */}
              <div className="text-sm">
                {factura.fecha_vencimiento
                  ? new Date(factura.fecha_vencimiento).toLocaleDateString(
                      "es-AR"
                    )
                  : "-"}
              </div>

              {/* Monto */}
              <div className="text-right text-sm font-medium">
                $
                {Number(factura.monto_total).toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                })}
              </div>

              {/* Estado */}
              <div className="text-right">
                <span
                  className={`text-xs font-semibold ${
                    factura.estado === "pagada"
                      ? "text-green-600"
                      : factura.estado === "parcial"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {factura.estado}
                </span>
              </div>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
