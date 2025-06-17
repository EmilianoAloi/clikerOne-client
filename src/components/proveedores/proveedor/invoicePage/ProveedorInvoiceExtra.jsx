import { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { FileUp, StickyNote, Calculator } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

export default function ProveedorInvoiceExtra({
  inputStyle = "",
  subtotal,
  iva,
  iibb,
  total,
  descuentoTotal,
}) {
  const { control, watch } = useFormContext();
  const url_factura_comprobante = watch("url_factura_comprobante");

  // Para filepond
  const [files, setFiles] = useState([]);
  useEffect(() => {
    const loadFromCloudinary = async () => {
      if (
        !url_factura_comprobante ||
        typeof url_factura_comprobante !== "string"
      )
        return;
      try {
        const res = await fetch(url_factura_comprobante);
        if (!res.ok) return;
        const blob = await res.blob();
        const extension = url_factura_comprobante.split(".").pop() || "pdf";
        const file = new File([blob], `comprobante.${extension}`, {
          type: blob.type,
        });
        setFiles([file]);
      } catch {
        setFiles([]);
      }
    };
    loadFromCloudinary();
  }, [url_factura_comprobante]);

  // Para el resumen
  const condicionPago = watch("condicion_venta") || "-";
  const iibbPorcentaje = watch("iibb_porcentaje") ?? 0;

  // Helper para formatear números
  const format = (n) =>
    Number(n || 0).toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
      {/* Columna izquierda */}
      <div className="flex flex-col pb-2">
        {/* Subir archivo */}
        <div>
          <Label
            htmlFor="archivo"
            className="text-sm font-semibold flex items-center gap-2 mb-2"
          >
            <FileUp className="h-4 w-4 text-slate-500" />
            Adjuntar comprobante de factura
          </Label>
        </div>
        <div className="filepond-container">
          <Controller
            control={control}
            name="url_factura_comprobante"
            render={({ field: { onChange } }) => (
              <FilePond
                files={files}
                onupdatefiles={(fileItems) => {
                  setFiles(fileItems.map((item) => item.file));
                  const file = fileItems[0]?.file;
                  if (file) {
                    onChange(file);
                  } else {
                    onChange(null);
                  }
                }}
                name="comprobante"
                labelIdle='Arrastrá tu comprobante o <span class="filepond--label-action">haz clic aquí</span>'
                acceptedFileTypes={["application/pdf", "image/*"]}
                allowImagePreview={true}
                className="filepond-minimal"
                maxFiles={1}
                credits={false}
              />
            )}
          />
        </div>

        {/* Observaciones */}
        <div className="mt-5">
          <Label
            htmlFor="observaciones"
            className="text-sm font-semibold mb-2 flex items-center gap-2"
          >
            <StickyNote className="h-4 w-4 text-slate-500" />
            Observaciones
          </Label>
          <Controller
            control={control}
            name="observaciones"
            render={({ field }) => (
              <Textarea
                id="observaciones"
                {...field}
                value={field.value ?? ""}
                rows={4}
                className={`!resize-none mt-1 ${inputStyle}`}
                placeholder="Notas adicionales de la factura..."
              />
            )}
          />
        </div>
      </div>

      {/* Columna derecha: resumen */}
      <div>
        <div className="border border-slate-200 rounded-md overflow-hidden">
          {/* Header */}
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center gap-2 font-semibold text-slate-700">
            <Calculator className="h-5 w-5 text-slate-600" />
            Resumen
          </div>
          {/* Contenido */}
          <div className="px-4 py-4 space-y-2 text-sm md:text-base">
            <div className="grid grid-cols-1 gap-x-6 gap-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>${format(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Descuento aplicado:
                </span>
                <span className="text-green-600">
                  ${format(descuentoTotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">IVA:</span>
                <span>${format(iva)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">IIBB:</span>
                <span>${format(iibb)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Condición de Venta:
                </span>
                <span>{condicionPago}</span>
              </div>
            </div>
            <div className="flex justify-between font-semibold text-base pt-2 border-t border-slate-200 mt-2">
              <span>Total:</span>
              <span>${format(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
