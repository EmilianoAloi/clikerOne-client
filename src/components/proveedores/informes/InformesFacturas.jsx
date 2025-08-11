// import { useMemo, useState } from "react";
// import {
//   Calculator,
//   CalendarCheck,
//   DollarSign,
//   Upload,
//   FileText,
//   Percent,
//   Search,
//   ShoppingCart,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import BadgeEstado from "@/components/ui/badge-custom";
// import { useExportInforme } from "@/queries/proveedores/informes/useExportInforme";

// const inputStyle =
//   "bg-white border border-gray-300 rounded-md shadow-sm !focus:outline-none !focus-visible:ring-1 !focus-visible:ring-gray-400";

// export default function InformesFacturas({ facturas }) {
//   const [fechaDesde, setFechaDesde] = useState("");
//   const [fechaHasta, setFechaHasta] = useState("");
//   const [busqueda, setBusqueda] = useState("");

//   const datos = useMemo(
//     () =>
//       facturas.map((f) => ({
//         id: f.id_factura,
//         numeroFactura: f.numero_factura,
//         razonSocial: f.proveedor_razon_social,
//         cuit: f.proveedor_cuit,
//         provincia: f.provincia,
//         fecha: f.fecha,
//         valorSinImpuestos: f.subtotal,
//         iva: f.iva,
//         otrosImpuestos: f.otros_impuestos_valor,
//         total: f.total,
//         estado: f.estado_saldo,
//       })),
//     [facturas]
//   );

//   // 2) Filtra usando fechaCreacion
//   const facturasFiltradas = useMemo(() => {
//     const desdeStr = fechaDesde?.trim() || null;
//     const hastaStr = fechaHasta?.trim() || null;
//     const txt = busqueda.trim().toLowerCase();

//     return datos.filter((o) => {
//       const fechaStr = o.fecha.slice(0, 10); // Asume formato 'YYYY-MM-DD' seguro

//       const okFecha =
//         (!desdeStr || fechaStr >= desdeStr) &&
//         (!hastaStr || fechaStr <= hastaStr);

//       const okTexto =
//         !txt ||
//         o.numeroFactura.toLowerCase().includes(txt) ||
//         o.razonSocial.toLowerCase().includes(txt) ||
//         o.cuit.includes(txt) ||
//         o.provincia?.toLowerCase().includes(txt);

//       return okFecha && okTexto;
//     });
//   }, [datos, fechaDesde, fechaHasta, busqueda]);

//   // Calcular totales
//   const totales = facturasFiltradas.reduce(
//     (acc, factura) => ({
//       valorSinImpuestos: acc.valorSinImpuestos + factura.valorSinImpuestos,
//       iva: acc.iva + factura.iva,
//       otrosImpuestos: acc.otrosImpuestos + factura.otrosImpuestos,
//       total: acc.total + factura.total,
//     }),
//     {
//       valorSinImpuestos: 0,
//       iva: 0,
//       otrosImpuestos: 0,
//       total: 0,
//     }
//   );

//   const formatearFecha = (fecha) => {
//     return fecha.split("-").reverse().join("/"); // "YYYY-MM-DD" → "DD/MM/YYYY"
//   };

//   const formatearMoneda = (valor) => {
//     return new Intl.NumberFormat("es-AR", {
//       style: "currency",
//       currency: "ARS",
//       minimumFractionDigits: 2,
//     }).format(valor);
//   };

//   const getEstadoBadge = (estado) => {
//     return <BadgeEstado estado={estado} className={"w-full"} />;
//   };

//   // 1. Hook para facturas
//   const exportFacturas = useExportInforme("facturas");

//   // 2. Adaptación del handler
//   const handleExportFacturas = () => {
//     // eslint-disable-next-line no-unused-vars
//     const { valorSinImpuestos, iva, otrosImpuestos, total } = totales;
//     const payload = {
//       filtros: { fechaDesde, fechaHasta },
//       resumen: {
//         totalFacturas: facturasFiltradas.length,
//         subtotal: valorSinImpuestos,
//         ivaTotal: iva,
//         totalGeneral: total,
//       },
//       facturas: facturasFiltradas,
//     };
//     console.log("Payload Facturas → backend:", payload);
//     exportFacturas.mutate(payload);
//   };

