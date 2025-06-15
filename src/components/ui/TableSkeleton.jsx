import { Skeleton } from "./skeleton";

const TableSkeleton = () => {
  const fakeRows = Array.from({ length: 8 });

  return (
    <div className="rounded-md border my-4 overflow-x-auto">
      <div className="w-full min-w-[700px]">
        {/* Cabecera */}
        <div className="flex items-center px-4 py-2 border-b bg-muted">
          <Skeleton className="h-4 w-[40px] mr-4" /> {/* ID */}
          <Skeleton className="h-4 w-[120px] mr-4" /> {/* Nombre */}
          <Skeleton className="h-4 w-[160px] mr-4" /> {/* Razón Social */}
          <Skeleton className="h-4 w-[100px] mr-4" /> {/* Teléfono */}
          <Skeleton className="h-4 w-[160px] mr-4" /> {/* Email */}
          <Skeleton className="h-4 w-[100px] mr-4" /> {/* Facturas */}
          <Skeleton className="h-4 w-[130px] mr-4" /> {/* Cuenta Corriente */}
          <Skeleton className="h-4 w-[60px]" /> {/* Acciones */}
        </div>

        {/* Filas simuladas */}
        {fakeRows.map((_, i) => (
          <div
            key={i}
            className="flex items-center px-4 py-4 border-b animate-pulse"
          >
            <Skeleton className="h-4 w-[40px] mr-4" />
            <Skeleton className="h-4 w-[160px] mr-4" />
            <Skeleton className="h-4 w-[160px] mr-4" />
            <Skeleton className="h-4 w-[160px] mr-4" />
            <Skeleton className="h-4 w-[160px] mr-4" />
            <Skeleton className="h-4 w-[160px] mr-4" />
            <Skeleton className="h-4 w-[160px] mr-4" />
            <Skeleton className="h-4 w-[60px]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
