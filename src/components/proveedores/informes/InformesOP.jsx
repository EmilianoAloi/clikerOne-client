"use client";

import { useState } from "react";
import {
  Upload,
  CreditCard,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  CalendarCheck,
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

// import * as XLSX from "xlsx";

const inputStyle =
  "bg-white border border-gray-300 rounded-md shadow-sm !focus:outline-none !focus-visible:ring-1 !focus-visible:ring-gray-400";

// Datos de ejemplo para las órdenes de pago
const ordenesPagoMock = [
  {
    numeroOP: "OP-78",
    razonSocial: "Iele SA",
    cuit: "30-12345678-9",
    estado: "ejecutada",
    fechaEjecucion: "2025-01-16",
    fechaPago: "2025-01-16",
    total: 200.0,
    fechaCreacion: "2025-01-15",
  },
  {
    numeroOP: "OP-79",
    razonSocial: "Plaswag SA",
    cuit: "30-87654321-0",
    estado: "pendiente",
    fechaEjecucion: "2025-01-20",
    fechaPago: null,
    total: 125400.0,
    fechaCreacion: "2025-01-17",
  },
  {
    numeroOP: "OP-80",
    razonSocial: "Distribuidora Norte SRL",
    cuit: "30-11223344-5",
    estado: "ejecutada",
    fechaEjecucion: "2025-01-18",
    fechaPago: "2025-01-18",
    total: 67800.0,
    fechaCreacion: "2025-01-16",
  },
  {
    numeroOP: "OP-81",
    razonSocial: "Materiales del Sur SA",
    cuit: "30-99887766-1",
    estado: "anulada",
    fechaEjecucion: "2025-01-22",
    fechaPago: null,
    total: 89600.0,
    fechaCreacion: "2025-01-18",
  },
  {
    numeroOP: "OP-82",
    razonSocial: "Comercial Este Ltda",
    cuit: "30-55443322-7",
    estado: "ejecutada",
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
    return <BadgeEstado estado={estado} className={"w-full"} />;
  };

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
                  placeholder="Nº de OC, razón social, CUIT, lugar de entrega..."
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
              <CreditCard className="w-5 h-5 text-blue-600" />
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
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Ejecutadas ({totales.countEjecutadas})
                </p>
                <p className="text-xl font-bold text-green-600">
                  {formatearMoneda(totales.ejecutadas)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="py-1 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Pendientes ({totales.countPendientes})
                </p>
                <p className="text-xl font-bold text-yellow-600">
                  {formatearMoneda(totales.pendientes)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="py-1 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm font-semibold text-gray-600">
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

      {/* Tabla de OP*/}
      <Card className="mx-4 mb-10">
        <CardHeader>
          <CardTitle>Detalle de Ordenes de Pago</CardTitle>
          <CardDescription>
            Listado completo de órdenes de pago con estados y fechas de
            ejecución.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="border ">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="px-3 py-2 text-left font-semibold text-gray-700 w-[120px]">
                    Nº de OP
                  </TableHead>
                  <TableHead className=" py-2 text-left font-semibold text-gray-700 min-w-[200px]">
                    Razón Social
                  </TableHead>
                  <TableHead className=" py-2 text-left font-semibold text-gray-700 w-[120px]">
                    CUIT
                  </TableHead>
                  <TableHead className="w-[120px]">Estado</TableHead>
                  <TableHead className=" py-2 text-left font-semibold text-gray-700 w-[120px]">
                    Fecha Ejecución
                  </TableHead>
                  <TableHead className=" py-2 text-left font-semibold text-gray-700 w-[120px]">
                    Fecha Pago
                  </TableHead>
                  <TableHead className=" py-2 text-right font-semibold text-gray-700 w-[130px]">
                    Total OP
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordenesFiltradas.map((orden, i) => (
                  <TableRow
                    key={i}
                    className="hover:bg-gray-50 transition-colors "
                  >
                    <TableCell className="px-3 py-4 font-mono text-sm font-medium">
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

          <div className=" p-4 flex justify-between items-center border border-t-0">
            <p className="text-lg font-semibold text-gray-600">
              {ordenesFiltradas.length} Ordenes de pago
            </p>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-600">
                Total General
              </p>
              <p className="text-2xl font-bold text-green-600">
                {formatearMoneda(totales.total)}
              </p>
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
          <Button className="w-full mt-6 gap-2 bg-slate-800 hover:bg-gray-700 text-white text-sm font-semibold rounded-sm cursor-pointer py-5">
            <Upload className="h-4 w-4" />
            Exportar - Informe OP
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
