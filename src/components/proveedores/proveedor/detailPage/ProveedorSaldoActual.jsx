import { DollarSign } from "lucide-react";

export function SaldoActual({ saldo, label = "Saldo actual" }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(Math.abs(amount));
  };

  const isNegative = saldo < 0;
  const isPositive = saldo > 0;

  return (
    <div
      className={`flex items-center gap-4 rounded-xl px-6 py-2 shadow-sm border ${
        isNegative
          ? "bg-red-50 border-red-100"
          : isPositive
          ? "bg-green-50 border-green-100"
          : "bg-yellow-50 border-yellow-100"
      }`}
    >
      <div
        className={`h-12 w-12 rounded-full flex items-center justify-center ${
          isNegative
            ? "bg-red-100"
            : isPositive
            ? "bg-green-100"
            : "bg-yellow-100"
        }`}
      >
        <DollarSign
          className={`h-6 w-6 ${
            isNegative
              ? "text-red-700"
              : isPositive
              ? "text-green-700"
              : "text-yellow-700"
          }`}
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p
          className={`text-2xl font-bold ${
            isNegative
              ? "text-red-700"
              : isPositive
              ? "text-green-700"
              : "text-yellow-700"
          }`}
        >
          {isNegative ? "- " : ""}
          {formatCurrency(saldo)}
        </p>
      </div>
    </div>
  );
}
