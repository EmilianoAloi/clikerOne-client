import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Eye, TrendingUp, TrendingDown } from "lucide-react";
import React from "react";

const HistorialPreciosCards = ({ filteredHistory }) => {
  const totalChanges = filteredHistory.length;
  const uniqueArticlesCount = new Set(
    filteredHistory.map((item) => item.codigo)
  ).size;
  const increases = filteredHistory.filter(
    (item) => item.precioNuevo > item.precioAnterior
  ).length;
  const decreases = filteredHistory.filter(
    (item) => item.precioNuevo < item.precioAnterior
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 my-8 ">
      <Card className="justify-center items-start px-2 ps-6 py-4 rounded   max-w-[300px]   ">
        <CardContent className="p-0">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-md">
              <Calendar className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p style={{ fontWeight: 600 }} className="text-sm text-gray-600">
                Total Cambios
              </p>
              <p className="text-2xl font-bold text-gray-900">{totalChanges}</p>
              <p className="text-xs text-gray-500">
                En el período seleccionado
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="justify-center items-start px-2 ps-6 py-4 rounded   max-w-[300px]   ">
        <CardContent className="p-0">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600">👁️</span>
            </div>
            <div>
              <p style={{ fontWeight: 600 }} className="text-sm text-gray-600">
                Artículos Afectados
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {uniqueArticlesCount}
              </p>
              <p className="text-xs text-gray-500">Artículos únicos</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="justify-center items-start px-2 ps-6 py-4 rounded max-w-[300px]">
        <CardContent className="p-0">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-red-100 rounded-md">
              <span className="text-red-600">📈</span>
            </div>
            <div>
              <p style={{ fontWeight: 600 }} className="text-sm text-gray-600">
                Aumentos
              </p>
              <p className="text-2xl font-bold text-red-600">{increases}</p>
              <p className="text-xs text-gray-500">Cambios al alza</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="justify-center items-start px-2 ps-6 py-4 rounded max-w-[300px]">
        <CardContent className="p-0">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-md">
              <span className="text-green-600">📉</span>
            </div>
            <div>
              <p style={{ fontWeight: 600 }} className="text-sm text-gray-600">
                Reducciones
              </p>
              <p className="text-2xl font-bold text-green-600">{decreases}</p>
              <p className="text-xs text-gray-500">Cambios a la baja</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistorialPreciosCards;
