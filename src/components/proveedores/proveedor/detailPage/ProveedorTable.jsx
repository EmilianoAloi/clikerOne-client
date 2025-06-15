import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { useProveedor } from "@/contexts/ProveedorContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { columnsCC } from "./ProveedorColumns";
import TableSkeleton from "@/components/ui/TableSkeleton";
export default function ProveedorTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const { proveedores } = useProveedor();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (proveedores && proveedores.length > 0) setIsLoading(false);
  }, [proveedores]);

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

  return (
    <div className="container mx-auto py-5 space-y-6">
      {/* Header de tabla: búsqueda + agregar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
        <TableSkeleton />
      ) : (
        <DataTable
          idField="id_proveedor"
          columns={columnsCC(currentProveedores)}
          data={filteredProveedores}
          enableRowClick={true}
        />
      )}
    </div>
  );
}
