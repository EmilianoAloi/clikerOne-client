const HistorialPreciosTitle = ({ nombre, cuit, id, estado, razonSocial }) => {
  // Mapea el estado numérico a un texto legible
  const estadoTexto = estado === 1 ? "Activo" : "Inactivo";

  return (
    <>
      <div className="mx-7 my-4 flex justify-between ">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Historial de Precios: {nombre}
            </h1>
            <span
              className={`bg-${estado === 1 ? "green" : "red"}-100 text-${
                estado === 1 ? "green" : "red"
              }-700 px-3 py-1 mt-[2px] rounded border border-green-300 text-xs font-medium`}
            >
              {estadoTexto}
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>
              <strong>ID:</strong> {id}
            </span>
            <span>
              <strong>CUIT:</strong> {cuit}
            </span>
            <span>
              <strong>Razón Social:</strong> {razonSocial}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistorialPreciosTitle;
