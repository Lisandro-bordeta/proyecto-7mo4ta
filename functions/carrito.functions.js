import { supabase } from '../supabaseClient.js'

// Obtener carrito desde localStorage
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



//
const forms = document.getElementsByClassName('form-carrito');
const mensajeDiv = document.getElementById('mensaje');
Array.from(forms).forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Verificar sesión


        
        const datos = Object.fromEntries(new FormData(form).entries());
        datos.id_usuario = user.id;
        datos.fecha = new Date().toISOString();
        datos.estado_envio = "Pendiente";
        datos.estado_pago =  datos.tipo_pago === "cuotas" ? "Pendiente" : "Pagado";
        datos.costo_envio = 1000;


        for (const [key, value] of Object.entries(datos)) {
            if (!value) {
            mensajeDiv.textContent = `El campo "${key}" es obligatorio`;
            return;
            }
        }
        let pedido;
        try {
            const { data, error } = await supabase.from('pedido').insert([datos]);

            if (error) {
                mensajeDiv.textContent = 'Error al insertar registro: ' + error.message;
            } else {
                mensajeDiv.textContent = 'Registro insertado correctamente!';
                console.log('Insertado:', data);
                pedido[0] = data;
                form.reset();
            }
        
        } catch (error) {
        mensajeDiv.textContent = 'Error inesperado: ' + error.message;
        }

        // pedido detalle
        const carrito = getCarrito();

        const { data, error } = await supabase
        .from('celulares')
        .select('*')
        .in('id', carrito.map(item => item.productoId));

        if (error) {
            console.error('Error al obtener productos:', error.message);
            return;
        }

        // Agregar productos a orden_items
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

        const totalCarrito = items.reduce((acc, item) => acc + item.total, 0);
        const interes = pedido.tipo_pago === "cuotas" ? totalCarrito * 20 / 100  : 0;
        pedido = {
            ...pedido,
            neto: totalCarrito,
            intereses: interes,
            total: totalCarrito + interes + datos.costo_envio
        }

        const { data: pedidoActualizado, error: pedidoError } = await supabase
            .from('pedido')
            .update({
                neto: pedido.neto,
                intereses: pedido.intereses,
                total: pedido.total
            })
            .eq('id', pedido.id)
            .select()
            .single();

        localStorage.removeItem('carrito');
        alert('¡Compra confirmada con éxito!');
    })
})
// Mostrar el carrito