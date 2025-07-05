import ResumenCard from "@/components/ui/ResumenCard";
import {
  Package,
  Building,
  TrendingUp,
  Calendar,
  Activity,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ArticulosCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Artículos en Catálogo */}
      <ResumenCard
        icon={<Package className="h-6 w-6 text-blue-500" />}
        badge={
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
            +12 nuevos
          </Badge>
        }
        title="Artículos en Catálogo"
        value="247"
        subtitle="Crecimiento mensual"
        subvalue="+5.1%"
        progress={5.1}
        buttonText="Ver catálogo completo"
        color="blue"
      />

      {/* Proveedores Activos */}
      <ResumenCard
        icon={<Building className="h-6 w-6 text-green-500" />}
        badge={
          <div className="flex items-center gap-1">
            <Activity className="h-4 w-4 text-green-500 animate-pulse" />
            <span className="text-xs text-green-600 font-medium">
              12 con actividad
            </span>
          </div>
        }
        title="Proveedores Activos"
        value="19"
        subtitle="Con actividad reciente"
        subvalue="63%"
        progress={63}
        buttonText="Gestionar proveedores"
        color="green"
      />

      {/* Cambios de Precio */}
      <ResumenCard
        icon={<TrendingUp className="h-6 w-6 text-purple-500" />}
        badge={
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500">Hace 2 días</span>
          </div>
        }
        title="Historial de Precios"
        value="15"
        progress={null}
        footer={
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1 bg-red-50 p-2 rounded-lg">
              <ArrowUp className="h-3 w-3 text-red-500" />
              <span className="text-red-600 font-medium">9</span>
              <span className="text-xs text-red-500">subidas</span>
            </div>
            <div className="flex items-center gap-1 bg-green-50 p-2 rounded-lg">
              <ArrowDown className="h-3 w-3 text-green-500" />
              <span className="text-green-600 font-medium">6</span>
              <span className="text-xs text-green-500">bajadas</span>
            </div>
          </div>
        }
        buttonText="Ver historial de precios"
        color="purple"
      />

      {/* Últimos Ingresos */}
      {/* <ResumenCard
        icon={<Truck className="h-6 w-6 text-orange-500" />}
        badge={
          <Badge className="bg-orange-50 text-orange-700 border-orange-200">
            Esta semana
          </Badge>
        }
        title="Últimos Ingresos"
        value="14"
        subtitle="Artículos recibidos"
        subvalue="7 días"
        progress={70}
        buttonText="Ver ingresos recientes"
        color="orange"
      /> */}
    </div>
  );
};

export default ArticulosCards;
