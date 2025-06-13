import { useParams } from "react-router-dom";

function ProveedoresDetailPage() {
  const { id } = useParams();

  // Usá el id como quieras
  // ...

  return <div>Detalle proveedor {id}</div>;
}

export default ProveedoresDetailPage;
