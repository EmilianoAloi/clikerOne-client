const ProveedoresTitle = () => {
  return (
    <>
      <div className="flex justify-between items-start !w-full">
        <div className="flex flex-col space-y-1.5">
          <div className="flex justify-between !w-full ">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Gestión de Proveedores
            </h3>
            {/* <Link href="/Proveedor/agregar">
              <Button className=" text-white text-sm font-semibold rounded-sm cursor-pointer py-5">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Proveedor
              </Button>
            </Link> */}
          </div>
          <p className="text-sm text-muted-foreground lg:w-2/3">
            Administrá tus proveedores con acceso a su información, operaciones
            recientes, cuenta corriente y herramientas para editar, eliminar o
            agregar proveedores.
          </p>
        </div>

        {/* <BackButton /> */}
      </div>
    </>
  );
};

export default ProveedoresTitle;
