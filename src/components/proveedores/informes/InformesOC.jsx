import { useState } from "react";
import {
  ShoppingCart,
  Search,
  Calendar,
  MapPin,
  CalendarCheck,
  Upload,
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
import { Badge } from "@/components/ui/badge";
// import * as XLSX from "xlsx";

const inputStyle =
  "bg-white border border-gray-300 rounded-md shadow-sm !focus:outline-none !focus-visible:ring-1 !focus-visible:ring-gray-400";

// Datos de ejemplo para las órdenes de compra
const ordenesMock = [
  {
    numeroOC: "OC-2025-001",
    razonSocial: "Plaswag SA",
    cuit: "30-12345678-9",
    fechaEntrega: "2025-02-15",
    condicionPago: "30 días",
    lugarEntrega: "Depósito Central - Buenos Aires",
    total: 125400.0,
    estado: "Pendiente",
  },
  {
    numeroOC: "OC-2025-002",
    razonSocial: "Distribuidora Norte SRL",
    cuit: "30-87654321-0",
    fechaEntrega: "2025-02-20",
    condicionPago: "Contado",
    lugarEntrega: "Sucursal Rosario",
    total: 67800.0,
    estado: "Confirmada",
  },
  {
    numeroOC: "OC-2025-003",
    razonSocial: "Materiales del Sur SA",
    cuit: "30-11223344-5",
    fechaEntrega: "2025-02-18",
    condicionPago: "60 días",
    lugarEntrega: "Planta Industrial - Córdoba",
    total: 189600.0,
    estado: "En proceso",
  },
  {
    numeroOC: "OC-2025-004",
    razonSocial: "Comercial Este Ltda",
    cuit: "30-99887766-1",
    fechaEntrega: "2025-02-25",
    condicionPago: "15 días",
    lugarEntrega: "Almacén La Plata",
    total: 94200.0,
    estado: "Pendiente",
  },
  {
    numeroOC: "OC-2025-005",
    razonSocial: "Insumos Industriales SA",
    cuit: "30-55443322-7",
    fechaEntrega: "2025-02-22",
    condicionPago: "45 días",
    lugarEntrega: "Centro de Distribución - Mendoza",
    total: 156800.0,
    estado: "Confirmada",
  },
];

export default function InformesOC() {
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [busqueda, setBusqueda] = useState("");

  // Filtrar órdenes según criterios
  const ordenesFiltradas = ordenesMock.filter((orden) => {
    const cumpleFecha =
      (!fechaDesde || orden.fechaEntrega >= fechaDesde) &&
      (!fechaHasta || orden.fechaEntrega <= fechaHasta);
    const cumpleBusqueda =
      !busqueda ||
      orden.numeroOC.toLowerCase().includes(busqueda.toLowerCase()) ||
      orden.razonSocial.toLowerCase().includes(busqueda.toLowerCase()) ||
      orden.cuit.includes(busqueda) ||
      orden.lugarEntrega.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleFecha && cumpleBusqueda;
  });

  // Calcular total general
  const totalGeneral = ordenesFiltradas.reduce((sum, o) => sum + o.total, 0);

  // Exportar a Excel
  // const exportarAExcel = () => {
  //   // const datosParaExcel = ordenesFiltradas.map((orden) => ({
  //   //   "Nº de OC": orden.numeroOC,
  //   //   "Razón Social": orden.razonSocial,
  //   //   CUIT: orden.cuit,
  //   //   "Fecha de Entrega": orden.fechaEntrega,
  //   //   "Condición de Pago": orden.condicionPago,
  //   //   "Lugar de Entrega": orden.lugarEntrega,
  //   //   "Total de la Orden": orden.total,
  //   //   Estado: orden.estado,
  //   // }));
  //   // datosParaExcel.push({
  //   //   "Nº de OC": "",
  //   //   "Razón Social": "",
  //   //   CUIT: "",
  //   //   "Fecha de Entrega": "",
  //   //   "Condición de Pago": "",
  //   //   "Lugar de Entrega": "TOTAL GENERAL:",
  //   //   "Total de la Orden": totalGeneral,
  //   //   Estado: "",
  //   // });
  //   // const ws = XLSX.utils.json_to_sheet(datosParaExcel);
  //   // const wb = XLSX.utils.book_new();
  //   // XLSX.utils.book_append_sheet(wb, ws, "Informe OC");
  //   // const fechaHoy = new Date().toISOString().split("T")[0];
  //   // XLSX.writeFile(wb, `informe_ordenes_compra_${fechaHoy}.xlsx`);
  // };

  const formatearMoneda = (valor) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(valor);

  const formatearFecha = (fecha) =>
    new Date(fecha).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return (
    <div className=" py-2 px-2 bg-slate-50 ">
      {/* Filtros */}
      <Card className="p-0 rounded-none border-l-0 border-r-0 border-t-0 border-b-0 shadow-none ">
        <CardContent className="p-0 ">
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-4  border-0 shadow-none
         px-4 py-3 pb-6 bg-slate-50 border"
          >
            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-2 text-gray-700 font-semibold mb-1">
                <CalendarCheck className="h-4 w-4 text-gray-700" />
                Fecha Desde:
              </Label>
              <Input
                id="fechaDesde"
                type="date"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}
                className={`w-full ${inputStyle}`}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-2 text-gray-700 font-semibold mb-1">
                <CalendarCheck className="h-4 w-4 text-gray-700" />
                Fechas Hasta:
              </Label>
              <Input
                id="fechaHasta"
                type="date"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}
                className={`w-full ${inputStyle}`}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="text-sm flex items-center gap-2 text-gray-700 font-semibold mb-1">
                <Search className="h-4 w-4 text-gray-700" />
                Buscar
              </Label>
              <div className="relative">
                <Input
                  id="busqueda"
                  placeholder="sadasdadadas"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className={`w-full ${inputStyle}`}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 px-4 pt-3 pb-9">
        <Card className="py-1 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Total Órdenes
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {ordenesFiltradas.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="py-1 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Promedio por Orden
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {ordenesFiltradas.length > 0
                    ? formatearMoneda(totalGeneral / ordenesFiltradas.length)
                    : "ARS 0,00"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="py-1 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Ordenes Entregadas
                </p>
                <p className="text-2xl font-bold ">16</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="py-1 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Total General
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatearMoneda(totalGeneral)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla OC */}
      <Card className="mx-4 mb-10">
        <CardHeader>
          <CardTitle>Detalle de Ordenes de Compra</CardTitle>
          <CardDescription>Listado completo con entrega y pago</CardDescription>
        </CardHeader>
        <CardContent className="">
          <div className="overflow-x-auto">
            <Table className="border ">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="px-3 py-2 text-left font-semibold text-gray-700 w-[120px]">
                    Nº de OC
                  </TableHead>
                  <TableHead className="px-3 py-2 text-left font-semibold text-gray-700 min-w-[200px]">
                    Razón Social
                  </TableHead>
                  <TableHead className="px-3 py-2 text-left font-semibold text-gray-700 w-[120px]">
                    CUIT
                  </TableHead>
                  <TableHead className="px-3 py-2 text-left font-semibold text-gray-700 w-[120px]">
                    Fecha Entrega
                  </TableHead>
                  <TableHead className="px-3 py-2 text-left font-semibold text-gray-700 w-[120px]">
                    Condición Pago
                  </TableHead>
                  <TableHead className="px-3 py-2 text-left font-semibold text-gray-700 min-w-[200px]">
                    Lugar Entrega
                  </TableHead>
                  <TableHead className="px-3 py-2 text-right font-semibold text-gray-700 w-[130px]">
                    Total Orden
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordenesFiltradas.map((orden, idx) => (
                  <TableRow
                    key={idx}
                    className="hover:bg-gray-50 transition-colors "
                  >
                    <TableCell className="px-3 py-4 font-mono text-sm font-medium">
                      {orden.numeroOC}
                    </TableCell>
                    <TableCell className="px-3 py-4 font-medium">
                      {orden.razonSocial}
                    </TableCell>
                    <TableCell className="px-3 py-4 font-mono text-sm">
                      {orden.cuit}
                    </TableCell>
                    <TableCell className="px-3 py-4 font-mono text-sm">
                      {formatearFecha(orden.fechaEntrega)}
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      <Badge variant="outline" className="text-xs">
                        {orden.condicionPago}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-3 py-4 text-sm flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>{orden.lugarEntrega}</span>
                    </TableCell>
                    <TableCell className="px-3 py-4 text-right font-mono font-semibold">
                      {formatearMoneda(orden.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pie de totales */}
          <div className=" p-4 flex justify-between border border-t-0">
            <p className="text-lg font-semibold text-gray-600">
              Total de {ordenesFiltradas.length} Ordenes de compra
            </p>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-600">
                Total General
              </p>
              <p className="text-2xl font-bold text-green-600">
                {formatearMoneda(totalGeneral)}
              </p>
            </div>
          </div>

          {ordenesFiltradas.length === 0 && (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No se encontraron órdenes con los filtros aplicados
              </p>
            </div>
          )}

          <Button className="w-full mt-6 gap-2 bg-slate-800 hover:bg-gray-700 text-white text-sm font-semibold rounded-sm cursor-pointer py-5">
            <Upload className="h-4 w-4" />
            Exportar Informe Excel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
