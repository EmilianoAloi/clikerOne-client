import BadgeEstado from "@/components/ui/badge-custom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BadgeInfo } from "lucide-react";
import { Link } from "react-router-dom";

const NDviewHeader = ({ notaDebito }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
      <Card className="col-span-2 border-none shadow-none md:border md:shadow-md px-0 md:px-4">
        <CardHeader className="px-0 ">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold leading-none px-0">
            <BadgeInfo className="w-5 h-5" />
            Información de la Nota de Débito
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 md:px-2">
          <div className="grid grid-cols-2 md:gap-8 max-w-full">
            <div className="flex flex-col ">
              <h3 className="font-semibold text-md text-muted-foreground">
                Proveedor
              </h3>
              <p className="font-semibold">
                {notaDebito.razon_social_proveedor}
              </p>
              <p className="text-sm">CUIT: {notaDebito.cuit_proveedor}</p>
              <p className="text-sm">
                {notaDebito.direccion_proveedor},{" "}
                {notaDebito.proveedor_provincia}
              </p>
              <Link
                to={`/proveedores/${notaDebito.id_proveedor}`}
                className="text-primary text-sm font-medium inline-block mt-2"
              >
                Ver detalles del proveedor →
              </Link>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div>
                  <h3 className="font-semibold text-md text-muted-foreground">
                    Número de ND
                  </h3>
                  <p>#{notaDebito.numero_factura}</p>
                </div>
                <div className="hidden md:block">
                  <h3 className="font-semibold text-md text-muted-foreground">
                    Estado
                  </h3>
                  <BadgeEstado
                    estado={(notaDebito.estado_saldo || "")
                      .toLowerCase()
                      .trim()}
                    className="mt-1"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-md text-muted-foreground">
                    Fecha de emisión
                  </h3>
                  <p>{formatDate(notaDebito.fecha_emision ?? "")}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-md text-muted-foreground">
                    Fecha Contable
                  </h3>
                  <p>{formatDate(notaDebito.fecha_contable ?? "")}</p>
                </div>
              </div>
              {notaDebito.condicion_venta && (
                <div className="mt-4">
                  <h3 className="font-semibold text-md text-muted-foreground">
                    Condición de venta
                  </h3>
                  <p className="text-md">{notaDebito.condicion_venta}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NDviewHeader;
