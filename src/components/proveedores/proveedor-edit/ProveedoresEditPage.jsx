import { Suspense, lazy } from "react";

// Usamos React.lazy para cargar el componente dinámicamente
const SupplierEditForm = lazy(() => import("../components/SupplierEditForm"));

const ProveedorEditContainer = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SupplierEditForm />
      </Suspense>
    </div>
  );
};

export default ProveedorEditContainer;
