import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarDays,
  Building2,
  CalendarIcon,
  UserCog,
  Fingerprint,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";
import { useState } from "react";

const ProveedorOPheader = ({ proveedor }) => {
  const [paymentDate, setPaymentDate] = useState(() => new Date());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Columna 1 */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Label className="flex items-center gap-2 font-semibold text-sm">
            <UserCog className="h-4 w-4 text-slate-500" />
            Proveedor
          </Label>

          <Input
            disabled
            value={proveedor?.nombre ?? ""}
            className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
          />
        </div>

        {/* CUIT */}
        <div className="col-span-1">
          <Label className="flex items-center gap-2 font-semibold text-sm">
            <Fingerprint className="h-4 w-4 text-slate-500" />
            CUIT
          </Label>
          <Input
            disabled
            placeholder="Número de CUIT"
            value={proveedor.cuit ?? ""}
            className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
          />
        </div>
      </div>

      {/* Columna 2 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Razón Social */}
        <div>
          <Label className="flex items-center gap-2 font-semibold text-sm">
            <Building2 className="h-4 w-4 text-slate-500" />
            Razón Social
          </Label>
          <Input
            disabled
            placeholder="Razón Social"
            value={proveedor.razon_social ?? ""}
            className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
          />
        </div>

        {/* Fecha de pago */}
        <div>
          <Label
            htmlFor="fecha_pago"
            className="flex items-center gap-2 text-sm font-semibold mb-1"
          >
            <CalendarDays className="h-4 w-4 text-slate-500" />
            Fecha de Pago
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400",
                  !paymentDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {paymentDate ? (
                  format(paymentDate, "dd/MM/yyyy")
                ) : (
                  <span>dd / mm / aaaa</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                locale={es}
                selected={paymentDate}
                onSelect={(date) => {
                  if (date) setPaymentDate(date);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default ProveedorOPheader;
