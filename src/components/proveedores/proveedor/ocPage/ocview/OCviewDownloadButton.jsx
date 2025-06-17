import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pdf } from "@react-pdf/renderer";
import OCviewPdf from "./OCviewPdf";

export default function OCviewDownloadButton({ orden }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(<OCviewPdf orden={orden} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `orden-compra-${orden.id_orden_compra}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generando PDF:", error);
      alert("Error al generar el PDF. Por favor, intenta de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={generatePDF}
      disabled={isGenerating}
      className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
    >
      <Download className="mr-2 h-4 w-4" />
      {isGenerating ? "Generando PDF..." : "Descargar Comprobante"}
    </Button>
  );
}
