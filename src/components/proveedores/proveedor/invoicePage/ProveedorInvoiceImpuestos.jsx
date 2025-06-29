import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Trash2,
  Plus,
  Receipt,
  Hash,
  Percent,
  CircleDollarSign,
  Layers,
  FileText,
} from "lucide-react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export default function ProveedorInvoiceImpuestos({ inputStyle = "" }) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "impuestos",
  });

  const impuestos = watch("impuestos") || [];

  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current && fields.length === 0) {
      append({
        detalle: "",
        base_imponible: "",
        alicuota: "",
      });
      initialized.current = true;
    }
    // eslint-disable-next-line
  }, []);

  // Calcula el importe por fila
  const calcularImporte = (base, alicuota) => {
    const b = parseFloat(base) || 0;
    const a = parseFloat(alicuota) || 0;
    return (b * a) / 100;
  };

  // Suma total
  const totalImpuestos = impuestos.reduce(
    (acc, imp) => acc + calcularImporte(imp.base_imponible, imp.alicuota),
    0
  );

  const handleRemoveImpuesto = (idx) => {
    if (fields.length === 1) {
      update(idx, {
        detalle: "",
        base_imponible: "",
        alicuota: "",
      });
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
          className="font-semibold cursor-pointer flex items-center border-slate-300 text-slate-700 hover:bg-slate-100 w-fit"
          onClick={() =>
            append({
              detalle: "",
              base_imponible: "",
              alicuota: "",
            })
          }
        >
          <Plus className="w-4 h-4" />
          Agregar Impuesto
        </Button>
      </div>
      <div className="grid grid-cols-11  gap-3 px-4   text-sm font-medium text-slate-700">
        <div className="col-span-3">
          <span className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Detalle
          </span>
        </div>
        <div className="col-span-3">
          <span className="flex items-center gap-1">
            <Layers className="h-4 w-4" />
            Base Imponible
          </span>
        </div>
        <div className="col-span-2">
          <span className="flex items-center gap-1">
            <Percent className="h-4 w-4" />
            Alícuota
          </span>
        </div>
        <div className="col-span-2">
          <span className="flex items-center gap-1 ">
            <CircleDollarSign className="h-4 w-4" />
            Importe
          </span>
        </div>
        <div className="col-span-1"></div>
      </div>
      <div>
        {fields.map((item, idx) => {
          const base = impuestos?.[idx]?.base_imponible ?? "";
          const alicuota = impuestos?.[idx]?.alicuota ?? "";
          const importe = calcularImporte(base, alicuota);

          return (
            <div
              key={item.id}
              className={cn(
                "flex flex-col gap-2 lg:grid lg:grid-cols-11 lg:gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-md mb-1"
              )}
            >
              {/* Detalle */}
              <div className="col-span-3">
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
              {/* Base Imponible */}
              <div className="col-span-3">
                <Controller
                  control={control}
                  name={`impuestos.${idx}.base_imponible`}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="Base"
                      className={inputStyle}
                    />
                  )}
                />
              </div>
              {/* Alícuota */}
              <div className="col-span-2">
                <Controller
                  control={control}
                  name={`impuestos.${idx}.alicuota`}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="%"
                      className={inputStyle}
                    />
                  )}
                />
              </div>
              {/* Importe */}
              <div className="col-span-2">
                <Input
                  value={importe ? importe.toFixed(2) : ""}
                  readOnly
                  disabled
                  tabIndex={-1}
                  className={cn(inputStyle, "bg-slate-100")}
                  placeholder="0.00"
                />
              </div>
              {/* Quitar */}
              <div className="col-span-1 flex justify-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveImpuesto(idx)}
                  className={cn(
                    "hover:bg-gray-200 hover:text-red-500 text-red-500 cursor-pointer ml-8"
                  )}
                >
                  <Trash2 className="h-4 w-4 " />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Total */}
      <div className="flex justify-end mt-3">
        <span className="text-sm font-semibold">
          Importe Otros Tributos: $
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
