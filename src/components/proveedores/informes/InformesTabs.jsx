import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  TrendingUp,
  TrendingDown,
  Clock,
  Package,
  Eye,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import InformesOC from "./InformesOC";

export default function InformesTabs({
  facturacionMensual,
  estadosOrdenes,
  tendenciaPrecios,
  topArticulos,
}) {
  const [activeTab, setActiveTab] = useState("informes-oc");
  const tabs = [
    { id: "informes-oc", label: "Informes Ordenes de Compra" },
    { id: "Informes-facturas", label: "Informes Facturas" },
    { id: "precios", label: "Informes Ordenes de Pago" },
  ];

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
                  ? "bg-blue-500 text-white shadow-xl border-2 border-blue-300"
                  : "bg-slate-200 text-gray-600 border-2 border-slate-300 hover:bg-slate-400 hover:text-white hover:border-slate-400 font-semibold"
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
        {activeTab === "informes-oc" && <InformesOC />}

        {activeTab === "informes-facturas" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-80">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Proveedores Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">142</div>
                <p className="text-sm text-muted-foreground">de 186 totales</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Cuenta Corriente Promedio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$18,450</div>
                <p className="text-sm text-muted-foreground">saldo promedio</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Facturas Pendientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">45</div>
                <p className="text-sm text-muted-foreground">
                  requieren atención
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "informes-op" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-80">
            <Card>
              <CardHeader>
                <CardTitle>Órdenes por Estado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />{" "}
                    Ejecutadas
                  </span>
                  <Badge variant="secondary">45</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-600" /> Pendientes
                  </span>
                  <Badge variant="secondary">23</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />{" "}
                    Canceladas
                  </span>
                  <Badge variant="secondary">8</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tiempo Promedio de Entrega</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">18 días</div>
                <p className="text-sm text-muted-foreground">
                  desde emisión hasta entrega
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
