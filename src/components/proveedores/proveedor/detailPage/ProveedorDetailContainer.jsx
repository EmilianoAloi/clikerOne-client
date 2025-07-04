import ProveedorDetailInfo from "./ProveedorDetailInfo";
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

  return (
    <div className="mx-6 mt-2 mb-4 space-y-8 mb-10">
      <p>adasdasdas</p>
      {/* Info principal */}
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

      {/* Cuenta corriente */}
      <ProveedorCurrentAccountContainer
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
