import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import EstadisticasTitle from "./EstadisticasTitle";
import EstadisticasFiltros from "./EstadisticasFiltros";
import EstadisticasCards from "./EstadisticasCards";
import EstadisticasTabs from "./EstadisticasTabs";

// Filtros
const proveedores = [
  { id: "princz", nombre: "Princz" },
  { id: "plaswag", nombre: "Plaswag" },
  { id: "torrear", nombre: "Torrear" },
];
const usuarios = ["admin", "jdoe", "asmith"];

// Cards
const kpiData = {
  totalProveedores: 186,
  proveedoresActivos: 142,
  articulosTotal: 1247,
  ordenesCompra: 89,
  facturacionMensual: 234224.0,
  ordenesPendientes: 23,
  pagosPendientes: 45,
  cambiosPrecios: 156,
};

export default function EstadisticasPageContainer() {
  // 1. Estados
  const [filtroPeriodo, setFiltroPeriodo] = useState("ultimo-mes");
  const [selectedProvider, setSelectedProvider] = useState("all");
  const [selectedUser, setSelectedUser] = useState("all");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  // 2. Arrays unicos (mocked)
  const uniqueProviders = proveedores;
  const uniqueUsers = usuarios;

  // 3. datos de tabs
  const facturacionMensual = [
    { mes: "Ene", monto: 180000, ordenes: 45 },
    { mes: "Feb", monto: 220000, ordenes: 52 },
    { mes: "Mar", monto: 195000, ordenes: 48 },
    { mes: "Apr", monto: 234224, ordenes: 58 },
    { mes: "May", monto: 210000, ordenes: 51 },
    { mes: "Jun", monto: 245000, ordenes: 62 },
  ];

  const comprasPorProveedor = [
    { proveedor: "Princz", monto: 45000, ordenes: 12 },
    { proveedor: "Plaswag", monto: 38000, ordenes: 8 },
    { proveedor: "Torrear", monto: 32000, ordenes: 15 },
    { proveedor: "Papelera Lamas", monto: 28000, ordenes: 9 },
    { proveedor: "AIO", monto: 25000, ordenes: 7 },
  ];

  const estadosOrdenes = [
    { estado: "Pendiente", cantidad: 23, color: "#f59e0b" },
    { estado: "Ejecutada", cantidad: 45, color: "#10b981" },
    { estado: "Cancelada", cantidad: 8, color: "#ef4444" },
    { estado: "En Proceso", cantidad: 13, color: "#3b82f6" },
  ];

  const tendenciaPrecios = [
    { fecha: "01/11", aumentos: 5, reducciones: 2 },
    { fecha: "08/11", aumentos: 8, reducciones: 1 },
    { fecha: "15/11", aumentos: 12, reducciones: 3 },
    { fecha: "22/11", aumentos: 6, reducciones: 4 },
    { fecha: "29/11", aumentos: 9, reducciones: 2 },
  ];

  const topArticulos = [
    {
      codigo: "111",
      nombre: "Producto Final A",
      categoria: "Producto final",
      cambios: 8,
      ultimoPrecio: 55.0,
    },
    {
      codigo: "123",
      nombre: "Materia Prima B",
      categoria: "Materia prima",
      cambios: 6,
      ultimoPrecio: 2.0,
    },
    {
      codigo: "456",
      nombre: "Producto Final C",
      categoria: "Producto final",
      cambios: 4,
      ultimoPrecio: 75.0,
    },
  ];

  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-6 ">
      <EstadisticasTitle />
      <Separator className="mt-6" />

      <EstadisticasFiltros
        uniqueUsers={uniqueUsers}
        uniqueProviders={uniqueProviders}
        filtroPeriodo={filtroPeriodo}
        setFiltroPeriodo={setFiltroPeriodo}
        selectedProvider={selectedProvider}
        setSelectedProvider={setSelectedProvider}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        fechaDesde={fechaDesde}
        setFechaDesde={setFechaDesde}
        fechaHasta={fechaHasta}
        setFechaHasta={setFechaHasta}
      />
      <EstadisticasCards kpiData={kpiData} />
      {/* <EstadisticasTabs
        facturacionMensual={facturacionMensual}
        estadosOrdenes={estadosOrdenes}
        comprasPorProveedor={comprasPorProveedor}
        tendenciaPrecios={tendenciaPrecios}
        topArticulos={topArticulos}
      /> */}
      <EstadisticasTabs
        facturacionMensual={facturacionMensual}
        estadosOrdenes={estadosOrdenes}
        comprasPorProveedor={comprasPorProveedor}
        tendenciaPrecios={tendenciaPrecios}
        topArticulos={topArticulos}
      />
    </div>
  );
}
