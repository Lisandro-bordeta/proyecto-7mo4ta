export async function mp(){
  const res = await fetch('https://tu-proyecto.supabase.co/functions/v1/crear-preferencia', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: ``
  },
  body: JSON.stringify({
    carrito, // Variable con el carrito
    email: 'cliente@correo.com'
  })
});

const data = await res.json();

if (data.success) {
  window.location.href = data.init_point;
} else {
  alert('Error al crear preferencia: ' + data.message);
}

}