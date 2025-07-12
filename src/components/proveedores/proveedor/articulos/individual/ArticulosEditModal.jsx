import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Hash,
  PackageCheck,
  Tag,
  Palette,
  FileText,
  Ruler,
  CircleDollarSign,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useArticuloUpdateMutation } from "@/queries/proveedores/articulo/useArticuloUpdateMutation";
import { DialogTrigger } from "@radix-ui/react-dialog";

const CATEGORIAS = [
  "Materia prima",
  "Producto final",
  "Parte o componente",
  "Librería",
  "Cocina",
  "Ferretería",
  "Electrónica",
  "Otros",
];
const UNIDADES = [
  "unidad",
  "caja",
  "g",
  "kg",
  "lt",
  "ml",
  "cm",
  "cm2",
  "cm3",
  "m",
  "m2",
];

export default function ArticulosEditModal({
  open,
  onOpenChange,
  articulo,
  idProveedor,
  onUpdated,
}) {
  const { user, loading } = useAuth();
  const isAdmin = user?.rol === "admin";
  const canEditPrecio = ["admin", "user"].includes(user?.rol);
  const mutation = useArticuloUpdateMutation(idProveedor);

  const [form, setForm] = useState({ ...articulo });
  useEffect(() => {
    setForm({ ...articulo });
  }, [articulo, open]);

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Para admin mandamos todo, para user solo precio
      // Construimos args que siempre incluyan el id_articulo
      const body = isAdmin
        ? { ...form, precio_unitario: Number(form.precio_unitario) }
        : { precio_unitario: Number(form.precio_unitario) };

      await mutation.mutateAsync({
        id_articulo: form.id_articulo,
        ...body,
      });

      onUpdated?.();
      onOpenChange(false);
    } catch (err) {
      console.error("Error al guardar el artículo:", err);
    }
  };

  if (loading) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>

      <DialogContent className="!max-w-[90vw] p-6">
        <DialogTitle>Editar artículo</DialogTitle>
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Encabezado de columnas */}
          <div className="grid grid-cols-[80px_1.5fr_1.2fr_0.8fr_1.4fr_0.8fr_1.2fr] gap-3 px-4 py-2 text-sm font-medium text-slate-700">
            <div className="flex items-center gap-1">
              <Hash className="h-4 w-4" /> Código
            </div>
            <div className="flex items-center gap-1">
              <PackageCheck className="h-4 w-4" /> Nombre
            </div>
            <div className="flex items-center gap-1">
              <Tag className="h-4 w-4" /> Categoría
            </div>
            <div className="flex items-center gap-1">
              <Palette className="h-4 w-4" /> Color
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" /> Descripción
            </div>
            <div className="flex items-center gap-1">
              <Ruler className="h-4 w-4" /> U. medida
            </div>
            <div className="flex items-center gap-1">
              <CircleDollarSign className="h-4 w-4" /> Precio
            </div>
          </div>

          {/* Fila de edición */}
          <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2 mb-4">
            <div className="grid grid-cols-[80px_1.5fr_1.2fr_0.8fr_1.4fr_0.8fr_1.2fr] gap-3 items-center">
              <Input
                value={form.codigo_interno ?? ""}
                onChange={(e) => handleChange("codigo_interno", e.target.value)}
                disabled={!isAdmin}
                className="w-full bg-white text-sm"
                placeholder="Ej: 4646"
              />
              <Input
                value={form.nombre ?? ""}
                onChange={(e) => handleChange("nombre", e.target.value)}
                disabled={!isAdmin}
                className="w-full bg-white text-sm"
                placeholder="Ej: Papel A4"
              />
              <Select
                value={form.categoria ?? ""}
                onValueChange={(v) => handleChange("categoria", v)}
                disabled={!isAdmin}
              >
                <SelectTrigger className="w-full bg-white text-sm">
                  <SelectValue placeholder="Elegí categoría" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIAS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                value={form.color ?? ""}
                onChange={(e) => handleChange("color", e.target.value)}
                disabled={!isAdmin}
                className="w-full bg-white text-sm"
                placeholder="Color"
              />
              <Input
                value={form.descripcion ?? ""}
                onChange={(e) => handleChange("descripcion", e.target.value)}
                disabled={!isAdmin}
                className="w-full bg-white text-sm"
                placeholder="Descripción"
              />
              <Select
                value={form.unidad_de_medida ?? ""}
                onValueChange={(v) => handleChange("unidad_de_medida", v)}
                disabled={!isAdmin}
              >
                <SelectTrigger className="w-full bg-white text-sm">
                  <SelectValue placeholder="Unidad" />
                </SelectTrigger>
                <SelectContent>
                  {UNIDADES.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                min="0"
                value={form.precio_unitario ?? ""}
                onChange={(e) =>
                  handleChange("precio_unitario", e.target.value)
                }
                disabled={!canEditPrecio}
                className="w-full bg-white text-sm"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            {canEditPrecio && (
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Guardando..." : "Guardar cambios"}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
