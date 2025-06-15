import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProveedorDetailInfo from "./ProveedorDetailInfo";
import { useProveedor } from "@/contexts/ProveedorContext";
import BackButton from "@/components/ui/back-button";
import ProveedorCurrentAccountContainer from "./ProveedorCurrentAccountContainer";
import ProveedorAccordionContainer from "../ProveedorAccordionContainer";

const ProveedorDetailContainer = ({
  currentProveedores,
  invoices,
  payments,
  paymentItems,
  articles,
  // compras, // si lo usás en algún lado (por ahora no)
}) => {
  // ProveedorDetailContainer.jsx
  const { proveedores = [] } = useProveedor() || {}; // USÁ useProveedores acá, no useProveedor
  const { id } = useParams();

  // El proveedor actual según el contexto/prop
  const [currentProveedor, setCurrentProveedor] = useState(currentProveedores);

  useEffect(() => {
    const idNum = Number(id);
    const updatedProveedor = proveedores.find((p) => p.id_proveedor === idNum);
    if (updatedProveedor) setCurrentProveedor(updatedProveedor);
  }, [proveedores, id]);

  // Defensa: si no hay proveedor, mostramos mensaje amigable
  if (!currentProveedor) return <p className="p-4">Proveedor no encontrado.</p>;

  return (
    <div className="mx-6 mt-2 mb-4 space-y-8">
      <div className="rounded-lg border text-card-foreground shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col space-y-1.5 mb-7">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Información de Proveedor:
              <span className="font-regular"> {currentProveedor.nombre}</span>
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
        {/* Acá pasamos el prop correctamente */}
        <ProveedorDetailInfo proveedor={currentProveedor} />
      </div>
      <ProveedorCurrentAccountContainer
        currentProveedores={currentProveedor}
        invoices={invoices}
        payments={payments}
        paymentItems={paymentItems}
      />

      <ProveedorAccordionContainer
        currentProveedores={currentProveedor}
        invoices={invoices}
        payments={payments}
        paymentItems={paymentItems}
        articles={articles || []}
      />
    </div>
  );
};

export default ProveedorDetailContainer;
