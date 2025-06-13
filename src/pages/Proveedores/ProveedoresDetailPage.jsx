import SupplierDetailInfo from "@/components/proveedores/proveedor/SupplierDetailInfo";
import BackButton from "@/components/ui/back-button";
import { useSuppliers } from "@/contexts/SuppliersContext";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

export default function SupplierDetailPage() {
  const { id } = useParams();
  const idProveedor = Number(id);

  const { suppliers, refreshSuppliers } = useSuppliers();

  // Buscamos el supplier por id
  const supplier = useMemo(
    () => suppliers.find((s) => s.id_proveedor === idProveedor),
    [suppliers, idProveedor]
  );

  // Si no está, intentamos refrescar
  useEffect(() => {
    if (!supplier) {
      refreshSuppliers();
    }
  }, [supplier, refreshSuppliers]);

  if (!supplier) return <div className="p-6">Proveedor no encontrado.</div>;

  return (
    <div className="mx-6 mt-2 mb-4 space-y-8">
      <div className="rounded-lg border text-card-foreground shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col space-y-1.5 mb-7">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Información de Proveedor:
              <span className="font-regular"> {supplier?.nombre}</span>
            </h3>
            <p className="text-sm text-muted-foreground md:max-w-[600px] break-words">
              Accedé a la información completa del proveedor, incluyendo datos
              de contacto, artículos asociados, historial de órdenes de pagos,
              facturación y su cuenta corriente.
            </p>
          </div>
          <span>
            <BackButton />
          </span>
        </div>
        <SupplierDetailInfo supplier={supplier} />
      </div>

      {/* <SupplierCurrentAccount
        currentSupplier={supplier}
        paymentItems={paymentItems}
        invoices={invoices}
        payments={payments}
        compras={compras}
      />

      <SupplieDetailAccordionsContainer
        currentSupplier={supplier}
        invoices={invoices}
        payments={payments}
        paymentItems={paymentItems}
        articles={supplier.articulos || []}
      /> */}
    </div>
  );
}
