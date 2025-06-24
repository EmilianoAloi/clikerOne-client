const ArticulosTitle = () => {
  return (
    <div className="flex justify-between items-start !w-full">
      <div className="flex flex-col space-y-1.5">
        <div className="flex justify-between !w-full">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Gestión de Artículos
          </h3>
        </div>
        <p className="text-sm text-muted-foreground lg:w-2/3">
          Explorá y administrá tus insumos. Consultá historial de precios,
          categorías, proveedores asociados y más herramientas para mantener tu
          catálogo actualizado.
        </p>
      </div>
    </div>
  );
};

export default ArticulosTitle;
