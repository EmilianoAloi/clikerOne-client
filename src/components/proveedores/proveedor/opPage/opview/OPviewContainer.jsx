import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import OPviewTitle from "./OPviewTitle";
import OPviewHeader from "./OPviewHeader";
import OPviewSubHeader from "./OPviewSubHeader";
import OPviewInvoice from "./OPviewInvoice";
import OPviewPagos from "./OPviewPagos";
import OPviewObs from "./OPviewObs";

export default function OPviewContainer({ pago }) {
  const [isPrinting, setIsPrinting] = useState(false);

  const pagos = pago.items;
  const facturas = useMemo(
    () =>
      pagos.map((it) => ({
        ...it.ProveedorFactura,
        monto_total: parseFloat(it.ProveedorFactura.monto_total),
      })),
    [pagos]
  );

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  const fechaCreacion = format(new Date(pago.fecha_creada), "dd.MM.yyyy", {
    locale: es,
  });
  const horaCreacion = format(new Date(pago.fecha_creada), "HH:mm:ss");

  function numeroALetras(valor) {
    const unidades = [
      "",
      "uno",
      "dos",
      "tres",
      "cuatro",
      "cinco",
      "seis",
      "siete",
      "ocho",
      "nueve",
      "diez",
      "once",
      "doce",
      "trece",
      "catorce",
      "quince",
      "dieciséis",
      "diecisiete",
      "dieciocho",
      "diecinueve",
      "veinte",
    ];
    const decenas = [
      "",
      "",
      "veinte",
      "treinta",
      "cuarenta",
      "cincuenta",
      "sesenta",
      "setenta",
      "ochenta",
      "noventa",
    ];
    const centenas = [
      "",
      "ciento",
      "doscientos",
      "trescientos",
      "cuatrocientos",
      "quinientos",
      "seiscientos",
      "setecientos",
      "ochocientos",
      "novecientos",
    ];
    function convertirGrupo(n) {
      let texto = "";
      if (n === 100) return "cien";
      texto += centenas[Math.floor(n / 100)];
      const resto = n % 100;
      if (resto <= 20) {
        texto += (texto ? " " : "") + unidades[resto];
      } else {
        const dec = Math.floor(resto / 10);
        const uni = resto % 10;
        texto += (texto ? " " : "") + decenas[dec];
        if (uni) texto += " y " + unidades[uni];
      }
      return texto;
    }
    function seccion(n, sing, plu) {
      if (n === 0) return "";
      if (n === 1) return ` ${sing}`;
      return ` ${convertirGrupo(n)} ${plu}`;
    }
    const entero = Math.floor(valor);
    const centavos = Math.round((valor - entero) * 100);
    const millones = Math.floor(entero / 1_000_000);
    const miles = Math.floor((entero % 1_000_000) / 1000);
    const resto = entero % 1000;
    let texto = "";
    texto += seccion(millones, "millón", "millones");
    texto += seccion(miles, "mil", "mil");
    texto += resto ? " " + convertirGrupo(resto) : "";
    texto = texto.trim() || "cero";
    let resultado = `${texto} pesos`;
    if (centavos === 1) resultado += " con un centavo";
    else if (centavos > 1)
      resultado += ` con ${convertirGrupo(centavos)} centavos`;
    return resultado.replace(/\s+/g, " ").trim();
  }

  const totalValores = pagos.reduce(
    (acc, p) => acc + parseFloat(p.monto_aplicado ?? "0"),
    0
  );

  return (
    <div className="lg:container mx-auto lg:px-8 print:px-0 print:mx-0 print:max-w-full print:mt-0 print:pt-0">
      <div className="flex justify-end gap-2 mb-2 !print:hidden">
        <BackButton />
        <Button onClick={handlePrint} disabled={isPrinting} variant="outline">
          <Printer className="mr-1 h-4 w-4" />
          {isPrinting ? "Imprimiendo..." : "Imprimir OP"}
        </Button>
      </div>
      <OPviewTitle pago={pago} />
      <OPviewHeader pago={pago} />
      <OPviewSubHeader />
      <OPviewInvoice facturas={facturas} />
      <OPviewPagos pagos={pagos} />
      <OPviewObs
        montoEnLetras={numeroALetras(totalValores).toUpperCase()}
        fechaCreacion={fechaCreacion}
        horaCreacion={horaCreacion}
      />
    </div>
  );
}
