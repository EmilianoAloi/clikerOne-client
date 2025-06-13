import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

// PROVEEDORES CONTEXTS
import { SupplierInvoicesProvider } from "@/contexts/SuppliersInvoicesContext";
import { SupplierPaymentsProvider } from "@/contexts/SuppliersOPContext";
import { SupplierComprasProvider } from "@/contexts/SuppliersOCContext";
import { SuppliersProvider } from "./contexts/SuppliersContext";
import ProveedoresEditPage from "./page/proveedores/proveedoresID/ProveedoresEditPage";
import { ArticlesProvider } from "./contexts/SuppliersArticlesContext";
import ProveedoresIDPage from "./page/proveedores/proveedoresID/ProveedoresIDPage";
import ProveedoresPage from "./page/proveedores/ProveedoresPage";

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
                      element={<ProveedoresIDPage />}
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
