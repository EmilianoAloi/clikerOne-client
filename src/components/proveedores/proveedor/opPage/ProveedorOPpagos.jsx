import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ChequesModalTable from "./ChequesModalTable";
import { FormOrdersImport } from "./FormOrdersImport";

const ProveedorOPpagos = ({ items, setItems, idProveedorCliker, modo }) => {
  const [pagosImportadosIds, setPagosImportadosIds] = useState([]);

  useEffect(() => {
    if (items.length === 0) {
      setItems([
        {
          fecha: new Date().toISOString().slice(0, 10),
          medio: "",
          observaciones: "",
          monto_aplicado: 0,
          numero_comprobante: "",
          id_factura: 0,
          cheques: [],
        },
      ]);
    }
  }, [items.length, setItems]);

  const addEmptyItem = () => {
    setItems((prev) => [
      ...prev,
      {
        fecha: new Date().toISOString().slice(0, 10),
        medio: "",
        observaciones: "",
        monto_aplicado: 0,
        numero_comprobante: "",
        id_factura: 0,
        cheques: [],
      },
    ]);
  };

  const updateItem = (index, key, value) => {
    const copy = [...items];
    copy[index] = { ...copy[index], [key]: value };
    setItems(copy);
  };

  const removeItem = (index) => {
    const removed = items[index];
    setItems(items.filter((_, i) => i !== index));
    // Si el item tiene un id (es importado), lo quitás de pagosImportadosIds
    if (removed?.id && pagosImportadosIds.includes(removed.id)) {
      setPagosImportadosIds((prev) => prev.filter((id) => id !== removed.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Detalle de Pagos</h3>
        <div className="flex gap-1 items-center">
          <FormOrdersImport
            idProveedorCliker={idProveedorCliker}
            pagosYaImportados={pagosImportadosIds}
            onImport={(pagosImportados) => {
              const nuevosItems = pagosImportados.map((p) => ({
                id: p.id,
                fecha:
                  p.fecha_acreditacion || new Date().toISOString().slice(0, 10),
                medio: p.medio,
                observaciones: p.observaciones,
                monto_aplicado: p.monto ?? 0,
                numero_comprobante: p.numero_comprobante?.toString() ?? "",
                id_factura: p.id_factura || 0,
                cheques: p.cheques || [],
              }));
              // Limpiar ítems vacíos antes de importar
              setItems((prev) => {
                const sinVacios = prev.filter(
                  (item) =>
                    (item.monto_aplicado ?? 0) !== 0 ||
                    item.numero_comprobante ||
                    item.medio
                );
                return [...sinVacios, ...nuevosItems];
              });
              // Guardá los IDs importados
              setPagosImportadosIds((prev) => [
                ...prev,
                ...pagosImportados.map((p) => p.id),
              ]);
            }}
          />

          {modo !== "editar" && (
            <Button
              type="button"
              variant="outline"
              onClick={addEmptyItem}
              className="font-semibold cursor-pointer flex items-center border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              <Plus className="h-4 w-4 mr-1" /> Agregar Item
            </Button>
          )}
        </div>
      </div>
      <div className="border rounded-md overflow-hidden">
        <div className="grid grid-cols-8 gap-2 p-3 px-5 bg-slate-50 font-semibold text-sm text-slate-700">
          <span>N° Comprobante</span>
          <span>Medio</span>
          <span>Fecha Acreditación</span>
          <span>Monto</span>
          <span className="col-span-2">Observaciones</span>
          <span className="text-center">Detalle Cheques</span>
          <span className="text-center">Acciones</span>
        </div>

        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-8 gap-2 items-center border-t px-3 py-3 text-sm"
          >
            {/* N° Comprobante */}
            <Input
              value={item.numero_comprobante || ""}
              onChange={(e) =>
                updateItem(index, "numero_comprobante", e.target.value)
              }
              placeholder="Ej: 0001-123456"
              disabled={modo === "editar"}
            />

            {/* Medio */}
            <div>
              <Select
                value={item.medio || ""}
                disabled={modo === "editar"}
                onValueChange={(val) => updateItem(index, "medio", val)}
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Seleccionar " />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="banco">Banco</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="transferencia">Transferencia</SelectItem>
                  <SelectItem value="efectivo">Efectivo</SelectItem>
                  <SelectItem value="deposito">Depósito</SelectItem>
                  <SelectItem value="fjuguetes">FJuguetes</SelectItem>
                  <SelectItem value="bterceros">BTerceros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fecha acreditación */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={modo === "editar"}
                  variant="outline"
                  className="w-full justify-start text-left"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(
                    typeof item.fecha === "string"
                      ? new Date(item.fecha)
                      : item.fecha || new Date(),
                    "dd/MM/yyyy"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    typeof item.fecha === "string"
                      ? new Date(item.fecha)
                      : item.fecha
                  }
                  onSelect={(date) =>
                    date &&
                    updateItem(index, "fecha", date.toISOString().slice(0, 10))
                  }
                  locale={es}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Monto */}
            <Input
              value={item.monto_aplicado ?? ""}
              disabled={modo === "editar"}
              onBeforeInput={(e) => {
                // Permite solo números, punto, coma, o borrar
                if (!/[0-9.,]/.test(e.data)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                // Permití vacío (para borrar) y números válidos
                const val = e.target.value.replace(",", ".");
                if (/^[0-9]*[.]?[0-9]*$/.test(val) || val === "") {
                  updateItem(index, "monto_aplicado", val);
                }
              }}
              type="text"
              inputMode="decimal"
              step="any"
              className="text-right"
              placeholder="Ej: 1234.56"
            />

            {/* Observaciones */}
            <Input
              className="col-span-2"
              disabled={modo === "editar"}
              value={item.observaciones || ""}
              onChange={(e) =>
                updateItem(index, "observaciones", e.target.value)
              }
              placeholder="Observaciones"
            />

            {/* Detalle de cheques */}
            <div className="flex justify-center">
              {item.medio?.toLowerCase() === "cheque" &&
                Array.isArray(item.cheques) &&
                item.cheques.length > 0 && (
                  <ChequesModalTable cheques={item.cheques} />
                )}
            </div>

            {/* Acciones */}
            <div className="text-center">
              {modo !== "editar" && (
                <Button
                  type="button"
                  onClick={() => removeItem(index)}
                  variant="ghost"
                  size="icon"
                  className={cn("cursor-pointer")}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProveedorOPpagos;
