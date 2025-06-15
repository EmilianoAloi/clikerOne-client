import React from "react";
import ProveedorAddTitle from "./ProveedorAddTitle";
import ProveedorAddForm from "./ProveedorAddForm";

const ProveedorAddContainer = () => {
  return (
    <>
      <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-10 ">
        <ProveedorAddTitle />
        <ProveedorAddForm />
      </div>
    </>
  );
};

export default ProveedorAddContainer;
