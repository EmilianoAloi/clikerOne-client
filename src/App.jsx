import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ScrollToTop from "./components/ui/ScrollToTop";

// Contexts
import { ProveedorInvoicesProvider } from "@/contexts/ProveedorInvoicesContext";
import { ProveedorOPProvider } from "@/contexts/ProveedorOPContext";
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
import ProveedorNCPage from "./page/Proveedores/ProveedoresID/ProveedorNCPage";
import ProveedorOPPage from "./page/Proveedores/ProveedoresID/ProveedorOPPage";
import ProveedorOCviewPage from "./page/Proveedores/ProveedoresID/ProveedorOCviewPage";
import ProveedorInvoiceViewPage from "./page/Proveedores/ProveedoresID/ProveedorInvoiceViewPage";
import ProveedorOPViewPage from "./page/Proveedores/ProveedoresID/ProveedorOPViewPage";
import ProveedorNCviewPage from "./page/Proveedores/ProveedoresID/ProveedorNCviewPage";
import ProveedoresNDviewPage from "./page/Proveedores/ProveedoresID/ProveedoresNDviewPage";
import ProveedoresNDPage from "./page/Proveedores/ProveedoresID/ProveedoresNDPage";
import ProveedorOCeditPage from "./page/Proveedores/ProveedoresID/ProveedorOCeditPage";
import ProveedoresInvoiceEditPage from "./page/Proveedores/ProveedoresID/ProveedoresInvoiceEditPage";
import ProveedoresNDeditPage from "./page/Proveedores/ProveedoresID/ProveedoresNDeditPage";
import ProveedoresNCeditPage from "./page/Proveedores/ProveedoresID/ProveedoresNCeditPage";
import ProveedoresOPeditPage from "./page/Proveedores/ProveedoresID/ProveedoresOPeditPage";
import ProveedoresHistorialPrecios from "./page/proveedores/proveedoresID/ProveedoresHistorialPreciosPage";
import ProveedoresHistorialPreciosPage from "./page/proveedores/proveedoresID/ProveedoresHistorialPreciosPage";

function RedirectToProveedor() {
  const { id } = useParams();
  return <Navigate to={`/proveedores/${id}`} replace />;
}

function App() {
  return (
    <ProveedorProvider>
      <ProveedorInvoicesProvider>
        <ProveedorOPProvider>
          <ProveedorComprasProvider>
            <ProveedorArticlesProvider>
              <BrowserRouter>
                <MainLayout>
                  <ScrollToTop />
                  <Routes>
                    {/* Redirecciones */}

                    <Route
                      path="/proveedores/:id/ordencompra"
                      element={<RedirectToProveedor />}
                    />
                    <Route
                      path="/proveedores/:id/facturacion"
                      element={<RedirectToProveedor />}
                    />
                    <Route
                      path="/proveedores/:id/pagos"
                      element={<RedirectToProveedor />}
                    />
                    <Route
                      path="/proveedores/:id/notacredito"
                      element={<RedirectToProveedor />}
                    />
                    <Route
                      path="/proveedores/:id/notadebito"
                      element={<RedirectToProveedor />}
                    />

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

                    {/* Articulos */}
                    {/* 
                    <Route
                      path="proveedores/articulos"
                      element={<ArticulosPage />}
                    /> */}

                    <Route
                      path="proveedores/:id/historial-precios"
                      element={<ProveedoresHistorialPreciosPage />}
                    />

                    {/* OC */}
                    <Route
                      path="/proveedores/:id/ordencompra/nueva-oc"
                      element={<ProveedorOcPage />}
                    />

                    <Route
                      path="/proveedores/:id/ordencompra/oc-edit/:idOC"
                      element={<ProveedorOCeditPage />}
                    />

                    <Route
                      path="/proveedores/:idProveedor/ordencompra/:idOC"
                      element={<ProveedorOCviewPage />}
                    />

                    {/* Facturas */}
                    <Route
                      path="/proveedores/:id/facturacion/nueva-factura"
                      element={<ProveedorInvoicePage />}
                    />
                    <Route
                      path="/proveedores/:id/facturacion/:idFactura/editar-factura"
                      element={<ProveedoresInvoiceEditPage />}
                    />

                    <Route
                      path="/proveedores/:id/facturacion/:idFactura"
                      element={<ProveedorInvoiceViewPage />}
                    />

                    {/* Orden de Pago */}
                    <Route
                      path="/proveedores/:id/pagos/nuevopago"
                      element={<ProveedorOPPage />}
                    />

                    <Route
                      path="/proveedores/:id/pagos/:idOP/editar-pago"
                      element={<ProveedoresOPeditPage />}
                    />

                    <Route
                      path="/proveedores/:idProveedor/pagos/:idOP"
                      element={<ProveedorOPViewPage />}
                    />

                    {/* Nota de Crédito */}

                    <Route
                      path="/proveedores/:id/notacredito/nuevanotacredito"
                      element={<ProveedorNCPage />}
                    />

                    <Route
                      path="/proveedores/:id/notacredito/editar-nc/:idNC"
                      element={<ProveedoresNCeditPage />}
                    />

                    <Route
                      path="/proveedores/:id/notacredito/:idNC"
                      element={<ProveedorNCviewPage />}
                    />

                    {/* Nota de Débito */}
                    <Route
                      path="/proveedores/:id/notadebito/nuevanotadebito"
                      element={<ProveedoresNDPage />}
                    />

                    <Route
                      path="/proveedores/:id/notadebito/editar-nd/:idND"
                      element={<ProveedoresNDeditPage />}
                    />

                    <Route
                      path="/proveedores/:id/notadebito/:idND"
                      element={<ProveedoresNDviewPage />}
                    />
                  </Routes>
                </MainLayout>
              </BrowserRouter>
            </ProveedorArticlesProvider>
          </ProveedorComprasProvider>
        </ProveedorOPProvider>
      </ProveedorInvoicesProvider>
    </ProveedorProvider>
  );
}

export default App;
