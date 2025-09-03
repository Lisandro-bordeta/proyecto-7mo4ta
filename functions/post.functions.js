import { supabase } from '../supabaseClient.js';
import { verificacion } from '../seguridad.js';

const forms = document.getElementsByClassName('form-eliminar');

Array.from(forms).forEach(form => {
  const mensajeDiv = form.querySelector('.mensaje');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    verificacion();

    const tabla = e.target.dataset.tabla;
    const datos = Object.fromEntries(new FormData(form).entries());

    // Validar que la tabla y el ID existan
    if (!tabla || !datos.id?.trim()) {
      mensajeDiv.textContent = 'Faltan datos: asegúrate de que el formulario tenga data-tabla y un ID válido.';
      return;
    }

    try {
      const { data, error } = await supabase
        .from(tabla)
        .delete()
        .eq('id', datos.id)
        .select();

      if (error) {
        mensajeDiv.textContent = 'Error al borrar registro: ' + error.message;
      } else {
        mensajeDiv.textContent = 'Registro borrado correctamente.';
        console.log('Eliminado:', data);
        form.reset();
      }
    } catch (error) {
      mensajeDiv.textContent = 'Error inesperado: ' + error.message;
    }
  });
});
