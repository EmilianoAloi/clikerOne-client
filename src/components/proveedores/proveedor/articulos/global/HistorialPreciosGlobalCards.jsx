import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Package,
  TrendingUp,
  TrendingDown,
  Users,
} from "lucide-react";

export default function HistorialPreciosGlobalCards({
  totalChanges = 0,
  uniqueArticlesCount = 0,
  increases = 0,
  decreases = 0,
  uniqueProvidersCount = 0,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mx-6 mt-4">
      {/* Total Cambios */}
      <Card className="gap-0 rounded-sm py-4 px-0 ">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle
            style={{ fontWeight: 600 }}
            className="text-sm font-medium text-gray-600"
          >
            Total Cambios
          </CardTitle>
          <Calendar className="h-6 w-6 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalChanges}</div>
          <p style={{ fontWeight: 600 }} className="text-xs text-gray-600">
            En el período seleccionado
          </p>
        </CardContent>
      </Card>

      {/* Artículos Afectados */}
      <Card className="gap-0 rounded-sm py-4 px-0 ">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle
            style={{ fontWeight: 600 }}
            className="text-sm font-medium text-gray-600"
          >
            Artículos Afectados
          </CardTitle>
          <Package className="h-6 w-6 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueArticlesCount}</div>
          <p style={{ fontWeight: 600 }} className="text-xs text-gray-600">
            Artículos únicos
          </p>
        </CardContent>
      </Card>

      {/* Aumentos */}
      <Card className="gap-0 rounded-sm py-4 px-0 ">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle
            style={{ fontWeight: 600 }}
            className="text-sm font-medium text-gray-600"
          >
            {" "}
            Aumentos
          </CardTitle>
          <TrendingUp className="h-6 w-6 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{increases}</div>
          <p style={{ fontWeight: 600 }} className="text-xs text-gray-600">
            Cambios al alza
          </p>
        </CardContent>
      </Card>

      {/* Reducciones */}
      <Card className="gap-0 rounded-sm py-4 px-0 ">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle
            style={{ fontWeight: 600 }}
            className="text-sm font-medium text-gray-600"
          >
            {" "}
            Reducciones
          </CardTitle>
          <TrendingDown className="h-6 w-6 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{decreases}</div>
          <p style={{ fontWeight: 600 }} className="text-xs text-gray-600">
            Cambios a la baja
          </p>
        </CardContent>
      </Card>

      {/* Proveedores */}
      <Card className="gap-0 rounded-sm py-4 px-0 ">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle
            style={{ fontWeight: 600 }}
            className="text-sm font-medium text-gray-600"
          >
            {" "}
            Proveedores
          </CardTitle>
          <Users className="h-6 w-6 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueProvidersCount}</div>
          <p style={{ fontWeight: 600 }} className="text-xs text-gray-600">
            Proveedores activos
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
