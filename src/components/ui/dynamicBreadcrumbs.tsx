"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useSuppliers } from "@/components/contexts/suppliers-context";
import Link from "next/link";

const breadcrumbNames: { [key: string]: string } = {
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
  "editar-factura": "Editar",
};

function DynamicBreadcrumbsContent() {
  const pathname = usePathname();
  const pathSegments = pathname ? pathname.split("/").filter(Boolean) : [];
  const { suppliers } = useSuppliers();

  const supplierName =
    pathSegments[0] === "proveedores" && pathSegments[1]
      ? suppliers.find((s) => s.id_proveedor.toString() === pathSegments[1])
          ?.nombre
      : null;

  return (
    <Breadcrumb className="print:hidden">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/proveedores">Inicio</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          let label = breadcrumbNames[segment] || segment;

          // Mostrar nombre del proveedor
          if (
            supplierName &&
            pathSegments[0] === "proveedores" &&
            index === 1
          ) {
            label = supplierName;
          }

          // Mostrar "Factura Nº :id" en lugar de solo el ID
          if (
            pathSegments.length >= 3 &&
            pathSegments[0] === "proveedores" &&
            pathSegments[1] === "facturacion" &&
            index === 2 &&
            !isNaN(Number(segment))
          ) {
            label = `Factura ID:${segment}`;
          }

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
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

export function DynamicBreadcrumbs() {
  return <DynamicBreadcrumbsContent />;
}

export default DynamicBreadcrumbs;
