import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ProveedoresPage from "./pages/Proveedores/ProveedoresPage";
import ProveedoresDetailPage from "./pages/Proveedores/ProveedoresDetailPage";

// PROVEEDORES CONTEXTS
import { SupplierInvoicesProvider } from "@/contexts/SuppliersInvoicesContext";
import { SupplierPaymentsProvider } from "@/contexts/SuppliersOPContext";
import { SupplierComprasProvider } from "@/contexts/SuppliersOCContext";
import { SuppliersProvider } from "./contexts/SuppliersContext";
import ProveedoresEditPage from "./pages/Proveedores/ProveedoresEditPage";
import { ArticlesProvider } from "./contexts/SuppliersArticlesContext";

function App() {
  return (
    <SuppliersProvider>
      <SupplierInvoicesProvider>
        <SupplierPaymentsProvider>
          <SupplierComprasProvider>
            <ArticlesProvider>
              <BrowserRouter>
                <MainLayout>
                  <Routes>
                    <Route
                      path="/"
                      element={<Navigate to="/proveedores" replace />}
                    />

                    <Route path="/proveedores" element={<ProveedoresPage />} />
                    <Route
                      path="/proveedores/:id"
                      element={<ProveedoresDetailPage />}
                    />

                    <Route
                      path="/proveedores/:id/editar"
                      element={<ProveedoresEditPage />}
                    />

                    {/* otras rutas */}
                  </Routes>
                </MainLayout>
              </BrowserRouter>
            </ArticlesProvider>
          </SupplierComprasProvider>
        </SupplierPaymentsProvider>
      </SupplierInvoicesProvider>
    </SuppliersProvider>
  );
}

export default App;
