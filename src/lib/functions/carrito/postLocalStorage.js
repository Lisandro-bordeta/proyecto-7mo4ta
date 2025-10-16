/**
 * Crea y/o productos al carrito.
 * @param {Object} producto - Debe tener id del producto y cantidad
 * @returns {Promise<{ success: boolean, message: string, data: any[] | null  }>}
 */
function agregarAlCarritoLocalStorage(producto) {
  const key = 'carrito';

  if (!producto || !producto.id_producto || !producto.cantidad) return {
            success: false,
            message: `Producto inválido: ${JSON.stringify(producto)}`,
            data: null,
        };

  try {
    const raw = localStorage.getItem(key);
    let carrito = raw ? JSON.parse(raw) : [];

    if (!Array.isArray(carrito)) {
      carrito = [];
    }

    const index = carrito.findIndex(item => item.id_producto === producto.id_producto);

    if (index !== -1) carrito[index].cantidad += producto.cantidad;
    else carrito.push(producto);
    

    localStorage.setItem(key, JSON.stringify(carrito));

  } catch (err) {
    return {
            success: false,
            message: `Error inesperado: ${err.message}`,
            data: null,
        };
  }
}
