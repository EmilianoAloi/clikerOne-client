import BackButton from "@/components/ui/back-button";

const HistorialPreciosGlobalTitle = () => (
  <div className="mx-7 my-4 flex justify-between items-start">
    <div>
      <div className="flex items-center gap-3 ">
        <h1 className="text-2xl font-bold text-gray-900">
          Historial Global de Precios
        </h1>
      </div>

      <div className="text-sm text-gray-500 ">
        Gestión de cambios de precios de todos los proveedores y artículos
      </div>
    </div>
    <BackButton />
  </div>
);

export default HistorialPreciosGlobalTitle;
