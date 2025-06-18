import {
  Calendar1,
  CalendarIcon,
  FileText,
  Hash,
  Percent,
  ChevronDown,
  UserCog,
  Wallet,
  Check,
} from "lucide-react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

export default function ProveedorInvoiceHeader({
  proveedores,
  inputStyle = "",
  open,
  setOpen,
  disabledProveedor,
}) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const proveedor = watch("proveedor");
  const numero_factura = watch("numero_factura");
  const tipo_comprobante = watch("tipo_comprobante");
  const condicion_venta = watch("condicion_venta");
  const fecha_emision = watch("fecha_emision");
  const fecha_vencimiento = watch("fecha_vencimiento");
  const fecha_contable = watch("fecha_contable");
  const percepcion_iibb = watch("percepcion_iibb");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
      {/* Proveedor */}
      <div>
        <Label
          htmlFor="proveedor"
          className="flex items-center gap-2 font-semibold text-sm"
        >
          <UserCog className="h-4 w-4 text-slate-500" />
          Proveedor
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              role="combobox"
              aria-expanded={open}
              disabled={disabledProveedor}
              aria-controls="proveedor-list"
              className={cn(
                "w-full mt-1 flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400",
                inputStyle,
                disabledProveedor &&
                  "opacity-50 cursor-not-allowed pointer-events-none"
              )}
            >
              <span className={cn(proveedor ? "" : "text-muted-foreground")}>
                {proveedor
                  ? proveedores.find((p) => p.id === proveedor)?.nombre
                  : "Seleccionar proveedor"}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="p-0 w-[var(--radix-popover-trigger-width)]"
          >
            <Command>
              <CommandInput placeholder="Buscar proveedor..." className="h-9" />
              <CommandEmpty>No se encontró proveedor.</CommandEmpty>
              <CommandGroup>
                {proveedores.map((prov) => (
                  <CommandItem
                    key={prov.id}
                    onSelect={() => {
                      setValue("proveedor", prov.id, { shouldValidate: true });
                      setOpen(false);
                    }}
                    className="flex items-center justify-between w-full"
                  >
                    <span className="text-left w-full">{prov.nombre}</span>
                    {proveedor === prov.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        {errors.proveedor && (
          <span className="text-xs text-red-500">
            {errors.proveedor.message}
          </span>
        )}
      </div>

      {/* Número de factura */}
      <div className="relative">
        <Label
          htmlFor="numero_factura"
          className="flex items-center font-semibold gap-2"
        >
          <Hash className="h-4 w-4 text-slate-500" />
          Número
        </Label>
        <Input
          id="numero_factura"
          {...register("numero_factura")}
          placeholder="Ingrese número de factura"
          className={`mt-2 ${inputStyle}`}
          maxLength={21}
        />
        {errors.numero_factura && (
          <span
            className="absolute left-0 top-full mt-0.5 text-xs text-red-500 bg-white px-1 z-20 pointer-events-none"
            style={{ minWidth: "100%" }}
          >
            {errors.numero_factura.message}
          </span>
        )}
      </div>

      {/* Tipo de comprobante */}
      <div>
        <Label
          htmlFor="tipo_comprobante"
          className="flex items-center gap-2 font-semibold"
        >
          <FileText className="h-4 w-4 text-slate-500" />
          Tipo Comprobante
        </Label>
        <Select
          value={tipo_comprobante}
          onValueChange={(value) =>
            setValue("tipo_comprobante", value, { shouldValidate: true })
          }
        >
          <SelectTrigger
            id="tipo_comprobante"
            className={`mt-2 w-full ${inputStyle}`}
          >
            <SelectValue placeholder="Seleccionar tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Factura A">Factura A</SelectItem>
            <SelectItem value="Factura B">Factura B</SelectItem>
            <SelectItem value="Factura C">Factura C</SelectItem>
          </SelectContent>
        </Select>
        {errors.tipo_comprobante && (
          <span className="text-xs text-red-500">
            {errors.tipo_comprobante.message}
          </span>
        )}
      </div>

      {/* Condición de venta */}
      <div>
        <Label
          htmlFor="condicion_venta"
          className="flex items-center gap-2 text-sm font-semibold"
        >
          <Wallet className="h-4 w-4 text-slate-500" />
          Condición de venta
        </Label>
        <Select
          value={condicion_venta}
          onValueChange={(value) =>
            setValue("condicion_venta", value, { shouldValidate: true })
          }
        >
          <SelectTrigger
            id="condicion_venta"
            className={`w-full mt-1 ${inputStyle}`}
          >
            <SelectValue placeholder="Seleccionar condición" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Contado">Contado</SelectItem>
            <SelectItem value="Anticipado">Anticipado</SelectItem>
            <SelectItem value="Cuenta Corriente">Cuenta Corriente</SelectItem>
            <SelectItem value="30 días">30 días</SelectItem>
            <SelectItem value="60 días">60 días</SelectItem>
            <SelectItem value="Transferencia">Transferencia</SelectItem>
            <SelectItem value="Cheque">Cheque</SelectItem>
          </SelectContent>
        </Select>
        {errors.condicion_venta && (
          <span className="text-xs text-red-500">
            {errors.condicion_venta.message}
          </span>
        )}
      </div>

      {/* Fecha de emisión */}
      <div>
        <Label
          htmlFor="fecha_emision"
          className="flex items-center gap-2 text-sm font-semibold"
        >
          <Calendar1 className="h-4 w-4 text-slate-500" />
          Fecha de Emisión
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                inputStyle,
                "w-full justify-start text-left mt-1",
                !fecha_emision && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {fecha_emision &&
              new Date(`${fecha_emision}T12:00:00`).toString() !==
                "Invalid Date" ? (
                format(new Date(`${fecha_emision}T12:00:00`), "dd/MM/yyyy")
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
                fecha_emision
                  ? new Date(
                      Number(fecha_emision.split("-")[0]),
                      Number(fecha_emision.split("-")[1]) - 1,
                      Number(fecha_emision.split("-")[2])
                    )
                  : new Date()
              }
              onSelect={(date) => {
                const value = date ? format(date, "yyyy-MM-dd") : "";
                setValue("fecha_emision", value, { shouldValidate: true });
                console.log("Set fecha_emision:", value);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.fecha_emision && (
          <span className="text-xs text-red-500">
            {errors.fecha_emision.message}
          </span>
        )}
      </div>

      {/* Fecha de vencimiento */}
      <div>
        <Label
          htmlFor="fecha_vencimiento"
          className="text-sm flex items-center gap-2 font-semibold"
        >
          <Calendar1 className="h-4 w-4 text-slate-500" />
          Fecha de Vencimiento
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                inputStyle,
                "w-full justify-start text-left mt-1",
                !fecha_vencimiento && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {fecha_vencimiento &&
              new Date(`${fecha_vencimiento}T12:00:00`).toString() !==
                "Invalid Date" ? (
                format(new Date(`${fecha_vencimiento}T12:00:00`), "dd/MM/yyyy")
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
                fecha_vencimiento
                  ? new Date(
                      Number(fecha_vencimiento.split("-")[0]),
                      Number(fecha_vencimiento.split("-")[1]) - 1,
                      Number(fecha_vencimiento.split("-")[2])
                    )
                  : new Date()
              }
              onSelect={(date) => {
                const value = date ? format(date, "yyyy-MM-dd") : "";
                setValue("fecha_vencimiento", value, { shouldValidate: true });
                console.log("Set fecha_vencimiento:", value);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.fecha_vencimiento && (
          <span className="text-xs text-red-500">
            {errors.fecha_vencimiento.message}
          </span>
        )}
      </div>

      {/* Fecha contable */}
      <div>
        <Label
          htmlFor="fecha_contable"
          className="text-sm flex items-center gap-2 font-semibold"
        >
          <Calendar1 className="h-4 w-4 text-slate-500" />
          Fecha Contable
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                inputStyle,
                "w-full justify-start text-left mt-1",
                !fecha_contable && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {fecha_contable &&
              new Date(`${fecha_contable}T12:00:00`).toString() !==
                "Invalid Date" ? (
                format(new Date(`${fecha_contable}T12:00:00`), "dd/MM/yyyy")
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
                fecha_contable
                  ? new Date(
                      Number(fecha_contable.split("-")[0]),
                      Number(fecha_contable.split("-")[1]) - 1,
                      Number(fecha_contable.split("-")[2])
                    )
                  : new Date()
              }
              onSelect={(date) => {
                const value = date ? format(date, "yyyy-MM-dd") : "";
                setValue("fecha_contable", value, { shouldValidate: true });
                console.log("Set fecha_contable:", value);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.fecha_contable && (
          <span className="text-xs text-red-500">
            {errors.fecha_contable.message}
          </span>
        )}
      </div>

      {/* Percepción IIBB */}
      <div>
        <Label
          htmlFor="percepcion_iibb"
          className="text-sm font-semibold flex items-center gap-2"
        >
          <Percent className="h-4 w-4 text-slate-500" />
          Percepción IIBB
        </Label>
        <Select
          value={percepcion_iibb?.toString() ?? ""}
          onValueChange={(value) =>
            setValue(
              "percepcion_iibb",
              value === "Exento" ? "Exento" : parseFloat(value),
              { shouldValidate: true }
            )
          }
        >
          <SelectTrigger
            id="percepcion_iibb"
            className={`w-full mt-1 ${inputStyle}`}
          >
            <SelectValue placeholder="Seleccionar percepción" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5%</SelectItem>
            <SelectItem value="3.5">3.5%</SelectItem>
            <SelectItem value="2.5">2.5%</SelectItem>
            <SelectItem value="Exento">Exento</SelectItem>
          </SelectContent>
        </Select>
        {errors.percepcion_iibb && (
          <span className="text-xs text-red-500">
            {errors.percepcion_iibb.message}
          </span>
        )}
      </div>
    </div>
  );
}
