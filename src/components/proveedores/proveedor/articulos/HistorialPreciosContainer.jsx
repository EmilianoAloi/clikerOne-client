import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/DataRangePicker";

// Datos de ejemplo para el historial de precios
const priceHistory = [
  {
    id: 1,
    codigo: "0001",
    nombre: "Plastico PVC",
    categoria: "Materia prima",
    color: "Azul",
    descripcion: "articulo 1",
    unidadMedida: "unidad",
    precioAnterior: 0.85,
    precioNuevo: 1.0,
    fechaCambio: "2024-01-15T10:30:00",
    usuario: "Juan Pérez",
    motivo: "Ajuste por inflación",
  },
  {
    id: 2,
    codigo: "0001",
    nombre: "Plastico PVC",
    categoria: "Materia prima",
    color: "Azul",
    descripcion: "articulo 1",
    unidadMedida: "unidad",
    precioAnterior: 0.75,
    precioNuevo: 0.85,
    fechaCambio: "2023-12-01T14:20:00",
    usuario: "María García",
    motivo: "Actualización de costos",
  },
  {
    id: 3,
    codigo: "hh",
    nombre: "hh",
    categoria: "Electrónica",
    color: "Otro",
    descripcion: "2",
    unidadMedida: "kg",
    precioAnterior: 0.9,
    precioNuevo: 1.0,
    fechaCambio: "2024-01-10T09:15:00",
    usuario: "Carlos López",
    motivo: "Cambio de proveedor",
  },
  {
    id: 4,
    codigo: "0001",
    nombre: "Plastico PVC",
    categoria: "Materia prima",
    color: "Azul",
    descripcion: "articulo 1",
    unidadMedida: "unidad",
    precioAnterior: 1.0,
    precioNuevo: 0.95,
    fechaCambio: "2024-01-20T16:45:00",
    usuario: "Ana Martínez",
    motivo: "Descuento por volumen",
  },
  {
    id: 5,
    codigo: "hh",
    nombre: "hh",
    categoria: "Electrónica",
    color: "Otro",
    descripcion: "2",
    unidadMedida: "kg",
    precioAnterior: 1.0,
    precioNuevo: 1.1,
    fechaCambio: "2024-01-25T11:30:00",
    usuario: "Roberto Silva",
    motivo: "Aumento de costos de materia prima",
  },
];

export default function HistorialPreciosContainer() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState("all");
  const [sortBy, setSortBy] = useState("fecha-desc");

  // Filtrar y ordenar datos
  const filteredHistory = priceHistory
    .filter((item) => {
      const matchesSearch =
        item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.usuario.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesArticle =
        selectedArticle === "all" || item.codigo === selectedArticle;

      return matchesSearch && matchesArticle;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "fecha-desc":
          return (
            new Date(b.fechaCambio).getTime() -
            new Date(a.fechaCambio).getTime()
          );
        case "fecha-asc":
          return (
            new Date(a.fechaCambio).getTime() -
            new Date(b.fechaCambio).getTime()
          );
        case "precio-desc":
          return b.precioNuevo - a.precioNuevo;
        case "precio-asc":
          return a.precioNuevo - b.precioNuevo;
        default:
          return 0;
      }
    });

  // Obtener artículos únicos para el filtro
  const uniqueArticles = Array.from(
    new Set(priceHistory.map((item) => item.codigo))
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  const getPriceChangeIcon = (oldPrice, newPrice) => {
    if (newPrice > oldPrice) {
      return <TrendingUp className="h-4 w-4 text-red-500" />;
    } else if (newPrice < oldPrice) {
      return <TrendingDown className="h-4 w-4 text-green-500" />;
    }
    return null;
  };

  const getPriceChangeBadge = (oldPrice, newPrice) => {
    const change = ((newPrice - oldPrice) / oldPrice) * 100;
    if (change > 0) {
      return <Badge variant="destructive">+{change.toFixed(1)}%</Badge>;
    } else if (change < 0) {
      return <Badge variant="secondary">{change.toFixed(1)}%</Badge>;
    }
    return <Badge variant="outline">Sin cambio</Badge>;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-3xl font-bold">Historial de Precios</h1>
            <p className="text-muted-foreground">
              Seguimiento de cambios de precios de artículos del proveedor
            </p>
          </div>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Código, nombre, categoría o usuario..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Artículo</label>
              <Select
                value={selectedArticle}
                onValueChange={setSelectedArticle}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar artículo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los artículos</SelectItem>
                  {uniqueArticles.map((codigo) => (
                    <SelectItem key={codigo} value={codigo}>
                      {codigo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ordenar por</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fecha-desc">
                    Fecha (más reciente)
                  </SelectItem>
                  <SelectItem value="fecha-asc">Fecha (más antigua)</SelectItem>
                  <SelectItem value="precio-desc">
                    Precio (mayor a menor)
                  </SelectItem>
                  <SelectItem value="precio-asc">
                    Precio (menor a mayor)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Rango de fechas</label>
              <DatePickerWithRange />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cambios</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredHistory.length}</div>
            <p className="text-xs text-muted-foreground">
              En el período seleccionado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aumentos</CardTitle>
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reducciones</CardTitle>
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

      {/* Tabla de historial */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Cambios de Precios</CardTitle>
          <CardDescription>
            Mostrando {filteredHistory.length} registros de cambios de precios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha/Hora</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>U. Medida</TableHead>
                  <TableHead>Precio Anterior</TableHead>
                  <TableHead>Precio Nuevo</TableHead>
                  <TableHead>Cambio</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Motivo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-sm">
                      {formatDate(item.fechaCambio)}
                    </TableCell>
                    <TableCell className="font-medium">{item.codigo}</TableCell>
                    <TableCell>{item.nombre}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.categoria}</Badge>
                    </TableCell>
                    <TableCell>{item.color}</TableCell>
                    <TableCell>{item.descripcion}</TableCell>
                    <TableCell>{item.unidadMedida}</TableCell>
                    <TableCell className="font-mono">
                      {formatPrice(item.precioAnterior)}
                    </TableCell>
                    <TableCell className="font-mono font-medium">
                      {formatPrice(item.precioNuevo)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getPriceChangeIcon(
                          item.precioAnterior,
                          item.precioNuevo
                        )}
                        {getPriceChangeBadge(
                          item.precioAnterior,
                          item.precioNuevo
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{item.usuario}</TableCell>
                    <TableCell
                      className="max-w-xs truncate"
                      title={item.motivo}
                    >
                      {item.motivo}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No se encontraron registros de cambios de precios con los
                filtros aplicados.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
