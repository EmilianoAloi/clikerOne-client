import {
  CircleDollarSign,
  Hash,
  PackageCheck,
  Plus,
  Tag,
  Trash2,
  Percent,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";

const UNIDADES = [
  "unidad",
  "caja",
  "g",
  "kg",
  "lt",
  "ml",
  "cm",
  "cm2",
  "cm3",
  "m",
  "m2",
];

export default function ProveedorInvoiceArticle({
  articulos,
  ivaDefault,
  inputStyle = "",
}) {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "items",
  });

  const handleRemoveItem = (idx) => {
    if (fields.length === 1) {
      update(idx, {
        id_articulo: -2,
        nombre_manual: "",
        cantidad: 1,
        precio_unitario: 0,
        valor_descuento: 0,
        iva: ivaDefault,
        color: "",
        unidad_de_medida: "",
      });
    } else {
      remove(idx);
    }
  };

  const handleAddItem = () => {
    append({
      id_articulo: -2,
      nombre_manual: "",
      cantidad: 1,
      precio_unitario: 0,
      valor_descuento: 0,
      iva: ivaDefault,
      color: "",
      unidad_de_medida: "",
    });
  };

  const items = watch("items");

  return (
    <div className="space-y-2">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Tag className="h-5 w-5 text-slate-600" />
          Detalle de Items
        </h3>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddItem}
          className="font-semibold cursor-pointer flex items-center border-slate-300 text-slate-700 hover:bg-slate-100 w-fit"
        >
          <Plus className="h-4 w-4 mr-1" /> Agregar Item
        </Button>
      </div>

      <div className="space-y-1">
        {/* Header row */}
        <div className="hidden lg:grid grid-cols-14 gap-3 px-4 py-2 text-sm font-medium text-slate-700">
          <div className="col-span-1">
            <span className="flex items-center gap-1">
              <Hash className="h-4 w-4" /> Cantidad
            </span>
          </div>
          <div className="col-span-2">
            <span className="flex items-center gap-1">
              <PackageCheck className="h-4 w-4" /> Artículo
            </span>
          </div>
          <div className="col-span-2 me-6">
            <span className="flex items-center gap-1">
              <CircleDollarSign className="h-4 w-4" /> Color
            </span>
          </div>
          <div className="col-span-2 me-6">
            <span className="flex items-center gap-1">
              <CircleDollarSign className="h-4 w-4" /> U. medida
            </span>
          </div>
          <div className="col-span-2 me-6">
            <span className="flex items-center gap-1">
              <CircleDollarSign className="h-4 w-4" /> Precio Unitario
            </span>
          </div>
          <div className="col-span-1">
            <span className="flex items-center gap-1">
              <Percent className="h-4 w-4" /> Desct.
            </span>
          </div>
          <div className="col-span-1">
            <span className="flex items-center gap-1">
              <Percent className="h-4 w-4" /> IVA
            </span>
          </div>
          <div className="col-span-1 ms-0">
            <span className="flex items-center gap-1 ">
              <CircleDollarSign className="h-4 w-4" /> Subtotal
            </span>
          </div>
          <div className="col-span-1"></div>
        </div>

        {fields.map((item, idx) => {
          const cantidad = Number(items?.[idx]?.cantidad ?? 0);
          const precio = Number(items?.[idx]?.precio_unitario ?? 0);
          const descuento = Number(items?.[idx]?.valor_descuento || 0);
          const iva =
            typeof items?.[idx]?.iva === "string"
              ? Number(items?.[idx]?.iva)
              : Number(items?.[idx]?.iva) || 0;
          const neto =
            cantidad * precio - (cantidad * precio * descuento) / 100;
          const subtotal = neto * (1 + iva / 100);

          const esManual =
            items?.[idx]?.id_articulo === null ||
            items?.[idx]?.id_articulo === -1;

          return (
            <div
              key={item.id}
              className={cn(
                "flex flex-col gap-2 lg:grid lg:grid-cols-14 lg:gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-md"
              )}
            >
              {/* Cantidad */}
              <div className="lg:col-span-1 col-span-full">
                <div className="lg:hidden font-semibold mb-1">Cantidad</div>
                <Controller
                  control={control}
                  name={`items.${idx}.cantidad`}
                  render={({ field }) => (
                    <>
                      <Input
                        min="0"
                        type="number"
                        inputMode="decimal"
                        pattern="^\d*\.?\d{0,2}$"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => {
                          let val = e.target.value.replace(",", ".");
                          if (val === "") {
                            field.onChange("");
                          } else if (/^\d*\.?\d{0,2}$/.test(val)) {
                            field.onChange(Number(val));
                          }
                        }}
                        className={`${inputStyle} w-full`}
                        placeholder="0.00"
                      />
                      {errors.items?.[idx]?.cantidad?.message && (
                        <span className="text-xs text-red-500">
                          {errors.items?.[idx]?.cantidad?.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
              {/* Artículo  */}
              <div className="lg:col-span-2 col-span-full">
                <div className="lg:hidden font-semibold mb-1">Artículo</div>
                {!esManual ? (
                  <Controller
                    control={control}
                    name={`items.${idx}.id_articulo`}
                    render={({ field }) => (
                      <>
                        <Select
                          value={
                            items?.[idx]?.id_articulo === -2 ||
                            items?.[idx]?.id_articulo === null ||
                            typeof items?.[idx]?.id_articulo === "undefined"
                              ? ""
                              : String(items?.[idx]?.id_articulo)
                          }
                          onValueChange={(value) => {
                            if (value === "manual") {
                              field.onChange(-1);
                              setValue(`items.${idx}.nombre_manual`, "");
                              setValue(`items.${idx}.precio_unitario`, 0);
                              setValue(`items.${idx}.cantidad`, 1);
                              setValue(`items.${idx}.valor_descuento`, 0);
                              setValue(`items.${idx}.iva`, ivaDefault);
                              setValue(`items.${idx}.color`, "");
                              setValue(`items.${idx}.unidad_de_medida`, "");
                            } else {
                              const selectedId = Number(value);
                              const selected = articulos.find(
                                (a) => a.id_articulo === selectedId
                              );
                              console.log("Artículo seleccionado:", selected);
                              field.onChange(selectedId);
                              setValue(`items.${idx}.nombre_manual`, "");
                              setValue(
                                `items.${idx}.precio_unitario`,
                                Number(selected?.precio_unitario)
                              );
                              setValue(`items.${idx}.cantidad`, 1);
                              setValue(`items.${idx}.valor_descuento`, 0);
                              setValue(
                                `items.${idx}.iva`,
                                selected?.iva_predeterminado ?? ivaDefault
                              );
                              setValue(
                                `items.${idx}.color`,
                                selected?.color ?? ""
                              );
                              setValue(
                                `items.${idx}.unidad_de_medida`,
                                selected?.unidad_de_medida ?? ""
                              );
                            }
                          }}
                        >
                          <SelectTrigger className={`w-full ${inputStyle}`}>
                            <SelectValue placeholder="Seleccionar artículo" />
                          </SelectTrigger>
                          <SelectContent>
                            {articulos.map((art) => (
                              <SelectItem
                                key={`articulo-${art.id_articulo}`}
                                value={art.id_articulo.toString()}
                              >
                                {art.nombre}
                              </SelectItem>
                            ))}
                            <SelectItem
                              key={`manual-${item.id}`}
                              value="manual"
                            >
                              Otro (carga manual)
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        {errors.items?.[idx]?.id_articulo?.message && (
                          <span className="text-xs text-red-500">
                            {errors.items?.[idx]?.id_articulo?.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                ) : (
                  <Controller
                    control={control}
                    name={`items.${idx}.nombre_manual`}
                    render={({ field }) => (
                      <>
                        <Input
                          {...field}
                          autoFocus
                          placeholder="Ingrese nombre de item"
                          className={inputStyle}
                          value={
                            typeof field.value === "string" ? field.value : ""
                          }
                        />
                        {errors.items?.[idx]?.nombre_manual?.message && (
                          <span className="text-xs text-red-500">
                            {errors.items?.[idx]?.nombre_manual?.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                )}
              </div>
              {/* Color */}
              <div className="lg:col-span-2 col-span-full">
                <div className="lg:hidden font-semibold mb-1">Color</div>
                <Controller
                  control={control}
                  name={`items.${idx}.color`}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="Color"
                        className={inputStyle}
                      />
                      {errors.items?.[idx]?.color?.message && (
                        <span className="text-xs text-red-500">
                          {errors.items?.[idx]?.color?.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
              {/* Unidad de Medida */}
              <div className="lg:col-span-2 col-span-full">
                <div className="lg:hidden font-semibold mb-1">U. Medida</div>
                <Controller
                  control={control}
                  name={`items.${idx}.unidad_de_medida`}
                  render={({ field }) => (
                    <>
                      <Select
                        value={field.value ?? ""}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger className="w-full bg-white text-sm">
                          <SelectValue placeholder="Unidad" />
                        </SelectTrigger>
                        <SelectContent>
                          {UNIDADES.map((um) => (
                            <SelectItem key={um} value={um}>
                              {um}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.items?.[idx]?.unidad_de_medida?.message && (
                        <span className="text-xs text-red-500">
                          {errors.items?.[idx]?.unidad_de_medida?.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
              {/* Precio unitario */}
              <div className="lg:col-span-2 col-span-full">
                <div className="lg:hidden font-semibold mb-1">
                  Precio Unitario
                </div>
                <Controller
                  control={control}
                  name={`items.${idx}.precio_unitario`}
                  render={({ field }) => (
                    <>
                      <Input
                        min="0"
                        type="number"
                        inputMode="decimal"
                        pattern="^\d*\.?\d{0,2}$"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => {
                          let val = e.target.value.replace(",", ".");
                          if (val === "") {
                            field.onChange("");
                          } else if (/^\d*\.?\d{0,2}$/.test(val)) {
                            field.onChange(Number(val));
                          }
                        }}
                        onKeyDown={(e) => {
                          if (
                            !/[0-9.,]/.test(e.key) &&
                            ![
                              "Backspace",
                              "Tab",
                              "Delete",
                              "ArrowLeft",
                              "ArrowRight",
                            ].includes(e.key) &&
                            !(e.ctrlKey || e.metaKey)
                          ) {
                            e.preventDefault();
                          }
                          if (["e", "E", "+", "-"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        className={`${inputStyle} w-full`}
                        placeholder="0.00"
                      />
                      {errors.items?.[idx]?.precio_unitario?.message && (
                        <span className="text-xs text-red-500">
                          {errors.items?.[idx]?.precio_unitario?.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
              {/* Descuento */}
              <div className="lg:col-span-1 col-span-full">
                <div className="lg:hidden font-semibold mb-1">Desct.</div>
                <Controller
                  control={control}
                  name={`items.${idx}.valor_descuento`}
                  render={({ field }) => (
                    <>
                      <Input
                        type="number"
                        inputMode="decimal"
                        pattern="^\d*\.?\d{0,2}$"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => {
                          let val = e.target.value.replace(",", ".");
                          if (val === "") {
                            field.onChange("");
                          } else if (/^\d*\.?\d{0,2}$/.test(val)) {
                            field.onChange(Number(val));
                          }
                        }}
                        className={`${inputStyle} w-full`}
                        placeholder="0"
                        onKeyDown={(e) => {
                          if (
                            !/[0-9.,]/.test(e.key) &&
                            ![
                              "Backspace",
                              "Tab",
                              "Delete",
                              "ArrowLeft",
                              "ArrowRight",
                            ].includes(e.key) &&
                            !(e.ctrlKey || e.metaKey)
                          ) {
                            e.preventDefault();
                          }
                          if (["e", "E", "+", "-"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {errors.items?.[idx]?.valor_descuento?.message && (
                        <span className="text-xs text-red-500">
                          {errors.items?.[idx]?.valor_descuento?.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
              {/* IVA */}
              <div className="lg:col-span-1 col-span-full">
                <div className="lg:hidden font-semibold mb-1">% IVA</div>
                <Controller
                  control={control}
                  name={`items.${idx}.iva`}
                  render={({ field }) => (
                    <Select
                      value={
                        field.value !== undefined &&
                        field.value !== null &&
                        field.value !== ""
                          ? String(field.value)
                          : String(ivaDefault)
                      }
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className={`${inputStyle} w-full`}>
                        <SelectValue placeholder="IVA" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="21">21</SelectItem>
                        <SelectItem value="10.5">10,5</SelectItem>
                        <SelectItem value="0">0</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.items?.[idx]?.iva?.message && (
                  <span className="text-xs text-red-500">
                    {errors.items?.[idx]?.iva?.message}
                  </span>
                )}
              </div>
              {/* Subtotal */}
              <div className="lg:col-span-2 col-span-full">
                <div className="lg:hidden font-semibold mb-1">Subtotal</div>
                <Input
                  type="text"
                  min="0"
                  value={
                    Number.isFinite(subtotal)
                      ? subtotal.toLocaleString("es-AR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : ""
                  }
                  disabled
                  tabIndex={-1}
                  className={`${inputStyle} w-full bg-slate-100`}
                  placeholder="0.00"
                  readOnly
                />
              </div>
              {/* Quitar item */}
              <div className="lg:col-span-1 col-span-full flex justify-center items-center pt-2 lg:pt-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveItem(idx)}
                  className={cn(
                    "hover:bg-gray-200 hover:text-red-500 text-red-500 cursor-pointer"
                  )}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          );
        })}
        {/* Validación de array (error general de items) */}
        {typeof errors.items?.message === "string" && (
          <div className="text-xs text-red-500 px-4 pt-1">
            {errors.items.message}
          </div>
        )}
      </div>
    </div>
  );
}
