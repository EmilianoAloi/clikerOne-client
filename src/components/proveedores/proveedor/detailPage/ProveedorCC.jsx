"use client";

import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { Link, useNavigate } from "react-router-dom";
import { SaldoActual } from "./ProveedorSaldoActual";
import { columnsCC } from "./ColumnsCC";

export default function ProveedoresCC({
  currentProveedores,
  paymentItems,
  invoices,
  payments,
}) {
  const [movements, setMovements] = useState([]);
  const [finalBalance, setFinalBalance] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentProveedores?.id_proveedor) return;

    // Helper para adjuntos
    const getFileNameFromUrl = (url) => {
      if (!url) return "";
      return decodeURIComponent(url.split("/").pop() || "");
    };

    // Facturas/NC/ND
    const facturas = (invoices || []).map((f) => {
      const tipoComprobante = f.tipo_comprobante?.toLowerCase() || "";

      const isNotaCredito = tipoComprobante.includes("nota de credito");
      const isNotaDebito = tipoComprobante.includes("nota de debito");

      let type = "Factura";
      let idPrefix = "factura-";
      let amount = Number(f.monto_total) || 0;

      if (isNotaCredito) {
        type = "Nota de Crédito";
        idPrefix = "nc-";
        amount = -Math.abs(amount); // Resta saldo
      } else if (isNotaDebito) {
        type = "Nota de Débito";
        idPrefix = "nd-";
        amount = Math.abs(amount); // Suma saldo
      }

      return {
        id: `${idPrefix}${f.id_factura}`,
        type,
        date: f.fecha_emision || f.fecha_creado || "",
        comprobante: f.numero_factura
          ? `#${f.numero_factura}`
          : `#${f.id_factura}`,
        razon_social:
          f.razon_social_proveedor || currentProveedores.nombre || "-",
        estado: f.estado_saldo || f.estado || "pendiente",
        amount,
        balance: 0,
        observaciones: f.observaciones || "",
        adjuntos: f.url_factura_comprobante
          ? [
              {
                url: f.url_factura_comprobante,
                nombre: getFileNameFromUrl(f.url_factura_comprobante),
              },
            ]
          : [],
      };
    });

    // Pagos
    const pagos = (payments || [])
      .filter(
        (p) =>
          p.estado_logico === 1 &&
          p.id_proveedor === currentProveedores.id_proveedor
      )
      .map((p) => {
        const montoAplicado = paymentItems
          .filter((item) => item.id_pago === p.id_pago)
          .reduce((sum, item) => sum + Number(item.monto_aplicado || 0), 0);

        const excedente = Number(p.monto_excedente || 0);

        // Usar p.monto si no hay ítems ni excedente (ej. pago a cuenta sin facturas)
        const totalPagado =
          montoAplicado + excedente > 0
            ? montoAplicado + excedente
            : Number(p.monto);

        return {
          id: `pago-${p.id_pago}`,
          type: "Orden de pago",
          date: p.fecha_pago || p.fecha_creada || "",
          comprobante: p.numero_pago ? `#${p.numero_pago}` : `#${p.id_pago}`,
          razon_social: currentProveedores.nombre || "-",
          estado: p.estado_pago || p.estado || "pendiente",
          amount: -Math.abs(totalPagado), // Pagos siempre restan
          balance: 0,
          observaciones: p.observaciones || "",
          excedente,
          adjuntos: p.adjuntos || [],
        };
      });

    // Mezcla y ordena
    const todosLosMovimientos = [...facturas, ...pagos].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Saldo histórico
    let saldo = 0;
    const movimientosConSaldo = todosLosMovimientos.map((m) => {
      saldo += m.amount;
      return { ...m, balance: saldo };
    });

    // Ordenar de más nuevo a más viejo
    const movimientosOrdenados = movimientosConSaldo.reverse();
    setMovements(movimientosOrdenados);

    setFinalBalance(movimientosOrdenados[0]?.balance || 0);
  }, [currentProveedores, invoices, payments, paymentItems]);

  const filteredMovements = movements.filter(
    (m) =>
      m.comprobante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.razon_social.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.observaciones.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="rounded-lg border shadow-sm mx-auto px-6 py-4 w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">Cuenta Corriente</h2>
          </div>
          <div className="flex items-center space-x-3 mt-1">
            <span className="text-lg text-foreground">Movimientos</span>
            <div className="h-5 w-px bg-border" />
            <span className="text-sm text-muted-foreground">Historial</span>
          </div>
        </div>
        <SaldoActual saldo={finalBalance} />
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-end bg-muted/30 rounded-lg p-3">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar movimiento..."
            className="pl-8 h-9 rounded-md bg-white border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Link
            className="flex !items-center"
            href={`/proveedores/${currentProveedores.id_proveedor}/ordencompra/nueva-oc`}
          >
            <Button
              variant="default"
              className="text-sm font-semibold rounded-sm cursor-pointer px-4 py-2"
            >
              <Plus className="h-4 w-4 " />
              Orden de Compra
            </Button>
          </Link>
          <Link
            className="flex !items-center"
            href={`/proveedores/${currentProveedores.id_proveedor}/facturacion/nueva-factura`}
          >
            <Button
              variant="outline"
              className="text-sm font-semibold rounded-sm cursor-pointer px-4 py-2"
            >
              <Plus className="h-4 w-4 " />
              Cargar Factura
            </Button>
          </Link>
          <Link
            href={`/proveedores/${currentProveedores.id_proveedor}/pagos/nuevopago`}
          >
            <Button
              variant="outline"
              className="text-sm font-semibold rounded-sm cursor-pointer px-4 py-2"
            >
              <Plus className="h-4 w-4 " />
              Orden de Pago
            </Button>
          </Link>
          <Link
            href={`/proveedores/${currentProveedores.id_proveedor}/notacredito/nuevanotacredito`}
          >
            <Button
              variant="outline"
              className="text-sm font-semibold rounded-sm cursor-pointer px-4 py-2"
            >
              <Plus className="h-4 w-4 " />
              Nota de Crédito
            </Button>
          </Link>
          <Link
            href={`/proveedores/${currentProveedores.id_proveedor}/notadebito/nuevanotadebito`}
          >
            <Button
              variant="outline"
              className="text-sm font-semibold rounded-sm cursor-pointer px-4 py-2"
            >
              <Plus className="h-4 w-4 " />
              Nota de Débito
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabla */}
      <DataTable
        idField="id"
        columns={columnsCC(currentProveedores)}
        data={filteredMovements}
        enableRowClick={true}
        onRowClick={(row) => {
          if (row.type === "Factura") {
            const id = row.id.replace("factura-", "");
            navigate(
              `/proveedores/${currentProveedores.id_proveedor}/facturacion/${id}`
            );
          } else if (row.type === "Nota de Crédito") {
            const id = row.id.replace("nc-", "");
            navigate(
              `/proveedores/${currentProveedores.id_proveedor}/notacredito/${id}`
            );
          } else if (row.type === "Orden de pago") {
            const id = row.id.replace("pago-", "");
            navigate(
              `/proveedores/${currentProveedores.id_proveedor}/pagos/${id}`
            );
          } else if (row.type === "Nota de Débito") {
            const id = row.id.replace("nd-", "");
            navigate(
              `/proveedores/${currentProveedores.id_proveedor}/notadebito/${id}`
            );
          }
        }}
      />
    </section>
  );
}
