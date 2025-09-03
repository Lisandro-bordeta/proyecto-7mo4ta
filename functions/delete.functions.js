import { supabase } from '../supabaseClient.js';
import { administrador } from '../seguridad.js';

const forms = document.getElementsByClassName('form-eliminar');

Array.from(forms).forEach(form => {
  const mensajeDiv = form.querySelector('.mensaje');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const autorizado = await administrador();
    if (!autorizado) return;

    const datos = Object.fromEntries(new FormData(form).entries());

    // Validación
    if (!datos.table?.trim() || !datos.id?.trim()) {
      mensajeDiv.textContent = 'Debes proporcionar el nombre de la tabla y un ID válido.';
      return;
    }

    try {
      const { data, error } = await supabase
        .from(datos.table)
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
