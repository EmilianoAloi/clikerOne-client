import { Accordion } from "@/components/ui/accordion";

const SupplierDetailContainer = ({
  currentSupplier,
  invoices,
  payments,
  paymentItems = [],
  articles,
}) => {
  return (
    <Accordion
      type="multiple"
      className="space-y-4 mb-12"
      defaultValue={["cuentacorriente"]}
    >
      <SupplierDetailAccordionOc currentSupplier={currentSupplier} />
      <SupplierDetailAccordionFacturacion
        currentSupplier={currentSupplier}
        invoices={invoices || []}
      />
      <SupplierDetailAccordionOp
        currentSupplier={currentSupplier}
        supplierPayments={payments || []}
        paymentItems={paymentItems || []}
      />
      <SupplierDetailAccordionArticulos
        currentSupplier={currentSupplier}
        articles={articles || []}
      />
    </Accordion>
  );
};

export default SupplierDetailContainer;
