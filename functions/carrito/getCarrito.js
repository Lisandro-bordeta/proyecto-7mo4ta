/**
 * Consigue el carrito del localStorage.
 * @returns {Promise<{ success: boolean, message: string, data: any[] | null }>}
 */
function getCarritoLocalStorage() {
  const key = 'carrito';

  try {
    const raw = localStorage.getItem(key);

    if (!raw) return {
            success: false,
            message: `No hay carrito en el local storage`,
            data: [],
        };

    const carrito = JSON.parse(raw);

    // Validación básica: debe ser un array
    if (!Array.isArray(carrito)) return {
            success: false,
            message: `Carrito invalido en el local storage: ${raw}`,
            data: [],
        };

    return {
        success: true,
        message: `Carrito valido:`,
        data: carrito,
    };
  } catch (err) {
    return {
        success: false,
        message: `Error inesperado: ${err.message}`,
        data: [],
    };
  }
}
