// src/utils/authenticate-user.js
export async function authenticateUser(formData) {
  const payload = {
    nombre: formData.get("usuario"),
    password: formData.get("password"),
  };
  const url = `${import.meta.env.VITE_API_URL}/api/auth/login`;
  console.log("POST", url, payload);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error en login");
  return data; // { token, user }
}
