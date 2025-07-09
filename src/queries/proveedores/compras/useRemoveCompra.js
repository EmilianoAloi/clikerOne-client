const removeCompraMutation = useRemoveCompra();

const handleDelete = async (id_orden_compra) => {
  try {
    await removeCompraMutation.mutateAsync(id_orden_compra);
    toast.success("Orden de compra eliminada");
  } catch (error) {
    toast.error(error?.message || "Error al eliminar la orden de compra");
  }
};
