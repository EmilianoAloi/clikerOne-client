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
// import { ProveedorInvoicesProvider } from "@/contexts/ProveedorInvoicesContext";
// import { ProveedorOPProvider } from "@/contexts/ProveedorOPContext";
// import { ProveedorComprasProvider } from "@/contexts/ProveedorOCContext";

// Pages
import LoginPage from "./page/login/LoginPage";
import ProveedoresPage from "./page/Proveedores/ProveedoresPage";
import ProveedoresIDPage from "./page/Proveedores/ProveedoresID/ProveedoresIDPage";
import ProveedoresEditPage from "./page/Proveedores/ProveedoresID/ProveedoresEditPage";
import ProveedorAddPage from "./page/Proveedores/ProveedorAddPage";
import ProveedorOcPage from "./page/Proveedores/ProveedoresID/ProveedorOcPage";
import ProveedorInvoicePage from "./page/Proveedores/ProveedoresID/ProveedorInvoicePage";
import ProveedorInvoiceViewPage from "./page/Proveedores/ProveedoresID/ProveedorInvoiceViewPage";
import ProveedoresInvoiceEditPage from "./page/Proveedores/ProveedoresID/ProveedoresInvoiceEditPage";
import ProveedorOPPage from "./page/Proveedores/ProveedoresID/ProveedorOPPage";
import ProveedoresOPeditPage from "./page/Proveedores/ProveedoresID/ProveedoresOPeditPage";
import ProveedorOPViewPage from "./page/Proveedores/ProveedoresID/ProveedorOPViewPage";
// import ProveedorNCPage from "./page/Proveedores/ProveedoresID/ProveedorNCPage";
import ProveedorOCviewPage from "./page/Proveedores/ProveedoresID/ProveedorOCviewPage";
import ProveedorOCeditPage from "./page/Proveedores/ProveedoresID/ProveedorOCeditPage";
// import ProveedorNCviewPage from "./page/Proveedores/ProveedoresID/ProveedorNCviewPage";
// import ProveedoresNDviewPage from "./page/Proveedores/ProveedoresID/ProveedoresNDviewPage";
// import ProveedoresNDPage from "./page/Proveedores/ProveedoresID/ProveedoresNDPage";
// import ProveedoresNDeditPage from "./page/Proveedores/ProveedoresID/ProveedoresNDeditPage";
// import ProveedoresNCeditPage from "./page/Proveedores/ProveedoresID/ProveedoresNCeditPage";
import PrivateRoute from "./components/login/PrivateRoute";

import { useAuth } from "@/contexts/AuthContext";
import ProveedoresHistorialPreciosPage from "./page/Proveedores/Historialprecios/ProveedoresHistorialPreciosPage";
import HistorialPreciosGlobalContainer from "./page/Proveedores/Historialprecios/HistorialPreciosGlobalContainer";

// Función para redirigir
function RedirectToProveedor() {
  const { id } = useParams();
  return <Navigate to={`/proveedores/${id}`} replace />;
}

function App() {
  const { user, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;
  const isAuthenticated = Boolean(user);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Auth: Login y redirección */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/proveedores" replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/proveedores" replace />
            ) : (
              <LoginPage />
            )
          }
        />

        {/* Layout y rutas protegidas */}
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          {/* Proveedores */}
          <Route path="/proveedores" element={<ProveedoresPage />} />
          <Route path="/proveedores/:id" element={<ProveedoresIDPage />} />
          <Route path="/proveedores/agregar" element={<ProveedorAddPage />} />
          <Route
            path="/proveedores/:id/editar"
            element={<ProveedoresEditPage />}
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
          {/* <Route
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
          /> */}

          {/* Nota de Débito */}
          {/* <Route
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
          /> */}

          {/* Historial de Precios */}
          <Route
            path="/proveedores/:id/historial-precios"
            element={<ProveedoresHistorialPreciosPage />}
          />

          <Route
            path="/proveedores/historial-precios-global"
            element={<HistorialPreciosGlobalContainer />}
          />

          {/* Redirecciones específicas */}
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
        </Route>

        {/* Catch-all para rutas no definidas */}
        {/* <Route
                    path="*"
                    element={<Navigate to="/proveedores" replace />}
                  /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
