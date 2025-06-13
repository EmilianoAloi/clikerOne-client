import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ProveedoresPage from "./pages/Proveedores/ProveedoresPage";
import ProveedoresDetailPage from "./pages/Proveedores/ProveedoresDetailPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/proveedores" element={<ProveedoresPage />} />
          <Route path="/proveedores/[id]" element={<ProveedoresDetailPage />} />

          {/* más rutas */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
