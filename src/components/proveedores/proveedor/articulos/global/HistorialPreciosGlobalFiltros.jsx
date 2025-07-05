import React from "react";
import { cn } from "@/lib/utils";
import {
  CalendarCheck,
  PackageCheck,
  Search,
  Users,
  Boxes,
  User,
} from "lucide-react";
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

export default function HistorialPreciosGlobalFiltros({
  searchTerm,
  setSearchTerm,
  selectedProvider,
  setSelectedProvider,
  selectedCategory,
  setSelectedCategory,
  selectedArticle,
  setSelectedArticle,
  selectedUser,
  setSelectedUser,
  fechaDesde,
  setFechaDesde,
  fechaHasta,
  setFechaHasta,
  uniqueProviders,
  uniqueCategories,
  uniqueArticles,
  uniqueUsers,
}) {
  return (
    <div className="mx-6 px-4 py-3 pb-6 bg-slate-50 border border-slate-200 rounded-lg mt-8 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* Buscar */}
        <div>
          <Label className="text-sm flex items-center gap-2 text-gray-700 font-semibold mb-2">
            <Search className="h-4 w-4 text-gray-700" />
            Buscar
          </Label>
          <Input
            placeholder="Código, nombre, proveedor, categoría, usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`mt-1 ${inputStyle}`}
          />
        </div>
        {/* Proveedor */}
        <div>
          <Label className="text-sm flex items-center gap-2 font-semibold text-gray-700 mb-2">
            <Users className="h-4 w-4 text-gray-700" />
            Proveedor
          </Label>
          <Select value={selectedProvider} onValueChange={setSelectedProvider}>
            <SelectTrigger
              className={cn(
                "w-full mt-1 cursor-pointer",
                inputStyle,
                !selectedProvider && "text-muted-foreground"
              )}
            >
              <SelectValue placeholder="Seleccionar proveedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los proveedores</SelectItem>
              {uniqueProviders.map((prov) => (
                <SelectItem key={prov.id} value={prov.id}>
                  {prov.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Categoría */}
        <div>
          <Label className="text-sm flex items-center gap-2 font-semibold text-gray-700 mb-2">
            <Boxes className="h-4 w-4 text-gray-700" />
            Categoría
          </Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger
              className={cn(
                "w-full mt-1 cursor-pointer",
                inputStyle,
                !selectedCategory && "text-muted-foreground"
              )}
            >
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {uniqueCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Artículo */}
        <div>
          <Label className="text-sm flex items-center gap-2 font-semibold text-gray-700 mb-2">
            <PackageCheck className="h-4 w-4 text-gray-700" />
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
        {/* Usuario */}
        <div>
          <Label className="text-sm flex items-center gap-2 font-semibold text-gray-700 mb-2">
            <User className="h-4 w-4 text-gray-700" />
            Usuario
          </Label>
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger
              className={cn(
                "w-full mt-1 cursor-pointer",
                inputStyle,
                !selectedUser && "text-muted-foreground"
              )}
            >
              <SelectValue placeholder="Seleccionar usuario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los usuarios</SelectItem>
              {uniqueUsers.map((usuario) => (
                <SelectItem key={usuario} value={usuario}>
                  {usuario}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Fechas */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-sm flex items-center gap-2 font-semibold text-gray-700 mb-2">
              <CalendarCheck className="h-4 w-4 text-gray-700" />
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
            <Label className="text-sm flex items-center gap-2 font-semibold text-gray-700 mb-2">
              <CalendarCheck className="h-4 w-4 text-gray-700" />
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
}
