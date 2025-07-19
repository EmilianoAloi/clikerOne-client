"use client";

import { useMemo, useState } from "react";
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

const inputStyle =
  "bg-white border border-gray-300 rounded-md shadow-sm !focus:outline-none !focus-visible:ring-1 !focus-visible:ring-gray-400";

export default function InformesOP({ pagos }) {
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const datos = useMemo(
    () =>
      pagos.map((pago) => ({
        id: pago.id_pago,
        numeroOP: pago.numero_pago?.toString() || pago.id_pago.toString(),
        razonSocial: pago.proveedor?.nombre ?? "",
        cuit: pago.proveedor?.cuit ?? "",
        estado: pago.estado_pago.toLowerCase(),
        fechaEjecucion: pago.fecha, // ISO: "YYYY-MM-DD"
        fechaPago: pago.fecha_acreditacion, // ISO o null
        total: parseFloat(pago.monto_total) || 0,
      })),
    [pagos]
  );

  // 2) Filtrar por fechas y búsqueda
  const ordenesFiltradas = useMemo(() => {
    const desde = fechaDesde || null;
    const hasta = fechaHasta || null;
    const txt = busqueda.trim().toLowerCase();

    return datos.filter((o) => {
      const okFecha =
        (!desde || o.fechaEjecucion >= desde) &&
        (!hasta || o.fechaEjecucion <= hasta);

      const okTexto =
        !txt ||
        o.numeroOP.toLowerCase().includes(txt) ||
        o.razonSocial.toLowerCase().includes(txt) ||
        o.cuit.includes(txt) ||
        o.estado.includes(txt);

      return okFecha && okTexto;
    });
  }, [datos, fechaDesde, fechaHasta, busqueda]);

  // 3) Calcular totales y conteos
  const totales = useMemo(
    () =>
      ordenesFiltradas.reduce(
        (acc, orden) => {
          acc.total += orden.total;
          switch (orden.estado) {
            case "ejecutada":
              acc.ejecutadas += orden.total;
              acc.countEjecutadas++;
              break;
            case "pendiente":
              acc.pendientes += orden.total;
              acc.countPendientes++;
              break;
            case "cancelada":
              acc.canceladas += orden.total;
              acc.countCanceladas++;
              break;
            default:
              break;
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
      ),
    [ordenesFiltradas]
  );

  const formatearMoneda = (valor) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(valor);

  const formatearFecha = (fecha) => {
    return fecha.split("-").reverse().join("/"); // "YYYY-MM-DD" → "DD/MM/YYYY"
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
