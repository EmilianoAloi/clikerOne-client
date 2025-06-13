"use client";

import { Skeleton } from "@/components/ui/skeleton";
import ProveedoresEditTitle from "./ProveedorEditTitle";
import { useProveedores } from "@/contexts/ProveedorContext";

const ProveedorEditContainer = () => {
  const { getProveedoresByID } = useProveedores();
  const [Proveedor, setProveedores] =
    (useState < ProveedoresWithArticulos) | (null > null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProveedores = async () => {
      const data = await getProveedoresByID(id);
      setProveedores(data);
      setLoading(false);
    };

    fetchProveedores();
  }, [id, getProveedoresByID]);

  if (loading || !Proveedor) {
    return (
      <div className="p-6">
        <Skeleton className="h-6 w-1/3 mb-4" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-10">
      <ProveedoresEditTitle />
      <ProveedoresEditFormm
        proveedor={Proveedor}
        articulos={Proveedor.articulos}
      />
    </div>
  );
};

export default ProveedorEditContainer;
