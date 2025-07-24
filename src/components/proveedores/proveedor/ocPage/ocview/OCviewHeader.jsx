import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, FileText } from "lucide-react";
import BadgeEstado from "@/components/ui/badge-custom";
import { Link } from "react-router-dom";

function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const OCviewHeader = ({ orden }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 ">
      {/* Información general OC */}
      <Card className="col-span-2  shadow md:border md:shadow-md px-0 md:px-4">
        <CardHeader className="px-0 ">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold leading-none px-0">
            <BadgeInfo className="w-5 h-5" />
            Información de Orden de compra
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 md:px-2">
          <div className="grid grid-cols-2 md:gap-8 max-w-full">
            <div className="flex flex-col">
              <h3 className="font-semibold text-md text-muted-foreground ">
                Proveedor
              </h3>
              <p className="font-semibold">{orden.proveedor?.nombre}</p>
              <p className="text-sm">CUIT: {orden.proveedor?.cuit}</p>

              <Link
                to={`/proveedores/${orden.id_proveedor}`}
                className="hidden md:block text-primary text-sm font-medium  mt-2"
              >
                Ver detalles del proveedor →
              </Link>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div>
                  <h3 className="font-semibold text-md text-muted-foreground ">
                    Estado
                  </h3>
                  <BadgeEstado estado={orden.estado_compra} />
                </div>
                <div>
                  <h3 className="font-semibold text-md text-muted-foreground ">
                    Condición de pago
                  </h3>
                  <p className="text-md">{orden.condicion_pago}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-md text-muted-foreground ">
                    Fecha emisión
                  </h3>
                  <p>{formatDate(orden.fecha_emision)}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-md text-muted-foreground ">
                    Fecha entrega
                  </h3>
                  <p>{formatDate(orden.fecha_entrega)}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-md text-muted-foreground ">
                    Lugar de entrega
                  </h3>
                  <p className="text-md">{orden.lugar_entrega}</p>
                </div>
                {/* <div>
                  <h3 className="font-semibold text-md text-muted-foreground ">
                    Fecha contable
                  </h3>
                  <p>{formatDate(orden.fecha_contable)}</p>
                </div> */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumen de montos */}
      <Card className="hidden md:block md:border md:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <FileText className="w-5 h-5" />
            Resumen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span>
                {orden.subtotal !== undefined
                  ? `$${Number(orden.subtotal).toLocaleString("es-AR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Descuento aplicado:</span>
              <span>
                {orden.descuento_aplicado !== undefined
                  ? `$${Number(orden.descuento_aplicado).toLocaleString(
                      "es-AR",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}`
                  : "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">IVA:</span>
              <span>
                {orden.iva_total !== undefined
                  ? `$${Number(orden.iva_total).toLocaleString("es-AR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Forma de pago:</span>
              <span>{orden.condicion_pago}</span>
            </div>
          </div>
          <Separator className="mt-2 mb-2" />
          <div className="flex justify-between font-bold  text-base">
            <span>Total:</span>
            <span>
              {orden.monto_total !== undefined
                ? `$${Number(orden.monto_total).toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                : "-"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OCviewHeader;
