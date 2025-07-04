import { useParams } from "react-router-dom";
import { useHistorialPreciosByProveedor } from "@/queries/proveedores/historial-precios/useHistorialPreciosByProveedor";
import HistorialPreciosTitle from "./HistorialPreciosTitle";
import HistorialPreciosCards from "./HistorialPreciosCards";
import HistorialPreciosFiltros from "./HistorialPreciosFiltros";
import HistorialPreciosTable from "./HistorialPreciosTable";
import { useState, useMemo } from "react";

export default function HistorialPreciosContainer() {
  const { id } = useParams(); // idProveedor
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState("all");
  const [sortBy, setSortBy] = useState("fecha-desc");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  // React Query!
  const {
    data: priceHistory = [],
    isLoading,
    error,
  } = useHistorialPreciosByProveedor(id);

  // 1. Aplaná el historial, NO agrupes: mapeá directo y después ordená
  const mappedHistory = useMemo(() => {
    // Ordená todos los registros por fecha (desc)
    const sorted = [...priceHistory].sort(
      (a, b) => new Date(b.fecha_vigencia) - new Date(a.fecha_vigencia)
    );

    // Para cada registro, buscá el anterior de ese artículo, por fecha
    return sorted.map((item, idx, arr) => {
      // Buscá el próximo registro más "viejo" del mismo artículo
      const next = arr
        .slice(idx + 1)
        .find(
          (other) => other.articulo?.id_articulo === item.articulo?.id_articulo
        );
      return {
        id: item.id_historial,
        codigo: item.articulo?.codigo_interno || "",
        nombre: item.articulo?.nombre || "",
        categoria: item.articulo?.categoria || "",
        color: item.articulo?.color || "",
        descripcion: item.articulo?.descripcion || "",
        unidad_medida: item.articulo?.unidad_de_medida || "",
        precioNuevo: parseFloat(item.precio),
        precioAnterior: next ? parseFloat(next.precio) : null,
        fechaCambio: item.fecha_vigencia,
        usuario: item.creador?.nombre || "",
        motivo: "",
      };
    });
  }, [priceHistory]);

  // 2. Filtrar y ordenar (orden global, no por grupo)
  const filteredHistory = useMemo(() => {
    return mappedHistory
      .filter((item) => {
        const matchesSearch =
          item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.usuario ?? "").toLowerCase().includes(searchTerm.toLowerCase());

        const matchesArticle =
          selectedArticle === "all" || item.codigo === selectedArticle;

        // --- FILTRO POR FECHAS ---
        const fecha = item.fechaCambio?.split("T")[0] ?? ""; // "YYYY-MM-DD"
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
  }, [
    mappedHistory,
    searchTerm,
    selectedArticle,
    fechaDesde,
    fechaHasta,
    sortBy,
  ]);

  // 3. Artículos únicos para filtro
  const uniqueArticles = useMemo(
    () => Array.from(new Set(mappedHistory.map((item) => item.codigo))),
    [mappedHistory]
  );

  // Formateadores
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("es-AR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const getPriceChangeBadge = (oldPrice, newPrice) => {
    // Si es el primer precio registrado (sin anterior)
    if (oldPrice === null || oldPrice === undefined) {
      return (
        <span className="inline-block px-4 py-1 rounded-full bg-gray-50 text-gray-500 font-semibold text-sm border border-gray-200">
          Inicial
        </span>
      );
    }
    const change = ((newPrice - oldPrice) / oldPrice) * 100;
    if (change > 0) {
      return (
        <span className="inline-block px-4 py-1 rounded-full bg-red-100 text-red-600 font-semibold text-sm">
          +{change.toFixed(1)}%
        </span>
      );
    } else if (change < 0) {
      return (
        <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-600 font-semibold text-sm">
          {change.toFixed(1)}%
        </span>
      );
    }
    return (
      <span className="inline-block px-4 py-1 rounded-full bg-gray-100 text-gray-500 font-semibold text-sm">
        Sin cambio
      </span>
    );
  };

  if (isLoading)
    return <div className="p-6">Cargando historial de precios...</div>;
  if (error)
    return (
      <div className="p-6 text-red-500">Error al cargar el historial.</div>
    );
  const getPriceChangeIcon = () => null;
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
