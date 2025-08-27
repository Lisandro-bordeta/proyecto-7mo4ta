import { supabase } from '../supabaseClient.js'

function getCarrito() {
  const carrito = localStorage.getItem('carrito');
  return carrito ? JSON.parse(carrito) : [];
}

// Guardar carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar producto al carrito
function agregarProducto(productoId, precio, cantidad = 1, descuento = 0) {
  const carrito = getCarrito();
  const existente = carrito.find(item => item.productoId === productoId);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ productoId, cantidad, precio, descuento });
  }

  guardarCarrito(carrito);
}

async function mostrarCarrito() {
    const carrito = getCarrito();

    if (carrito.length === 0) { // Respuesta si el carrito está vacío
        console.log('El carrito está vacío');
        return;
    }

    let total = 0;
  
    for (const item of carrito) {
        const { dataProducto, error } = await supabase
            .from('productos')
            .select('*')
            .eq('id', item.productoId)
            .single();

        if (error) { // error si no se encuentra el producto
        console.error(`Error obteniendo producto ${item.id}:`, error);
        continue;
        }

        console.log(dataProducto);
        total += (item.precio - item.descuento) * item.cantidad;
        // Aqui se imprime el producto en el carrito

    }
    return total;
}

total = mostrarCarrito();



//
const form = document.getElementById('form-carrito');
const mensajeDiv = document.getElementById('mensaje');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Verificar sesión
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        alert('Debes iniciar sesión para confirmar la compra');
        return;
    }

    const carrito = getCarrito();
    const { data, error } = await supabase
      .from('celulares')
      .select('*')
      .in('id', carrito.map(item => item.productoId));

    if (error) {
        console.error('Error al obtener productos:', error.message);
        return;
    }

    // Pedido
    const datosPedido = Object.fromEntries(new FormData(form).entries());

    datosPedido = {
      ...datosPedido,
      id_usuario : user.id,
      fecha : new Date().toISOString(),
      estado_envio : "Pendiente",
      estado_pago :  datosPedido.tipo_pago === "cuotas" ? "Pendiente" : "Pagado",
      costo_envio : 1000,
      neto : total,
      intereses : datosPedido.tipo_pago === "cuotas" ? total * 20 / 100  : 0,
      total : total + interes + costo_envio
    }


    for (const [key, value] of Object.entries(datosPedido)) {
        if (!value) {
        mensajeDiv.textContent = `El campo "${key}" es obligatorio`;
        return;
        }
    }

    try {
        const { data, error } = await supabase
          .from('pedido')
          .insert([datosPedido]);

        if (error) {
            mensajeDiv.textContent = 'Error al insertar registro: ' + error.message;
        } else {
            mensajeDiv.textContent = 'Registro insertado correctamente!';
            console.log('Insertado:', data);
            form.reset();
        }
    
    } catch (error) {
      mensajeDiv.textContent = 'Error inesperado: ' + error.message;
    }


    const items = carrito.map(item => ({
        id_pedido: pedido.id,
        id_producto: item.productoId,
        cantidad: item.cantidad,
        precio: item.precio,
        descuento: item.descuento,
        total: (item.precio * (1 - item.descuento / 100)) * item.cantidad
    }));

    const { error: itemsError } = await supabase
        .from('detalle_pedido')
        .insert(items);

    if (itemsError) {
        console.error('Error al agregar items:', itemsError.message);
        return;
    }

    localStorage.removeItem('carrito');
    alert('¡Compra confirmada con éxito!');
})