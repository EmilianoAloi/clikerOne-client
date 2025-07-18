import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ocFormSchema } from "@/schemas/oc-form-schema";

import { Form } from "@/components/ui/form";
import { v4 as uuidv4 } from "uuid";
import { toFormData } from "@/mappers/oc-form-mapper";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import OCproveedorInfo from "./OCproveedorInfo";
import OCarticle from "./OCarticle";
import OCextras from "./OCextras";
import OCbuttons from "./OCbuttons";

import { useCreateCompra } from "@/queries/proveedores/compras/useCreateCompra";
import { useUpdateCompra } from "@/queries/proveedores/compras/useUpdateCompra";

export default function OCForm({ proveedor, compra, modo }) {
  const isEdit = modo === "editar";
  const navigate = useNavigate();
  const ivaPredeterminado = proveedor?.iva_predeterminado?.toString();

  const createCompraMutation = useCreateCompra();
  const updateCompraMutation = useUpdateCompra();

  const form = useForm({
    resolver: zodResolver(ocFormSchema),
    mode: "onBlur",
    defaultValues:
      isEdit && compra
        ? toFormData(compra)
        : {
            id_proveedor: proveedor?.id_proveedor ?? 0,
            fecha_emision: new Date(),
            fecha_entrega: new Date(),
            fecha_vencimiento: undefined,
            fecha_contable: new Date(),
            condicion_pago: "",
            lugar_entrega: "",
            monto_total: 0,
            estado_compra: "pendiente",
            observaciones: "",
            url_orden_compra_comprobante: "",
            estado_logico: 1,
            items: [
              {
                id_articulo: "",
                descripcion: "",
                cantidad: 1,
                unidad_medida: "",
                precio_unitario: 0,
                iva: ivaPredeterminado,
                color: "",
                valor_descuento: 0,
                subtotal: 0,
                observaciones: "",
                estado_logico: 1,
              },
            ],
          },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  function handleAddItem() {
    append({
      id_item: uuidv4(),
      id_articulo: "",
      descripcion: "",
      cantidad: 1,
      unidad_medida: "",
      precio_unitario: 0,
      iva: ivaPredeterminado,
      color: "",
      valor_descuento: 0,
      subtotal: 0,
      observaciones: "",
      estado_logico: 1,
    });
  }

  function handleRemoveItem(index) {
    remove(index);
  }

  async function onSubmit(data) {
    const items = data.items.map((item) => ({
      id_articulo: item.id_articulo === "" ? 0 : Number(item.id_articulo),
      descripcion: item.descripcion,
      cantidad: Number(item.cantidad),
      unidad_medida: item.unidad_medida,
      precio_unitario: Number(item.precio_unitario),
      iva: item.iva,
      color: item.color ?? "",
      valor_descuento: Number(item.valor_descuento),
      subtotal: Number(item.subtotal),
      observaciones: item.observaciones ?? "",
      estado_logico: item.estado_logico ?? 1,
    }));

    const dataToSend = {
      id_proveedor: data.id_proveedor,
      fecha_emision: data.fecha_emision
        ? data.fecha_emision.toISOString().slice(0, 10)
        : null,
      fecha_entrega: data.fecha_entrega
        ? data.fecha_entrega.toISOString().slice(0, 10)
        : null,
      fecha_vencimiento: data.fecha_vencimiento
        ? data.fecha_vencimiento.toISOString().slice(0, 10)
        : null,
      fecha_contable: data.fecha_contable
        ? data.fecha_contable.toISOString().slice(0, 10)
        : null,
      condicion_pago: data.condicion_pago,
      lugar_entrega: data.lugar_entrega,
      monto_total: Number(data.monto_total),
      estado_compra: data.estado_compra,
      observaciones: data.observaciones ?? "",
      url_orden_compra_comprobante: data.url_orden_compra_comprobante ?? "",
      estado_logico: data.estado_logico ?? 1,
      items,
    };

    try {
      let json;
      if (isEdit) {
        json = await updateCompraMutation.mutateAsync({
          id: compra.id_orden_compra,
          data: dataToSend,
        });
        toast.success("Orden modificada correctamente");
      } else {
        // eslint-disable-next-line no-unused-vars
        json = await createCompraMutation.mutateAsync(dataToSend);
        toast.success("Orden creada correctamente");
      }

      navigate(`/proveedores/${data.id_proveedor}`, {
        state: { refresh: true },
      });
    } catch (error) {
      toast.error(
        isEdit
          ? "No se pudo modificar la orden de compra"
          : "No se pudo crear la orden de compra",
        { description: error?.message || "Error desconocido" }
      );
    }
  }

  return (
    <div className="space-y-6 pb-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("ERRORES EN FORM:", errors);
            toast.error("Hay errores en el formulario");
          })}
        >
          <OCproveedorInfo form={form} proveedor={proveedor} />
          <div className="px-6">
            <OCarticle
              form={form}
              proveedor={proveedor}
              items={fields}
              handleAddItem={handleAddItem}
              handleRemoveItem={handleRemoveItem}
            />
          </div>
          <OCextras
            items={form.watch("items").map((item) => ({
              cantidad: item.cantidad,
              precio_unitario: item.precio_unitario,
              valor_descuento: item.valor_descuento,
              iva: typeof item.iva === "string" ? item.iva : String(item.iva),
            }))}
            fechaEntrega={
              form.watch("fecha_entrega") instanceof Date &&
              !isNaN(form.watch("fecha_entrega").getTime())
                ? form.watch("fecha_entrega").toLocaleDateString("es-AR")
                : ""
            }
            condicionPago={form.watch("condicion_pago")}
            lugarEntrega={form.watch("lugar_entrega")}
            defaultFileUrl={compra?.url_orden_compra_comprobante ?? ""}
          />

          <OCbuttons
            isSubmitting={form.formState.isSubmitting}
            modo={modo}
            idProveedor={proveedor.id_proveedor ?? 0}
          />
        </form>
      </Form>
    </div>
  );
}
