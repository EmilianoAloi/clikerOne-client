import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Eye, TrendingUp, TrendingDown } from "lucide-react";
import React from "react";

const HistorialPreciosCards = ({ filteredHistory }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 !mx-auto px-6 my-6">
      <Card className="gap-1 py-4 rounded-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
          <CardTitle className="text-sm font-semibold">Total Cambios</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="">
          <div className="text-2xl font-bold">{filteredHistory.length}</div>
          <p className="text-xs text-muted-foreground">
            En el período seleccionado
          </p>
        </CardContent>
      </Card>

      <Card className="gap-1 py-4 rounded-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
          <CardTitle className="text-sm font-semibold">
            Artículos Afectados
          </CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Set(filteredHistory.map((item) => item.codigo)).size}
          </div>
          <p className="text-xs text-muted-foreground">Artículos únicos</p>
        </CardContent>
      </Card>

      <Card className="gap-1 py-4 rounded-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
          <CardTitle className="text-sm font-semibold">Aumentos</CardTitle>
          <TrendingUp className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">
            {
              filteredHistory.filter(
                (item) => item.precioNuevo > item.precioAnterior
              ).length
            }
          </div>
          <p className="text-xs text-muted-foreground">Cambios al alza</p>
        </CardContent>
      </Card>

      <Card className="gap-1 py-4 rounded-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
          <CardTitle className="text-sm font-semibold">Reducciones</CardTitle>
          <TrendingDown className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">
            {
              filteredHistory.filter(
                (item) => item.precioNuevo < item.precioAnterior
              ).length
            }
          </div>
          <p className="text-xs text-muted-foreground">Cambios a la baja</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistorialPreciosCards;
