import { useEffect, useState, useMemo } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FileUp, FileText, Receipt } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// FilePond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

export default function OCextras({
  defaultFileUrl,
  items,
  fechaEntrega,
  condicionPago,
  lugarEntrega,
}) {
  const { control, setValue } = useFormContext();

  // -- Cálculos para el resumen --
  const resumen = useMemo(() => {
    const tipos = items.length;
    const cantidadTotal = items.reduce(
      (sum, item) => sum + (Number(item.cantidad) || 0),
      0
    );
    const subtotal = items.reduce((sum, item) => {
      const sub =
        (Number(item.cantidad) || 0) *
        (Number(item.precio_unitario) || 0) *
        (1 - (Number(item.valor_descuento) || 0) / 100);
      return sum + sub;
    }, 0);
    const ivaMonto = items.reduce((sum, item) => {
      const sub =
        (Number(item.cantidad) || 0) *
        (Number(item.precio_unitario) || 0) *
        (1 - (Number(item.valor_descuento) || 0) / 100);
      const ivaPorc = Number(item.iva) || 0;
      return sum + (sub * ivaPorc) / 100;
    }, 0);
    const total = subtotal + ivaMonto;
    return { tipos, cantidadTotal, subtotal, ivaMonto, total };
  }, [items]);

  // FilePond (adjunto)
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function loadFromUrl() {
      if (!defaultFileUrl) return;
      try {
        const res = await fetch(defaultFileUrl);
        if (!res.ok) throw new Error("No se pudo descargar el archivo");
        const blob = await res.blob();
        const ext = defaultFileUrl.split(".").pop() || "pdf";
        const file = new File([blob], `comprobante.${ext}`, {
          type: blob.type,
        });
        setFiles([file]);
        setValue("archivo_comprobante", file);
      } catch {
        setFiles([]);
        setValue("archivo_comprobante", undefined);
      }
    }
    loadFromUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultFileUrl]);

  const format = (n) =>
    Number(n || 0).toLocaleString("es-AR", { minimumFractionDigits: 2 });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mt-6 px-6">
      {/* Columna izquierda: comprobante + observaciones */}
      <div>
        <FormField
          control={control}
          name="archivo_comprobante"
          render={() => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center gap-2 mb-2">
                <FileUp className="h-4 w-4 text-slate-500" />
                Adjuntar comprobante de OC
              </FormLabel>
              <FormControl>
                <Controller
                  control={control}
                  name="archivo_comprobante"
                  render={({ field: { onChange } }) => (
                    <FilePond
                      files={files}
                      onupdatefiles={(fileItems) => {
                        const file = fileItems[0]?.file;
                        setFiles(file ? [file] : []);
                        onChange(file || null);
                      }}
                      name="comprobante"
                      labelIdle='Arrastrá el comprobante o <span class="filepond--label-action">hacé clic aquí</span>'
                      acceptedFileTypes={["application/pdf", "image/*"]}
                      allowImagePreview={true}
                      className="filepond-minimal pond-equal-height h-[120px]"
                      maxFiles={1}
                      credits={false}
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="observaciones"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel className="flex items-center gap-2 font-semibold text-sm mb-2">
                <FileText className="h-4 w-4 text-slate-500" />
                Observaciones de OC
              </FormLabel>
              <FormControl>
                <Textarea
                  id="observaciones"
                  placeholder="Notas o aclaraciones sobre la orden de compra..."
                  rows={4}
                  {...field}
                  className="w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {/* Columna derecha: resumen */}
      <div>
        <div className="border border-slate-200 rounded-md overflow-hidden bg-white">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center gap-2 font-semibold text-slate-700">
            <Receipt className="h-5 w-5 text-slate-600" />
            Resumen
          </div>
          <div className="px-4 py-4 space-y-2 text-sm md:text-base">
            {/* Artículos y cantidad */}
            <div className="flex justify-between">
              <span>Artículos:</span>
              <span className="font-semibold">{resumen.tipos} tipo(s)</span>
            </div>
            <div className="flex justify-between">
              <span>Cantidad total:</span>
              <span className="font-semibold">
                {resumen.cantidadTotal} unidad(es)
              </span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">${format(resumen.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>IVA (21%):</span>
              <span className="font-semibold">${format(resumen.ivaMonto)}</span>
            </div>
            <div className="flex justify-between text-lg mt-2 font-bold border-t border-slate-200 pt-2">
              <span>Total:</span>
              <span className="text-blue-900">${format(resumen.total)}</span>
            </div>
            <div className="mt-3 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>Fecha de entrega:</span>
                <span className="font-medium">
                  {fechaEntrega ? (
                    fechaEntrega
                  ) : (
                    <span className="text-slate-400">Sin definir</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Condición de pago:</span>
                <span className="font-medium">
                  {condicionPago ? (
                    condicionPago
                  ) : (
                    <span className="text-slate-400">Sin definir</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Lugar de entrega:</span>
                <span className="font-medium">
                  {lugarEntrega ? (
                    lugarEntrega
                  ) : (
                    <span className="text-slate-400">Sin definir</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
