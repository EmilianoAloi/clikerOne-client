import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarDate } from "@/components/ui/calendar";
import {
  Building2,
  CalendarDays,
  CalendarIcon,
  Hash,
  MapPin,
  Wallet,
  UserRound,
  Fingerprint,
} from "lucide-react";
import { es } from "date-fns/locale";
import { formatDate } from "@/lib/utils";

export default function OCproveedorInfo({ form, proveedor }) {
  const { control } = form;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <>
      {/* Primera fila */}
      <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-4 lg:gap-6 mx-8">
        {/* Proveedor */}
        <div>
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-sm font-semibold">
              <UserRound className="h-4 w-4 text-slate-500" />
              Proveedor
            </FormLabel>
            <FormControl>
              <Input
                value={proveedor.nombre}
                disabled
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
              />
            </FormControl>
          </FormItem>
        </div>

        {/* CUIT */}
        <div>
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-sm font-semibold">
              <Fingerprint className="h-4 w-4 text-slate-500" />
              CUIT
            </FormLabel>
            <FormControl>
              <Input
                disabled
                value={proveedor.cuit ?? ""}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
              />
            </FormControl>
          </FormItem>
        </div>

        {/* Razón Social */}
        <div>
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-sm font-semibold">
              <Building2 className="h-4 w-4 text-slate-500" />
              Razón Social
            </FormLabel>
            <FormControl>
              <Input
                disabled
                value={proveedor.razon_social ?? ""}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
              />
            </FormControl>
          </FormItem>
        </div>

        {/* Estado de la OC */}
        <div>
          <FormField
            control={control}
            name="estado_compra"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-semibold !text-slate-900">
                  <Hash className="h-4 w-4 text-slate-500" />
                  Estado de OC
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.trigger("estado_compra");
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      onBlur={field.onBlur}
                      className="w-full mt-0 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
                    >
                      <SelectValue placeholder="Seleccioná estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                      <SelectItem value="en_proceso">En proceso</SelectItem>
                      <SelectItem value="entregada">Entregada</SelectItem>
                      <SelectItem value="cancelada">Cancelada</SelectItem>
                      <SelectItem value="vencida">Vencida</SelectItem>
                      <SelectItem value="parcial">Parcial</SelectItem>
                      <SelectItem value="anulada">Anulada</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="block min-h-[20px] text-xs ms-2 ml-2 mt-[-4px]" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Segunda fila */}
      <div className="grid grid-cols-1 gap-y-4 mt-6 lg:grid-cols-4 lg:gap-6 mx-8">
        {/* Condición de pago */}
        <div>
          <FormField
            control={control}
            name="condicion_pago"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-semibold  !text-slate-900">
                  <Wallet className="h-4 w-4 text-slate-500" />
                  Condición de Pago
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.trigger("condicion_pago");
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      onBlur={field.onBlur}
                      className="w-full mt-0 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
                    >
                      <SelectValue placeholder="Seleccioná condición de pago" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Contado">Contado</SelectItem>
                      <SelectItem value="15 días">15 días</SelectItem>
                      <SelectItem value="30 días">30 días</SelectItem>
                      <SelectItem value="60 días">60 días</SelectItem>
                      <SelectItem value="Transferencia bancaria">
                        Transferencia bancaria
                      </SelectItem>
                      <SelectItem value="Cheque diferido">
                        Cheque diferido
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="block min-h-[20px] text-xs ms-2 ml-2 mt-[-4px]" />
              </FormItem>
            )}
          />
        </div>

        {/* Lugar de entrega */}
        <div>
          <FormField
            control={control}
            name="lugar_entrega"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-semibold  !text-slate-900">
                  <MapPin className="h-4 w-4 !text-slate-500" />
                  Lugar de Entrega
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ingresá el lugar de entrega"
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
                  />
                </FormControl>
                <FormMessage className="block min-h-[20px] text-xs ms-2 ml-2 mt-[-4px]" />
              </FormItem>
            )}
          />
        </div>

        {/* Fecha de entrega */}
        <div>
          <FormField
            control={control}
            name="fecha_entrega"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-semibold !text-slate-900">
                  <CalendarDays className="h-4 w-4 text-slate-500" />
                  Fecha de Entrega
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? formatDate(field.value)
                          : "dd / mm / aaaa"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                      onInteractOutside={field.onBlur}
                    >
                      <CalendarDate
                        mode="single"
                        locale={es}
                        selected={field.value}
                        onSelect={(date) => {
                          if (!date) return;
                          if (date < today) return;
                          field.onChange(date);
                        }}
                        disabled={(date) => date < today}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage className="block min-h-[20px] text-xs ms-2 ml-2 mt-[-4px]" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
}
