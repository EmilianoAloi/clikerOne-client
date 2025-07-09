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

export const queryFetchWithAuth = async ({ queryKey }) => {
  const token = localStorage.getItem("token");
  const res = await fetch(queryKey[0], {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.status === 404) {
    // Caso: no hay datos, no es error real
    return [];
  }
  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Error en fetch:", res.status, errorText);
    throw new Error(errorText || "Network error");
  }
  return res.json();
};

export const mutationFetchWithAuth = async ({ url, method = "POST", body }) => {
  const token = localStorage.getItem("token");
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || "Network error");
  }
  return res.json();
};
