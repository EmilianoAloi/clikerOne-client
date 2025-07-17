import BackButton from "@/components/ui/back-button";
import React from "react";

const InformesTitle = () => {
  return (
    <div className="mx-7 my-4 flex justify-between items-start">
      <div>
        <div className="flex items-center gap-3 ">
          <h1 className="text-2xl font-bold text-gray-900">Informes</h1>
        </div>

        <div className="text-sm text-gray-500 md:max-w-[500px]">
          Accede a todos los informes de facturas, órdenes de compra y órdenes
          de pago. Exportacion a Excel incluida.
        </div>
      </div>
      <BackButton />
    </div>
  );
};

export default InformesTitle;
