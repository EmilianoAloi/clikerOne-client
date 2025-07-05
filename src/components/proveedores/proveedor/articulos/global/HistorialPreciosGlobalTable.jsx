// HistorialPreciosGlobalTable.jsx
export default function HistorialPreciosGlobalTable({
  filteredHistory,
  formatDate,
  formatPrice,
  getPriceChangeBadge,
}) {
  return (
    <div className="px-6 mt-6 mb-8">
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
                Proveedor
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
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 py-2">{formatDate(item.fechaCambio)}</td>
                <td className="px-3 py-2">{item.usuario}</td>
                <td className="px-3 py-2">
                  <span className="inline-block rounded bg-gray-100 border border-gray-200 px-2 py-1 text-xs font-semibold">
                    {item.proveedor}
                  </span>
                </td>
                <td className="px-3 py-2 font-mono">{item.codigo}</td>
                <td className="px-3 py-2">{item.nombre}</td>
                <td className="px-3 py-2">
                  <span className="inline-block bg-gray-200 px-2 py-1 rounded text-xs font-medium">
                    {item.categoria}
                  </span>
                </td>
                <td className="px-3 py-2">{item.color}</td>
                <td className="px-3 py-2">{item.descripcion}</td>
                <td className="px-3 py-2">{item.unidadMedida}</td>
                <td className="px-3 py-2 font-mono">
                  {formatPrice(item.precioAnterior)}
                </td>
                <td className="px-3 py-2 font-mono font-semibold">
                  {formatPrice(item.precioNuevo)}
                </td>
                <td className="px-3 py-2">
                  {getPriceChangeBadge(item.precioAnterior, item.precioNuevo)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No se encontraron registros de cambios de precios con los filtros
              aplicados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
