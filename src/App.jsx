import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

// ProveedorES CONTEXTS
import { ProveedorInvoicesProvider } from "@/contexts/ProveedorInvoicesContext";
import { ProveedorPaymentsProvider } from "@/contexts/ProveedorOPContext";
import { ProveedorComprasProvider } from "@/contexts/ProveedorOCContext";
import { ProveedorProvider } from "./contexts/ProveedorContext";
import ProveedoresEditPage from "./page/Proveedores/ProveedoresID/ProveedoresEditPage";
import { ArticlesProvider } from "./contexts/ProveedorArticlesContext";
import ProveedoresIDPage from "./page/Proveedores/ProveedoresID/ProveedoresIDPage";
import ProveedoresPage from "./page/Proveedores/ProveedoresPage";

function App() {
  return (
    <ProveedorProvider>
      <ProveedorInvoicesProvider>
        <ProveedorPaymentsProvider>
          <ProveedorComprasProvider>
            <ArticlesProvider>
              <BrowserRouter>
                <MainLayout>
                  <Routes>
                    <Route
                      path="/"
                      element={<Navigate to="/Proveedores" replace />}
                    />

                    <Route path="/Proveedores" element={<ProveedoresPage />} />
                    <Route
                      path="/Proveedores/:id"
                      element={<ProveedoresIDPage />}
                    />

                    <Route
                      path="/Proveedores/:id/editar"
                      element={<ProveedoresEditPage />}
                    />

                    {/* otras rutas */}
                  </Routes>
                </MainLayout>
              </BrowserRouter>
            </ArticlesProvider>
          </ProveedorComprasProvider>
        </ProveedorPaymentsProvider>
      </ProveedorInvoicesProvider>
    </ProveedorProvider>
  );
}

export default App;
