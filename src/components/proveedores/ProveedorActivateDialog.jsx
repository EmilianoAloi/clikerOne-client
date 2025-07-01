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
} from "../ui/alert-dialog";
import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useActivateProveedor } from "@/queries/proveedores/useActivateProveedor";

const ProveedoresActivateDialog = ({ Proveedor, onActivate }) => {
  const [open, setOpen] = useState(false);
  const activateProveedorMutation = useActivateProveedor();

  const handleConfirmActivate = () => {
    activateProveedorMutation.mutate(Proveedor.id_proveedor, {
      onSuccess: () => {
        setOpen(false);
        if (onActivate) onActivate();
      },
      onError: (error) => {
        console.error("Error en activar proveedor:", error);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full cursor-pointer flex items-center justify-start text-green-700 hover:text-green-800 hover:bg-green-100 !px-2 !py-1"
        >
          <CheckCircle className="h-4 w-4 mr-0 text-green-700" />
          Activar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Activar Proveedor</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Seguro que desea activar al proveedor{" "}
            <strong>{Proveedor.nombre}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer bg-green-600 hover:bg-green-500 text-white"
            onClick={handleConfirmActivate}
          >
            Activar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProveedoresActivateDialog;
