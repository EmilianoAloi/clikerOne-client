import { Accordion } from "@/components/ui/accordion";
import ProveedoresDetailAccordionOc from "./provedoresaccordions/ProveedoresDetailAccordionOc";
import ProveedoresDetailAccordionFacturacion from "./provedoresaccordions/ProveedoresDetailAccordionFacturacion";
import ProveedoresDetailAccordionOp from "./provedoresaccordions/ProveedoresDetailAccordionOp";
import ProveedoresDetailAccordionArticulos from "./provedoresaccordions/ProveedoresDetailAccordionArticulos";

const ProveedorAccordionContainer = ({
  currentProveedores,
  invoices,
  isLoadingInvoices,
  errorInvoices,
  payments,
  isLoadingPayments,
  errorPayments,
  paymentItems = [],
  articles,
  isLoadingArticles,
  errorArticles,
  compras,
  isLoadingCompras,
  errorCompras,
}) => {
  return (
    <Accordion
      type="multiple"
      className="space-y-4 mb-12"
      defaultValue={["cuentacorriente"]}
    >
      <ProveedoresDetailAccordionOc
        currentProveedores={currentProveedores}
        compras={compras}
        isLoading={isLoadingCompras}
        error={errorCompras}
      />

      <ProveedoresDetailAccordionFacturacion
        currentProveedores={currentProveedores}
        invoices={invoices || []}
        isLoading={isLoadingInvoices}
        error={errorInvoices}
      />

      <ProveedoresDetailAccordionOp
        currentProveedores={currentProveedores}
        payments={payments || []}
        paymentItems={paymentItems || []}
        isLoading={isLoadingPayments}
        error={errorPayments}
      />

      <ProveedoresDetailAccordionArticulos
        currentProveedores={currentProveedores}
        articles={articles || []}
        isLoading={isLoadingArticles}
        error={errorArticles}
      />
    </Accordion>
  );
};

export default ProveedorAccordionContainer;
