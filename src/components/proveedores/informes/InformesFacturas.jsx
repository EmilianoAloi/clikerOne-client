import { useState } from "react";
import { Download, FileText, Search } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
// import * as XLSX from "xlsx";

// Datos de ejemplo para las facturas
const facturasMock = [
  {
    numeroFactura: "0001-00000123",
    razonSocial: "Plaswag SA",
    cuit: "30-12345678-9",
    localidad: "Buenos Aires",
    valorSinImpuestos: 85000.0,
    iva: 17850.0,
    otrosImpuestos: 2550.0,
    total: 105400.0,
    fecha: "2025-01-15",
  },
  {
    numeroFactura: "0001-00000124",
    razonSocial: "Distribuidora Norte SRL",
    cuit: "30-87654321-0",
    localidad: "Rosario",
    valorSinImpuestos: 45000.0,
    iva: 9450.0,
    otrosImpuestos: 1350.0,
    total: 55800.0,
    fecha: "2025-01-14",
  },
  {
    numeroFactura: "0001-00000125",
    razonSocial: "Materiales del Sur SA",
    cuit: "30-11223344-5",
    localidad: "Córdoba",
    valorSinImpuestos: 120000.0,
    iva: 25200.0,
    otrosImpuestos: 3600.0,
    total: 148800.0,
    fecha: "2025-01-13",
  },
  {
    numeroFactura: "0001-00000126",
    razonSocial: "Comercial Este Ltda",
    cuit: "30-99887766-1",
    localidad: "La Plata",
    valorSinImpuestos: 67500.0,
    iva: 14175.0,
    otrosImpuestos: 2025.0,
    total: 83700.0,
    fecha: "2025-01-12",
  },
  {
    numeroFactura: "0001-00000127",
    razonSocial: "Insumos Industriales SA",
    cuit: "30-55443322-7",
    localidad: "Mendoza",
    valorSinImpuestos: 95000.0,
    iva: 19950.0,
    otrosImpuestos: 2850.0,
    total: 117800.0,
    fecha: "2025-01-11",
  },
];

export default function InformesFacturas() {
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [busqueda, setBusqueda] = useState("");

  // Filtrar facturas según los criterios
  const facturasFiltradas = facturasMock.filter((factura) => {
    const cumpleFecha =
      (!fechaDesde || factura.fecha >= fechaDesde) &&
      (!fechaHasta || factura.fecha <= fechaHasta);
    const cumpleBusqueda =
      !busqueda ||
      factura.numeroFactura.toLowerCase().includes(busqueda.toLowerCase()) ||
      factura.razonSocial.toLowerCase().includes(busqueda.toLowerCase()) ||
      factura.cuit.includes(busqueda);

    return cumpleFecha && cumpleBusqueda;
  });

  // Calcular totales
  const totales = facturasFiltradas.reduce(
    (acc, factura) => ({
      valorSinImpuestos: acc.valorSinImpuestos + factura.valorSinImpuestos,
      iva: acc.iva + factura.iva,
      otrosImpuestos: acc.otrosImpuestos + factura.otrosImpuestos,
      total: acc.total + factura.total,
    }),
    {
      valorSinImpuestos: 0,
      iva: 0,
      otrosImpuestos: 0,
      total: 0,
    }
  );

  // Función para exportar a Excel
  const exportarAExcel = () => {
    const datosParaExcel = facturasFiltradas.map((factura) => ({
      "Nº de Factura": factura.numeroFactura,
      "Razón Social": factura.razonSocial,
      CUIT: factura.cuit,
      Localidad: factura.localidad,
      "Valor sin Impuestos": factura.valorSinImpuestos,
      IVA: factura.iva,
      "Otros Impuestos": factura.otrosImpuestos,
      Total: factura.total,
      Fecha: factura.fecha,
    }));

    // Agregar fila de totales
    datosParaExcel.push({
      "Nº de Factura": "",
      "Razón Social": "",
      CUIT: "",
      Localidad: "TOTALES:",
      "Valor sin Impuestos": totales.valorSinImpuestos,
      IVA: totales.iva,
      "Otros Impuestos": totales.otrosImpuestos,
      Total: totales.total,
      Fecha: "",
    });

    // const worksheet = XLSX.utils.json_to_sheet(datosParaExcel);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Informe de Facturas");

    // const fechaActual = new Date().toISOString().split("T")[0];
    // XLSX.writeFile(workbook, `informe_facturas_${fechaActual}.xlsx`);
  };

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(valor);
  };

  return (
    <div className="space-y-6">
      {/* Header del Tab */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Informes de Facturas
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Reporte detallado de facturas de proveedores con totales y
            exportación
          </p>
        </div>
        <Button
          onClick={exportarAExcel}
          className="bg-green-600 hover:bg-green-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar a Excel
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros de Búsqueda</CardTitle>
          <CardDescription>
            Utiliza los filtros para refinar tu búsqueda de facturas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fechaDesde">Fecha Desde</Label>
              <Input
                id="fechaDesde"
                type="date"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fechaHasta">Fecha Hasta</Label>
              <Input
                id="fechaHasta"
                type="date"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="busqueda">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="busqueda"
                  placeholder="Buscar por factura, razón social o CUIT..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Facturas
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {facturasFiltradas.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Subtotal</p>
              <p className="text-xl font-bold text-gray-900">
                {formatearMoneda(totales.valorSinImpuestos)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm font-medium text-gray-600">IVA Total</p>
              <p className="text-xl font-bold text-orange-600">
                {formatearMoneda(totales.iva)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Total General</p>
              <p className="text-2xl font-bold text-green-600">
                {formatearMoneda(totales.total)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Facturas */}
      <Card>
        <CardHeader>
          <CardTitle>Detalle de Facturas</CardTitle>
          <CardDescription>
            Listado completo de facturas con información detallada de impuestos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Nº de Factura</TableHead>
                  <TableHead className="min-w-[200px]">Razón Social</TableHead>
                  <TableHead className="w-[120px]">CUIT</TableHead>
                  <TableHead className="w-[120px]">Localidad</TableHead>
                  <TableHead className="text-right w-[130px]">
                    Valor s/Imp.
                  </TableHead>
                  <TableHead className="text-right w-[100px]">IVA</TableHead>
                  <TableHead className="text-right w-[120px]">
                    Otros Imp.
                  </TableHead>
                  <TableHead className="text-right w-[130px]">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facturasFiltradas.map((factura, i) => (
                  <TableRow key={i} className="hover:bg-gray-50">
                    <TableCell className="font-mono text-sm">
                      {factura.numeroFactura}
                    </TableCell>
                    <TableCell className="font-medium">
                      {factura.razonSocial}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {factura.cuit}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {factura.localidad}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatearMoneda(factura.valorSinImpuestos)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-orange-600">
                      {formatearMoneda(factura.iva)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatearMoneda(factura.otrosImpuestos)}
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      {formatearMoneda(factura.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Totales al pie */}
          <Separator className="my-4" />
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Subtotal General</p>
                <p className="text-lg font-bold">
                  {formatearMoneda(totales.valorSinImpuestos)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">IVA Total</p>
                <p className="text-lg font-bold text-orange-600">
                  {formatearMoneda(totales.iva)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Otros Impuestos</p>
                <p className="text-lg font-bold">
                  {formatearMoneda(totales.otrosImpuestos)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Total con IVA</p>
                <p className="text-xl font-bold text-green-600">
                  {formatearMoneda(totales.total)}
                </p>
              </div>
            </div>
          </div>

          {facturasFiltradas.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No se encontraron facturas con los filtros aplicados
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
