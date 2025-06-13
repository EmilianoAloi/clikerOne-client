import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

// SupplierES CONTEXTS
import { SupplierInvoicesProvider } from "@/contexts/ProveedorInvoicesContext";
import { SupplierPaymentsProvider } from "@/contexts/ProveedorOPContext";
import { SupplierComprasProvider } from "@/contexts/ProveedorOCContext";
import { ProveedorProvider } from "./contexts/ProveedorContext";
import SupplieresEditPage from "./page/Supplieres/SupplieresID/SupplieresEditPage";
import { ArticlesProvider } from "./contexts/ProveedorArticlesContext";
import SupplieresIDPage from "./page/Supplieres/SupplieresID/SupplieresIDPage";
import SupplieresPage from "./page/Supplieres/SupplieresPage";

function App() {
  return (
    <ProveedorProvider>
      <SupplierInvoicesProvider>
        <SupplierPaymentsProvider>
          <SupplierComprasProvider>
            <ArticlesProvider>
              <BrowserRouter>
                <MainLayout>
                  <Routes>
                    <Route
                      path="/"
                      element={<Navigate to="/Supplieres" replace />}
                    />

                    <Route path="/Supplieres" element={<SupplieresPage />} />
                    <Route
                      path="/Supplieres/:id"
                      element={<SupplieresIDPage />}
                    />

                    <Route
                      path="/Supplieres/:id/editar"
                      element={<SupplieresEditPage />}
                    />

                    {/* otras rutas */}
                  </Routes>
                </MainLayout>
              </BrowserRouter>
            </ArticlesProvider>
          </SupplierComprasProvider>
        </SupplierPaymentsProvider>
      </SupplierInvoicesProvider>
    </ProveedorProvider>
  );
}

export default App;
