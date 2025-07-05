import { useHistorialPreciosGlobal } from "@/queries/proveedores/articulo/historial-precios/useHistorialPreciosGlobal";
import { useProveedores } from "@/queries/proveedores/useProveedores";
import { useMemo, useState } from "react";

const HistorialPreciosGlobalContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState("all");
  const [sortBy, setSortBy] = useState("fecha-desc");
  const [fechaDesde, setFechaDesde] = useState("");

  // Historial de precios
  const {
    data: priceHistory = [],

    isLoading,
    error,
  } = useHistorialPreciosGlobal();

  // Lista completa de proveedores (para el filtro)
  const { data: proveedores = [] } = useProveedores();
  // Mapeo y orden
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

  // Filtros y ordenamiento
  const filteredHistory = useMemo(() => {
    let data = mappedHistory.filter((item) => {
      const matchesSearch =
        item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.proveedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.usuario.toLowerCase().includes(searchTerm.toLowerCase());
      console.log("priceHistory", priceHistory);

      console.log("mappedHistor2y", mappedHistory);

      const matchesProvider =
        selectedProvider === "all" || item.proveedor === selectedProvider;

      const matchesCategory =
        selectedCategory === "all" || item.categoria === selectedCategory;

      const matchesArticle =
        selectedArticle === "all" || item.codigo === selectedArticle;

      return (
        matchesSearch && matchesProvider && matchesCategory && matchesArticle
      );
    });

    // Ordenamiento
    switch (sortBy) {
      case "fecha-desc":
        data = data.sort(
          (a, b) => new Date(b.fechaCambio) - new Date(a.fechaCambio)
        );
        break;
      case "fecha-asc":
        data = data.sort(
          (a, b) => new Date(a.fechaCambio) - new Date(b.fechaCambio)
        );
        break;
      case "proveedor-asc":
        data = data.sort((a, b) => a.proveedor.localeCompare(b.proveedor));
        break;
      case "precio-desc":
        data = data.sort((a, b) => (b.precioNuevo ?? 0) - (a.precioNuevo ?? 0));
        break;
      case "cambio-desc":
        data = data.sort(
          (a, b) =>
            (((b.precioNuevo ?? 0) - (b.precioAnterior ?? 0)) /
              (b.precioAnterior ?? 1)) *
              100 -
            (((a.precioNuevo ?? 0) - (a.precioAnterior ?? 0)) /
              (a.precioAnterior ?? 1)) *
              100
        );
        break;
      default:
        break;
    }
    return data;
  }, [
    mappedHistory,
    searchTerm,
    selectedProvider,
    selectedCategory,
    selectedArticle,
    sortBy,
  ]);
  console.log("filteredHistory", filteredHistory);

  // Únicos para filtros
  const uniqueArticles = useMemo(
    () =>
      Array.from(
        new Set(mappedHistory.map((item) => item.codigo).filter((c) => !!c))
      ),
    [mappedHistory]
  );
  const uniqueCategories = useMemo(
    () =>
      Array.from(
        new Set(mappedHistory.map((item) => item.categoria).filter((c) => !!c))
      ),
    [mappedHistory]
  );

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
          if (
            item.precioAnterior === null ||
            item.precioAnterior === undefined ||
            item.precioAnterior === 0
          )
            return acc;
          const change =
            ((item.precioNuevo - item.precioAnterior) / item.precioAnterior) *
            100;
          return acc + change;
        }, 0) /
        filteredHistory.filter(
          (item) =>
            item.precioAnterior !== null &&
            item.precioAnterior !== 0 &&
            item.precioAnterior !== undefined
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

  if (isLoading || !proveedores)
    return <div className="p-6">Cargando historial de precios...</div>;
  if (error)
    return (
      <div className="p-6 text-red-500">Error al cargar el historial.</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* KPIs Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="rounded-lg border p-4 bg-white flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">{totalChanges}</div>
            <div className="text-gray-600 text-sm">Total Cambios</div>
            <div className="text-xs text-gray-400 mt-1">Registros</div>
          </div>
          <div className="rounded-lg border p-4 bg-white flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">{uniqueArticlesCount}</div>
            <div className="text-gray-600 text-sm">Artículos Afectados</div>
            <div className="text-xs text-gray-400 mt-1">Artículos únicos</div>
          </div>
          <div className="rounded-lg border p-4 bg-white flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">{uniqueProvidersCount}</div>
            <div className="text-gray-600 text-sm">Proveedores</div>
            <div className="text-xs text-gray-400 mt-1">Activos</div>
          </div>
          <div className="rounded-lg border p-4 bg-white flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-red-600">{increases}</div>
            <div className="text-gray-600 text-sm">Aumentos</div>
            <div className="text-xs text-gray-400 mt-1">Al alza</div>
          </div>
          <div className="rounded-lg border p-4 bg-white flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-green-600">{decreases}</div>
            <div className="text-gray-600 text-sm">Reducciones</div>
            <div className="text-xs text-gray-400 mt-1">A la baja</div>
          </div>
          <div className="rounded-lg border p-4 bg-white flex flex-col items-center justify-center">
            <div
              className={`text-2xl font-bold ${
                avgPriceChange >= 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {avgPriceChange >= 0 ? "+" : ""}
              {isNaN(avgPriceChange) ? "0.0" : avgPriceChange.toFixed(1)}%
            </div>
            <div className="text-gray-600 text-sm">Promedio</div>
            <div className="text-xs text-gray-400 mt-1">Cambio</div>
          </div>
        </div>

        {/* FILTROS */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Buscar */}
          <input
            type="text"
            className="border rounded px-3 py-2 bg-white"
            placeholder="Código, nombre, proveedor, categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Proveedor */}
          <select
            className="border rounded px-3 py-2 bg-white"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
          >
            <option value="all">Todos los proveedores</option>
            {proveedores
              .filter((p) => p.estado_logico === 1) // opcional: solo activos
              .map((prov) => (
                <option key={prov.id_proveedor} value={prov.nombre}>
                  {prov.nombre}
                </option>
              ))}
          </select>
          {/* Categoría */}
          <select
            className="border rounded px-3 py-2 bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Todas las categorías</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {/* Artículo */}
          <select
            className="border rounded px-3 py-2 bg-white"
            value={selectedArticle}
            onChange={(e) => setSelectedArticle(e.target.value)}
          >
            <option value="all">Todos los artículos</option>
            {uniqueArticles.map((art) => (
              <option key={art} value={art}>
                {art}
              </option>
            ))}
          </select>
          {/* Ordenar Por */}
          <select
            className="border rounded px-3 py-2 bg-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="fecha-desc">Fecha (más reciente)</option>
            <option value="fecha-asc">Fecha (más antigua)</option>
            <option value="proveedor-asc">Proveedor (A-Z)</option>
            <option value="precio-desc">Precio (mayor a menor)</option>
            <option value="cambio-desc">Cambio % (mayor a menor)</option>
          </select>
          {/* Rango de fechas (ejemplo simple) */}
          <input
            type="date"
            className="border rounded px-3 py-2 bg-white"
            value={fechaDesde}
            onChange={(e) => setFechaDesde(e.target.value)}
          />
        </div>

        {/* TABLA */}
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">
                    Fecha
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">
                    Usuario
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">
                    Código
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">
                    Nombre
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">
                    Categoría
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">
                    Color
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">
                    Descripción
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">
                    U. Medida
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">
                    Precio Anterior
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">
                    Precio Nuevo
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">
                    Cambio
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item) => (
                  <tr key={item.id}>
                    <td className="px-3 py-2">
                      {formatDate(item.fechaCambio)}
                    </td>
                    <td className="px-3 py-2">{item.usuario}</td>
                    <td className="px-3 py-2">{item.codigo}</td>
                    <td className="px-3 py-2">{item.nombre}</td>
                    <td className="px-3 py-2">{item.categoria}</td>
                    <td className="px-3 py-2">{item.color}</td>
                    <td className="px-3 py-2">{item.descripcion}</td>
                    <td className="px-3 py-2">{item.unidadMedida}</td>
                    <td className="px-3 py-2">
                      {formatPrice(item.precioAnterior)}
                    </td>
                    <td className="px-3 py-2">
                      {formatPrice(item.precioNuevo)}
                    </td>
                    <td className="px-3 py-2">
                      {item.precioAnterior === null ||
                      item.precioAnterior === undefined ? (
                        <span className="inline-block px-2 py-1 rounded-full bg-gray-50 text-gray-500 font-semibold text-xs border border-gray-200">
                          Inicial
                        </span>
                      ) : (
                        (() => {
                          const change =
                            ((item.precioNuevo - item.precioAnterior) /
                              item.precioAnterior) *
                            100;
                          if (change > 0) {
                            return (
                              <span className="inline-block px-2 py-1 rounded-full bg-red-100 text-red-600 font-semibold text-xs">
                                +{change.toFixed(1)}%
                              </span>
                            );
                          } else if (change < 0) {
                            return (
                              <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-600 font-semibold text-xs">
                                {change.toFixed(1)}%
                              </span>
                            );
                          }
                          return (
                            <span className="inline-block px-2 py-1 rounded-full bg-gray-100 text-gray-500 font-semibold text-xs">
                              Sin cambio
                            </span>
                          );
                        })()
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredHistory.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No se encontraron registros de cambios de precios con los
                  filtros aplicados.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorialPreciosGlobalContainer;
