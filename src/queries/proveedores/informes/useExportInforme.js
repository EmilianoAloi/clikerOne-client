// import { useMutation } from "@tanstack/react-query";
// import { mutationFetchWithAuth } from "@/lib/utils";

// export const useExportInforme = (tipo) => {
//   return useMutation({
//     mutationFn: async (payload) => {
//       const response = await mutationFetchWithAuth({
//         url: `${
//           import.meta.env.VITE_API_URL
//         }/api/proveedores/informe/export/${tipo}`,
//         method: "POST",
//         body: payload,
//         raw: true,
//       });

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       const fecha = new Date();
//       const fechaStr = fecha
//         .toLocaleDateString("es-AR")
//         .split("/")
//         .reverse()
//         .join("-");
//       a.href = url;
//       a.download = `${fechaStr}-InformeOC.xlsx`;
//       a.click();
//       window.URL.revokeObjectURL(url);
//     },
//   });
// };

import { useMutation } from "@tanstack/react-query";
import { mutationFetchWithAuth } from "@/lib/utils";
import { toast } from "sonner";

export const useExportInforme = (tipo) => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await mutationFetchWithAuth({
        url: `${
          import.meta.env.VITE_API_URL
        }/api/proveedores/informe/export/${tipo}`,
        method: "POST",
        body: payload,
        raw: true,
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      const fecha = new Date();
      const fechaStr = fecha
        .toLocaleDateString("es-AR")
        .split("/")
        .reverse()
        .join("-");

      // elegir sufijo según tipo
      const sufijos = {
        oc: "OC",
        facturas: "Facturas",
        op: "OP",
      };
      const sufijo = sufijos[tipo] || tipo;

      a.href = url;
      a.download = `${fechaStr}-Informe${sufijo}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    onSuccess: () => toast.success("Informe exportado exitosamente"),
    onError: () => toast.error("Error al exportar informe"),
  });
};
