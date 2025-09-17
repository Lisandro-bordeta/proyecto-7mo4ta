import { supabase } from '../../supabaseClient.js';

export async function postCarrito(datos, carrito = [], user_id) {
  if (!carrito.length) {
    return {
      success: false,
      message: 'El carrito está vacío.',
      data: null,
    };
  }

  let pedidoId;
  const detallePedido = [];

  const pedido = {
    ...datos,
    id_usuario: user_id,
    fecha: new Date().toISOString(),
    estado_envio: 'Pendiente',
    estado_pago: datos.tipo_pago === 'cuotas' ? 'Pendiente' : 'Pagado',
    costo_envio: 1000,
  };

  // Insertar el pedido
  try {
    const { data: pedidoData, error } = await supabase
      .from('pedido')
      .insert([pedido])
      .select()
      .single();

    if (error) {
      return {
        success: false,
        message: 'Error al insertar pedido: ' + error.message,
        data: null,
      };
    }

    pedidoId = pedidoData.id;
  } catch (err) {
    return {
      success: false,
      message: 'Error inesperado al insertar pedido: ' + err.message,
      data: null,
    };
  }

  // Obtener todos los productos por ID
  const productoIds = carrito.map(item => item.id_producto);

  const { data: productos, error: fetchError } = await supabase
    .from('celulares') // o 'productos', según sea tu tabla real
    .select('id, precio, descuento')
    .in('id', productoIds);

  if (fetchError) {
    return {
      success: false,
      message: 'Error al obtener productos: ' + fetchError.message,
      data: null,
    };
  }

  // Crear los detalles del pedido con datos reales
  for (const item of carrito) {
    const producto = productos.find(p => p.id === item.id_producto);

    if (!producto) {
      return {
        success: false,
        message: `Producto con ID ${item.id_producto} no encontrado.`,
        data: null,
      };
    }

    const { precio, descuento = 0 } = producto;
    const total = (precio * (1 - descuento / 100)) * item.cantidad;

    detallePedido.push({
      id_pedido: pedidoId,
      id_producto: item.id_producto,
      cantidad: item.cantidad,
      precio,
      descuento,
      total,
    });
  }

  // Insertar todos los detalles del pedido
  try {
    const { error: insertError } = await supabase
      .from('detalle_pedido')
      .insert(detallePedido);

    if (insertError) {
      return {
        success: false,
        message: 'Error al insertar detalles del pedido: ' + insertError.message,
        data: null,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: 'Error inesperado al insertar detalles: ' + err.message,
      data: null,
    };
  }

  // Calcular totales y actualizar el pedido
  try {
    const neto = detallePedido.reduce((acc, item) => acc + item.total, 0);
    const intereses = pedido.estado_pago === 'Pendiente' ? neto * 0.2 : 0;
    const total = neto + intereses + pedido.costo_envio;

    const { error: updateError } = await supabase
      .from('pedido')
      .update({ neto, intereses, total })
      .eq('id', pedidoId);

    if (updateError) {
      return {
        success: false,
        message: 'Error al actualizar totales del pedido: ' + updateError.message,
        data: null,
      };
    }

    return {
      success: true,
      message: 'Pedido realizado correctamente.',
      data: {
        pedidoId,
        neto,
        intereses,
        total,
      },
    };
  } catch (err) {
    return {
      success: false,
      message: 'Error inesperado al actualizar el pedido: ' + err.message,
      data: null,
    };
  }
}


console.log(
  await postCarrito(
  {
    ubicacion: "Argentina",
    tipo_pago: "si",
    cantidad_cuotas: 0,
  },
  [
    { 
    id_producto: "2f3e0bfa-d33f-4e4b-a38c-a7a9031aa847",
    cantidad: 3,
    }
  ],
  "65fe76fb-724e-48ae-8cf0-4dacdd84539c"
)
)