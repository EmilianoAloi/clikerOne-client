import { memo, useEffect } from "react";
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
import { useFactura } from "@/queries/proveedores/factura/useFactura";
import { toast } from "sonner";

const InputMonto = memo(({ value, onChange }) => (
  <Input
    type="text"
    inputMode="decimal"
    className="w-full text-right px-2 py-1 h-9"
    value={value}
    disabled={false}
    onChange={(e) => onChange(e.target.value)}
  />
));
InputMonto.displayName = "InputMonto";

const ProveedorOPinvoices = ({
  idProveedor,
  facturasSeleccionadas,
  setFacturasSeleccionadas,
  modo,
}) => {
  // Usá el hook nuevo:
  const {
    data: facturasDelProveedor = [],
    isLoading,
    isError,
    error,
  } = useFactura(idProveedor);

  // Mostrar error SOLO si es error real (no 404/array vacío)
  useEffect(() => {
    if (isError && error?.message && facturasDelProveedor.length === 0) {
      toast.error("Error al obtener las facturas del proveedor.");
    }
  }, [isError, error, facturasDelProveedor.length]);

  const facturasSeleccionadasIds = facturasSeleccionadas.map(
    (f) => f.id_factura
  );

  const facturasFiltradas =
    modo === "editar"
      ? facturasDelProveedor.filter((f) =>
          facturasSeleccionadasIds.includes(f.id_factura)
        )
      : facturasDelProveedor.filter(
          (f) =>
            f.id_proveedor === idProveedor &&
            (f.estado_saldo === "pendiente de pago" ||
              f.estado_saldo === "parcial")
        );

  const isSelected = (id) =>
    facturasSeleccionadas.some((f) => f.id_factura === id);

  const getMonto = (id) => {
    const found = facturasSeleccionadas.find((f) => f.id_factura === id);
    return found?.monto ?? "";
  };

  const handleMontoChange = (id, monto) => {
    if (monto === "") {
      setFacturasSeleccionadas((prev) =>
        prev.map((f) => (f.id_factura === id ? { ...f, monto: "" } : f))
      );
      return;
    }

    const factura = facturasFiltradas.find((f) => f.id_factura === id);
    const saldo = factura?.saldo_restante ?? factura?.monto_total ?? 0;
    let montoNum = parseFloat(monto.replace(",", "."));

    if (isNaN(montoNum)) montoNum = "";

    if (montoNum > saldo) montoNum = saldo;

    setFacturasSeleccionadas((prev) =>
      prev.map((f) => (f.id_factura === id ? { ...f, monto: montoNum } : f))
    );
  };

  const handleCheckboxChange = (factura, checked) => {
    if (checked) {
      const saldo = factura.saldo_restante ?? factura.monto_total ?? 0;
      setFacturasSeleccionadas((prev) => [
        ...prev,
        {
          id_factura: factura.id_factura,
          monto: saldo,
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

  // Loading
  if (isLoading) {
    return <div className="p-4">Cargando facturas...</div>;
  }

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
                        disabled={
                          modo === "editar" &&
                          selected &&
                          Number(factura.saldo_restante) <= 0.009
                        }
                        onChange={(e) =>
                          handleCheckboxChange(factura, e.target.checked)
                        }
                      />
                    </TableCell>

                    <TableCell className="py-3 font-medium flex items-center gap-2">
                      # {factura.numero_factura}
                      {modo === "editar" &&
                        factura.estado_saldo === "pagada" &&
                        isSelected(factura.id_factura) && (
                          <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-700 border border-emerald-200">
                            Saldada por este pago
                          </span>
                        )}
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
                        onChange={(val) =>
                          handleMontoChange(factura.id_factura, val)
                        }
                      />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[350px]">
                      <div
                        className="max-w-[350px] overflow-x-auto whitespace-nowrap"
                        style={{ scrollbarWidth: "none" }}
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
