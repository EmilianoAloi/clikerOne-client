import React from "react";
import ArticulosTitle from "./ArticulosTitle";
import ArticulosCards from "./ArticulosCards";

const ArticulosContainer = () => {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 my-2 !mb-30 p-6 space-y-6">
      <ArticulosTitle />
      <ArticulosCards />
    </div>
  );
};

export default ArticulosContainer;
