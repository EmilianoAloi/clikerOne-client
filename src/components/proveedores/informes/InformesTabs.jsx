import { useState } from "react";

import InformesOC from "./InformesOC";
import InformesFacturas from "./InformesFacturas";
import InformesOP from "./InformesOP";
import { useCompras } from "@/queries/proveedores/compras/useCompras";

export default function InformesTabs() {
  const [activeTab, setActiveTab] = useState("informes-oc");
  const tabs = [
    { id: "informes-oc", label: "Informes Ordenes de Compra" },
    { id: "informes-facturas", label: "Informes Facturas" },
    { id: "informes-op", label: "Informes Ordenes de Pago" },
  ];

  const {
    data: compras,
    isLoading: loadingCompras,
    isError: errorCompras,
  } = useCompras();

  // Estados de carga/error
  if (loadingCompras) {
    return <div className="p-4 text-center">Cargando órdenes de compra…</div>;
  }
  if (errorCompras) {
    return (
      <div className="p-4 text-center text-red-600">
        Error al cargar órdenes de compra
      </div>
    );
  }
  console.log("informes tabs  compras", compras);
  return (
    <div className="">
      {/* Tabs  */}
      <div className=" bg-slate-50 border-l-0 border border-r-0 border-b-0 max-w-full border-slate-300   py-3  ">
        <div className="flex space-x-2 w-full px-6 mt-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={` w-full px-6 py-2 text-sm  rounded transition-all duration-200 relative w-46 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-slate-700 text-white shadow-xl border-2 border-slate-700"
                  : "bg-slate-200 text-gray-600 border-2 border-slate-300  font-semibold"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div className="space-y-6">
        {/* Tab OC */}
        {activeTab === "informes-oc" && <InformesOC compras={compras} />}

        {/* Tab Facturas */}
        {activeTab === "informes-facturas" && <InformesFacturas />}

        {/* Tab OP */}
        {activeTab === "informes-op" && <InformesOP />}
      </div>
    </div>
  );
}
