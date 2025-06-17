import { useState, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceFormSchema } from "@/schemas/invoice-form-schema";
import { Separator } from "@/components/ui/separator";

import ProveedorInvoiceHeader from "./ProveedorInvoiceHeader";
import ProveedorInvoiceArticle from "./ProveedorInvoiceArticle";
import ProveedorInvoiceExtra from "./ProveedorInvoiceExtra";
import ProveedorInvoiceActions from "./ProveedorInvoiceActions";

export default function ProveedorInvoiceForm({
  modo,
  factura,
  idProveedor,
  proveedor,
}) {
  const inputStyle = "bg-white border border-gray-300 rounded-md shadow-sm ";
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // RHF setup
  const methods = useForm({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      proveedor: idProveedor?.toString() || "",
      numero_factura: "",
      condicion_venta: "",
      iibb_porcentaje: 0,
      items: [
        {
          id_articulo: -2,
          nombre_manual: "",
          cantidad: 1,
          precio_unitario: 0,
          valor_descuento: 0,
          iva: "",
        },
      ],
      url_factura_comprobante: null,
      observaciones: "",
      ...(factura || {}),
    },
    mode: "onTouched",
  });

  // Usá directamente el proveedor recibido
  const articulos = useMemo(
    () =>
      proveedor?.articulos
        ?.map((a) => ({
          ...a,
          id_articulo: typeof a.id_articulo === "number" ? a.id_articulo : 0,
        }))
        .filter((a) => a.id_articulo > 0) ?? [],
    [proveedor]
  );

  const ivaDelProveedor = proveedor?.iva_predeterminado ?? "";

  const items = methods.watch("items") || [];
  const iibbPorcentaje = methods.watch("iibb_porcentaje") ?? 0;

  // Utilidades de cálculo:
  function calcSubtotal(items) {
    return items.reduce((acc, item) => {
      const cantidad = Number(item.cantidad) || 0;
      const precio = Number(item.precio_unitario) || 0;
      const descuento = Number(item.valor_descuento) || 0;
      const neto =
        cantidad * precio * (1 - (descuento > 0 ? descuento : 0) / 100);
      return acc + neto;
    }, 0);
  }

  function calcIVA(items) {
    return items.reduce((acc, item) => {
      const cantidad = Number(item.cantidad) || 0;
      const precio = Number(item.precio_unitario) || 0;
      const descuento = Number(item.valor_descuento) || 0;
      const iva = Number(item.iva) || 0;
      const neto =
        cantidad * precio * (1 - (descuento > 0 ? descuento : 0) / 100);
      return acc + (neto * iva) / 100;
    }, 0);
  }

  function calcIIBB(subtotal, iibbPorcentaje) {
    return subtotal * (Number(iibbPorcentaje) / 100);
  }

  function calcDescuentoTotal(items) {
    return items.reduce((acc, item) => {
      const cantidad = Number(item.cantidad) || 0;
      const precio = Number(item.precio_unitario) || 0;
      const descuento = Number(item.valor_descuento) || 0;
      return acc + (cantidad * precio * (descuento > 0 ? descuento : 0)) / 100;
    }, 0);
  }

  const subtotal = calcSubtotal(items);
  const iva = calcIVA(items);
  const iibb = calcIIBB(subtotal, iibbPorcentaje);
  const descuentoTotal = calcDescuentoTotal(items);
  const total = subtotal + iva + iibb;

  // Submit
  const onSubmit = (data) => {
    setIsSubmitting(true);
    console.log("Datos validados:", data);
    setTimeout(() => setIsSubmitting(false), 500); // Simula una request
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-6 mx-8"
      >
        <ProveedorInvoiceHeader
          proveedores={[
            {
              id: proveedor.id_proveedor.toString(),
              nombre:
                proveedor.nombre || proveedor.razon_social || "Sin nombre",
            },
          ]}
          inputStyle={inputStyle}
          open={open}
          setOpen={setOpen}
          disabledProveedor={!!idProveedor}
        />
        <Separator className="my-10" />

        <ProveedorInvoiceArticle
          articulos={articulos}
          ivaDefault={ivaDelProveedor}
          inputStyle={inputStyle}
        />

        <Separator className="my-10" />

        <ProveedorInvoiceExtra
          inputStyle={inputStyle}
          subtotal={subtotal}
          iva={iva}
          iibb={iibb}
          total={total}
          descuentoTotal={descuentoTotal}
        />
        <ProveedorInvoiceActions modo={modo} isSubmitting={isSubmitting} />
      </form>
    </FormProvider>
  );
}
