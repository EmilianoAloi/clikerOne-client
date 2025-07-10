// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import NDviewContainer from "@/components/proveedores/proveedor/ndPage/ndview/NDviewContainer";

// export default function ProveedoresNDviewPage() {
//   const { id, idND } = useParams();
//   const [notaDebito, setNotaDebito] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const API_URL = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     if (!idND) return;
//     setLoading(true);
//     setError(null);

//     fetch(`${API_URL}/api/proveedores/facturas/${idND}`, { cache: "no-store" })
//       .then((res) => {
//         if (!res.ok) throw new Error("Nota de Débito no encontrada");
//         return res.json();
//       })
//       .then((data) => setNotaDebito(data))
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, [idND, API_URL]);

//   if (loading) return <div>Cargando nota de débito...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;
//   if (!notaDebito) return <div>No se encontró la nota de débito.</div>;

//   return <NDviewContainer notaDebito={notaDebito} proveedorId={Number(id)} />;
// }
