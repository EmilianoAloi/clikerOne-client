import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  DollarSign,
  ShoppingCart,
  Clock,
  Package,
  TrendingUp,
} from "lucide-react";

const EstadisticasCards = ({ kpiData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:px-10 md:mx-6 md:py-10 md:my-4 bg-slate-100 border border-slate-300 rounded-lg">
      {/* Total Proveedores */}
      <Card className="gap-0 rounded-sm py-4 px-0 ">
        <CardHeader className="flex items-center justify-between pb-2 ">
          <CardTitle className="text-sm font-semibold">
            Total Proveedores
          </CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.totalProveedores}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+12</span> desde el mes pasado
          </p>
          <div className="mt-2">
            <Badge variant="secondary" className="text-xs">
              {kpiData.proveedoresActivos} activos
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Facturación Mensual */}
      <Card className="gap-0 rounded-sm py-4 px-0 ">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-semibold">
            Facturación Mensual
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${kpiData.facturacionMensual.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +8.2%
            </span>{" "}
            vs mes anterior
          </p>
        </CardContent>
      </Card>

      {/* Órdenes de Compra */}
      <Card className="gap-0 rounded-sm py-4 px-0 ">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-semibold">
            Órdenes de Compra
          </CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.ordenesCompra}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-orange-600 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {kpiData.ordenesPendientes} pendientes
            </span>
          </p>
        </CardContent>
      </Card>

      {/* Artículos Totales */}
      <Card className="gap-0 rounded-sm py-4 px-0 ">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-semibold">
            Artículos Totales
          </CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.articulosTotal}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-blue-600">
              {kpiData.cambiosPrecios} cambios de precio
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EstadisticasCards;
