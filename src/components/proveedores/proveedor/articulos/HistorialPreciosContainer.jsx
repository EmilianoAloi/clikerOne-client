import { useState } from "react";
import { useParams } from "react-router-dom";

import HistorialPreciosTitle from "./HistorialPreciosTitle";
import HistorialPreciosCards from "./HistorialPreciosCards";
import HistorialPreciosFiltros from "./HistorialPreciosFiltros";
import HistorialPreciosTable from "./HistorialPreciosTable";

// Datos de ejemplo para el historial de precios
const priceHistory = [
  {
    id: 1,
    codigo: "0001",
    nombre: "Plastico PVC",
    categoria: "Materia prima",
    color: "Azul",
    descripcion: "articulo 1",
    unidadMedida: "unidad",
    precioAnterior: 0.85,
    precioNuevo: 1.0,
    fechaCambio: "2024-01-15T10:30:00",
    usuario: "Juan Pérez",
    motivo: "Ajuste por inflación",
  },
  {
    id: 2,
    codigo: "0001",
    nombre: "Plastico PVC",
    categoria: "Materia prima",
    color: "Azul",
    descripcion: "articulo 1",
    unidadMedida: "unidad",
    precioAnterior: 0.75,
    precioNuevo: 0.85,
    fechaCambio: "2023-12-01T14:20:00",
    usuario: "María García",
    motivo: "Actualización de costos",
  },
  {
    id: 3,
    codigo: "hh",
    nombre: "hh",
    categoria: "Electrónica",
    color: "Otro",
    descripcion: "2",
    unidadMedida: "kg",
    precioAnterior: 0.9,
    precioNuevo: 1.0,
    fechaCambio: "2024-01-10T09:15:00",
    usuario: "Carlos López",
    motivo: "Cambio de proveedor",
  },
  {
    id: 4,
    codigo: "0001",
    nombre: "Plastico PVC",
    categoria: "Materia prima",
    color: "Azul",
    descripcion: "articulo 1",
    unidadMedida: "unidad",
    precioAnterior: 1.0,
    precioNuevo: 0.95,
    fechaCambio: "2024-01-20T16:45:00",
    usuario: "Ana Martínez",
    motivo: "Descuento por volumen",
  },
  {
    id: 5,
    codigo: "hh",
    nombre: "hh",
    categoria: "Electrónica",
    color: "Otro",
    descripcion: "2",
    unidadMedida: "kg",
    precioAnterior: 1.0,
    precioNuevo: 1.1,
    fechaCambio: "2024-01-25T11:30:00",
    usuario: "Roberto Silva",
    motivo: "Aumento de costos de materia prima",
  },
];

export default function HistorialPreciosContainer() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState("all");
  const [sortBy, setSortBy] = useState("fecha-desc");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  // Filtrar y ordenar datos
  const filteredHistory = priceHistory
    .filter((item) => {
      const matchesSearch =
        item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.usuario.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesArticle =
        selectedArticle === "all" || item.codigo === selectedArticle;

      // --- FILTRO POR FECHAS ---
      const fecha = item.fechaCambio.split("T")[0]; // "YYYY-MM-DD"
      const afterDesde = !fechaDesde || fecha >= fechaDesde;
      const beforeHasta = !fechaHasta || fecha <= fechaHasta;

      return matchesSearch && matchesArticle && afterDesde && beforeHasta;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "fecha-desc":
          return (
            new Date(b.fechaCambio).getTime() -
            new Date(a.fechaCambio).getTime()
          );
        case "fecha-asc":
          return (
            new Date(a.fechaCambio).getTime() -
            new Date(b.fechaCambio).getTime()
          );
        case "precio-desc":
          return b.precioNuevo - a.precioNuevo;
        case "precio-asc":
          return a.precioNuevo - b.precioNuevo;
        default:
          return 0;
      }
    });

  // Obtener artículos únicos para el filtro
  const uniqueArticles = Array.from(
    new Set(priceHistory.map((item) => item.codigo))
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const getPriceChangeIcon = (oldPrice, newPrice) => {
    // if (newPrice > oldPrice) {
    //   return <TrendingUp className="h-4 w-4 text-red-500" />;
    // } else if (newPrice < oldPrice) {
    //   return <TrendingDown className="h-4 w-4 text-green-500" />;
    // }
    return null;
  };

  const getPriceChangeBadge = (oldPrice, newPrice) => {
    const change = ((newPrice - oldPrice) / oldPrice) * 100;

    if (change > 0) {
      // Positivo: fondo rojo suave, texto rojo, padding, border-radius, font-semibold
      return (
        <span className="inline-block px-4 py-1 rounded-full bg-red-100 text-red-600 font-semibold text-sm">
          +{change.toFixed(1)}%
        </span>
      );
    } else if (change < 0) {
      // Negativo: fondo verde suave, texto verde, padding, border-radius, font-semibold
      return (
        <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-600 font-semibold text-sm">
          {change.toFixed(1)}%
        </span>
      );
    }
    // Sin cambio: fondo gris muy suave, texto gris
    return (
      <span className="inline-block px-4 py-1 rounded-full bg-gray-100 text-gray-500 font-semibold text-sm">
        Sin cambio
      </span>
    );
  };

  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-6">
      <HistorialPreciosTitle />
      <HistorialPreciosCards filteredHistory={filteredHistory} />

      <HistorialPreciosFiltros
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedArticle={selectedArticle}
        setSelectedArticle={setSelectedArticle}
        sortBy={sortBy}
        setSortBy={setSortBy}
        uniqueArticles={uniqueArticles}
        fechaDesde={fechaDesde}
        setFechaDesde={setFechaDesde}
        fechaHasta={fechaHasta}
        setFechaHasta={setFechaHasta}
      />
      <HistorialPreciosTable
        filteredHistory={filteredHistory}
        formatDate={formatDate}
        formatPrice={formatPrice}
        getPriceChangeIcon={getPriceChangeIcon}
        getPriceChangeBadge={getPriceChangeBadge}
      />
    </div>
  );
}
