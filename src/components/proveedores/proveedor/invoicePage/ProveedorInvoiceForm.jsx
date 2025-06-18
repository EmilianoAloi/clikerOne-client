import { useState, useMemo, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceFormSchema } from "@/schemas/invoice-form-schema";
import { mapFormToApi } from "@/utils/invoice-form-mapper";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import ProveedorInvoiceHeader from "./ProveedorInvoiceHeader";
import ProveedorInvoiceArticle from "./ProveedorInvoiceArticle";
import ProveedorInvoiceExtra from "./ProveedorInvoiceExtra";
import ProveedorInvoiceActions from "./ProveedorInvoiceActions";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useProveedorInvoices } from "@/contexts/ProveedorInvoicesContext";

export default function ProveedorInvoiceForm({
  modo,
  factura,
  idProveedor,
  proveedor,
}) {
  const inputStyle = "bg-white border border-gray-300 rounded-md shadow-sm ";
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

  const methods = useForm({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: factura
      ? {
          ...factura,
          proveedor: factura.id_proveedor?.toString() || "",
          fecha_emision: factura.fecha_emision?.split("T")[0] ?? "",
          fecha_vencimiento: factura.fecha_vencimiento?.split("T")[0] ?? "",
          fecha_contable: factura.fecha_contable?.split("T")[0] ?? "",
          tipo_comprobante: factura.tipo_comprobante?.toLowerCase() ?? "",
          percepcion_iibb: factura.percepcion_iibb?.toString() ?? "0",
        }
      : {
          proveedor: idProveedor?.toString() || "",
          numero_factura: "",
          condicion_venta: "",
          iibb_porcentaje: 0,
          tipo_comprobante: "",
          percepcion_iibb: "0",
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
          fecha_emision: "",
          fecha_vencimiento: "",
          fecha_contable: "",
        },
    mode: "onTouched",
  });

  useEffect(() => {
    if (factura) {
      methods.reset({
        ...factura,
        proveedor: factura.id_proveedor?.toString() || "",
        fecha_emision: factura.fecha_emision?.split("T")[0] ?? "",
        fecha_vencimiento: factura.fecha_vencimiento?.split("T")[0] ?? "",
        fecha_contable: factura.fecha_contable?.split("T")[0] ?? "",
        tipo_comprobante: factura.tipo_comprobante?.toLowerCase() ?? "factura",
        percepcion_iibb: factura.percepcion_iibb?.toString() ?? "0",
      });
    }
  }, [factura]);

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

  const { createSupplierInvoice, updateSupplierInvoice } =
    useProveedorInvoices();

  const onSubmit = async (form) => {
    try {
      setIsSubmitting(true);

      let fileUrl = form.url_factura_comprobante;

      if (files.length > 0 && files[0]?.file) {
        const formData = new FormData();
        formData.append("file", files[0].file);

        const uploadRes = await fetch(`${API_URL}/api/uploads`, {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("Error al subir el archivo");

        const { url } = await uploadRes.json();
        fileUrl = url;
      }

      const data = mapFormToApi(
        { ...form, url_factura_comprobante: fileUrl || null },
        proveedor
      );

      if (modo === "editar" && factura?.id_factura) {
        await updateSupplierInvoice(factura.id_factura, data);
        toast.success("Factura modificada correctamente");
      } else {
        await createSupplierInvoice(data);
        toast.success("Factura cargada correctamente");
      }

      navigate(`/proveedores/${idProveedor}`);
    } catch (err) {
      toast.error(err.message);
      console.error("Error al enviar factura", err);
    } finally {
      setIsSubmitting(false);
    }
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
              id: proveedor?.id_proveedor?.toString() || "",
              nombre: proveedor?.nombre,
            },
          ]}
          inputStyle={inputStyle}
          open={open}
          setOpen={setOpen}
          disabledProveedor={!!idProveedor}
        />
        {/* Otros componentes */}
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
          files={files}
          setFiles={setFiles}
        />
        <ProveedorInvoiceActions modo={modo} isSubmitting={isSubmitting} />
      </form>
    </FormProvider>
  );
}
