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
  User,
  Pencil,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ArticulosMultiFormModal from "../articulos/individual/ArticulosAddModal";
import ArticulosEditModal from "../articulos/individual/ArticulosEditModal";

const ProveedoresDetailAccordionArticulos = ({
  currentProveedores,
  articles = [],
  isLoading = false,
  error = null,
}) => {
  const [showArticuloModal, setShowArticuloModal] = useState(false);
  const [editingArticulo, setEditingArticulo] = useState(false);

  return (
    <AccordionItem
      value="articulos"
      className="border rounded-lg shadow-sm overflow-hidden bg-white"
    >
      <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 cursor-pointer group hover:no-underline">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center ">
            <Package className="mr-2 h-5 w-5 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
            <span className="font-semibold text-lg ">Artículos</span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 ">
        <div className="flex justify-end gap-2 mb-3">
          <ArticulosMultiFormModal
            open={showArticuloModal}
            onClose={() => setShowArticuloModal(false)}
            idProveedor={currentProveedores.id_proveedor}
          />
          <ArticulosEditModal
            open={!!editingArticulo}
            onOpenChange={(isOpen) => {
              if (!isOpen) setEditingArticulo(null);
            }}
            articulo={editingArticulo}
            idProveedor={currentProveedores.id_proveedor}
          />
        </div>
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
                <TableHead className="text-slate-700 font-semibold ">
                  <span className="inline-flex items-center gap-1 justify-end">
                    <CircleDollarSign className="w-4 h-4" /> Precio Unitario
                  </span>
                </TableHead>
                <TableHead className="text-slate-700 font-semibold text-right">
                  <span className="inline-flex items-center gap-1">
                    <User className="w-4 h-4" /> Usuario
                  </span>
                </TableHead>
                <TableHead className="text-slate-700 font-semibold text-center w-32">
                  Editar
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    Cargando artículos...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-4 text-red-500"
                  >
                    Error al cargar artículos.
                  </TableCell>
                </TableRow>
              ) : articles.length > 0 ? (
                articles.map((articulo) => (
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
                    <TableCell className="py-3 ">
                      ${" "}
                      {articulo.precio_unitario?.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className="py-3 text-right">
                      {articulo.modificador?.nombre ||
                        articulo.creador?.nombre ||
                        "-"}
                    </TableCell>
                    <TableCell className="  text-center flex gap-2 justify-center">
                      {/* <Link
                        to={`/proveedores/${currentProveedores.id_proveedor}/historial-precios`}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-indigo-500 !p-0 cursor-pointer"
                          title="Ver historial de precios"
                        >
                          <CircleDollarSign className="w-4 h-4" />
                        </Button>
                      </Link> */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingArticulo(articulo)}
                        className="text-indigo-500 !p-0 cursor-pointer"
                        title="Editar artículo"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="group">
                  <TableCell
                    colSpan={10}
                    className="py-4 pl-6 sm:text-center sm:pl-0 text-muted-foreground"
                  >
                    No hay artículos asociados.
                  </TableCell>
                </TableRow>
              )}
              {/* Fila de agregar artículo */}
              <TableRow className="group">
                <TableCell colSpan={9} className="p-0">
                  <div
                    className="w-full py-4 hover:bg-slate-50 cursor-pointer transition-colors duration-200 border-t border-slate-100"
                    onClick={() => setShowArticuloModal(true)}
                  >
                    <div className="flex items-center ps-5 md: ps-0 justify-start md:justify-center gap-3 text-slate-500 group-hover:text-indigo-600 transition-colors">
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
