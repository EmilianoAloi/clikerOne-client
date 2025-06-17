import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

// Contexts
import { ProveedorInvoicesProvider } from "@/contexts/ProveedorInvoicesContext";
import { ProveedorPaymentsProvider } from "@/contexts/ProveedorOPContext";
import { ProveedorComprasProvider } from "@/contexts/ProveedorOCContext";
import { ProveedorProvider } from "./contexts/ProveedorContext";
import { ProveedorArticlesProvider } from "./contexts/ProveedorArticlesContext";

// Pages
import ProveedoresEditPage from "./page/Proveedores/ProveedoresID/ProveedoresEditPage";
import ProveedoresIDPage from "./page/Proveedores/ProveedoresID/ProveedoresIDPage";
import ProveedoresPage from "./page/Proveedores/ProveedoresPage";
import ProveedorAddPage from "./page/Proveedores/ProveedorAddPage";
import ProveedorOcPage from "./page/Proveedores/ProveedoresID/ProveedorOcPage";
import ProveedorInvoicePage from "./page/Proveedores/ProveedoresID/ProveedorInvoicePage";

// Estas son páginas que deberías crear/importar, si no existen aún
// import ProveedorFacturaPage from "./page/Proveedores/ProveedoresID/ProveedorFacturaPage";
// import ProveedorNuevaFacturaPage from "./page/Proveedores/ProveedoresID/ProveedorNuevaFacturaPage";
// import ProveedorEditarFacturaPage from "./page/Proveedores/ProveedoresID/ProveedorEditarFacturaPage";

// import ProveedorPagoPage from "./page/Proveedores/ProveedoresID/ProveedorPagoPage";
// import ProveedorNuevoPagoPage from "./page/Proveedores/ProveedoresID/ProveedorNuevoPagoPage";
// import ProveedorEditarPagoPage from "./page/Proveedores/ProveedoresID/ProveedorEditarPagoPage";

// import ProveedorNotaCreditoPage from "./page/Proveedores/ProveedoresID/ProveedorNotaCreditoPage";
// import ProveedorNuevaNotaCreditoPage from "./page/Proveedores/ProveedoresID/ProveedorNuevaNotaCreditoPage";
// import ProveedorEditarNotaCreditoPage from "./page/Proveedores/ProveedoresID/ProveedorEditarNotaCreditoPage";

// import ProveedorNotaDebitoPage from "./page/Proveedores/ProveedoresID/ProveedorNotaDebitoPage";
// import ProveedorNuevaNotaDebitoPage from "./page/Proveedores/ProveedoresID/ProveedorNuevaNotaDebitoPage";
// import ProveedorEditarNotaDebitoPage from "./page/Proveedores/ProveedoresID/ProveedorEditarNotaDebitoPage";

// import ProveedorNuevaOCPage from "./page/Proveedores/ProveedoresID/ProveedorNuevaOCPage";
// ...agregá cualquier otra página que tengas

function App() {
  return (
    <ProveedorProvider>
      <ProveedorInvoicesProvider>
        <ProveedorPaymentsProvider>
          <ProveedorComprasProvider>
            <ProveedorArticlesProvider>
              <BrowserRouter>
                <MainLayout>
                  <Routes>
                    {/* Proveedores */}
                    <Route
                      path="/"
                      element={<Navigate to="/proveedores" replace />}
                    />
                    <Route path="/proveedores" element={<ProveedoresPage />} />
                    <Route
                      path="/proveedores/:id"
                      element={<ProveedoresIDPage />}
                    />
                    <Route
                      path="/proveedores/agregar"
                      element={<ProveedorAddPage />}
                    />
                    <Route
                      path="/proveedores/:id/editar"
                      element={<ProveedoresEditPage />}
                    />

                    {/* Orden de compra */}
                    <Route
                      path="/proveedores/:id/ordencompra/nueva-oc"
                      element={<ProveedorOcPage />}
                    />

                    {/* Facturas */}
                    <Route
                      path="/proveedores/:id/facturacion/nueva-factura"
                      element={<ProveedorInvoicePage />}
                    />
                    {/* <Route
                      path="/proveedores/:id/facturacion/:facturaId"
                      element={<ProveedorFacturaPage />}
                    /> */}

                    {/* <Route
                      path="/proveedores/:id/facturacion/:facturaId/editar-factura"
                      element={<ProveedorEditarFacturaPage />}
                    /> */}

                    {/* Orden de Pago */}
                    {/* <Route
                      path="/proveedores/:id/pagos/:pagoId"
                      element={<ProveedorPagoPage />}
                    />
                    <Route
                      path="/proveedores/:id/pagos/nuevopago"
                      element={<ProveedorNuevoPagoPage />}
                    />
                    <Route
                      path="/proveedores/:id/pagos/:pagoId/editar-pago"
                      element={<ProveedorEditarPagoPage />}
                    /> */}

                    {/* Nota de Crédito */}
                    {/* <Route
                      path="/proveedores/:id/notacredito/:ncId"
                      element={<ProveedorNotaCreditoPage />}
                    />
                    <Route
                      path="/proveedores/:id/notacredito/nuevanotacredito"
                      element={<ProveedorNuevaNotaCreditoPage />}
                    />
                    <Route
                      path="/proveedores/:id/notacredito/editar-nc/:ncId"
                      element={<ProveedorEditarNotaCreditoPage />}
                    /> */}

                    {/* Nota de Débito */}
                    {/* <Route
                      path="/proveedores/:id/notadebito/:ndId"
                      element={<ProveedorNotaDebitoPage />}
                    />
                    <Route
                      path="/proveedores/:id/notadebito/nuevanotadebito"
                      element={<ProveedorNuevaNotaDebitoPage />}
                    />
                    <Route
                      path="/proveedores/:id/notadebito/editar-nd/:ndId"
                      element={<ProveedorEditarNotaDebitoPage />}
                    /> */}

                    {/* Otras rutas que necesites agregar */}
                  </Routes>
                </MainLayout>
              </BrowserRouter>
            </ProveedorArticlesProvider>
          </ProveedorComprasProvider>
        </ProveedorPaymentsProvider>
      </ProveedorInvoicesProvider>
    </ProveedorProvider>
  );
}

export default App;
