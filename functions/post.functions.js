import { supabase } from '../supabaseClient.js';
import { administrador } from '../seguridad.js';

const forms = document.getElementsByClassName('form-insertar');

Array.from(forms).forEach(form => {
  const mensajeDiv = form.querySelector('.mensaje');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const autorizado = await administrador();
    if (!autorizado) return;

    const tabla = e.target.dataset.tabla;
    const datos = Object.fromEntries(new FormData(form).entries());

    // Validar campos vacíos
    for (const [key, value] of Object.entries(datos)) {
      if (!value.trim()) {
        mensajeDiv.textContent = `El campo "${key}" es obligatorio`;
        return;
      }
    }

    try {
      const { data, error } = await supabase.from(tabla).insert(datos).select();

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
  });
});
