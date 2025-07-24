import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const InvoiceEditTitle = () => {
  return (
    <>
      <CardHeader className=" rounded-t-lg border-b pt-4 mb-3">
        <CardTitle className="text-2xl font-semibold  flex justify-between">
          Modificar Factura
        </CardTitle>
        <CardDescription className="text-muted-foreground font-semibold">
          Modifique los datos de la factura y haga click en Guardar.
        </CardDescription>
      </CardHeader>
    </>
  );
};

export default InvoiceEditTitle;
