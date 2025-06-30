import BackButton from "@/components/ui/back-button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const HistorialPreciosTitle = () => {
  return (
    <>
      <CardHeader className="rounded-t-lg  pt-4">
        <CardTitle className="text-3xl font-bold flex justify-between">
          Historial de Precios
          <BackButton />
        </CardTitle>
        <CardDescription className="text-muted-foreground font-semibold">
          Seguimiento detallado de cambios en precios de articulos.
        </CardDescription>
      </CardHeader>
    </>
  );
};

export default HistorialPreciosTitle;
