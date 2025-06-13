import BackButton from "@/components/ui/back-button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const SupplierEditTitle = () => {
  return (
    <>
      <CardHeader className=" rounded-t-lg border-b pt-4 mb-3">
        <CardTitle className="text-2xl font-semibold  flex justify-between">
          Modificar Proveedor
          <BackButton />
        </CardTitle>
        <CardDescription className="text-muted-foreground font-semibold">
          Modificá los datos del proveedor y hacé click en Modificar Proveedor.
        </CardDescription>
      </CardHeader>
    </>
  );
};

export default SupplierEditTitle;
