import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Package,
  Hash,
  Palette,
  FileText,
  Tag,
  Ruler,
  CircleDollarSign,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ArticulosFormModal from "../../articulos/ArticulosAddModal";

const ProveedoresDetailAccordionArticulos = ({
  currentProveedores,
  articles = [],
}) => {
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [showArticuloModal, setShowArticuloModal] = useState(false);
  const [showHistorialModal, setShowHistorialModal] = useState(false);

  useEffect(() => {
    // Filtra artículos para este proveedor, si es necesario
    if (articles.length && currentProveedores?.id_proveedor) {
      setFilteredArticles(
        articles.filter(
          (a) => a.id_proveedor === currentProveedores.id_proveedor
        )
      );
    } else {
      setFilteredArticles([]);
    }
  }, [articles, currentProveedores]);

  return (
    <AccordionItem
      value="articulos"
      className="border rounded-lg shadow-sm overflow-hidden bg-white"
    >
      <AccordionTrigger className="px-6 py-3 hover:bg-slate-50 cursor-pointer group">
        <div className="flex items-center justify-between w-full">
          {/* Título + ícono */}
          <div className="flex items-center">
            <Package className="mr-2 h-5 w-5 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
            <span className="font-semibold text-lg">Artículos</span>
          </div>
        </div>
      </AccordionTrigger>
      {/* Botones */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setShowArticuloModal(true)}
          className="flex items-center gap-2"
          size="sm"
        >
          <Package className="w-4 h-4" /> Agregar Artículo
        </Button>

        <ArticulosFormModal
          open={showArticuloModal}
          onClose={() => setShowArticuloModal(false)}
          idProveedor={currentProveedores.id_proveedor}
          // onCreated={refreshArticles} // tu función para refrescar la lista de artículos en pantalla
        />
        <Button
          variant="secondary"
          onClick={() => setShowHistorialModal(true)}
          className="flex items-center gap-2"
          size="sm"
        >
          <CircleDollarSign className="w-4 h-4" /> Historial de Precios
        </Button>
      </div>

      <AccordionContent className="px-6 pb-6 pt-2">
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="text-slate-700 font-semibold">
                  <span className="inline-flex items-center gap-1">
                    <Hash className="w-4 h-4" /> Código
                  </span>
                </TableHead>
                <TableHead className="text-slate-700 font-semibold">
                  <span className="inline-flex items-center gap-1">
                    <Package className="w-4 h-4" /> Nombre
                  </span>
                </TableHead>
                <TableHead className="text-slate-700 font-semibold">
                  <span className="inline-flex items-center gap-1">
                    <Tag className="w-4 h-4" /> Categoría
                  </span>
                </TableHead>
                <TableHead className="text-slate-700 font-semibold">
                  <span className="inline-flex items-center gap-1">
                    <Palette className="w-4 h-4" /> Color
                  </span>
                </TableHead>
                <TableHead className="text-slate-700 font-semibold">
                  <span className="inline-flex items-center gap-1">
                    <FileText className="w-4 h-4" /> Descripción
                  </span>
                </TableHead>
                <TableHead className="text-slate-700 font-semibold">
                  <span className="inline-flex items-center gap-1">
                    <Ruler className="w-4 h-4" /> U. medida
                  </span>
                </TableHead>
                <TableHead className="text-slate-700 font-semibold text-right">
                  <span className="inline-flex items-center gap-1 justify-end">
                    <CircleDollarSign className="w-4 h-4" /> Precio Unitario
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.length > 0 ? (
                filteredArticles.map((articulo) => (
                  <TableRow
                    key={articulo.id_articulo}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <TableCell className="py-3 ps-3">
                      {articulo.codigo_interno ?? "-"}
                    </TableCell>
                    <TableCell className="py-3 font-medium">
                      {articulo.nombre}
                    </TableCell>
                    <TableCell className="py-3 ps-3">
                      {articulo.categoria || "-"}
                    </TableCell>
                    <TableCell className="py-3 ps-3">
                      {articulo.color || "-"}
                    </TableCell>
                    <TableCell className="py-3 ps-3">
                      {articulo.descripcion || "-"}
                    </TableCell>
                    <TableCell className="py-3 ps-4">
                      {articulo.unidad_de_medida || "-"}
                    </TableCell>
                    <TableCell className="py-3 text-right">
                      ${" "}
                      {articulo.precio_unitario?.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No hay artículos cargados para este proveedor.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ProveedoresDetailAccordionArticulos;
