import { Input } from "@/components/ui/input";

const baseClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400";

// Permite: 12, 12.2, 12,2, .2, ,2, vacío
const decimalRegex = /^(\d+([.,]\d*)?|[.,]\d*)?$/;

export default function DecimalInput({
  value,
  onChange,
  placeholder = "Ej: 1234.56",
  className = "",
  ...props
}) {
  return (
    <Input
      value={value ?? ""}
      type="text"
      inputMode="decimal"
      step="any"
      className={`${baseClass} ${className}`}
      placeholder={placeholder}
      // NO uses onBeforeInput
      onChange={(e) => {
        let val = e.target.value;
        // Permití vacío, punto o coma solo al inicio, y valores válidos
        if (decimalRegex.test(val) || val === "") {
          // Convertí todas las comas a puntos
          val = val.replace(",", ".");
          onChange(val);
        }
      }}
      onPaste={(e) => {
        const paste = e.clipboardData.getData("Text");
        // Permití pegar solo si es válido
        if (!decimalRegex.test(paste)) {
          e.preventDefault();
        }
      }}
      {...props}
    />
  );
}
