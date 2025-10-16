import { supabase } from '../../supabaseClient.js';
/**
 * Sube los datos del carrito del localStorage a la abse de datos.
 * @returns {Promise<{ success: boolean, message: string, data: any[] | null  }>}
 */
export async function postCarrito(datos, carrito = []) {
  if (!carrito.length) {
    return {
      success: false,
      message: 'El carrito está vacío.',
      data: null,
    };
  }

  const {data: {user}, error } = await supabase.auth.getUser();
  if (error) {
    return {
      success: false,
      message: 'No se consiguio el usuario',
      data: null,
    };
  }

  const user_id = user.id;
  

  const detallePedido = [];

  // Obtener todos los productos por ID
  const productoIds = carrito.map(item => item.id_producto);

  const { data: productos, error: fetchError } = await supabase
    .from('celulares')
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
      id_producto: item.id_producto,
      cantidad: item.cantidad,
      precio,
      descuento,
      total,
    });
  }

  // Crear el pedido
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

  const detallesConPedidoId = detallePedido.map(item => ({
    ...item,
    id_pedido: pedidoId,
  }));

  // Insertar todos los detalles del pedido
  try {
    const { error: insertError } = await supabase
      .from('detalle_pedido')
      .insert(detallesConPedidoId);

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
    tipo_pago: "cuotas",
    cantidad_cuotas: 3,
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