// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";
// import MainLayout from "./layout/MainLayout";
// import ScrollToTop from "./components/ui/ScrollToTop";

// // Contexts
// import { ProveedorInvoicesProvider } from "@/contexts/ProveedorInvoicesContext";
// import { ProveedorOPProvider } from "@/contexts/ProveedorOPContext";
// import { ProveedorComprasProvider } from "@/contexts/ProveedorOCContext";
// import { ProveedorProvider } from "./contexts/ProveedorContext";
// import { ProveedorArticlesProvider } from "./contexts/ProveedorArticlesContext";

// // Pages
// import ProveedoresEditPage from "./page/Proveedores/ProveedoresID/ProveedoresEditPage";
// import ProveedoresIDPage from "./page/Proveedores/ProveedoresID/ProveedoresIDPage";
// import ProveedoresPage from "./page/Proveedores/ProveedoresPage";
// import ProveedorAddPage from "./page/Proveedores/ProveedorAddPage";
// import ProveedorOcPage from "./page/Proveedores/ProveedoresID/ProveedorOcPage";
// import ProveedorInvoicePage from "./page/Proveedores/ProveedoresID/ProveedorInvoicePage";
// import ProveedorNCPage from "./page/Proveedores/ProveedoresID/ProveedorNCPage";
// import ProveedorOPPage from "./page/Proveedores/ProveedoresID/ProveedorOPPage";
// import ProveedorOCviewPage from "./page/Proveedores/ProveedoresID/ProveedorOCviewPage";
// import ProveedorInvoiceViewPage from "./page/Proveedores/ProveedoresID/ProveedorInvoiceViewPage";
// import ProveedorOPViewPage from "./page/Proveedores/ProveedoresID/ProveedorOPViewPage";
// import ProveedorNCviewPage from "./page/Proveedores/ProveedoresID/ProveedorNCviewPage";
// import ProveedoresNDviewPage from "./page/Proveedores/ProveedoresID/ProveedoresNDviewPage";
// import ProveedoresNDPage from "./page/Proveedores/ProveedoresID/ProveedoresNDPage";
// import ProveedorOCeditPage from "./page/Proveedores/ProveedoresID/ProveedorOCeditPage";
// import ProveedoresInvoiceEditPage from "./page/Proveedores/ProveedoresID/ProveedoresInvoiceEditPage";
// import ProveedoresNDeditPage from "./page/Proveedores/ProveedoresID/ProveedoresNDeditPage";
// import ProveedoresNCeditPage from "./page/Proveedores/ProveedoresID/ProveedoresNCeditPage";
// import ProveedoresOPeditPage from "./page/Proveedores/ProveedoresID/ProveedoresOPeditPage";
// import ProveedoresHistorialPreciosPage from "./page/Proveedores/ProveedoresID/ProveedoresHistorialPreciosPage";
// import LoginPage from "./page/login/LoginPage";

// function RedirectToProveedor() {
//   const { id } = useParams();
//   return <Navigate to={`/proveedores/${id}`} replace />;
// }

// function App() {
//   const navigate = useNavigate();
//   const isAuthenticated = /* lógica para verificar si el usuario está autenticado */;
//   return (
//     <ProveedorProvider>
//       <ProveedorInvoicesProvider>
//         <ProveedorOPProvider>
//           <ProveedorComprasProvider>
//             <ProveedorArticlesProvider>
//               <BrowserRouter>

// {/* Renderiza el MainLayout solo si no estamos en la página de login */}
//                 {location.pathname !== "/login" && <MainLayout />}
//                 <ScrollToTop />

//                   {/* Si no está autenticado, mostrar el login */}
//                   <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />} />
//                   <Route path="/login" element={isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />} />

//                   {/* Rutas protegidas */}
//                   <Route path="/home" element={<MainLayout />} />

//                 {/* Renderiza el MainLayout si no esta en  página  login */}
//                 {/* {location.pathname !== "/login" && <MainLayout />} */}
//                 <ScrollToTop />

