import BackButton from "@/components/ui/back-button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const HistorialPreciosTitle = () => {
  return (
    <>
      <CardHeader className="rounded-t-lg  pt-4">
        <CardTitle className="text-2xl font-semibold flex justify-between">
          Historial de Precios
          <BackButton />
        </CardTitle>
        <CardDescription className="text-muted-foreground font-semibold">
          Seguimiento de cambios de precios de artículos de proveedor.
        </CardDescription>
      </CardHeader>
    </>
  );
};

export default HistorialPreciosTitle;
