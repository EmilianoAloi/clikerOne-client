import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SupplierOCTitle({ isEditar }) {
  return (
    <CardHeader className="rounded-t-lg border-b pt-4 mb-7">
      <CardTitle className="text-2xl font-semibold flex justify-between">
        {isEditar ? "Editar Orden de Compra" : "Cargar Orden de Compra"}
      </CardTitle>
      <CardDescription className="text-muted-foreground font-semibold">
        {isEditar
          ? "Modificá los datos de la orden de compra seleccionada."
          : "Ingresá artículos a comprar, precio pactado, fecha de entrega, condición de pago y lugar de entrega."}
      </CardDescription>
    </CardHeader>
  );
}
