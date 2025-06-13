import { Suspense, lazy } from "react";

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
