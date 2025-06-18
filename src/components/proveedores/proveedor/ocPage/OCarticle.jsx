import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Trash2,
  Hash,
  Package,
  FileText,
  Ruler,
  CircleDollarSign,
  Percent,
  Calculator,
  Palette,
} from "lucide-react";
import { useEffect } from "react";

const getDefaultItem = (proveedor) => ({
  id_articulo: "",
  descripcion: "",
  cantidad: 1,
  unidad_medida: "",
  precio_unitario: 0,
  iva: proveedor?.iva_predeterminado?.toString(),
  color: "",
  valor_descuento: 0,
  subtotal: 0,
  observaciones: "",
  estado_logico: 1,
});

export default function OCarticle({
  form,
  proveedor,
  items,
  handleAddItem,
  handleRemoveItem,
}) {
  const { control, watch } = form;
  const articulosProveedor = proveedor.articulos;
  const inputStyle = "bg-white border border-gray-300 rounded-md shadow-sm ";

  const colores = Array.from(
    new Set(articulosProveedor.map((a) => a.color).filter(Boolean))
  );

  useEffect(() => {
    items.forEach((item, index) => {
      const idArticulo = watch(`items.${index}.id_articulo`);
      if (!idArticulo) return;
      const articulo = articulosProveedor.find(
        (a) => a.id_articulo === idArticulo
      );
      if (articulo && articulo.unidad_de_medida) {
        if (
          watch(`items.${index}.unidad_medida`) !== articulo.unidad_de_medida
        ) {
          form.setValue(
            `items.${index}.unidad_medida`,
            articulo.unidad_de_medida
          );
        }
      }
    });
  }, [items, watch, articulosProveedor, form]);

  return (
    <div className="w-full mt-10 border border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 bg-slate-50 cursor-pointer">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-slate-600" />
          <h3 className="text-lg font-semibold">Detalle de Artículos</h3>
        </div>
        <Button
          type="button"
          onClick={handleAddItem}
          variant="default"
          className="flex items-center gap-2 font-semibold px-6 py-2 rounded shadow"
        >
          <Plus className="h-5 w-5" />
          Agregar Artículo
        </Button>
      </div>

      {/* Lista de ítems */}
      <div className="px-4 pt-6">
        {items.map((item, index) => {
          const articuloActual = articulosProveedor.find(
            (a) => a.id_articulo === watch(`items.${index}.id_articulo`)
          );

          return (
            <div
              key={item.id}
              className="border-1 border-gray-300 rounded-lg bg-white px-4 pt-4 pb-6 mb-6 shadow-sm"
            >
              {/* Badge y botón eliminar */}
              <div className="flex items-center justify-between mb-6">
                <Badge
                  variant="outline"
                  className="text-xs px-3 py-1 bg-slate-50 border-slate-200 flex items-center gap-2 font-semibold"
                >
                  <span className="text-slate-900">Ítem #{index + 1}</span>
                </Badge>

                <Button
                  type="button"
                  onClick={() => {
                    if (items.length === 1) {
                      Object.entries(getDefaultItem(proveedor)).forEach(
                        ([key, val]) => {
                          form.setValue(`items.0.${key}`, val);
                        }
                      );
                    } else {
                      handleRemoveItem(index);
                    }
                  }}
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>

              {/* FILA 1 */}
              <div className="grid grid-cols-12 gap-4 mb-6">
                {/* Artículo */}
                <div className="col-span-3">
                  <span className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-1.5">
                    <Package className="h-4 w-4" /> Artículo
                  </span>
                  <FormField
                    control={control}
                    name={`items.${index}.id_articulo`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            value={field.value?.toString() || ""}
                            onValueChange={(value) => {
                              const idArticulo =
                                value === "" ? "" : Number(value);
                              field.onChange(idArticulo);

                              if (value !== "") {
                                const articulo = articulosProveedor.find(
                                  (a) => a.id_articulo === Number(value)
                                );
                                if (articulo) {
                                  form.setValue(
                                    `items.${index}.unidad_medida`,
                                    articulo.unidad_de_medida || ""
                                  );
                                  form.setValue(
                                    `items.${index}.precio_unitario`,
                                    Number(articulo.precio_unitario) || 0
                                  );
                                  form.setValue(
                                    `items.${index}.descripcion`,
                                    articulo.descripcion || ""
                                  );
                                  form.setValue(
                                    `items.${index}.color`,
                                    articulo.color || ""
                                  );
                                  form.setValue(
                                    `items.${index}.iva`,
                                    proveedor.iva_predeterminado?.toString() ||
                                      "21"
                                  );
                                }
                              }
                            }}
                          >
                            <SelectTrigger className={`${inputStyle} w-full`}>
                              <SelectValue placeholder="Seleccionar artículo" />
                            </SelectTrigger>
                            <SelectContent>
                              {articulosProveedor.map((art) => (
                                <SelectItem
                                  key={art.id_articulo}
                                  value={art.id_articulo.toString()}
                                >
                                  {art.nombre}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Código */}
                <div className="col-span-2">
                  <span className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-1.5">
                    <Hash className="h-4 w-4" /> Código
                  </span>
                  <Input
                    value={articuloActual?.codigo_interno || ""}
                    disabled
                    className={`${inputStyle} w-full`}
                    tabIndex={-1}
                  />
                </div>
                {/* Descripción */}
                <div className="col-span-5">
                  <span className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-1.5">
                    <FileText className="h-4 w-4" /> Descripción
                  </span>
                  <FormField
                    control={control}
                    name={`items.${index}.descripcion`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Descripción detallada"
                            {...field}
                            className={`${inputStyle} w-full`}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                {/* Unidad de medida */}
                <div className="col-span-2">
                  <span className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-1.5">
                    <Ruler className="h-4 w-4" /> U. medida
                  </span>
                  <FormField
                    control={control}
                    name={`items.${index}.unidad_medida`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            value={field.value || ""}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className={`${inputStyle} w-full`}>
                              <SelectValue placeholder="Unidad" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="unidad">unidad</SelectItem>
                              <SelectItem value="caja">caja</SelectItem>
                              <SelectItem value="g">g</SelectItem>
                              <SelectItem value="kg">kg</SelectItem>
                              <SelectItem value="lt">lt</SelectItem>
                              <SelectItem value="ml">ml</SelectItem>
                              <SelectItem value="cm">cm</SelectItem>
                              <SelectItem value="cm2">cm2</SelectItem>
                              <SelectItem value="cm3">cm3</SelectItem>
                              <SelectItem value="m">m</SelectItem>
                              <SelectItem value="m2">m2</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* FILA 2 */}
              <div className="grid grid-cols-12 gap-4">
                {/* Cantidad */}
                <div className="col-span-2">
                  <span className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-1.5">
                    <Hash className="h-4 w-4" /> Cantidad
                  </span>
                  <FormField
                    control={control}
                    name={`items.${index}.cantidad`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            inputMode="numeric"
                            min="1"
                            placeholder="1"
                            value={field.value ?? ""}
                            onChange={(e) => {
                              const value = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                              if (value === "") {
                                field.onChange("");
                              } else {
                                field.onChange(Number(value));
                              }
                            }}
                            onBlur={field.onBlur}
                            className={`${inputStyle} w-full`}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Precio Unitario */}
                <div className="col-span-2">
                  <span className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-1.5">
                    <CircleDollarSign className="h-4 w-4" /> Precio Unit.
                  </span>
                  <FormField
                    control={control}
                    name={`items.${index}.precio_unitario`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            inputMode="decimal"
                            min="0"
                            placeholder="0.00"
                            value={field.value ?? ""}
                            onChange={(e) => {
                              let val = e.target.value.replace(/[^0-9.]/g, "");
                              val = val.replace(/^([^.]*\.)|\./g, "$1");
                              if (val === "") {
                                field.onChange("");
                              } else {
                                field.onChange(Number(val));
                              }
                            }}
                            onBlur={field.onBlur}
                            className={`${inputStyle} w-full`}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* IVA */}
                <div className="col-span-2">
                  <span className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-1.5">
                    <CircleDollarSign className="h-4 w-4" /> IVA
                  </span>
                  <FormField
                    control={control}
                    name={`items.${index}.iva`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            value={field.value?.toString() || ""}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className={`${inputStyle} w-full`}>
                              <SelectValue placeholder="IVA" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="21">21%</SelectItem>
                              <SelectItem value="10.5">10.5%</SelectItem>
                              <SelectItem value="0">Exento</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Color */}
                <div className="col-span-2">
                  <span className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-1.5">
                    <Palette className="h-4 w-4" /> Color
                  </span>
                  <FormField
                    control={control}
                    name={`items.${index}.color`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            value={
                              field.value && field.value !== ""
                                ? field.value
                                : "_none"
                            }
                            onValueChange={(value) => {
                              const parsedValue =
                                value === "_none" ? "" : value;
                              field.onChange(parsedValue);
                            }}
                          >
                            <SelectTrigger className={`${inputStyle} w-full`}>
                              <SelectValue placeholder="Color" />
                            </SelectTrigger>
                            <SelectContent>
                              {colores
                                .filter(
                                  (col) => typeof col === "string" && !!col
                                )
                                .map((col) => (
                                  <SelectItem key={col} value={col}>
                                    {col}
                                  </SelectItem>
                                ))}
                              <SelectItem value="_none">
                                Sin especificar
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Valor Descuento */}
                <div className="col-span-2">
                  <span className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-1.5">
                    <Percent className="h-4 w-4" />
                    Descuento
                  </span>
                  <FormField
                    control={control}
                    name={`items.${index}.valor_descuento`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            inputMode="decimal"
                            min="0"
                            max="100"
                            step="0.01"
                            placeholder="0"
                            value={field.value ?? ""}
                            onChange={(e) => {
                              let val = e.target.value;
                              let num = Number(val);
                              if (val === "") {
                                field.onChange("");
                              } else if (num > 100) {
                                field.onChange(100);
                              } else if (num < 0) {
                                field.onChange(0);
                              } else if (!isNaN(num)) {
                                field.onChange(num);
                              }
                              // No hace nada si no es número (ignora letras)
                            }}
                            onKeyDown={(e) => {
                              // Permite solo números, punto, backspace, delete, tab, arrows
                              if (
                                !/[0-9.,]/.test(e.key) &&
                                ![
                                  "Backspace",
                                  "Delete",
                                  "Tab",
                                  "ArrowLeft",
                                  "ArrowRight",
                                ].includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                            }}
                            onBlur={field.onBlur}
                            className={`${inputStyle} w-full`}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Subtotal */}
                <div className="col-span-2">
                  <span className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-1.5">
                    <Calculator className="h-4 w-4" /> Subtotal
                  </span>
                  <FormField
                    control={control}
                    name={`items.${index}.subtotal`}
                    render={() => {
                      const cantidad =
                        Number(watch(`items.${index}.cantidad`)) || 0;
                      const precio =
                        Number(watch(`items.${index}.precio_unitario`)) || 0;
                      const valor_descuento =
                        Number(watch(`items.${index}.valor_descuento`)) || 0;
                      // Asegura rango válido 0-100
                      const porcentaje = Math.max(
                        0,
                        Math.min(valor_descuento, 100)
                      );
                      const sub = cantidad * precio * (1 - porcentaje / 100);
                      return (
                        <FormItem>
                          <FormControl>
                            <div
                              className={`${inputStyle} w-full flex items-center h-9 !px-3 bg-slate-50 border rounded-md text-base font-medium"`}
                            >
                              $
                              {sub.toLocaleString("es-AR", {
                                minimumFractionDigits: 2,
                              })}
                            </div>
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
