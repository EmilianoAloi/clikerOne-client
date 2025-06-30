import React from "react";
import { cn } from "@/lib/utils";
import { Calendar1, CalendarCheck, PackageCheck, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const inputStyle =
  "bg-white border border-gray-300 rounded-md shadow-sm !focus:outline-none !focus-visible:ring-1 !focus-visible:ring-gray-400";

const HistorialPreciosFiltros = ({
  searchTerm,
  setSearchTerm,
  selectedArticle,
  setSelectedArticle,
  sortBy,
  setSortBy,
  uniqueArticles,
  fechaDesde,
  setFechaDesde,
  fechaHasta,
  setFechaHasta,
}) => {
  return (
    <div className="mx-6 px-4 py-3 pb-6 bg-slate-50 border border-slate-200 rounded-lg mt-8 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Buscar */}
        <div>
          <Label className="text-sm flex items-center gap-2 font-semibold mb-1">
            <Search className="h-4 w-4 text-slate-500" />
            Buscar
          </Label>
          <Input
            placeholder="Código, nombre, categoría o usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`mt-1 ${inputStyle}`}
          />
        </div>
        {/* Artículo */}
        <div>
          <Label className="text-sm flex items-center gap-2 font-semibold mb-1">
            <PackageCheck className="h-4 w-4 text-slate-500" />
            Artículo
          </Label>
          <Select value={selectedArticle} onValueChange={setSelectedArticle}>
            <SelectTrigger
              className={cn(
                "w-full mt-1 cursor-pointer",
                inputStyle,
                !selectedArticle && "text-muted-foreground"
              )}
            >
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
        {/* Ordenar */}
        <div>
          <Label className="text-sm flex items-center gap-2 font-semibold mb-1">
            <Calendar1 className="h-4 w-4 text-slate-500" />
            Ordenar Por
          </Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger
              className={`w-full mt-1 ${inputStyle} cursor-pointer`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fecha-desc">Fecha (más reciente)</SelectItem>
              <SelectItem value="fecha-asc">Fecha (más antigua)</SelectItem>
              <SelectItem value="precio-desc">
                Precio (mayor a menor)
              </SelectItem>
              <SelectItem value="precio-asc">Precio (menor a mayor)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Fechas */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-sm flex items-center gap-2 font-semibold mb-1">
              <CalendarCheck className="h-4 w-4 text-slate-500" />
              Desde
            </Label>
            <Input
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className={`w-full mt-1 ${inputStyle} cursor-pointer`}
            />
          </div>
          <div>
            <Label className="text-sm flex items-center gap-2 font-semibold mb-1">
              <CalendarCheck className="h-4 w-4 text-slate-500" />
              Hasta
            </Label>
            <Input
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className={`w-full mt-1 ${inputStyle} cursor-pointer`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorialPreciosFiltros;
