import { memo } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Calendar } from "lucide-react";
import { useProveedorInvoices } from "@/contexts/ProveedorInvoicesContext";

const InputMonto = memo(({ value, disabled, onChange }) => (
  <Input
    type="text"
    inputMode="decimal"
    className="w-full text-right px-2 py-1 h-9"
    disabled={disabled}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
));
InputMonto.displayName = "InputMonto";

const ProveedorOPinvoices = ({
  idProveedor,
  facturasSeleccionadas,
  setFacturasSeleccionadas,
}) => {
  const { invoicesByProveedor } = useProveedorInvoices();
  const facturasDelProveedor = invoicesByProveedor[idProveedor] || [];

  const facturasFiltradas = facturasDelProveedor.filter(
    (f) =>
      f.id_proveedor === idProveedor &&
      (f.estado_saldo === "pendiente de pago" || f.estado_saldo === "parcial")
  );

  const isSelected = (id) =>
    facturasSeleccionadas.some((f) => f.id_factura === id);

  const getMonto = (id) => {
    const found = facturasSeleccionadas.find((f) => f.id_factura === id);
    return found?.monto ?? "";
  };

  const handleMontoChange = (id, monto) => {
    setFacturasSeleccionadas((prev) =>
      prev.map((f) => (f.id_factura === id ? { ...f, monto } : f))
    );
  };

  const handleCheckboxChange = (factura, checked) => {
    if (checked) {
      const saldo = factura.saldo_restante ?? factura.monto_total ?? 0;
      setFacturasSeleccionadas((prev) => [
        ...prev,
        {
          id_factura: factura.id_factura,
          monto: saldo.toString(),
          numero_factura:
            factura.numero_factura ?? factura.id_factura.toString(),
        },
      ]);
    } else {
      setFacturasSeleccionadas((prev) =>
        prev.filter((f) => f.id_factura !== factura.id_factura)
      );
    }
  };

  return (
    <div className="overflow-hidden ">
      <h3 className="text-lg font-semibold mb-4 ">Documentos a Cancelar</h3>
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 w-full">
              <TableHead />
              <TableHead className="font-semibold text-slate-700">
                N° Factura
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Tipo
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Emisión
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Vencimiento
              </TableHead>
              <TableHead className="font-semibold text-slate-700 ">
                Total
              </TableHead>
              <TableHead className="font-semibold text-slate-700 ">
                Saldo
              </TableHead>
              <TableHead className="font-semibold text-slate-700 ">
                A pagar
              </TableHead>
              <TableHead className="font-semibold text-slate-700 w-[350px] max-w-[350px] ">
                Observaciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {facturasFiltradas.length > 0 ? (
              facturasFiltradas.map((factura) => {
                console.log("🧾 Factura mostrada:", factura);
                const selected = isSelected(factura.id_factura);
                const monto = getMonto(factura.id_factura);

                return (
                  <TableRow
                    key={factura.id_factura}
                    className="hover:bg-slate-50 border-b"
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={selected}
                        onChange={(e) =>
                          handleCheckboxChange(factura, e.target.checked)
                        }
                      />
                    </TableCell>
                    <TableCell className="py-3 font-medium">
                      # {factura.numero_factura}
                    </TableCell>
                    <TableCell>{factura.tipo_comprobante ?? "-"}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                        {factura.fecha_emision
                          ? new Date(factura.fecha_emision).toLocaleDateString(
                              "es-AR"
                            )
                          : "-"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                        {factura.fecha_vencimiento
                          ? new Date(
                              factura.fecha_vencimiento
                            ).toLocaleDateString("es-AR")
                          : "-"}
                      </div>
                    </TableCell>
                    <TableCell className=" text-nowrap">
                      $
                      {factura.monto_total?.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className=" text-[#d97800] text-nowrap">
                      $
                      {(
                        factura.saldo_restante ??
                        factura.monto_total ??
                        0
                      ).toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>

                    <TableCell className=" w-30">
                      <InputMonto
                        value={monto}
                        disabled={!selected}
                        onChange={(val) =>
                          handleMontoChange(factura.id_factura, val)
                        }
                      />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[350px]">
                      <div
                        className="max-w-[350px] overflow-x-auto whitespace-nowrap"
                        style={{ scrollbarWidth: "none" }} // para Firefox
                      >
                        <span
                          className="inline-block select-text"
                          style={{ WebkitOverflowScrolling: "touch" }}
                        >
                          {factura.observaciones ?? "-"}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  No hay facturas para este proveedor.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProveedorOPinvoices;
