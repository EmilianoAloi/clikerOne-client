# ClikerOne Client

**Versión:** v0.3  
Frontend de **ClikerOne**, una plataforma de gestión integrada para proveedores, facturas y reportes.

---

## 🚀 Descripción

ClikerOne te permite administrar y centralizar toda la información de tus proveedores y operaciones, con foco en simplicidad y eficiencia.  
Este cliente está desarrollado en **React + Vite** y se comunica con el backend de ClikerOne (Node.js + Express + Sequelize + MySQL).

---

## 📦 Funcionalidades principales

- **Gestión de Proveedores**  
  Administra toda la información de tus proveedores de manera simple.
- **Registro Integral**  
  Llevá el registro y gestión centralizada de facturas, pagos y operaciones.
- **Informes y Exportación**  
  Generá reportes completos de órdenes de compra, facturación y pagos. Exportá a Excel en un clic.

---

## 📊 Métricas en uso

- **170+** proveedores registrados
- **800+** operaciones mensuales
- **100%** saldos actualizados en tiempo real

---

## 🛠️ Stack Tecnológico

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [TanStack React Query](https://tanstack.com/query/latest)
- Integración con backend **ClikerOne Server** (Node.js + Express + Sequelize + MySQL)

---

## ⚙️ Configuración

### Variables de entorno

Este proyecto usa variables definidas en archivos `.env`.  
Ejemplo (`.env.example`):

```env
VITE_BASE=/Cliker-one/
VITE_BASENAME=/Cliker-one
VITE_API_URL=http://localhost:8080
```

### Scripts disponibles

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build de producción
npm run build

# Build para Vercel (usa .env.vercel)
npm run build:vercel

# Build para FTP (usa .env.ftp)
npm run build:ftp

# Previsualización del build
npm run preview
```

---

## 📂 Estructura básica

```
clikerOne-client/
 ├── public/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   ├── hooks/
 │   ├── context/
 │   └── ...
 ├── .env.example
 ├── package.json
 ├── vite.config.js
 └── README.md
```

---

## 🧑‍💻 Autor

Desarrollado por **Emiliano Aloi**  
Proyecto **ClikerOne ERP**.

---
