import { useEffect, useState } from "react";
import { useProveedores } from "@/utils/useProveedores";

const ProveedoresTitle = () => {
  const { proveedores } = useProveedores();
  const [isLoaded, setIsLoaded] = useState(false);
  // Animar SOLO cuando está vacío
  useEffect(() => {
    if (proveedores.length === 0) {
      const timer = setTimeout(() => setIsLoaded(true), 50);
      return () => clearTimeout(timer);
    }
    setIsLoaded(false); // Si hay proveedores, mostrar directo
  }, [proveedores]);

  // Armá la clase condicional
  const animClass =
    proveedores.length === 0
      ? `fade-in stagger-1${isLoaded ? " loaded" : ""}`
      : "";

  const animClass2 =
    proveedores.length === 0
      ? `fade-in stagger-2${isLoaded ? " loaded" : ""}`
      : "";

  return (
    <>
      <div className="flex justify-between items-start !w-full">
        <div className="flex flex-col space-y-1.5">
          <div className={`flex justify-between !w-full ${animClass}`}>
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Gestión de Proveedores
            </h3>
          </div>
          <p className={`text-sm text-muted-foreground lg:w-2/3 ${animClass2}`}>
            Administrá tus proveedores con acceso a su información, operaciones
            recientes, cuenta corriente y herramientas para editar, eliminar o
            agregar proveedores.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProveedoresTitle;
