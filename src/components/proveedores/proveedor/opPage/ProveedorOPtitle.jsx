import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ProveedorOPtitle({ modo }) {
  const isEditar = modo === "editar";

  return (
    <CardHeader className="rounded-t-lg border-b pt-4 mb-7">
      <CardTitle className="text-2xl font-semibold flex justify-between">
        {isEditar ? "Editar Orden de Pago" : "Crear Orden de Pago"}
      </CardTitle>
      <CardDescription className="text-muted-foreground font-semibold">
        {isEditar
          ? "Modificá los datos de la orden de pago seleccionada."
          : "Registrá las órdenes de pago asignándolas a facturas de proveedores."}
      </CardDescription>
    </CardHeader>
  );
}
