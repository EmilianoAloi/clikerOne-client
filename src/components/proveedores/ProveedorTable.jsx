import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { useSuppliers } from "@/contexts/SuppliersContext";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom"; // Cambia este import
import { SuppliersTableSkeleton } from "./ProveedorTableSkeleton";
import { SupppliersColumns } from "./ProveedorColumns";

export default function SuppliersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const { suppliers } = useSuppliers();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (suppliers.length > 0) setIsLoading(false);
  }, [suppliers]);

  const filteredSuppliers = suppliers.filter((s) => {
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
        <SuppliersTableSkeleton />
      ) : (
        <DataTable
          idField="id_proveedor"
          columns={SupppliersColumns}
          data={filteredSuppliers}
          enableRowClick={true}
        />
      )}
    </div>
  );
}
