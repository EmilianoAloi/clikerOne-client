import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { FileText } from "lucide-react";

const NDviewExtras = ({ notaDebito }) => {
  return (
    <div className="mt-5 mb-5">
      <Card className="w-full border-none shadow-none md:border md:shadow-md ">
        <CardHeader>
          <CardTitle className="flex items-center gap-2  text-xl">
            <FileText className="w-5 h-5" />
            Observaciones
          </CardTitle>
          <CardDescription className="hidden md:block">
            Notas o comentarios adicionales sobre la Nota de Débito
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            {notaDebito.observaciones?.trim()
              ? notaDebito.observaciones
              : "No hay observaciones en la nota de débito."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NDviewExtras;
