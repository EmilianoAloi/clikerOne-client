import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Cambiado de next/navigation a react-router-dom

// import SupplieDetailAccordionsContainer from "./supplier-accordions/supplier-accordions-container";
import BackButton from "@/components/ui/back-button";
import SupplierDetailInfo from "./SupplierDetailInfo";
import { useSuppliers } from "@/contexts/SuppliersContext";
import SupplierCC from "./SupplierCC";
// import SupplierCurrentAccount from "./supplier-accordions/supplier-accordion-cc";
// import {
// SupplierPayment,
// SupplierPaymentItem,
// } from "@/types/supplier-payments";
// import { SupplierCompra } from "@/types/supplier-compras";

const SuppliersDetailContainer = ({
  supplier: initialSupplier,
  invoices,
  payments,
  paymentItems,
  compras,
}) => {
  const { suppliers } = useSuppliers();
  const { id } = useParams(); // Usando react-router-dom
  const [currentSupplier, setCurrentSupplier] = useState(initialSupplier);

  // Buscar el proveedor actualizado desde suppliers
  useEffect(() => {
    const idNum = Number(id);
    const updatedSupplier = suppliers.find((s) => s.id_proveedor === idNum);

    if (updatedSupplier) {
      setCurrentSupplier(updatedSupplier);
    }
  }, [suppliers, id]);

  if (!currentSupplier) return <p className="p-4">Proveedor no encontrado.</p>;

  return (
    <div className="mx-6 mt-2 mb-4 space-y-8">
      <div className="rounded-lg border text-card-foreground shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col space-y-1.5 mb-7">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Información de Proveedor:
              <span className="font-regular"> {currentSupplier.nombre}</span>
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
        <SupplierDetailInfo supplier={currentSupplier} />
      </div>

      <SupplierCC
        currentSupplier={currentSupplier}
        paymentItems={paymentItems}
        invoices={invoices}
        payments={payments}
        compras={compras}
      />

      {/*
      <SupplieDetailAccordionsContainer
        currentSupplier={currentSupplier}
        invoices={invoices}
        payments={payments}
        paymentItems={paymentItems}
        articles={currentSupplier.articulos || []}
      /> */}
    </div>
  );
};

export default SuppliersDetailContainer;
