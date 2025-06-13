// import React from "react";
// import { useLocation, Link } from "react-router-dom";
// import {
//   Breadcrumb,
//   BreadcrumbList,
//   BreadcrumbItem,
//   BreadcrumbSeparator,
//   BreadcrumbLink,
//   BreadcrumbPage,
// } from "@/components/ui/breadcrumb";
// import { useSuppliers } from "@/contexts/suppliers-context"; // ajusta el import según tu estructura

// const breadcrumbNames = {
//   home: "Inicio",
//   inventory: "Inventario",
//   sales: "Ventas",
//   customers: "Clientes",
//   proveedores: "Proveedores",
//   reports: "Reportes",
//   settings: "Ajustes",
//   facturacion: "Facturación",
//   pagos: "Ordenes de Pago",
//   nuevopago: "Nueva OP",
//   agregar: "Agregar Nuevo Proveedor",
//   editar: "Modificar Proveedor",
//   nuevafactura: "Nueva Factura",
//   notacredito: "Nota de Crédito",
//   notadebito: "Nota de Débito",
//   nuevanotadebito: "Nueva",
//   nuevanotacredito: "Nueva ",
//   ordencompra: "Ordenes de Compra",
//   "nueva-oc": "Nueva OC",
//   "oc-edit": "Editar",
//   "editar-nd": "Editar",
//   "editar-nc": "Editar",
//   "editar-factura": "Editar",
// };

// function DynamicBreadcrumbsContent() {
//   const location = useLocation();
//   const pathname = location.pathname;
//   const pathSegments = pathname.split("/").filter(Boolean);
//   const { suppliers } = useSuppliers();

//   const supplierName =
//     pathSegments[0] === "proveedores" && pathSegments[1]
//       ? suppliers.find((s) => s.id_proveedor.toString() === pathSegments[1])
//           ?.nombre
//       : null;

//   return (
//     <Breadcrumb className="print:hidden">
//       <BreadcrumbList>
//         <BreadcrumbItem>
//           <BreadcrumbLink asChild>
//             <Link to="/proveedores">Inicio</Link>
//           </BreadcrumbLink>
//         </BreadcrumbItem>

//         {pathSegments.map((segment, index) => {
//           const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
//           const isLast = index === pathSegments.length - 1;
//           let label = breadcrumbNames[segment] || segment;

//           // Mostrar nombre del proveedor
//           if (
//             supplierName &&
//             pathSegments[0] === "proveedores" &&
//             index === 1
//           ) {
//             label = supplierName;
//           }

//           // Mostrar "Factura Nº :id" en lugar de solo el ID
//           if (
//             pathSegments.length >= 3 &&
//             pathSegments[0] === "proveedores" &&
//             pathSegments[1] === "facturacion" &&
//             index === 2 &&
//             !isNaN(Number(segment))
//           ) {
//             label = `Factura ID:${segment}`;
//           }

//           return (
//             <React.Fragment key={href}>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 {isLast ? (
//                   <BreadcrumbPage>{label}</BreadcrumbPage>
//                 ) : (
//                   <BreadcrumbLink asChild>
//                     <Link to={href}>{label}</Link>
//                   </BreadcrumbLink>
//                 )}
//               </BreadcrumbItem>
//             </React.Fragment>
//           );
//         })}
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// }

// export function DynamicBreadcrumbs() {
//   return <DynamicBreadcrumbsContent />;
// }

// export default DynamicBreadcrumbs;

import React from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Asegurate que estos imports existen

export default function DynamicBreadcrumbs() {
  return (
    <Breadcrumb className="print:hidden">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/proveedores">Inicio</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/proveedores/[id]">Proveedores</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
