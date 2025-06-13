// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ProveedoresPage from "./pages/Proveedores/ProveedoresPage";
import ProveedoresDetailPage from "./pages/Proveedores/ProveedoresDetailPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/proveedores" replace />} />
          <Route path="/proveedores" element={<ProveedoresPage />} />
          <Route path="/proveedores/:id" element={<ProveedoresDetailPage />} />

          {/* otras rutas */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
