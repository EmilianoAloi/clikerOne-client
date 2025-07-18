import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  Pause,
  MessageSquare,
  DollarSign,
  Calendar,
  Circle,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BadgeEstado({ estado, className = "", children }) {
  const {
    color,
    label,
    icon: IconComponent,
  } = (() => {
    switch (estado) {
      case "ejecutada":
        return {
          color:
            "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
          label: "Ejecutada",
          icon: CheckCircle,
        };
      case "pagada":
        return {
          color:
            "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
          label: "Pagada",
          icon: CheckCircle,
        };
      case "entregada":
        return {
          color:
            "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
          label: "Entregada",
          icon: CheckCircle,
        };
      case "completo":
        return {
          color:
            "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
          label: "Completo",
          icon: CheckCircle,
        };
      case "parcial":
        return {
          color:
            "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
          label: "Pago parcial",
          icon: DollarSign,
        };
      case "pendiente de pago":
        return {
          color:
            "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
          label: "Pendiente de pago",
          icon: Clock,
        };
      case "pendiente":
        return {
          color:
            "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100",
          label: "Pendiente",
          icon: Clock,
        };
      case "vencida":
        return {
          color: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
          label: "Vencida",
          icon: Calendar,
        };
      case "anulada":
        return {
          color: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
          label: "Anulada",
          icon: XCircle,
        };
      case "con_nota_credito":
        return {
          color: "bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100",
          label: "Con nota de crédito",
          icon: FileText,
        };
      case "retenida":
        return {
          color:
            "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
          label: "Retenida",
          icon: Pause,
        };
      case "en_discusion":
        return {
          color:
            "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100",
          label: "En discusión",
          icon: MessageSquare,
        };
      case "en_proceso":
        return {
          color:
            "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
          label: "En Proceso",
          icon: Circle,
        };
      case "sobrada":
        return {
          color:
            "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100",
          label: "Sobrada",
          icon: AlertCircle,
        };
      case "ninguna":
        return {
          color:
            "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100",
          label: "Ninguna",
          icon: AlertCircle,
        };
      case "saldo_cero":
        return {
          color:
            "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
          label: "Saldo Cero",
          icon: Circle,
        };
      case "saldo_negativo":
        return {
          color: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
          label: "Acreedor",
          icon: ArrowDownCircle,
        };
      case "saldo_positivo":
        return {
          color:
            "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
          label: "Acreedor",
          icon: ArrowUpCircle,
        };
      default: {
        const safeEstado = String(estado);
        return {
          color: "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100",
          label: safeEstado.charAt(0).toUpperCase() + safeEstado.slice(1),
          icon: AlertCircle,
        };
      }
    }
  })();

  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 font-medium transition-colors duration-200 border text-xs px-2.5 py-1 h-6",
        color,
        className
      )}
    >
      <IconComponent className="h-3.5 w-3.5 flex-shrink-0" />
      <span className="truncate">{children ? children : label}</span>
    </Badge>
  );
}
