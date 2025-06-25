import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateArticuloMutation } from "@/hooks/react-query/useArticulosMutation";
import { useArticulosStore } from "@/stores/articulosStore";

// --- Esquema de validación Zod
const articuloSchema = z.object({
  codigo_interno: z.string().min(1, "Requerido"),
  nombre: z.string().min(1, "Requerido"),
  categoria: z.string().min(1, "Requerido"),
  color: z.string().min(1, "Requerido"),
  descripcion: z.string().optional(),
  unidad_de_medida: z.string().min(1, "Requerido"),
  precio_unitario: z.coerce.number().min(0.01, "Debe ser mayor a 0"),
});

// Opciones (podés mover a un archivo constante si lo usás en varios lados)
const CATEGORIAS = [
  { value: "Materia prima", label: "Materia prima" },
  { value: "Producto final", label: "Producto final" },
  { value: "Parte o componente", label: "Parte o componente" },
  { value: "Librería", label: "Librería" },
  { value: "Cocina", label: "Cocina" },
  { value: "Ferretería", label: "Ferretería" },
  { value: "Electrónica", label: "Electrónica" },
  { value: "Otros", label: "Otros" },
];

const COLORES = [
  { value: "Blanco", label: "Blanco" },
  { value: "Negro", label: "Negro" },
  { value: "Rojo", label: "Rojo" },
  { value: "Azul", label: "Azul" },
  { value: "Verde", label: "Verde" },
  { value: "Otro", label: "Otro" },
];

const UNIDADES = [
  { value: "unidad", label: "unidad" },
  { value: "caja", label: "caja" },
  { value: "g", label: "g" },
  { value: "kg", label: "kg" },
  { value: "lt", label: "lt" },
  { value: "ml", label: "ml" },
  { value: "cm", label: "cm" },
  { value: "cm2", label: "cm²" },
  { value: "cm3", label: "cm³" },
  { value: "m", label: "m" },
  { value: "m2", label: "m²" },
];

export default function ArticulosFormModal({
  open,
  onClose,
  onCreated,
  idProveedor,
}) {
  const form = useForm({
    resolver: zodResolver(articuloSchema),
    defaultValues: {
      codigo_interno: "",
      nombre: "",
      categoria: "",
      color: "",
      descripcion: "",
      unidad_de_medida: "unidad",
      precio_unitario: 0,
    },
    mode: "onTouched",
  });

  // React Query + Zustand
  const mutation = useCreateArticuloMutation(idProveedor);
  const addArticulo = useArticulosStore((s) => s.addArticulo);

  const handleSubmit = (values) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        addArticulo?.(data); // Actualiza Zustand si usás cache local
        onCreated?.(); // Callback para refrescar la lista
        form.reset();
        onClose();
      },
      // El error ya lo maneja el hook
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        form.reset();
        onClose();
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogTitle>Agregar Nuevo Artículo</DialogTitle>
        <DialogDescription>
          Completá la información del nuevo artículo para este proveedor.
        </DialogDescription>
        <form
          className="space-y-3 mt-4"
          onSubmit={form.handleSubmit(handleSubmit)}
          autoComplete="off"
        >
          <Input
            {...form.register("codigo_interno")}
            placeholder="Código *"
            disabled={mutation.isPending}
            autoFocus
          />
          {form.formState.errors.codigo_interno && (
            <p className="text-red-500 text-xs">
              {form.formState.errors.codigo_interno.message}
            </p>
          )}
          <Input
            {...form.register("nombre")}
            placeholder="Nombre *"
            disabled={mutation.isPending}
          />
          {form.formState.errors.nombre && (
            <p className="text-red-500 text-xs">
              {form.formState.errors.nombre.message}
            </p>
          )}
          <Select
            value={form.watch("categoria")}
            onValueChange={(v) => form.setValue("categoria", v)}
            disabled={mutation.isPending}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar categoría *" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIAS.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.categoria && (
            <p className="text-red-500 text-xs">
              {form.formState.errors.categoria.message}
            </p>
          )}
          <Select
            value={form.watch("color")}
            onValueChange={(v) => form.setValue("color", v)}
            disabled={mutation.isPending}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar color *" />
            </SelectTrigger>
            <SelectContent>
              {COLORES.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  {color.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.color && (
            <p className="text-red-500 text-xs">
              {form.formState.errors.color.message}
            </p>
          )}
          <Input
            {...form.register("descripcion")}
            placeholder="Descripción"
            disabled={mutation.isPending}
          />
          <Select
            value={form.watch("unidad_de_medida")}
            onValueChange={(v) => form.setValue("unidad_de_medida", v)}
            disabled={mutation.isPending}
          >
            <SelectTrigger>
              <SelectValue placeholder="Unidad de Medida *" />
            </SelectTrigger>
            <SelectContent>
              {UNIDADES.map((um) => (
                <SelectItem key={um.value} value={um.value}>
                  {um.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.unidad_de_medida && (
            <p className="text-red-500 text-xs">
              {form.formState.errors.unidad_de_medida.message}
            </p>
          )}
          <Input
            {...form.register("precio_unitario", { valueAsNumber: true })}
            type="number"
            step="0.01"
            min={0.01}
            placeholder="Precio Unitario *"
            disabled={mutation.isPending}
          />
          {form.formState.errors.precio_unitario && (
            <p className="text-red-500 text-xs">
              {form.formState.errors.precio_unitario.message}
            </p>
          )}
          <div className="flex justify-end gap-2 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                onClose();
              }}
              disabled={mutation.isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Guardando..." : "Agregar Artículo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
