import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import OCviewObs from "./OCviewObs";
import OCviewItems from "./OCviewItems";
import OCviewTitle from "./OCviewTitle";
import OCviewHeader from "./OCviewHeader";

const OCviewContainer = ({ orden }) => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  return (
    <div
      id="orden-compra-comprobante"
      className="lg:container mx-auto lg:px-8 print:px-0 print:mx-0 print:max-w-full print:mt-4 print:pt-0"
    >
      <div className="flex justify-end gap-2 mb-2 me-3 !print:hidden">
        <Button
          onClick={handlePrint}
          disabled={isPrinting}
          variant="outline"
          className="cursor-pointer mb-1"
        >
          <Printer className="mr-1 h-4 w-4" />
          {isPrinting ? "Imprimiendo..." : "Imprimir Orden de compra"}
        </Button>
      </div>

      <OCviewTitle orden={orden} />
      <OCviewHeader orden={orden} />
      <OCviewItems items={orden.items || []} />
      <OCviewObs orden={orden} />
    </div>
  );
};

export default OCviewContainer;
