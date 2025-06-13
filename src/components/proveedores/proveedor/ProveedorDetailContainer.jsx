import { Accordion } from "@/components/ui/accordion";

const ProveedoresDetailContainer = ({
  currentProveedores,
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
      <ProveedoresDetailAccordionOc currentProveedores={currentProveedores} />
      <ProveedoresDetailAccordionFacturacion
        currentProveedores={currentProveedores}
        invoices={invoices || []}
      />
      <ProveedoresDetailAccordionOp
        currentProveedores={currentProveedores}
        ProveedoresPayments={payments || []}
        paymentItems={paymentItems || []}
      />
      <ProveedoresDetailAccordionArticulos
        currentProveedores={currentProveedores}
        articles={articles || []}
      />
    </Accordion>
  );
};

export default ProveedoresDetailContainer;
