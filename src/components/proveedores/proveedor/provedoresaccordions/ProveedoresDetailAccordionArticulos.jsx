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
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ArticulosFormModal from "../../articulos/ArticulosAddModal";
import { Link } from "react-router-dom";

const ProveedoresDetailAccordionArticulos = ({
  currentProveedores,
  articles = [],
}) => {
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [showArticuloModal, setShowArticuloModal] = useState(false);
  const [showHistorialModal, setShowHistorialModal] = useState(false);

  useEffect(() => {
    // Filtra artículos para este proveedor
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
      <AccordionTrigger className="px-6 py-3 hover:bg-slate-50 cursor-pointer group hover:no-underline">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center ">
            <Package className="mr-2 h-5 w-5 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
            <span className="font-semibold text-lg ">Artículos</span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 ">
        <div className="flex justify-end gap-2 mb-3">
          <ArticulosFormModal
            open={showArticuloModal}
            onClose={() => setShowArticuloModal(false)}
            idProveedor={currentProveedores.id_proveedor}
            // onCreated={refreshArticles}
          />
        </div>
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                {/* ...todas tus columnas, incluyendo Acciones... */}
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
                <TableHead className="text-slate-700 font-semibold text-center w-32">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.map((articulo) => (
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
                  <TableCell className=" !ms-4 text-center flex gap-2 justify-center">
                    <Link
                      to={`/proveedores/${currentProveedores.id_proveedor}/historial-precios`}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-indigo-500 !p-0"
                        title="Ver historial de precios"
                      >
                        <CircleDollarSign className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowArticuloModal(true)}
                      className="text-amber-500 !p-0"
                      title="Editar artículo"
                    >
                      <FileText className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="group">
                <TableCell colSpan={8} className="p-0">
                  <div
                    className="w-full py-4 hover:bg-slate-50 cursor-pointer transition-colors duration-200 border-t border-slate-100"
                    onClick={() => setShowArticuloModal(true)}
                  >
                    <div className="flex items-center justify-center gap-3 text-slate-500 group-hover:text-indigo-600 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                        <Plus className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-700 group-hover:text-indigo-700 transition-colors">
                          Agregar Artículo
                        </div>
                        <div className="text-xs text-slate-500 group-hover:text-indigo-500 transition-colors">
                          Click para crear un nuevo artículo
                        </div>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ProveedoresDetailAccordionArticulos;
