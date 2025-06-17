import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { FileUp, StickyNote } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// FilePond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

export const ProveedorNDExtras = ({
  formData,
  setFormData,
  handleFileChange,
}) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const loadFromUrl = async () => {
      const url = formData.url_factura_comprobante;
      if (!url) return;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("No se pudo descargar el archivo");

        const blob = await res.blob();
        const extension = url.split(".").pop() || "pdf";
        const file = new File([blob], `comprobante.${extension}`, {
          type: blob.type,
        });

        setFiles([file]);
      } catch (error) {
        console.log(error);
        setFiles([]);
      }
    };
    loadFromUrl();
  }, [formData.url_factura_comprobante]);

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="flex flex-col w-full">
          <Label className="text-sm font-semibold flex items-center gap-2 mb-2">
            <FileUp className="h-4 w-4 text-slate-500" />
            Adjuntar comprobante de Nota de débito
          </Label>
          <div className="filepond-container w-full h-[120px]">
            <FilePond
              files={files}
              onupdatefiles={(fileItems) => {
                setFiles(fileItems.map((item) => item.file));
                const file = fileItems[0]?.file;
                if (file) {
                  handleFileChange({
                    target: { files: [file] },
                  });
                }
              }}
              name="comprobante"
              labelIdle='Arrastrá el comprobante o <span class="filepond--label-action">hacé clic aquí</span>'
              acceptedFileTypes={["application/pdf", "image/*"]}
              allowImagePreview={true}
              className="filepond-minimal pond-equal-height h-full"
              maxFiles={1}
              credits={false}
            />
          </div>
        </div>
        <div className="w-full">
          <Label className="flex items-center gap-2 font-semibold text-sm mb-2">
            <StickyNote className="h-4 w-4 text-slate-500" />
            Observaciones de Nota de débito
          </Label>
          <Textarea
            id="observaciones"
            placeholder="Notas o aclaraciones sobre la nota de débito..."
            rows={4}
            value={formData.observaciones}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                observaciones: e.target.value,
              }))
            }
            className="w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default ProveedorNDExtras;