//   return (
//     <div className=" py-2 px-2 bg-slate-50 ">
//       {/* Filtros */}
//       <Card className="p-0 rounded-none border-l-0 border-r-0 border-t-0 border-b-0 shadow-none ">
//         <CardContent className="p-0 ">
//           <div
//             className="grid grid-cols-1 md:grid-cols-4 gap-4  border-0 shadow-none
//          px-4 py-3 pb-6 bg-slate-50 border"
//           >
//             <div className="space-y-2">
//               <Label className="text-sm flex items-center gap-2 text-gray-700 font-semibold mb-1">
//                 <CalendarCheck className="h-4 w-4 text-gray-700" />
//                 Fecha Desde:
//               </Label>
//               <Input
//                 id="fechaDesde"
//                 type="date"
//                 value={fechaDesde}
//                 onChange={(e) => setFechaDesde(e.target.value)}
//                 className={`w-full ${inputStyle}`}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label className="text-sm flex items-center gap-2 text-gray-700 font-semibold mb-1">
//                 <CalendarCheck className="h-4 w-4 text-gray-700" />
//                 Fechas Hasta:
//               </Label>
//               <Input
//                 id="fechaHasta"
//                 type="date"
//                 value={fechaHasta}
//                 onChange={(e) => setFechaHasta(e.target.value)}
//                 className={`w-full ${inputStyle}`}
//               />
//             </div>
//             <div className="space-y-2 md:col-span-2">
//               <Label className="text-sm flex items-center gap-2 text-gray-700 font-semibold mb-1">
//                 <Search className="h-4 w-4 text-gray-700" />
//                 Buscar
//               </Label>
//               <div className="relative">
//                 <Input
//                   id="busqueda"
//                   placeholder="Nº de Factura, Razón social o CUIT..."
//                   value={busqueda}
//                   onChange={(e) => setBusqueda(e.target.value)}
//                   className={`w-full ${inputStyle}`}
//                 />
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Resumen */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-3 px-4 pt-3 pb-9">
//         {/* Total Facturas */}
//         <Card className="py-1 shadow-lg">
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-2">
//               <FileText className="w-5 h-5 text-blue-600" />
//               <div>
//                 <p className="text-sm font-semibold text-gray-600">
//                   Total Facturas
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {facturasFiltradas.length}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Subtotal */}
//         <Card className="py-1 shadow-lg">
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-2">
//               <Calculator className="w-5 h-5 text-gray-600" />
//               <div>
//                 <p className="text-sm font-semibold text-gray-600">Subtotal</p>
//                 <p className="text-xl font-bold text-gray-900">
//                   {formatearMoneda(totales.valorSinImpuestos)}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* IVA Total */}
//         <Card className="py-1 shadow-lg">
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-2">
//               <Percent className="w-5 h-5 text-gray-600" />
//               <div>
//                 <p className="text-sm font-semibold text-gray-600">IVA Total</p>
//                 <p className="text-xl font-bold ">
//                   {formatearMoneda(totales.iva)}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Total General */}
//         <Card className="py-1 shadow-lg">
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-2">
//               <DollarSign className="w-5 h-5 text-red-600" />
//               <div>
//                 <p className="text-sm font-semibold text-gray-600">
//                   Total General
//                 </p>
//                 <p className="text-2xl font-bold text-red-600">
//                   {formatearMoneda(totales.total)}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Tabla de Facturas */}
//       <Card className="mx-4 mb-10">
//         <CardHeader>
//           <CardTitle>Detalle de Facturas</CardTitle>
//           <CardDescription>
//             Listado completo de facturas con información detallada de impuestos.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto">
//             <Table className="border ">
//               <TableHeader>
//                 <TableRow className="bg-gray-50">
//                   <TableHead className=" px-3 py-2 text-left font-semibold text-gray-700 w-[120px]">
//                     Nº de Factura
//                   </TableHead>
//                   <TableHead className=" py-2 text-left font-semibold text-gray-700 min-w-[200px]">
//                     Razón Social
//                   </TableHead>
//                   <TableHead className=" py-2 text-left font-semibold text-gray-700 w-[120px]">
//                     CUIT
//                   </TableHead>
//                   <TableHead className=" py-2 text-left font-semibold text-gray-700 max-w-[200px]">
//                     Provincia
//                   </TableHead>
//                   <TableHead className=" py-2 text-left font-semibold text-gray-700 w-[120px]">
//                     Fecha Creación
//                   </TableHead>
//                   <TableHead className="ps-4 py-2 text-left font-semibold text-gray-700 w-[120px]">
//                     Estado
//                   </TableHead>
//                   <TableHead className=" py-2 text-right font-semibold text-gray-700 w-[120px]">
//                     Subtotal
//                   </TableHead>
//                   <TableHead className=" py-2 text-right font-semibold text-gray-700 w-[120px]">
//                     IVA
//                   </TableHead>
//                   <TableHead className=" py-2 text-right font-semibold text-gray-700 w-[120px]">
//                     Otros Imp.
//                   </TableHead>
//                   <TableHead className=" py-2 text-right font-semibold text-gray-700 w-[120px]">
//                     Total Factura
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {facturasFiltradas.map((factura, i) => (
//                   <TableRow
//                     key={i}
//                     className="hover:bg-gray-50 transition-colors "
//                   >
//                     <TableCell className="px-3 py-4 font-mono text-sm font-medium">
//                       {factura.numeroFactura}
//                     </TableCell>
//                     <TableCell className="font-medium">
//                       {factura.razonSocial}
//                     </TableCell>
//                     <TableCell className="font-mono text-sm">
//                       {factura.cuit}
//                     </TableCell>
//                     <TableCell className=" text-sm">
//                       {factura.provincia}
//                     </TableCell>
//                     <TableCell className=" text-sm">
//                       {formatearFecha(factura.fecha)}
//                     </TableCell>

//                     <TableCell className="">
//                       {getEstadoBadge(factura.estado)}
//                     </TableCell>
//                     <TableCell className="text-right font-mono">
//                       {formatearMoneda(factura.valorSinImpuestos)}
//                     </TableCell>
//                     <TableCell className="text-right font-mono text-orange-600">
//                       {formatearMoneda(factura.iva)}
//                     </TableCell>
//                     <TableCell className="text-right font-mono">
//                       {formatearMoneda(factura.otrosImpuestos)}
//                     </TableCell>
//                     <TableCell className="text-right font-mono font-semibold">
//                       {formatearMoneda(factura.total)}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>

//           {/* Totales al pie */}
//           {/* Pie de totales */}
//           <div className=" p-4 flex justify-between items-center border border-t-0">
//             <p className="text-lg font-semibold text-gray-600">
//               {facturasFiltradas.length} Facturas
//             </p>
//             <div className="text-right">
//               <p className="text-sm font-semibold text-gray-600">
//                 Total General
//               </p>
//               <p className="text-2xl font-bold text-red-600">
//                 {formatearMoneda(totales.total)}
//               </p>
//             </div>
//           </div>

//           {facturasFiltradas.length === 0 && (
//             <div className="text-center py-8">
//               <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-500">
//                 No se encontraron órdenes con los filtros aplicados
//               </p>
//             </div>
//           )}

//           <Button
//             className="w-full mt-6 gap-2 bg-slate-800 hover:bg-gray-700 text-white text-sm font-semibold rounded-sm cursor-pointer py-5"
//             onClick={handleExportFacturas}
//             disabled={exportFacturas.isLoading}
//           >
//             <Upload className="h-4 w-4" />
//             {exportFacturas.isLoading
//               ? "Generando..."
//               : "Exportar Informe Facturas"}
//           </Button>

//           {facturasFiltradas.length === 0 && (
//             <div className="text-center py-8">
//               <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-500">
//                 No se encontraron facturas con los filtros aplicados
//               </p>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
// InformesFacturas.jsx
import React, { useMemo, useState } from "react";
import {
  Calculator,
  CalendarCheck,
  DollarSign,
  Upload,
  FileText,
  Percent,
  Search,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BadgeEstado from "@/components/ui/badge-custom";
import { useExportInforme } from "@/queries/proveedores/informes/useExportInforme";

const inputStyle =
  "bg-white border border-gray-300 rounded-md shadow-sm !focus:outline-none !focus-visible:ring-1 !focus-visible:ring-gray-400";

export default function InformesFacturas({ facturas = [] }) {
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const datos = useMemo(() => {
    return facturas.map((f) => {
      // calcular valor sin impuestos
      const valorSinImpuestos = f.items.reduce((sum, it) => {
        const qty = parseFloat(it.cantidad) || 0;
        const pu = parseFloat(it.precio_unitario) || 0;
        const desc = parseFloat(it.valor_descuento) || 0;
        return sum + (qty * pu - desc);
      }, 0);
      // calcular IVA
      const iva = f.items.reduce((sum, it) => {
        const base =
          (parseFloat(it.cantidad) || 0) *
            (parseFloat(it.precio_unitario) || 0) -
          (parseFloat(it.valor_descuento) || 0);
        const rate = (parseFloat(it.iva) || 0) / 100;
        return sum + base * rate;
      }, 0);
      // calcular otros impuestos
      const otrosImpuestos = f.impuestos.reduce(
        (sum, imp) => sum + (parseFloat(imp.monto) || 0),
        0
      );
      // total desde API fallback
      const total =
        parseFloat(f.monto_total) || valorSinImpuestos + iva + otrosImpuestos;

      return {
        id: f.id_factura,
        numeroFactura: f.numero_factura,
        razonSocial: f.proveedor_razon_social,
        cuit: f.proveedor_cuit,
        provincia: f.proveedor_provincia,
        fecha: f.fecha_emision,
        valorSinImpuestos,
        iva,
        otrosImpuestos,
        total,
        estado: f.estado_saldo,
      };
    });
  }, [facturas]);

  const facturasFiltradas = useMemo(() => {
    const txt = busqueda.trim().toLowerCase();
    return datos.filter((o) => {
      const fechaStr = o.fecha ? o.fecha.slice(0, 10) : "";
      const okFecha =
        (!fechaDesde || fechaStr >= fechaDesde) &&
        (!fechaHasta || fechaStr <= fechaHasta);
      const okTexto =
        !txt ||
        o.numeroFactura.toLowerCase().includes(txt) ||
        o.razonSocial.toLowerCase().includes(txt) ||
        o.cuit.includes(txt) ||
        o.provincia.toLowerCase().includes(txt);
      return okFecha && okTexto;
    });
  }, [datos, fechaDesde, fechaHasta, busqueda]);

  const totales = facturasFiltradas.reduce(
    (acc, f) => ({
      valorSinImpuestos: acc.valorSinImpuestos + f.valorSinImpuestos,
      iva: acc.iva + f.iva,
      otrosImpuestos: acc.otrosImpuestos + f.otrosImpuestos,
      total: acc.total + f.total,
    }),
    { valorSinImpuestos: 0, iva: 0, otrosImpuestos: 0, total: 0 }
  );

  const formatearFecha = (fecha) =>
    fecha ? fecha.split("-").reverse().join("/") : "-";
  const formatearMoneda = (v) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(v);
  const getEstadoBadge = (estado) => (
    <BadgeEstado estado={estado} className="w-full" />
  );

  const exportFacturas = useExportInforme("facturas");
  const handleExportFacturas = () => {
    exportFacturas.mutate({
      filtros: { fechaDesde, fechaHasta },
      resumen: {
        totalFacturas: facturasFiltradas.length,
        subtotal: totales.valorSinImpuestos,
        ivaTotal: totales.iva,
        totalGeneral: totales.total,
      },
      facturas: facturasFiltradas,
    });
  };

  return (
    <div className="py-2 px-2 bg-slate-50">
      {/* Filtros */}
      <Card className="p-0 rounded-none border-0 shadow-none">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 py-3 pb-6 bg-slate-50 border">
            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-2 font-semibold text-gray-700 mb-1">
                <CalendarCheck className="h-4 w-4 text-gray-700" />
                Fecha Desde:
              </Label>
              <Input
                type="date"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}
                className={inputStyle}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-2 font-semibold text-gray-700 mb-1">
                <CalendarCheck className="h-4 w-4 text-gray-700" />
                Fecha Hasta:
              </Label>
              <Input
                type="date"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}
                className={inputStyle}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="text-sm flex items-center gap-2 font-semibold text-gray-700 mb-1">
                <Search className="h-4 w-4 text-gray-700" />
                Buscar
              </Label>
              <Input
                placeholder="Nº de factura, Razón social o CUIT..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className={inputStyle}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 px-4 pt-3 pb-9">
        <Card className="py-1 shadow-lg">
          <CardContent className="p-4 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Total Facturas
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {facturasFiltradas.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="py-1 shadow-lg">
          <CardContent className="p-4 flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-semibold text-gray-600">Subtotal</p>
              <p className="text-xl font-bold text-gray-900">
                {formatearMoneda(totales.valorSinImpuestos)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="py-1 shadow-lg">
          <CardContent className="p-4 flex items-center space-x-2">
            <Percent className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-semibold text-gray-600">IVA Total</p>
              <p className="text-xl font-bold text-gray-900">
                {formatearMoneda(totales.iva)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="py-1 shadow-lg">
          <CardContent className="p-4 flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Total General
              </p>
              <p className="text-2xl font-bold text-red-600">
                {formatearMoneda(totales.total)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla */}
      <Card className="mx-4 mb-10">
        <CardHeader>
          <CardTitle>Detalle de Facturas</CardTitle>
          <CardDescription>
            Listado completo de facturas con información detallada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="w-full border">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="px-3 py-2 text-left font-semibold text-gray-700 w-[120px]">
                    Nº de Factura
                  </TableHead>
                  <TableHead className="py-2 text-left font-semibold text-gray-700 min-w-[200px]">
                    Razón Social
                  </TableHead>
                  <TableHead className="py-2 text-left font-semibold text-gray-700 w-[120px]">
                    CUIT
                  </TableHead>
                  <TableHead className="py-2 text-left font-semibold text-gray-700 max-w-[200px]">
                    Provincia
                  </TableHead>
                  <TableHead className="py-2 text-left font-semibold text-gray-700 w-[120px]">
                    Fecha
                  </TableHead>
                  <TableHead className="ps-4 py-2 text-left font-semibold text-gray-700 w-[120px]">
                    Estado
                  </TableHead>
                  <TableHead className="py-2 text-right font-semibold text-gray-700 w-[120px]">
                    Subtotal
                  </TableHead>
                  <TableHead className="py-2 text-right font-semibold text-gray-700 w-[120px]">
                    IVA
                  </TableHead>
                  <TableHead className="py-2 text-right font-semibold text-gray-700 w-[120px]">
                    Otros Imp.
                  </TableHead>
                  <TableHead className="py-2 text-right font-semibold text-gray-700 w-[120px]">
                    Total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facturasFiltradas.map((f, i) => (
                  <TableRow key={i} className="hover:bg-gray-50">
                    <TableCell className="px-3 py-4 font-mono text-sm">
                      {f.numeroFactura}
                    </TableCell>
                    <TableCell className="font-medium">
                      {f.razonSocial}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {f.cuit}
                    </TableCell>
                    <TableCell className="text-sm">{f.provincia}</TableCell>
                    <TableCell className="text-sm">
                      {formatearFecha(f.fecha)}
                    </TableCell>
                    <TableCell>{getEstadoBadge(f.estado)}</TableCell>
                    <TableCell className="text-right font-mono">
                      {formatearMoneda(f.valorSinImpuestos)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatearMoneda(f.iva)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatearMoneda(f.otrosImpuestos)}
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      {formatearMoneda(f.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="p-4 flex justify-between items-center border-t">
            <p className="text-lg font-semibold text-gray-600">
              {facturasFiltradas.length} Facturas
            </p>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-600">
                Total General
              </p>
              <p className="text-2xl font-bold text-red-600">
                {formatearMoneda(totales.total)}
              </p>
            </div>
          </div>

          {facturasFiltradas.length === 0 && (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No se encontraron facturas con los filtros aplicados
              </p>
            </div>
          )}

          <Button
            className="w-full mt-6 gap-2 bg-slate-800 hover:bg-gray-700 text-white text-sm font-semibold py-5"
            onClick={handleExportFacturas}
            disabled={exportFacturas.isLoading}
          >
            <Upload className="h-4 w-4" />
            {exportFacturas.isLoading
              ? "Generando..."
              : "Exportar Informe Facturas"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
