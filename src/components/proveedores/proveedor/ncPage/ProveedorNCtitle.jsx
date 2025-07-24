import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ProveedorNCtitle({ nombreProveedor }) {
  return (
    <CardHeader className="rounded-t-lg border-b pt-4 mb-7">
      <CardTitle className="text-2xl font-semibold flex justify-between">
        Crear Nota de Crédito
      </CardTitle>
      <CardDescription className="text-muted-foreground font-semibold">
        Creá una Nota de crédito para el proveedor: {nombreProveedor}
        <p className="text-muted-foreground font-semibold">
          Se registrará en su cuenta corriente y reducirá el saldo pendiente.
        </p>
      </CardDescription>
    </CardHeader>
  );
}