//                   {/* Login */}
// {/*
//                   <Route path="/" element={<LoginPage />} />
//                   <Route path="/login" element={<LoginPage />} /> */}

//                   {/* Main layout y rutas */}
//                   {/* <Route path="/*" element={<MainLayout />} /> */}
//                   {/* Redirecciones */}

//                   <Route
//                     path="/proveedores/:id/ordencompra"
//                     element={<RedirectToProveedor />}
//                   />
//                   <Route
//                     path="/proveedores/:id/facturacion"
//                     element={<RedirectToProveedor />}
//                   />
//                   <Route
//                     path="/proveedores/:id/pagos"
//                     element={<RedirectToProveedor />}
//                   />
//                   <Route
//                     path="/proveedores/:id/notacredito"
//                     element={<RedirectToProveedor />}
//                   />
//                   <Route
//                     path="/proveedores/:id/notadebito"
//                     element={<RedirectToProveedor />}
//                   />

//                   {/* Proveedores */}
//                   <Route path="/proveedores" element={<ProveedoresPage />} />
//                   <Route
//                     path="/proveedores/:id"
//                     element={<ProveedoresIDPage />}
//                   />
//                   <Route
//                     path="/proveedores/agregar"
//                     element={<ProveedorAddPage />}
//                   />
//                   <Route
//                     path="/proveedores/:id/editar"
//                     element={<ProveedoresEditPage />}
//                   />

//                   {/* OC */}
//                   <Route
//                     path="/proveedores/:id/ordencompra/nueva-oc"
//                     element={<ProveedorOcPage />}
//                   />
//                   <Route
//                     path="/proveedores/:id/ordencompra/oc-edit/:idOC"
//                     element={<ProveedorOCeditPage />}
//                   />
//                   <Route
//                     path="/proveedores/:idProveedor/ordencompra/:idOC"
//                     element={<ProveedorOCviewPage />}
//                   />

//                   {/* Facturas */}
//                   <Route
//                     path="/proveedores/:id/facturacion/nueva-factura"
//                     element={<ProveedorInvoicePage />}
//                   />
//                   <Route
//                     path="/proveedores/:id/facturacion/:idFactura/editar-factura"
//                     element={<ProveedoresInvoiceEditPage />}
//                   />
//                   <Route
//                     path="/proveedores/:id/facturacion/:idFactura"
//                     element={<ProveedorInvoiceViewPage />}
//                   />

//                   {/* Orden de Pago */}
//                   <Route
//                     path="/proveedores/:id/pagos/nuevopago"
//                     element={<ProveedorOPPage />}
//                   />
//                   <Route
//                     path="/proveedores/:id/pagos/:idOP/editar-pago"
//                     element={<ProveedoresOPeditPage />}
//                   />
//                   <Route
//                     path="/proveedores/:idProveedor/pagos/:idOP"
//                     element={<ProveedorOPViewPage />}
//                   />

//                   {/* Nota de Crédito */}
//                   <Route
//                     path="/proveedores/:id/notacredito/nuevanotacredito"
//                     element={<ProveedorNCPage />}
//                   />
//                   <Route
//                     path="/proveedores/:id/notacredito/editar-nc/:idNC"
//                     element={<ProveedoresNCeditPage />}
//                   />
//                   <Route
//                     path="/proveedores/:id/notacredito/:idNC"
//                     element={<ProveedorNCviewPage />}
//                   />

//                   {/* Nota de Débito */}
//                   <Route
//                     path="/proveedores/:id/notadebito/nuevanotadebito"
//                     element={<ProveedoresNDPage />}
//                   />
//                   <Route
//                     path="/proveedores/:id/notadebito/editar-nd/:idND"
//                     element={<ProveedoresNDeditPage />}
//                   />
//                   <Route
//                     path="/proveedores/:id/notadebito/:idND"
//                     element={<ProveedoresNDviewPage />}
//                   />
//                 </Routes>
//               </BrowserRouter>
//             </ProveedorArticlesProvider>
//           </ProveedorComprasProvider>
//         </ProveedorOPProvider>
//       </ProveedorInvoicesProvider>
//     </ProveedorProvider>
//   );
// }

