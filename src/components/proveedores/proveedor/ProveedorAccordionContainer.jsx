import { Accordion } from "@/components/ui/accordion";
import ProveedoresDetailAccordionOc from "./provedoresaccordions/ProveedoresDetailAccordionOc";
import ProveedoresDetailAccordionFacturacion from "./provedoresaccordions/ProveedoresDetailAccordionFacturacion";
import ProveedoresDetailAccordionOp from "./provedoresaccordions/ProveedoresDetailAccordionOp";
import ProveedoresDetailAccordionArticulos from "./provedoresaccordions/ProveedoresDetailAccordionArticulos";
import ProveedorTitle from "./detailPage/ProveedorTitle";
import { Separator } from "@/components/ui/separator";
import ProveedorTable from "./detailPage/ProveedorTable";

const ProveedorAccordionContainer = ({
  currentProveedores,
  invoices,
  payments,

  paymentItems = [],
  articles,
}) => {
  return (
    <>
      <ProveedorTitle />
      <Separator className="space-y-8 !container mx-auto" />
      <ProveedorTable />
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
          payments={payments || []}
          paymentItems={paymentItems || []}
        />

        <ProveedoresDetailAccordionArticulos
          currentProveedores={currentProveedores}
          articles={articles || []}
        />
      </Accordion>
    </>
  );
};

export default ProveedorAccordionContainer;
