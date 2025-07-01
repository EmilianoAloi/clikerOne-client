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
  Trash2,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { useCreateArticuloMutation } from "@/queries/proveedores/useArticulosMutation";

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

const EMPTY_ARTICULO = {
  codigo_interno: "",
  nombre: "",
  categoria: "",
  color: "",
  descripcion: "",
  unidad_de_medida: "unidad",
  precio_unitario: 1,
};

export default function ArticulosMultiFormModal({
  open,
  onClose,
  onCreated,
  idProveedor,
}) {
  const [items, setItems] = useState([{ ...EMPTY_ARTICULO, id: Date.now() }]);
  const mutation = useCreateArticuloMutation(idProveedor);

  // Handlers para agregar/eliminar/cambiar items
  const handleAddItem = () =>
    setItems((prev) => [
      ...prev,
      { ...EMPTY_ARTICULO, id: Date.now() + Math.random() },
    ]);

  const handleRemoveItem = (id) =>
    setItems((prev) =>
      prev.length > 1 ? prev.filter((a) => a.id !== id) : prev
    );

  const handleItemChange = (id, key, value) =>
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );

  // Submit masivo: crea uno o muchos
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Armá los artículos a enviar, sin el campo "id" local
    const articulos = items.map(({ id, ...rest }) => ({
      ...rest,
      precio_unitario: Number(rest.precio_unitario), // siempre como número
      id_proveedor: idProveedor, // asegúrate que esté
    }));
    try {
      await mutation.mutateAsync(articulos);
      setItems([{ ...EMPTY_ARTICULO, id: Date.now() }]);
      onCreated?.();
      onClose();
    } catch (err) {
      // El toast lo maneja el hook
    }
  };

  // Cuando el modal se cierra, resetea el form
  const handleClose = () => {
    setItems([{ ...EMPTY_ARTICULO, id: Date.now() }]);
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
                Ingreso de nuevos artículos
              </DialogTitle>
              <p className="text-slate-500 text-sm">
                Completá los datos de cada artículo para este proveedor.
              </p>
              <p className="text-slate-500 text-sm mb-4">
                Usá el botón “Agregar más” para cargar más productos antes de
                guardar.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleAddItem}
              className="font-semibold cursor-pointer flex items-center border-slate-300 text-slate-700 hover:bg-slate-100 mt-6"
              disabled={mutation.isPending}
            >
              <Plus className="h-4 w-4 mr-1" /> Agregar más
            </Button>
          </div>
          {/* Encabezados */}
          <div className="grid grid-cols-[80px_1.5fr_1.2fr_0.8fr_1.4fr_0.8fr_1.2fr_44px] gap-3 px-4 py-2 text-sm font-medium text-slate-700">
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
            <div style={{ width: 44 }}></div>
          </div>
          {/* Filas de artículos */}
          <div className="space-y-2">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2"
              >
                <div className="grid grid-cols-[80px_1.5fr_1.2fr_0.8fr_1.4fr_0.8fr_1.2fr_44px] gap-3 items-center">
                  {/* Código interno */}
                  <div>
                    <Input
                      value={item.codigo_interno ?? ""}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "codigo_interno",
                          e.target.value
                        )
                      }
                      className="w-full bg-white text-sm"
                      placeholder="Ej: 4646"
                    />
                  </div>
                  {/* Nombre */}
                  <div>
                    <Input
                      value={item.nombre ?? ""}
                      onChange={(e) =>
                        handleItemChange(item.id, "nombre", e.target.value)
                      }
                      className="w-full bg-white text-sm"
                      placeholder="Ej: Papel A4"
                    />
                  </div>
                  {/* Categoría */}
                  <div>
                    <Select
                      value={item.categoria ?? ""}
                      onValueChange={(value) =>
                        handleItemChange(item.id, "categoria", value)
                      }
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
                      value={item.color ?? ""}
                      onChange={(e) =>
                        handleItemChange(item.id, "color", e.target.value)
                      }
                      className="w-full bg-white text-sm"
                      placeholder="Color"
                    />
                  </div>
                  {/* Descripción */}
                  <div>
                    <Input
                      value={item.descripcion ?? ""}
                      onChange={(e) =>
                        handleItemChange(item.id, "descripcion", e.target.value)
                      }
                      className="w-full bg-white text-sm"
                      placeholder="Descripción"
                    />
                  </div>
                  {/* Unidad de medida */}
                  <div>
                    <Select
                      value={item.unidad_de_medida ?? ""}
                      onValueChange={(value) =>
                        handleItemChange(item.id, "unidad_de_medida", value)
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
                      value={item.precio_unitario ?? ""}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "precio_unitario",
                          e.target.value
                        )
                      }
                      className="w-full bg-white text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  {/* Botón eliminar */}
                  <div className="flex justify-center" style={{ width: 44 }}>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                      className="hover:bg-gray-200 hover:text-red-500 cursor-pointer text-red-500"
                      disabled={items.length === 1 || mutation.isPending}
                      tabIndex={-1}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
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
              {mutation.isPending ? "Guardando..." : "Guardar Artículo(s)"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
