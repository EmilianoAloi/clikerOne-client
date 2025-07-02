import { useState, useMemo, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceFormSchema } from "@/schemas/invoice-form-schema";
import { mapFormToApi } from "@/mappers/invoice-form-mapper";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import ProveedorInvoiceHeader from "./ProveedorInvoiceHeader";
import ProveedorInvoiceArticle from "./ProveedorInvoiceArticle";
import ProveedorInvoiceExtra from "./ProveedorInvoiceExtra";
import ProveedorInvoiceActions from "./ProveedorInvoiceActions";
import { Separator } from "@/components/ui/separator";
import ProveedorInvoiceImpuestos from "./ProveedorInvoiceImpuestos";
import { useCreateFactura } from "@/queries/proveedores/factura/useCreateFactura";
import { useUpdateFactura } from "@/queries/proveedores/factura/useUpdateFactura";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const inputStyle = "bg-white border border-gray-300 rounded-md shadow-sm ";

export default function ProveedorInvoiceForm({
  modo,
  factura,
  idProveedor,
  proveedor,
}) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const createFacturaMutation = useCreateFactura();
  const updateFacturaMutation = useUpdateFactura();
  const ivaDelProveedor = proveedor?.iva_predeterminado ?? "";

  const methods = useForm({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: factura
      ? {
          ...factura,
          proveedor: factura.id_proveedor?.toString() || "",
          fecha_emision: factura.fecha_emision?.split("T")[0] ?? "",
          fecha_vencimiento: factura.fecha_vencimiento?.split("T")[0] ?? "",
          fecha_contable: factura.fecha_contable?.split("T")[0] ?? "",
          tipo_comprobante: factura.tipo_comprobante?.toLowerCase() || "",
          percepcion_iibb: factura.percepcion_iibb?.toString() ?? "0",
          impuestos: factura.impuestos ?? [],
        }
      : {
          proveedor: idProveedor?.toString() || "",
          numero_factura: "",
          condicion_venta: "",
          tipo_comprobante: "",
          percepcion_iibb: "0",
          items: [
            {
              id_articulo: -2,
              nombre_manual: "",
              cantidad: 1,
              iva: Number(ivaDelProveedor) || 21,
              precio_unitario: 0,
              valor_descuento: 0,
              iva: Number(ivaDelProveedor) || 21,
              color: "",
              unidad_de_medida: "",
            },
          ],
          impuestos: [{ detalle: "", base_imponible: "", alicuota: "" }],
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
        items:
          factura.items?.map((item) => ({
            ...item,
            color: item.color || "",
            unidad_de_medida: item.unidad_de_medida || "",
          })) || [],
        impuestos:
          factura.impuestos?.map((imp) => ({
            detalle: imp.tipo || imp.descripcion || "",
            base_imponible: imp.base_imponible || "",
            alicuota: imp.alicuota || "",
          })) ?? [],
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

  const items = methods.watch("items") || [];
  const impuestos = methods.watch("impuestos") || [];
  const iibbPorcentaje = Number(methods.watch("percepcion_iibb") ?? 0);

  const subtotal = items.reduce((acc, item) => {
    const cantidad = Number(item.cantidad) || 0;
    const precio = Number(item.precio_unitario) || 0;
    const descuento = Number(item.valor_descuento) || 0;
    const neto = cantidad * precio * (1 - descuento / 100);
    return acc + neto;
  }, 0);

  const iva = items.reduce((acc, item) => {
    const cantidad = Number(item.cantidad) || 0;
    const precio = Number(item.precio_unitario) || 0;
    const descuento = Number(item.valor_descuento) || 0;
    const iva = Number(item.iva) || 0;
    const neto = cantidad * precio * (1 - descuento / 100);
    return acc + (neto * iva) / 100;
  }, 0);

  const descuentoTotal = items.reduce((acc, item) => {
    const cantidad = Number(item.cantidad) || 0;
    const precio = Number(item.precio_unitario) || 0;
    const descuento = Number(item.valor_descuento) || 0;
    return acc + (cantidad * precio * descuento) / 100;
  }, 0);

  const iibb = subtotal * (iibbPorcentaje / 100);

  const otrosImpuestos = impuestos.reduce((acc, imp) => {
    const monto =
      imp.monto !== undefined
        ? Number(imp.monto) || 0
        : ((parseFloat(imp.base_imponible) || 0) *
            (parseFloat(imp.alicuota) || 0)) /
          100;
    return acc + monto;
  }, 0);

  const totalFinal = subtotal + iva + iibb + otrosImpuestos;

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
        console.log("DATA AL BACKEND", data);
        await updateFacturaMutation.mutateAsync({
          id: factura.id_factura,
          data,
        });
        toast.success("Factura modificada correctamente");
      } else {
        console.log("DATA AL BACKEND", data);
        await createFacturaMutation.mutateAsync(data);
        toast.success("Factura cargada correctamente");
      }
      navigate(`/proveedores/${idProveedor}`, { state: { refresh: true } });
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

        <Separator className="my-10" />
        <ProveedorInvoiceArticle
          articulos={articulos}
          ivaDefault={ivaDelProveedor}
          inputStyle={inputStyle}
        />
        <Separator className="my-10" />

        <ProveedorInvoiceImpuestos inputStyle={inputStyle} />

        <Separator className="my-10" />

        <ProveedorInvoiceExtra
          inputStyle={inputStyle}
          subtotal={subtotal}
          iva={iva}
          iibb={iibb}
          otrosImpuestos={otrosImpuestos}
          total={totalFinal}
          descuentoTotal={descuentoTotal}
          files={files}
          setFiles={setFiles}
        />
        <ProveedorInvoiceActions modo={modo} isSubmitting={isSubmitting} />
      </form>
    </FormProvider>
  );
}
