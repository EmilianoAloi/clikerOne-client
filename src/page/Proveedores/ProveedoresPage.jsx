import { useEffect } from "react";
import ProveedorsContainer from "@/components/proveedores/ProveedorContainer";

const ProveedoresPage = () => {
  console.log("Renderizando ProveedoresPage!");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Autentica al usuario con el token (puedes almacenar la información del usuario en el estado global)
      authenticateUser(token);
    } else {
      // Si no hay token, redirige al login
      window.location.href = "/login";
    }
  }, []);

  const authenticateUser = (token) => {
    // Aquí puedes hacer algo con el token, como:
    // - Guardarlo en el estado global
    // - Realizar una validación adicional
    // - Redirigir al usuario si es necesario
    console.log("Token de autenticación recibido:", token);
    // Ejemplo: podrías hacer una llamada a tu API para verificar el token
  };

  return <ProveedorsContainer />;
};

export default ProveedoresPage;
