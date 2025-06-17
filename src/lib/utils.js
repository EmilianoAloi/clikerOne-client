import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (valor) => {
  const numero = parseFloat(typeof valor === "string" ? valor : String(valor));
  if (isNaN(numero)) return "$0,00";
  return numero.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });
};
