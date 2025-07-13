import React, { useState } from "react";
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
  tendenciaPrecios,
  topArticulos,
}) {
  const [activeTab, setActiveTab] = useState("general");
  const tabs = [
    { id: "general", label: "General" },
    { id: "proveedores", label: "Proveedores" },
    { id: "precios", label: "Precios" },
    { id: "compras", label: "Compras" },
    { id: "facturacion", label: "Facturación" },
  ];

  return (
    <div className="mx-6">
      {/* Tabs horizontales */}
      {/* <div className="flex space-x-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium rounded-lg transition-all w-40 duration-200 relative cursor-pointer ${
              activeTab === tab.id
                ? "text-blue-700 border-t-4 border-blue-500"
                : "text-gray-600 "
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div> */}

      <div className=" bg-slate-50 border border-slate-300 rounded-lg   mb-2 px-11 py-3  ">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 text-sm  rounded-lg transition-all duration-200 relative w-46 cursor-pointer ${
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
        {activeTab === "general" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* Facturación Mensual */}
            <Card className="bg-slate-50">
              <CardHeader>
                <CardTitle>Facturación Mensual</CardTitle>
                <CardDescription>
                  {" "}
                  Evolución en los últimos 6 meses{" "}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={facturacionMensual}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip
                      formatter={(v) => [`$${v.toLocaleString()}`, "Monto"]}
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
                  {" "}
                  Distribución actual por estado{" "}
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
                      {estadosOrdenes.map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "proveedores" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
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

        {activeTab === "compras" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
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

        {activeTab === "facturacion" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
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
        )}

        {activeTab === "precios" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tendencia de Cambios</CardTitle>
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

              <Card>
                <CardHeader>
                  <CardTitle>Resumen de Cambios</CardTitle>
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
                        <p className="font-semibold text-green-900">
                          Reducciones
                        </p>
                        <p className="text-sm text-green-700">
                          Cambios a la baja
                        </p>
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
                        <p className="text-sm text-blue-700">
                          Productos únicos
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">28</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Artículos con Más Cambios</CardTitle>
                <CardDescription>Top por frecuencia de cambios</CardDescription>
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
                    {topArticulos.map((a) => (
                      <TableRow key={a.codigo}>
                        <TableCell className="font-medium">
                          {a.codigo}
                        </TableCell>
                        <TableCell>{a.nombre}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{a.categoria}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{a.cambios}</Badge>
                        </TableCell>
                        <TableCell>${a.ultimoPrecio.toFixed(2)}</TableCell>
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
          </div>
        )}
      </div>
    </div>
  );
}
