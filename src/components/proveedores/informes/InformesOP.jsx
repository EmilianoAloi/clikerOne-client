"use client";

import { useState } from "react";
import {
  Download,
  CreditCard,
  Search,
  CheckCircle,
  Clock,
  XCircle,
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
import { Separator } from "@/components/ui/separator";
// import * as XLSX from "xlsx";

// Datos de ejemplo para las órdenes de pago
const ordenesPagoMock = [
  {
    numeroOP: "OP-78",
    razonSocial: "Iele SA",
    cuit: "30-12345678-9",
    estado: "Ejecutada",
    fechaEjecucion: "2025-01-16",
    fechaPago: "2025-01-16",
    total: 200.0,
    fechaCreacion: "2025-01-15",
  },
  {
    numeroOP: "OP-79",
    razonSocial: "Plaswag SA",
    cuit: "30-87654321-0",
    estado: "Pendiente",
    fechaEjecucion: "2025-01-20",
    fechaPago: null,
    total: 125400.0,
    fechaCreacion: "2025-01-17",
  },
  {
    numeroOP: "OP-80",
    razonSocial: "Distribuidora Norte SRL",
    cuit: "30-11223344-5",
    estado: "Ejecutada",
    fechaEjecucion: "2025-01-18",
    fechaPago: "2025-01-18",
    total: 67800.0,
    fechaCreacion: "2025-01-16",
  },
  {
    numeroOP: "OP-81",
    razonSocial: "Materiales del Sur SA",
    cuit: "30-99887766-1",
    estado: "Cancelada",
    fechaEjecucion: "2025-01-22",
    fechaPago: null,
    total: 89600.0,
    fechaCreacion: "2025-01-18",
  },
  {
    numeroOP: "OP-82",
    razonSocial: "Comercial Este Ltda",
    cuit: "30-55443322-7",
    estado: "Ejecutada",
    fechaEjecucion: "2025-01-19",
    fechaPago: "2025-01-19",
    total: 94200.0,
    fechaCreacion: "2025-01-17",
  },
];

export default function InformesOP() {
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const ordenesFiltradas = ordenesPagoMock.filter((orden) => {
    const cumpleFecha =
      (!fechaDesde || orden.fechaEjecucion >= fechaDesde) &&
      (!fechaHasta || orden.fechaEjecucion <= fechaHasta);
    const cumpleBusqueda =
      !busqueda ||
      orden.numeroOP.toLowerCase().includes(busqueda.toLowerCase()) ||
      orden.razonSocial.toLowerCase().includes(busqueda.toLowerCase()) ||
      orden.cuit.includes(busqueda) ||
      orden.estado.toLowerCase().includes(busqueda.toLowerCase());

    return cumpleFecha && cumpleBusqueda;
  });

  const totales = ordenesFiltradas.reduce(
    (acc, orden) => {
      acc.total += orden.total;
      if (orden.estado === "Ejecutada") {
        acc.ejecutadas += orden.total;
        acc.countEjecutadas += 1;
      } else if (orden.estado === "Pendiente") {
        acc.pendientes += orden.total;
        acc.countPendientes += 1;
      } else if (orden.estado === "Cancelada") {
        acc.canceladas += orden.total;
        acc.countCanceladas += 1;
      }
      return acc;
    },
    {
      total: 0,
      ejecutadas: 0,
      pendientes: 0,
      canceladas: 0,
      countEjecutadas: 0,
      countPendientes: 0,
      countCanceladas: 0,
    }
  );

  const exportarAExcel = () => {
    const datosParaExcel = ordenesFiltradas.map((orden) => ({
      "Nº de OP": orden.numeroOP,
      "Razón Social": orden.razonSocial,
      CUIT: orden.cuit,
      Estado: orden.estado,
      "Fecha de Ejecución": orden.fechaEjecucion,
      "Fecha de Pago": orden.fechaPago || "Sin pagar",
      "Total de la OP": orden.total,
      "Fecha de Creación": orden.fechaCreacion,
    }));

    datosParaExcel.push({
      "Nº de OP": "",
      "Razón Social": "",
      CUIT: "",
      Estado: "",
      "Fecha de Ejecución": "",
      "Fecha de Pago": "TOTAL GENERAL:",
      "Total de la OP": totales.total,
      "Fecha de Creación": "",
    });

    // const worksheet = XLSX.utils.json_to_sheet(datosParaExcel);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(
    //   workbook,
    //   worksheet,
    //   "Informe Órdenes de Pago"
    // );

    // const fechaActual = new Date().toISOString().split("T")[0];
    // XLSX.writeFile(workbook, `informe_ordenes_pago_${fechaActual}.xlsx`);
  };

  const formatearMoneda = (valor) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(valor);

  const formatearFecha = (fecha) => {
    if (!fecha) return "-";
    return new Date(fecha).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getEstadoBadge = (estado) => {
    const configuraciones = {
      Ejecutada: {
        className: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
      },
      Pendiente: {
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock,
      },
      Cancelada: {
        className: "bg-red-100 text-red-800 border-red-200",
        icon: XCircle,
      },
    };

    const config = configuraciones[estado] || {
      className: "bg-gray-100 text-gray-800 border-gray-200",
      icon: Clock,
    };
    const IconComponent = config.icon;

    return (
      <Badge
        variant="outline"
        className={`${config.className} flex items-center gap-1`}
      >
        <IconComponent className="w-3 h-3" />
        {estado}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Informes de Órdenes de Pago
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Reporte detallado de órdenes de pago con estados y fechas de
            ejecución
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
            Utiliza los filtros para refinar tu búsqueda de órdenes de pago
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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="busqueda"
                  placeholder="Buscar por OP, razón social, CUIT o estado..."
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
              <CreditCard className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Órdenes
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {ordenesFiltradas.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Ejecutadas ({totales.countEjecutadas})
                </p>
                <p className="text-xl font-bold text-green-600">
                  {formatearMoneda(totales.ejecutadas)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pendientes ({totales.countPendientes})
                </p>
                <p className="text-xl font-bold text-yellow-600">
                  {formatearMoneda(totales.pendientes)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Canceladas ({totales.countCanceladas})
                </p>
                <p className="text-xl font-bold text-red-600">
                  {formatearMoneda(totales.canceladas)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Órdenes de Pago */}
      <Card>
        <CardHeader>
          <CardTitle>Detalle de Órdenes de Pago</CardTitle>
          <CardDescription>
            Listado completo de órdenes de pago con estados y fechas de
            ejecución
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Nº de OP</TableHead>
                  <TableHead className="min-w-[200px]">Razón Social</TableHead>
                  <TableHead className="w-[120px]">CUIT</TableHead>
                  <TableHead className="w-[120px]">Estado</TableHead>
                  <TableHead className="w-[130px]">Fecha Ejecución</TableHead>
                  <TableHead className="w-[120px]">Fecha Pago</TableHead>
                  <TableHead className="text-right w-[130px]">
                    Total OP
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordenesFiltradas.map((orden, i) => (
                  <TableRow key={i} className="hover:bg-gray-50">
                    <TableCell className="font-mono text-sm font-medium">
                      {orden.numeroOP}
                    </TableCell>
                    <TableCell className="font-medium">
                      {orden.razonSocial}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {orden.cuit}
                    </TableCell>
                    <TableCell>{getEstadoBadge(orden.estado)}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {formatearFecha(orden.fechaEjecucion)}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {orden.fechaPago ? (
                        <span className="text-green-600">
                          {formatearFecha(orden.fechaPago)}
                        </span>
                      ) : (
                        <span className="text-gray-400">Sin pagar</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      {formatearMoneda(orden.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Separator className="my-4" />
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Resumen por Estado:
                </p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-600">
                      Ejecutadas ({totales.countEjecutadas}):
                    </span>
                    <span className="font-mono font-semibold text-green-600">
                      {formatearMoneda(totales.ejecutadas)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-600">
                      Pendientes ({totales.countPendientes}):
                    </span>
                    <span className="font-mono font-semibold text-yellow-600">
                      {formatearMoneda(totales.pendientes)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-600">
                      Canceladas ({totales.countCanceladas}):
                    </span>
                    <span className="font-mono font-semibold text-red-600">
                      {formatearMoneda(totales.canceladas)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Total de {ordenesFiltradas.length} orden
                  {ordenesFiltradas.length !== 1 ? "es" : ""} de pago
                </p>
                <p className="text-2xl font-bold text-blue-600 mt-2">
                  {formatearMoneda(totales.total)}
                </p>
              </div>
            </div>
          </div>

          {ordenesFiltradas.length === 0 && (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No se encontraron órdenes de pago con los filtros aplicados
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
