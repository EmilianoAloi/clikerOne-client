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
import { useExportInforme } from "@/queries/proveedores/informes/useExportInforme";

const inputStyle =
  "bg-white border border-gray-300 rounded-md shadow-sm !focus:outline-none !focus-visible:ring-1 !focus-visible:ring-gray-400";

export default function InformesOP({ pagos }) {
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [busqueda, setBusqueda] = useState("");

  // 1) Normalizar datos de OP
  const datos = useMemo(
    () =>
      pagos.map((op) => {
        const fechaCreada = op.fecha_creacion.split("T")[0]; // YYYY-MM-DD
        const primerPago = op.pagos[0] || {};
        return {
          id: op.id_op,
          numeroOP: op.id_op.toString(),
          razonSocial: op.razon_social,
          cuit: op.cuit,
          cantidadPagos: op.cantidad_pagos,
          fechaCreacion: fechaCreada,
          estado: primerPago.estado_pago || "",
          fechaEjecucion: primerPago.fecha_ejecucion || "",
          totalOP: op.monto_total_op,
        };
      }),
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

  // 3) Calcular totales por estado
  const totales = useMemo(() => {
    const res = {
      countEjecutadas: 0,
      ejecutadas: 0,
      countPendientes: 0,
      pendientes: 0,
      countCanceladas: 0,
      canceladas: 0,
    };
    ordenesFiltradas.forEach((o) => {
      if (o.estado === "ejecutada") {
        res.countEjecutadas++;
        res.ejecutadas += o.totalOP;
      } else if (o.estado === "pendiente") {
        res.countPendientes++;
        res.pendientes += o.totalOP;
      } else if (o.estado === "cancelada") {
        res.countCanceladas++;
        res.canceladas += o.totalOP;
      }
    });
    return res;
  }, [ordenesFiltradas]);

  const formatearMoneda = (valor) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(valor);

  const formatearFecha = (fecha) => fecha.split("-").reverse().join("/"); // "YYYY-MM-DD" → "DD/MM/YYYY"

  const getEstadoBadge = (estado) => (
    <BadgeEstado estado={estado} className="w-full" />
  );

  // 1. Hook para OP
  const exportOP = useExportInforme("op");

  // 2. Handler de exportación
  const handleExportOP = () => {
    const filtros = { fechaDesde, fechaHasta };

    // resumen
    const totalOps = ordenesFiltradas.length;
    const ejecutadasArr = ordenesFiltradas.filter(
      (o) => o.estado === "ejecutada"
    );
    const pendientesArr = ordenesFiltradas.filter(
      (o) => o.estado === "pendiente"
    );
    const canceladasArr = ordenesFiltradas.filter(
      (o) => o.estado === "cancelada"
    );

    const resumen = {
      totalOps,
      ejecutadasCount: ejecutadasArr.length,
      totalEjecutadas: ejecutadasArr.reduce((sum, o) => sum + o.totalOP, 0),
      pendientesCount: pendientesArr.length,
      totalPendientes: pendientesArr.reduce((sum, o) => sum + o.totalOP, 0),
      canceladasCount: canceladasArr.length,
      totalCanceladas: canceladasArr.reduce((sum, o) => sum + o.totalOP, 0),
    };

    const payload = {
      filtros,
      resumen,
      ops: ordenesFiltradas,
    };

    console.log("Payload OP → backend:", payload);
    exportOP.mutate(payload);
  };

  return (
    <div className=" py-2 px-2 bg-slate-50 ">
      {/* filtros */}
      <Card className="p-0 rounded-none border-l-0 border-r-0 border-t-0 border-b-0 shadow-none ">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 py-3 bg-slate-50">
            <div>
              <Label className="text-sm flex items-center gap-1 font-semibold mb-1">
                <CalendarCheck className="h-4 w-4" />
                Fecha Desde
              </Label>
              <Input
                type="date"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}
                className={`w-full ${inputStyle}`}
              />
            </div>
            <div>
              <Label className="text-sm flex items-center gap-1 font-semibold mb-1">
                <CalendarCheck className="h-4 w-4" />
                Fecha Hasta
              </Label>
              <Input
                type="date"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}
                className={`w-full ${inputStyle}`}
              />
            </div>
            <div className="md:col-span-2">
              <Label className="text-sm flex items-center gap-1 font-semibold mb-1">
                <Search className="h-4 w-4" />
                Buscar
              </Label>
              <Input
                placeholder="Nº de OP, razón social, CUIT, estado..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className={`w-full ${inputStyle}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 px-4 pb-6">
        <Card className="shadow-lg">
          <CardContent className="p-4 flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Total Órdenes
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {ordenesFiltradas.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="p-4 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Ejecutadas ({totales.countEjecutadas})
              </p>
              <p className="text-xl font-bold text-green-600">
                {formatearMoneda(totales.ejecutadas)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="p-4 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Pendientes ({totales.countPendientes})
              </p>
              <p className="text-xl font-bold text-yellow-600">
                {formatearMoneda(totales.pendientes)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="p-4 flex items-center space-x-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Canceladas ({totales.countCanceladas})
              </p>
              <p className="text-xl font-bold text-red-600">
                {formatearMoneda(totales.canceladas)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* tabla */}
      <Card className="mx-4 mb-10">
        <CardHeader>
          <CardTitle>Detalle de Órdenes de Pago</CardTitle>
          <CardDescription>
            Listado completo de órdenes de pago con estados y fechas de
            ejecución.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="border">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="px-3 py-2 font-semibold text-gray-700 w-[120px]">
                    Nº de OP
                  </TableHead>
                  <TableHead className="py-2 font-semibold text-gray-700 min-w-[200px]">
                    Razón Social
                  </TableHead>
                  <TableHead className="py-2 font-semibold text-gray-700 w-[120px]">
                    CUIT
                  </TableHead>
                  <TableHead className="py-2 font-semibold text-gray-700 w-[100px]">
                    Cant. Pagos
                  </TableHead>
                  <TableHead className="py-2 font-semibold text-gray-700 w-[120px]">
                    Fecha Creación
                  </TableHead>

                  <TableHead className="py-2 font-semibold text-gray-700 w-[120px]">
                    Fecha Ejecución
                  </TableHead>
                  <TableHead className="py-2 font-semibold text-gray-700 w-[120px]">
                    Estado
                  </TableHead>
                  <TableHead className="py-2 text-right font-semibold text-gray-700 w-[130px]">
                    Total OP
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordenesFiltradas.map((orden) => (
                  <TableRow
                    key={orden.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="px-3 py-4 font-mono text-sm">
                      {orden.numeroOP}
                    </TableCell>
                    <TableCell className="font-medium">
                      {orden.razonSocial}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {orden.cuit}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {orden.cantidadPagos}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {formatearFecha(orden.fechaCreacion)}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {orden.fechaEjecucion
                        ? formatearFecha(orden.fechaEjecucion)
                        : "—"}
                    </TableCell>
                    <TableCell>{getEstadoBadge(orden.estado)}</TableCell>

                    <TableCell className="text-right font-mono font-semibold">
                      {formatearMoneda(orden.totalOP)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="p-4 flex justify-between items-center border-t mt-4">
            <p className="text-lg font-semibold text-gray-600">
              {ordenesFiltradas.length} órdenes de pago
            </p>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-600">
                Total General
              </p>
              <p className="text-2xl font-bold text-green-600">
                {formatearMoneda(
                  ordenesFiltradas.reduce((sum, o) => sum + o.totalOP, 0)
                )}
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

          {/* <Button className="w-full mt-6 gap-2 bg-slate-800 hover:bg-gray-700 text-white text-sm font-semibold py-5">
            Exportar — Informe OP
          </Button> */}
          <Button
            className="w-full mt-6 gap-2 bg-slate-800 hover:bg-gray-700 text-white text-sm font-semibold py-5"
            onClick={handleExportOP}
            disabled={exportOP.isLoading}
          >
            <Upload className="h-4 w-4" />
            {exportOP.isLoading ? "Generando..." : "Exportar — Informe OP"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
