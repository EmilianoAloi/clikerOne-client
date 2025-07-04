import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";

export default function PagosBadgePopover({ pagos = [] }) {
  if (!pagos || pagos.length === 0) {
    return (
      <span className="text-xs text-muted-foreground italic">Sin pagos</span>
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
          <DollarSign className="h-3 w-3" />
          <span>
            {pagos.length} pago{pagos.length > 1 ? "s" : ""}
          </span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="end"
        className="min-w-[600px] p-0 overflow-hidden shadow-lg border rounded-lg"
      >
        <div className="bg-muted/100 px-4 py-3 border-b">
          <h4 className="font-medium text-sm">Pagos asociados</h4>
          <p className="text-xs text-muted-foreground">
            {pagos.length} pago{pagos.length > 1 ? "s" : ""} registrado
          </p>
        </div>

        {/* Encabezado tipo tabla */}
        <div className="grid grid-cols-4 gap-2 px-4 py-2 bg-muted/20 border-b text-xs font-medium text-muted-foreground">
          <div>Número</div>
          <div>Medio</div>
          <div>F. Acreditación</div>
          <div className="text-right">Monto</div>
        </div>

        <div className="max-h-[300px] overflow-y-auto">
          {pagos.map((pago, idx) => (
            <div
              key={pago.id_pago_item || idx}
              className="grid grid-cols-4 gap-2 w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors border-b border-muted/30 last:border-b-0 group"
            >
              {/* Número */}
              <div className="text-sm font-medium truncate">
                {pago.numero_comprobante || pago.numero || "-"}
              </div>

              {/* Medio */}
              <div className="text-sm truncate">{pago.medio || "-"}</div>

              {/* Fecha */}
              <div className="text-sm">
                {pago.fecha_acreditacion
                  ? new Date(pago.fecha_acreditacion).toLocaleDateString(
                      "es-AR"
                    )
                  : "-"}
              </div>

              {/* Monto */}
              <div className="text-right text-sm font-medium">
                {typeof pago.monto_aplicado !== "undefined" &&
                !isNaN(Number(pago.monto_aplicado))
                  ? `$${Number(pago.monto_aplicado).toLocaleString("es-AR", {
                      minimumFractionDigits: 2,
                    })}`
                  : "-"}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
