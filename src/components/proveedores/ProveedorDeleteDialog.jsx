import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"; // Ruta relativa desde 'proveedores'
import { Trash } from "lucide-react";
import { Button } from "../ui/button"; // Ruta relativa desde 'proveedores'

// No más typescript, solo props JS
const ProveedoressDeleteDialog = ({ Proveedor, onDelete }) => {
  const [open, setOpen] = useState(false);

  const handleConfirmDelete = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full cursor-pointer flex items-center justify-start text-red-500 hover:text-red-600 hover:bg-red-100 !px-2 !py-1"
        >
          <Trash className="h-4 w-4 mr-0 text-red-500" /> Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar Proveedor</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Seguro que desea eliminar al proveedor{" "}
            <strong>{Proveedor.nombre}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer bg-red-500 hover:bg-red-400 text-white"
            onClick={handleConfirmDelete}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProveedoressDeleteDialog;
