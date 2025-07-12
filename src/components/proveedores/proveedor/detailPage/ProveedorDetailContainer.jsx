import ProveedorDetailInfo from "./ProveedorDetailInfo";
import BackButton from "@/components/ui/back-button";
import ProveedorCurrentAccount from "@/components/proveedores/proveedor/detailPage/ProveedorCurrentAccount";
import ProveedorAccordionContainer from "../ProveedorAccordionContainer";
import { Button } from "@/components/ui/button";
import { LineChart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProveedorDetailContainer = ({
  currentProveedores,
  invoices,
  payments,
  paymentItems,
  articles,
  compras,
  loadingArticulos,
  errorArticulos,
  loadingFacturas,
  errorFacturas,
  loadingOP,
  errorOP,
  loadingCompras,
  errorCompras,
}) => {
  const currentProveedor = currentProveedores;
  const navigate = useNavigate();
  return (
    <div className="mx-6 mt-2 mb-4 space-y-8 mb-10">
      {/* Info principal */}
      <div className="rounded-lg border text-card-foreground shadow-sm p-4 md:p-6">
        <div className="flex flex-col flex-col-reverse md:flex-col md:flex-row gap-2 justify-between items-start">
          <div className="flex flex-col space-y-1.5 mb-7">
            <h3 className="text-xl md:text-2xl font-semibold leading-none tracking-tight">
              Información de Proveedor:
              <span className="font-regular"> {currentProveedor.nombre}</span>
            </h3>
            <p className=" text-xs md:text-sm text-muted-foreground md:max-w-[600px] break-words">
              Accedé a la información completa del proveedor, incluyendo datos
              de contacto, artículos asociados, historial de órdenes de pagos,
              facturación y su cuenta corriente.
            </p>
          </div>
          <div className="w-full md:w-fit flex justify-between md:justify-start md:items-center gap-2 mb-2">
            <BackButton />
            <Button
              className="gap-2 bg-slate-800 hover:bg-gray-700 text-white text-sm font-semibold rounded-sm cursor-pointer py-5"
              onClick={() =>
                navigate(
                  `/proveedores/${currentProveedores.id_proveedor}/historial-precios`
                )
              }
            >
              <LineChart className="h-4 w-4" />
              Historial de Precios
            </Button>
          </div>
        </div>
        <ProveedorDetailInfo proveedor={currentProveedor} />
      </div>

      {/* Cuenta corriente */}
      <ProveedorCurrentAccount
        currentProveedor={currentProveedor}
        paymentItems={paymentItems}
        invoices={invoices}
        payments={payments}
      />

      {/* Accordion con los loaders y errores */}
      <ProveedorAccordionContainer
        currentProveedores={currentProveedor}
        invoices={invoices}
        isLoadingInvoices={loadingFacturas}
        errorInvoices={errorFacturas}
        payments={payments}
        isLoadingPayments={loadingOP}
        errorPayments={errorOP}
        articles={articles || []}
        isLoadingArticles={loadingArticulos}
        errorArticles={errorArticulos}
        compras={compras}
        isLoadingCompras={loadingCompras}
        errorCompras={errorCompras}
        paymentItems={paymentItems}
      />
    </div>
  );
};

export default ProveedorDetailContainer;
