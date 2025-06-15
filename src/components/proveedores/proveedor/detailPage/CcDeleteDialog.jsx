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
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

const CcDeleteDialog = ({ movement, onDelete, onCloseDropdown }) => {
  const [open, setOpen] = useState(false);

  const handleConfirmDelete = () => {
    onDelete();
    setOpen(false);
    onCloseDropdown();
  };

  const handleCancel = () => {
    setOpen(false);
    onCloseDropdown();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="cursor-pointer w-full flex items-center justify-start text-red-500 hover:text-red-600 hover:bg-red-100 !px-2 !py-1"
          onClick={(e) => e.stopPropagation()}
        >
          <Trash className="h-4 w-4 mr-0 text-red-500" /> Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar Movimiento</AlertDialogTitle>
          <AlertDialogDescription className="flex gap-1">
            ¿Seguro que desea eliminar{" "}
            <span className="uppercase font-semibold">{movement.type}</span>{" "}
            <span className="font-semibold">{movement.comprobante}</span>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" onClick={handleCancel}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-400 text-white cursor-pointer"
            onClick={handleConfirmDelete}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CcDeleteDialog;
