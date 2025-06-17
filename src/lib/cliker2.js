// fetch pagos proveedor cliker2

// PagoImportado:
// {
//   id: number,
//   numero_comprobante: string,
//   medio: string,
//   fecha_acreditacion: string,
//   monto: number,
//   observaciones: string,
// }

// ChequeImportado:
// {
//   idCheque: number,
//   fechaPago: string,
//   numero: string,
//   valor: number,
//   banco: string,
// }

// Cliker2PagosResponse:
// {
//   pagosProveedor: [
//     {
//       idMovimiento: number,
//       medio: string,
//       fecha: string,
//       monto: string | number,
//       observacion: string,
//     }
//   ]
// }

// PagoDetalleCliker2:
// {
//   idMovimiento: number,
//   fecha: string,
//   medio: string,
//   monto: number,
//   cheques?: ChequeImportado[],
//   observacion: string,
// }

export async function fetchFromCliker2(consulta, params) {
  const query = new URLSearchParams({ consulta, ...params }).toString();

  try {
    const BASE_URL = import.meta.env.VITE_API_URL || "";
    const res = await fetch(
      `${BASE_URL}/api/suppliers/external/cliker2?${query}`
    );

    if (!res.ok) {
      throw new Error(`Error en consulta Cliker2: ${res.status}`);
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.error("❌ Error en fetchFromCliker2:", error);
    throw error;
  }
}

export async function fetchDetallePagoCliker2(idPago) {
  const BASE_URL = import.meta.env.VITE_API_URL || "";
  const res = await fetch(
    `${BASE_URL}/api/suppliers/external/pagos/detalle/${idPago}`
  );

  if (!res.ok) {
    throw new Error(`Error trayendo detalle de pago: ${res.status}`);
  }

  const json = await res.json();

  // Puede venir como { detallePagosProveedor: [ ... ] }
  if (json.detallePagosProveedor && Array.isArray(json.detallePagosProveedor)) {
    return json.detallePagosProveedor[0];
  }
  return json;
}
