import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { FileUp, StickyNote, Receipt } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// filepond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

const ProveedorOPExtras = ({
  formData,
  inputStyle,
  handleFileChange,
  handleChange,
  resumen,
}) => {
  const format = (n) => Number(n || 0).toFixed(2);

  const [files, setFiles] = useState([]);

  useEffect(() => {
    const loadFromCloudinary = async () => {
      const url = formData.url_comprobante_pago;
      if (!url) return;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("❌ No se pudo descargar el archivo");

        const blob = await res.blob();
        const extension = url.split(".").pop() || "pdf";

        const file = new File([blob], `comprobante.${extension}`, {
          type: blob.type,
        });

        setFiles([file]);
        setTimeout(() => {
          const pondItems = document.querySelectorAll(".filepond--file");
          pondItems.forEach((item) => {
            item.addEventListener("click", () => {
              window.open(url, "_blank");
            });
          });
        }, 500);
      } catch (error) {
        console.error("❌ Error al cargar archivo desde Cloudinary:", error);
        setFiles([]);
      }
    };

    loadFromCloudinary();
  }, [formData.url_comprobante_pago]);

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
            Adjuntar comprobantes de pago
          </Label>
        </div>

        <div className="filepond-container">
          <FilePond
            files={files}
            onupdatefiles={(fileItems) => {
              const updatedFiles = fileItems.map((item) => item.file);
              setFiles(updatedFiles);

              // Simular input change para integración
              const fakeInputEvent = {
                target: { files: updatedFiles },
              };
              handleFileChange(fakeInputEvent);
            }}
            name="comprobantes"
            labelIdle='Arrastrá los archivos o <span class="filepond--label-action">hacé clic aquí</span>'
            acceptedFileTypes={["application/pdf", "image/*"]}
            allowMultiple={true}
            allowImagePreview={true}
            className="filepond-minimal"
            credits={false}
          />
        </div>

        {/* Observaciones */}
        <div className="">
          <Label
            htmlFor="observaciones"
            className="text-sm font-semibold mb-2 flex items-center gap-2"
          >
            <StickyNote className="h-4 w-4 text-slate-500" />
            Observaciones
          </Label>
          <Textarea
            id="observaciones"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            rows={3}
            className={`!resize-none mt-1 ${inputStyle}`}
            placeholder="Notas adicionales sobre esta orden de pago..."
          />
        </div>
      </div>

      {/* Columna derecha: resumen */}
      <div>
        <div className="border border-slate-200 rounded-md overflow-hidden mt-7">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center gap-2 font-semibold text-slate-700">
            <Receipt className="h-5 w-5 text-slate-600" />
            Resumen
          </div>

          <div className="px-4 py-4 space-y-2 text-sm md:text-base">
            <div className="grid grid-cols-1 gap-x-6 gap-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Facturas:</span>
                <span>{resumen.facturasSeleccionadas} factura(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total a cancelar:</span>
                <span>${format(resumen.totalFacturas)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pagos agregados:</span>
                <span>${format(resumen.totalPagos)}</span>
              </div>
            </div>

            <div className="flex justify-between font-semibold text-base pt-2 border-t border-slate-200 mt-2">
              <span>Diferencia:</span>
              <span
                className={
                  resumen.totalPagos !== resumen.totalFacturas
                    ? "text-red-600"
                    : ""
                }
              >
                ${format(resumen.totalPagos - resumen.totalFacturas)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProveedorOPExtras;
