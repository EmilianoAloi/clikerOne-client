export async function authenticateUser(formData) {
  const payload = {
    nombre: formData.get("usuario"),
    password: formData.get("password"),
  };
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await res.json();
}
