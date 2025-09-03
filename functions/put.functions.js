import { supabase } from '../supabaseClient.js';
import { verificacion } from '../seguridad.js';

const forms = document.getElementsByClassName('form-actualizar');

Array.from(forms).forEach(form => {
  const mensajeDiv = form.querySelector('.mensaje');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    verificacion();

    const tabla = form.dataset.tabla;
    const datos = Object.fromEntries(new FormData(form).entries());

    // Validar campos vacíos
    for (const [key, value] of Object.entries(datos)) {
      if (!value.trim()) {
        mensajeDiv.textContent = `El campo "${key}" es obligatorio`;
        return;
      }
    }

    // El id es necesario para saber qué registro actualizar
    const { id, ...campos } = datos;
    if (!id.trim()) {
      mensajeDiv.textContent = 'El campo "id" es obligatorio para actualizar';
      return;
    }

    try {
      const { data, error } = await supabase
        .from(tabla)
        .update(campos)
        .eq('id', id)
        .select();

      if (error) {
        mensajeDiv.textContent = 'Error al actualizar registro: ' + error.message;
      } else {
        mensajeDiv.textContent = 'Registro actualizado correctamente!';
        console.log('Actualizado:', data);
        form.reset();
      }
    } catch (error) {
      mensajeDiv.textContent = 'Error inesperado: ' + error.message;
    }
  });
});
