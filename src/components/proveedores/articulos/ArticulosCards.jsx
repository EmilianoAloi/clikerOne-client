import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  TrendingUp,
  Building,
  Truck,
  Calendar,
  Activity,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const ArticulosCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Artículos en Catálogo */}
      <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Package className="h-6 w-6 text-blue-500" />
            <Badge
              variant="secondary"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              +12 nuevos
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              Artículos en Catálogo
            </p>
            <p className="text-3xl font-bold text-gray-900">247</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Crecimiento mensual</span>
            <span className="text-blue-600 font-medium">+5.1%</span>
          </div>
          <Progress value={5.1} className="h-2" />
          <div className="text-xs text-gray-500 text-center">
            231 activos • 16 inactivos
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full hover:bg-blue-50 text-blue-600 border-blue-200 mt-auto"
          >
            Ver catálogo completo
          </Button>
        </CardContent>
      </Card>

      {/* Proveedores Activos */}
      <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Building className="h-6 w-6 text-green-500" />
            <div className="flex items-center gap-1">
              <Activity className="h-4 w-4 text-green-500 animate-pulse" />
              <span className="text-xs text-green-600 font-medium">
                12 con actividad
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              Proveedores Activos
            </p>
            <p className="text-3xl font-bold text-gray-900">19</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Con actividad reciente</span>
            <span className="text-green-600 font-medium">63%</span>
          </div>
          <Progress value={63} className="h-2" />
          <Button
            variant="outline"
            size="sm"
            className="w-full hover:bg-green-50 text-green-600 border-green-200 mt-auto"
          >
            Gestionar proveedores
          </Button>
        </CardContent>
      </Card>

      {/* Cambios de Precio */}
      <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <TrendingUp className="h-6 w-6 text-purple-500" />
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500">Hace 2 días</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              Cambios de Precio
            </p>
            <p className="text-3xl font-bold text-gray-900">15</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1 bg-red-50 p-2 rounded-lg">
              <ArrowUp className="h-3 w-3 text-red-500" />
              <span className="text-sm text-red-600 font-medium">9</span>
              <span className="text-xs text-red-500">subidas</span>
            </div>
            <div className="flex items-center gap-1 bg-green-50 p-2 rounded-lg">
              <ArrowDown className="h-3 w-3 text-green-500" />
              <span className="text-sm text-green-600 font-medium">6</span>
              <span className="text-xs text-green-500">bajadas</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full hover:bg-purple-50 text-purple-600 border-purple-200 mt-auto"
          >
            Ver historial de precios
          </Button>
        </CardContent>
      </Card>

      {/* Últimos Ingresos */}
      <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Truck className="h-6 w-6 text-orange-500" />
            <Badge
              variant="secondary"
              className="bg-orange-50 text-orange-700 border-orange-200"
            >
              Esta semana
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              Últimos Ingresos
            </p>
            <p className="text-3xl font-bold text-gray-900">14</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Artículos recibidos</span>
            <span className="text-orange-600 font-medium">7 días</span>
          </div>
          <Progress value={70} className="h-2" />
          <Button
            variant="outline"
            size="sm"
            className="w-full hover:bg-orange-50 text-orange-600 border-orange-200 mt-auto"
          >
            Ver ingresos recientes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticulosCards;
