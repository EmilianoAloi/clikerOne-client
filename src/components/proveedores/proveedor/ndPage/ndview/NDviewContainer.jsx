import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

import NDviewTitle from "./NDviewTitle";
import NDviewExtras from "./NDviewExtras";
import NDviewItem from "./NDviewItem";
import NDviewHeader from "./NDviewHeader";

const NDviewContainer = ({ notaDebito }) => {
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
        <Button
          onClick={handlePrint}
          disabled={isPrinting}
          variant="outline"
          className="cursor-pointer mb-1"
        >
          <Printer className="mr-1 h-4 w-4" />
          {isPrinting ? "Imprimiendo..." : "Imprimir Nota de Débito"}
        </Button>
      </div>
      <NDviewTitle notaDebito={notaDebito} />
      <NDviewHeader notaDebito={notaDebito} />
      <NDviewItem notaDebito={notaDebito} items={notaDebito.items || []} />
      <NDviewExtras notaDebito={notaDebito} />
    </div>
  );
};

export default NDviewContainer;
