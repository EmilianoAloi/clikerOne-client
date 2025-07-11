import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Users, CalendarCheck, User } from "lucide-react";
import { cn } from "@/lib/utils";

const EstadisticasFiltros = ({
  filtroPeriodo,
  setFiltroPeriodo,
  selectedProvider,
  setSelectedProvider,
  selectedUser,
  setSelectedUser,
  fechaDesde,
  setFechaDesde,
  fechaHasta,
  setFechaHasta,
  uniqueProviders,
  uniqueUsers,
}) => {
  const inputStyle =
    "bg-white border border-gray-300 rounded-md shadow-sm !focus:outline-none !focus-visible:ring-1 !focus-visible:ring-gray-400";

  return (
    <div className="mx-6 px-4 py-3 pb-5 bg-slate-50 border border-slate-200 rounded-lg mt-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Periodo */}
        <div>
          <Label className="text-sm flex items-center gap-2 font-semibold text-gray-700 mb-2">
            <CalendarCheck className="h-4 w-4 text-gray-700" />
            Período
          </Label>
          <Select value={filtroPeriodo} onValueChange={setFiltroPeriodo}>
            <SelectTrigger
              className={cn("w-full mt-1 cursor-pointer", inputStyle)}
            >
              <SelectValue placeholder="Seleccionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ultimo-mes">Último mes</SelectItem>
              <SelectItem value="ultimo-trimestre">Último trimestre</SelectItem>
              <SelectItem value="ultimo-año">Último año</SelectItem>
              <SelectItem value="personalizado">Personalizado</SelectItem>
            </SelectContent>
          </Select>
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
              <SelectValue placeholder="Todos los proveedores" />
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
              <SelectValue placeholder="Todos los usuarios" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los usuarios</SelectItem>
              {uniqueUsers.map((u) => (
                <SelectItem key={u} value={u}>
                  {u}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desde */}
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

        {/* Hasta */}
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
  );
};

export default EstadisticasFiltros;
