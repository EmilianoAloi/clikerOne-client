import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const NDeditTitle = ({ nombreProveedor }) => {
  return (
    <CardHeader className="rounded-t-lg border-b pt-4 mb-7">
      <CardTitle className="text-2xl font-semibold flex justify-between">
        Editar Nota de Débito
      </CardTitle>
      <CardDescription className="text-muted-foreground font-semibold ">
        Modifique la Nota de débito para el proveedor: {nombreProveedor}
        <p className="text-muted-foreground font-semibold">
          Se registrará en su cuenta corriente y aumentará el saldo pendiente.
        </p>
      </CardDescription>
    </CardHeader>
  );
};

export default NDeditTitle;
