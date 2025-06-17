import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProveedorInvoiceActions({
  modo = "crear",
  isSubmitting,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-end gap-3 pt-4 mb-10">
      {/* Cancelar */}
      <Button
        variant="outline"
        type="button"
        onClick={() => navigate(-1)}
        className="text-slate-700 cursor-pointer font-semibold py-5"
      >
        Cancelar
      </Button>

      {/* Guardar */}
      <Button
        type="submit"
        className="bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold rounded-sm cursor-pointer py-5 flex items-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            {modo === "editar" ? "Modificando..." : "Guardando..."}
          </>
        ) : (
          <>
            <Save className="h-4 w-4 mr-2" />
            {modo === "editar" ? "Modificar Factura" : "Guardar Factura"}
          </>
        )}
      </Button>
    </div>
  );
}
