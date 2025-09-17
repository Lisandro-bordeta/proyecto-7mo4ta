const res = await fetch('https://tu-proyecto.supabase.co/functions/v1/crear-preferencia', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    carrito: [
      { nombre: 'Producto A', cantidad: 2, precio: 1000 },
      { nombre: 'Producto B', cantidad: 1, precio: 2000 },
    ],
    email: 'cliente@correo.com'
  })
});

const data = await res.json();

if (data.success) {
  window.location.href = data.init_point;
} else {
  alert('Error al crear preferencia: ' + data.message);
}
