import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import { fetchDetallePagoCliker2 } from "@/lib/cliker2";

const ChequesModalTable = ({ pagoId, cheques: chequesProp }) => {
  const [open, setOpen] = useState(false);
  const [cheques, setCheques] = useState(null);
  const [loading, setLoading] = useState(false);

  // PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleOpen = async () => {
    setCheques(null);
    setLoading(false);
    setCurrentPage(1); // Reinicia la paginación al abrir
    setOpen(true);

    if (chequesProp && chequesProp.length > 0) {
      setCheques(chequesProp);
      return;
    }
    if (pagoId) {
      setLoading(true);
      try {
        const detalle = await fetchDetallePagoCliker2(pagoId);
        setCheques(detalle.cheques ?? []);
      } finally {
        setLoading(false);
      }
    }
  };

  // PAGINADO
  const chequesFiltrados = cheques || [];
  const totalCheques = chequesFiltrados.length;
  const totalPages = Math.ceil(totalCheques / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const chequesPaginados = chequesFiltrados.slice(indexOfFirst, indexOfLast);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) {
          setCheques(null);
          setLoading(false);
          setCurrentPage(1);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={handleOpen}
          className="flex gap-1 items-center !py-0 !text-xs cursor-pointer !h-6"
        >
          <Paperclip className="!h-3 !w-3" />
          Ver cheques
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-5xl sm:max-w-2xl max-h-[70vh] p-0 ">
        <DialogHeader className="py-4 px-6">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">
                Cheques del pago
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Detalle de los cheques asociados a este pago
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {loading ? (
            <div className="py-10 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-t-transparent border-slate-500 rounded-full" />
                Cargando cheques...
              </div>
            </div>
          ) : !cheques || cheques.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              No se encontraron cheques para este pago.
            </div>
          ) : (
            <>
              <div className="overflow-y-auto overflow-x-hidden max-h-[400px] px-6 w-full">
                <Table className="w-full table-auto border !rounded-lg overflow-hidden shadow-sm">
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow className="bg-slate-50">
                      <TableHead className="font-semibold text-slate-700 w-[120px] min-w-[120px] max-w-[120px] text-start px-2">
                        Número
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 flex-1 min-w-0 px-2 text-start">
                        Banco
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 w-[140px] min-w-[140px] max-w-[140px] text-start px-2">
                        Valor
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 w-[120px] min-w-[120px] max-w-[120px] text-start px-2">
                        Fecha de Pago
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chequesPaginados.map((cheque) => (
                      <TableRow
                        key={cheque.idCheque}
                        className="hover:bg-slate-50"
                      >
                        <TableCell className="w-[120px] min-w-[120px] max-w-[120px] text-start text-xs px-2 font-medium">
                          <div className="truncate" title={cheque.numero}>
                            {cheque.numero}
                          </div>
                        </TableCell>
                        <TableCell className="flex-1 min-w-0 text-xs px-2">
                          <div className="truncate" title={cheque.banco}>
                            {cheque.banco}
                          </div>
                        </TableCell>
                        <TableCell className="w-[140px] min-w-[140px] max-w-[140px] text-start text-xs font-medium px-2">
                          <div
                            className="truncate"
                            title={`$${Number(cheque.valor).toLocaleString(
                              "es-AR",
                              { minimumFractionDigits: 2 }
                            )}`}
                          >
                            $
                            {Number(cheque.valor).toLocaleString("es-AR", {
                              minimumFractionDigits: 2,
                            })}
                          </div>
                        </TableCell>
                        <TableCell className="w-[120px] min-w-[120px] max-w-[120px] text-start text-xs px-2">
                          <div className="truncate" title={cheque.fechaPago}>
                            {cheque.fechaPago}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* PAGINACIÓN */}
              <div className="flex items-center justify-between px-6 pt-2 border-t text-sm text-muted-foreground">
                <div>
                  Mostrando{" "}
                  <span className="font-sm">
                    {totalCheques === 0 ? 0 : indexOfFirst + 1}
                  </span>{" "}
                  a{" "}
                  <span className="font-sm">
                    {Math.min(indexOfLast, totalCheques)}
                  </span>{" "}
                  de <span className="font-sm">{totalCheques}</span> cheque
                  {totalCheques !== 1 ? "s" : ""}
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="border rounded-lg cursor-pointer"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    {"<"}
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="border rounded-lg cursor-pointer"
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  >
                    {">"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
        {cheques && cheques.length > 0 && (
          <div className="flex items-center justify-between p-6 pt-4 border-t">
            <div className="text-sm ">Total cheques: {cheques.length}</div>
            <div className="text-sm font-medium">
              Total: $
              {cheques
                .reduce((acc, cheque) => acc + Number(cheque.valor), 0)
                .toLocaleString("es-AR", { minimumFractionDigits: 2 })}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChequesModalTable;
