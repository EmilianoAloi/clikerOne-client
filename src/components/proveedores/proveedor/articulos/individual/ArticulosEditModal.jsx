import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Boxes,
  Hash,
  PackageCheck,
  Tag,
  Palette,
  FileText,
  Ruler,
  CircleDollarSign,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useArticuloUpdateMutation } from "@/queries/proveedores/articulo/useArticuloUpdateMutation";

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
  onClose,
  articulo,
  idProveedor,
  onUpdated,
}) {
  const [form, setForm] = useState({ ...articulo });
  const mutation = useArticuloUpdateMutation(idProveedor);

  // Precargar los datos del artículo seleccionado al abrir el modal
  useEffect(() => {
    setForm({ ...articulo });
  }, [articulo, open]);

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync({
        ...form,
        precio_unitario: Number(form.precio_unitario),
        id_proveedor: idProveedor,
      });
      onUpdated?.();
      onClose();
    } catch (err) {
      console.error("Error al guardar el artículo:", err);
    }
  };

  const handleClose = () => {
    setForm({ ...articulo });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="!max-w-[90vw] p-8">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="flex justify-between items-start mb-2">
            <div>
              <DialogTitle className="text-lg font-semibold flex items-center gap-2 mb-0">
                <Boxes className="h-5 w-5 text-slate-600" />
                Editar artículo
              </DialogTitle>
              <p className="text-slate-500 text-sm mb-4">
                Modificá los datos del artículo y guarda los cambios.
              </p>
            </div>
          </div>
          {/* Encabezados */}
          <div className="grid grid-cols-[80px_1.5fr_1.2fr_0.8fr_1.4fr_0.8fr_1.2fr] gap-3 px-4 py-2 text-sm font-medium text-slate-700">
            <div>
              <span className="flex items-center gap-1">
                <Hash className="h-4 w-4" /> Código
              </span>
            </div>
            <div>
              <span className="flex items-center gap-1">
                <PackageCheck className="h-4 w-4" /> Nombre
              </span>
            </div>
            <div>
              <span className="flex items-center gap-1">
                <Tag className="h-4 w-4" /> Categoría
              </span>
            </div>
            <div>
              <span className="flex items-center gap-1">
                <Palette className="h-4 w-4" /> Color
              </span>
            </div>
            <div>
              <span className="flex items-center gap-1">
                <FileText className="h-4 w-4" /> Descripción
              </span>
            </div>
            <div>
              <span className="flex items-center gap-1">
                <Ruler className="h-4 w-4" /> U. medida
              </span>
            </div>
            <div>
              <span className="flex items-center gap-1">
                <CircleDollarSign className="h-4 w-4" /> Precio Unitario
              </span>
            </div>
          </div>
          {/* Fila de edición */}
          <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2 mb-4">
            <div className="grid grid-cols-[80px_1.5fr_1.2fr_0.8fr_1.4fr_0.8fr_1.2fr] gap-3 items-center">
              {/* Código interno */}
              <div>
                <Input
                  value={form.codigo_interno ?? ""}
                  onChange={(e) =>
                    handleChange("codigo_interno", e.target.value)
                  }
                  className="w-full bg-white text-sm"
                  placeholder="Ej: 4646"
                />
              </div>
              {/* Nombre */}
              <div>
                <Input
                  value={form.nombre ?? ""}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  className="w-full bg-white text-sm"
                  placeholder="Ej: Papel A4"
                />
              </div>
              {/* Categoría */}
              <div>
                <Select
                  value={form.categoria ?? ""}
                  onValueChange={(value) => handleChange("categoria", value)}
                >
                  <SelectTrigger className="w-full bg-white text-sm">
                    <SelectValue placeholder="Elegí categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIAS.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Color */}
              <div>
                <Input
                  value={form.color ?? ""}
                  onChange={(e) => handleChange("color", e.target.value)}
                  className="w-full bg-white text-sm"
                  placeholder="Color"
                />
              </div>
              {/* Descripción */}
              <div>
                <Input
                  value={form.descripcion ?? ""}
                  onChange={(e) => handleChange("descripcion", e.target.value)}
                  className="w-full bg-white text-sm"
                  placeholder="Descripción"
                />
              </div>
              {/* Unidad de medida */}
              <div>
                <Select
                  value={form.unidad_de_medida ?? ""}
                  onValueChange={(value) =>
                    handleChange("unidad_de_medida", value)
                  }
                >
                  <SelectTrigger className="w-full bg-white text-sm">
                    <SelectValue placeholder="Unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {UNIDADES.map((um) => (
                      <SelectItem key={um} value={um}>
                        {um}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Precio unitario */}
              <div>
                <Input
                  min="0"
                  type="number"
                  value={form.precio_unitario ?? ""}
                  onChange={(e) =>
                    handleChange("precio_unitario", e.target.value)
                  }
                  className="w-full bg-white text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
          {/* Botones pie */}
          <div className="flex justify-end gap-2 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={mutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-black text-white font-semibold"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
