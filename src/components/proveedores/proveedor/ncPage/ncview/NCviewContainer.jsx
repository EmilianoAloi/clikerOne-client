import { useState } from "react";

import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import NCviewTitle from "./NCviewTitle";
import NCviewItem from "./NCviewItem";
import NCviewHeader from "./NCviewHeader";
import NCviewExtras from "./NCviewExtras";

export default function NCviewContainer({ notaCredito, proveedorId }) {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  return (
    <div className="lg:container mx-auto lg:px-8 print:px-0 print:mx-0 print:max-w-full print:mt-0 print:pt-0">
      <div className="flex justify-end gap-2 md:mt-[-20px] mb-2 me-3 !print:hidden">
        <BackButton />
        <Button
          onClick={handlePrint}
          disabled={isPrinting}
          variant="outline"
          className="cursor-pointer mb-1"
        >
          <Printer className="mr-1 h-4 w-4" />
          {isPrinting ? "Imprimiendo..." : "Imprimir Nota de Crédito"}
        </Button>
      </div>
      <NCviewTitle notaCredito={notaCredito} />

      <NCviewHeader notaCredito={notaCredito} />

      <NCviewItem notaCredito={notaCredito} items={notaCredito.items || []} />

      <NCviewExtras notaCredito={notaCredito} />
    </div>
  );
}
