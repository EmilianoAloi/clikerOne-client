import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Hash,
  CircleDollarSign,
  CalendarIcon,
  FileText,
  Tag,
  Calendar1,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import DecimalInput from "@/components/ui/DecimalInput";

const ProveedorNDItem = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "monto_total" ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div className="space-y-4 mt-8">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Tag className="h-5 w-5 text-slate-600" />
        Detalle de Item
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        <div>
          <Label className="flex items-center gap-2 font-semibold text-sm mb-2">
            <Hash className="h-4 w-4 text-slate-500" />
            N° de Comprobante
          </Label>
          <Input
            placeholder="Ej: 0001"
            value={formData.numero_factura}
            onChange={(e) => handleChange("numero_factura", e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400"
          />
        </div>
        <div className="col-span-1">
          <Label className="flex items-center gap-2 font-semibold text-sm mb-2">
            <Calendar1 className="h-4 w-4 text-slate-500" />
            Fecha de Acreditación
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left",
                  !formData.fecha_acreditacion && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />

                {formData.fecha_acreditacion &&
                parseISO(formData.fecha_acreditacion).toString() !==
                  "Invalid Date" ? (
                  format(parseISO(formData.fecha_acreditacion), "dd/MM/yyyy")
                ) : (
                  <span>dd / mm / aaaa</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                locale={es}
                selected={
                  formData.fecha_acreditacion
                    ? parseISO(formData.fecha_acreditacion)
                    : new Date()
                }
                onSelect={(date) =>
                  setFormData((prev) => ({
                    ...prev,
                    fecha_acreditacion: date ? format(date, "yyyy-MM-dd") : "",
                  }))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label className="flex items-center gap-2 font-semibold text-sm mb-2">
            <CircleDollarSign className="h-4 w-4 text-slate-500" />
            Monto Total
          </Label>
          <DecimalInput
            value={formData.monto_total}
            onChange={(valor) => handleChange("monto_total", valor)}
            placeholder="Ej: 1500.00"
          />
        </div>
        <div className="col-span-3">
          <Label className="flex items-center gap-2 font-semibold text-sm mb-2">
            <FileText className="h-4 w-4 text-slate-500" />
            Observaciones
          </Label>
          <Input
            placeholder="Observaciones sobre item en Nota de débito..."
            value={formData.observaciones_nota}
            onChange={(e) => handleChange("observaciones_nota", e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default ProveedorNDItem;
