import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ShoppingCart, CreditCard } from "lucide-react";
import InformesOC from "./InformesOC";
import InformesFacturas from "./InformesFacturas";
import InformesOP from "./InformesOP";

export default function InformesContainer() {
  const [activeTab, setActiveTab] = useState("facturas");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Principal */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Centro de Informes
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Accede a todos los reportes de facturas, órdenes de compra y
              órdenes de pago desde un solo lugar
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="px-6 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger
              value="ordenes-compra"
              className="flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Órdenes de Compra
            </TabsTrigger>

            <TabsTrigger value="facturas" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Informes de Facturas
            </TabsTrigger>
            <TabsTrigger
              value="ordenes-pago"
              className="flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Órdenes de Pago
            </TabsTrigger>
          </TabsList>

          <TabsContent value="facturas" className="mt-0">
            <InformesFacturas />
          </TabsContent>

          <TabsContent value="ordenes-compra" className="mt-0">
            <InformesOC />
          </TabsContent>

          <TabsContent value="ordenes-pago" className="mt-0">
            <InformesOP />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
