import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProveedorDetailInfo from "./ProveedorDetailInfo";
import { useProveedor } from "@/contexts/ProveedorContext";
import BackButton from "@/components/ui/back-button";
import ProveedorCurrentAccountContainer from "@/components/proveedores/proveedor/detailPage/ProveedorCurrentAccountContainer";
import ProveedorAccordionContainer from "../ProveedorAccordionContainer";

const ProveedorDetailContainer = ({
  currentProveedores,
  invoices,
  payments,
  paymentItems,
  articles,
  compras,
}) => {
  const { proveedores = [] } = useProveedor() || {};
  const { id } = useParams();
  const [currentProveedor, setCurrentProveedor] = useState(currentProveedores);

  useEffect(() => {
    const idNum = Number(id);
    const updatedProveedor = proveedores.find((p) => p.id_proveedor === idNum);
    if (updatedProveedor) setCurrentProveedor(updatedProveedor);
  }, [proveedores, id]);

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
        <ProveedorDetailInfo proveedor={currentProveedor} />
      </div>

      <ProveedorCurrentAccountContainer
        currentProveedor={currentProveedor}
        paymentItems={paymentItems}
        invoices={invoices}
        payments={payments}
        compras={compras}
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
