// src/components/proveedores/proveedor/ndPage/ProveedorNDbuttons.jsx
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2, Save } from "lucide-react";

const ProveedorNDbuttons = ({
  isSubmitting = false,
  onSubmit,
  idProveedor,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-end gap-3 mb-0">
      <Button
        variant="outline"
        type="button"
        onClick={() => navigate(`/proveedores/${idProveedor}`)}
        className="text-slate-700 cursor-pointer font-semibold py-5"
      >
        Cancelar
      </Button>

      <Button
        type="button"
        onClick={onSubmit}
        className="bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold rounded-sm cursor-pointer py-5"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Guardando...
          </>
        ) : (
          <>
            <Save className="h-4 w-4 mr-1" />
            Guardar Nota de débito
          </>
        )}
      </Button>
    </div>
  );
};

export default ProveedorNDbuttons;
