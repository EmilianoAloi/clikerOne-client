import { useEffect } from "react";
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
  otrosImpuestos,
  total,
  descuentoTotal,
  files,
  setFiles,
}) {
  const { control, watch } = useFormContext();
  const url_factura_comprobante = watch("url_factura_comprobante");
  const condicionPago = watch("condicion_venta") || "-";

  // Solo lógica para mostrar archivo remoto
  useEffect(() => {
    if (
      url_factura_comprobante &&
      typeof url_factura_comprobante === "string"
    ) {
      setFiles([
        {
          source: url_factura_comprobante,
          options: {
            type: "local",
            file: {
              name:
                url_factura_comprobante.split("/").pop()?.split("?")[0] ||
                "comprobante.pdf",
              type: "application/pdf",
            },
          },
        },
      ]);
    } else {
      setFiles([]);
    }
    // eslint-disable-next-line
  }, [url_factura_comprobante]);

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
            render={() => (
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={false}
                maxFiles={1}
                allowRevert={false}
                allowProcess={false}
                acceptedFileTypes={["application/pdf", "image/*"]}
                labelIdle='Arrastrá tu comprobante o <span class="filepond--label-action">haz clic aquí</span>'
                className="filepond-minimal"
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
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center gap-2 font-semibold text-slate-700">
            <Calculator className="h-5 w-5 text-slate-600" />
            Resumen
          </div>
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
                <span className="text-muted-foreground">Otros Impuestos:</span>
                <span>${format(otrosImpuestos)}</span>
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
