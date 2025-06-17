import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { toast } from "sonner";
import { fetchFromCliker2, fetchDetallePagoCliker2 } from "@/lib/cliker2";
import { Input } from "@/components/ui/input";
import ChequesModalTable from "./ChequesModalTable";

export const FormOrdersImport = ({ idProveedorCliker, onImport }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pagos, setPagos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  const abrirDialog = async () => {
    if (!idProveedorCliker) {
      toast.warning(
        "Este proveedor no tiene ID Cliker asignado. No se pueden importar pagos."
      );
      return;
    }
    try {
      setLoading(true);
      const data = await fetchFromCliker2("ListadoPagosProveedor", {
        IdProveedor: idProveedorCliker,
      });
      const pagosFormateados = (data.pagosProveedor ?? []).map((p) => ({
        id: p.idMovimiento,
        numero_comprobante: p.idMovimiento,
        medio: p.medio ?? "",
        fecha_acreditacion: p.fecha ?? "",
        monto: Number(p.monto ?? 0),
        observaciones: p.observacion ?? "",
      }));
      setPagos(pagosFormateados);
      setSeleccionados([]);
      setDialogOpen(true);
    } catch (err) {
      console.log(err);
      toast.error("Error al obtener pagos desde Cliker2");
    } finally {
      setLoading(false);
    }
  };

  const handleSeleccionar = (id, checked) => {
    setSeleccionados((prev) =>
      checked ? [...prev, id] : prev.filter((sid) => sid !== id)
    );
  };

  const confirmarImportacion = async () => {
    const elegidos = pagos
      .filter((p) => seleccionados.includes(p.id))
      .map((p) => ({
        ...p,
        medio: p.medio?.toLowerCase() ?? "",
        fecha: new Date(p.fecha_acreditacion),
      }));

    const enriquecidos = await Promise.all(
      elegidos.map(async (pago) => {
        if (pago.medio === "cheque") {
          try {
            const detalle = await fetchDetallePagoCliker2(pago.id);
            return {
              ...pago,
              cheques: detalle.cheques || [],
            };
          } catch (err) {
            toast.error(
              `No se pudo obtener cheques del pago #${pago.id} ${err}`
            );
            return pago;
          }
        }
        return pago;
      })
    );

    onImport(enriquecidos);
    setDialogOpen(false);
    toast.success(`${enriquecidos.length} pago(s) importado(s)`);
  };

  // 👉 FILTRAR primero
  const pagosFiltrados = pagos.filter((p) => {
    const query = search.toLowerCase();
    return (
      p.numero_comprobante?.toString().toLowerCase().includes(query) ||
      p.medio.toLowerCase().includes(query) ||
      p.observaciones.toLowerCase().includes(query)
    );
  });

  // 👉 ORDENAR luego (por id DESC)
  const pagosFiltradosOrdenados = [...pagosFiltrados].sort(
    (a, b) => b.id - a.id
  );

  // 👉 PAGINAR después
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const pagosPaginados = pagosFiltradosOrdenados.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(pagosFiltradosOrdenados.length / rowsPerPage);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={abrirDialog}
        disabled={loading}
        className="font-semibold cursor-pointer flex items-center border-slate-300 text-slate-700 hover:bg-slate-100"
      >
        {loading ? (
          <>
            <span className="animate-spin mr-2 h-4 w-4 border-2 border-t-transparent border-slate-500 rounded-full" />
            Cargando pagos...
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-1" />
            Importar pagos
          </>
        )}
      </Button>

      {/* MODAL */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setSearch("");
        }}
      >
        <DialogContent className="w-full  max-w-5xl  sm:max-w-6xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="font-semibold">Importar Pagos</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground font-semibold">
              Seleccione los pagos que desea importar desde cliker2
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-end">
            <Input
              placeholder="Buscar por id del movimiento, medio de pago o descripción…"
              className="w-full"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* 📋 Tabla */}
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <Table className="w-full table-auto">
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow className="bg-slate-50">
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="font-semibold text-slate-700 w-[120px] min-w-[120px] max-w-[120px] text-start px-2">
                    ID Movimiento
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 w-[90px] min-w-[90px] max-w-[90px] text-start px-2">
                    Medio
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 w-[90px] min-w-[90px] max-w-[90px] text-start px-2">
                    Fecha
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 w-[130px] min-w-[130px] max-w-[130px] text-start px-2">
                    Monto
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 flex-1 min-w-0 px-2 text-start ">
                    Observaciones
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 w-[90px] min-w-[90px] max-w-[90px] text-center px-2">
                    Detalle
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagosPaginados.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="text-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={seleccionados.includes(payment.id)}
                        onChange={(e) =>
                          handleSeleccionar(payment.id, e.target.checked)
                        }
                      />
                    </TableCell>
                    <TableCell className="w-[90px] min-w-[90px] max-w-[90px] text-start text-xs px-2">
                      <div
                        className="truncate"
                        title={payment.numero_comprobante?.toString()}
                      >
                        {payment.numero_comprobante}
                      </div>
                    </TableCell>
                    <TableCell className="w-[90px] min-w-[90px] max-w-[90px] text-start text-xs px-2">
                      <div className="truncate" title={payment.medio}>
                        {payment.medio}
                      </div>
                    </TableCell>
                    <TableCell className="w-[90px] min-w-[90px] max-w-[90px] text-start text-xs px-2">
                      <div
                        className="truncate"
                        title={payment.fecha_acreditacion}
                      >
                        {payment.fecha_acreditacion}
                      </div>
                    </TableCell>
                    <TableCell className="w-[90px]  max-w-[120px] text-start text-xs font-medium px-2">
                      <div
                        className="truncate"
                        title={payment.monto.toLocaleString("es-AR", {
                          minimumFractionDigits: 2,
                        })}
                      >
                        {payment.monto.toLocaleString("es-AR", {
                          minimumFractionDigits: 2,
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="flex-1 min-w-0 text-xs px-2 w-[270px]  ">
                      <div
                        className="w-full overflow-auto max-h-12 p-1 border rounded text-muted-foreground cursor-text select-text"
                        style={{
                          resize: "horizontal",
                          minWidth: "100px",
                        }}
                        tabIndex={0}
                        title={payment.observaciones}
                      >
                        {payment.observaciones}
                      </div>
                    </TableCell>
                    <TableCell className="w-[90px] min-w-[90px] max-w-[90px] text-center text-xs px-2">
                      {payment.medio.toLowerCase() === "cheque" ? (
                        <ChequesModalTable pagoId={payment.id} />
                      ) : (
                        ""
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between px-4 pt-2 border-t text-sm text-muted-foreground">
            <div>
              Mostrando <span className=" font-medium">{indexOfFirst + 1}</span>{" "}
              a{" "}
              <span className=" font-medium">
                {Math.min(indexOfLast, pagosFiltradosOrdenados.length)}
              </span>{" "}
              de{" "}
              <span className=" font-medium">
                {pagosFiltradosOrdenados.length}
              </span>{" "}
              resultados
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="border rounded-lg cursor-pointer"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <ChevronLeft />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="border rounded-lg cursor-pointer"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                <ChevronRight />
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button
              disabled={seleccionados.length === 0}
              onClick={confirmarImportacion}
              className="cursor-pointer font-semibold"
            >
              <Download className="h-4 w-4 mr-1" />
              Importar seleccionados
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
