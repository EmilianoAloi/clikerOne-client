// Función de autenticación
export const authenticateUser = async (formData) => {
  // Simula una espera de 2 segundos
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const usuario = formData.get("usuario");
  const password = formData.get("password");

  if (
    (usuario === "admin" && password === "123456") ||
    (usuario === "demo" && password === "demo")
  ) {
    // Guardamos un token en el localStorage para simular autenticación
    localStorage.setItem("token", "your_token_here"); // Puedes usar un JWT real aquí
    return { success: true, message: "Inicio de sesión exitoso" };
  }
  return { success: false, message: "Credenciales incorrectas" };
};
