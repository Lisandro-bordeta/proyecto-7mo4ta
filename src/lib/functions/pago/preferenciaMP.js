/**
 * Crear una preferencia de Mercado Pago a partir del carrito y el email del comprador.
 * @param {Object[]} carrito - Array de objetos del carrito (nombre, cantidad, precio).
 * @param {string} email - Email del comprador.
 * @returns {Promise<{ success: boolean, message?: string, init_point?: string, id?: string }>}
 */
export async function PreferenciaMP(carrito, email) {
  if (!carrito || !Array.isArray(carrito) || carrito.length === 0) {
    return {
      success: false,
      message: "El carrito está vacío o no es válido",
    };
  }

  if (!email || typeof email !== "string") {
    return {
      success: false,
      message: "El email proporcionado no es válido",
    };
  }

  try {
    const response = await fetch("/api/mercadoPago", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ carrito, email }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        message: data.message || "Error al crear la preferencia de pago",
      };
    }

    return {
      success: true,
      init_point: data.init_point,
      id: data.id,
    };
  } catch (err) {
    return {
      success: false,
      message: `Error inesperado: ${err.message}`,
    };
  }
}
