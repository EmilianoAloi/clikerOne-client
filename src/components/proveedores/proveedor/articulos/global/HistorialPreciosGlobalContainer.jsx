import { useHistorialPreciosGlobal } from "@/queries/proveedores/articulo/historial-precios/useHistorialPreciosGlobal";
import { useProveedores } from "@/queries/proveedores/useProveedores";
import { Separator } from "@/components/ui/separator";
import { useMemo, useState } from "react";
import HistorialPreciosGlobalTitle from "./HistorialPreciosGlobalTitle";
import HistorialPreciosGlobalCards from "./HistorialPreciosGlobalCards";
import HistorialPreciosGlobalFiltros from "./HistorialPreciosGlobalFiltros";
import HistorialPreciosGlobalTable from "./HistorialPreciosGlobalTable";

export default function HistorialPreciosGlobalContainer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState("all");
  const [selectedUser, setSelectedUser] = useState("all");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  // Querys
  const {
    data: priceHistory = [],
    isLoading,
    error,
  } = useHistorialPreciosGlobal();
  const { data: proveedores = [] } = useProveedores();

  // Map y orden base
  const mappedHistory = useMemo(() => {
    const sorted = [...priceHistory].sort(
      (a, b) => new Date(b.fecha_vigencia) - new Date(a.fecha_vigencia)
    );
    return sorted.map((item, idx, arr) => {
      const next = arr
        .slice(idx + 1)
        .find(
          (other) => other.articulo?.id_articulo === item.articulo?.id_articulo
        );
      return {
        id: item.id_historial,
        proveedor: item.articulo?.Proveedor?.nombre || "-",
        proveedorId: item.articulo?.Proveedor?.id_proveedor || "-",
        codigo: item.articulo?.codigo_interno || "-",
        nombre: item.articulo?.nombre || "-",
        categoria: item.articulo?.categoria || "-",
        color: item.articulo?.color || "-",
        descripcion: item.articulo?.descripcion || "-",
        unidadMedida: item.articulo?.unidad_de_medida || "-",
        precioNuevo: parseFloat(item.precio),
        precioAnterior: next ? parseFloat(next.precio) : null,
        fechaCambio: item.fecha_vigencia || "-",
        usuario: item.creador?.nombre || "-",
        motivo: item.motivo || "-",
      };
    });
  }, [priceHistory]);

  // Unicos para selects
  const uniqueUsers = useMemo(
    () =>
      Array.from(
        new Set(mappedHistory.map((item) => item.usuario).filter(Boolean))
      ),
    [mappedHistory]
  );
  const uniqueArticles = useMemo(
    () =>
      Array.from(
        new Set(mappedHistory.map((item) => item.codigo).filter(Boolean))
      ),
    [mappedHistory]
  );
  const uniqueCategories = useMemo(
    () =>
      Array.from(
        new Set(mappedHistory.map((item) => item.categoria).filter(Boolean))
      ),
    [mappedHistory]
  );
  const uniqueProviders = useMemo(
    () => proveedores.map((p) => ({ id: p.id_proveedor, nombre: p.nombre })),
    [proveedores]
  );

  // Filtros y orden (orden fijo por fecha más reciente)
  const filteredHistory = useMemo(() => {
    return mappedHistory
      .filter((item) => {
        const matchesSearch =
          item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.proveedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.usuario.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesProvider =
          selectedProvider === "all" || item.proveedorId === selectedProvider;
        const matchesCategory =
          selectedCategory === "all" || item.categoria === selectedCategory;
        const matchesArticle =
          selectedArticle === "all" || item.codigo === selectedArticle;
        const matchesUser =
          selectedUser === "all" || item.usuario === selectedUser;

        // --- Fechas ---
        const fecha = item.fechaCambio?.split("T")[0] ?? "";
        const afterDesde = !fechaDesde || fecha >= fechaDesde;
        const beforeHasta = !fechaHasta || fecha <= fechaHasta;

        return (
          matchesSearch &&
          matchesProvider &&
          matchesCategory &&
          matchesArticle &&
          matchesUser &&
          afterDesde &&
          beforeHasta
        );
      })
      .sort((a, b) => new Date(b.fechaCambio) - new Date(a.fechaCambio)); // Fijo por fecha descendente
  }, [
    mappedHistory,
    searchTerm,
    selectedProvider,
    selectedCategory,
    selectedArticle,
    selectedUser,
    fechaDesde,
    fechaHasta,
  ]);

  // KPIs
  const totalChanges = filteredHistory.length;
  const uniqueProvidersCount = new Set(
    filteredHistory.map((item) => item.proveedorId)
  ).size;
  const uniqueArticlesCount = new Set(
    filteredHistory.map((item) => `${item.codigo}-${item.proveedorId}`)
  ).size;
  const increases = filteredHistory.filter(
    (item) => item.precioNuevo > item.precioAnterior
  ).length;
  const decreases = filteredHistory.filter(
    (item) => item.precioNuevo < item.precioAnterior
  ).length;
  const avgPriceChange =
    filteredHistory.length > 0
      ? filteredHistory.reduce((acc, item) => {
          if (!item.precioAnterior || item.precioAnterior === 0) return acc;
          const change =
            ((item.precioNuevo - item.precioAnterior) / item.precioAnterior) *
            100;
          return acc + change;
        }, 0) /
        filteredHistory.filter(
          (item) => item.precioAnterior && item.precioAnterior !== 0
        ).length
      : 0;

  // Formatters
  const formatDate = (dateString) => {
    if (!dateString) return "-";
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
    if (price === null || price === undefined || isNaN(price)) return "-";
    return new Intl.NumberFormat("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };
  const getPriceChangeBadge = (oldPrice, newPrice) => {
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

  if (isLoading || !proveedores)
    return <div className="p-6">Cargando historial de precios...</div>;
  if (error)
    return (
      <div className="p-6 text-red-500">Error al cargar el historial.</div>
    );

  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-6">
      <HistorialPreciosGlobalTitle />
      <Separator className="mt-6" />
      <HistorialPreciosGlobalCards
        totalChanges={totalChanges}
        uniqueArticlesCount={uniqueArticlesCount}
        uniqueProvidersCount={uniqueProvidersCount}
        increases={increases}
        decreases={decreases}
        avgPriceChange={avgPriceChange}
      />
      <HistorialPreciosGlobalFiltros
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedProvider={selectedProvider}
        setSelectedProvider={setSelectedProvider}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedArticle={selectedArticle}
        setSelectedArticle={setSelectedArticle}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        fechaDesde={fechaDesde}
        setFechaDesde={setFechaDesde}
        fechaHasta={fechaHasta}
        setFechaHasta={setFechaHasta}
        uniqueProviders={uniqueProviders}
        uniqueCategories={uniqueCategories}
        uniqueArticles={uniqueArticles}
        uniqueUsers={uniqueUsers}
        proveedores={proveedores}
      />
      <HistorialPreciosGlobalTable
        filteredHistory={filteredHistory}
        formatDate={formatDate}
        formatPrice={formatPrice}
        getPriceChangeBadge={getPriceChangeBadge}
      />
    </div>
  );
}
