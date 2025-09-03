import { supabase } from '../supabaseClient.js';
import { verificacion } from '../seguridad.js';

const forms = document.getElementsByClassName('form-eliminar');

Array.from(forms).forEach(form => {
  const mensajeDiv = form.querySelector('.mensaje'); // mensaje dentro del formulario

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    verificacion();

    const datos = Object.fromEntries(new FormData(form).entries());

    // Validación básica
    if (!datos.table?.trim() || !datos.id?.trim()) {
      mensajeDiv.textContent = 'Debes proporcionar el nombre de la tabla y un ID válido.';
      return;
    }

    try {
      const { data, error } = await supabase
        .from(datos.table)
        .delete()
        .eq('id', datos.id)
        .select(); // opcional: para ver el dato eliminado

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
