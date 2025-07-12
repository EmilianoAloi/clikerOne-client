import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useProveedores } from "@/queries/proveedores/useProveedores";

const breadcrumbNames = {
  home: "Inicio",
  inventory: "Inventario",
  sales: "Ventas",
  customers: "Clientes",
  proveedores: "Proveedores",
  reports: "Reportes",
  settings: "Ajustes",
  facturacion: "Facturación",
  pagos: "Ordenes de Pago",
  nuevopago: "Nueva OP",
  agregar: "Agregar Nuevo Proveedor",
  editar: "Modificar Proveedor",
  nuevafactura: "Nueva Factura",
  notacredito: "Nota de Crédito",
  notadebito: "Nota de Débito",
  nuevanotadebito: "Nueva",
  nuevanotacredito: "Nueva ",
  ordencompra: "Ordenes de Compra",
  "nueva-oc": "Nueva OC",
  "oc-edit": "Editar",
  "editar-nd": "Editar",
  "editar-nc": "Editar",
  "nueva-factura": "Nueva Factura",
  "editar-factura": "Editar",
  "historial-precios-global": "Historial Global de Precios",
  "historial-precios": "Historial de Precios",
  estadisticas: "Estadísticas",
};

export default function DynamicBreadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const { data: proveedores = [] } = useProveedores();

  let accumulatedPath = "";

  return (
    <Breadcrumb className="print:hidden">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/proveedores">Inicio</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          accumulatedPath = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;

          // Etiqueta amigable por default
          let label = breadcrumbNames[segment] || segment;

          // Mostrar nombre del proveedor si estamos en /proveedores/:id
          if (
            pathSegments[0] === "proveedores" &&
            index === 1 &&
            proveedores.length > 0
          ) {
            const foundProveedores = proveedores.find(
              (s) => s.id_proveedor.toString() === segment
            );
            if (foundProveedores) label = foundProveedores.nombre;
          }

          return (
            <React.Fragment key={accumulatedPath}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={accumulatedPath}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
