import { Button } from "@/components/ui/button";
import { Package, Plus } from "lucide-react";

const ProveedorArticleEmpty = ({ onAgregarArticulo }) => {
  return (
    <div className="w-full p-2 ">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <div className="bg-gray-50 p-4 rounded-full">
          <Package className="h-12 w-12 text-gray-400" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            No hay artículos agregados
          </h3>
          <p className="text-gray-500 max-w-md font-semibold">
            Comenzá a agregar artículos a este proveedor para gestionar tu
            inventario de manera eficiente.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onAgregarArticulo}
            className="font-semibold cursor-pointer flex items-center border-slate-300 text-slate-700 hover:bg-slate-100"
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar artículo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProveedorArticleEmpty;
