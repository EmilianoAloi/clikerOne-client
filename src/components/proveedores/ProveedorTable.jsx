import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProveedoresTableSkeleton } from "./ProveedorTableSkeleton";
import { SupppliersColumns } from "./ProveedorColumns";
import { useProveedores } from "@/queries/proveedores/useProveedores";

export default function ProveedoresTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Traer proveedores desde React Query
  const {
    data: proveedores = [],
    isLoading,
    isError,
    refetch,
  } = useProveedores();

  // 2. Si venís de un alta/edición, forzá el refetch y limpiá el state del router
  useEffect(() => {
    if (location.state?.refresh) {
      refetch();
      navigate(location.pathname, { replace: true });
    }
    // eslint-disable-next-line
  }, [location.state, location.pathname, navigate, refetch]);

  // 3. Filtrado
  const filteredProveedores = (proveedores || []).filter((s) => {
    const query = searchTerm.toLowerCase().trim();
    return (
      Object.values(s)
        .filter((val) => typeof val === "string" || typeof val === "number")
        .some((val) => String(val).toLowerCase().includes(query)) ||
      s.facturasText?.toLowerCase().trim().includes(query) ||
      s.saldoText?.toLowerCase().trim().includes(query)
    );
  });

  // 4. Animación para estado vacío (opcional, tu lógica original)
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (proveedores.length === 0 && !isLoading) {
      const timer = setTimeout(() => setIsLoaded(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(false);
    }
  }, [proveedores, isLoading]);

  const mainClass =
    proveedores.length === 0
      ? `container mx-auto py-5 space-y-6 fade-in stagger-2${
          isLoaded ? " loaded" : ""
        }`
      : "container mx-auto py-5 space-y-6";
  const headerClass =
    proveedores.length === 0
      ? `flex flex-col md:flex-row md:items-center md:justify-between gap-4 fade-in stagger-3${
          isLoaded ? " loaded" : ""
        }`
      : "flex flex-col md:flex-row md:items-center md:justify-between gap-4";

  return (
    <div className={mainClass}>
      <div className={headerClass}>
        <Input
          type="text"
          placeholder="Buscar proveedor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:max-w-sm"
        />
        <Link to="/proveedores/agregar">
          <Button className="text-white text-sm font-semibold rounded-sm cursor-pointer py-5">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Proveedor
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <ProveedoresTableSkeleton />
      ) : isError ? (
        <div className="text-red-500 p-6">Error al cargar proveedores</div>
      ) : (
        <DataTable
          idField="id_proveedor"
          columns={SupppliersColumns}
          data={filteredProveedores}
          enableRowClick={true}
          defaultSort={[{ id: "id_proveedor", desc: false }]}
          onRowClick={(row) => {
            if (row.estado_logico !== 0) {
              navigate(`/proveedores/${row.id_proveedor}`);
            }
          }}
        />
      )}
    </div>
  );
}
