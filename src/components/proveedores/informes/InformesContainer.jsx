import InformesTitle from "./InformesTitle";
import InformesTabs from "./InformesTabs";

export default function InformesContainer() {
  // 3. datos de tabs
  const facturacionMensual = [
    { mes: "Ene", monto: 180000, ordenes: 45 },
    { mes: "Feb", monto: 220000, ordenes: 52 },
    { mes: "Mar", monto: 195000, ordenes: 48 },
    { mes: "Apr", monto: 234224, ordenes: 58 },
    { mes: "May", monto: 210000, ordenes: 51 },
    { mes: "Jun", monto: 245000, ordenes: 62 },
  ];

  const comprasPorProveedor = [
    { proveedor: "Princz", monto: 45000, ordenes: 12 },
    { proveedor: "Plaswag", monto: 38000, ordenes: 8 },
    { proveedor: "Torrear", monto: 32000, ordenes: 15 },
    { proveedor: "Papelera Lamas", monto: 28000, ordenes: 9 },
    { proveedor: "AIO", monto: 25000, ordenes: 7 },
  ];

  const estadosOrdenes = [
    { estado: "Pendiente", cantidad: 23, color: "#f59e0b" },
    { estado: "Ejecutada", cantidad: 45, color: "#10b981" },
    { estado: "Cancelada", cantidad: 8, color: "#ef4444" },
    { estado: "En Proceso", cantidad: 13, color: "#3b82f6" },
  ];

  const tendenciaPrecios = [
    { fecha: "01/11", aumentos: 5, reducciones: 2 },
    { fecha: "08/11", aumentos: 8, reducciones: 1 },
    { fecha: "15/11", aumentos: 12, reducciones: 3 },
    { fecha: "22/11", aumentos: 6, reducciones: 4 },
    { fecha: "29/11", aumentos: 9, reducciones: 2 },
  ];
  const topArticulos = [
    {
      codigo: "111",
      nombre: "Producto Final A",
      categoria: "Producto final",
      cambios: 8,
      ultimoPrecio: 55.0,
    },
    {
      codigo: "123",
      nombre: "Materia Prima B",
      categoria: "Materia prima",
      cambios: 6,
      ultimoPrecio: 2.0,
    },
    {
      codigo: "456",
      nombre: "Producto Final C",
      categoria: "Producto final",
      cambios: 4,
      ultimoPrecio: 75.0,
    },
  ];

  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-6 ">
      {/* Header Principal */}
      <InformesTitle />

      {/* Tabs Navigation */}
      <InformesTabs
        facturacionMensual={facturacionMensual}
        estadosOrdenes={estadosOrdenes}
        comprasPorProveedor={comprasPorProveedor}
        tendenciaPrecios={tendenciaPrecios}
        topArticulos={topArticulos}
      />
      {/* <div className="px-6 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger
              value="ordenes-compra"
              className="flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Órdenes de Compra
            </TabsTrigger>

            <TabsTrigger value="facturas" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Informes de Facturas
            </TabsTrigger>
            <TabsTrigger
              value="ordenes-pago"
              className="flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Órdenes de Pago
            </TabsTrigger>
          </TabsList>

          <TabsContent value="facturas" className="mt-0">
            <InformesFacturas />
          </TabsContent>

          <TabsContent value="ordenes-compra" className="mt-0">
            <InformesOC />
          </TabsContent>

          <TabsContent value="ordenes-pago" className="mt-0">
            <InformesOP />
          </TabsContent>
        </Tabs>
      </div> */}
    </div>
  );
}
