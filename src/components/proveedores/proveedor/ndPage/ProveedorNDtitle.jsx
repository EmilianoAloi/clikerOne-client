import BackButton from "@/components/ui/back-button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const ProveedorNDtitle = ({ nombreProveedor }) => {
  return (
    <CardHeader className="rounded-t-lg border-b pt-4 mb-7">
      <CardTitle className="text-2xl font-semibold flex justify-between">
        Crear Nota de Débito
        <BackButton />
      </CardTitle>
      <CardDescription className="text-muted-foreground font-semibold ">
        Creá una Nota de Débito para el proveedor: {nombreProveedor}
        <p className="text-muted-foreground font-semibold">
          Se registrará en su cuenta corriente y aumentará el saldo pendiente.
        </p>
      </CardDescription>
    </CardHeader>
  );
};

export default ProveedorNDtitle;
