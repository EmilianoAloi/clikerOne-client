import { Accordion } from "@/components/ui/accordion";
import ProveedoresDetailAccordionOc from "./ProveedoresDetailAccordionOc";
import ProveedoresDetailAccordionFacturacion from "./ProveedoresDetailAccordionFacturacion";
import ProveedoresDetailAccordionOp from "./ProveedoresDetailAccordionOp";
import ProveedoresDetailAccordionArticulos from "./ProveedoresDetailAccordionArticulos";
import { useRemoveCompra } from "@/queries/proveedores/compras/useRemoveCompra";
import { toast } from "sonner";

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
  const removeCompraMutation = useRemoveCompra();

  const handleDeleteCompra = async (id) => {
    try {
      await removeCompraMutation.mutateAsync(id);
      return true;
    } catch (err) {
      if (err.status === 403) {
        toast.error("No tienes permiso para eliminar esta orden.");
      } else if (err.status === 404) {
        toast.error("La orden de compra no existe.");
      } else {
        toast.error("Error al eliminar la orden.");
      }
      return false;
    }
  };

  return (
    <Accordion
      type="multiple"
      className="space-y-4 mb-12"
      defaultValue={["cuentacorriente"]}
    >
      <ProveedoresDetailAccordionArticulos
        currentProveedores={currentProveedores}
        articles={articles || []}
        isLoading={isLoadingArticles}
        error={errorArticles}
      />
      <ProveedoresDetailAccordionOc
        currentProveedores={currentProveedores}
        compras={compras}
        isLoading={isLoadingCompras}
        error={errorCompras}
        onDeleteCompra={handleDeleteCompra}
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
    </Accordion>
  );
};

export default ProveedorAccordionContainer;
