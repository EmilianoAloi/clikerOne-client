import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { useProveedores } from "@/contexts/ProveedorContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProveedoresTableSkeleton } from "./ProveedorTableSkeleton";
import { SupppliersColumns } from "./ProveedorColumns";

export default function ProveedoresTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const { proveedores, refreshProveedores } = useProveedores();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animación solo para estado vacío
  useEffect(() => {
    if (proveedores.length === 0) {
      const timer = setTimeout(() => setIsLoaded(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(false);
    }
  }, [proveedores]);

  // -- CLASES ANIMACIÓN SOLO SI ESTÁ VACÍO --
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

  const location = useLocation();
  const navigate = useNavigate();

  // Refresca solo si venís de un alta (o edición)
  useEffect(() => {
    if (location.state?.refresh) {
      refreshProveedores(true); // <<---- Forzá el fetch de la API
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, location.pathname, navigate, refreshProveedores]);

  useEffect(() => {
    if (proveedores.length > 0) setIsLoading(false);
  }, [proveedores]);

  const filteredProveedores = proveedores.filter((s) => {
    const query = searchTerm.toLowerCase().trim();

    return (
      Object.values(s)
        .filter((val) => typeof val === "string" || typeof val === "number")
        .some((val) => String(val).toLowerCase().includes(query)) ||
      s.facturasText?.toLowerCase().trim().includes(query) ||
      false ||
      s.saldoText?.toLowerCase().trim().includes(query) ||
      false
    );
  });

  return (
    <div className={mainClass}>
      {/* Header de tabla: búsqueda + agregar */}
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
