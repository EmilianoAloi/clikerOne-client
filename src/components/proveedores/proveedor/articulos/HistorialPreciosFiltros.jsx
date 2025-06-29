import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/DataRangePicker";

const HistorialPreciosFiltros = ({
  searchTerm,
  setSearchTerm,
  selectedArticle,
  setSelectedArticle,
  sortBy,
  setSortBy,
  uniqueArticles,
}) => {
  return (
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
            <Select value={selectedArticle} onValueChange={setSelectedArticle}>
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
                <SelectItem value="fecha-desc">Fecha (más reciente)</SelectItem>
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
  );
};

export default HistorialPreciosFiltros;
