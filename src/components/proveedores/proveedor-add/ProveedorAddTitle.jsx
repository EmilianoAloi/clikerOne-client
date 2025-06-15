import BackButton from "@/components/ui/back-button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const ProveedorAddTitle = () => {
  return (
    <>
      <CardHeader className=" rounded-t-lg border-b pt-4 mb-3">
        <CardTitle className="text-2xl font-semibold  flex justify-between">
          Agregar proveedor
          <BackButton />
        </CardTitle>
        <CardDescription className="text-muted-foreground font-semibold">
          Completá los datos del proveedor y hacé click en Guardar Proveedor.
        </CardDescription>
      </CardHeader>
    </>
  );
};

export default ProveedorAddTitle;
