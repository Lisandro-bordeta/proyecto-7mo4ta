import { supabase } from '../supabaseClient.js';

export async function postCarrito(datos, carrito = [], user_id) {
  const pedido = {
    ...datos,
    id_usuario: user_id,
    fecha: new Date().toISOString(),
    estado_envio: 'Pendiente',
    estado_pago: datos.tipo_pago === 'cuotas' ? 'Pendiente' : 'Pagado',
    costo_envio: 1000,
};

  let pedidoId;

  try {
    const { data, error } = await supabase
      .from('pedido')
      .insert([pedido])
      .select()
      .single();

    if (error) {
      return {
        success: false,
        message: 'Error al insertar pedido: ' + error.message,
      };
    }

    pedidoId = data.id;
  } catch (err) {
    return {
      success: false,
      message: 'Error inesperado al insertar pedido: ' + err.message,
    };
  }

  const detallePedido = carrito.map(item => ({
    id_pedido: pedidoId,
    id_producto: item.productoId,
    cantidad: item.cantidad,
    precio: item.precio,
    descuento: item.descuento || 0,
    total: (item.precio * (1 - (item.descuento || 0) / 100)) * item.cantidad,
  }));

  try {
    const { error } = await supabase
      .from('detalle_pedido')
      .insert(detallePedido);

    if (error) {
      return {
        success: false,
        message: 'Error al insertar detalles del pedido: ' + error.message,
      };
    }

    const totalCarrito = detallePedido.reduce((acc, item) => acc + item.total, 0);
    const intereses = pedido.estado_pago === 'Pendiente' ? totalCarrito * 0.2 : 0;
    const total = totalCarrito + intereses + pedido.costo_envio;

    const { error: updateError } = await supabase
      .from('pedido')
      .update({ neto: totalCarrito, intereses, total })
      .eq('id', pedidoId);

    if (updateError) {
      return {
        success: false,
        message: 'Error al actualizar totales del pedido: ' + updateError.message,
      };
    }

    return {
      success: true,
      message: 'Pedido realizado correctamente.',
      pedidoId,
    };
  } catch (err) {
    return {
      success: false,
      message: 'Error inesperado al insertar detalles: ' + err.message,
    };
  }
}

postCarrito(
  {
    ubicacion: "Argentina",
    tipo_pago: "si",
  },
  [
    { 
    id_producto: "12",
    cantidad: 3,
    precio: 300,
    descuento: 0,
    }
  ],
  "dwaww1231"
)