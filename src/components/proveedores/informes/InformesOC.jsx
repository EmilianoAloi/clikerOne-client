import { useMemo, useState } from "react";
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
import BadgeEstado from "@/components/ui/badge-custom";
import { useExportInforme } from "@/queries/proveedores/informes/useExportInforme";

const inputStyle =
  "bg-white border border-gray-300 rounded-md shadow-sm !focus:outline-none !focus-visible:ring-1 !focus-visible:ring-gray-400";

export default function InformesOC({ compras }) {
  console.log(compras);
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [busqueda, setBusqueda] = useState("");

  // 1) Normalizar datos
  const datos = useMemo(
    () =>
      compras.map((o) => ({
        id: o.id_orden_compra,
        numeroOC: o.id_orden_compra.toString(),
        razonSocial: o.proveedor?.nombre ?? "",
        cuit: o.proveedor?.cuit ?? "",
        fechaCreacion: o.fecha_creado,
        fechaEntrega: o.fecha_entrega,
        condicionPago: o.condicion_pago,
        lugarEntrega: o.lugar_entrega,
        total: parseFloat(o.monto_total) || 0,
        estado: o.estado_compra,
      })),
    [compras]
  );

  // 2) Filtra usando fechaCreacion
  const ordenesFiltradas = useMemo(() => {
    const desde = fechaDesde ? new Date(fechaDesde) : null;
    const hasta = fechaHasta ? new Date(fechaHasta) : null;
    const txt = busqueda.trim().toLowerCase();

    return datos.filter((o) => {
      const fecha = new Date(o.fechaCreacion); // ← uso fechaCreacion
      const okFecha = (!desde || fecha >= desde) && (!hasta || fecha <= hasta);

      const okTexto =
        !txt ||
        o.numeroOC.toLowerCase().includes(txt) ||
        o.razonSocial.toLowerCase().includes(txt) ||
        o.cuit.includes(txt) ||
        o.lugarEntrega.toLowerCase().includes(txt);

      return okFecha && okTexto;
    });
  }, [datos, fechaDesde, fechaHasta, busqueda]);

  // 3) Cuenta cuantas entregadas
  const entregadasFiltradas = useMemo(
    () => ordenesFiltradas.filter((o) => o.estado === "entregada").length,
    [ordenesFiltradas]
  );

  // Calcular total general
  const totalGeneral = ordenesFiltradas.reduce((sum, o) => sum + o.total, 0);

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

  // Handle Export
  const exportOC = useExportInforme("oc");

  const handleExportOC = () => {
    const payload = {
      filtros: { fechaDesde, fechaHasta },
      resumen: {
        totalOC: ordenesFiltradas.length,
        entregadas: entregadasFiltradas,
        totalGeneral,
      },
      ordenes: ordenesFiltradas,
    };
    console.log("Payload a enviar al backend:", payload);

    exportOC.mutate(payload);
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

      {/* Alertas
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
            Alertas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 text-orange-500 mr-2" />
              <span>1 orden vence hoy</span>
            </div>
            <div className="flex items-center text-sm">
              <Users className="w-4 h-4 text-blue-500 mr-2" />
              <span>3 proveedores nuevos</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="w-4 h-4 text-green-500 mr-2" />
              <span>2 entregas pendientes</span>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 px-4 pt-3 pb-9">
        <Card className="py-1 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Total Ordenes
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
                <p className="text-2xl font-bold ">{entregadasFiltradas}</p>
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
          <CardDescription>
            Listado completo con entrega y pago.
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <div className="overflow-x-auto">
            <Table className="border">
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
                  <TableHead className="px-3 py-2 text-left font-semibold text-gray-700 w-[140px]">
                    Fecha Creación
                  </TableHead>
                  <TableHead className="px-3 py-2 text-left font-semibold text-gray-700 w-[120px]">
                    Fecha Entrega
                  </TableHead>
                  <TableHead className="px-3 py-2 text-left font-semibold text-gray-700 w-[120px]">
                    Estado
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
                {ordenesFiltradas.map((orden) => (
                  <TableRow
                    key={orden.id}
                    className="hover:bg-gray-50 transition-colors"
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
                    <TableCell className="px-3 py-4 text-sm">
                      {formatearFecha(orden.fechaCreacion)}
                    </TableCell>
                    <TableCell className="px-3 py-4  text-sm">
                      {formatearFecha(orden.fechaEntrega)}
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      {getEstadoBadge(orden.estado)}
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      <Badge variant="outline" className="text-xs px-3">
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
          <div className=" p-4 flex justify-between items-center border border-t-0">
            <p className="text-lg font-semibold text-gray-600">
              {ordenesFiltradas.length} Ordenes de compra
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

          <Button
            onClick={handleExportOC}
            className="w-full mt-6 gap-2 bg-slate-800 hover:bg-gray-700 text-white text-sm font-semibold rounded-sm cursor-pointer py-5"
          >
            <Upload className="h-4 w-4" />
            Exportar - Informe OC
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
