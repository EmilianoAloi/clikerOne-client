// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useProveedores } from "@/utils/useProveedores";

// import ProveedorNDcontainer from "@/components/proveedores/proveedor/ndPage/ProveedorNDcontainer";

// const API_URL = import.meta.env.VITE_API_URL;

// export default function ProveedoresNDPage() {
//   const { id } = useParams();
//   const { proveedores } = useProveedores();
//   const [proveedor, setProveedor] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;

//     // Buscar en el contexto primero
//     const found = proveedores?.find(
//       (p) => String(p.id_proveedor) === String(id)
//     );
//     if (found) {
//       setProveedor(found);
//       setLoading(false);
//       return;
//     }

//     // Si no está, buscarlo por fetch
//     const fetchProveedor = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${API_URL}/api/proveedores/${id}`);
//         if (!res.ok) throw new Error("Proveedor no encontrado");
//         const data = await res.json();
//         setProveedor(data);
//       } catch (err) {
//         console.error("Error al obtener proveedor:", err);
//         setProveedor(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProveedor();
//   }, [id, proveedores]);

//   if (loading) return <p>Cargando proveedor...</p>;
//   if (!id || isNaN(Number(id))) return <p>Error: ID de proveedor no válido</p>;
//   if (!proveedor) return <p>Error: proveedor no encontrado</p>;

//   return <ProveedorNDcontainer proveedor={proveedor} />;
// }
