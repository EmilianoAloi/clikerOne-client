import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Package,
  Eye,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function EstadisticasTabs({
  facturacionMensual,
  estadosOrdenes,
  comprasPorProveedor,
  tendenciaPrecios,
  topArticulos,
}) {
  return (
    <Tabs defaultValue="general" className="space-y-6  mx-6 ">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="proveedores">Proveedores</TabsTrigger>
        <TabsTrigger value="compras">Compras</TabsTrigger>
        <TabsTrigger value="facturacion">Facturación</TabsTrigger>
        <TabsTrigger value="precios">Precios</TabsTrigger>
      </TabsList>

      {/* General tab */}
      <TabsContent value="general" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6  ">
          {/* Facturación Mensual */}
          <Card className="bg-slate-50">
            <CardHeader>
              <CardTitle>Facturación Mensual</CardTitle>
              <CardDescription>
                Evolución de la facturación en los últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={facturacionMensual}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Monto",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="monto"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Estados de Órdenes */}
          <Card className="bg-slate-50">
            <CardHeader>
              <CardTitle>Estados de Órdenes</CardTitle>
              <CardDescription>
                Distribución actual de órdenes por estado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={estadosOrdenes}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="cantidad"
                    label={({ estado, cantidad }) => `${estado}: ${cantidad}`}
                  >
                    {estadosOrdenes.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Compras por Proveedor */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Proveedores por Compras</CardTitle>
            <CardDescription>
              Ranking de proveedores por monto de compras
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comprasPorProveedor}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="proveedor" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, "Monto"]}
                />
                <Bar dataKey="monto" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Precios tab */}
      <TabsContent value="precios" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tendencia de Cambios de Precios */}
          <Card>
            <CardHeader>
              <CardTitle>Tendencia de Cambios de Precios</CardTitle>
              <CardDescription>
                Aumentos vs Reducciones por semana
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={tendenciaPrecios}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="fecha" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="aumentos"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Aumentos"
                  />
                  <Line
                    type="monotone"
                    dataKey="reducciones"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Reducciones"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* KPIs de Precios */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Cambios de Precios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-red-600" />
                  <div>
                    <p className="font-semibold text-red-900">Aumentos</p>
                    <p className="text-sm text-red-700">Cambios al alza</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-red-600">40</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingDown className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-900">Reducciones</p>
                    <p className="text-sm text-green-700">Cambios a la baja</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600">12</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Package className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-900">
                      Artículos Afectados
                    </p>
                    <p className="text-sm text-blue-700">Productos únicos</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600">28</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabla de Artículos con Más Cambios */}
        <Card>
          <CardHeader>
            <CardTitle>Artículos con Más Cambios de Precio</CardTitle>
            <CardDescription>
              Top artículos por frecuencia de cambios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Cambios</TableHead>
                  <TableHead>Último Precio</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topArticulos.map((articulo) => (
                  <TableRow key={articulo.codigo}>
                    <TableCell className="font-medium">
                      {articulo.codigo}
                    </TableCell>
                    <TableCell>{articulo.nombre}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{articulo.categoria}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{articulo.cambios}</Badge>
                    </TableCell>
                    <TableCell>${articulo.ultimoPrecio.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Proveedores tab */}
      <TabsContent value="proveedores" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </TabsContent>

      {/* Compras tab */}
      <TabsContent value="compras" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Órdenes por Estado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" /> Ejecutadas
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
                  <AlertTriangle className="w-4 h-4 text-red-600" /> Canceladas
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
      </TabsContent>

      {/* Facturación tab */}
      <TabsContent value="facturacion" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Facturación Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$1,284,224</div>
              <p className="text-sm text-muted-foreground">últimos 6 meses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Promedio Mensual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$214,037</div>
              <p className="text-sm text-muted-foreground">
                facturación promedio
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Crecimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">+8.2%</div>
              <p className="text-sm text-muted-foreground">
                vs período anterior
              </p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