// export default App;

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import MainLayout from "./layout/MainLayout";
// import ScrollToTop from "./components/ui/ScrollToTop";

// // Contexts
// import { ProveedorInvoicesProvider } from "@/contexts/ProveedorInvoicesContext";
// import { ProveedorOPProvider } from "@/contexts/ProveedorOPContext";
// import { ProveedorComprasProvider } from "@/contexts/ProveedorOCContext";
// import { ProveedorProvider } from "./contexts/ProveedorContext";
// import { ProveedorArticlesProvider } from "./contexts/ProveedorArticlesContext";

// // Pages
// import LoginPage from "./page/login/LoginPage";
// import ProveedoresPage from "./page/proveedores/ProveedoresPage";

// // Redirige a /proveedores si está autenticado
// function App() {
//   const isAuthenticated = localStorage.getItem("token") !== null;

//   return (
//     <ProveedorProvider>
//       <ProveedorInvoicesProvider>
//         <ProveedorOPProvider>
//           <ProveedorComprasProvider>
//             <ProveedorArticlesProvider>
//               <BrowserRouter>
//                 <ScrollToTop />
//                 <Routes>
//                   {/* Ruta principal */}
//                   <Route
//                     path="/"
//                     element={
//                       isAuthenticated ? (
//                         <Navigate to="/proveedores" replace />
//                       ) : (
//                         <LoginPage />
//                       )
//                     }
//                   />
//                   {/* Ruta de login */}
//                   <Route
//                     path="/login"
//                     element={
//                       isAuthenticated ? (
//                         <Navigate to="/proveedores" replace />
//                       ) : (
//                         <LoginPage />
//                       )
//                     }
//                   />

//                   {/* Rutas protegidas */}
//                   <Route element={<MainLayout />}>
//                     <Route path="/proveedores" element={<ProveedoresPage />} />
//                     {/* Otras rutas protegidas que requieran MainLayout */}
//                   </Route>
//                 </Routes>
//               </BrowserRouter>
//             </ProveedorArticlesProvider>
//           </ProveedorComprasProvider>
//         </ProveedorOPProvider>
//       </ProveedorInvoicesProvider>
//     </ProveedorProvider>
//   );
// }

// export default App;

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
import LoginPage from "./page/login/LoginPage";
import ProveedoresPage from "./page/Proveedores/ProveedoresPage";
import ProveedoresIDPage from "./page/Proveedores/ProveedoresID/ProveedoresIDPage";
import ProveedoresEditPage from "./page/Proveedores/ProveedoresID/ProveedoresEditPage";
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
import ProveedoresHistorialPreciosPage from "./page/Proveedores/ProveedoresID/ProveedoresHistorialPreciosPage";

// Función para redirigir
function RedirectToProveedor() {
  const { id } = useParams();
  return <Navigate to={`/proveedores/${id}`} replace />;
}

function App() {
  const isAuthenticated = localStorage.getItem("token") !== null;

  return (
    <ProveedorProvider>
      <ProveedorInvoicesProvider>
        <ProveedorOPProvider>
          <ProveedorComprasProvider>
            <ProveedorArticlesProvider>
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
                  <Route element={<MainLayout />}>
                    {/* Proveedores */}
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

                    {/* Historial de Precios */}
                    <Route
                      path="/proveedores/:id/historial-precios"
                      element={<ProveedoresHistorialPreciosPage />}
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
                </Routes>
              </BrowserRouter>
            </ProveedorArticlesProvider>
          </ProveedorComprasProvider>
        </ProveedorOPProvider>
      </ProveedorInvoicesProvider>
    </ProveedorProvider>
  );
}

export default App;
