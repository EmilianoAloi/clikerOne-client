// components/EstadisticasPageContainer.jsx
"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import EstadisticasTitle from "./EstadisticasTitle";
import EstadisticasFiltros from "./EstadisticasFiltros";
import EstadisticasCards from "./EstadisticasCards";

// mocks

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

  // 2. Arrays únicos (mocked)
  const uniqueProviders = proveedores;
  const uniqueUsers = usuarios;

  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-6 ">
      <EstadisticasTitle />
      <Separator className="mt-6" />

      <EstadisticasCards kpiData={kpiData} />

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
    </div>
  );
}
