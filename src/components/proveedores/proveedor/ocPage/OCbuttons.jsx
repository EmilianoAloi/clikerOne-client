import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2, Save } from "lucide-react";

export default function OCbuttons({
  isSubmitting = false,
  modo = "nuevo",
  idProveedor,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-end gap-3 pt-4 mb-0 px-6">
      {/* Cancelar */}
      <Button
        variant="outline"
        type="button"
        onClick={() => navigate(`/proveedores/${idProveedor}`)}
        className="text-slate-700 cursor-pointer font-semibold py-5"
        tabIndex={-1}
      >
        Cancelar
      </Button>

      {/* Guardar */}
      <Button
        type="submit"
        className="bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold rounded-sm cursor-pointer py-5"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            {modo === "editar" ? "Modificando..." : "Guardando..."}
          </>
        ) : (
          <>
            <Save className="h-4 w-4 mr-1" />
            {modo === "editar" ? "Modificar OC" : "Guardar OC"}
          </>
        )}
      </Button>
    </div>
  );
}
