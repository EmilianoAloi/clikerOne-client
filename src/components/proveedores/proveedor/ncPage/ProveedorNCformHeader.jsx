import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar1,
  CalendarIcon,
  Building2,
  UserCog,
  Fingerprint,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

export default function ProveedorNCformHeader({
  formData,
  setFormData,
  proveedorNombre,
  proveedorCuit,
  proveedorRazonSocial,
  inputStyle = "",
}) {
  const parseFecha = (fechaStr) => {
    if (!fechaStr) return new Date();
    const [year, month, day] = fechaStr.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Label className="flex items-center gap-2 font-semibold text-sm mb-2">
            <UserCog className="h-4 w-4 text-slate-500" />
            Proveedor
          </Label>
          <Input
            disabled
            value={proveedorNombre}
            className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400"
          />
        </div>

        <div className="col-span-1">
          <Label className="flex items-center gap-2 font-semibold text-sm mb-2">
            <Fingerprint className="h-4 w-4 text-slate-500" />
            CUIT
          </Label>
          <Input
            disabled
            value={proveedorCuit}
            className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label className="flex items-center gap-2 font-semibold text-sm mb-2">
            <Building2 className="h-4 w-4 text-slate-500" />
            Razón Social
          </Label>
          <Input
            disabled
            value={proveedorRazonSocial}
            className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400"
          />
        </div>

        <div>
          <Label className="flex items-center gap-2 font-semibold text-sm mb-2">
            <Calendar1 className="h-4 w-4 text-slate-500" />
            Fecha Contable
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  inputStyle,
                  "w-full justify-start text-left ",
                  !formData.fecha_contable && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.fecha_contable &&
                new Date(`${formData.fecha_contable}T12:00:00`).toString() !==
                  "Invalid Date" ? (
                  format(
                    new Date(`${formData.fecha_contable}T12:00:00`),
                    "dd/MM/yyyy"
                  )
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
                  formData.fecha_contable
                    ? parseFecha(formData.fecha_contable)
                    : new Date()
                }
                onSelect={(date) =>
                  setFormData((prev) => ({
                    ...prev,
                    fecha_contable: date ? format(date, "yyyy-MM-dd") : "",
                  }))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
