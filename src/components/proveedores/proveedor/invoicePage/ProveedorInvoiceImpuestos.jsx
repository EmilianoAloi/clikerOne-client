import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Trash2,
  Plus,
  Receipt,
  FileText,
  CircleDollarSign,
} from "lucide-react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export default function ProveedorInvoiceImpuestos({ inputStyle = "" }) {
  const { control, watch } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "impuestos",
  });

  const impuestos = watch("impuestos") || [];
  const initialized = useRef(false);

  // Inicializa con una fila vacía
  useEffect(() => {
    if (!initialized.current && fields.length === 0) {
      append({ detalle: "", importe: "" });
      initialized.current = true;
    }
  }, []);

  // Total de importes
  const totalImpuestos = impuestos.reduce(
    (acc, imp) => acc + (parseFloat(imp.importe) || 0),
    0
  );

  const handleRemoveImpuesto = (idx) => {
    if (fields.length === 1) {
      update(idx, { detalle: "", importe: "" });
    } else {
      remove(idx);
    }
  };

  return (
    <div className="space-y-2">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Receipt className="h-5 w-5 text-slate-600" />
          Otros Impuestos
        </h3>
        <Button
          type="button"
          variant="outline"
          className="font-semibold flex items-center border-slate-300 text-slate-700 hover:bg-slate-100"
          onClick={() => append({ detalle: "", importe: "" })}
        >
          <Plus className="w-4 h-4 mr-1" /> Agregar Impuesto
        </Button>
      </div>

      {/* Header */}
      <div className="grid grid-cols-4 gap-3 px-4 text-sm font-medium text-slate-700">
        <div className="col-span-2 flex items-center gap-1">
          <FileText className="h-4 w-4" /> Detalle
        </div>
        <div className="col-span-1 flex items-center gap-1">
          <CircleDollarSign className="h-4 w-4" /> Importe
        </div>
        <div className="col-span-1"></div>
      </div>

      {/* Filas */}
      <div className="space-y-1">
        {fields.map((item, idx) => (
          <div
            key={item.id}
            className={cn(
              "flex flex-col gap-2 lg:grid lg:grid-cols-4 lg:gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-md"
            )}
          >
            {/* Detalle */}
            <div className="col-span-2">
              <Controller
                control={control}
                name={`impuestos.${idx}.detalle`}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Detalle"
                    className={inputStyle}
                  />
                )}
              />
            </div>

            {/* Importe */}
            <div className="col-span-1">
              <Controller
                control={control}
                name={`impuestos.${idx}.importe`}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className={inputStyle}
                  />
                )}
              />
            </div>

            {/* Botón eliminar */}
            <div className="col-span-1 flex justify-end ">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveImpuesto(idx)}
                className="hover:bg-gray-200 hover:text-red-500 text-red-500 mr-5"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-end mt-3">
        <span className="text-sm font-semibold">
          Total Otros Tributos: $
          <span className="ml-2">
            {totalImpuestos.toLocaleString("es-AR", {
              minimumFractionDigits: 2,
            })}
          </span>
        </span>
      </div>
    </div>
  );
}
