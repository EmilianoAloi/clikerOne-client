import BackButton from "@/components/ui/back-button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ProveedorInvoiceTitle() {
  return (
    <CardHeader className="rounded-t-lg border-b pt-4 mb-7">
      <CardTitle className="text-2xl font-semibold flex justify-between">
        Cargar Factura
        <BackButton />
      </CardTitle>
      <CardDescription className="text-muted-foreground font-semibold">
        Registrá facturas de proveedores incluyendo ítems, fechas, condición de
        venta y archivo adjunto.
      </CardDescription>
    </CardHeader>
  );
}
