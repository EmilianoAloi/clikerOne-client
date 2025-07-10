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
  const url = queryKey[0];
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.status === 404) return [];
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
    const message =
      errorBody.error || errorBody.message || `Error ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error._handled = true;
    throw error;
  }
  return res.json();
};
