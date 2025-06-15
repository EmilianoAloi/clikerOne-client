import {
  CircleDollarSign,
  Hash,
  PackageCheck,
  Plus,
  Tag,
  Trash2,
  Palette,
  FileText,
  Ruler,
  Boxes,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import ProveedorArticleEmpty from "./ProveedorArticleEmpty";

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

const ProveedorAddArticles = ({
  items,
  inputStyle,
  handleAddItem,
  handleRemoveItem,
  handleItemChange,
}) => {
  // ----------- EMPTY STATE -----------
  if (!items.length) {
    return (
      <div className="mt-8">
        <ProveedorArticleEmpty onAgregarArticulo={handleAddItem} />
      </div>
    );
  }

  // ----------- TABLA DE ARTÍCULOS -----------
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Boxes className="h-5 w-5 text-slate-600" />
          Artículos
        </h3>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddItem}
          className="font-semibold cursor-pointer flex items-center border-slate-300 text-slate-700 hover:bg-slate-100"
        >
          <Plus className="h-4 w-4 mr-1" /> Agregar Artículo
        </Button>
      </div>

      <div className="space-y-1">
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
            <span className="flex items-center gap-1 ">
              <Tag className="h-4 w-4" /> Categoría
            </span>
          </div>
          <div>
            <span className="flex items-center gap-1 ">
              <Palette className="h-4 w-4" /> Color
            </span>
          </div>
          <div>
            <span className="flex items-center gap-1 ">
              <FileText className="h-4 w-4" /> Descripción
            </span>
          </div>
          <div>
            <span className="flex items-center gap-1 ">
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

        {items.map((item) => (
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
                    handleItemChange(item.id, "codigo_interno", e.target.value)
                  }
                  className={`${inputStyle} w-full bg-white`}
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
                  className={`${inputStyle} w-full bg-white`}
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
                  <SelectTrigger className={`${inputStyle} w-full bg-white`}>
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
                <Select
                  value={item.color ?? ""}
                  onValueChange={(value) =>
                    handleItemChange(item.id, "color", value)
                  }
                >
                  <SelectTrigger className={`${inputStyle} w-full bg-white`}>
                    <SelectValue placeholder="Color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rojo">Rojo</SelectItem>
                    <SelectItem value="Azul">Azul</SelectItem>
                    <SelectItem value="Verde">Verde</SelectItem>
                    <SelectItem value="Negro">Negro</SelectItem>
                    <SelectItem value="Blanco">Blanco</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Descripción */}
              <div>
                <Input
                  value={item.descripcion ?? ""}
                  onChange={(e) =>
                    handleItemChange(item.id, "descripcion", e.target.value)
                  }
                  className={`${inputStyle} w-full bg-white`}
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
                  <SelectTrigger className={`${inputStyle} w-full bg-white`}>
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
                      parseFloat(e.target.value)
                    )
                  }
                  className={`${inputStyle} w-full bg-white`}
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
                  className={cn(
                    "hover:bg-gray-200 hover:text-red-500 cursor-pointer",
                    items.length === 1 ? "text-red-400 " : "text-red-500"
                  )}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProveedorAddArticles;
